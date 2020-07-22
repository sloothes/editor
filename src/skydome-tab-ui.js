//	skydome-tab-ui.js

	TabUI.add( "Skydome", "skydome-tab" );
	TabUI.append( "Skydome" );

	const skydome_droplist = (function( tab ){

	//	Skydome droplist.
	//	var tab = TabUI.Skydome.tab;

		var row = document.createElement("h3");
		row.textContent = "Skydome:";
		row.style.cssText = "height:30px;"

		var select = document.createElement("select");
		select.id = "skydome-texture-droplist";
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

	})( TabUI.Skydome.tab );

//	skydome-viewer-ui.js

	(function( tab ){

	//	Skydome viewer.
	//	var tab = TabUI.Texture.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:260px;border:none;text-align:center;";

		var canvas = document.createElement("canvas");
		canvas.width = 256; canvas.height = 256;
		canvas.id = "skydome-viewer";
		canvas.style.cssText = "width:256px;height:256px;margin:auto;";

		row.appendChild( canvas );
		tab.appendChild( row );

	})( TabUI.Skydome.tab );

//	value-input-ui.js

	(function( tab ){

	//	Value input.
	//	var tab = Skydome.Texture.tab;

		var row = document.createElement("h3");
		row.style.cssText = "margin:10px 15px;height:30px;";

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
