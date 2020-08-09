//	mouse-inputs.js

	(function( editor,increase,decrease,key_droplist,entity_droplist,undo_button ){

		var key; watch( key_droplist, "onchange", function( prop, event, value ){ key = value; });

		watch( increase, "onclick", function( prop, event ){

		//	var key = key_droplist.value;

			switch( key ){
				case "uuid":
					return editor[key] = THREE.Math.generateUUID();
				break;
			//	number.
				case "renderOrder":
					return editor[key] += 1;
				break;
			//	boolean.
				case "visible":
				case "castShadow":
				case "receiveShadow":
				case "frustumCulled":
				case "matrixAutoUpdate":
					return editor[key] = !editor[key];
				break;
			}
		});

		watch( decrease, "onclick", function( prop, event ){

		//	var key = key_droplist.value;

			switch( key ){
				case "uuid":
					return editor[key] = THREE.Math.generateUUID();
				break;
			//	number.
				case "renderOrder":
					return editor[key] -= 1;
				break;
			//	boolean.
				case "visible":
				case "castShadow":
				case "receiveShadow":
				case "frustumCulled":
				case "matrixAutoUpdate":
					return editor[key] = !editor[key];
				break;
			}
		});

	})( objectEditor,                                                      // editor,
		TabUI.Editor.tab.querySelector("li#editor-value-increase"),        // increase,
		TabUI.Editor.tab.querySelector("li#editor-value-decrease"),        // decrease,
		TabUI.Editor.tab.querySelector("select#editor-key-droplist"),      // key_droplist,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist"), // entity_droplist,
		TabUI.Editor.tab.querySelector("div#editor-undo-button")           // undo_button.
	);



	(function( editor,vector_x,vector_y,vector_z,increase_x,increase_y,increase_z,decrease_x,decrease_y,decrease_z,vector_droplist,entity_droplist,undo_button ){

		function onVectorMouseInput( editor,v,input,increase,decrease,vector_droplist,entity_droplist,undo_button ){

			var interval, dt = 20; const RAD2DEG = 57.29577951308232; const DEG2RAD = 0.017453292519943295;
			var key; watch( vector_droplist, "onchange", function( prop, event, value ){ key = value; });
			window.addEventListener( "mouseup", function (){ clearTimeout( interval ); }); // important!

		//	on mouse down.

			function onMouseDown(){ 

				clearTimeout( interval ); // important!

				var button = this;

				interval = setTimeout( function update() {

					switch ( key ) {
						case "position":
							var p = 2, step = 1/Math.pow(10,p); // min = -100, max = 100;
							var value = Number(editor[ key ][v]); // get value from editor.
							if ( button === increase ) value += step;
							if ( button === decrease ) value -= step;
							editor[ key ][v] = round(value,6);
							interval = setTimeout( update, dt );
						break;
						case "rotation":
							var p = 1, step = 1/Math.pow(10,p), min = -180, max = 180;
							var value = RAD2DEG * Number(editor[ key ][v]); // get value from editor.
							if ( button === increase ) value = THREE.Math.clamp( value+step, min, max );
							if ( button === decrease ) value = THREE.Math.clamp( value-step, min, max );
							editor[ key ][v] = round(DEG2RAD*value,6);
							interval = setTimeout( update, dt );
						break;
						case "scale":
							var p = 3, step = 1/Math.pow(10,p); // min = -100, max = 100;
							var value = Number(editor[ key ][v]); // get value from editor.
							if ( button === increase ) value += step;
							if ( button === decrease ) value -= step;
							editor[ key ][v] = round(value,6); // editor manager updates input value.
							interval = setTimeout( update, dt );
						break;
					}

				}, 500);

			}

		//	on mouse click.

			function onMouseClick(){

				clearTimeout( interval ); // important!

				var button = this;

				switch ( key ) {
					case "position":
						var p = 2, step = 1/Math.pow(10,p); // min = -100, max = 100;
						var value = Number(editor[ key ][v]); // get value from editor.
						if ( button === increase ) value += step;
						if ( button === decrease ) value -= step;
						editor[ key ][v] = round(value,6); 
					break;
					case "rotation":
						var p = 1, step = 1/Math.pow(10,p), min = -180, max = 180;
						var value = RAD2DEG * Number(editor[ key ][v]); // get value from editor.
						if ( button === increase ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease ) value = THREE.Math.clamp( value-step, min, max );
						editor[ key ][v] = round(DEG2RAD*value,6); 
					break;
					case "scale":
						var p = 3, step = 1/Math.pow(10,p); // min = -100, max = 100;
						var value = Number(editor[ key ][v]); // get value from editor.
						if ( button === increase ) value += step;
						if ( button === decrease ) value -= step;
						editor[ key ][v] = round(value,6);
					break;
				}
			}

			increase.addEventListener( "mousedown", onMouseDown );
			decrease.addEventListener( "mousedown", onMouseDown );
			increase.addEventListener( "click", onMouseClick );
			decrease.addEventListener( "click", onMouseClick );

		}

		onVectorMouseInput( editor,"x",vector_x,increase_x,decrease_x,vector_droplist,entity_droplist,undo_button );
		onVectorMouseInput( editor,"y",vector_y,increase_y,decrease_y,vector_droplist,entity_droplist,undo_button );
		onVectorMouseInput( editor,"z",vector_z,increase_z,decrease_z,vector_droplist,entity_droplist,undo_button );

	})( objectEditor,                                                      // editor,
		TabUI.Editor.tab.querySelector("input#editor-vector-x-input"),     // vector_x,
		TabUI.Editor.tab.querySelector("input#editor-vector-y-input"),     // vector_y,
		TabUI.Editor.tab.querySelector("input#editor-vector-z-input"),     // vector_z,
		TabUI.Editor.tab.querySelector("li#editor-vector-x-increase"),     // increase_x,
		TabUI.Editor.tab.querySelector("li#editor-vector-y-increase"),     // increase_y,
		TabUI.Editor.tab.querySelector("li#editor-vector-z-increase"),     // increase_z,
		TabUI.Editor.tab.querySelector("li#editor-vector-x-decrease"),     // decrease_x,
		TabUI.Editor.tab.querySelector("li#editor-vector-y-decrease"),     // decrease_y,
		TabUI.Editor.tab.querySelector("li#editor-vector-z-decrease"),     // decrease_z,
		TabUI.Editor.tab.querySelector("select#editor-vector-droplist"),   // vector_droplist,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist"), // entity_droplist,
		TabUI.Editor.tab.querySelector("div#editor-undo-button")           // undo_button.
	);

