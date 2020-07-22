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
		select.style.cssText = "width:170px;color:#000;float:right;"
		+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
		+ "font-size:20px;margin-left:10px;margin-right:15px;";

		var keys = ",meta";

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
		row.textContent = "collection:";
		row.style.cssText = "height:30px;"

		var select = document.createElement("select");
		select.id = "collection-droplist";
		select.style.cssText = "width:170px;color:#000;float:right;"
		+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
		+ "font-size:20px;margin-left:10px;margin-right:15px;";

		var keys = ",geometries,materials,textures,images,shapes";

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

//	index-input-ui.js

	(function( tab ){

	//	Document index input.
	//	var tab = TabUI.Database.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin:30px 15px 20px 0;";

		var prev = document.createElement("li");
		prev.id = "doc-index-previous";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "doc-index-next";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "doc-index-input";
		input.setAttribute("placeholder", "index" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:195px;"
		+ "margin:0px 10px 0px 10px;text-align:center;font-weigth:normal;background:none;";

		row.appendChild(prev);
		row.appendChild(input);
		row.appendChild(next);
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
		prev.id = "doc-value-decrease";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "doc-value-increase";
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

//	update-document-ui.js

	(function( tab ){

	//	Document Update button.
	//	var tab = TabUI.Database.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:30px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "doc-update-button";
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
