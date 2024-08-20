import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { Timer } from 'three/addons/misc/Timer.js'
import { Sky } from 'three/addons/objects/Sky.js'
import GUI from 'lil-gui'
import gsap from 'gsap'

/**
 * Base
 */
// Debug
//const gui = new GUI()

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

//Textures
const textureLoader = new THREE.TextureLoader()

//floor
const floorAlphaTextures = textureLoader.load('./floor/alpha.jpg')
const floorColorTexture = textureLoader.load('./floor/coast_sand_rocks_02/coast_sand_rocks_02_diff_1k.jpg')
const floorARMTexture = textureLoader.load('./floor/coast_sand_rocks_02/coast_sand_rocks_02_arm_1k.jpg')
const floorNormalTexture = textureLoader.load('./floor/coast_sand_rocks_02/coast_sand_rocks_02_nor_gl_1k.jpg')
const floorDisplacementTexture = textureLoader.load('./floor/coast_sand_rocks_02/coast_sand_rocks_02_disp_1k.jpg')

floorColorTexture.colorSpace = THREE.SRGBColorSpace

floorColorTexture.repeat.set(8, 8)
floorARMTexture.repeat.set(8, 8)
floorNormalTexture.repeat.set(8, 8)
floorDisplacementTexture.repeat.set(8, 8)

floorColorTexture.wrapS = THREE.RepeatWrapping
floorARMTexture.wrapS = THREE.RepeatWrapping
floorNormalTexture.wrapS = THREE.RepeatWrapping
floorDisplacementTexture.wrapS = THREE.RepeatWrapping

floorColorTexture.wrapT = THREE.RepeatWrapping
floorARMTexture.wrapT = THREE.RepeatWrapping
floorNormalTexture.wrapT = THREE.RepeatWrapping
floorDisplacementTexture.wrapT = THREE.RepeatWrapping


//Walls

const wallColorTexture = textureLoader.load('./wall/castle_brick_07/castle_brick_07_diff_1k.jpg')
const wallARMTexture = textureLoader.load('./wall/castle_brick_07/castle_brick_07_arm_1k.jpg')
const wallNormalTexture = textureLoader.load('./wall/castle_brick_07/castle_brick_07_nor_gl_1k.jpg')

wallColorTexture.colorSpace = THREE.SRGBColorSpace

//Roof

const roofColorTexture = textureLoader.load('./roof/ceramic_roof_01/ceramic_roof_01_diff_1k.jpg')
const roofARMTexture = textureLoader.load('./roof/ceramic_roof_01/ceramic_roof_01_arm_1k.jpg')
const roofNormalTexture = textureLoader.load('./roof/ceramic_roof_01/ceramic_roof_01_nor_gl_1k.jpg')

roofColorTexture.colorSpace = THREE.SRGBColorSpace

roofColorTexture.repeat.set(5, 1)
roofARMTexture.repeat.set(5, 1)
roofNormalTexture.repeat.set(5, 1)

roofColorTexture.wrapS = THREE.RepeatWrapping
roofARMTexture.wrapS = THREE.RepeatWrapping
roofNormalTexture.wrapS = THREE.RepeatWrapping

//Bushes
const bushesColorTexture = textureLoader.load('./bushes/forest_leaves_03/forest_leaves_03_diff_1k.webp')
const bushesARMTexture = textureLoader.load('./bushes/forest_leaves_03/forest_leaves_03_arm_1k.webp')
const bushesNormalTexture = textureLoader.load('./bushes/forest_leaves_03/forest_leaves_03_nor_gl_1k.webp')

bushesColorTexture.colorSpace = THREE.SRGBColorSpace

bushesColorTexture.repeat.set(2, 1)
bushesARMTexture.repeat.set(2, 1)
bushesNormalTexture.repeat.set(2, 1)

bushesColorTexture.wrapS = THREE.RepeatWrapping
bushesARMTexture.wrapS = THREE.RepeatWrapping
bushesNormalTexture.wrapS = THREE.RepeatWrapping

//Table
const tableColorTexture = textureLoader.load('./table/bark_willow_02/bark_willow_02_diff_1k.jpg')
const tableARMTexture = textureLoader.load('./table/bark_willow_02/bark_willow_02_arm_1k.jpg')
const tableNormalTexture = textureLoader.load('./table/bark_willow_02/bark_willow_02_nor_gl_1k.jpg')

tableColorTexture.colorSpace = THREE.SRGBColorSpace

