/* tree/view-model/example. Responsible Igor Dubrovin. */

import {designPatterns} from "../../tree/model/example";
import {calcMaping, getLinks, getPoints} from "./logic";

/** Uncomment and run example */
export const runExample = () => {
  const maping = calcMaping(designPatterns);
  // console.log("maping", maping);
  const points = getPoints(maping);
  // console.log("points", points);
  const links = getLinks(points);
  // console.log("links", links);
};
