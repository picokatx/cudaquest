import {makeScene2D, Circle, Grid, Rect, Txt, Latex} from '@motion-canvas/2d';
import {ThreadGenerator, all, createEffect, createRef, easeInElastic, easeInOutBounce, easeInOutCubic, easeInOutElastic, loop, map, spawn, tween, waitFor} from '@motion-canvas/core';
import {createSignal} from '@motion-canvas/core';
import {Vector2, Color} from '@motion-canvas/core';
import { Paper } from '../nodes/Paper';
import { Tetrahedron } from '../nodes/Tetrahedron';
import { Mouse, createMouseRef } from '../nodes/Mouse';
import * as gameThree from '../three/game';
import { Three } from '../nodes/Three';
import * as THREE from 'three';


export default makeScene2D(function* (view) {
    const colSignal = Color.createSignal("#ff0000")
    // const three = createRef<Three>();
    const text = createRef<Txt>();
    // view.add(
    //   <Three
    //     ref={three}
    //     quality={2}
    //     size={'100%'}
    //     background={'#023348'}
    //     scene={gameThree.threeScene}
    //     camera={gameThree.camera}
    //   />
    // );
    view.add(
      <Txt
        lineHeight={'150%'}
        ref={text}
        text={() => `col = ${colSignal()}`}
        stroke={"#ffffff"}
        >
      </Txt>,
    )
    
    const circle = createRef<Circle>();
  
    view.add(
      <Circle
        ref={circle}
        x={-300}
        width={240}
        height={240}
        fill="#e13238"
      />,
    );
    yield* tween(2, value => {
      circle().position.x(map(-300, 300, value));
    });
    // yield loop(function* () {
    //   yield* tween(2, value => {
    //     gameThree.mesh.position.set(0, 0, map(0, 3, easeInOutCubic(value)));
    //     (gameThree.mesh.material as THREE.MeshPhongMaterial).color.setRGB(colSignal().rgb()[0],colSignal().rgb()[1],colSignal().rgb()[2]);
    //     gameThree.threeScene.updateWorldMatrix(true, true);
    //     three().rerender();
    //   });
    //   yield* tween(2, value => {
    //     gameThree.mesh.position.set(0, 0, map(3, 0, easeInOutCubic(value)));
    //     gameThree.threeScene.updateWorldMatrix(true, true);
    //     three().rerender();
    //   });
    // });
    // yield loop(() =>
    //   tween(2, value => {
    //     gameThree.mesh.rotation.set(0, 0, value * Math.PI * 2 + 3.5);
    //     gameThree.threeScene.updateWorldMatrix(true, true);
    //     three().rerender();
    //   }),
    // );
    // yield loop(() =>
    //   tween(1, value => {
    //     gameThree.mesh.scale.set(1-value*0.1, 1-value*0.1, 1-value*0.1);
    //     gameThree.threeScene.updateWorldMatrix(true, true);
    //     three().rerender();
    //   }),
    // );
    // yield* colSignal("#0000ff", 2, easeInOutCubic);
    
});