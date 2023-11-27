import { SimpleIterator } from "general/SimpleIterator";
import { BoundingBox } from "./BoundingBox";

const {
  area: boundingBoxArea,
  merge: mergeBoundingBoxes,
  touches: boundingBoxesTouch,
} = BoundingBox;

type BoundingBoxLeafNode<T> = BoundingBox & {
  type: "leaf";
  parent: BoundingBoxParentNode<T> | null;
  value: T;
};

type BoundingBoxParentNode<T> = BoundingBox & {
  type: "parent";
  parent: BoundingBoxParentNode<T> | null;
  leftChild: BoundingBoxNode<T>;
  rightChild: BoundingBoxNode<T>;
};

type BoundingBoxNode<T> = BoundingBoxLeafNode<T> | BoundingBoxParentNode<T>;

const boundingBoxToLeaf = <T>(
  { left, top, right, bottom }: BoundingBox,
  value: T
): BoundingBoxLeafNode<T> => {
  return {
    left,
    top,
    right,
    bottom,
    type: "leaf",
    parent: null,
    value,
  };
};

const boundingBoxToParent = <T>(
  { left, top, right, bottom }: BoundingBox,
  leftChild: BoundingBoxNode<T>,
  rightChild: BoundingBoxNode<T>
): BoundingBoxParentNode<T> => {
  return {
    left,
    top,
    right,
    bottom,
    type: "parent",
    parent: null,
    leftChild,
    rightChild,
  };
};

const prune = <T>(node: BoundingBoxNode<T> | null): any => {
  if (node === null) {
    return null;
  }
  if (node.type === "leaf") {
    const { left, top, right, bottom, value } = node;
    return { left, top, right, bottom, value };
  }
  const { left, top, right, bottom, leftChild, rightChild } = node;
  return {
    left,
    top,
    right,
    bottom,
    leftChild: prune(leftChild),
    rightChild: prune(rightChild),
  };
};

const insert = <T>(
  root: BoundingBoxNode<T> | null,
  node: BoundingBoxNode<T>
): BoundingBoxNode<T> => {
  // WIP Rearrange cases to prioritize common cases over code brevity.

  if (root === null) {
    return node;
  }

  if (root.type === "leaf") {
    const newRoot = boundingBoxToParent(
      mergeBoundingBoxes(root, node),
      root,
      node
    );
    root.parent = node.parent = newRoot;
    return newRoot;
  }

  const leftArea = boundingBoxArea(mergeBoundingBoxes(node, root.leftChild));
  const rightArea = boundingBoxArea(mergeBoundingBoxes(node, root.rightChild));

  if (rightArea < leftArea) {
    const newRightChild = insert(root.rightChild, node);
    root.rightChild = newRightChild;
    newRightChild.parent = root;
    Object.assign(root, mergeBoundingBoxes(root.leftChild, newRightChild));
    return root;
  }

  const newLeftChild = insert(root.leftChild, node);
  root.leftChild = newLeftChild;
  newLeftChild.parent = root;
  Object.assign(root, mergeBoundingBoxes(newLeftChild, root.rightChild));
  return root;
};

class TouchedValueIterator<T> implements SimpleIterator<T> {
  constructor(root: BoundingBoxNode<T> | null, box: BoundingBox) {
    this.current = root;
    this.box = box;

    this.traverseToNextLeaf();
  }
  next(): T {
    if (this.current !== null) {
      const result = (this.current as BoundingBoxLeafNode<T>).value;
      this.stepUp();
      this.traverseToNextLeaf();
      return result;
    }

    throw new Error("No next value exists.");
  }
  hasNext(): boolean {
    return this.current !== null;
  }

  private current: BoundingBoxNode<T> | null = null;
  private previous: BoundingBoxNode<T> | null = null;
  private box: BoundingBox;

  private stepUp(): void {
    if (this.current !== null) {
      this.previous = this.current;
      this.current = this.current.parent;
    }
  }

  private traverseToNextLeaf(): void {
    while (this.current !== null) {
      // WIP We are going to end up repeatedly testing the same parent boxes.
      // Consider how this check might be moved to only occur when stepping downward.
      if (!boundingBoxesTouch(this.current, this.box)) {
        // We are ascending because this branch does not touch our box.
        this.previous = this.current;
        this.current = this.current.parent;
      } else if (this.current.type === "parent") {
        if (this.previous === this.current.leftChild) {
          // We are descending right because we have already visited left.
          this.current = this.current.rightChild;
        } else if (this.previous === this.current.rightChild) {
          // We are ascending because we have already visited right.
          this.previous = this.current;
          this.current = this.current.parent;
        } else {
          // We are descending left.
          this.current = this.current.leftChild;
        }
      } else {
        // Halt because we have reached a leaf that collides with our box.
        return;
      }
    }
  }
}

export class BoundingBoxHierarchy<T> {
  private root: BoundingBoxNode<T> | null = null;

  insert(box: BoundingBox, value: T) {
    const node = boundingBoxToLeaf(box, value);

    this.root = insert(this.root, node);
  }

  getTouchedValueIterator(box: BoundingBox): SimpleIterator<T> {
    return new TouchedValueIterator(this.root, box);
  }

  log() {
    // WIP
    console.log(JSON.stringify(prune(this.root), null, 2));
  }
}