tableColorTexture.repeat.set(.2, 1)
tableARMTexture.repeat.set(.2, 1)
tableNormalTexture.repeat.set(.2, 1)

tableColorTexture.wrapS = THREE.RepeatWrapping
tableARMTexture.wrapS = THREE.RepeatWrapping
tableNormalTexture.wrapS = THREE.RepeatWrapping

//Graves
const graveColorTexture = textureLoader.load('./grave/plastered_stone_wall/plastered_stone_wall_diff_1k.jpg')
const graveARMTexture = textureLoader.load('./grave/plastered_stone_wall/plastered_stone_wall_arm_1k.jpg')
const graveNormalTexture = textureLoader.load('./grave/plastered_stone_wall/plastered_stone_wall_nor_gl_1k.jpg')

graveColorTexture.colorSpace = THREE.SRGBColorSpace

graveColorTexture.repeat.set(.3, 1)
graveARMTexture.repeat.set(.3, 1)
graveNormalTexture.repeat.set(.3, 1)

// Door
const doorColorTexture = textureLoader.load('./door/color.jpg')
const doorAlphaTexture = textureLoader.load('./door/alpha.jpg')
const doorAmbientOcclusionTexture = textureLoader.load('./door/ambientOcclusion.jpg')
const doorHeightTexture = textureLoader.load('./door/height.jpg')
const doorNormalTexture = textureLoader.load('./door/normal.jpg')
const doorMetalnessTexture = textureLoader.load('./door/metalness.jpg')
const doorRoughnessTexture = textureLoader.load('./door/roughness.jpg')

doorColorTexture.colorSpace = THREE.SRGBColorSpace


//Objects
//Floor
const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(23, 23, 200, 200),
    new THREE.MeshStandardMaterial({
        alphaMap: floorAlphaTextures,
        transparent: true,
        map: floorColorTexture,
        aoMap: floorARMTexture,
        roughnessMap: floorARMTexture,
        metalnessMap: floorARMTexture,
        normalMap: floorNormalTexture,
        displacementMap: floorDisplacementTexture,
        displacementScale: .09,
        displacementBias: -0.057,
        side: THREE.DoubleSide
    })
)
plane.rotation.x = - Math.PI * 0.5
scene.add(plane)


/**
 * House
 */
const house = new THREE.Group();
scene.add(house)

const walls = new THREE.Mesh(
    new THREE.BoxGeometry(4, 2.5, 4),
    new THREE.MeshStandardMaterial(
        {
            color: '#ffe5e5',
            map: wallColorTexture,
            aoMap: wallARMTexture,
            roughnessMap: wallARMTexture,
            metalnessMap: wallARMTexture,
            normalMap: wallNormalTexture,
            side: THREE.DoubleSide
        }
    )
)
walls.position.y = 1.25


const roof = new THREE.Mesh(

    new THREE.ConeGeometry(3.5, 1.5, 4),
    new THREE.MeshStandardMaterial({
        map: roofColorTexture,
        aoMap: roofARMTexture,
        roughnessMap: roofARMTexture,
        metalnessMap: roofARMTexture,
        normalMap: roofNormalTexture
    })
)

roof.position.y = 2.5 + .75
roof.rotation.y = Math.PI * .25

const door = new THREE.Mesh(
    new THREE.PlaneGeometry(2.2, 2.2, 100, 100),
    new THREE.MeshStandardMaterial({
        map: doorColorTexture,
        transparent: true,
        alphaMap: doorAlphaTexture,
        aoMap: doorAmbientOcclusionTexture,
        displacementMap: doorHeightTexture,
        displacementScale: 0.15,
        displacementBias: -0.04,
        normalMap: doorNormalTexture,
        roughnessMap: doorRoughnessTexture,
        metalnessMap: doorMetalnessTexture
    })
)
door.position.y = 1
door.position.z = 2.001

//bushes
const bushGeometry = new THREE.SphereGeometry(1, 16, 16)
const bushMaterial = new THREE.MeshStandardMaterial({
    map: bushesColorTexture,
    aoMap: bushesARMTexture,
    roughnessMap: bushesARMTexture,
    metalnessMap: bushesARMTexture,
    normalMap: bushesNormalTexture
})

const bush1 = new THREE.Mesh(bushGeometry, bushMaterial)
bush1.scale.set(0.5, 0.5, 0.5)
bush1.position.set(0.8, 0.2, 2.2)
bush1.rotation.x = - .75

