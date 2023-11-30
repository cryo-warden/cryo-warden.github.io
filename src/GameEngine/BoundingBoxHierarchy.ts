import { SimpleIterator } from "general/SimpleIterator";
import { BoundingBox } from "./BoundingBox";
import {
  BinaryTree,
  BinaryTreeLeaf,
  BinaryTreeParent,
} from "general/BinaryTree";

const {
  area: boundingBoxArea,
  merge: mergeBoundingBoxes,
  touches: boundingBoxesTouch,
} = BoundingBox;

interface BoundingBoxLeafNode<T>
  extends BoundingBox,
    BinaryTreeLeaf<BoundingBoxLeafNode<T>, BoundingBoxParentNode<T>> {
  value: T;
}

interface BoundingBoxParentNode<T>
  extends BoundingBox,
    BinaryTreeParent<BoundingBoxLeafNode<T>, BoundingBoxParentNode<T>> {}

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
    this.box = box;
    if (root !== null) {
      this.descend(root);
    }

    this.traverseToNextLeaf();
  }
  next(): T {
    if (this.current === null) {
      throw new Error("No next value exists.");
    }

    const result = (this.current as BoundingBoxLeafNode<T>).value;
    this.ascend(this.current.parent);
    this.traverseToNextLeaf();
    return result;
  }
  hasNext(): boolean {
    return this.current !== null;
  }

  private current: BoundingBoxNode<T> | null = null;
  private previous: BoundingBoxNode<T> | null = null;
  private box: BoundingBox;

  private ascend(parent: BoundingBoxNode<T> | null): void {
    this.previous = this.current;
    this.current = parent;
  }

  private descend(child: BoundingBoxNode<T>): void {
    if (boundingBoxesTouch(child, this.box)) {
      this.current = child;
    } else {
      this.previous = child;
    }
  }

  private traverseToNextLeaf(): void {
    while (this.current !== null && this.current.type !== "leaf") {
      if (this.previous === this.current.rightChild) {
        this.ascend(this.current.parent);
      } else if (this.previous === this.current.leftChild) {
        this.descend(this.current.rightChild);
      } else {
        this.descend(this.current.leftChild);
      }
    }
  }
}

export class BoundingBoxHierarchy<T> {
  private root: BoundingBoxNode<T> | null = null;
  private valueMap: Map<T, BoundingBoxLeafNode<T>> = new Map();

  insert(box: BoundingBox, value: T) {
    if (this.valueMap.has(value)) {
      throw new Error(
        "Values inserted into a BoundingBoxHierarchy must be unique. (Have you considered using object values to obtain unique identities?)"
      );
    }

    const node = boundingBoxToLeaf(box, value);

    this.valueMap.set(value, node);

    this.root = insert(this.root, node);
  }

  getTouchedValueIterator(box: BoundingBox): SimpleIterator<T> {
    return new TouchedValueIterator(this.root, box);
  }

  remove(value: T): void {
    const node = this.valueMap.get(value);
    if (node === undefined) {
      return;
    }

    this.valueMap.delete(value);

    const parent = node.parent;
    if (parent === null) {
      this.root = null;
      return;
    }

    const sibling =
      parent.leftChild === node ? parent.rightChild : parent.leftChild;

    if (parent.parent === null) {
      this.root = sibling;
      return;
    }

    sibling.parent = parent.parent;
    if (parent.parent.leftChild === parent) {
      parent.parent.leftChild = sibling;
    } else {
      parent.parent.rightChild = sibling;
    }
  }

  get depth(): number {
    return BinaryTree.depth(this.root);
  }

  has(value: T): boolean {
    return this.valueMap.has(value);
  }

  log() {
    // WIP
    console.log(JSON.stringify(prune(this.root), null, 2));
  }
}
