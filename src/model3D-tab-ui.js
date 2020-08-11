//	model3D-tab-ui.js

	TabUI.add( "ModelLoader", "model-3d-tab" ); TabUI.append( "ModelLoader" ); TabUI.ModelLoader.pill.innerHTML = "Model&nbsp;Loader";

//	model3D-collection-droplist-ui.js

	(function( tab ){

	//	model3D Collections droplist.

		var row = document.createElement("h3"); 
		row.textContent = "Collection:"; row.style.cssText = "height:30px;"

		var select = document.createElement("select"); select.id = "model-3d-collection-droplist";
		select.style.cssText = "width:150px;color:#000;float:right;border:1px solid;border-radius:4px;";
		select.style.cssText += "padding:2px 4px 4px 4px;font-size:20px;margin-left:10px;margin-right:15px;";

		var keys  = "bathroom,bedroom,doors,windows,walls,floor,exterior,kitchen,lights,characters,livingroom,miscellaneous,office,staircases,vehicles,animals,trees";

		keys.split(",").forEach(function( name ){
			var option = document.createElement("option");
			option.text = name; option.value = name; select.appendChild( option );
		});

		row.appendChild( select ); tab.appendChild( row );

	})( TabUI.ModelLoader.tab );

//	model3D-viewer-ui.js

	(function( tab ){

	//	model3D viewer.

		const dummy_src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
		var row = document.createElement("h3"); row.style.cssText = "height:260px;border:none;text-align:center;"; // margin-right:15px;

		var canvas = document.createElement("canvas"); canvas.width = 256; canvas.height = 256; canvas.id = "model-3d-viewer";
		canvas.style.cssText = "width:256px;height:256px;margin:auto;";
	//	canvas.style.cssText += "background-repeat:repeat;background-image:url('https://i.imgur.com/rnZZU0i.png') !important;";

		var img = new Image(256,256); img.id = "model-3d-image-viewer"; img.src = dummy_src; img.style.cssText = "margin:0 30px;display:none;"; 
		watch( img, "onload",  function(prop, event, value){ canvas.getContext( "2d" ).drawImage( img, 0, 0, canvas.width, canvas.height ); });
		watch( img, "onerror", function(prop, event, value){ canvas.getContext( "2d" ).clearRect( 0, 0, canvas.width, canvas.height ); });
		img.addEventListener("load",function(event){ callWatchers( this, "onload", "load", this.src ); })
		img.addEventListener("error",function(err){ callWatchers( this, "onerror", "error", dummy_src ); })
	//	img.style.cssText += "background-repeat:repeat;background-image:url('https://i.imgur.com/rnZZU0i.png') !important;";

		row.appendChild( img ); row.appendChild( canvas ); tab.appendChild( row );

	})( TabUI.ModelLoader.tab );

//	model3D-name-input-ui.js

	(function( tab ){

	//	model3D name input.

		var row = document.createElement("h3"); row.style.cssText = "height:30px;text-align:center;margin:10px 15px;";

		var prev = document.createElement("li"); prev.id = "model-3d-doc-previous";
		prev.innerHTML = "&#9668;"; prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li"); next.id = "model-3d-doc-next";
		next.innerHTML = "&#9658;"; next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input"); input.id = "model-3d-name-input";
		input.setAttribute("placeholder", "name" ); input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:170px;"; // margin:0px 10px 0px 10px;
		input.style.cssText += "text-align:center;font-size:large;font-weigth:bold;background:none;";

		row.appendChild(prev); row.appendChild(input); row.appendChild(next); tab.appendChild( row );

	})( TabUI.ModelLoader.tab );

