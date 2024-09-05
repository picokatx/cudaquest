import {Camera, Circle, Gradient, Img, Knot, Layout, Node, Rect, Spline, Txt, makeScene2D} from '@motion-canvas/2d';
import {Color, PossibleVector2, Reference, Renderer, Stage, Vector2, all, chain, createRef, createRefArray, createSignal, easeInOutCubic, loop, makeRef, map, tween, waitFor,} from '@motion-canvas/core';
import { LayoutX, UnfoldStage} from '../nodes/LayoutX';
import { Paper, Window } from '../nodes';
import { NodeGrid } from '../nodes/NodeGrid';
export default makeScene2D(function* (view) {
    const attr = {
        bgColor: '#333333',
        smCol: "#004400",
        bevelSize: 20,
        textFill: "#cccccc",
        highlight_textFill: "#ffffff",
        highlight_active: "#ff0000",
        highlight_trailing: "#3f0000",
        instr_line_col: "#ffff00",
        data_line_col: "#1c96c5",
        all_line_width: 6
    }
    const colSignal = Color.createSignal("#ff0000");
    const gradient = new Gradient(
        {
            type: "linear",
            fromX: -800,
            toX: 800,
            angle: 0,
            stops: [{offset: 0.8, color: attr.bgColor},{offset: 0.9, color: "#00ff00"},{offset: 1, color: attr.bgColor}]
        }
    )
    // const knotPositions: PossibleVector2[] = [
    //     [-200, -200],
    //     [ 200, -200],
    //     [ 200,  200],
    //     [-200,  200],
    //     [-200, -200],
    // ];
    // const knots: Knot[] = [];
    const camera = createRef<Camera>();
    const sm = createRef<LayoutX>();
    const l1_icache = createRef<LayoutX>();
    const l0_partition = createRef<LayoutX>();
    const l0_icache = createRef<LayoutX>();
    const idecoder = createRef<LayoutX>();
    const l1_dcache = createRef<LayoutX>();
    const register_file = createRef<LayoutX>();
    const partitions = createRef<LayoutX>();

    const top_processing_block = createRef<LayoutX>();
    const top_register_cache = createRef<LayoutX>();
    const top_cores = createRef<LayoutX>();
    const top_cuda_cores_l = createRef<LayoutX>();
    const top_cuda_cores_r = createRef<LayoutX>();
    const top_alu_l = createRef<LayoutX>();
    const top_alu_r = createRef<LayoutX>();
    const top_tensor_l = createRef<LayoutX>();
    const top_tensor_r = createRef<LayoutX>();
    const top_math_dispatch_l = createRef<LayoutX>();
    const top_math_dispatch_r = createRef<LayoutX>();
    const top_warp_scheduler = createRef<LayoutX>();
    const bottom_processing_block = createRef<LayoutX>();
    const bottom_register_cache = createRef<LayoutX>();
    const bottom_cores = createRef<LayoutX>();
    const bottom_cuda_cores_l = createRef<LayoutX>();
    const bottom_cuda_cores_r = createRef<LayoutX>();
    const bottom_alu_l = createRef<LayoutX>();
    const bottom_alu_r = createRef<LayoutX>();
    const bottom_tensor_l = createRef<LayoutX>();
    const bottom_tensor_r = createRef<LayoutX>();
    const bottom_math_dispatch_l = createRef<LayoutX>();
    const bottom_math_dispatch_r = createRef<LayoutX>();
    const bottom_warp_scheduler = createRef<LayoutX>();

    const mio_partition = createRef<LayoutX>();
    const misc_units = createRef<LayoutX>();
    const lsu_queue = createRef<LayoutX>();
    const mufu_queue = createRef<LayoutX>();
    const mio_schduler = createRef<LayoutX>();
    const top_lsu_unit = createRef<LayoutX>();
    const bottom_lsu_unit = createRef<LayoutX>();
    const sfu_unit = createRef<LayoutX>();

    const top_math_dispatch = createRef<LayoutX>();
    const top_dispatch = createRef<LayoutX>();
    const top_single_units_r = createRef<LayoutX>();
    const top_single_units_l = createRef<LayoutX>();
    const bottom_math_dispatch = createRef<LayoutX>();
    const bottom_dispatch = createRef<LayoutX>();
    const bottom_single_units_r = createRef<LayoutX>();
    const bottom_single_units_l = createRef<LayoutX>();
    const mio_queues = createRef<LayoutX>();
    const slow_units = createRef<LayoutX>();
    const mio_buffer = createRef<LayoutX>();

    const spline0  = createRef<Spline>();
    const spline1  = createRef<Spline>();
    const spline2  = createRef<Spline>();
    const spline3  = createRef<Spline>();
    const spline4  = createRef<Spline>();
    const spline5  = createRef<Spline>();
    const spline6  = createRef<Spline>();
    const spline7  = createRef<Spline>();
    const spline8  = createRef<Spline>();
    const spline9  = createRef<Spline>();
    const spline10 = createRef<Spline>();
    const spline11 = createRef<Spline>();
    const spline12 = createRef<Spline>();
    const spline13 = createRef<Spline>();
    const spline14 = createRef<Spline>();
    const spline15 = createRef<Spline>();
    const spline16 = createRef<Spline>();
    const spline17 = createRef<Spline>();
    const spline18 = createRef<Spline>();
    const spline19 = createRef<Spline>();
    const spline20 = createRef<Spline>();
    const spline21 = createRef<Spline>();
    const spline22 = createRef<Spline>();
    const spline23 = createRef<Spline>();
    const spline24 = createRef<Spline>();
    const spline25 = createRef<Spline>();
    const spline26 = createRef<Spline>();
    const spline27 = createRef<Spline>();
    const spline28 = createRef<Spline>();
    const spline29 = createRef<Spline>();

    const data_spline0  = createRef<Spline>();
    const data_spline1  = createRef<Spline>();
    const data_spline2  = createRef<Spline>();
    const data_spline3  = createRef<Spline>();
    const data_spline4  = createRef<Spline>();
    const data_spline5  = createRef<Spline>();
    const data_spline6  = createRef<Spline>();
    const data_spline7  = createRef<Spline>();
    const data_spline8  = createRef<Spline>();
    const data_spline9  = createRef<Spline>();
    const data_spline10 = createRef<Spline>();
    const data_spline11 = createRef<Spline>();
    const data_spline12 = createRef<Spline>();
    const data_spline13 = createRef<Spline>();
    const data_spline14 = createRef<Spline>();
    const data_spline15 = createRef<Spline>();
    const data_spline16 = createRef<Spline>();
    const data_spline17 = createRef<Spline>();
    const data_spline18 = createRef<Spline>();
    const data_spline19 = createRef<Spline>();
    const data_spline20 = createRef<Spline>();
    const data_spline21 = createRef<Spline>();
    const data_spline22 = createRef<Spline>();
    const data_spline23 = createRef<Spline>();
    const data_spline24 = createRef<Spline>();
    const data_spline25 = createRef<Spline>();
    const data_spline26 = createRef<Spline>();
    const data_spline27 = createRef<Spline>();
    const data_spline28 = createRef<Spline>();
    const data_spline29 = createRef<Spline>();

    const colA = createRef<Layout>();
    const colB = createRef<Rect>();
    const rowA = createRef<Rect>();
    const rowB = createRef<Rect>();
    const rowC = createRef<Rect>();
    const text = createRef<Txt>();


    view.add(
        <>
            <Camera ref={camera}>
                <LayoutX layout
                    ref={sm}
                    attr={attr} 
                    text={"Streaming Multiprocessor"} 
                    childDir="row"
                    padding={10}
                    fill={attr.smCol}
                    size={new Vector2(1840,1000)}
                    position={new Vector2(0,0)}
                >
                    <LayoutX ref={l1_icache} attr={attr} text={"L1 Instruction Cache"} textRotation={270} maxWidth={40} grow={1}/>
                    <LayoutX ref={l0_partition} attr={attr} text={"L0 Partition"} textRotation={270} alignItems={"center"} maxWidth={40} childDir="column" grow={1}>
                        <LayoutX ref={l0_icache} attr={attr} text={"L0 Instruction Cache"} textRotation={270} maxWidth={40} grow={4}/>
                        <LayoutX ref={idecoder} attr={attr} text={"Instruction Decoder"} textRotation={270} maxWidth={40} grow={2}/>
                    </LayoutX>
                    <LayoutX ref={register_file} attr={attr} text={"Register File"} textRotation={270} maxWidth={40} grow={1}/>
                    <LayoutX ref={partitions} attr={attr} text={"Processing Partitions"} childDir="column" grow={20}>
                        <LayoutX ref={top_processing_block} attr={attr} text={"Processing Block"} childDir="column" grow={5}>
                            <LayoutX ref={top_cores} attr={attr} text={"Processing Cores"} childDir="row" grow={4}>
                                <LayoutX ref={top_cuda_cores_l} attr={attr} text={"CUDA Cores"} grow={4} />
                                <LayoutX ref={top_single_units_l} attr={attr} text={"Single Units"} childDir="column" grow={4}>
                                    <LayoutX ref={top_tensor_l} attr={attr} text={"Tensor Core"} grow={1}/>
                                    <LayoutX ref={top_alu_l} attr={attr} text={"ALU"} grow={1}/>
                                </LayoutX>
                                <LayoutX ref={top_dispatch} attr={attr} text={"Task Dispatch"} childDir={"column"} grow={4}>
                                    <LayoutX ref={top_warp_scheduler} attr={attr} text={"Warp Scheduler"} grow={1} />
                                    <LayoutX ref={top_math_dispatch} childDir={"row"} attr={attr} text={"Math Dispatch Unit"} grow={1} >
                                        <LayoutX ref={top_math_dispatch_l} attr={attr} text={"Math Dispatch Unit"} grow={1} />
                                        <LayoutX ref={top_math_dispatch_r} attr={attr} text={"Math Dispatch Unit"} grow={1} />
                                    </LayoutX>
                                </LayoutX>
                                <LayoutX ref={top_single_units_r} attr={attr} text={"Single Units"} childDir="column" grow={4}>
                                    <LayoutX ref={top_tensor_r} attr={attr} text={"Tensor Core"} grow={1}/>
                                    <LayoutX ref={top_alu_r}  attr={attr} text={"ALU"} grow={1}/>
                                </LayoutX>
                                <LayoutX ref={top_cuda_cores_r} attr={attr} text={"CUDA Cores"} grow={4}/>
                            </LayoutX>
                            <LayoutX ref={top_register_cache} attr={attr} text={"Register Cache + Operand Buffer"} grow={1}/>
                        </LayoutX>

                        <LayoutX ref={mio_partition} attr={attr} text={"MIO Partition"} childDir="row" grow={5}>
                            <LayoutX ref={mio_buffer} text={"MIO Buffer"} attr={attr} childDir={"column"} grow={1}>
                                <LayoutX ref={mio_schduler} attr={attr} text={"MIO Scheduler"} grow={1} />
                                <LayoutX ref={mio_queues} text={"MIO Queues"} attr={attr} childDir={"row"} grow={1}>
                                    <LayoutX ref={lsu_queue} attr={attr} text={"LSU Queue"} grow={1} />
                                    <LayoutX ref={mufu_queue} attr={attr} text={"SFU Queue"} grow={1} />
                                </LayoutX>
                            </LayoutX>
                            <LayoutX ref={slow_units} attr={attr} text={"Slow Units"} childDir={"column"} grow={2}>
                                <LayoutX ref={top_lsu_unit} attr={attr} text={"LSU Units"} grow={1}/>
                                <LayoutX ref={sfu_unit} attr={attr} text={"SFU Units"} grow={3}/>
                                <LayoutX ref={bottom_lsu_unit} attr={attr} text={"LSU Units"} grow={1}/>
                            </LayoutX>
                            <LayoutX ref={misc_units} attr={attr} text={"Misc Units"}  grow={1} />
                        </LayoutX>

                        <LayoutX ref={bottom_processing_block} attr={attr} text={"Processing Block"} childDir="column" grow={5}>
                            <LayoutX ref={bottom_register_cache} attr={attr} text={"Register Cache + Operand Buffer"} grow={1}/>
                            <LayoutX ref={bottom_cores} attr={attr} text={"Processing Cores"} childDir="row" grow={4}>
                                <LayoutX ref={bottom_cuda_cores_l} attr={attr} text={"CUDA Cores"} grow={4} />
                                <LayoutX ref={bottom_single_units_l} attr={attr} text={"Single Units"} childDir="column" grow={4}>
                                    <LayoutX ref={bottom_alu_l} attr={attr} text={"ALU"} grow={1}/>
                                    <LayoutX ref={bottom_tensor_l} attr={attr} text={"Tensor Core"} grow={1}/>
                                </LayoutX>
                                <LayoutX ref={bottom_dispatch} attr={attr} text={"Task Dispatch"} childDir={"column"} grow={4}>
                                    <LayoutX ref={bottom_math_dispatch} childDir={"row"} attr={attr} text={"Math Dispatch Unit"} grow={1} >
                                        <LayoutX ref={bottom_math_dispatch_l} attr={attr} text={"Math Dispatch Unit"} grow={1} />
                                        <LayoutX ref={bottom_math_dispatch_r} attr={attr} text={"Math Dispatch Unit"} grow={1} />
                                    </LayoutX>
                                    <LayoutX ref={bottom_warp_scheduler} attr={attr} text={"Warp Scheduler"} grow={1} />
                                </LayoutX>
                                <LayoutX ref={bottom_single_units_r} attr={attr} text={"Single Units"} childDir="column" grow={4}>
                                    <LayoutX ref={bottom_alu_r}  attr={attr} text={"ALU"} grow={1}/>
                                    <LayoutX ref={bottom_tensor_r} attr={attr} text={"Tensor Core"} grow={1}/>
                                </LayoutX>
                                <LayoutX ref={bottom_cuda_cores_r} attr={attr} text={"CUDA Cores"} grow={4}/>
                            </LayoutX>
                        </LayoutX>
                    </LayoutX>
                    <LayoutX ref={l1_dcache} attr={attr} text={"L1 Data Cache"} textRotation={270} maxWidth={40} grow={1}/>
                </LayoutX>
                <Layout>
                    <Spline ref={spline0} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [-1840/2-200, 0],
                        [-1840/2, -400],
                        [-1840/2+15, -400],
                    ]}/>
                    <Spline ref={spline27} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [-1840/2+43, -400],
                        [-1840/2+53, -400],
                    ]}/>
                    <Spline ref={spline1} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [-1840/2+50+20, 145],
                        [-1840/2+50+20, 160],
                    ]}/>
                    <Spline ref={spline2} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [-1840/2+50+5, 320],
                        [-1840/2+50, 320],
                        [-1840/2+50, 500],
                        [40, 500],
                        [40, 480],
                    ]}/>
                    <Spline ref={spline3} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [-270, 430],
                        [-280, 430],
                    ]}/>
                    <Spline ref={spline4} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [350, 430],
                        [360, 430],
                    ]}/>

                    <Spline ref={spline5} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [-115, 360],
                        [-115, 350],
                    ]}/>
                    <Spline ref={spline6} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [195, 360],
                        [195, 350],
                    ]}/>
                    <Spline ref={spline7} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [-270, 300],
                        [-280, 300],
                    ]}/>
                    <Spline ref={spline8} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [350, 300],
                        [360, 300],
                    ]}/>

                    <Spline ref={spline9} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [-180, 353],
                        [-180, 357],
                        [-535, 357],
                    ]}/>
                    <Spline ref={spline10} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [225, 353],
                        [225, 357],
                        [615, 357],
                    ]}/>

                    <Spline ref={spline11} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [-115, 228],
                        [-115, 218],
                    ]}/>
                    <Spline ref={spline12} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [195, 228],
                        [195, 218],
                    ]}/>

                    <Spline ref={spline13} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [195, 250],
                        [195, 163],
                    ]}/>
                    <Spline ref={spline15} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [-115, 250],
                        [-115, 163],
                    ]}/>
                    <Spline ref={spline28} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [195, 163],
                        [-650, 163],
                    ]}/>
                    <Spline ref={spline14} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [-350, 163],
                        [-350, 157],
                    ]}/>
                    <Spline ref={spline29} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [-650, 163],
                        [-650, 155],
                    ]}/>

                    <Spline ref={spline16} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [-350, 163],
                        [-350, 155],
                    ]}/>
                    <Spline ref={spline17} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [-650, 3],
                        [-650, -7],
                    ]}/>
                    <Spline ref={spline18} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [-350, 3],
                        [-350, -7],
                    ]}/>

                    <Spline ref={spline19} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [-220, -80],
                        [-213, -80],
                        [-213, -130],
                        [-205, -130],
                    ]}/>
                    <Spline ref={spline20} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [-220, -80],
                        [-213, -80],
                        [-213, 0],
                        [-205, 0],
                    ]}/>
                    <Spline ref={spline21} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [-220, -80],
                        [-213, -80],
                        [-213, 120],
                        [-205, 120],
                    ]}/>
                    <Spline ref={spline22} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [ 450, 120],
                        [ 455, 120],
                        [ 455, 163],
                        [ 875, 163],
                    ]}/>
                    <Spline ref={spline23} lineWidth={attr.all_line_width} stroke={attr.instr_line_col} end={0} smoothness={0} points={[
                        [ 450, -130],
                        [ 455, -130],
                        [ 455, -164],
                        [ 875, -164],
                    ]}/>
                </Layout>
                <Layout>
                    <Spline ref={data_spline0} lineWidth={attr.all_line_width} stroke={attr.data_line_col} end={0} smoothness={0} points={[
                        [-1840/2+110, 480],
                        [-1840/2+110, 520],
                        [750, 520],
                    ]}/>
                    <Spline ref={data_spline1} lineWidth={attr.all_line_width} stroke={attr.data_line_col} end={0} smoothness={0} points={[
                        [750, 520],
                        [750, 480],
                    ]}/>
                    <Spline ref={data_spline2} lineWidth={attr.all_line_width} stroke={attr.data_line_col} end={0} smoothness={0} points={[
                        [500, 520],
                        [500, 480],
                    ]}/>
                    <Spline ref={data_spline3} lineWidth={attr.all_line_width} stroke={attr.data_line_col} end={0} smoothness={0} points={[
                        [-400, 520],
                        [-400, 480],
                    ]}/>
                    <Spline ref={data_spline4} lineWidth={attr.all_line_width} stroke={attr.data_line_col} end={0} smoothness={0} points={[
                        [-650, 520],
                        [-650, 480],
                    ]}/>
                    <Spline ref={data_spline5} lineWidth={attr.all_line_width} stroke={attr.data_line_col} end={0} smoothness={0} points={[
                        [-1840/2+110, 480],
                        [-1840/2+110, 520],
                        [890, 520],
                        [890, 480],
                    ]}/>
                    <Spline ref={data_spline6} lineWidth={attr.all_line_width} stroke={attr.data_line_col} end={0} smoothness={0} points={[
                        [750-50, 228],
                        [750-50, 218],
                    ]}/>
                    <Spline ref={data_spline7} lineWidth={attr.all_line_width} stroke={attr.data_line_col} end={0} smoothness={0} points={[
                        [500-50, 228],
                        [500-50, 218],
                    ]}/>
                    <Spline ref={data_spline8} lineWidth={attr.all_line_width} stroke={attr.data_line_col} end={0} smoothness={0} points={[
                        [-400+50, 228],
                        [-400+50, 218],
                    ]}/>
                    <Spline ref={data_spline9} lineWidth={attr.all_line_width} stroke={attr.data_line_col} end={0} smoothness={0} points={[
                        [-650+50, 228],
                        [-650+50, 218],
                    ]}/>
                    <Spline ref={data_spline10} lineWidth={attr.all_line_width} stroke={attr.data_line_col} end={0} smoothness={0} points={[
                        [-795, 180],
                        [-785, 180],
                    ]}/>
                    <Spline ref={data_spline11} lineWidth={attr.all_line_width} stroke={attr.data_line_col} end={0} smoothness={0} points={[
                        [-795, 0],
                        [-209, 0],
                    ]}/>
                    <Spline ref={data_spline12} lineWidth={attr.all_line_width} stroke={attr.data_line_col} end={0} smoothness={0} points={[
                        [-795, 163],
                        [-213, 163],
                        [-213, 120],
                        [-207, 120],
                    ]}/>
                </Layout>
            </Camera>
        </>,
    );
    yield* camera().zoom(0.5, 0);
    yield* all(top_register_cache().fill(gradient, 0));
    yield* top_math_dispatch().backward_anim(0);
    yield* top_dispatch().backward_anim(0);
    yield* top_single_units_l().backward_anim(0);
    yield* top_single_units_r().backward_anim(0);
    yield* top_cores().backward_anim(0);
    yield* top_processing_block().backward_anim(0);

    yield* bottom_math_dispatch().backward_anim(0);
    yield* bottom_dispatch().backward_anim(0);
    yield* bottom_single_units_l().backward_anim(0);
    yield* bottom_single_units_r().backward_anim(0);
    yield* bottom_cores().backward_anim(0);
    yield* bottom_processing_block().backward_anim(0);

    yield* mio_queues().backward_anim(0);
    yield* mio_buffer().backward_anim(0);
    yield* slow_units().backward_anim(0);
    yield* mio_partition().backward_anim(0);

    yield* partitions().backward_anim(0);
    yield* l0_partition().backward_anim(0);
    yield* sm().backward_anim(0);

    yield* waitFor(1450/30)
    yield* chain(
        sm().forward_anim(1),
    );
    yield* waitFor((2220-1450)/30)
    yield* all(
        spline0().end(1, 0.5),
        l1_icache().textContainer().fill(attr.highlight_active, 1),
        l1_icache().innerText().fill(attr.highlight_textFill, 1),
    );
    yield* chain(
        l0_partition().forward_anim(1),
    )
    yield* all(
        spline0().start(1, 0.5),
        spline27().end(1, 0.5),
        l1_icache().innerText().fill(attr.textFill, 1),
        l1_icache().textContainer().fill(attr.highlight_trailing, 1),
        l0_icache().textContainer().fill(attr.highlight_active, 1),
        l0_icache().innerText().fill(attr.highlight_textFill, 1),
    );
    yield* all(
        spline27().start(1, 0.5),
        spline1().end(1, 0.5),
        l0_icache().textContainer().fill(attr.highlight_trailing, 1),
        l0_icache().innerText().fill(attr.textFill, 1),
        idecoder().textContainer().fill(attr.highlight_active, 1),
        idecoder().innerText().fill(attr.highlight_textFill, 1),
    );
    yield* waitFor((80)/30)
    yield* data_spline5().end(1,1);
    yield* waitFor((200)/30)
    yield* data_spline5().start(1,1);
    yield* partitions().forward_anim(1);
    yield* waitFor((550)/30)
    yield* chain(
        all(
            chain(
                top_processing_block().forward_anim(1),
                top_cores().forward_anim(1),
                all(top_single_units_r().forward_anim(1), top_single_units_l().forward_anim(1)),
                top_dispatch().forward_anim(1),
                top_math_dispatch().forward_anim(1),
            ),
            chain(
                bottom_processing_block().forward_anim(1),
                bottom_cores().forward_anim(1),
                all(bottom_single_units_r().forward_anim(1), bottom_single_units_l().forward_anim(1)),
                bottom_dispatch().forward_anim(1),
                bottom_math_dispatch().forward_anim(1),
            ),
        ),
    );
    yield* all(
        spline1().start(1, 0.5),
        spline2().end(1, 0.5),
        idecoder().textContainer().fill(attr.highlight_trailing, 1),
        bottom_warp_scheduler().textContainer().fill(attr.highlight_active, 1)
    );
    yield* waitFor((350)/30)
    yield* all(
        spline2().start(1, 0.5),
        spline5().end(1, 0.5),
        spline6().end(1, 0.5),
        idecoder().innerText().fill(attr.textFill, 1),
        bottom_warp_scheduler().textContainer().fill(attr.highlight_trailing, 1),

        bottom_math_dispatch_l().textContainer().fill(attr.highlight_active, 1),
        bottom_math_dispatch_r().textContainer().fill(attr.highlight_active, 1),
        bottom_math_dispatch_l().innerText().fill(attr.highlight_textFill, 1),
        bottom_math_dispatch_r().innerText().fill(attr.highlight_textFill, 1),
    );
    yield* waitFor((250)/30)
    // yield* all(
    //     spline5().start(1, 0.5),
    //     spline6().start(1, 0.5),
    //     spline3().end(1, 0.5),
    //     spline4().end(1, 0.5),
    //     bottom_tensor_l().textContainer().fill(attr.highlight_active, 1),
    //     bottom_tensor_r().textContainer().fill(attr.highlight_active, 1),
    //     bottom_tensor_l().innerText().fill(attr.highlight_textFill, 1),
    //     bottom_tensor_r().innerText().fill(attr.highlight_textFill, 1),
    // );
    yield* all(
        spline3().start(1, 0.5),
        spline4().start(1, 0.5),
        spline7().end(1, 0.5),
        spline8().end(1, 0.5),
        bottom_tensor_l().innerText().fill(attr.textFill, 1),
        bottom_tensor_r().innerText().fill(attr.textFill, 1),
        bottom_math_dispatch_l().innerText().fill(attr.textFill, 1),
        bottom_math_dispatch_r().innerText().fill(attr.textFill, 1),
        bottom_tensor_l().textContainer().fill(attr.highlight_trailing, 1),
        bottom_tensor_r().textContainer().fill(attr.highlight_trailing, 1),
        bottom_math_dispatch_l().textContainer().fill(attr.highlight_trailing, 1),
        bottom_math_dispatch_r().textContainer().fill(attr.highlight_trailing, 1),
        bottom_alu_l().textContainer().fill(attr.highlight_active, 1),
        bottom_alu_r().textContainer().fill(attr.highlight_active, 1),
        bottom_alu_l().innerText().fill(attr.highlight_textFill, 1),
        bottom_alu_r().innerText().fill(attr.highlight_textFill, 1),
    );
    yield* waitFor((250)/30)
    yield* all(
        spline9().end(1, 0.5),
        spline10().end(1, 0.5),
        bottom_cuda_cores_l().textContainer().fill(attr.highlight_active, 1),
        bottom_cuda_cores_r().textContainer().fill(attr.highlight_active, 1),
        bottom_cuda_cores_l().innerText().fill(attr.highlight_textFill, 1),
        bottom_cuda_cores_r().innerText().fill(attr.highlight_textFill, 1),
    );
    yield* waitFor((400)/30)
    yield* chain(
        data_spline0().end(1,0.5),
        all(
            data_spline1().end(1,0.5),
            data_spline2().end(1,0.5),
            data_spline3().end(1,0.5),
            data_spline4().end(1,0.5)
        )
    )
    yield* waitFor((1200)/30)
    yield* all(
        data_spline0().start(1,0.5),
        all(
            data_spline1().start(1,0.5),
            data_spline2().start(1,0.5),
            data_spline3().start(1,0.5),
            data_spline4().start(1,0.5)
        ),
        spline9().start(1, 0.5),
        spline10().start(1, 0.5),
        spline7().start(1, 0.5),
        spline8().start(1, 0.5),
        spline11().end(1, 0.5),
        spline12().end(1, 0.5),
        bottom_cuda_cores_l().innerText().fill(attr.textFill, 1),
        bottom_cuda_cores_r().innerText().fill(attr.textFill, 1),
        bottom_cuda_cores_l().textContainer().fill(attr.highlight_trailing, 1),
        bottom_cuda_cores_r().textContainer().fill(attr.highlight_trailing, 1),
        bottom_alu_l().innerText().fill(attr.textFill, 1),
        bottom_alu_r().innerText().fill(attr.textFill, 1),
        bottom_alu_l().textContainer().fill(attr.highlight_trailing, 1),
        bottom_alu_r().textContainer().fill(attr.highlight_trailing, 1),
        bottom_register_cache().textContainer().fill(attr.highlight_active, 1),
        bottom_register_cache().innerText().fill(attr.highlight_textFill, 1),
    );
    yield* waitFor((140)/30)
    yield* all(
        data_spline6().end(1,1),
        data_spline7().end(1,1),
        data_spline8().end(1,1),
        data_spline9().end(1,1),
    )
    yield* data_spline10().end(1,1);
    yield* all(
        data_spline6().start(1,1),
        data_spline7().start(1,1),
        data_spline8().start(1,1),
        data_spline9().start(1,1),
        data_spline10().start(1,1),
        spline11().start(1, 0.5),
        spline12().start(1, 0.5),
        bottom_register_cache().textContainer().fill(attr.highlight_trailing, 1),
        bottom_register_cache().innerText().fill(attr.textFill, 1),
    );
    yield* chain(
        mio_partition().forward_anim(1),
        slow_units().forward_anim(1),
        mio_buffer().forward_anim(1),
        mio_queues().forward_anim(1),
    );
    yield* chain(
        all(spline13().end(1, 0.5), spline15().end(1, 0.5)),
        all(
            chain(
                spline28().end(1,0.5),
                all(
                    spline29().end(1, 0.5),
                    spline14().end(1, 0.5),
                )
            ),
            lsu_queue().textContainer().fill(attr.highlight_active, 1),
            mufu_queue().textContainer().fill(attr.highlight_active, 1),
            lsu_queue().innerText().fill(attr.highlight_textFill, 1),
            mufu_queue().innerText().fill(attr.highlight_textFill, 1),
        ),
    );
    yield* waitFor((30)/30)
    yield* all(
        chain(
            all(spline13().start(1, 0.5), spline15().start(1, 0.5)),
            all(
                chain(
                    spline28().start(1,0.5),
                    all(
                        spline29().start(1, 0.5),
                        spline14().start(1, 0.5),
                    )
                ),
                lsu_queue().innerText().fill(attr.textFill, 1),
                mufu_queue().innerText().fill(attr.textFill, 1),
                lsu_queue().textContainer().fill(attr.highlight_trailing, 1),
                mufu_queue().textContainer().fill(attr.highlight_trailing, 1),
            ),
        ),
        spline17().end(1, 0.5),
        spline18().end(1, 0.5),
        mio_schduler().textContainer().fill(attr.highlight_active, 1),
        mio_schduler().innerText().fill(attr.highlight_textFill, 1),
    );
    yield* waitFor((160)/30)
    yield* all(
        spline17().start(1, 0.5),
        spline18().start(1, 0.5),
        mio_schduler().innerText().fill(attr.textFill, 1),
        mio_schduler().textContainer().fill(attr.highlight_trailing, 1),
        chain(
            all(spline19().end(1, 0.5),top_lsu_unit().textContainer().fill(attr.highlight_active, 1),     top_lsu_unit().innerText().fill(attr.highlight_textFill, 1),
                spline21().end(1, 0.5), bottom_lsu_unit().textContainer().fill(attr.highlight_active, 1), bottom_lsu_unit().innerText().fill(attr.highlight_textFill, 1)),
            all(spline20().end(1, 0.5), sfu_unit().textContainer().fill(attr.highlight_active, 1),        sfu_unit().innerText().fill(attr.highlight_textFill, 1))
        ),
    );
    yield* waitFor((900)/30)
    
    yield* all(
        data_spline11().end(1,1),
        data_spline12().end(1,1)
    )
    yield* waitFor((250)/30)
    yield* all(
        spline19().start(1, 0.5), top_lsu_unit().textContainer().fill(attr.highlight_trailing, 1),top_lsu_unit().innerText().fill(attr.textFill, 1),
        spline20().start(1, 0.5), bottom_lsu_unit().textContainer().fill(attr.highlight_trailing, 1),bottom_lsu_unit().innerText().fill(attr.textFill, 1),
        spline21().start(1, 0.5), sfu_unit().textContainer().fill(attr.highlight_trailing, 1),sfu_unit().innerText().fill(attr.textFill, 1),
        spline22().end(1, 0.5),
        spline23().end(1, 0.5),
        l1_dcache().innerText().fill(attr.highlight_textFill, 1),
        l1_dcache().textContainer().fill(attr.highlight_active, 1)
        
    );
    yield* all(
        spline22().start(1, 0.5),
        spline23().start(1, 0.5),
        l1_dcache().innerText().fill(attr.textFill, 1),
        l1_dcache().textContainer().fill(attr.highlight_trailing, 1)
    );







    //reverse
    yield* chain(
        chain(
            mio_queues().backward_anim(1),
            mio_buffer().backward_anim(1),
            slow_units().backward_anim(1),
            mio_partition().backward_anim(1),
        ),
        all(
            chain(
                top_math_dispatch().backward_anim(1),
                top_dispatch().backward_anim(1),
                all(top_single_units_r().backward_anim(1), top_single_units_l().backward_anim(1)),
                top_cores().backward_anim(1),
                top_processing_block().backward_anim(1),
            ),
            chain(
                bottom_math_dispatch().backward_anim(1),
                bottom_dispatch().backward_anim(1),
                all(bottom_single_units_r().backward_anim(1), bottom_single_units_l().backward_anim(1)),
                bottom_cores().backward_anim(1),
                bottom_processing_block().backward_anim(1),
            ),
        ),
        partitions().backward_anim(1),
        l0_partition().backward_anim(1),
        sm().backward_anim(1),
    );

                /* <>
                    <Rect layout direction={"column"} width={440} height={240} position={new Vector2(-400, -700)}>
                        <Rect ref={colA} gap={10} direction="row" grow={1}>
                            <Rect ref={rowA} grow={1} fill={"red"} radius={10} />
                            <Rect ref={rowB} grow={1} fill={'#242424'} radius={10} />
                            <Rect ref={rowC} grow={1} fill={'#242424'} radius={10} />
                        </Rect>
                        <Rect ref={colB} grow={0} fill={'#242424'} radius={10} alignItems={"center"} direction={"column"}>
                            <Txt ref={text} grow={1} fill={attr.bgColor} fontSize={0} alignContent={"space-around"}>hui</Txt>
                        </Rect>
                    </Rect>
                </>, */
    // yield* all(
    //     rowA().margin(-10, 0.5),
    //     rowB().margin(-10, 0.5),
    //     rowC().margin(-10, 0.5),
    //     colA().margin(10, 0.5),

    //     rowA().radius(0, 0.5),
    //     rowB().radius(0, 0.5),
    //     rowC().radius(0, 0.5),
    //     colB().radius(0, 0.5)
    // );
    // yield* all(
    //     colB().grow(1, 0.5),
    //     colA().grow(0, 0.5),
    //     text().fill("#ffffff", 0.5),
    //     text().fontSize(32, 0.5)
    // );
    // yield* all(
    //     rowA().margin(0, 0.5),
    //     rowB().margin(0, 0.5),
    //     rowC().margin(0, 0.5),
    //     // colA().margin(0, 1),
    // );
    // yield* all(
    //     colA().margin(0, 0.5),
    // )
    // <NodeGrid ref={top_lsu_unit} attr={attr} rows={4} cols={1} data={[["LSU","LSU","LSU","LSU"]]} grow={1}/>
    // <NodeGrid ref={sfu_unit} attr={attr} rows={4} cols={2} data={[["SFU","SFU","SFU","SFU"],["SFU","SFU","SFU","SFU"]]} grow={3}/>
    // <NodeGrid ref={bottom_lsu_unit} attr={attr} rows={4} cols={1} data={[["LSU","LSU","LSU","LSU"]]} grow={1}/>
    yield* all(gradient.stops([{offset: 0, color: attr.bgColor},{offset: 0.1, color: "#00ff00"},{offset: 0.2, color: attr.bgColor}], 2));

    // yield* top_math_dispatch().backward_anim();

    // yield* all(
    //     temp().fold_progression(0,0.5),
    //     chain(top_math_dispatch_l().fold_progression(1,0.25),top_math_dispatch_l().fold_stage(1,0), top_math_dispatch_l().fold_progression(0,0), top_math_dispatch_l().fold_progression(1,0.25)),
    //     chain(top_math_dispatch_r().fold_progression(1,0.25),top_math_dispatch_r().fold_stage(1,0), top_math_dispatch_r().fold_progression(0,0), top_math_dispatch_r().fold_progression(1,0.25)),
    // ),
    // yield* all(temp().fold_stage(2,0), top_math_dispatch_l().fold_stage(2,0), top_math_dispatch_r().fold_stage(2,0)),
    // yield* all(temp().fold_progression(1,0), top_math_dispatch_l().fold_progression(0,0), top_math_dispatch_r().fold_progression(0,0)),

    // yield* all(temp().fold_progression(0,0.5), top_math_dispatch_l().fold_progression(1,0.5), top_math_dispatch_r().fold_progression(1,0.5)),
    // yield* all(temp().fold_stage(1,0), top_math_dispatch_l().fold_stage(3,0), top_math_dispatch_r().fold_stage(3,0)),
    // yield* all(temp().fold_progression(1,0), top_math_dispatch_l().fold_progression(0,0), top_math_dispatch_r().fold_progression(0,0)),

    // yield* all(temp().fold_progression(0,0.5), top_math_dispatch_l().fold_progression(1,0.5), top_math_dispatch_r().fold_progression(1,0.5)),
    // yield* temp().fold_stage(0,0),
    // yield* temp().fold_progression(1,0),
    // yield* temp().fold_progression(0,0.5),
    // yield* all(
    //     top_math_dispatch().innerText().fontSize(1,0)
    // );
    // top_math_dispatch().innerText().remove();
    // yield* all(
    //     top_math_dispatch().margin(20, 1),
    //     top_math_dispatch_l().margin(0, 1),
    //     top_math_dispatch_r().margin(0, 1),
    //     top_math_dispatch_l().innerText().fill(attr.bgColor, 1),
    //     top_math_dispatch_r().innerText().fill(attr.bgColor, 1),
    //     top_math_dispatch_l().innerText().size(new Vector2(1,1),1),
    //     top_math_dispatch_r().innerText().size(new Vector2(1,1),1),
    //     top_math_dispatch_l().innerText().fontSize(1,1),
    //     top_math_dispatch_r().innerText().fontSize(1,1),
        
    //     // (l0_icache().children[0] as Txt).opacity(0,2)
    // )
    // top_math_dispatch_l().remove();
    // top_math_dispatch_r().remove();
    // yield* all(
    //     top_math_dispatch().innerText().text("yay",1),
    // );
    //   yield loop(function* () {
