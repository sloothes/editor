//	geometry-inputs.js

//	watchers-call-ui.js
//	(function(sphere_droplist){
//		watch( sphere_droplist, "onchange", function( prop, event, value ){ 
//			debugMode && console.log({item:sphere_droplist,event:event,value:value}); // debug.
//		});
//
//		sphere_droplist.addEventListener( "change", function(){
//			this.blur(); callWatchers( this, "onchange", "change", this.value );
//		});
//	})( TabUI.Geometry.tab.querySelector("select#geometry-sphere-droplist")  ); // sphere_droplist.

//	geometry-key-inputs.js

	(function(editor,radius_r,increase,decrease,center_x,center_y,center_z,increase_x,increase_y,increase_z,decrease_x,decrease_y,decrease_z,sphere_droplist,entity_droplist){

		var interval, geometry, boundingBox, boundingSphere; 
		const RAD2DEG = 57.29577951308232; const DEG2RAD = 0.017453292519943295;
		var key; watch( sphere_droplist, "onchange", function( prop, event, value ){ key = value; });
		window.addEventListener( "mouseup", function (){ clearTimeout( interval ); }); // important!

		function displayBoundingSphereCenter(){

			if ( !boundingSphere ) return [ 
				center_x.value,center_y.value,
				center_z.value,radius_r.value
			] = ["","","",""];

			center_x.value = boundingSphere.center.x.toFixed(3);
			center_y.value = boundingSphere.center.y.toFixed(3);
			center_z.value = boundingSphere.center.z.toFixed(3);
			radius_r.value = boundingSphere.radius.toFixed(3);
		}

		function computeBoundingSphere(object){
			geometry = object && object.geometry;
			geometry && !geometry.boundingBox && geometry.computeBoundingBox(); 
			geometry && !geometry.boundingSphere && geometry.computeBoundingSphere(); 
			boundingBox = geometry && geometry.boundingBox; 
			boundingSphere = geometry && geometry.boundingSphere;
			displayBoundingSphereCenter();
		}

		function translate( button, value ){
			if ( !(button && geometry && boundingSphere) ) 
				return displayBoundingSphereCenter();

			var step = Math.abs(value); if ( isNaN(step) ) step = 0.001;
			if ( button === increase_x ) geometry.translate( step, 0, 0 );
			if ( button === increase_y ) geometry.translate( 0, step, 0 );
			if ( button === increase_z ) geometry.translate( 0, 0, step );
			if ( button === decrease_x ) geometry.translate( -step, 0, 0 );
			if ( button === decrease_y ) geometry.translate( 0, -step, 0 );
			if ( button === decrease_z ) geometry.translate( 0, 0, -step );

			return displayBoundingSphereCenter();
		}

		function scale( button, value ){
			if ( !(button && geometry && boundingSphere) ) 
				return displayBoundingSphereCenter();

			var step = Math.abs(value); if ( isNaN(step) ) step = 0.001;
			if ( step === 1 ) return displayBoundingSphereCenter();
			if ( button === increase_x ) geometry.scale( 1+step, 1, 1 );
			if ( button === increase_y ) geometry.scale( 1, 1+step, 1 );
			if ( button === increase_z ) geometry.scale( 1, 1, 1+step );
			if ( button === decrease_x ) geometry.scale( 1-step, 1, 1 );
			if ( button === decrease_y ) geometry.scale( 1, 1-step, 1 );
			if ( button === decrease_z ) geometry.scale( 1, 1, 1-step );

			return displayBoundingSphereCenter();
		}

		watch( entity_droplist, "onchange", function( prop, event, value ){ 
			computeBoundingSphere(getObjectByEntityId(value));
			callWatchers( sphere_droplist, "onchange", "change", sphere_droplist.value );
			debugMode && console.log( "geometry:", geometry );
			debugMode && console.log( "boundingBox:", boundingBox );
			debugMode && console.log( "boundingSphere:", boundingSphere );
		});

		//	function rotate( button, value ){
		//		if ( !(button && geometry && boundingSphere) ) 
		//			return displayBoundingSphereCenter();
		//		var step = Math.abs(DEG2RAD*value); if ( isNaN(step) ) step = DEG2RAD/10;
		//		if ( button === increase_x ) geometry.rotateX(  step );
		//		if ( button === increase_y ) geometry.rotateY(  step );
		//		if ( button === increase_z ) geometry.rotateZ(  step );
		//		if ( button === decrease_x ) geometry.rotateX( -step );
		//		if ( button === decrease_y ) geometry.rotateY( -step );
		//		if ( button === decrease_z ) geometry.rotateZ( -step );
		//		return displayBoundingSphereCenter();
		//	}

	//	geometry-key-inputs.js

	/*
		function onChangeInputValue( input, button ){

			watch( input, "onchange", function( prop, event, value ){ 
				switch ( key ){
					case "scale":
						return scale( button, value );
					break;
					case "translate":
						return translate( button, value );
					break;
				}
			});

			input.addEventListener( "change", function(){
				this.blur(); callWatchers( this, "onchange", "change", this.value );
			});

		}

		onChangeInputValue( TabUI.Geometry.tab.querySelector("input#geometry-center-x-input"), increase_x );
		onChangeInputValue( TabUI.Geometry.tab.querySelector("input#geometry-center-y-input"), increase_y );
		onChangeInputValue( TabUI.Geometry.tab.querySelector("input#geometry-center-z-input"), increase_z );
	*/

	//	geometry-mouse-inputs.js

		function onMouseClickInputValue( button ){ 

			button.addEventListener( "mousedown", function(){
				clearTimeout( interval ); // important!
				interval = setTimeout( function update_bounding( button ){
					switch ( key ){
						case "scale":
							interval = setTimeout( update_bounding, 20, button );
							return scale( button, 0.01 );
						break;
						case "translate":
							interval = setTimeout( update_bounding, 10, button );
							return translate( button, 0.01 );
						break;
					}
				}, 500, this);
			});

			button.addEventListener( "click", function(){
				clearTimeout( interval );
				switch ( key ){
					case "scale":
						return scale( button, 0.01 );
					break;
					case "translate":
						return translate( button, 0.01 );
					break;
				}
			});
		}

		onMouseClickInputValue( TabUI.Geometry.tab.querySelector("li#geometry-center-x-increase") );
		onMouseClickInputValue( TabUI.Geometry.tab.querySelector("li#geometry-center-y-increase") );
		onMouseClickInputValue( TabUI.Geometry.tab.querySelector("li#geometry-center-z-increase") );
		onMouseClickInputValue( TabUI.Geometry.tab.querySelector("li#geometry-center-x-decrease") );
		onMouseClickInputValue( TabUI.Geometry.tab.querySelector("li#geometry-center-y-decrease") );
		onMouseClickInputValue( TabUI.Geometry.tab.querySelector("li#geometry-center-z-decrease") );

	})(
		objectEditor, // editor,
		TabUI.Geometry.tab.querySelector("input#geometry-radius-input"),     // radius_r,
		TabUI.Geometry.tab.querySelector("li#geometry-radius-increase"),     // increase,
		TabUI.Geometry.tab.querySelector("li#geometry-radius-decrease"),     // decrease,
		TabUI.Geometry.tab.querySelector("input#geometry-center-x-input"),   // center_x,
		TabUI.Geometry.tab.querySelector("input#geometry-center-y-input"),   // center_y,
		TabUI.Geometry.tab.querySelector("input#geometry-center-z-input"),   // center_z,
		TabUI.Geometry.tab.querySelector("li#geometry-center-x-increase"),   // increase_x,
		TabUI.Geometry.tab.querySelector("li#geometry-center-y-increase"),   // increase_y,
		TabUI.Geometry.tab.querySelector("li#geometry-center-z-increase"),   // increase_z,
		TabUI.Geometry.tab.querySelector("li#geometry-center-x-decrease"),   // decrease_x,
		TabUI.Geometry.tab.querySelector("li#geometry-center-y-decrease"),   // decrease_y,
		TabUI.Geometry.tab.querySelector("li#geometry-center-z-decrease"),   // decrease_z,
		TabUI.Geometry.tab.querySelector("select#geometry-sphere-droplist"), // sphere_droplist,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist")    // entity_droplist,
	);
