//	material-editor-textures-tab-ui.js

	TabUI.add( "MaterialEditorTextures", "material-editor-texture-tab" ); 
	TabUI.append( "MaterialEditorTextures" ); TabUI.MaterialEditorTextures.pill.innerHTML = "Textures";

//	material-editor-textures-map-droplist-ui.js

	(function( tab ){

	//	MaterialEditorTextures map droplist.

		var row = document.createElement("h3"); row.textContent = "select:"; row.style.cssText = "height:30px;"

		var select = document.createElement("select"); select.id = "material-textures-map-droplist";
		select.style.cssText = "width:170px;color:#000;float:right;border:1px solid;border-radius:4px;";
		select.style.cssText += "padding:2px 4px 4px 4px;font-size:20px;margin-left:10px;margin-right:15px;";

		var keys = ",map,aoMap,envMap,lightMap,bumpMap,alphaMap,normalMap,specularMap,";
			keys += "gradientMap,emissiveMap,metalnessMap,roughnessMap,displacementMap";
		keys.split(",").forEach(function( name ){
			var option = document.createElement("option");
			option.text = name; option.value = name; select.appendChild( option );
		});

		row.appendChild( select ); tab.appendChild( row );

	})( TabUI.MaterialEditorTextures.tab );

//	material-editor-textures-viewer-ui.js

	(function( tab ){

	//	MaterialEditorTextures viewer.
		var row = document.createElement("h3"); row.style.cssText = "height:260px;border:none;text-align:center;";
		var canvas = document.createElement("canvas"); canvas.id = "material-textures-viewer"; 
		canvas.width = 256; canvas.height = 256; canvas.style.cssText = "width:256px;height:256px;margin:auto;";
		row.appendChild( canvas ); tab.appendChild( row );

	})( TabUI.MaterialEditorTextures.tab );

//	material-editor-textures-undo-redo-ui.js

	(function( tab ){

	//	MaterialEditorTextures Undo/Redo button.

		var row = document.createElement("h3"); row.style.cssText = "height:40px;margin-bottom:20px;display:none;"

		var redo = document.createElement("div"); 
		redo.id = "material-textures-redo-button"; redo.textContent = "Redo";
		redo.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		redo.style.cssText = "width:44%;float:left;height:40px;font-size:large;margin-right:15px;";

		var undo = document.createElement("div");
		undo.id = "material-textures-undo-button"; undo.textContent = "Undo";
		undo.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		undo.style.cssText = "width:44%;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( redo ); row.appendChild( undo ); tab.appendChild( row );

	})( TabUI.MaterialEditorTextures.tab );