//   })
  
    // yield* all(
    //     knots[1].position.y(80, 1).to(-80, 1),
    //     knots[2].position.y(-80, 1).to(80, 1),
    //     knots[3].position.y(80, 1).to(-80, 1),
    // );

    // <Spline lineWidth={6} stroke={'lightseagreen'} smoothness={0}>
    // {knotPositions.map((pos, i) => (
    //     <Knot ref={makeRef(knots, i)} position={pos} />
    // ))}
    // </Spline>,
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
  
//   <Rect ref={bottom_processing_block} gap={10} direction="column" grow={5}>
//   <LayoutX ref={bottom_register_cache} attr={attr} text={"Register Cache"} grow={1}/>
//   <Rect ref={bottom_cores} gap={10} direction="row" grow={4}>
//       <LayoutX ref={bottom_cuda_cores_l} attr={attr} text={"CUDA Cores"} grow={4} />
//       <Rect gap={10} direction="column" grow={4}>
//           <LayoutX ref={bottom_alu_l} attr={attr} text={"ALU"} grow={1}/>
//           <LayoutX ref={bottom_tensor_l} attr={attr} text={"Tensor Core"} grow={1}/>
//       </Rect>
//       <Rect gap={10} direction="column" grow={4}>
//           <Rect gap={10} direction="row" grow={1}>
//               <LayoutX ref={bottom_math_dispatch_l} attr={attr} text={"Math Dispatch Unit"} grow={1} />
//               <LayoutX ref={bottom_math_dispatch_r} attr={attr} text={"Math Dispatch Unit"} grow={1} />
//           </Rect>
//           <LayoutX ref={bottom_warp_scheduler} attr={attr} text={"Warp Scheduler"} grow={1} />
//       </Rect>
//       <Rect gap={10} direction="column" grow={4}>
//           <LayoutX ref={bottom_alu_r}  attr={attr} text={"ALU"} grow={1}/>
//           <LayoutX ref={bottom_tensor_r} attr={attr} text={"Tensor Core"} grow={1}/>
//       </Rect>
//       <LayoutX ref={bottom_cuda_cores_r} attr={attr} text={"CUDA Cores"} grow={4}/>
//   </Rect>
// </Rect>
});