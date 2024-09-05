import * as THREE from 'three';
import { DRACOLoader } from 'three/examples/jsm/loaders/DRACOLoader';
import {GLTF, GLTFLoader} from 'three/examples/jsm/loaders/GLTFLoader';
import { SimplifyModifier } from 'three/examples/jsm/modifiers/SimplifyModifier.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import TWEEN from '@tweenjs/tween.js'
import { Water } from 'three/examples/jsm/objects/Water2.js';
//init
const modifier = new SimplifyModifier();
const loader = new GLTFLoader();
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath( '/examples/jsm/libs/draco/' );
loader.setDRACOLoader( dracoLoader );
const threeScene = new THREE.Scene();
const hotel_loader = new THREE.TextureLoader();

// ocean
// const ocean_div = document.createElement("div");
// ocean_div.innerHTML = '<video id="ocean_video" playsinline webkit-playsinline muted loop autoplay width="320" height="240" src="src/images/ocean.mp4" style="display: none;"></video>';
// const ocean_video = (ocean_div.getElementsByTagName('video')[0] as HTMLVideoElement);
// console.log(ocean_video.src);
// const ocean_videoTexture = new THREE.VideoTexture(ocean_video);
// const ocean_videoMaterial =  new THREE.MeshBasicMaterial( {map: ocean_videoTexture, side: THREE.FrontSide, toneMapped: false} );


//hotel
const hotel_texture = hotel_loader.load('/src/images/flyer.jpg')

// plane
const planeGeometry = new THREE.PlaneGeometry(3200, 3200);
const planeMaterial = new THREE.MeshStandardMaterial({color: 0x440000});
planeMaterial.map = hotel_texture;
const plane = new THREE.Mesh(planeGeometry, planeMaterial);
plane.position.set(0,0,-50);
plane.receiveShadow = true;
threeScene.add(plane);

//light1
const directionalLight = new THREE.DirectionalLight(0xffffff, 20.0);
directionalLight.target = threeScene;
directionalLight.position.z = 20;
directionalLight.position.x = -20;
directionalLight.position.y = 20;
directionalLight.castShadow = true;
threeScene.add(directionalLight);
//light2
const directionalLight2 = new THREE.DirectionalLight(0xffffff, 20.0);
directionalLight2.target = threeScene;
directionalLight2.position.z = 20;
directionalLight2.position.x = 40;
directionalLight2.position.y = 20;
threeScene.add(directionalLight2);
//ambience
const light = new THREE.AmbientLight(0x444444); // soft white light
threeScene.add(light);
//gpu
var gpu_scene = null;
await loader.load(
	// resource URL
	'/src/models/gpu/scene.gltf',
	// called when the resource is loaded
	function ( gltf: GLTF ) {
    gpu_scene = gltf.scene.children[ 0 ].children[0].children[0].children[1];
    // z axis is to the right, x axis is forward. XYZ axis spin around XYZ axis
    const gpu_scale = 0.05;
    gpu_scene.rotation.set(1.5*Math.PI, 0, 1*Math.PI);
    gpu_scene.position.set(10,0,0);
    gpu_scene.scale.set(gpu_scale,gpu_scale,gpu_scale);
    // const mesh = (gltf.scene.children[ 0 ].children[0].children[0].children[1] as THREE.Mesh);
    // mesh.scale.set(0.4, 0.4, 0.4);
    // mesh.position.set(0,0,1);
    // const modifier = new SimplifyModifier();
    // const simplified = mesh.clone() as THREE.Mesh;
    // simplified.material = (simplified.material as THREE.MeshPhongMaterial).clone();
    // (simplified.material as THREE.MeshPhongMaterial).flatShading = true;
    // const count = Math.floor( mesh.geometry.attributes.position.count * 0.5 ); // number of vertices to remove
    // mesh.geometry = modifier.modify( mesh.geometry, count );
    threeScene.add( gpu_scene );
		gltf.animations; // Array<THREE.AnimationClip>
		gltf.scene; // THREE.Group
		gltf.scenes; // Array<THREE.Group>
		gltf.cameras; // Array<THREE.Camera>
		gltf.asset; // Object
	},
	// called while loading is progressing
	function ( xhr ) {
		console.log( ( xhr.loaded / xhr.total * 100 ) + '% loaded' );
	},
	// called when loading has errors
	function ( error ) {
		console.log(error);
	}
);
//camera
const orbit = new THREE.Group();
const camera = new THREE.PerspectiveCamera(120);
camera.position.set(10, -10, 20);
orbit.add(camera);
orbit.rotation.set(0.15*Math.PI, 0, 0*Math.PI);

threeScene.add(orbit);
threeScene.updateWorldMatrix(true, true);

export {threeScene, camera, orbit, gpu_scene};