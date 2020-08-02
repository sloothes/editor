//	Imgur Images Tab.

	TabUI.add( "Images", "images-tab" );
	TabUI.append( "Images" );

	(function( tab ){

	//	Texture Collections droplist.
	//	var tab = TabUI.Images.tab;

		var row = document.createElement("h3");
		row.textContent = "Collections:";
		row.style.cssText = "height:30px;"

		var select = document.createElement("select");
		select.id = "imgur-collection-droplist";
		select.style.cssText = "width:120px;color:#000;float:right;";
		select.style.cssText += "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;";
		select.style.cssText += "font-size:20px;margin-left:10px;margin-right:15px;";

		var keys  = "wood,rock,glass,metal,floor,plant,trees,paster,";
			keys += "matcap,bricks,fabric,roofing,terrain,concrete,sandstone";

		keys.split(",").forEach(function( name ){
			var option = document.createElement("option");
			option.text = name;
			option.value = name;
			select.appendChild( option );
		});

		row.appendChild( select );
		tab.appendChild( row );

		return select;

	})( TabUI.Images.tab );

	(function( tab ){

	//	Environment Collections droplist.
	//	var tab = TabUI.Images.tab;

		var row = document.createElement("h3");
		row.textContent = "Environment:";
		row.style.cssText = "height:30px;"

		var select = document.createElement("select");
		select.id = "imgur-environment-droplist";
		select.style.cssText = "width:120px;color:#000;float:right;";
		select.style.cssText += "border:1px solid;border-radius:4px;padding:2px 4px 4px 4px;";
		select.style.cssText += "font-size:20px;margin-left:10px;margin-right:15px;";

		var keys  = "urban,night,cloudy,midday,skybox,indoor,nature,";
			keys += "studio,sunset,outdoor,skydome,sunrise,overcast";

		keys.split(",").forEach(function( name ){
			var option = document.createElement("option");
			option.text = name;
			option.value = name;
			select.appendChild( option );
		});

		row.appendChild( select );
		tab.appendChild( row );

		return select;

	})( TabUI.Images.tab );

//	imgur-viewer-ui.js

	(function( tab ){

	//	Image viewer.
	//	var tab = TabUI.Images.tab;

		const dummy_src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=";

		var row = document.createElement("h3");
		row.style.cssText = "height:260px;border:none;text-align:center;"; // margin-right:15px;

		var img = new Image(256,256)
		img.src = dummy_src;
		img.id = "imgur-image-viewer";
		img.style.cssText = "width:256px;height:256px;margin:auto;background-repeat:repeat;";
		img.style.cssText += "background-image:url('https://i.imgur.com/rnZZU0i.png') !important;";

		watch( img, "onload", function(prop, event, value){
		//	debugMode && console.log({item:img,event:event,src:value});
		});

		watch( img, "onerror", function(prop, event, value){ img.src = value; });
	//	debugMode && console.log({item:img,event:event,src:value}); 
		

		img.addEventListener("load",function(event){
			callWatchers( this, "onload", "load", this.src );
		})

		img.addEventListener("error",function(err){
			callWatchers( this, "onerror", "error", dummy_src );
		})

		row.appendChild( img );
		tab.appendChild( row );

	})( TabUI.Images.tab );

//	imgur-name-input-ui.js

	(function( tab ){

	//	Images texture name input.
	//	var tab = TabUI.Images.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:30px;margin:10px 15px;";

		var prev = document.createElement("li");
		prev.id = "imgur-doc-previous";
		prev.innerHTML = "&#9668;";
		prev.style.display = "inline";
		prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");

		var next = document.createElement("li");
		next.id = "imgur-doc-next";
		next.innerHTML = "&#9658;";
		next.style.display = "inline";
		next.classList.add("btn","btn-primary","get-next-btn","pull-right");

		var input = document.createElement("input");
		input.id = "imgur-name-input";
		input.setAttribute("placeholder", "filename or _id" );
		input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:180px;margin:0px 10px 0px 10px;";
		input.style.cssText += "text-align:center;font-size:large;font-weigth:bold;background:none;";

		row.appendChild(prev);
		row.appendChild(input);
		row.appendChild(next);
		tab.appendChild( row );

	})( TabUI.Images.tab );

//	upload-image-file-ui.js

	(function( tab ){

	//	Images upload button.
	//	var tab = TabUI.Images.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:30px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "imgur-upload-button";
		button.textContent = "Upload Texture Images";
		button.classList.add( "form-control","btn", "btn-primary","btn-white-outline","gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;";
		button.style.cssText += "font-size:large;margin-left:15px;margin-right:15px;";

		var input = document.createElement("input");
		input.type = "file";
		input.id = "imgur-file-input";
		input.setAttribute( "multiple", "" ); // true.
		input.style.cssText = "display:none;";
		button.appendChild( input );

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Images.tab );

//	images-cache-button.js

	(function( tab ){

	//	Images cache button.
	//	var tab = TabUI.Images.tab;

		var row = document.createElement("h3");
		row.style.cssText = "height:30px;margin-bottom:20px;"

		var button = document.createElement("div");
		button.id = "imgur-cache-button";
		button.textContent = "Cache Collection Images";
		button.classList.add( "form-control","btn", "btn-primary","btn-white-outline","gradient-btn" );
		button.style.cssText = "width:-webkit-fill-available;float:right;height:40px;";
		button.style.cssText += "font-size:large;margin-left:15px;margin-right:15px;";

		row.appendChild( button );
		tab.appendChild( row );

	})( TabUI.Images.tab );
