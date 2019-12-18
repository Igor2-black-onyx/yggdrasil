/* tree/viwe-model/logic. Responsible Igor Dubrovin. */

import {
  forEachNode, isArrayOfPrimitive,
} from "../../tree/model/logic";

import {INode, ITreeNode} from "../../tree/model/types";

import {
  IMapLink, IMapPoint, ISize, TreeMaping , TreeMapingLevel,
} from "../../tree/view-model/types";

/** Calculate view maping which contain position of each Point on the view map
 * @param tree root node of tree data structure
 */
export function calcMaping(tree: INode): TreeMaping {
  const maping: TreeMaping = [[]];

  // yield* childIterator; //(--downlevelIteration option required)
  forEachNode(tree, (treeNode: ITreeNode) => {

    // primiteve type of array items as separate node view loocks needless
    const nodeIsPrimitiveType: boolean =
      !!treeNode.parent && isArrayOfPrimitive(treeNode.parent.node);
    if (!nodeIsPrimitiveType) {
      let x: number;
      const y: number = treeNode.path.length - 1;
      const node: INode = treeNode.node;
      maping[y] = maping[y] ? maping[y] : [];

      // if has visible children
      const children: INode[] | undefined = node.children;
      if (children && !isArrayOfPrimitive(node)) {

        // the node is directly above the middle child node, so it have same x
        const middleChild = children[Math.round(children.length / 2) - 1];
        const isMiddleChild = (child: ITreeNode|undefined): boolean =>
          !!child && child.node === middleChild;
        x = maping[y + 1].findIndex(isMiddleChild);
      } else {

        // the node placed on first free place on level if no children
        x = getMaxWidth(maping, y);

        // 1 cell margin for first child of each parent
        // (except first on the layer( && x > 0))
        if (treeNode.parent && x > 0) {

          // if treeNode have parent then parent.children array is not undefined
          const siblings: INode[] = treeNode.parent.node.children as INode[];
          x += +(node === siblings[0]); // +(true|false) === (1|0)
        }
      }
      maping[y][x] = treeNode;
    }
  });
  return maping;
}

/** Get js map of Points by it tree path(key) */
export function getPoints(maping: TreeMaping): Map<string, IMapPoint> {

  // map data structure where node object is key and coordinates is value
  const points: Map<string, IMapPoint> = new Map();
  let key: string;
  maping.forEach((level: TreeMapingLevel, y: number) => {
    level.forEach((treeNode: ITreeNode|undefined, x: number) => {
      if (treeNode) {
        key = treeNode.path.join("/");
        points.set(key, {x, y, ...treeNode});
      }
    });
  });
  return points;
}

/** Get js map of links between Points by path of child node(key) */
export function getLinks(points: Map<string, IMapPoint>): Map<string, IMapLink> {
  const links: Map<string, IMapLink> = new Map();
  points.forEach((p2, path) => {

    // for each point save link with it parent
    const parentPath: string[] = p2.path;
    if (parentPath.length > 1) {
      parentPath.pop();
      const p1Key: string = parentPath.join("/");
      const p1: IMapPoint = points.get(p1Key) as IMapPoint;
      links.set(path, {p1, p2});
    }
  });
  return links;
}

/** Get width of map level(bu y position) */
export function getMaxWidth(maping: TreeMaping, y: number = maping.length - 1) {
  const width = (currY: number) => {
    const level = maping[currY];
    return level ? level.length : 0;
  };
  let max: number = width(y);
  while (y-- > 0) {
    max = Math.max(max, width(y));
  }
  return max;
}

/** Get map width and height(points count) */
export function getMapSize(maping: TreeMaping): ISize {

  // map width is maximum level width in map
  return {
    width: getMaxWidth(maping),
    height: maping.length,
  };
}
