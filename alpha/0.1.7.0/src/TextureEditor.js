//	TextureEditor.js

	function TextureEditor(){
		var texture = new THREE.Texture();
		Object.setPrototypeOf( texture, TextureEditor.prototype );
		return texture; // important!
	}

	TextureEditor.prototype = Object.create(THREE.Texture.prototype); // important!

	TextureEditor.prototype.copy = function( source ){ 
		THREE.Texture.prototype.copy.call( this, source ); // important!
		return this;
	};

	TextureEditor.prototype.reset = function(){ 
		this.copy( new THREE.Texture() ); 
		this.name = "texture editor";
		this.uuid = THREE.Math.generateUUID();
	};

	TextureEditor.prototype.parse = function( json ){
	//	param: a texture json {object}
	//	the missing TextureLoader.parse;

		var editor = this;

		for ( var key in json ) {
			switch ( key ){

				case "image":
					console.warn("case:",key,"TODO!"); // TODO!
				break;

				case "center":
				case "offset":
				case "repeat":
					editor[ key ].x = json[ key ][0];
					editor[ key ].y = json[ key ][1];
				break;

				case "wrap":
					editor.wrapS = json[ key ][0];
					editor.wrapT = json[ key ][1];
				break;

				default:
					editor[ key ] = json[ key ];
				break;
			}
		}

	};

	TextureEditor.prototype.update = function( value ){

	//	Copies the values of the target texture of textures
	//	entity manager. Does not updates the target texture.
	//	dependences: texture_entities {texture manager},
	//	param: a texture id {string or number},

		var editor = this;

	//	get target texture.
		var texture = getTextureByEntityId( value );
		var isEditing = !!texture; // boolean!

	//	update editor (copy).
		if ( texture ) {
			editor.copy( texture );
			editor.name = texture.name;
			editor.uuid = texture.uuid;
		}

	//	return boolean.
	//	console.log("editor isEditing:", isEditing);
		return isEditing; // boolean, important!

	};

	const textureEditor = new TextureEditor();
