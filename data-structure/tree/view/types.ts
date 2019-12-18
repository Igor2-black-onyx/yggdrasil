/* tree/view/types. Responsible Igor Dubrovin.*/

import {Type, INode} from "../../tree/model/types";

/** Point on view map which represent one node */
export interface IPoint {
  top: number;
  left: number;
}

/** Size of rectangle */
export interface ISize {
  width: number;
  height: number;
}

/** Object with rectangle base size and position parameters */
export interface IContainerCssStyle {
  top: string;
  left: string;
  width?: string;
  height?: string;
}

/** Tree view component options 2 */
export interface ITreeViewConfig {

  /** greed options */
  greed: {
    /** greed cell options (size) */
    cell: {
      /** width of greed cell */
      width: number,
      /** height of greed cell */
      height: number,
    },
  };

  /** Options of cirle witch represent node */
  nodeCircle: {
    /** radius of cirle */
    radius: number,
    /** border width of cirle */
    borderWidth: number,
  };
}

/** Main view template config */
export interface IMainConfig {
  containerSize: ISize;
  paddingTop: number;
  linkViews: any[];
  pointViews: any[];
}

/** Node view template config */
export interface INodeConfig {
  name: string;
  type: Type;
  arrayKind?: INode;
  position: IPoint;
  cellSize: ISize;
  diameter: number;
}