//	material-editor-textures-text-input-ui.js

	(function( tab ){

	//	MaterialEditorTextures Text input.
		var row = document.createElement("h3"); row.style.cssText = "margin-right:20px;height:30px;";
		var input = document.createElement("input"); input.type = "text"; 
		input.id = "material-textures-text-input"; input.setAttribute("placeholder", "text input" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "width:-webkit-fill-available;color:#000;display:inline;margin:0px 5px;";
		input.style.cssText += "text-align:center;font-size:large;font-weigth:bold;background:none;";
		row.appendChild(input); tab.appendChild( row );

	})( TabUI.MaterialEditorTextures.tab );

//	material-editor-textures-key-droplist-ui.js

	(function( tab ){

	//	MaterialEditorTextures Key droplist.

		var row = document.createElement("h3"); row.textContent = "key:"; row.style.cssText = "height:40px;"
		var select = document.createElement("select"); select.id = "material-textures-key-droplist";
		select.style.cssText = "width:170px;color:#000;float:right;border:1px solid;border-radius:4px;";
		select.style.cssText += "padding:2px 4px 4px 4px;font-size:20px;margin-left:10px;margin-right:15px;";

		var keys = ",uuid,name,flipY,format,rotation,mapping,minFilter,magFilter,anisotropy,wrapS,wrapT";
		keys.split(",").forEach(function( name ){
			var option = document.createElement("option"); 
			option.text = name; option.value = name; select.appendChild( option );
		});

		row.appendChild( select ); tab.appendChild( row );

	})( TabUI.MaterialEditorTextures.tab );

//	material-editor-textures-value-input-ui.js

	(function( tab ){

	//	MaterialEditorTextures Value input.

		var row = document.createElement("h3");row.textContent = "value:";row.style.cssText = "margin:10px 15px;height:30px;";
		var vect = document.createElement("div"); vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li"); prev.id = "material-textures-value-decrease";
		prev.innerHTML = "&#9668;"; prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li"); next.id = "material-textures-value-increase";
		next.innerHTML = "&#9658;"; next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input"); input.id = "material-textures-value-input";
		input.setAttribute("placeholder", "value" ); input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;margin:0px 5px;";
		input.style.cssText += "text-align:center;font-size:large;font-weigth:bold;background:none;";

		vect.appendChild(prev); vect.appendChild(input); vect.appendChild(next); row.appendChild(vect); tab.appendChild( row );

	})( TabUI.MaterialEditorTextures.tab );

//	material-editor-textures-vector-droplist-ui.js

	(function( tab ){

	//	MaterialEditorTextures Vector mode droplist.
		var row = document.createElement("h3"); row.textContent = "select:"; row.style.cssText = "height:40px;"
		var select = document.createElement("select"); select.id = "material-textures-vector-droplist";
		select.style.cssText = "width:170px;color:#000;float:right;border:1px solid;border-radius:4px;"
		select.style.cssText += "padding:2px 4px 4px 4px;font-size:20px;margin-left:10px;margin-right:15px;";

		var keys = "offset,repeat,center";
		keys.split(",").forEach(function( name ){
			var option = document.createElement("option"); 
			option.text = name; option.value = name; select.appendChild( option );
		});

		row.appendChild( select ); tab.appendChild( row );

	})( TabUI.MaterialEditorTextures.tab );

//	material-editor-textures-vector-x-ui.js

	(function( tab ){

	//	MaterialEditorTextures vector x.

		var row = document.createElement("h3"); row.textContent = "axis x:"; row.style.cssText = "margin:10px 15px;height:40px;";
		var vect = document.createElement("div"); vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li"); prev.id = "material-textures-vector-x-decrease";
		prev.innerHTML = "&#9668;"; prev.style.display = "inline"; prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li"); next.id = "material-textures-vector-x-increase";
		next.innerHTML = "&#9658;"; next.style.display = "inline"; next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input"); input.id = "material-textures-vector-x-input";
		input.setAttribute("placeholder", "x" ); input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;margin:0px 5px;";
		input.style.cssText += "text-align:center;font-size:large;font-weigth:bold;background:none;";

		vect.appendChild(prev); vect.appendChild(input); vect.appendChild(next); row.appendChild(vect); tab.appendChild( row );

	})( TabUI.MaterialEditorTextures.tab );

//	material-editor-textures-vector-y-ui.js

	(function( tab ){

	//	MaterialEditorTextures vector y.

		var row = document.createElement("h3"); row.textContent = "axis y:"; row.style.cssText = "margin:10px 15px;height:40px;";
		var vect = document.createElement("div"); vect.style.cssText = "width:170px;height:40px;float:right;";

		var prev = document.createElement("li"); prev.id = "material-textures-vector-y-decrease";
		prev.innerHTML = "&#9668;"; prev.style.display = "inline"; prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li"); next.id = "material-textures-vector-y-increase";
		next.innerHTML = "&#9658;"; next.style.display = "inline"; next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input"); input.id = "material-textures-vector-y-input";
		input.setAttribute("placeholder", "y" ); input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;margin:0px 5px;";
		input.style.cssText += "text-align:center;font-size:large;font-weigth:bold;background:none;";

		vect.appendChild(prev); vect.appendChild(input); vect.appendChild(next); row.appendChild(vect); tab.appendChild( row );

	})( TabUI.MaterialEditorTextures.tab );

//	material-editor-textures-reset-vectors-ui.js

	(function( tab ){

	//	MaterialEditorTextures Reset vectors button.

		var row = document.createElement("h3"); row.style.cssText = "height:30px;margin-bottom:20px;"
		var button = document.createElement("div");
		button.id = "material-textures-vectors-reset"; button.textContent = "Reset Vectors";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";
		row.appendChild( button ); tab.appendChild( row );

	})( TabUI.MaterialEditorTextures.tab );

//	material-editor-textures-toggle-ui.js

	(function( tab ){

	//	MaterialEditorTextures Grid Toggle button.

		var row = document.createElement("h3"); row.style.cssText = "height:30px;margin-bottom:20px;"
		var button = document.createElement("div"); 
		button.id = "material-textures-viewer-grid"; button.textContent = "Toggle Viewer Grid";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";
		row.appendChild( button ); tab.appendChild( row );

	})( TabUI.MaterialEditorTextures.tab );

//	material-editor-textures-remove-ui.js

	(function( tab ){

	//	MaterialEditorTextures Map Remove button.

		var row = document.createElement("h3"); row.style.cssText = "height:30px;margin-bottom:20px;"
		var button = document.createElement("div"); 
		button.id = "material-textures-remove-button"; button.textContent = "Remove Texture Map";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";
		row.appendChild( button ); tab.appendChild( row );

	})( TabUI.MaterialEditorTextures.tab );

//	material-editor-textures-image-replace-ui.js

	(function( tab ){

	//	MaterialEditorTextures Replace Image button.

		var row = document.createElement("h3"); row.style.cssText = "height:30px;margin-bottom:20px;"
		var button = document.createElement("div"); 
		button.id = "material-textures-replace-image-button"; button.textContent = "Replace Texture Image";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		var input = document.createElement("input"); input.type = "file";
		input.id = "image-file-input"; input.style.cssText = "display:none;";
		button.appendChild( input ); row.appendChild( button ); tab.appendChild( row );

	})( TabUI.MaterialEditorTextures.tab );

//	material-editor-textures-needs-update-ui.js

	(function( tab ){

	//	MaterialEditorTextures NeedsUpdate texture button.

		var row = document.createElement("h3"); row.style.cssText = "height:30px;margin-bottom:20px;"
		var button = document.createElement("div");
		button.id = "material-textures-needs-update"; button.textContent = "Textures needs Update";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";
		row.appendChild( button ); tab.appendChild( row );

	})( TabUI.MaterialEditorTextures.tab );

//	material-editor-textures-exit-editor-ui.js

	(function( tab ){

	//	MaterialEditorTextures Exit Edit Mode button.

		var row = document.createElement("h3"); row.style.cssText = "height:40px;margin-bottom:20px;"
		var button = document.createElement("div"); 
		button.id = "material-textures-exit-mode"; button.textContent = "Exit Edit Mode";
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		row.appendChild( button ); tab.appendChild( row );

	})( TabUI.MaterialEditorTextures.tab );

//	===================================================================================================================  //


/*
	(function( tab ){

	//	MaterialEditorTextures droplist.
	//	When option is selected, switches to EditMode.

		var row = document.createElement("h3");
		row.textContent = "Entities:";
		row.style.cssText = "height:30px;"

		var select = document.createElement("select");
		select.id = "material-textures-droplist";
		select.style.cssText = "width:170px;color:#000;float:right;"
		+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
		+ "font-size:20px;margin-left:10px;margin-right:15px;";

		(function(){
			var option = document.createElement("option");
			option.value = "";
			select.appendChild( option );
		})();

		row.appendChild( select );
		tab.appendChild( row );

		return select;

	})( TabUI.MaterialEditorTextures.tab );
*/
