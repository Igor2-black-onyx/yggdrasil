/* tree/view-model/logic. Responsible Igor Dubrovin. */

import {Type, INode, ITreeNode} from "./types";

/** Returns true if node type is Type.ARRAY or Type.OBJECT (not primitive)
 * @param node single node of tree data structure
 */
export const isComplex = (node: INode): boolean =>
  node.type > 100;

/** Returns true if node is Type.OBJECT */
export const isObject = (node: INode): boolean =>
  node.type === Type.OBJECT;

/** Returns type of array item(array kind), node type must be Type.Array */
export const getArrayItemType = (node: INode): INode | undefined =>
  node.children && node.children[0];

/** Returns true if node is array with primitive(number, etc.) item types */
export const isArrayOfPrimitive = (node: INode): boolean => {
  const isArray: boolean = node.type === Type.ARRAY;
  const arrayType: INode | undefined = getArrayItemType(node);

  // is array and array has item type and this type is primitive(not complex)
  return isArray && !!arrayType && !isComplex(arrayType);
};

/** For each node of tree run callback. Tree is represented by node param
 * which is root node of tree (composite design pattern)
 */
export const forEachNode =
  (node: INode, call: (treeNode: ITreeNode) => void) => {
  const iterator = TreeIterator(node);

  // yield* childIterator; //(--downlevelIteration option required)
  let result: IteratorResult<ITreeNode>;
  while (result = iterator.next(), !result.done) {
    call(result.value);
  }
};

/** Returns tree nodes iterator */
export const TreeIterator = (node: INode) =>
  recursiveIterator({
    node,
    path: [node.name],
  });

/** Recursive generator witch create tree nodes iterator */
function* recursiveIterator(treeNode: ITreeNode): IterableIterator<ITreeNode> {
  const children = treeNode.node.children;
  if (children) {
    let child: INode;
    let childIterator: IterableIterator<ITreeNode>;
    for (child of children) {
      childIterator = recursiveIterator({
        node: child,
        path: [...treeNode.path, child.name],
        parent: treeNode,
      });

      // yield* childIterator; //(--downlevelIteration option required)
      let result: IteratorResult<ITreeNode>;
      while (result = childIterator.next(), !result.done) {
        yield result.value;
      }
    }
  }
  yield treeNode;
}
