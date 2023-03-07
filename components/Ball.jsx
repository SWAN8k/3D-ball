import React, { useEffect, useState } from 'react'
import * as THREE from 'three';
import gsap from 'gsap';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'



function Ball() {
    const [_document, set_document] = React.useState(null) //per rendering in browser
    React.useEffect(() => {
        set_document(document)
    }, [])


    if (typeof window !== "undefined") { //per rendering in browser

        //Scene
        const scene = new THREE.Scene();

        //Create Sphere

        const geometry = new THREE.SphereGeometry(3, 64, 64); //3 radius, 64 segments
        const material = new THREE.MeshStandardMaterial({
            color: '#00ff83',
            roughness: 0.5,
        }); //colore
        const mesh = new THREE.Mesh(geometry, material); //sfera
        scene.add(mesh);

        //Sizes
        const sizes = {
            width: window.innerWidth,
            height: window.innerHeight,
        }

        //Light
        const light = new THREE.PointLight(0xffffff, 1, 100)
        light.position.set(0, 10, 10) //x,y,z
        light.intensity = 1.25
        scene.add(light)

        //Camera
        const camera = new THREE.PerspectiveCamera(45, scene.width / scene.height, 0.1, 100)
        camera.position.z = 20
        scene.add(camera)

        //Renderer
        const canvas = document.querySelector('.webgl');
        const renderer = new THREE.WebGLRenderer({ canvas });
        renderer.setSize(scene.width, scene.height);
        renderer.setPixelRatio(2)
        renderer.render(scene, camera);

        //Controls
        const controls = new OrbitControls(camera, canvas)
        controls.enableDamping = true
        controls.enablePan = false
        controls.enableZoom = false
        controls.autoRotate = true
        controls.autoRotateSpeed = 5

        //Resize
        window.addEventListener('resize', () => {

            //Update size
            sizes.width = window.innerWidth
            sizes.height = window.innerHeight

            //Update camera
            camera.updateProjectionMatrix()
            camera.aspect = sizes.width / sizes.height
            renderer.setSize(sizes.width, sizes.height)

        })

        const loop = () => {
            controls.update()
            renderer.render(scene, camera)
            window.requestAnimationFrame(loop)
        }
        loop()

        //Timeline animation
        const tl = gsap.timeline({ defaults: { duration: 1 } })
        tl.fromTo(mesh.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 }) //animazione sfera
        tl.fromTo('.nav', { y: '-100%' }, { y: '0%' }) //animazione navbar
        tl.fromTo('.title', { opacity: 0 }, { opacity: 1 }) //animazione h1

        //Mouse Animation Color
        let mouseDown = false
        let rgb = []
        window.addEventListener('mousedown', () => (mouseDown = true))
        window.addEventListener('mouseup', () => (mouseDown = true))

        window.addEventListener('mousemove', (e) => {
            if (mouseDown) {
                rgb = [
                    Math.round((e.pageX / sizes.width) * 255),
                    Math.round((e.pageY / sizes.height) * 255),
                    150,
                ]
                //Animate
                let newColor = new THREE.Color(`rgb(${rgb.join(',')})`)
                gsap.to(mesh.material.color, {
                    r: newColor.r,
                    g: newColor.g,
                    b: newColor.b
                })
            }
        })
    }











    return (
        <canvas className='webgl absolute top-0 left-0 z-[1]'></canvas>
    )
}

export default Ball
