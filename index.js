console.log("running");
let app = {
    // Setup method, create world
    setup:function(){
        // Set camera
            app.scene = new THREE.Scene();
            app.camera = new THREE.PerspectiveCamera( 
                75, 
                window.innerWidth / window.innerHeight,
                0.1,
                1000000
            );
            app.renderer = new THREE.WebGLRenderer();
            app.renderer.setSize( window.innerWidth, window.innerHeight );
            app.renderer.setClearColor(0xEEEEEE);
            document.body.appendChild( app.renderer.domElement );
            app.camera.z = 500000;

		// Lights
            app.light = new THREE.AmbientLight( 0xaaaaaa ); 
            app.scene.add( app.light );
			app.pointLight = new THREE.PointLight( 0xffffff, 1);
			app.pointLight.position.set( 50, 50, -600 );
			app.scene.add( app.pointLight );

        // Store radius in object
    
            app.props = {
                r:400
            };
    
        // Load props
           app.props.syncLoaders = function(){
                if(!app.props.sync){
                    app.props.obj.position.y = 200;
                    app.props.obj.position.x = app.props.r;
                    app.props.obj.position.z = -800;
                    app.props.obj.rotation.x = Math.PI/2;
                    app.props.obj.rotation.y = Math.PI;
					console.log(app.props.mtl);
					console.log(app.props.obj);
					app.props.mtl.getAsArray().map(
						(x,i)=> app.props.obj.children[i].material=x
					);
                    app.scene.add(app.props.obj); 
                    app.update();
                }
           }
           app.props.sync = 2;
           var mtlLoader = new THREE.MTLLoader();
           mtlLoader.setPath("3DModel/").load("Sun Glyder.mtl",function(mtl){
				mtl.preload();
                app.props.mtl = mtl;
                app.props.sync-=1;
                app.props.syncLoaders();
           });
           var objLoader = new THREE.OBJLoader();
           objLoader.load("3DModel/Sun Glyder.obj",function(obj){
                app.props.obj = obj;
                app.props.sync-=1;
                app.props.syncLoaders();
           });
        
        app.runAnimation();
    },
    update:function(){
        app.renderer.render(app.scene,app.camera); 
    },
    runAnimation:function(){
        // RequestFrameupdate
        // Update obj position 
        // app.obj.position.x = Math.cos(app.obj.angle)*app.obj.r;
        // app.obj.position.x = Math.sin(app.obj.angle)*app.obj.r;
        // Run again
        app.update();
    }
}
document.addEventListener("DOMContentLoaded",app.setup);
