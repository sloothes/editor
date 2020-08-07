
//	create-new-material-tab-ui.js

	TabUI.add( "NewMaterial", "create-new-material-tab" ); 
	TabUI.append( "NewMaterial" ); TabUI.NewMaterial.pill.innerHTML = "New&nbsp;Material";

	(function( tab ){

	//	Materlals Collection droplist.
		var row = document.createElement("h3"); row.textContent = "Collection:"; row.style.cssText = "height:30px;";
		var select = document.createElement("select"); select.id = "create-material-collection-droplist";
		select.style.cssText = "width:150px;color:#000;float:right;border:1px solid;border-radius:4px;";
		select.style.cssText += "font-size:20px;margin-left:10px;margin-right:15px;padding:2px 4px 4px 4px;";

		var keys = "rock,floor,wood,metal,fabric,brick,terrain,plaster,roofing,matcap,concrete,sandstone,environment,others";
		keys.split(",").forEach(function( name ){
			var option = document.createElement("option"); option.text = name; option.value = name; select.appendChild( option );
		}); watch( select, "onchange", function(prop, event, value){ console.log({item:select,event:event,value:value}); });
		select.addEventListener( "change", function(){ this.blur(); callWatchers( this, "onchange", "change", this.value ); });

		row.appendChild( select ); tab.appendChild( row );

	})( TabUI.NewMaterial.tab );

//	create-new-material-type-droplist-ui.js

	(function( tab ){

	//	Create Material Type droplist.
		var row = document.createElement("h3"); row.textContent = "type:"; row.style.cssText = "height:30px;margin-top:20px;display:none;";

		var select = document.createElement("select"); select.id = "material-type-droplist";
		select.style.cssText  = "width:210px;color:#000;float:right;border:1px solid;border-radius:4px;";
		select.style.cssText += "font-size:20px;margin-left:10px;margin-right:15px;padding:2px 4px 4px 4px;";

		var types = "MeshBasicMaterial,MeshStandardMaterial,MeshLambertMaterial,MeshPhongMaterial,";
		types += "MeshDepthMaterial,MeshNormalMaterial,MeshToonMaterial,MeshPhysicalMaterial,PointsMaterial,";
		types += "LineBasicMaterial,LineDashedMaterial,RawShaderMaterial,ShaderMaterial,ShadowMaterial,SpriteMaterial";
		types.split(",").forEach(function( name ){
			var option = document.createElement("option"); option.text = name; option.value = name; select.appendChild( option );
		}); select.value = "MeshStandardMaterial"; 
		watch( select, "onchange", function(prop, event, value){ console.log({item:select,event:event,value:value}); });
		select.addEventListener( "change", function(){ this.blur(); callWatchers( this, "onchange", "change", this.value ); });

		row.appendChild( select ); tab.appendChild( row );

	})( TabUI.NewMaterial.tab );

//	create-new-material-viewer-ui.js

	(function( tab ){

	//	Create New Material viewer.
		var row = document.createElement("h3"); row.style.cssText = "height:260px;border:none;text-align:center;margin-right:15px;";
		var canvas = document.createElement("canvas"); canvas.width = 256; canvas.height = 256; canvas.id = "create-new-material-viewer"; 
		canvas.style.cssText = "width:256px;height:256px;margin:auto;background-repeat:repeat;background-image:url('https://i.imgur.com/rnZZU0i.png') !important;";
		row.appendChild( canvas ); tab.appendChild( row );

	})( TabUI.NewMaterial.tab );

//	create-new-material-button-ui.js

	(function( tab ){

	//	Create New Material button.
		var row = document.createElement("h3"); row.style.cssText = "height:40px;margin-bottom:20px;";
		var btn = document.createElement("div"); btn.id = "create-new-material-button"; btn.textContent = "New Material";
		btn.classList.add( "form-control","btn", "btn-primary","btn-white-outline","gradient-btn" );
		btn.style.cssText = "width:-webkit-fill-available;height:40px;font-size:large;margin-right:15px;float:right;";
		row.appendChild( btn ); tab.appendChild( row );

	})( TabUI.NewMaterial.tab );

//	create-new-material-name-input-ui.js

	(function( tab ){

	//	Create New Material Name input. // var tab = TabUI.NewMaterial.tab;
		var row = document.createElement("h3"); row.style.cssText = "margin-right:15px;height:30px;";
		var input = document.createElement("input"); input.id = "create-new-material-name-input";
		input.setAttribute("placeholder", "name" ); input.classList.add("form-control","text-center");
		input.style.cssText = "width:-webkit-fill-available;color:#000;display:inline;margin:0px 5px;";
		input.style.cssText += "text-align:center;font-size:large;font-weigth:bold;background:none;";
		row.appendChild(input); tab.appendChild( row );

	})( TabUI.NewMaterial.tab );

//	create-new-material-image-button-ui.js

	(function( tab ){

	//	Create New Material Image button.
		var row = document.createElement("h3"); row.style.cssText = "height:40px;margin-bottom:20px;margin-right:15px;";

		var icon = document.createElement("canvas"); icon.id = "create-new-material-icon";
		icon.width = icon.height = 36; icon.style.cssText = "border:thin solid #888888;border-radius:4px;float:left;";

		var btn = document.createElement("div"); btn.id = "create-new-material-img-button"; 
		btn.classList.add( "form-control","btn", "btn-primary","btn-white-outline","gradient-btn" );
		btn.textContent = "Import Image"; btn.style.cssText = "width:220px;float:right;height:40px;font-size:large;";

		var input = document.createElement("input"); input.type = "file"; 
		input.id = "create-new-material-file-input"; input.style.cssText = "display:none;"; 
		btn.appendChild( input ); row.appendChild( icon ); row.appendChild( btn ); tab.appendChild( row );

	})( TabUI.NewMaterial.tab );

	//	var img = new Image(40,40); img.style.cssText = "border-radius:4px;float:left;";
	//	watch( img, "onload", function(prop, event, value){ console.log({item:img,event:event,src:value}); });
	//	img.addEventListener("load",function(event){ callWatchers( this, "onload", "load", this.src ); });
	//	img.addEventListener("error",function(){ this.src = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII="; });

