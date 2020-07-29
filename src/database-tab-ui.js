//	database-tab-ui.js

	TabUI.add( "Database", "database-tab" );
	TabUI.append( "Database" );

	const database_droplist = (function( tab ){

	//	Database droplist.
	//	var tab = TabUI.Database.tab;

		var row = document.createElement("h3");
		row.textContent = "Database:";
		row.style.cssText = "height:30px;"

		var select = document.createElement("select");
		select.id = "database-droplist";
		select.style.cssText = "width:150px;color:#000;float:right;"
		+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
		+ "font-size:20px;margin-left:10px;margin-right:15px;";

		var keys = "meta";

		keys.split(",").forEach(function( name ){
			var option = document.createElement("option");
			option.text = name;
			option.value = name;
			select.appendChild( option );
		});

		row.appendChild( select );
		tab.appendChild( row );

		return select;

	})( TabUI.Database.tab );

//	collection-droplist-ui.js

	const collection_droplist = (function( tab ){

	//	Collection droplist.
	//	var tab = TabUI.Database.tab;

		var row = document.createElement("h3");
		row.textContent = "Collection:";
		row.style.cssText = "height:30px;"

		var select = document.createElement("select");
		select.id = "collection-droplist";
		select.style.cssText = "width:150px;color:#000;float:right;"
		+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
		+ "font-size:20px;margin-left:10px;margin-right:15px;";

		var keys = "objects,geometries,materials,textures,images,shapes";

		keys.split(",").forEach(function( name ){
			var option = document.createElement("option");
			option.text = name;
			option.value = name;
			select.appendChild( option );
		});

		row.appendChild( select );
		tab.appendChild( row );

		return select;

	})( TabUI.Database.tab );

//	database-image-viewer-ui.js

	(function( tab ){

	//	Database image viewer.
	//	var tab = TabUI.Database.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:260px;border:none;text-align:center;margin-right:15px;";

		var img = new Image(256,256)
		img.id = "image-url-viewer";
		img.src = img.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";
		img.style.cssText = "width:256px;height:256px;margin:auto;background-repeat:repeat;";
		img.style.cssText += "background-image:url('https://i.imgur.com/rnZZU0i.png') !important;";

		row.appendChild( img );
		tab.appendChild( row );

	})( TabUI.Database.tab );

//	upload-image-data-ui.js

	(function( tab ){

	//	Image upload button.
	//	var tab = TabUI.Database.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:30px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "upload-image-data";
		button.textContent = "Upload Image Data";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Database.tab );

//	cache-texture-button.js

	(function( tab ){

	//	Textures cache button.
	//	var tab = TabUI.Database.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:30px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "cache-textures-button";
		button.textContent = "Cache Texture Images";
		button.classList.add( "form-control","btn", "btn-primary","btn-white-outline","gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;";
		button.style.cssText += "font-size:large;margin-left:15px;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Database.tab );

//	undo-redo-ui.js

	(function( tab ){

	//	Undo/Redo button.
	//	var tab = TabUI.Database.tab;

		var row = document.createElement("h3");
		row.style.cssText = "display:none;height:40px;margin-bottom:20px;"

		var redo = document.createElement("div");
		redo.id = "database-redo-button";
		redo.textContent = "Redo";
		redo.style.cssText = "width:44%;float:left;height:40px;font-size:large;margin-right:15px;";
		redo.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		var undo = document.createElement("div");
		undo.id = "database-undo-button";
		undo.textContent = "Undo";
		undo.style.cssText = "width:44%;float:right;height:40px;font-size:large;margin-right:15px;";
		undo.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );

		row.appendChild( redo );
		row.appendChild( undo );
		tab.appendChild( row );

	})( TabUI.Database.tab );

//	skip-input-ui.js

	(function( tab ){

	//	Document skip input.
	//	var tab = TabUI.Database.tab;

		var row = document.createElement("h3");
		row.textContent = "skip:";
		row.style.cssText = "height:40px;margin:30px 15px 20px 0;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:200px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "doc-skip-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "doc-skip-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "doc-skip-input";
		input.setAttribute("placeholder", "number" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:110px;"
		+ "margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Database.tab );

//	key-droplist-ui.js

	(function( tab ){

	//	Document Keys droplist.
	//	var tab = TabUI.Database.tab;

		var row = document.createElement("h3");
		row.textContent = "key:";
		row.style.cssText = "height:40px;margin:10px 0px;";

		var select = document.createElement("select");
		select.id = "doc-keys-droplist";
		select.style.cssText = "width:200px;color:#000;float:right;"
		+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
		+ "font-size:20px;margin-left:10px;margin-right:15px;";

		var keys = ",";

		keys.split(",").forEach(function( name ){
			var option = document.createElement("option");
			option.text = name;
			option.value = name;
			select.appendChild( option );
		});

		row.appendChild( select );
		tab.appendChild( row );

	})( TabUI.Database.tab );

//	value-input-ui.js

	(function( tab ){

	//	Document Value input.
	//	var tab = TabUI.Database.tab;

		var row = document.createElement("h3");
		row.textContent = "value:";
		row.style.cssText = "height:40px;margin:10px 15px 10px 0;";

		var vect = document.createElement("div");
		vect.style.cssText = "width:200px;height:40px;float:right;";

		var prev = document.createElement("li");
		prev.id = "doc-key-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "doc-key-increase";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "doc-value-input";
		input.setAttribute("placeholder", "value" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:110px;"
		+ "margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";

		vect.appendChild(prev);
		vect.appendChild(input);
		vect.appendChild(next);
		row.appendChild(vect);
		tab.appendChild( row );

	})( TabUI.Database.tab );

//	update-value-ui.js

	(function( tab ){

	//	Value Update button.
	//	var tab = TabUI.Database.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:30px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "update-value-button";
		button.textContent = "Update Value";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Database.tab );

//	update-document-ui.js

	(function( tab ){

	//	Document Update button.
	//	var tab = TabUI.Database.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:30px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "update-doc-button";
		button.textContent = "Update document";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Database.tab );

//	remove-document-ui.js

	(function( tab ){

	//	Document Remove button.
	//	var tab = TabUI.Database.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:30px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "doc-remove-button";
		button.textContent = "Remove document";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Database.tab );

//	load-object-ui.js

	(function( tab ){

	//	Document Load button.
	//	var tab = TabUI.Database.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:30px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "doc-load-button";
		button.textContent = "Load document";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Database.tab );

