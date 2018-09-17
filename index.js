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
            app.renderer.setClearColor(0x888888);
            document.body.appendChild( app.renderer.domElement );
            app.camera.position.z = 10;
            app.camera.position.y = -600;
            app.camera.rotation.x = Math.PI/4;

		// Lights
            app.light = new THREE.AmbientLight( 0xdddddd ); 
            app.scene.add( app.light );
			app.pointLight = new THREE.PointLight( 0xffffff, 1);
			app.pointLight.position.set( 0, 0, -500 );
			app.scene.add( app.pointLight );
        

        // Store radius in object
    
            app.props = {
                r:400,
                speed:Math.PI*2/120,
                angle:0
            };
        
        // Create plane ground
            var geometry = new THREE.PlaneGeometry(2000,2000);
            var material = new THREE.MeshStandardMaterial({color:new THREE.Color(0x777777)});
            app.plane = new THREE.Mesh(geometry,material);;
            app.plane.position.z = -820;
            app.scene.add(app.plane);
    
        // Load obj
           app.props.syncLoaders = function(){
                if(!app.props.sync){
                    app.obj.position.y = 200;
                    app.obj.position.x = app.props.r;
                    app.obj.position.z = -800;
                    app.obj.rotation.x = Math.PI/2;
                    app.obj.rotation.y = Math.PI;
					app.props.mtl.getAsArray().map(
						(x,i)=> app.obj.children[i].material=x
					);
					app.props.mtl.getAsArray().map(
						(x,i)=> app.obj.children[i].castShadow=true
					);
                    app.scene.add(app.obj); 
                    app.runAnimation();
                    //app.update();
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
                app.obj = obj;
                app.props.sync-=1;
                app.props.syncLoaders();
           });
        
    },
    update:function(){
        app.renderer.render(app.scene,app.camera); 
    },
    runAnimation:function(){
        // RequestFrameupdate
        requestAnimationFrame(app.runAnimation);
        // Update obj position 
        app.props.angle+=app.props.speed;
        app.obj.position.x = Math.cos(app.props.angle)*app.props.r;
        app.obj.position.y = Math.sin(app.props.angle)*app.props.r;
        app.obj.rotation.y += app.props.speed;
        // Run again
        app.update();
    }
}
document.addEventListener("DOMContentLoaded",app.setup);