const bush2 = new THREE.Mesh(bushGeometry, bushMaterial)
bush2.scale.set(0.25, 0.25, 0.25)
bush2.position.set(1.4, 0.2, 2.1)
bush2.rotation.x = - .75

const bush3 = new THREE.Mesh(bushGeometry, bushMaterial)
bush3.scale.set(0.4, 0.4, 0.4)
bush3.position.set(-0.8, 0.1, 2.2)
bush3.rotation.x = - .75

const bush4 = new THREE.Mesh(bushGeometry, bushMaterial)
bush4.scale.set(0.15, 0.15, 0.15)
bush4.position.set(-1, 0.05, 2.6)
bush4.rotation.x = - .75

house.add(walls, roof, door, bush1, bush2, bush3, bush4)


//Graves
const graveGeometry = new THREE.BoxGeometry(0.6, 0.8, 0.2)
const graveMaterial = new THREE.MeshStandardMaterial({
    map: graveColorTexture,
    aoMap: graveARMTexture,
    roughnessMap: graveARMTexture,
    metalnessMap: graveARMTexture,
    normalMap: graveNormalTexture
})

const crossVertGeo = new THREE.BoxGeometry(.04, .25, .02)
const crossHorGeo = new THREE.BoxGeometry(.2, .04, .02)
const graves = new THREE.Group()
scene.add(graves)


for (let i = 0; i < 29; i++) {
    const angle = Math.random() * Math.PI * 2;
    const radius = 3 + Math.random() * 4
    const x = Math.sin(angle) * radius
    const z = Math.cos(angle) * radius

    const grave = new THREE.Group()

    const block = new THREE.Mesh(graveGeometry, graveMaterial)
    block.castShadow = true;
    block.receiveShadow = true

    //Random crosses

    if (Math.random() < .5) {
        const cross = new THREE.Group()
        const crossVert = new THREE.Mesh(crossVertGeo, graveMaterial)
        const crossHor = new THREE.Mesh(crossHorGeo, graveMaterial)
        crossHor.castShadow = true
        crossVert.castShadow = true


        crossHor.position.y = .03
        crossHor.position.z = 0.0001

        cross.add(crossVert, crossHor)
        cross.position.y = .4 + .12


        grave.add(cross)
    }


    grave.add(block)

    grave.position.x = x
    grave.position.y = Math.random() * .4
    grave.position.z = z

    grave.rotation.x = (Math.random() - 0.5) * .4
    grave.rotation.y = (Math.random() - 0.5) * .4
    grave.rotation.z = (Math.random() - 0.5) * .4

    graves.add(grave)

}

//Fence
const fence = new THREE.Group()
fence.position.z = -7.1
fence.position.x = -4
scene.add(fence)

const tableGeometry = new THREE.BoxGeometry(.15, .8, .05)
const tableMaterial = new THREE.MeshStandardMaterial({
    map: tableColorTexture,
    aoMap: tableARMTexture,
    roughnessMap: tableARMTexture,
    metalnessMap: tableARMTexture,
    normalMap: tableNormalTexture
})



for (let i = 0; i < 13; i++) {
    const table = new THREE.Mesh(
        tableGeometry, tableMaterial
    )

    table.position.x = (i - 0.5) * (Math.random() * (1 - 0.5) + 0.5)
    table.position.y = Math.random() * 0.4
    
    table.rotation.z = - (Math.random() - 0.5) * .3
    table.rotation.x = - (Math.random() - 0.5) * .3

    table.castShadow = true
    table.receiveShadow = true

    fence.add(table)
}


