import {Circle, Img, Txt, makeScene2D} from '@motion-canvas/2d';
import {Color, Renderer, Stage, Vector2, createRef, easeInOutCubic, loop, map, tween,} from '@motion-canvas/core';
import { Three } from '../nodes/Three';
import * as waterScene from '../three/waterScene';
import * as THREE from 'three';
import TWEEN from '@tweenjs/tween.js'
export default makeScene2D(function* (view) {
  const colSignal = Color.createSignal("#ff0000")
  const three = createRef<Three>();
  const text = createRef<Txt>();
  view.add(
    <Three
      ref={three}
      quality={2}
      size={'100%'}
      background={'#023348'}
      scene={waterScene.scene}
      camera={waterScene.camera}
    />
  );
//   yield loop(function* () {
//   })
  
  // yield loop(function* () {
  //   yield* tween(8, value => {
  //     gameThree.mesh.position.set(0, 0, map(0, 3, easeInOutCubic(value)));
  //     // (gameThree.mesh.material as THREE.MeshPhongMaterial).color.setRGB(colSignal().rgb()[0],colSignal().rgb()[1],colSignal().rgb()[2]);
  //     gameThree.threeScene.updateWorldMatrix(true, true);
  //     three().rerender();
  //   });
  // });
  // yield loop(() =>
  //   tween(8, value => {
  //     gameThree.mesh.rotation.set(0, 0, value * Math.PI * 2 + 3.5);
  //     gameThree.threeScene.updateWorldMatrix(true, true);
  //     three().rerender();
  //   }),
  // );
  // yield loop(() =>
  //   tween(8, value => {
  //     gameThree.mesh.scale.set(1-value*0.1, 1-value*0.1, 1-value*0.1);
  //     gameThree.threeScene.updateWorldMatrix(true, true);
  //     three().rerender();
  //   }),
  // );
  // yield* colSignal("#0000ff", 8, easeInOutCubic);
  
});