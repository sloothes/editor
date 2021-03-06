//	skydome-tab-ui.js

	TabUI.add( "Skydome", "skydome-tab" ); TabUI.append( "Skydome" );

	const skydome_droplist = (function( tab ){

	//	Skydome droplist.
	//	var tab = TabUI.Skydome.tab;

		var row = document.createElement("h3");
		row.textContent = "Skydome:";
		row.style.cssText = "height:30px;"

		var select = document.createElement("select");
		select.id = "skydome-texture-droplist";
		select.style.cssText = "width:150px;color:#000;float:right;"
		+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
		+ "font-size:20px;margin-left:10px;margin-right:15px;";

	//	(function(){
	//		var option = document.createElement("option");
	//		option.value = "";
	//		select.appendChild( option );
	//	})();

		row.appendChild( select );
		tab.appendChild( row );

		return select;

	})( TabUI.Skydome.tab );

	const background_droplist = (function( tab ){

	//	Background droplist.
	//	var tab = TabUI.Skydome.tab;

		var row = document.createElement("h3");
		row.textContent = "background:";
		row.style.cssText = "height:30px;"

		var select = document.createElement("select");
		select.id = "background-texture-droplist";
		select.style.cssText = "width:150px;color:#000;float:right;"
		+ "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;"
		+ "font-size:20px;margin-left:10px;margin-right:15px;";

	//	(function(){
	//		var option = document.createElement("option");
	//		option.value = "";
	//		select.appendChild( option );
	//	})();

		row.appendChild( select );
		tab.appendChild( row );

		return select;

	})( TabUI.Skydome.tab );

//	skydome-viewer-ui.js

	(function( tab ){

	//	Skydome viewer.
	//	var tab = TabUI.Skydome.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:260px;border:none;text-align:center;"; // margin-right:15px;

		var canvas = document.createElement("canvas");
		canvas.width = 256; canvas.height = 256;
		canvas.id = "skydome-viewer";
		canvas.style.cssText = "width:256px;height:256px;margin:auto;background-repeat:repeat;";
		canvas.style.cssText += "background-image:url('https://i.imgur.com/rnZZU0i.png') !important;";

		row.appendChild( canvas );
		tab.appendChild( row );

	})( TabUI.Skydome.tab );

//	texture-name-input-ui.js

	(function( tab ){

	//	Skydome texture name input.
	//	var tab = TabUI.Skydome.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:30px;margin:10px 15px;";

		var prev = document.createElement("li");
		prev.id = "skydome-texture-previous";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "skydome-texture-next";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "skydome-texture-name";
		input.setAttribute("placeholder", "name" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:180px;"
		+ "margin:0px 10px 0px 10px;text-align:center;font-size:large;font-weigth:bold;background:none;";

		row.appendChild(prev);
		row.appendChild(input);
		row.appendChild(next);
		tab.appendChild( row );

	})( TabUI.Skydome.tab );

//	water-toggle-ui.js

	(function( tab ){

	//	Skydome toggle button.
	//	var tab = TabUI.Skydome.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:30px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "water-toggle-button";
		button.textContent = "Toggle Water";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Skydome.tab );

//	skydome-toggle-ui.js

	(function( tab ){

	//	Skydome toggle button.
	//	var tab = TabUI.Skydome.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:30px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "skydome-toggle-button";
		button.textContent = "Toggle Skydome";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Skydome.tab );

//	ground-toggle-ui.js

	(function( tab ){

	//	Ground toggle button.
	//	var tab = TabUI.Skydome.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "ground-toggle-button";
		button.textContent = "Toggle Ground Helper";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Skydome.tab );

//	skydome-import-ui.js

	(function( tab ){

	//	Import skydome image button.
	//	var tab = TabUI.Skydome.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:30px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "skydome-import-button";
		button.textContent = "Replace Skydome Image";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		var input = document.createElement("input");
		input.type = "file";
		input.id = "skydome-file-input";
		input.style.cssText = "display:none;";
		button.appendChild( input );

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Skydome.tab );

//	skydome-upload-ui.js

	(function( tab ){

	//	Upload skydome image button.
	//	var tab = TabUI.Skydome.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:40px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "skydome-upload-button";
		button.textContent = "Upload Skydome Image";
		button.classList.add( "form-control", "btn", "btn-primary", "btn-white-outline", "gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;font-size:large;margin-right:15px;";

		var input = document.createElement("input");
		input.type = "file";
		input.id = "skydome-upload-input";
		input.style.cssText = "display:none;";
		button.appendChild( input );

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Skydome.tab );
