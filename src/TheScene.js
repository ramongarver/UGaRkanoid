
import * as THREE from '../lib/three.module.js'
import { GUI } from '../lib/dat.gui.module.js'
import { TrackballControls } from '../lib/TrackballControls.js'

// Clases de mi proyecto

import { Platform } from './Platform.js'
import { Ball } from './Ball.js'

import { Crane } from './Crane.js'
import { Ground } from './Ground.js'

// The Model Facade class. The root node of the graph.
class TheScene extends THREE.Scene {
  
  constructor (myCanvas) {
    super();

    this.platform = new Platform(this);
    this.add(this.platform);

    this.ball = new Ball(this);
    this.add(this.ball);

    // Attributes
    //this.applicationMode = TheScene.NO_ACTION;
    this.renderer = this.createRenderer(myCanvas);
    this.mouseDown = false;
    
    this.ambientLight = null;
    this.spotLight = null;
    this.camera = null;
    this.trackballControls = null;
    this.crane = null;
    this.ground = null;
  
    this.createLights ();
    this.createCamera ();
    this.axis = new THREE.AxesHelper (25);
    this.add (this.axis);
  }
  
  // It creates the camera and adds it to the graph
  createCamera () {
    this.camera = new THREE.OrthographicCamera(-2.0, 2.0, -2.0, 2.0, -2.0, 2.0);

    this.add(this.camera);
  }
  
  // It creates lights and adds them to the graph
  createLights () {
    // add subtle ambient lighting
    this.ambientLight = new THREE.AmbientLight(0xccddee, 0.35);
    this.add (this.ambientLight);
    
    // add spotlight for the shadows
    this.spotLight = new THREE.SpotLight( 0xffffff, 1);
    this.spotLight.position.set( 60, 60, 40 );
    this.spotLight.castShadow = true;
    // the shadow resolution
    this.spotLight.shadow.mapSize.width=2048
    this.spotLight.shadow.mapSize.height=2048;
    this.add (this.spotLight);
  }
  
  createRenderer (myCanvas) {
    let renderer = new THREE.WebGLRenderer();
    renderer.setClearColor(new THREE.Color(0xEEEEEE), 1.0);
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.shadowMap.enabled = true;
    $(myCanvas).append(renderer.domElement);    
    return renderer;  
  }
  
  onMouseMove (event) {
    //if (this.mouseDown)
    const mouse = new THREE.Vector2();
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    this.platform.setPositionX((event.clientX / window.innerWidth) * 2 - 1);
  }
  
  onKeyDown (event) {
    let x = event.which || event.keyCode;
    switch (x) {
      case 37: this.platform.moveLeft(); break; // left arrow
      case 39: this.platform.moveRight(); break; // right arrow
    }
  }
  
  
  onWindowResize () {
    // Este método es llamado cada vez que el usuario modifica el tamaño de la ventana de la aplicación
    // Hay que actualizar el ratio de aspecto de la cámara
    //this.setCameraAspect (window.innerWidth / window.innerHeight);
    
    // Y también el tamaño del renderizador
    this.renderer.setSize (window.innerWidth, window.innerHeight);
  }

  setMessage (str) {
    document.getElementById ("Messages").innerHTML = "<h2>"+str+"</h2>";
  }
    
  // It returns the camera
  getCamera () {
    return this.camera;
  }
  
  // It updates the aspect ratio of the camera
  setCameraAspect (anAspectRatio) {
    this.camera.aspect = anAspectRatio;
    this.camera.updateProjectionMatrix();
  }
  
  update () {
    // Este método debe ser llamado cada vez que queramos visualizar la escena de nuevo.
    
    // Literalmente le decimos al navegador: "La próxima vez que haya que refrescar la pantalla, llama al método que te indico".
    // Si no existiera esta línea,  update()  se ejecutaría solo la primera vez.
    requestAnimationFrame(() => this.update())
    
    // Le decimos al renderizador "visualiza la escena que te indico usando la cámara que te estoy pasando"
    this.renderer.render (this, this.getCamera());
  }
  
  
}
  
// Main function
$(function () {
  // Se instancia la escena pasándole el  div  que se ha creado en el html para visualizar
  let scene = new TheScene("#WebGL-output");

  // Se añaden los listener de la aplicación. En este caso, el que va a comprobar cuándo se modifica el tamaño de la ventana de la aplicación.
  window.addEventListener ("resize", () => scene.onWindowResize());
  window.addEventListener ("mousemove", (event) => scene.onMouseMove(event), true);
  window.addEventListener ("keydown", (event) => scene.onKeyDown (event), true);
  
  // Que no se nos olvide, la primera visualización.
  scene.update();
});

export { TheScene };
