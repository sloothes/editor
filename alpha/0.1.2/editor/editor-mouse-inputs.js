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

			var state, interval, dt = 20;
			var meta = {geometries:{},materials:{},textures:{},images:{},shapes:{}};

			const RAD2DEG = 57.29577951308232;
			const DEG2RAD = 0.017453292519943295;

		//	keep first mousedown event, ignore next events.

			function onfirstMouseDown(){
				state = {}; // reset.
				if ( entity_droplist.value === "" ) return;
				var key = state.key = vector_droplist.value;
				state.value = editor[key][v];
				state.json = editor.toJSON( meta );
				this.removeEventListener( "mousedown", onfirstMouseDown );
				debugMode && console.log( {state:state,meta:meta} ); // debug!
			};

		//	on mouse down.

			function onMouseDown(){ 

				clearTimeout( interval ); // important!

				if ( entity_droplist.value === "" ) return;

				var button = this;

				interval = setTimeout( function update() {

					var key = vector_droplist.value;

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

		//	add undo.

			function addtoUndo( state,key,value ){
				if ( state.key !== key ) return; if ( state.value === value ) return;
				if ( state.json ) { var json = JSON.parse(JSON.stringify(state.json)); undo_button.undo.unshift(json); }
				debugMode && console.log( "undo:", undo_button.undo.length, "redo:", undo_button.redo.length ); return;
			}

		//	on mouse click.

			function onMouseClick(){

				clearTimeout( interval ); // important!

				if ( entity_droplist.value === "" ) return;

				var button = this;
				var key = vector_droplist.value;

				switch ( key ) {
					case "position":
						var p = 2, step = 1/Math.pow(10,p); // min = -100, max = 100;
						var value = Number(editor[ key ][v]); // get value from editor.
						if ( button === increase ) value += step;
						if ( button === decrease ) value -= step;
						editor[ key ][v] = round(value,6); 
						interval = setTimeout( function( state,key,value ){ 
						//	try{ addtoUndo( state,key,value ); } catch(err){;}
							button.addEventListener( "mousedown", onfirstMouseDown );
						}, 250, state,key,value);
					break;
					case "rotation":
						var p = 1, step = 1/Math.pow(10,p), min = -180, max = 180;
						var value = RAD2DEG * Number(editor[ key ][v]); // get value from editor.
						if ( button === increase ) value = THREE.Math.clamp( value+step, min, max );
						if ( button === decrease ) value = THREE.Math.clamp( value-step, min, max );
						editor[ key ][v] = round(DEG2RAD*value,6); 
						interval = setTimeout( function( state,key,value ){ 
						//	try{ addtoUndo( state,key,value ); } catch(err){;}
							button.addEventListener( "mousedown", onfirstMouseDown );
						}, 250, state,key,value);
					break;
					case "scale":
						var p = 3, step = 1/Math.pow(10,p); // min = -100, max = 100;
						var value = Number(editor[ key ][v]); // get value from editor.
						if ( button === increase ) value += step;
						if ( button === decrease ) value -= step;
						editor[ key ][v] = round(value,6);
						interval = setTimeout( function( state,key,value ){ 
						//	try{ addtoUndo( state,key,value ); } catch(err){;}
							button.addEventListener( "mousedown", onfirstMouseDown );
						}, 250, state,key,value);
					break;
				}

				debugMode && console.log( "on Mouse Click:", interval );
			}

			increase.addEventListener( "mousedown", onfirstMouseDown );
			decrease.addEventListener( "mousedown", onfirstMouseDown );
			increase.addEventListener( "mousedown", onMouseDown );
			decrease.addEventListener( "mousedown", onMouseDown );
			window.addEventListener( "mouseup", function (){ 
				clearTimeout( interval ); }); // important!
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

		var state, interval, dt = 20;
		var meta = {geometries:{},materials:{},textures:{},images:{},shapes:{}};

		const RAD2DEG = 57.29577951308232;
		const DEG2RAD = 0.017453292519943295;

	//	keep first mousedown event, ignore next events.

		function onfirstMouseDown(){
			state = {}; // reset.
			if ( entity_droplist.value === "" ) return;
			var key = state.key = vector_droplist.value;
			state.value = editor[key].w;
			state.json = editor.toJSON( meta );
			this.removeEventListener( "mousedown", onfirstMouseDown );
			debugMode && console.log( {state:state,meta:meta} ); // debug!
		};

	//	on mouse down.

		function onMouseDown(){ 

			clearTimeout( interval ); // important!

			if ( entity_droplist.value === "" ) return;

			var button = this;

			interval = setTimeout( function update() {

				var key = vector_droplist.value;

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

	//	add undo.

		function addtoUndo( state,key,value ){
			if ( state.key !== key ) return; if ( state.value === value ) return;
			if ( state.json ) { var json = JSON.parse(JSON.stringify(state.json)); undo_button.undo.unshift(json); }
			debugMode && console.log( "undo:", undo_button.undo.length, "redo:", undo_button.redo.length ); return;
		}

	//	on mouse click.

		function onMouseClick(){

			clearTimeout( interval ); // important!

			if ( entity_droplist.value === "" ) return;

			var button = this;

			var key = vector_droplist.value;

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
					interval = setTimeout( function( state,key,value ){ 
					//	try{ addtoUndo( state,key,value ); } catch(err){;}
						button.addEventListener( "mousedown", onfirstMouseDown );
					}, 250, state,key,value);
				break;
			}

			debugMode && console.log( "on Mouse Click:", interval );
		}

		increase_w.addEventListener( "mousedown", onfirstMouseDown );
		decrease_w.addEventListener( "mousedown", onfirstMouseDown );
		increase_w.addEventListener( "mousedown", onMouseDown );
		decrease_w.addEventListener( "mousedown", onMouseDown );
		window.addEventListener( "mouseup", function (){
			clearTimeout( interval ); // important!
		});
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
