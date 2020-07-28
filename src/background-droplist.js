//	background-droplist.js

	(function(background_droplist){

		const skyboxes = [
		//	{"key":"Sky 02","value":"AiYr5Bj,BawPVy4,OnEYrxP,t5eKqEL,L7SNCXP,7dcYXKc"},
		//	{"key":"Sky 03","value":"fbLkP5b,2ezGkl6,IyXzc4L,ja5htHQ,QZDxVvI,BZ68JvT"},
		//	{"key":"Space 4","value":"v6bjQLb,lwrlr6P,kKUKBJg,N0oZlJR,x9q8z0K,HYcK7Ii"},
		//	{"key":"Space 5","value":"QMKy05Z,eys5BBV,8l6Pi8Q,Z1KEwRy,wSs16BJ,DwVYZWm"},
			{"key":"space","value":"XtPBLgT,32NO3Lc,1SMHHAp,gbEbMNT,lvgr5hN,F3rDcga"},
			{"key":"space 2","value":"Xc66lOU,AVEUFWj,8wnSjQE,pQ7v0wX,iLDmlLu,wuaAI4Y"},
			{"key":"space 3","value":"1ngOaxz,HTXmngS,U8clyMh,NUzQ5yn,KJ7c2ee,Z7hIEdv"},
			{"key":"space 4","value":"3E05J80,4r01E6C,2bON7hI,5f4R105,hfmahM3,py4wSN9"},
			{"key":"space 5","value":"QMKy05Z,eys5BBV,8l6Pi8Q,Z1KEwRy,wSs16BJ,DwVYZWm"},
			{"key":"mebula","value":"OWp9t1x,cvxZwad,WbWfGjU,H83gehZ,pk3zUkz,SimZzUK"},
			{"key":"autumn","value":"MpytPQn,bDeAi8p,5tK8afR,TWF1Jnv,sWpEZpx,AIbLzhH"},
			{"key":"Dark Sunset","value":"ty5neut,b8zTECB,Px8IhnE,9gashbV,lNErUmY,Gwaif8K"},
			{"key":"forest","value":"wVNQ3UP,CpnLWRG,zpQtUgE,moU3V1A,gxRSIIK,6hPT2T6"},
			{"key":"island","value":"dC6LmWy,EUQHho3,3Y3NELo,6tB1mFC,RG9xkGf,0DWY6ln"},
			{"key":"pines-road","value":"J5JO8vF,HBFA8gP,dwvuy0g,XOpnnOv,r6DTvai,GIfSE6a"},
			{"key":"sky01","value":"GKYsaK6,3IrwfbY,Eh5Cx5x,ZbWUJHX,Q2zhZUa,enQgsUD"},
			{"key":"sky02","value":"AiYr5Bj,BawPVy4,OnEYrxP,t5eKqEL,L7SNCXP,7dcYXKc"},
			{"key":"sky03","value":"fbLkP5b,2ezGkl6,IyXzc4L,ja5htHQ,QZDxVvI,BZ68JvT"},
			{"key":"sky14","value":"oIeGekr,4p17vuI,1ADPm2x,9hsvroD,aYKe72m,8FUzbvo"},
			{"key":"sky26","value":"FMADmcP,21Ia1L4,a9I6dw9,d8zXEEb,0W2gkSn,QGPHjW3"},
			{"key":"sky30","value":"S1ck5UU,sB7fR7D,OAp7iJW,d9YgYy4,bjh7cgC,ImftiPX"},
			{"key":"sky31","value":"bZbi4vd,QkB0mC9,cDsY3n2,mxfpk2g,PKFhbNQ,1cIamo4"},
			{"key":"sky32","value":"cD2fVJ3,z6znJF8,KsTVPR6,LbITtbU,FnIWnix,qA8Yn6M"},
			{"key":"sky33","value":"m9oqzUL,vGZk6PQ,hobXq8I,dwvkY61,D73klTH,zyT64gv"},
			{"key":"sky88","value":"E1xjrkm,b48TEwK,IuWHRau,a0TqSus,N5rXVkP,wRHUyzS"},
			{"key":"sky89","value":"zKf8l2y,Q2Txc9V,edxYeCT,Wce0wqT,fhcix7U,PjJBFNc"},
			{"key":"sky90","value":"8VrI7tY,tuLEzTu,fELVfRS,NQPAVgB,7pcNO10,Hxo0Zxo"},
			{"key":"skybox","value":"Ih8hz3h,lOlAHhx,lwiUbBi,Mmp7eqN,ws3Y2Qo,lm2XlSi"},
			{"key":"starry","value":"InYFZCq,PiN1Z9Y,IlbcPnw,wai32zC,vrzgU5k,FwrPE1I"},
			{"key":"sunset","value":"V8zIj55,3Df4xsN,FGEnBpd,RNtY1y2,WRgHw0T,wE49kB2"},
			{"key":"moon","value":"zJB8OPe,pP9eDVf,Y8Krh0j,sfiEXOs,SaeOiKt,YzF35vW"},
			{"key":"sunny","value":"f3PhGwV,dtnVw3b,SWFFe2x,0L72gkl,ZChWgVX,1GG72rw"}
		];

	//	Create options.
		var str =  "", dot = ".", col = ":";
		for (var i=0; i < skyboxes.length; i++ ) {
			var option = document.createElement("option");
			var index = String( i+1 );
			var name = skyboxes[i].key;
			option.text = str+index+dot+name; 
			option.value = skyboxes[i].value;
			background_droplist.appendChild( option );
		}

		watch( background_droplist, "onchange", function( prop, event, value ){ 
			debugMode && console.log({item:background_droplist,event:event,value:value}); // debug.
		});

		background_droplist.addEventListener( "change", function(){
			this.blur(); callWatchers( this, "onchange", "change", this.value );
		});

	})( TabUI.Skydome.tab.querySelector("select#background-texture-droplist") );

	(function( scene,background_droplist) {

		watch( background_droplist, "onchange", function( prop, event, value ){

			if (!scene || Number(THREE.REVISION) < 78) return;

			value = value.split(",");
			if ( !value ) return; if ( value.length != 6 ) return;

			var urls = value.map(function(item){ 
				return "https://i.imgur.com/"+item+".jpg"; 
			});

			var loader = new THREE.CubeTextureLoader();
			loader.setCrossOrigin( "anonymous" );
			loader.load( urls, function(texture){
				scene.background = texture;
				scene.background.needsUpdate = true;
			//	textures_entities && textures_entities.add(texture);
			});

		});

		background_droplist.value = "OWp9t1x,cvxZwad,WbWfGjU,H83gehZ,pk3zUkz,SimZzUK"; // "mebula".
		callWatchers( background_droplist, "onchange", "change", background_droplist.value );

	})( scene, TabUI.Skydome.tab.querySelector("select#background-texture-droplist") );