//	vector-w mouse input.

	(function( editor,vector_w,increase_w,decrease_w,vector_droplist,entity_droplist,undo_button ){

		var interval, dt = 20;
		var key; watch( vector_droplist, "onchange", function( prop, event, value ){ key = value; });
		window.addEventListener( "mouseup", function (){ clearTimeout( interval ); }); // important!


	//	on mouse down.

		function onMouseDown(){ 

			clearTimeout( interval ); // important!

			var button = this;

			interval = setTimeout( function update() {

				switch ( key ) {
					case "scale":
						var p = 3, step = 1/Math.pow(10,p); // min = -100, max = 100;
						if ( button === increase_w ) {
							editor[ key ].x += step; // editor manager updates input value.
							editor[ key ].y += step; // editor manager updates input value.
							editor[ key ].z += step; // editor manager updates input value.
						}
						if ( button === decrease_w ) {
							editor[ key ].x -= step; // editor manager updates input value.
							editor[ key ].y -= step; // editor manager updates input value.
							editor[ key ].z -= step; // editor manager updates input value.
						}
						interval = setTimeout( update, dt );
					break;
				}

			}, 500);
		}

	//	on mouse click.

		function onMouseClick(){

			clearTimeout( interval ); // important!

			var button = this;

			switch ( key ) {
				case "scale":
					var p = 3, step = 1/Math.pow(10,p); // min = -100, max = 100;
					var value = Number(editor[ key ].z); // get value from editor.
					if ( button === increase_w ) {
						editor[ key ].x += step; // editor manager updates input value.
						editor[ key ].y += step; // editor manager updates input value.
						editor[ key ].z += step; // editor manager updates input value.
					}
					if ( button === decrease_w ) {
						editor[ key ].x -= step; // editor manager updates input value.
						editor[ key ].y -= step; // editor manager updates input value.
						editor[ key ].z -= step; // editor manager updates input value.
					}
				break;
			}
		}

		increase_w.addEventListener( "mousedown", onMouseDown );
		decrease_w.addEventListener( "mousedown", onMouseDown );
		increase_w.addEventListener( "click", onMouseClick );
		decrease_w.addEventListener( "click", onMouseClick );

	})(
		objectEditor,                                                      // editor,
		TabUI.Editor.tab.querySelector("input#editor-vector-w-input"),     // vector_w,
		TabUI.Editor.tab.querySelector("li#editor-vector-w-increase"),     // increase_w,
		TabUI.Editor.tab.querySelector("li#editor-vector-w-decrease"),     // decrease_w,
		TabUI.Editor.tab.querySelector("select#editor-vector-droplist"),   // vector_droplist,
		TabUI.Editor.tab.querySelector("select#editor-entities-droplist"), // entity_droplist,
		TabUI.Editor.tab.querySelector("div#editor-undo-button")           // undo_button.
	);