//	model3D-load-button-ui.js

	(function( tab ){

	//	model3D Load button.

		var row = document.createElement("h3"); row.style.cssText = "height:40px;margin-bottom:20px;"
		var button = document.createElement("div"); button.id = "model-3d-load-button"; 
		button.textContent = "Load Model"; button.classList.add( "form-control","btn", "btn-primary","btn-white-outline","gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-left:15px;margin-right:15px;";

		row.appendChild( button ); tab.appendChild( row );

	})( TabUI.ModelLoader.tab );
























/*

//	model3D-obj-uploader-header-ui.js

	(function( tab ){ 
		var row = document.createElement("h3"); row.textContent = "OBJ Uploader"; 
		row.style.cssText = "text-align:center;display:none;"; tab.appendChild( row ); 
	})( TabUI.Model3D.tab );

//	model3D-new-upload-button-ui.js

	(function( tab ){

	//	model3D New Upload button.
		var row = document.createElement("h3"); row.style.cssText = "height:40px;margin-bottom:20px;"
		var button = document.createElement("div"); button.id = "model-3d-new-upload-button"; 
		button.textContent = "New Upload"; button.classList.add( "form-control","btn", "btn-primary","btn-white-outline","gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-left:15px;margin-right:15px;";
		row.appendChild( button ); tab.appendChild( row );

	})( TabUI.Model3D.tab );

//	model3D-obj-upload-droplist-ui.js

	(function( tab ){

	//	model3D OBJ Upload droplist.

		var row = document.createElement("h3"); 
		row.textContent = "select:"; row.style.cssText = "height:30px;margin-left:15px;"

		var select = document.createElement("select"); select.id = "model-3d-obj-upload-droplist";
		select.style.cssText = "width:150px;color:#000;float:right;border:1px solid;border-radius:4px;";
		select.style.cssText += "padding:2px 4px 4px 4px;font-size:20px;margin-left:10px;margin-right:15px;";

		var keys  = [
			{ name:"", value:"" },
			{ name:"image", value:"img" },
			{ name:".mtl file", value:"mtl" },
			{ name:".obj file", value:"obj" },
			{ name:"textures", value:"textures" }
		];

		keys.forEach(function( item ){
			var option = document.createElement("option");
			option.text = item.name; option.value = item.value; 
			select.appendChild( option );
		});

		row.appendChild( select ); tab.appendChild( row );

	})( TabUI.Model3D.tab );

//	model3D-preview-file-ui.js

	(function( tab ){

	//	model3D preview button.

		var row = document.createElement("h3"); row.style.cssText = "height:30px;margin-bottom:20px;"

		var button = document.createElement("div"); 
		button.id = "model-3d-preview-button"; button.textContent = "Select Image file";
		button.classList.add( "form-control","btn", "btn-primary","btn-white-outline","gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;";
		button.style.cssText += "font-size:large;margin-left:15px;margin-right:15px;";

		var input = document.createElement("input"); input.type = "file"; 
		input.id = "model-3d-preview-file-input"; input.style.cssText = "display:none;"; 
		button.appendChild( input ); row.appendChild( button ); tab.appendChild( row );

	})( TabUI.Model3D.tab );

//	model3D-texture-files-ui.js

	(function( tab ){

	//	model3D textures button.

		var row = document.createElement("h3"); row.style.cssText = "height:30px;margin-bottom:20px;"

		var button = document.createElement("div"); 
		button.id = "model-3d-textures-button"; button.textContent = "Select Textures";
		button.classList.add( "form-control","btn", "btn-primary","btn-white-outline","gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;";
		button.style.cssText += "font-size:large;margin-left:15px;margin-right:15px;";

		var input = document.createElement("input"); input.type = "file"; 
		input.id = "model-3d-textures-file-input"; input.style.cssText = "display:none;"; 
		input.setAttribute( "multiple", "" ); // true.

		button.appendChild( input ); row.appendChild( button ); tab.appendChild( row );

	})( TabUI.Model3D.tab );

//	model3D-mtl-file-ui.js

	(function( tab ){

	//	model3D mtl button.

		var row = document.createElement("h3"); row.style.cssText = "height:30px;margin-bottom:20px;"

		var button = document.createElement("div"); 
		button.id = "model-3d-mtl-button"; button.textContent = "Select MTL file";
		button.classList.add( "form-control","btn", "btn-primary","btn-white-outline","gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;";
		button.style.cssText += "font-size:large;margin-left:15px;margin-right:15px;";

		var input = document.createElement("input"); input.type = "file"; 
		input.id = "model-3d-mtl-file-input"; input.style.cssText = "display:none;"; 
		button.appendChild( input ); row.appendChild( button ); tab.appendChild( row );

	})( TabUI.Model3D.tab );

//	model3D-obj-file-ui.js

	(function( tab ){

	//	model3D obj button.

		var row = document.createElement("h3"); row.style.cssText = "height:30px;margin-bottom:20px;"

		var button = document.createElement("div"); 
		button.id = "model-3d-obj-button"; button.textContent = "Select OBJ file";
		button.classList.add( "form-control","btn", "btn-primary","btn-white-outline","gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;";
		button.style.cssText += "font-size:large;margin-left:15px;margin-right:15px;";

		var input = document.createElement("input"); input.type = "file"; 
		input.id = "model-3d-obj-file-input"; input.style.cssText = "display:none;"; 
		button.appendChild( input ); row.appendChild( button ); tab.appendChild( row );

	})( TabUI.Model3D.tab );

//	model3D-upload-button-ui.js

	(function( tab ){

	//	model3D Upload button.

		var row = document.createElement("h3"); row.style.cssText = "height:30px;margin-bottom:20px;"

		var button = document.createElement("div"); 
		button.id = "model-3d-upload-button"; button.textContent = "Upload Model";
		button.classList.add( "form-control","btn", "btn-primary","btn-white-outline","gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;";
		button.style.cssText += "font-size:large;margin-left:15px;margin-right:15px;";

		row.appendChild( button ); tab.appendChild( row );

	})( TabUI.Model3D.tab );
*/