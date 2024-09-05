import * as THREE from 'three';

import { GUI } from 'three/examples/jsm/libs/lil-gui.module.min.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { Water } from 'three/examples/jsm/objects/Water2.js';

let scene: THREE.Scene;
let camera: THREE.PerspectiveCamera;
let clock: THREE.Clock;
let water: Water;
let torusKnot: THREE.Mesh;

const params = {
    color: '#ffffff',
    scale: 4,
    flowX: 1,
    flowY: 1
};


// scene

scene = new THREE.Scene();

// camera

camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 0.1, 200 );
camera.position.set( - 15, 7, 15 );
camera.lookAt( scene.position );

// clock

clock = new THREE.Clock();

// ground

const groundGeometry = new THREE.PlaneGeometry( 20, 20 );
const groundMaterial = new THREE.MeshStandardMaterial( { roughness: 0.8, metalness: 0.4 } );
const ground = new THREE.Mesh( groundGeometry, groundMaterial );
ground.rotation.x = Math.PI * - 0.5;
scene.add( ground );

const textureLoader = new THREE.TextureLoader();
textureLoader.load( 'src/images/hardwood2_diffuse.jpg', function ( map ) {

    map.wrapS = THREE.RepeatWrapping;
    map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 16;
    map.repeat.set( 4, 4 );
    map.colorSpace = THREE.SRGBColorSpace;
    groundMaterial.map = map;
    groundMaterial.needsUpdate = true;

} );

const torusKnotGeometry = new THREE.TorusKnotGeometry( 3, 1, 256, 32 );
const torusKnotMaterial = new THREE.MeshNormalMaterial();

torusKnot = new THREE.Mesh( torusKnotGeometry, torusKnotMaterial );
torusKnot.position.y = 6;
torusKnot.scale.set( 0.5, 0.5, 0.5 );
scene.add( torusKnot );

// water

const waterGeometry = new THREE.PlaneGeometry( 20, 20 );

water = new Water( waterGeometry, {
    color: params.color,
    scale: params.scale,
    flowDirection: new THREE.Vector2( params.flowX, params.flowY ),
    textureWidth: 1024,
    textureHeight: 1024
} );

water.position.y = 2;
water.rotation.x = Math.PI * - 0.5;
scene.add( water );

// skybox

const cubeTextureLoader = new THREE.CubeTextureLoader();
cubeTextureLoader.setPath( 'src/images/park2/' );

const cubeTexture = cubeTextureLoader.load( [
    'posx.jpg', 'negx.jpg',
    'posy.jpg', 'negy.jpg',
    'posz.jpg', 'negz.jpg'
] );

scene.background = cubeTexture;

// light

const ambientLight = new THREE.AmbientLight( 0xe7e7e7, 1.2 );
scene.add( ambientLight );

const directionalLight = new THREE.DirectionalLight( 0xffffff, 2 );
directionalLight.position.set( - 1, 1, 1 );
scene.add( directionalLight );




export {scene, camera, clock};