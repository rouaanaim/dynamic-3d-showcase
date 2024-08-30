import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import GUI from 'lil-gui'
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry.js'
import gsap from 'gsap'
console.log(gsap);
/**
 * Base
 */
// Debug
const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Axes helper
const axesHelper = new THREE.AxesHelper()
// scene.add(axesHelper)
/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader()
const textMatcapText = textureLoader.load('/textures/matcaps/4.png')
textMatcapText.colorSpace = THREE.SRGBColorSpace
const cubeMatcapText = textureLoader.load('/textures/matcaps/8.png')
cubeMatcapText.colorSpace = THREE.SRGBColorSpace
const sphereMatcapText = textureLoader.load('/textures/matcaps/10.jpg')
sphereMatcapText.colorSpace = THREE.SRGBColorSpace
// const donutMatcapText = textureLoader.load('/textures/matcaps/8.png')
// donutMatcapText.colorSpace = THREE.SRGBColorSpace
// console.log(matcapTexture);


/**
 * Fonts
 */

let text

const donuts = [];
const spheres = [];
const cubes = [];

const fontLoader = new FontLoader()
fontLoader.load(
    '/fonts/helvetiker_regular.typeface.json',
    (font) => 
    {
        const textGeometry = new TextGeometry(
            'Hi, \nI am Rouaa Mohamed,\nHonors CS Student',
            {
                font: font,
                size: 0.5,
                depth: 0.2,
                curveSegments: 5,
                bevelEnabled: true,
                bevelThickness: 0.03,
                bevelSize: 0.02,
                bevelOffset: 0,
                bevelSegments: 5
            }
        )

        textGeometry.computeBoundingBox()
        // textGeometry.translate(
        //     -(textGeometry.boundingBox.max.x-0.02)*0.5,
        //     -(textGeometry.boundingBox.max.y-0.02)*0.5,
        //     -(textGeometry.boundingBox.max.z-0.03)*0.5
        // )
        textGeometry.center()

        const material = new THREE.MeshMatcapMaterial({matcap: textMatcapText})
        
        // textMaterial.wireframe = true
        text = new THREE.Mesh(textGeometry, material)
        scene.add(text)

        // gsap.to(text.position, {duration: 2, z: 0.2, repeat: -1, yoyo: true, ease: "power1.inOut"});
        // gsap.to(text.scale, {duration: 2, x: 1.05, y: 1.05, z: 1.05, repeat: -1, yoyo: true, ease: "power1.inOut"});

        const maxZ = -0.5

        const donutGeometry = new THREE.TorusGeometry(0.3,0.220,45)
        // const donutMaterial = new THREE.MeshMatcapMaterial({matcap: donutMatcapText})
        const donutMaterial = new THREE.MeshNormalMaterial()
        for(let i=0; i<50; i++){
            const donut = new THREE.Mesh(donutGeometry, donutMaterial)
            
            donut.position.x = (Math.random()-0.5)*10
            donut.position.y = (Math.random()-0.5)*10
            donut.position.z = (Math.random()-0.5)*10
            
            donut.rotation.x = Math.random()*Math.PI
            donut.rotation.y = Math.random()*Math.PI

            const scale = Math.random()
            donut.scale.set(scale, scale, scale)
            
            scene.add(donut)
            donuts.push(donut)
        }

        const sphereGeometry = new THREE.SphereGeometry(0.75 ,45)
        const sphereMaterial = new THREE.MeshMatcapMaterial({matcap: sphereMatcapText})
        
        for(let i=0; i<50; i++){
            const sphere = new THREE.Mesh(sphereGeometry, sphereMaterial)
            
            sphere.position.x = (Math.random()-0.5)*15
            sphere.position.y = (Math.random()-0.5)*15
            sphere.position.z = (Math.random()-0.5)*15
            
            sphere.rotation.x = Math.random()*Math.PI
            sphere.rotation.y = Math.random()*Math.PI

            const scale = Math.random()
            sphere.scale.set(scale, scale, scale)
            
            spheres.push(sphere)
            scene.add(sphere)
        }

        const cubeGeometry = new THREE.BoxGeometry(0.75, 0.75, 0.75)
        const cubeMaterial = new THREE.MeshMatcapMaterial({matcap: cubeMatcapText})
        // const cubeMaterial = new THREE.MeshNormalMaterial()
        for(let i=0; i<50; i++){
            const cube = new THREE.Mesh(cubeGeometry, cubeMaterial)
            
            cube.position.x = (Math.random()-0.5)*15
            cube.position.y = (Math.random()-0.5)*15
            cube.position.z = (Math.random()-0.5)*15
            
            
            cube.rotation.x = Math.random()*Math.PI
            cube.rotation.y = Math.random()*Math.PI

            const scale = Math.random()
            cube.scale.set(scale, scale, scale)
            
            cubes.push(cube)
            scene.add(cube)
        }

        // gsap.to(text.position, {duration: 2, delay: 0, z: 2})
        // gsap.to(text.position, {duration: 2, delay: 2, z: 0})
        gsap.to(text.scale, { duration: 2, x: 1.1, y: 1.1, z: 1.1, repeat: -1, yoyo: true, ease: "power1.inOut" });
        gsap.to(text.rotation, { duration: 8, y: Math.PI * 2, repeat: -1, ease: "power1.inOut" });

    }
)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 0
camera.position.y = 0
camera.position.z = 8
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Animate donuts
    donuts.forEach(donut => {
        donut.rotation.x += 0.01;
        donut.rotation.y += 0.01;
        donut.position.x += Math.sin(elapsedTime + donut.position.y) * 0.01;
    });

    // Animate spheres
    spheres.forEach(sphere => {
        sphere.rotation.x += 0.01;
        sphere.rotation.y += 0.01;
        sphere.position.y += Math.sin(elapsedTime + sphere.position.x) * 0.01;
    });

    // Animate cubes
    cubes.forEach(cube => {
        cube.rotation.x += 0.01;
        cube.rotation.y += 0.01;
        cube.position.z += Math.sin(elapsedTime + cube.position.y) * 0.01;
    });

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()