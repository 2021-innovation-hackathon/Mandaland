import React from "react"
import * as THREE from "three"
import CustomButton from "../../components/CustomButton/CustomButton"
import { HexColorPicker } from "react-colorful"
class Three extends React.Component {
    state = { newCubes: [...this.props.landcubes], color: "#ffffff" }
    componentDidMount = () => {
        let camera, scene
        let plane
        let pointer,
            raycaster,
            isShiftDown = false
        let rollOverMesh, rollOverMaterial
        let cubeGeo, cubeMaterial
        let volumeTexture
        const objects = []
        const objectIndexes = []

        const init = () => {
            camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 1, 10000) //
            camera.position.set(1000, 1200, 1000)
            camera.lookAt(0, 0, 0)

            scene = new THREE.Scene()
            scene.background = new THREE.Color(0xffffff)

            // volume
            volumeTexture = new THREE.TextureLoader().load(`${window.location.origin}/images/volume.png`)
            cubeGeo = new THREE.BoxGeometry(25, 25, 25)

            // grid
            // (1000, 20) 한 변의 길이가 1000일 때 20칸으로 나눔(한 칸당 50의 길이를 갖게 됨)
            const gridHelper = new THREE.GridHelper(1000, 40, 0xffffff00, 0xffffff00)
            scene.add(gridHelper)

            raycaster = new THREE.Raycaster()
            pointer = new THREE.Vector2()

            const planeVolumeGeometry = new THREE.BoxGeometry(1000, 50, 1000)
            // 풀
            const planeVolumeMaterial = new THREE.MeshBasicMaterial({ color: 0xb9d051, map: volumeTexture })
            const planeVolume = new THREE.Mesh(planeVolumeGeometry, planeVolumeMaterial)
            planeVolume.position.copy(new THREE.Vector3(0, -25, 0))
            scene.add(planeVolume)
            objects.push(planeVolume)

            // 땅
            const planeVolumeMaterial2 = new THREE.MeshBasicMaterial({ color: 0x5a362c, map: volumeTexture })
            const planeVolume2 = new THREE.Mesh(planeVolumeGeometry, planeVolumeMaterial2)
            planeVolume2.position.copy(new THREE.Vector3(0, -75, 0))
            scene.add(planeVolume2)
            objects.push(planeVolume2)

            const geometry = new THREE.PlaneGeometry(1000, 1000)
            geometry.rotateX(-Math.PI / 2)

            // 땅 표면
            plane = new THREE.Mesh(geometry, new THREE.MeshBasicMaterial({ color: 0xb9d051 }))
            scene.add(plane)

            objects.push(plane)

            // lights

            const ambientLight = new THREE.AmbientLight(0x606060)
            scene.add(ambientLight)

            const directionalLight = new THREE.DirectionalLight(0xffffff, 1.35)
            directionalLight.position.set(1, 0.75, 0.5)
            directionalLight.target.position.set(-5, 0, 0)
            directionalLight.castShadow = true
            scene.add(directionalLight)

            this.renderer = new THREE.WebGLRenderer({ antialias: true })
            this.renderer.setPixelRatio(window.devicePixelRatio)
            this.renderer.setSize(window.innerWidth, window.innerHeight)
            this.mount.appendChild(this.renderer.domElement)

            document.addEventListener("pointermove", onPointerMove)
            document.addEventListener("pointerdown", onPointerDown)
            document.addEventListener("keydown", onDocumentKeyDown)
            document.addEventListener("keyup", onDocumentKeyUp)

            //

            window.addEventListener("resize", onWindowResize)

            // // roll-over helpers => 마우스 올리면 빨간색으로 가이드라인 보여줌

            const rollOverGeo = new THREE.BoxGeometry(25, 25, 25)
            rollOverMaterial = new THREE.MeshBasicMaterial({ color: 0xff0000, opacity: 0.5, transparent: true })
            rollOverMesh = new THREE.Mesh(rollOverGeo, rollOverMaterial)
            scene.add(rollOverMesh)

            if (this.props.landcubes) {
                for (let i = 0; i < this.props.landcubes.length; i++) {
                    const { x, y, z, color } = this.props.landcubes[i]
                    const material = new THREE.MeshLambertMaterial({ color, map: volumeTexture })
                    const cube = new THREE.Mesh(cubeGeo, material)
                    objectIndexes.push([x, y, z].join(""))
                    cube.position.set(x, y, z)
                    scene.add(cube)
                    objects.push(cube)
                }
            }
        }

