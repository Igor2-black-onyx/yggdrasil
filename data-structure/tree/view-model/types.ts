import {ITreeNode} from "../../tree/model/types";

export type TreeMapingLevel = Array<ITreeNode|undefined>;

export type TreeMaping = TreeMapingLevel[];

/** Position of point */
export interface IMapPoint extends ITreeNode {
  x: number;
  y: number;
}

/** 2 Points which represent link */
export interface IMapLink {
  p1: IMapPoint;
  p2: IMapPoint;
}

/** Container size (width, height) */
export interface ISize {
  width: number;
  height: number;
}
