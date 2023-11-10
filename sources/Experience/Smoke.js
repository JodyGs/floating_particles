import * as THREE from 'three'
import Experience from './Experience'

export default class Smoke {
  constructor() {
    this.experience = new Experience()
    this.config = this.experience.config
    this.resources = this.experience.resources
    this.scene = this.experience.scene
    this.time = this.experience.time
    this.debug = this.experience.debug
    this.world = this.experience.world

    this.count = 10
    this.group = new THREE.Group()
    this.group.position.y = -2
    this.scene.add(this.group)
    
    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: 'smoke'
      })
    }

    this.setGeometry()
    this.setColor()
    this.setItems()
  }

  setGeometry() {
    this.geometry = new THREE.PlaneGeometry(1, 1, 1, 1)
  }

  setColor() {
    this.color = {}
    this.color.value = '#120819'
    this.color.instance = new THREE.Color(this.color.value)
  }

  setItems() {
    this.items = []
    for(let i = 0; i < this.count; i++){
      const item = {}

      item.floatingSpeed = Math.random() * 0.0001
      item.rotationSpeed = (Math.random() - 0.5) * Math.random() * 0.0003

      // Material
      this.material = new THREE.MeshBasicMaterial({
        depthWrite: false,
        transparent: true,
        alphaMap: this.resources.items.smokeTexture,
        opacity: 1
      })

      this.material.color = this.color.instance
      
      // Mesh
      item.mesh = new THREE.Mesh(this.geometry, this.material)
      
      const scale = 3 + Math.random() * 3
      item.mesh.scale.set(scale, scale, scale)

      item.mesh.position.x = (Math.random() - 0.5) * 10
      this.group.add(item.mesh)

      // Save
      this.items.push(item)
    }
  }

  resize(){
  }

  update() {
    const elapsedTime = this.time.elapsed + 123456789.098

    this.color.instance.copy(this.world.gradient.colors.start.instance)
    this.color.instance.lerp(new THREE.Color('#fffff'), 0.1)

    // this.color.instance.set(`hsl(${this.time.elapsed * 0.0002}, 100%, 50%)`) 

    for(const _item of this.items){
      _item.mesh.rotation.z = this.time.elapsed * _item.rotationSpeed
      _item.mesh.position.y = Math.sin(this.time.elapsed) * _item.floatingSpeed
    }
  }
}