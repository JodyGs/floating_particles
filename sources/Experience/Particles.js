import * as THREE from 'three'
import Experience from './Experience'
import vertexShader from './shaders/particles/vertex.glsl'
import fragmentShader from './shaders/particles/fragment.glsl'

export default class Particles {
  constructor() {
    this.experience = new Experience()
    this.resources = this.experience.resources
    this.scene = this.experience.scene
    this.time = this.experience.time
    this.debug = this.experience.debug

    this.count = 3000

    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: 'particles'
      })

      this.debugFolder.addInput(
        this,
        'count',
        {min: 100, max: 500000, step: 100}
      ).on('change', () => {
        this.setGeometry()
        this.points.geometry = this.geometry
      })
    }

    this.setGeometry()
    this.setMaterial()
    this.setPoints()
  }

  setGeometry() {

    if(this.geometry){
      this.geometry.dispose()
    }
    this.geometry = new THREE.BufferGeometry()

    const positionArray = new Float32Array(this.count * 3)
    const progressionArray = new Float32Array(this.count)
    const sizeArray = new Float32Array(this.count)
    const alphaArray = new Float32Array(this.count)

    for (let i = 0; i < this.count; i++) {
      positionArray[i * 3 + 0] = (Math.random() - 0.5) * 20
      positionArray[i * 3 + 1] = 0
      positionArray[i * 3 + 2] = (Math.random() - 0.5) * 10

      progressionArray[i] = Math.random()

      sizeArray[i] = Math.random()

      alphaArray[i] = Math.random()
    }

    this.geometry.setAttribute('position', new THREE.Float32BufferAttribute(positionArray, 3))
    this.geometry.setAttribute('aProgress', new THREE.Float32BufferAttribute(progressionArray, 1))
    this.geometry.setAttribute('aSize', new THREE.Float32BufferAttribute(sizeArray, 1))
    this.geometry.setAttribute('aAlpha', new THREE.Float32BufferAttribute(alphaArray, 1))
  }

  setMaterial() {
    this.material = new THREE.ShaderMaterial({
      blending: THREE.AdditiveBlending,
      depthTest: false,
      transparent: true,
      uniforms: {
        uPerlinMultiplier: {value: 0.7},
        uProgressSpeed: {value: 0.000015},
        uPerlinFrequency: {value: 0.17},
        uSize: {value: 40},
        uMask: {
          value: this.resources.items.particleMask
        },
        uTime: { value: 0 },
      },
      vertexShader,
      fragmentShader
    })

    if(this.debug){
      this.debugFolder.addInput(
        this.material.uniforms.uSize,
        'value',
        {label: 'uSize', min: 0, max: 200, step: 0.1}
      )
      
      this.debugFolder.addInput(
        this.material.uniforms.uProgressSpeed,
        'value',
        {label: 'uProgressSpeed', min: 0, max: 0.00005, step: 0.000001}
      )
      
      this.debugFolder.addInput(
        this.material.uniforms.uPerlinFrequency,
        'value',
        {label: 'uPerlinFrequency', min: 0, max: 0.5, step: 0.01}
      )
      
      this.debugFolder.addInput(
        this.material.uniforms.uPerlinMultiplier,
        'value',
        {label: 'uPerlinMultiplier', min: 0, max: 20, step: 0.1}
      )
    }
  }

  setPoints() {
    this.points = new THREE.Points(this.geometry, this.material)
    this.points.position.y = - 5
    this.scene.add(this.points)
  }

  update() {
    this.material.uniforms.uTime.value = this.time.elapsed
  }
}