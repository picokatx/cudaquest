import {ComponentChild, ComponentChildren, Layout, Line, Node, Rect, RectProps, Shape, Txt, initial, signal} from '@motion-canvas/2d';
import {Color, Reference, SimpleSignal, all, chain, createEffect, createRef, createRefArray, createSignal, easeInOutCubic, makeRef, map, tween} from '@motion-canvas/core';
import { FlexDirection } from '@motion-canvas/2d';
export interface LayoutXProps extends RectProps {
  text: string;
  textRotation?: number;
  childDir?: FlexDirection,
  attr: {bgColor: string, bevelSize: number, textFill: string, smCol: string};
}
export enum UnfoldStage {
  MELD = 0,
  ROLLUP = 1,
  CRUMPLE = 2,
  FILLUP = 3,
}
export class LayoutX extends Rect {

  @initial(1)
  @signal()
  public declare readonly fold_progression: SimpleSignal<number, this>;

  @initial(UnfoldStage.FILLUP)
  @signal()
  public declare readonly fold_stage: SimpleSignal<UnfoldStage, this>;

  public declare readonly innerText: Reference<Txt>;
  public declare readonly childContainer: Reference<Rect>;
  public declare readonly textContainer: Reference<Rect>;

  public constructor({children, attr, text = "", textRotation = 0, childDir='column', ...props}: LayoutXProps) {
    super({
      alignItems: "stretch",
      direction: 'column', //childDir=='column' ? 'row' : 'column'
      radius: attr.bevelSize,
      fill: undefined,
      ...props,
    });
    this.innerText = createRef<Txt>();
    this.childContainer = createRef<Rect>();
    this.textContainer = createRef<Rect>();
    const textColSignal = createSignal(() => {
      // console.log('textColSignal!');
      return this.fold_stage()==UnfoldStage.ROLLUP ? Color.lerp(attr.bgColor, attr.textFill, this.fold_progression()) : (this.fold_stage()==UnfoldStage.MELD ? attr.bgColor : attr.textFill);
    });
    const textSizeSignal = createSignal(() => {
      // console.log('textSizeSignal!');
      return this.fold_stage()==UnfoldStage.ROLLUP ? map(0, 32, (this.fold_progression())) : (this.fold_stage()==UnfoldStage.MELD ? 0 : 32);
    });
    const childContainerMarginSignal = createSignal(() => {
      // console.log('childContainerMarginSignal!');
      return this.fold_stage()==UnfoldStage.MELD ? map(0, 10, this.fold_progression()) : (this.fold_stage()==UnfoldStage.FILLUP ? map(10, 0, this.fold_progression()) : 10);
    });
    const textContainerRadiusSignal = createSignal(() => {
      // console.log('textContainerRadiusSignal!');
      return this.fold_stage()==UnfoldStage.MELD ? map(10, 0, this.fold_progression()) : 0;
    });
    const childMarginSignal = createSignal(() => {
      console.log('childMarginSignal!');
      switch (this.fold_stage()) {
        case UnfoldStage.MELD: return map(0, -10, this.fold_progression());
        case UnfoldStage.ROLLUP: return -10;
        case UnfoldStage.CRUMPLE: return map(-10, 0, this.fold_progression());
        case UnfoldStage.FILLUP: return 0;
      }
    });
    const childRadiusSignal = createSignal(() => {
      console.log('childRadiusSignal!');
      return this.fold_stage()==UnfoldStage.ROLLUP ? map(0, 10, this.fold_progression()) : 10;
    });
    const childContainerGrowSignal = createSignal(() => {
      // console.log('childContainerGrowSignal!');
      return this.fold_stage()==UnfoldStage.ROLLUP ? map(1, 0, this.fold_progression()) : (this.fold_stage()==UnfoldStage.MELD ? 1 : 0);
    });
    const textContainerGrowSignal = createSignal(() => {
      // console.log('textContainerGrowSignal!');
      return this.fold_stage()==UnfoldStage.ROLLUP ? map(0, 1, this.fold_progression()) : (this.fold_stage()==UnfoldStage.MELD ? 0 : 1);
    });
    const gapSignal = createSignal(() => {
      // console.log('childContainerMarginSignal!');
      var temp_parent: LayoutX = this.parent() as LayoutX;
      while (temp_parent!=null) {
        if (typeof temp_parent.fold_stage != 'undefined') {
          if (temp_parent.fold_stage()==UnfoldStage.MELD) {
            return map(0, 10, temp_parent.fold_progression())
          }
        }
        temp_parent = temp_parent.parent() as LayoutX;
      }
      return 10;
    });
    const childContainer_layout = 
      <Rect ref={this.childContainer} margin={childContainerMarginSignal} direction={childDir} grow={childContainerGrowSignal}>
        {children}
      </Rect>
     const textContainer_layout =
      <Rect 
        ref={this.textContainer}
        grow={textContainerGrowSignal}
        stroke={attr.smCol}
        lineWidth={10}
        fill={attr.bgColor}
        radius={0}
        alignItems={"center"}
        direction={"column"}
        maxWidth={props.maxWidth}
      >
        <Txt 
        ref={this.innerText} 
        text={text} rotation={textRotation}
        grow={1}
        fill={textColSignal}
        fontSize={textSizeSignal}
        alignContent={"space-around"}
        />
      </Rect>
    this.add(childContainer_layout);
    this.add(textContainer_layout);
    
    // this.add(children);
    // this.add(<Txt ref={this.innerText} text={text} rotation={textRotation} fill={attr.textFill} grow={1} fontSize={32} alignContent={"space-around"}></Txt>);
  }
  public* forward_anim(speed: number) {
    const time_stage1 = speed*0.5
    yield* this.fold_stage(3,0);
    yield* this.fold_progression(1,0);
    yield* all(
        ...this.childContainer().children().map((node: LayoutX) => {
          if ((typeof node.fold_progression=='function'))
          return chain(node.fold_stage(0,0),node.fold_progression(0,0))
        })
    )
    yield* all(
        this.fold_progression(0,time_stage1),
        ...this.childContainer().children().map((node: LayoutX) => {
          if ((typeof node.fold_progression=='function'))
          return chain(node.fold_progression(1,time_stage1/2),node.fold_stage(1,0), node.fold_progression(0,0), node.fold_progression(1,time_stage1/2))
        })
    )
    yield* all(this.fold_stage(2,0),
    ...this.childContainer().children().map((node: LayoutX) => {
      if ((typeof node.fold_progression=='function'))
      return chain(node.fold_stage(2,0))
    }))
    yield* all(this.fold_progression(1,0),
    ...this.childContainer().children().map((node: LayoutX) => {
      if ((typeof node.fold_progression=='function'))
      return chain(node.fold_progression(0,0))
    }))
    const time_stage2 = speed*0.1
    yield* all(this.fold_progression(0,time_stage2),
    ...this.childContainer().children().map((node: LayoutX) => {
      if ((typeof node.fold_progression=='function'))
      return chain(node.fold_progression(1,time_stage2))
    }))
    yield* all(this.fold_stage(1,0),
    ...this.childContainer().children().map((node: LayoutX) => {
      if ((typeof node.fold_progression=='function'))
      return chain(node.fold_stage(3,0))
    }))
    yield* all(this.fold_progression(1,0),
    ...this.childContainer().children().map((node: LayoutX) => {
      if ((typeof node.fold_progression=='function'))
      return chain(node.fold_progression(0,0))
    }))
    const time_stage3 = speed*0.3
    yield* all(this.fold_progression(0,time_stage3),
    ...this.childContainer().children().map((node: LayoutX) => {
      if ((typeof node.fold_progression=='function'))
      return chain(node.fold_progression(1,time_stage3))
    }))
    const time_stage4 = speed*0.5
    yield* this.fold_stage(0,0)
    yield* this.fold_progression(1,0)
    yield* this.fold_progression(0,time_stage4)
  }
  public* backward_anim(speed: number) {
    const time_stage4 = speed*0.5
    yield* all(
        ...this.childContainer().children().map((node: LayoutX) => {
          if ((typeof node.fold_progression=='function'))
          return chain(node.fold_stage(3,0),node.fold_progression(1,0))
        })
    )
    yield* this.fold_stage(0,0);
    yield* this.fold_progression(0,0);

    yield* this.fold_progression(1,time_stage4)
    yield* this.fold_stage(1,0)
    yield* this.fold_progression(0,0)
    const time_stage3 = speed*0.3
    yield* all(this.fold_progression(1,time_stage3),
    ...this.childContainer().children().map((node: LayoutX) => {
      if ((typeof node.fold_progression=='function'))
      return chain(node.fold_progression(0,time_stage3))
    }))
    const time_stage2 = speed*0.1
    yield* all(this.fold_progression(0,0),
    ...this.childContainer().children().map((node: LayoutX) => {
      if ((typeof node.fold_progression=='function'))
      return chain(node.fold_progression(1,0))
    }))
    yield* all(this.fold_stage(2,0),
    ...this.childContainer().children().map((node: LayoutX) => {
      if ((typeof node.fold_progression=='function'))
      return chain(node.fold_stage(2,0))
    }))
    yield* all(this.fold_progression(1,time_stage2),
    ...this.childContainer().children().map((node: LayoutX) => {
      if ((typeof node.fold_progression=='function'))
      return chain(node.fold_progression(0,time_stage2))
    }))
    const time_stage1 = speed*0.5
    yield* all(this.fold_progression(0,0),
    ...this.childContainer().children().map((node: LayoutX) => {
      if ((typeof node.fold_progression=='function'))
      return chain(node.fold_progression(1,0))
    }))
    yield* all(this.fold_stage(3,0),
    ...this.childContainer().children().map((node: LayoutX) => {
      if ((typeof node.fold_progression=='function'))
      return chain(node.fold_stage(1,0))
    }))
    yield* all(
      this.fold_progression(1,time_stage1),
      ...this.childContainer().children().map((node: LayoutX) => {
        if ((typeof node.fold_progression=='function'))
        return chain(node.fold_progression(0,time_stage1/2),node.fold_stage(0,0), node.fold_progression(1,0), node.fold_progression(0,time_stage1/2))
      })
    )
  }
  // public override insert(node: ComponentChildren, index = 0): this {
  //   if (typeof (node as Node).add==='function') {
  //     // console.log((node as Node).absolutePosition());
  //   }
  //   if (typeof (node as []).length === 'number') {
  //     console.log("nah")
  //   }
  //   if (typeof (node as LayoutX).innerText==='function') {
  //     console.log((node as LayoutX).innerText().text());
  //   }
  //   return super.insert(node);
  // }
}
// export function LayoutX({
//   children,
//   attr,
//   text,
//   textRotation=0,
//   unfold=false,
//   ...props
// }: RectProps & {text: string, textRotation?: number, unfold?: boolean, attr: {bgColor: string, bevelSize: number, textFill: string}}) {
//   if (unfold) {
//     return (<Rect alignItems={"center"} direction={"column"} {...props}>
//       {children}
//     </Rect>
//     ) as Rect;
//   } else {
//     return (
//       <Rect fill={attr.bgColor} radius={attr.bevelSize} alignItems={"center"} direction={"column"} {...props}>
//         <Txt text={text} rotation={textRotation} fill={attr.textFill} grow={1} fontSize={32} alignContent={"space-around"}></Txt>
//       </Rect>
//     ) as Rect;
//   }
// }