//	                 posx,   negx,   posy,   negy,   posz,   negz
//	const sky02  = "AiYr5Bj,BawPVy4,OnEYrxP,t5eKqEL,L7SNCXP,7dcYXKc";
//	const sky03  = "fbLkP5b,2ezGkl6,IyXzc4L,ja5htHQ,QZDxVvI,BZ68JvT";
//	const space4 = "v6bjQLb,lwrlr6P,kKUKBJg,N0oZlJR,x9q8z0K,HYcK7Ii";
//	const space5 = "QMKy05Z,eys5BBV,8l6Pi8Q,Z1KEwRy,wSs16BJ,DwVYZWm";


/*
	(function(scene,textures_entities){

		if (!scene || Number(THREE.REVISION) < 78) return;

		var urls = [
			"https://i.imgur.com/v6bjQLb.jpg", // "posx.jpg",
			"https://i.imgur.com/lwrlr6P.jpg", // "negx.jpg", 
			"https://i.imgur.com/kKUKBJg.jpg", // "posy.jpg", 
			"https://i.imgur.com/N0oZlJR.jpg", // "negy.jpg", 
			"https://i.imgur.com/x9q8z0K.jpg", // "posz.jpg", 
			"https://i.imgur.com/HYcK7Ii.jpg", // "negz.jpg"
		];

		var loader = new THREE.CubeTextureLoader();
		loader.setCrossOrigin( "anonymous" );
		loader.load( urls, function(texture){
			scene.background = texture;
			scene.background.needsUpdate = true;
			textures_entities && textures_entities.add(texture);
		});

	})( scene, textures_entities );
*/
