/* Tree/View/React-Template. Responsible Igor Dubrovin.*/

import React from "react";
import {
  IContainerCssStyle, IMainConfig, INodeConfig, IPoint,
} from "../../tree/view/types";
import {Type} from "../../tree/model/types";

/** React template of map. Map contain all nodes of tree */
export function MapView(props: IMainConfig): React.ReactElement {
  const {containerSize, linkViews, pointViews, paddingTop} = props;
  const containerStyle = {paddingTop: `${paddingTop}px`};
  const contentStyle = {
    height: `${containerSize.height - paddingTop}px`,
    width: `${containerSize.width}px`,
  };
  return (
    <div className="ds-tree-view map" style={containerStyle}>
      <div className="map-content" style={contentStyle}>
        <svg className="links">{linkViews}</svg>
        {pointViews}
      </div>
    </div>
  );
}

/** React template of node. Represents one node of tree */
export function Node(props: INodeConfig): React.ReactElement {
  const {
    name, type, arrayKind, diameter, position: {top, left},
  } = props;
  const nodeStyle: IContainerCssStyle = {
    left: `${left}px`,
    top: `${top}px`,
    height: `${diameter}px`,
    width: `${diameter}px`,
  };
  const titleStyle: IContainerCssStyle = {
    left: `${left + diameter}px`,
    top: `${top}px`,
  };
  const cssClassName: string =
    _getNodeCssClass(type, (arrayKind && arrayKind.type));

  const arrayKindCaption: React.ReactElement | undefined =
    arrayKind && arrayKind.name
      ? (<span className="node-array-kind">{`{${arrayKind.name}}`}</span>)
      : undefined;
  return (
    <React.Fragment>
      <div className={cssClassName} style={nodeStyle} title={name}></div>
      <div className="title" style={titleStyle}>{name}{arrayKindCaption}</div>
    </React.Fragment>
  );
}

/** React template of tree links. */
export function Link(props: {p1: IPoint, p2: IPoint}): React.ReactElement {
  const {p1, p2} = props;
  const points = `${p1.left} ${p1.top} ${p2.left} ${p2.top}`;
  return (<polyline className="link" points={points}> </polyline>);
}

/** Calc node css class based on node type and array kind */
function _getNodeCssClass(nodeType: Type, nodeKindType?: Type): string {
    const nodeTypeName = Type[nodeType];
    let nodeCssClass = `node node-type-${nodeTypeName}`;
    if (nodeKindType !== undefined) {
      const kindTypeName = Type[nodeKindType];
      nodeCssClass = `${nodeCssClass} array-kind-${kindTypeName}`;
    }
    return nodeCssClass;
}
