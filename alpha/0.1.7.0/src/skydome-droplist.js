//  skydome-droplist.js

	(function( skydome_droplist ){

		const skydomes = [
			{name:"editor", value:"IMVEV3T"},
			{name:"tropical island", value:"xQsNP0X"},
		];

	//	Create options.
		var str =  "", dot = ".", col = ":";
		for (var i=0; i < skydomes.length; i++ ) {
			var option = document.createElement("option");
			var index = String( i+1 );
			var name = skydomes[i].name;
			option.text = str+index+dot+name; 
			option.value = skydomes[i].value;
			skydome_droplist.appendChild( option );
		}

		watch( skydome_droplist, "onchange", function( prop, event, value ){ 
			debugMode && console.log({item:skydome_droplist,event:event,value:value}); // debug.
		});

		skydome_droplist.addEventListener( "change", function(){
			this.blur(); callWatchers( this, "onchange", "change", this.value );
		});

	})( TabUI.Skydome.tab.querySelector("select#skydome-texture-droplist") );

	(function( skydome,skydome_droplist,textures_entities) {

		watch( skydome_droplist, "onchange", function( prop, event, value ){

			if ( !value ) return;
			var url = "https://i.imgur.com/"+value+".jpg" // xQsNP0X.png

			var loader = new THREE.TextureLoader();
			loader.setCrossOrigin( "anonymous" );
			loader.load( url, function(texture){
				texture.wrapS = texture.wrapT = 1000; 
				texture.name = "skydome:"+value;
				texture.sourceFile = url;
				skydome.material.map = texture;
				skydome.material.needsUpdate = true;
				skydome.material.map.needsUpdate = true;
				textures_entities && textures_entities.add(texture);
			});

		});

		callWatchers( skydome_droplist, "onchange", "change", skydome_droplist.value = "xQsNP0X" ); // "IMVEV3T"

	})( skydome, TabUI.Skydome.tab.querySelector("select#skydome-texture-droplist"), textures_entities );
