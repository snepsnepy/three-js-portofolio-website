import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000 )

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector("#bg")
})

renderer.setPixelRatio( window.devicePixelRatio )
renderer.setSize ( window.innerWidth, window.innerHeight )
camera.position.setZ(0)

//Torus Geometry

const geometry = new THREE.TorusGeometry(10.5, 2.5, 16, 100)
const material = new THREE.MeshStandardMaterial({ color: 0x5a0be3 })
const torus = new THREE.Mesh(geometry, material)

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(3, 3, 3)
const ambientLight = new THREE.AmbientLight(0xffffff)

scene.add(ambientLight)

// const lightHelper = new THREE.PointLightHelper(pointLight)
// const gridHelper = new THREE.GridHelper(200, 50)
// scene.add(gridHelper)

// const controls = new OrbitControls(camera, renderer.domElement)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.10, 50, 50);
  const material = new THREE.MeshStandardMaterial( {color: 0xffffff })
  const star = new THREE.Mesh(geometry, material)

  const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ))

  star.position.set(x, y, z)
  scene.add(star)
}

Array(300).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('universe.jpg');
scene.background = spaceTexture

//Avatar

const snepTexture = new THREE.TextureLoader().load('snep.png')

const snep = new THREE.Mesh(
  new THREE.BoxGeometry(5, 5, 5),
  new THREE.MeshBasicMaterial( {map: snepTexture })
)

scene.add(snep)

//Moon

const moonTexture = new THREE.TextureLoader().load('moon.jpg')
const normalTexture = new THREE.TextureLoader().load('normal.jpg')

const moon = new THREE.Mesh(
  new THREE.SphereGeometry(3, 32, 32),
  new THREE.MeshStandardMaterial({
    map: moonTexture,
    normalMap: normalTexture
  })
)
scene.add(moon)

moon.position.z = 30;
moon.position.setX(-10);

//Saturn

const saturnTexture = new THREE.TextureLoader().load('saturn.jpg')

const saturn = new THREE.Mesh(
  new THREE.SphereGeometry(7, 32, 32),
  new THREE.MeshStandardMaterial({
    map: saturnTexture
  })
)
scene.add(saturn)

saturn.position.z = 50;
saturn.position.setX(15);

//Earth

const earthTexture = new THREE.TextureLoader().load('earth.jpg')

const earth = new THREE.Mesh(
  new THREE.SphereGeometry(15, 40, 40),
  new THREE.MeshStandardMaterial({
    map: earthTexture
  })
)
scene.add(earth)

earth.position.z = 80;
earth.position.setX(-30);

//Sun

const sunTexture = new THREE.TextureLoader().load('sun.jpg')

const sun = new THREE.Mesh(
  new THREE.SphereGeometry(20, 50, 50),
  new THREE.MeshStandardMaterial({
    map: sunTexture
  })
)
scene.add(sun)

sun.position.z = 120;
sun.position.setX(30);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;
  moon.rotation.x += 0.05
  moon.rotation.y += 0.075
  moon.rotation.z += 0.05

  saturn.rotation.y += 0.020

  earth.rotation.y += 0.030

  sun.rotation.z += 0.010
  sun.rotation.y += 0.010

  snep.rotation.y += 0.01
  snep.rotation.z += 0.01

  camera.position.z = t * -0.05
  camera.position.x = t * -0.0002
  camera.position.y = t * -0.0002
}

document.body.onscroll = moveCamera

function animate() {
  requestAnimationFrame( animate )

  torus.rotation.x += 0.01
  torus.rotation.y += 0.005
  torus.rotation.z += 0.01

  renderer.render( scene, camera )
}

animate()