//	TO FIX IT:

/*
		//	editor-mouse-inputs.js

		//	key mouse inputs.

			(function( editor,increase,decrease,key_droplist ){

				var key; watch( key_droplist, "onchange", function( prop, event, value ){ key = value; });

				watch( increase, "onclick", function( prop, event ){

					switch( key ){
						case "uuid":
							return editor[key] = THREE.Math.generateUUID();
						break;
					//	number.
						case "renderOrder":
							return editor[key] += 1;
						break;
					//	boolean.
						case "visible":
						case "castShadow":
						case "receiveShadow":
						case "frustumCulled":
						case "matrixAutoUpdate":
							return editor[key] = !editor[key];
						break;
					}
				});

				watch( decrease, "onclick", function( prop, event ){

					switch( key ){
						case "uuid":
							return editor[key] = THREE.Math.generateUUID();
						break;
					//	number.
						case "renderOrder":
							return editor[key] -= 1;
						break;
					//	boolean.
						case "visible":
						case "castShadow":
						case "receiveShadow":
						case "frustumCulled":
						case "matrixAutoUpdate":
							return editor[key] = !editor[key];
						break;
					}
				});

			})( objectEditor,                                                      // editor,
				TabUI.Editor.tab.querySelector("li#editor-value-increase"),        // increase,
				TabUI.Editor.tab.querySelector("li#editor-value-decrease"),        // decrease,
				TabUI.Editor.tab.querySelector("select#editor-key-droplist"),      // key_droplist,
			);

		//	vector mouse inputs.

			(function( editor,increase_x,increase_y,increase_z,increase_w,decrease_x,decrease_y,decrease_z,decrease_w,vector_droplist ){

				var interval; const RAD2DEG = 57.29577951308232; const DEG2RAD = 0.017453292519943295;
				var key; watch( vector_droplist, "onchange", function( prop, event, value ){ key = value; });
				window.addEventListener( "mouseup", function (){ clearTimeout( interval ); }); // important!

				function updatePositionValue( button,v, step ){
					var value = Number(editor[ key ][v]);
					if ( button === increase ) value += step;
					if ( button === decrease ) value -= step;
					editor[ key ][v] = round(value,6);
				}

				function updateRotationValue( button,increase,decrease,v, step,min,max ){
					var value = RAD2DEG * Number(editor[ key ][v]);
					if ( button === increase ) value = THREE.Math.clamp( value+step, min, max );
					if ( button === decrease ) value = THREE.Math.clamp( value-step, min, max );
					editor[ key ][v] = round(DEG2RAD*value,6);
				}

				function updateScaleValue( button,v, step ){
					var value = Number(editor[ key ][v]);
					if ( button === increase ) value += step;
					if ( button === decrease ) value -= step;
					editor[ key ][v] = round(value,6);
				}

				function updateScaleValues( button, step ){
					if ( button === increase ) {
						editor[ key ].x += step;
						editor[ key ].y += step;
						editor[ key ].z += step;
					}
					if ( button === decrease ) {
						editor[ key ].x -= step;
						editor[ key ].y -= step;
						editor[ key ].z -= step;
					}
				}

			//	on mouse down.

				function onMouseClickInputValue( increase,decrease,v ){

					function onMouseDown(){

						clearTimeout( interval );

						interval = setTimeout( function update_object(button) {
							switch ( key ) {

								case "position":
									interval = setTimeout( update_object, 20 );
									return updatePositionValue( button,increase,decrease, v, 0.01 );
								break;

								case "rotation":
									interval = setTimeout( update_object, 20 );
									return updateRotationValue( button,increase,decrease, v, 0.1,-180,180 );
								break;

								case "scale":
									interval = setTimeout( update_object, 20 );
									if ( button === increase_w || button === decrease_w ) 
										return updateScaleValues( button,increase,decrease, 0.001 );
									else 
										return updateScaleValue( button,increase,decrease, v, 0.001 );
								break;
							}
						}, 500, this);
					}

				//	on mouse click.

					function onMouseClick(){

						clearTimeout( interval );

						switch ( key ) {
							case "position":
								return updatePositionValue( this,increase,decrease, v, 0.01 );
							break;
							case "rotation":
								return updateRotationValue( this,increase,decrease, v, 0.1,-180,180 );
							break;
							case "scale":
								if ( this === increase_w || this === decrease_w ) 
									return updateScaleValues( this,increase,decrease, 0.001 );
								else 
									return updateScaleValue( this,increase,decrease, v, 0.001 );
							break;
						}
					}

					increase.addEventListener( "mousedown", onMouseDown );
					decrease.addEventListener( "mousedown", onMouseDown );

					increase.addEventListener( "click", onMouseClick );
					decrease.addEventListener( "click", onMouseClick );
				}

				onMouseClickInputValue( increase_x,decrease_x,"x" );
				onMouseClickInputValue( increase_y,decrease_y,"y" );
				onMouseClickInputValue( increase_z,decrease_z,"z" );
				onMouseClickInputValue( increase_w,decrease_w,"w" );

			})( objectEditor,                                                      // editor,
				TabUI.Editor.tab.querySelector("li#editor-vector-x-increase"),     // increase_x,
				TabUI.Editor.tab.querySelector("li#editor-vector-y-increase"),     // increase_y,
				TabUI.Editor.tab.querySelector("li#editor-vector-z-increase"),     // increase_z,
				TabUI.Editor.tab.querySelector("li#editor-vector-w-increase"),     // increase_w,
				TabUI.Editor.tab.querySelector("li#editor-vector-x-decrease"),     // decrease_x,
				TabUI.Editor.tab.querySelector("li#editor-vector-y-decrease"),     // decrease_y,
				TabUI.Editor.tab.querySelector("li#editor-vector-z-decrease"),     // decrease_z,
				TabUI.Editor.tab.querySelector("li#editor-vector-w-decrease"),     // decrease_w,
				TabUI.Editor.tab.querySelector("select#editor-vector-droplist")    // vector_droplist,
			);

*/