        const onWindowResize = () => {
            camera.aspect = window.innerWidth / window.innerHeight
            camera.updateProjectionMatrix()

            this.renderer.setSize(window.innerWidth, window.innerHeight)
        }

        const onPointerMove = (event) => {
            pointer.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1)

            raycaster.setFromCamera(pointer, camera)

            const intersects = raycaster.intersectObjects(objects)

            if (intersects.length > 0) {
                const intersect = intersects[0]

                rollOverMesh.position.copy(intersect.point)
                rollOverMesh.position.add(intersect.face.normal)
                rollOverMesh.position.divideScalar(25).floor().multiplyScalar(25).addScalar(12.5)
            }

            renderThree()
        }

        const onPointerDown = (event) => {
            pointer.set((event.clientX / window.innerWidth) * 2 - 1, -(event.clientY / window.innerHeight) * 2 + 1)

            raycaster.setFromCamera(pointer, camera)

            const intersects = raycaster.intersectObjects(objects)

            if (intersects.length > 0) {
                const intersect = intersects[0]

                // delete cube
                if (isShiftDown) {
                    if (intersect.object !== plane) {
                        scene.remove(intersect.object)
                        const { x, y, z } = intersect.object.position
                        const removeIndex = objectIndexes.indexOf([x, y, z].join(""))
                        this.state.newCubes.splice(removeIndex, 1)
                        this.setState({ newCubes: this.state.newCubes })
                        objectIndexes.splice(removeIndex, 1)
                        objects.splice(objects.indexOf(intersect.object), 1)
                    }
                    // create cube
                } else {
                    console.log(this.state)
                    cubeMaterial = new THREE.MeshLambertMaterial({ color: this.state.color, map: volumeTexture })
                    const voxel = new THREE.Mesh(cubeGeo, cubeMaterial)
                    voxel.position.copy(intersect.point).add(intersect.face.normal)
                    voxel.position.divideScalar(25).floor().multiplyScalar(25).addScalar(12.5)
                    scene.add(voxel)
                    objects.push(voxel)
                    const { x, y, z } = voxel.position
                    objectIndexes.push([x, y, z].join(""))
                    this.setState({ newCubes: [...this.state.newCubes, { x, y, z, color: this.state.color }] })
                }
                renderThree()
            }
        }

        function onDocumentKeyDown(event) {
            switch (event.keyCode) {
                case 16:
                    isShiftDown = true
                    break
                default:
                    break
            }
        }

        function onDocumentKeyUp(event) {
            switch (event.keyCode) {
                case 16:
                    isShiftDown = false
                    break
                default:
                    break
            }
        }

        const renderThree = () => {
            this.renderer.render(scene, camera)
        }

        init()
        renderThree()
    }

    stop = () => {
        cancelAnimationFrame(this.frameId)
    }

    componentWillUnmount = () => {
        this.stop()
        this.mount.removeChild(this.renderer.domElement)
    }

    onClick = () => {
        console.log(this.props.landId)
        this.props.onSave(this.props.landId, this.state.newCubes)
    }

    renderColorPick = () => {
        return (
            <div className="color-picker-wrapper">
                <HexColorPicker color={this.state.color} onChange={(color) => this.setState({ color })} />
            </div>
        )
    }

    render() {
        return (
            <React.Fragment>
                <div className="left-tool-box">
                    <div className="land-save-wrapper">
                        <CustomButton text="SAVE" onClick={this.onClick} />
                    </div>
                    {this.renderColorPick()}
                </div>
                <div
                    className="land-container"
                    ref={(mount) => {
                        this.mount = mount
                    }}
                    f
                ></div>
            </React.Fragment>
        )
    }
}

export default Three
