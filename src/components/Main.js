//pic size 687*687
import React from 'react'
import axios from 'axios'
const CANNON = require('cannon')
const THREE = require('three')
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { GlitchPass } from 'three/examples/jsm/postprocessing/GlitchPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { FilmPass } from 'three/examples/jsm/postprocessing/FilmPass.js';
import {noise} from 'perlin'



class Main extends React.Component{
  constructor(){
    super()
    this.state = {
      data: {},
      error: ''

    }
    this.componentDidMount = this.componentDidMount.bind(this)





  }


  componentDidMount(){
    axios.get('/api/works')
      .then(res => {
        this.setState({works: res.data})
        let container = document.createElement( 'div' )
                  document.body.appendChild( container )
      let scene = new THREE.Scene()
        scene.add( new THREE.AmbientLight( 0x666666 ) )
      let camera = new THREE.PerspectiveCamera( 30, window.innerWidth / window.innerHeight, 0.5, 10000 )
      camera.position.x=0
                  camera.position.y=-2
                  camera.position.z=2545
      scene.add( camera )
      let light = new THREE.DirectionalLight( 0xffffff, 0.5 )
      scene.add(light)
      let ballGeo = new THREE.SphereGeometry( 20, 80, 80 );
      let texture = new THREE.TextureLoader().load( 'assets/test.png' )
      let texture2 = new THREE.TextureLoader().load( 'assets/test.png' )
      let texture3 = new THREE.TextureLoader().load( 'assets/test.png' )
      if(this.state.works){
               texture = new THREE.TextureLoader().load( `data:image/png;base64,  ${this.state.works[0].dat.slice(2).slice(0, -1)}` )
                texture2 = new THREE.TextureLoader().load( `data:image/png;base64,  ${this.state.works[1].dat.slice(2).slice(0, -1)}` )
                  texture3 = new THREE.TextureLoader().load( `data:image/png;base64,  ${this.state.works[2].dat.slice(2).slice(0, -1)}` )
            };
      let ballMaterial = new THREE.MeshPhongMaterial( { color: 0xFFFFFF, map: texture, side: THREE.DoubleSide } )
    let  ballMesh = new THREE.Mesh( ballGeo, ballMaterial )
    scene.add(ballMesh)
    let renderer = new THREE.WebGLRenderer( {alpha: true } );                renderer.setSize( window.innerWidth, window.innerHeight );
// scene.background = texture3
    container.appendChild( renderer.domElement )
      // let controls = new OrbitControls( camera, renderer.domElement );
      var geometry = new THREE.PlaneGeometry( 1600, 800, 240, 120 );
              var material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, side: THREE.DoubleSide, map: texture2 , transparent: true} );
            let  plane2 = new THREE.Mesh( geometry, material );
              plane2.matrixWorldNeedsUpdate = true
              plane2.elementsNeedUpdate = true
              plane2.verticesNeedUpdate = true
              plane2.position.z= -50
              scene.add( plane2 );

  let   smokeTexture = new THREE.TextureLoader().load( 'assets/smoke.png' )
  let  smokeMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF, map: smokeTexture, transparent: true, opacity: 0.4});
  let  smokeGeo = new THREE.PlaneGeometry(300,300);
  let  smokeParticles = [];
  function evolveSmoke() {
    var sp = smokeParticles.length;
    while(sp--) {
        smokeParticles[sp].rotation.z += (delta * 0.2);
    }
}

    for (let p = 0; p < 150; p++) {
        var particle = new THREE.Mesh(smokeGeo,smokeMaterial);
        particle.position.set(Math.random()*500-250,Math.random()*500-250,Math.random()*1000-100);
        particle.rotation.z = Math.random() * 360;
        scene.add(particle);
        smokeParticles.push(particle);
    }
              var composer = new EffectComposer( renderer );
              var renderPass = new RenderPass( scene, camera );
  composer.addPass( renderPass );

  var glitchPass = new GlitchPass();

   composer.addPass( glitchPass );
  var bloomPass = new UnrealBloomPass();
   // composer.addPass( bloomPass );
  const filmPass = new FilmPass(
      9.35,   // noise intensity
      0.85,  // scanline intensity
      628,    // scanline count
      false,  // grayscale
  );
  filmPass.renderToScreen = true;
   composer.addPass(filmPass);
let delta = performance.now() * 0.00008
    function animate() {

      requestAnimationFrame( animate );
                  // controls.update();
                  ballMesh.rotation.x+=0.001
                  ballMesh.rotation.y+=0.001
                    // plane2.rotation.y+=0.01
                       // plane2.rotation.z+=0.01
                  render();
                  evolveSmoke()
  var time = performance.now() * 0.0008
  // plane2.scale.x = Math.abs( Math.sin( time /2) );
  // plane2.scale.y = Math.abs( Math.sin( time /2) );
  var k = 1
  for (var i = 0; i < ballMesh.geometry.vertices.length; i++) {
    var p = ballMesh.geometry.vertices[i]
    p.normalize().multiplyScalar(200 + 300.8 * noise.perlin3(p.x * k + time, p.y * k, p.z * k))
  }

  ballMesh.geometry.computeVertexNormals()
  ballMesh.geometry.normalsNeedUpdate = true
  ballMesh.geometry.verticesNeedUpdate = true



              }

              function render() {


                //console.log(camera)




    //               if(cannonDebugRenderer){
    //   cannonDebugRenderer.update()
    // }
      composer.render();

        }
    animate();

      })


  }

  componentDidUpdate(){



  }




  render() {

    //console.log(this.state)

    return (
      <div>

      <div className='text '>
      The intersection of art and technology


      </div>

</div>


    )
  }
}
export default Main
