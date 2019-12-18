/** tree/model/example. Responsible Igor Dubrovin.
 * This file contain exapmle of tree data structure; it can be iterate by
 * runExample function
 */
import {Type, INode, ITreeNode} from "../../tree/model/types";
import {forEachNode} from "../../tree/model/logic";

const structural = [
  "Proxy", "Adapter", "Light Weight", "Composite", "Bridge", "Decorator",
  "Facade",
];
const creational = [
  "Singleton", "Factory Method", "Abstract Factory", "Builder", "Prototype",
];
const behevioral = [
  "Observer", "Memento", "Iterator", "Command", "Responsibility Queue",
  "Visitor", "Strategy", "Template Command", "State", "Mediator",
];

/** Returns reducer for specified array kind
 * reducer wrap each string into node with Type.Array and
 * specified item type(kind)
 */
const wrapToObj = (kind: Type) =>
  (arr: INode[], name: string) => {
    arr.push({
      name,
      type: Type.ARRAY,
      children: [
        {name: "tag", type: kind},
      ],
    });
    return arr;
  };

/** Data structure example */
export const designPatterns: INode = {
  name: "Design Patterns",
  type: Type.OBJECT,
  children: [
    {
      name: "Structural",
      type: Type.OBJECT,
      children: structural.reduce(wrapToObj(Type.STRING), []),
    },
    {
      name: "Behavioral",
      type: Type.OBJECT,
      children: behevioral.reduce(wrapToObj(Type.STRING), []),
    },
    {
      name: "Creational",
      type: Type.OBJECT,
      children: creational.reduce(wrapToObj(Type.STRING), []),
    },
  ],
};

/** Run tree/model using example */
export const runExample = () =>
  forEachNode(designPatterns, (treeNode: ITreeNode) => {
    // console.log(treeNode.path.join("/"), treeNode);
  });
