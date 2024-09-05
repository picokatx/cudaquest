import {makeScene2D, Circle, Grid, Rect, Txt, Latex} from '@motion-canvas/2d';
import {ThreadGenerator, all, createEffect, createRef, easeInElastic, easeInOutBounce, easeInOutCubic, easeInOutElastic, loop, map, spawn, tween, waitFor} from '@motion-canvas/core';
import {createSignal} from '@motion-canvas/core';
import {Vector2, Color} from '@motion-canvas/core';
import { Paper } from '../nodes/Paper';
import { Tetrahedron } from '../nodes/Tetrahedron';
import { Mouse, createMouseRef } from '../nodes/Mouse';

export default makeScene2D(function* (view) {
  const colSignal = Color.createSignal("#ff0000")
  const myCircle = createRef<Circle>();
  const text = createRef<Txt>();
  const latex = createRef<Latex>();
  const mouse = createMouseRef();
  view.add(
    <Latex
      ref={latex}
      tex="{c(n)=n(n+1)}"
      width={600}
      stroke={"#0000ff"}
      position={new Vector2(200, 200)}
    />,
  );
  // const grid = createRef<Grid>();
  // const rect = createRef<Rect>();
  view.add(
    <Circle
      ref={myCircle}
      // try changing these properties:
      x={-300}
      width={140}
      height={140}
      fill={() => colSignal()}
      stroke="#000000"
      startAngle={0}
      endAngle={360}
      lineWidth={8}
    />,
  );
  view.add(<Mouse refs={mouse} fill={"#ff00ff"} x={-100} y={-100} end={0}
    scale={4}/>);

  view.add(
    <Txt
      lineHeight={'150%'}
      ref={text}
      text={() => `col = ${colSignal()}`}
      >
    </Txt>,
  )
  const circles: Circle[] = [];
  createEffect(() => {
    const targetCount = colSignal().rgb()[2] > 224 && colSignal().rgb()[0] < 32 ? 1 : 0;
    let i = circles.length;
    // add any missing circles
    for (; i < targetCount; i++) {
      const circle = (<Circle fill={'red'} position={new Vector2(100, 100)}/>) as Circle;
      circles.push(circle);
      view.add(circle);
      spawn(circle.size(80, 0.3));
    }
    // remove any extra circles
    for (; i > targetCount; i--) {
      const circle = circles.pop()!;
      spawn(circle.size(0, 0.3).do(() => circle.remove()));
    }
  });
  
  yield* mouse.line.end(1, 4),
  yield* colSignal("#0000ff", 2, easeInOutElastic).to("#ff0000", 2, easeInOutElastic);
  yield* latex().tex("{c(n)=n(n+1)(2n+1}", 3)
  yield* waitFor(1);
  // tween(2, value => {
  //   colSignal(Color.lerp("#0000ff", "#ff0000", easeInOutCubic(value)));
  // });
  // view.add(
  //   <Grid
  //     ref={grid}
  //     width={'100%'}
  //     height={'100%'}
  //     stroke={'#ff0000'}
  //     lineWidth={9}
  //   />,
  // );
  // grid().add(
  //   <Rect 
  //     ref = {rect}
  //     width={100}
  //     height={100}
  //     fill={"#00ff00"}
  //   />
  // )
  // yield* all(
  //   myCircle().position.x(300, 1).to(-300, 1),
  //   myCircle().fill('#e6a700', 1).to('#e13238', 1),
  // );
  // yield* all(
  //   myCircle().lineWidth(1, 1).to(8, 1)
  // );
  // yield* all(
  //   myCircle().startAngle(0, 1).to(180, 1)
  // );
  
  function* flicker(grid: Grid): ThreadGenerator {

  }

});
