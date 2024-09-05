import {Layout, Line, Rect, RectProps, Txt} from '@motion-canvas/2d';
import {Vector2, createRefArray} from '@motion-canvas/core';
import { LayoutX } from './LayoutX';

export function NodeGrid({
  children,
  rows,
  cols,
  data,
  attr,
  ...props
}: RectProps & {rows: number, cols: number, data: Array<Array<string>>, attr: {bgColor: string, bevelSize: number, textFill: string, smCol: string}}) {
  var nodeGrid = (
    <Rect gap={10} alignItems={"stretch"} direction={"row"} {...props}>
    </Rect>
  ) as Rect;
  for (var i=0;i<rows;i++) {
    var temp = <Layout
      gap={10}
      direction="column"
      grow={1}>
    </Layout>;
    for (var j=0;j<cols;j++) {
      temp.add(<LayoutX grow={1} attr={attr} text={data[j][i]} />);
    }
    nodeGrid.add(temp);
  }
  return nodeGrid;
}
