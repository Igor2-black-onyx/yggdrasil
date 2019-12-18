/** Tree node data types */
export enum Type {
  STRING,
  NUMBER,
  OBJECT = 101,
  ARRAY,
}

/** Tree node interface */
export interface INode {
  name: string;
  type: Type;
  children?: INode[];
}

/** ITreeNode contain tree node, link to parent and path to node */
export interface ITreeNode {
  node: INode;
  path: string[];
  parent?: ITreeNode;
}
