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
                  camera.position.z=35
      scene.add( camera )
      let light = new THREE.DirectionalLight( 0xffffff, 0.5 )
      scene.add(light)
      let ballGeo = new THREE.SphereGeometry( 5, 20, 20 );
      let texture = new THREE.TextureLoader().load( 'assets/test.png' )
      let texture2 = new THREE.TextureLoader().load( 'assets/test.png' )
      if(this.state.works){
               texture = new THREE.TextureLoader().load( `data:image/png;base64,  ${this.state.works[0].dat.slice(2).slice(0, -1)}` )
                texture = new THREE.TextureLoader().load( `data:image/png;base64,  ${this.state.works[1].dat.slice(2).slice(0, -1)}` )
            };
      let ballMaterial = new THREE.MeshPhongMaterial( { color: 0xFFFFFF, map: texture } )
    let  ballMesh = new THREE.Mesh( ballGeo, ballMaterial )
    scene.add(ballMesh)
    let renderer = new THREE.WebGLRenderer( {alpha: false } );                renderer.setSize( window.innerWidth, window.innerHeight );

    container.appendChild( renderer.domElement )
      let controls = new OrbitControls( camera, renderer.domElement );
      var geometry = new THREE.PlaneGeometry( 40, 20, 24, 12 );
              var material = new THREE.MeshBasicMaterial( {color: 0xFFFFFF, side: THREE.DoubleSide, map: texture2 } );
            let  plane2 = new THREE.Mesh( geometry, material );
              plane2.matrixWorldNeedsUpdate = true
              plane2.elementsNeedUpdate = true
              plane2.verticesNeedUpdate = true
              scene.add( plane2 );
              var composer = new EffectComposer( renderer );
              var renderPass = new RenderPass( scene, camera );
  composer.addPass( renderPass );

  var glitchPass = new GlitchPass();
  console.log(glitchPass)
  //composer.addPass( glitchPass );
  var bloomPass = new UnrealBloomPass();
  //composer.addPass( bloomPass );
  const filmPass = new FilmPass(
      1.35,   // noise intensity
      1.25,  // scanline intensity
      648,    // scanline count
      false,  // grayscale
  );
  filmPass.renderToScreen = true;
  //composer.addPass(filmPass);

    function animate() {

      requestAnimationFrame( animate );
                  // controls.update();
                  ballMesh.rotation.x+=0.01
                  ballMesh.rotation.y+=0.01
                    plane2.rotation.y+=0.01
                      plane2.rotation.z+=0.01
                  render();


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
