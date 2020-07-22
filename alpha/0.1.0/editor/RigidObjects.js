
//	RigidObjects.js

//	CameraControls rigid objects,
//	keeps camera controls rigid objects on edit mode.
//	TODO: extends from Array class.

	function RigidObjects(){
		var array = new Array(0);
		Object.setPrototypeOf( array, RigidObjects.prototype );
		return array; // important!
	}

	RigidObjects.prototype = Object.create(Array.prototype);

	RigidObjects.prototype.add = function( value ){

		var object = getObjectByEntityId( value );

		if ( object && this.findIndex( function( item ){ 
			return item.id === object.id;
		}) > -1 ) return; // already exists in rigidObjects.

		object && object.isMesh && this.push( object );

	};

	RigidObjects.prototype.remove = function( value ){

		var index = this.findIndex( 
			function( object ){
				return object.id === parseInt( value );
			});

		if ( index < 0 ) return; // not found!

		this.splice( index, 1 );

	};

	const rigidObjects = new RigidObjects();