//	create-new-material-map-droplist-ui.js

	(function( tab ){

	//	Create New Material Texture droplist.
		var row = document.createElement("h3"); row.textContent = "select:"; row.style.cssText = "height:30px;";
		var select = document.createElement("select"); select.id = "create-new-material-map-droplist";
		select.style.cssText  = "width:170px;color:#000;float:right;border:1px solid;border-radius:4px;";
		select.style.cssText += "font-size:20px;margin-left:0px;margin-right:15px;padding:2px 4px 4px 4px;";

		var keys =  [
			{name:"Diffuse",value:"map"},
			{name:"Bump",value:"bumpMap"},
			{name:"Alpha",value:"alphaMap"},
			{name:"Light",value:"lightMap"},
			{name:"Normal",value:"normalMap"},
			{name:"Emissive",value:"emissiveMap"},
			{name:"Metalness",value:"metalnessMap"},
			{name:"Roughness",value:"roughnessMap"},
			{name:"Environment",value:"envMap"},
			{name:"Displacement",value:"displacementMap"},
			{name:"Ambient/Occlusion",value:"aoMap"},
		//	{name:"Specular",value:"specularMap"}, // deprecated.
		];

		keys.forEach(function( key ){
			var option = document.createElement("option"); option.text = key.name; option.value = key.value; select.appendChild( option );
		}); select.value = "";
		watch( select, "onchange", function(prop, event, value){ console.log({item:select,event:event,value:value}); });
		select.addEventListener( "change", function(){ this.blur(); callWatchers( this, "onchange", "change", this.value ); });

		row.appendChild( select ); tab.appendChild( row );

	})( TabUI.NewMaterial.tab );

//	create-new-material-bump-scale-ui.js

	(function( tab ){

	//	Create New Material Bump Scale input.
		var row = document.createElement("h3");row.textContent = "bump:"; row.style.cssText = "height:30px;margin:20px 15px 20px 0;";
		var vect = document.createElement("div"); vect.style.cssText = "width:170px;height:40px;float:right;";
		var prev = document.createElement("li"); prev.innerHTML = "&#9668;"; prev.style.display = "inline";
		var next = document.createElement("li"); next.innerHTML = "&#9658;"; next.style.display = "inline";
		prev.id = "create-new-material-bump-decrease"; prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");
		next.id = "create-new-material-bump-increase"; next.classList.add("btn","btn-primary","get-next-btn","pull-right"); 

		var input = document.createElement("input"); input.id = "create-new-material-bump-input";
		input.setAttribute("placeholder", "scale" ); input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";
		vect.appendChild(prev); vect.appendChild(input); vect.appendChild(next); row.appendChild(vect); tab.appendChild( row );

	})( TabUI.NewMaterial.tab );

//	create-new-material-normal-scale-ui.js

	(function( tab ){

	//	Create New Material Normal Scale input.
		var row = document.createElement("h3");row.textContent = "normal:"; row.style.cssText = "height:30px;margin:20px 15px 20px 0;";
		var vect = document.createElement("div"); vect.style.cssText = "width:170px;height:40px;float:right;";
		var prev = document.createElement("li"); prev.innerHTML = "&#9668;"; prev.style.display = "inline";
		var next = document.createElement("li"); next.innerHTML = "&#9658;"; next.style.display = "inline";
		prev.id = "create-new-material-normal-decrease"; prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");
		next.id = "create-new-material-normal-increase"; next.classList.add("btn","btn-primary","get-next-btn","pull-right"); 

		var input = document.createElement("input"); input.id = "create-new-material-normal-input";
		input.setAttribute("placeholder", "scale" ); input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";
		vect.appendChild(prev); vect.appendChild(input); vect.appendChild(next); row.appendChild(vect); tab.appendChild( row );

	})( TabUI.NewMaterial.tab );

//	create-new-material-remove-button-ui.js

	(function( tab ){

	//	Create New Material Remove button.
		var row = document.createElement("h3"); row.style.cssText = "height:30px;margin-bottom:20px;";
		var btn = document.createElement("div"); btn.id = "create-new-material-remove-button"; btn.textContent = "Remove Texture";
		btn.classList.add( "form-control","btn", "btn-primary","btn-white-outline","gradient-btn" );
		btn.style.cssText = "width:-webkit-fill-available;height:40px;font-size:large;margin-right:15px;float:right;";
		row.appendChild( btn ); tab.appendChild( row );

	})( TabUI.NewMaterial.tab );

//	create-new-material-save-button-ui.js

	(function( tab ){

	//	Create New Material Save button.
		var row = document.createElement("h3"); row.style.cssText = "height:30px;margin-bottom:20px;";
		var btn = document.createElement("div"); btn.id = "create-new-material-save-button"; btn.textContent = "Save Material";
		btn.classList.add( "form-control","btn", "btn-primary","btn-white-outline","gradient-btn" );
		btn.style.cssText = "width:-webkit-fill-available;height:40px;font-size:large;margin-right:15px;float:right;";
		row.appendChild( btn ); tab.appendChild( row );

	})( TabUI.NewMaterial.tab );

