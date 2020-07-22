
//	texture-needs-update.js

	(function( needs_update ){

		watch( needs_update, "onclick", function( prop, event, value ){

			var texture = getTextureByEntityId(value);
			if ( texture ) texture.needsUpdate = true;

		});

	})( TabUI.Texture.tab.querySelector("div#texture-needs-update") );


//	exit-edit-mode.js

	(function(exit_button,entity_droplist,exitEditMode){

		watch( exit_button, "onclick", function( prop, event, value ){

			 exitEditMode( entity_droplist );
		});

	})( 
		TabUI.Texture.tab.querySelector("div#texture-exit-mode"), // exit_button,
		TabUI.Texture.tab.querySelector("select#textures-entities-droplist"), // entity_droplist.
		exitEditMode // function.
	 ); 

//	reset-vectors.js

	(function( editor,reset_button,vector_w,vector_droplist ){

		watch( reset_button, "onclick", function( property, event, key ){

			switch ( key ) {
				case "center":
				case "offset":
					editor[key].set(0,0);
				break;
				case "repeat":
					editor[key].set(1,1);
				break;
			}

		});

	})(
		textureEditor, // editor,
		TabUI.Texture.tab.querySelector("div#texture-vectors-reset"), // reset_button,
		TabUI.Texture.tab.querySelector("select#texture-vector-droplist") // vector_droplist.
	);

//	replace-image.js

	(function(viewer,input,button,droplist){

		var interval;

		input.addEventListener( "change", function(e){

			if ( input.files.length === 0 ) return;

			var file = input.files[0];

		//	get texture.
			var texture = getTextureByEntityId( droplist.value ); // string.
			if ( !texture ) return; debugMode && console.log( texture );

			var img = new Image();
			img.addEventListener("load", function(){

			//	make power of two.
				var canvas = document.createElement("canvas");
				canvas.width = THREE.Math.floorPowerOfTwo( img.width );
				canvas.height = THREE.Math.floorPowerOfTwo( img.height );
				var context = canvas.getContext( "2d" );
				context.drawImage( img, 0, 0, canvas.width, canvas.height );
				debugMode && console.log( canvas );

			//	texture has gotten.
				if ( !texture ) return;
				texture.image = canvas;
				texture.name = file.name;
				texture.sourceFile = file.name;
				if ( texture.image !== undefined ) texture.needsUpdate = true; // important!
				if ( viewer && viewer.material ) viewer.material.needsUpdate = true; // important!
			//	TODO: Update texture entity option text.

			});

			var reader = new FileReader();
			reader.addEventListener("load", function() {
				img.name = file.name;
				img.src = reader.result;
			});

			reader.readAsDataURL(file);

		});

		button.addEventListener( "click", function(){ 
			input.value = ""; input.click();
		});

	})(
		null, // textureViewer,
		TabUI.Texture.tab.querySelector("input#image-file-input"), // input,
		TabUI.Texture.tab.querySelector("div#replace-image-button"), // button,
		TabUI.Texture.tab.querySelector("select#textures-entities-droplist") // droplist.
	);