/**
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight('#86cdff', 0.275)
scene.add(ambientLight)

// // Directional light
const directionalLight = new THREE.DirectionalLight('#86cdff', 1)
directionalLight.position.set(3, 2, -8)
scene.add(directionalLight)

//Door light
const doorLight = new THREE.PointLight("#ff7d46", 5)
doorLight.position.set(0, 2.2, 2.5)
house.add(doorLight)


/////Ghosts
const ghost1 = new THREE.PointLight('#ddb44d', 6)
const ghost2 = new THREE.PointLight('#828282', 6)
const ghost3 = new THREE.PointLight('#ff0000', 6)
scene.add(ghost1, ghost2, ghost3)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
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
camera.position.x = 1
camera.position.y = 15
camera.position.z = 25
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


//Shadows
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap

directionalLight.castShadow = true
ghost1.castShadow = true;
ghost2.castShadow = true;
ghost3.castShadow = true;

walls.castShadow = true
walls.receiveShadow = true
roof.castShadow = true
plane.receiveShadow = true

bush1.receiveShadow = true
bush2.receiveShadow = true
bush3.receiveShadow = true

bush1.castShadow = true
bush2.castShadow = true
bush3.castShadow = true

// Mappings
directionalLight.shadow.mapSize.width = 256
directionalLight.shadow.mapSize.height = 256
directionalLight.shadow.camera.top = 8
directionalLight.shadow.camera.right = 8
directionalLight.shadow.camera.bottom = - 8
directionalLight.shadow.camera.left = - 8
directionalLight.shadow.camera.near = 1
directionalLight.shadow.camera.far = 20

ghost1.shadow.mapSize.width = 256
ghost1.shadow.mapSize.height = 256
ghost1.shadow.camera.far = 10

ghost2.shadow.mapSize.width = 256
ghost2.shadow.mapSize.height = 256
ghost2.shadow.camera.far = 10

ghost3.shadow.mapSize.width = 256
ghost3.shadow.mapSize.height = 256
ghost3.shadow.camera.far = 10




//Sky
const sky = new Sky()
sky.scale.set(100, 100, 100)
scene.add(sky)

sky.material.uniforms['turbidity'].value = 10
sky.material.uniforms['rayleigh'].value = 3
sky.material.uniforms['mieCoefficient'].value = 0.1
sky.material.uniforms['mieDirectionalG'].value = 0.95
sky.material.uniforms['sunPosition'].value.set(0.3, -0.038, -0.95)

//Fog
scene.fog = new THREE.FogExp2('#04343f', .1)

/**
 * Animate
 */
const timer = new Timer()

var doorLightTl = gsap.timeline({ onComplete: () => { gsap.delayedCall(gsap.utils.random(5, 15), () => doorLightTl.restart()) } });
doorLightTl.set(doorLight, { intensity: 0, duration: 2 })
doorLightTl.set(doorLight, { intensity: 3, duration: .5 }, ">+.1")
doorLightTl.set(doorLight, { intensity: 0, duration: 2 }, ">+.2")
doorLightTl.set(doorLight, { intensity: 3, duration: .5 }, ">+.2")
doorLightTl.set(doorLight, { intensity: 0, duration: 2 }, ">+.1")
doorLightTl.to(doorLight, { intensity: 20, duration: 1 }, ">+1")
doorLightTl.to(doorLight, { intensity: 5, duration: 3 })


const tick = () => {
    // Timer
    timer.update()
    const elapsedTime = timer.getElapsed()

    //ghosts
    const ghostAngle1 = elapsedTime * .5
    ghost1.position.x = Math.sin(ghostAngle1) * 5
    ghost1.position.z = Math.cos(ghostAngle1) * 5
    ghost1.position.y = Math.sin(ghostAngle1) * Math.sin(ghostAngle1 * 2.34) * Math.sin(ghostAngle1 * 4.56)

    const ghostAngle2 = - elapsedTime * .38
    ghost2.position.x = Math.sin(ghostAngle2) * 4
    ghost2.position.z = Math.cos(ghostAngle2) * 4
    ghost2.position.y = Math.sin(ghostAngle2) * Math.sin(ghostAngle2 * 2.34) * Math.sin(ghostAngle2 * 4.56)

    const ghostAngle3 = - elapsedTime * .23
    ghost3.position.x = Math.sin(ghostAngle3) * 7
    ghost3.position.z = Math.cos(ghostAngle3) * 7
    ghost3.position.y = Math.sin(ghostAngle3) * Math.sin(ghostAngle3 * 2.34) * Math.sin(ghostAngle3 * 4.56)



    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()




//Intro
const startBtn = document.querySelector('.start-btn');
const startContainer = document.querySelector('.start-container');
const bgAudio = new Audio('./audio/bg.mp3')
const introAudio = new Audio('./audio/intro.mp3')
let hasStarted = false;

gsap.to(camera.position, {x:-15, duration:53})

startBtn.addEventListener('click', ()=>{
    hasStarted = true
    bgAudio.play()
    introAudio.play()
    bgAudio.loop = true
    introAnimation();
})

const introAnimation = () => {
    gsap.killTweensOf(camera.position);
    const introTL = gsap.timeline()
    introTL.to(startContainer, {autoAlpha:0, duration: 1})
    introTL.to(camera.position, {x:5, y:1, z:5, duration:3})
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        bgAudio.pause();
    } else{
       if ( hasStarted)  bgAudio.play()
    }
  });