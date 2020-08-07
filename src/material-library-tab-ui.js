
//	material-library-tab-ui.js

	TabUI.add( "MaterialLibrary", "material-library-tab" ); 
	TabUI.append( "MaterialLibrary" ); TabUI.MaterialLibrary.pill.innerHTML = "Material&nbsp;Library";

	(function( tab ){

	//	Material Library Collection droplist.
		var row = document.createElement("h3"); row.textContent = "Collection:"; row.style.cssText = "height:30px;";
		var select = document.createElement("select"); select.id = "material-library-collection-droplist";
		select.style.cssText = "width:150px;color:#000;float:right;border:1px solid;border-radius:4px;";
		select.style.cssText += "font-size:20px;margin-left:10px;margin-right:15px;padding:2px 4px 4px 4px;";

		var keys = "rock,floor,wood,metal,fabric,brick,terrain,plaster,roofing,matcap,concrete,sandstone,environment,others";
		keys.split(",").forEach(function( name ){
			var option = document.createElement("option"); option.text = name; option.value = name; select.appendChild( option );
		}); 

		watch( select, "onchange", function(prop, event, value){ console.log({item:select,event:event,value:value}); });
		select.addEventListener( "change", function(){ this.blur(); callWatchers( this, "onchange", "change", this.value ); });

		row.appendChild( select ); tab.appendChild( row );

	})( TabUI.MaterialLibrary.tab );

	(function( tab ){

	//	Material Library viewer.
		var dummy_src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

		var row = document.createElement("h3"); row.style.cssText = "height:260px;border:none;text-align:center;"; // margin-right:15px;

		var canvas = document.createElement("canvas"); canvas.width = 256; canvas.height = 256; canvas.id = "material-library-viewer";
		canvas.style.cssText = "width:256px;height:256px;margin:auto;background-repeat:repeat;";
		canvas.style.cssText += "background-image:url('https://i.imgur.com/rnZZU0i.png') !important;";

		var img = new Image(256,256); img.id = "material-library-image-viewer"; img.src = dummy_src; img.style.cssText = "margin:0 30px;display:none;";
	//	img.style.cssText += "background-repeat:repeat;background-image:url('https://i.imgur.com/rnZZU0i.png') !important;";
		watch( img, "onload",  function(prop, event, value){ canvas.getContext( "2d" ).drawImage( img, 0, 0, canvas.width, canvas.height ); });
		watch( img, "onerror", function(prop, event, value){ img.src = value; }); // debugMode && console.log({item:img,event:event,src:value}); 
		img.addEventListener("load",  function(event){ callWatchers( this, "onload", "load", this.src ); });
		img.addEventListener("error", function(error){ callWatchers( this, "onerror", "error", dummy_src ); });

		row.appendChild( img ); row.appendChild( canvas ); tab.appendChild( row ); 

	})( TabUI.MaterialLibrary.tab );

	(function( tab ){

	//	Material Library name input.

		var row = document.createElement("h3"); row.style.cssText = "height:30px;margin:10px 15px;";

		var prev = document.createElement("li"); prev.id = "material-library-previous";
		prev.innerHTML = "&#9668;"; prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li"); next.id = "material-library-next";
		next.innerHTML = "&#9658;"; next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input"); input.id = "material-library-name-input";
		input.setAttribute("placeholder", "material name" );input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:180px;margin:0px 10px 0px 10px;";
		input.style.cssText += "text-align:center;font-size:large;font-weigth:bold;background:none;";

		watch( input, "onchange", function(prop, event, value){ }); // debugMode && console.log({item:input,event:event,value:value});
		input.addEventListener("change", function(event){ this.blur(); callWatchers( this, "onchange", "change", this.value ); });

		row.appendChild(prev); row.appendChild(input); row.appendChild(next); tab.appendChild( row );

	})( TabUI.MaterialLibrary.tab );

	(function( tab ){

	//	Material Library load button.
		var row = document.createElement("h3"); row.style.cssText = "height:30px;margin-bottom:20px;";

		var button = document.createElement("div"); 
		button.id = "material-library-load-button"; button.textContent = "Load Selected Material";
		button.classList.add( "form-control","btn", "btn-primary","btn-white-outline","gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;";
		button.style.cssText += "font-size:large;margin-left:15px;margin-right:15px;";

		row.appendChild( button ); tab.appendChild( row );

	})( TabUI.MaterialLibrary.tab );

	(function( tab ){

	//	Material Library Matcap button.
		var row = document.createElement("h3"); row.style.cssText = "height:30px;margin-bottom:20px;";

		var button = document.createElement("div"); 
		button.id = "material-library-matcap-button"; button.textContent = "Load Matcap";
		button.classList.add( "form-control","btn", "btn-primary","btn-white-outline","gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;";
		button.style.cssText += "font-size:large;margin-left:15px;margin-right:15px;";

		row.appendChild( button ); tab.appendChild( row );

	})( TabUI.MaterialLibrary.tab );


	(function( tab ){

	//	Material Library Upload Collection Images button.
		var row = document.createElement("h3"); row.style.cssText = "height:30px;margin-bottom:20px;display:none;";

		var button = document.createElement("div"); 
		button.id = "material-library-images-upload-button"; 
		button.textContent = "Start Collection Images Upload";
		button.classList.add( "form-control","btn", "btn-primary","btn-white-outline","gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;";
		button.style.cssText += "font-size:large;margin-left:15px;margin-right:15px;";

		row.appendChild( button ); tab.appendChild( row );

	})( TabUI.MaterialLibrary.tab );

	(function( tab ){

	//	Material Library Update Collection Images button.
		var row = document.createElement("h3"); row.style.cssText = "height:30px;margin-bottom:20px;display:none;";

		var button = document.createElement("div"); 
		button.id = "material-library-images-update-button"; 
		button.textContent = "Start Collection Images Update";
		button.classList.add( "form-control","btn", "btn-primary","btn-white-outline","gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;";
		button.style.cssText += "font-size:large;margin-left:15px;margin-right:15px;";

		row.appendChild( button ); tab.appendChild( row );

	})( TabUI.MaterialLibrary.tab );
