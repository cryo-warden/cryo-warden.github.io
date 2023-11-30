export interface BinaryTreeLeaf<
  TLeaf extends BinaryTreeLeaf<TLeaf, TParent>,
  TParent extends BinaryTreeParent<TLeaf, TParent>,
> {
  type: "leaf";
  parent: TParent | null;
}

export interface BinaryTreeParent<
  TLeaf extends BinaryTreeLeaf<TLeaf, TParent>,
  TParent extends BinaryTreeParent<TLeaf, TParent>,
> {
  type: "parent";
  parent: TParent | null;
  leftChild: TLeaf | TParent;
  rightChild: TLeaf | TParent;
}

const depth = <
  TLeaf extends BinaryTreeLeaf<TLeaf, TParent>,
  TParent extends BinaryTreeParent<TLeaf, TParent>,
>(
  root: TLeaf | TParent | null
): number => {
  if (root == null) {
    return 0;
  }
  if (root.type === "leaf") {
    return 1;
  }
  return 1 + Math.max(depth(root.leftChild), depth(root.rightChild));
};

export const BinaryTree = {
  depth,
};
