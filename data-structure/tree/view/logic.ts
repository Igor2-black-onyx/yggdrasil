/* tree/view/logic. Responsible Igor Dubrovin.*/

import "../../tree/view/style.css";
import * as Render from "../../tree/view/react-templates";
import {INode, Type} from "../../tree/model/types";
import {TreeMaping, IMapPoint, IMapLink} from "../../tree/view-model/types";
import {
  calcMaping, getPoints, getLinks, getMapSize,
} from "../../tree/view-model/logic";
import {ISize, ITreeViewConfig} from "../../tree/view/types";

const defaultConfig: ITreeViewConfig = {
  greed: {
    cell: {
      height: 400,
      width: 100,
    },
  },
  nodeCircle: {
    borderWidth: 2,
    radius: 20,
  },
};

/** Tree view component */
export const TreeView = (props: {
  /** tree view component options */
  config?: ITreeViewConfig,
  /** data structure */
  data: INode,
}): any => {
  const config: ITreeViewConfig = props.config || defaultConfig;
  const map: TreeMaping = calcMaping(props.data);
  const points: Map<string, IMapPoint> = getPoints(map);
  const links: Map<string, IMapLink> = getLinks(points);
  const greedCell = config.greed.cell;
  return Render.MapView({
    containerSize: _getMapContainerSize(map, greedCell),
    linkViews: _createLinkViews(config, links),
    paddingTop: Math.trunc(greedCell.height / 2),
    pointViews: _createPointViews(config, points),
  });
};

/** Create link react elements */
function _createLinkViews(
  config: ITreeViewConfig,
  mapLinks: Map<string, IMapLink>,
) {
  const {width: cellWidth, height: cellHeight} = config.greed.cell;
  const circle = config.nodeCircle;
  const shiftLeft = circle.radius + circle.borderWidth;
  const linkViews: any[] = [];
  mapLinks.forEach(({p1, p2}) => {
    const point1 = {
      left: p1.x * cellWidth + shiftLeft,
      top: p1.y * cellHeight + circle.radius,
    };
    const point2 = {
      left: p2.x * cellWidth + shiftLeft,
      top: p2.y * cellHeight + circle.radius,
    };
    linkViews.push(Render.Link({p1: point1, p2: point2}));
  });
  return linkViews;
}

/** Create point(node with coordinates on Map) */
function _createPointViews(
  config: ITreeViewConfig,
  mapPoints: Map<string, IMapPoint>,
): any[] {
  const pointViews: any[] = [];
  const cellSize = config.greed.cell;
  mapPoints.forEach((mapPoint) => {
    const node = mapPoint.node;
    const arrayKind = (node.type === Type.ARRAY && node.children)
      ? node.children[0]
      : undefined;
    pointViews.push(Render.Node({
      name: node.name,
      type: node.type,
      arrayKind,
      cellSize,
      diameter: config.nodeCircle.radius * 2,
      position: {
        left: mapPoint.x * cellSize.width,
        top: mapPoint.y * cellSize.height,
      },
    }));
  });
  return pointViews;
}

/** Calc concrite map size(for example in pixels for react template) */
function _getMapContainerSize(map: TreeMaping, greedCell: ISize) {
  const mapSize = getMapSize(map);
  return  {
    height: mapSize.height * greedCell.height,
    width: mapSize.width * greedCell.width,
  };
}

export default TreeView;
