//	create-matcap-tab-ui.js


//	create-matcap-tab-ui.js

	TabUI.add( "NewMatcap", "create-matcap-tab" ); 
	TabUI.append( "NewMatcap" ); TabUI.NewMatcap.pill.innerHTML = "New&nbsp;Matcap";

	(function( tab ){

	//	Create Matcap Collection droplist.
		var row = document.createElement("h3"); row.textContent = "Collection:"; row.style.cssText = "height:30px;";
		var select = document.createElement("select"); select.id = "create-matcap-collection-droplist";
		select.style.cssText = "width:150px;color:#000;float:right;border:1px solid;border-radius:4px;";
		select.style.cssText += "font-size:20px;margin-left:10px;margin-right:15px;padding:2px 4px 4px 4px;";

		var keys = "matcap,environment,others"; // debug!

		keys.split(",").forEach(function( name ){
			var option = document.createElement("option"); option.text = name; option.value = name; select.appendChild( option );
		}); watch( select, "onchange", function(prop, event, value){ console.log({item:select,event:event,value:value}); });
		select.addEventListener( "change", function(){ this.blur(); callWatchers( this, "onchange", "change", this.value ); });

		row.appendChild( select ); tab.appendChild( row );

	})( TabUI.NewMatcap.tab );

//	create-matcap-viewer-ui.js

	(function( tab ){

	//	Create Matcap viewer.
		var row = document.createElement("h3"); row.style.cssText = "height:260px;border:none;text-align:center;margin-right:15px;";
		var canvas = document.createElement("canvas"); canvas.width = 256; canvas.height = 256; canvas.id = "create-matcap-viewer"; 
		canvas.style.cssText = "width:256px;height:256px;margin:auto;background-repeat:repeat;background-image:url('https://i.imgur.com/rnZZU0i.png') !important;";
		row.appendChild( canvas ); tab.appendChild( row );

	})( TabUI.NewMatcap.tab );

//	create-matcap-name-input-ui.js

	(function( tab ){

	//	Create Matcap Name input.
		var row = document.createElement("h3"); row.style.cssText = "margin-right:15px;height:30px;";
		var input = document.createElement("input"); input.id = "create-matcap-name-input";
		input.setAttribute("placeholder", "name" ); input.classList.add("form-control","text-center");
		input.style.cssText = "width:-webkit-fill-available;color:#000;display:inline;margin:0px 5px;";
		input.style.cssText += "text-align:center;font-size:large;font-weigth:bold;background:none;";
		row.appendChild(input); tab.appendChild( row );

	})( TabUI.NewMatcap.tab );

//	create-matcap-button-ui.js

	(function( tab ){

	//	Create Matcap button.
		var row = document.createElement("h3"); row.style.cssText = "height:40px;margin-bottom:20px;";
		var btn = document.createElement("div"); btn.id = "create-matcap-button"; btn.textContent = "New Matcap";
		btn.classList.add( "form-control","btn", "btn-primary","btn-white-outline","gradient-btn" );
		btn.style.cssText = "width:-webkit-fill-available;height:40px;font-size:large;margin-right:15px;float:right;";
		row.appendChild( btn ); tab.appendChild( row );

	})( TabUI.NewMatcap.tab );

//	create-matcap-map-droplist-ui.js

	(function( tab ){

	//	Create Matcap Texture droplist.
		var row = document.createElement("h3"); row.textContent = "select:"; row.style.cssText = "height:30px;";
		var select = document.createElement("select"); select.id = "create-matcap-map-droplist";
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
		//	{name:"Specular",value:"specularMap"}, // deprecated?
		];

		keys.forEach(function( key ){
			var option = document.createElement("option"); option.text = key.name; option.value = key.value; select.appendChild( option );
		}); watch( select, "onchange", function(prop, event, value){ console.log({item:select,event:event,value:value}); });
		select.addEventListener( "change", function(){ this.blur(); callWatchers( this, "onchange", "change", this.value ); });

		row.appendChild( select ); tab.appendChild( row );  select.value = "";

	})( TabUI.NewMatcap.tab );

//	create-matcap-image-button-ui.js

	(function( tab ){

	//	Create Matcap Image button.
		var row = document.createElement("h3"); row.style.cssText = "height:40px;margin-bottom:20px;margin-right:15px;";

		var icon = document.createElement("canvas"); icon.id = "create-matcap-icon";
		icon.width = icon.height = 36; icon.style.cssText = "border:thin solid #888888;border-radius:4px;float:left;";

		var btn = document.createElement("div"); btn.id = "create-matcap-img-button"; 
		btn.classList.add( "form-control","btn", "btn-primary","btn-white-outline","gradient-btn" );
		btn.textContent = "Import Image"; btn.style.cssText = "width:220px;float:right;height:40px;font-size:large;";

		var input = document.createElement("input"); input.type = "file"; 
		input.id = "create-matcap-file-input"; input.style.cssText = "display:none;"; 
		btn.appendChild( input ); row.appendChild( icon ); row.appendChild( btn ); tab.appendChild( row );

	})( TabUI.NewMatcap.tab );

//	create-matcap-key-droplist-ui.js

	(function( tab ){

	//	Create Matcap Key droplist.
		var row = document.createElement("h3"); row.textContent = "key:"; row.style.cssText = "height:30px;";
		var select = document.createElement("select"); select.id = "create-matcap-key-droplist";
		select.style.cssText  = "width:170px;color:#000;float:right;border:1px solid;border-radius:4px;";
		select.style.cssText += "font-size:20px;margin-left:0px;margin-right:15px;padding:2px 4px 4px 4px;";

		var keys =  [
			{name:"", value:""},
			{name:"roughness", value:"roughness"},
			{name:"metalness", value:"metalness"},
			{name:"bumpScale", value:"bumpScale"},
			{name:"normalScale", value:"normalScale"},
			{name:"texture offset", value:"texture.offset.x"},
			{name:"light position x", value:"light.position.x"},
			{name:"light position y", value:"light.position.y"},
		];

		keys.forEach(function( key ){
			var option = document.createElement("option"); option.text = key.name; option.value = key.value; select.appendChild( option );
		}); watch( select, "onchange", function(prop, event, value){ console.log({item:select,event:event,value:value}); });
		select.addEventListener( "change", function(){ this.blur(); callWatchers( this, "onchange", "change", this.value ); });

		row.appendChild( select ); tab.appendChild( row );  select.value = "";

	})( TabUI.NewMatcap.tab );

//	create-matcap-value-input-ui.js

	(function( tab ){

	//	Create Matcap Value input.
		var row = document.createElement("h3");row.textContent = "value:"; row.style.cssText = "height:30px;margin:20px 15px 20px 0;";
		var vect = document.createElement("div"); vect.style.cssText = "width:170px;height:40px;float:right;";
		var prev = document.createElement("li"); prev.innerHTML = "&#9668;"; prev.style.display = "inline";
		var next = document.createElement("li"); next.innerHTML = "&#9658;"; next.style.display = "inline";
		prev.id = "create-matcap-value-decrease"; prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");
		next.id = "create-matcap-value-increase"; next.classList.add("btn","btn-primary","get-next-btn","pull-right"); 

		var input = document.createElement("input"); input.id = "create-matcap-value-input";
		input.setAttribute("placeholder", "value" ); input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";
		vect.appendChild(prev); vect.appendChild(input); vect.appendChild(next); row.appendChild(vect); tab.appendChild( row );

	})( TabUI.NewMatcap.tab );

//	create-matcap-remove-button-ui.js

	(function( tab ){

	//	Create Matcap Remove button.
		var row = document.createElement("h3"); row.style.cssText = "height:30px;margin-bottom:20px;";
		var btn = document.createElement("div"); btn.id = "create-matcap-remove-button"; btn.textContent = "Remove Texture";
		btn.classList.add( "form-control","btn", "btn-primary","btn-white-outline","gradient-btn" );
		btn.style.cssText = "width:-webkit-fill-available;height:40px;font-size:large;margin-right:15px;float:right;";
		row.appendChild( btn ); tab.appendChild( row );

	})( TabUI.NewMatcap.tab );


//	create-matcap-save-button-ui.js

	(function( tab ){

	//	Create Matcap Save button.
		var row = document.createElement("h3"); row.style.cssText = "height:30px;margin-bottom:20px;";
		var btn = document.createElement("div"); btn.id = "create-matcap-save-button"; btn.textContent = "Save Matcap";
		btn.classList.add( "form-control","btn", "btn-primary","btn-white-outline","gradient-btn" );
		btn.style.cssText = "width:-webkit-fill-available;height:40px;font-size:large;margin-right:15px;float:right;";
		row.appendChild( btn ); tab.appendChild( row );

	})( TabUI.NewMatcap.tab );

//	create-matcap-save-as-material-ui.js

	(function( tab ){

	//	Create Matcap Save As Material button.
		var row = document.createElement("h3"); row.style.cssText = "height:30px;margin-bottom:20px;";
		var btn = document.createElement("div"); btn.id = "create-matcap-save-as-material"; btn.textContent = "Save as Material";
		btn.classList.add( "form-control","btn", "btn-primary","btn-white-outline","gradient-btn" );
		btn.style.cssText = "width:-webkit-fill-available;height:40px;font-size:large;margin-right:15px;float:right;";
		row.appendChild( btn ); tab.appendChild( row );

	})( TabUI.NewMatcap.tab );






/*
//	create-matcap-metalness-ui.js

	(function( tab ){

	//	Create Matcap Roughness input.
		var row = document.createElement("h3");row.textContent = "metal:"; row.style.cssText = "height:30px;margin:20px 15px 20px 0;display:none;";
		var vect = document.createElement("div"); vect.style.cssText = "width:170px;height:40px;float:right;";
		var prev = document.createElement("li"); prev.innerHTML = "&#9668;"; prev.style.display = "inline";
		var next = document.createElement("li"); next.innerHTML = "&#9658;"; next.style.display = "inline";
		prev.id = "create-matcap-metalness-decrease"; prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");
		next.id = "create-matcap-metalness-increase"; next.classList.add("btn","btn-primary","get-next-btn","pull-right"); 

		var input = document.createElement("input"); input.id = "create-matcap-metalness-input";
		input.setAttribute("placeholder", "value" ); input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";
		vect.appendChild(prev); vect.appendChild(input); vect.appendChild(next); row.appendChild(vect); tab.appendChild( row );

	})( TabUI.NewMatcap.tab );

//	create-matcap-bump-scale-ui.js

	(function( tab ){

	//	Create Matcap Bump Scale input.
		var row = document.createElement("h3");row.textContent = "bump:"; row.style.cssText = "height:30px;margin:20px 15px 20px 0;display:none;";
		var vect = document.createElement("div"); vect.style.cssText = "width:170px;height:40px;float:right;";
		var prev = document.createElement("li"); prev.innerHTML = "&#9668;"; prev.style.display = "inline";
		var next = document.createElement("li"); next.innerHTML = "&#9658;"; next.style.display = "inline";
		prev.id = "create-matcap-bump-decrease"; prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");
		next.id = "create-matcap-bump-increase"; next.classList.add("btn","btn-primary","get-next-btn","pull-right"); 

		var input = document.createElement("input"); input.id = "create-matcap-bump-input";
		input.setAttribute("placeholder", "scale" ); input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";
		vect.appendChild(prev); vect.appendChild(input); vect.appendChild(next); row.appendChild(vect); tab.appendChild( row );

	})( TabUI.NewMatcap.tab );

//	create-matcap-roughness-ui.js

	(function( tab ){

	//	Create Matcap Roughness input.
		var row = document.createElement("h3");row.textContent = "rough:"; row.style.cssText = "height:30px;margin:20px 15px 20px 0;display:none;";
		var vect = document.createElement("div"); vect.style.cssText = "width:170px;height:40px;float:right;";
		var prev = document.createElement("li"); prev.innerHTML = "&#9668;"; prev.style.display = "inline";
		var next = document.createElement("li"); next.innerHTML = "&#9658;"; next.style.display = "inline";
		prev.id = "create-matcap-roughness-decrease"; prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");
		next.id = "create-matcap-roughness-increase"; next.classList.add("btn","btn-primary","get-next-btn","pull-right"); 

		var input = document.createElement("input"); input.id = "create-matcap-roughness-input";
		input.setAttribute("placeholder", "value" ); input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";
		vect.appendChild(prev); vect.appendChild(input); vect.appendChild(next); row.appendChild(vect); tab.appendChild( row );

	})( TabUI.NewMatcap.tab );

//	create-matcap-normal-scale-ui.js

	(function( tab ){

	//	Create Matcap Normal Scale input.
		var row = document.createElement("h3");row.textContent = "normal:"; row.style.cssText = "height:30px;margin:20px 15px 20px 0;display:none;";
		var vect = document.createElement("div"); vect.style.cssText = "width:170px;height:40px;float:right;";
		var prev = document.createElement("li"); prev.innerHTML = "&#9668;"; prev.style.display = "inline";
		var next = document.createElement("li"); next.innerHTML = "&#9658;"; next.style.display = "inline";
		prev.id = "create-matcap-normal-decrease"; prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");
		next.id = "create-matcap-normal-increase"; next.classList.add("btn","btn-primary","get-next-btn","pull-right"); 

		var input = document.createElement("input"); input.id = "create-matcap-normal-input";
		input.setAttribute("placeholder", "scale" ); input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";
		vect.appendChild(prev); vect.appendChild(input); vect.appendChild(next); row.appendChild(vect); tab.appendChild( row );

	})( TabUI.NewMatcap.tab );

//	create-matcap-offset-ui.js

	(function( tab ){

	//	Create Matcap Offset (x) input.
		var row = document.createElement("h3");row.textContent = "offset:"; row.style.cssText = "height:30px;margin:20px 15px 20px 0;display:none;";
		var vect = document.createElement("div"); vect.style.cssText = "width:170px;height:40px;float:right;";
		var prev = document.createElement("li"); prev.innerHTML = "&#9668;"; prev.style.display = "inline";
		var next = document.createElement("li"); next.innerHTML = "&#9658;"; next.style.display = "inline";
		prev.id = "create-matcap-offset-decrease"; prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");
		next.id = "create-matcap-offset-increase"; next.classList.add("btn","btn-primary","get-next-btn","pull-right"); 

		var input = document.createElement("input"); input.id = "create-matcap-offset-input";
		input.setAttribute("placeholder", "x" ); input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";
		vect.appendChild(prev); vect.appendChild(input); vect.appendChild(next); row.appendChild(vect); tab.appendChild( row );

	})( TabUI.NewMatcap.tab );

//	create-matcap-light-ui.js

	(function( tab ){

	//	Create Matcap Light (x) input.
		var row = document.createElement("h3");row.textContent = "light-x:"; row.style.cssText = "height:30px;margin:20px 15px 20px 0;display:none;";
		var vect = document.createElement("div"); vect.style.cssText = "width:170px;height:40px;float:right;";
		var prev = document.createElement("li"); prev.innerHTML = "&#9668;"; prev.style.display = "inline";
		var next = document.createElement("li"); next.innerHTML = "&#9658;"; next.style.display = "inline";
		prev.id = "create-matcap-light-x-decrease"; prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");
		next.id = "create-matcap-light-x-increase"; next.classList.add("btn","btn-primary","get-next-btn","pull-right"); 

		var input = document.createElement("input"); input.id = "create-matcap-light-x-input";
		input.setAttribute("placeholder", "x" ); input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";
		vect.appendChild(prev); vect.appendChild(input); vect.appendChild(next); row.appendChild(vect); tab.appendChild( row );

	})( TabUI.NewMatcap.tab );

	(function( tab ){

	//	Create Matcap Light (y) input.
		var row = document.createElement("h3");row.textContent = "light-y:"; row.style.cssText = "height:30px;margin:20px 15px 20px 0;display:none;";
		var vect = document.createElement("div"); vect.style.cssText = "width:170px;height:40px;float:right;";
		var prev = document.createElement("li"); prev.innerHTML = "&#9668;"; prev.style.display = "inline";
		var next = document.createElement("li"); next.innerHTML = "&#9658;"; next.style.display = "inline";
		prev.id = "create-matcap-light-y-decrease"; prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");
		next.id = "create-matcap-light-y-increase"; next.classList.add("btn","btn-primary","get-next-btn","pull-right"); 

		var input = document.createElement("input"); input.id = "create-matcap-light-y-input";
		input.setAttribute("placeholder", "y" ); input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";
		vect.appendChild(prev); vect.appendChild(input); vect.appendChild(next); row.appendChild(vect); tab.appendChild( row );

	})( TabUI.NewMatcap.tab );

//	create-matcap-displacement-scale-ui.js

	(function( tab ){

	//	Create Matcap Displacement Scale input.
		var row = document.createElement("h3");row.textContent = "displac:"; row.style.cssText = "height:30px;margin:20px 15px 20px 0;display:none;";
		var vect = document.createElement("div"); vect.style.cssText = "width:170px;height:40px;float:right;";
		var prev = document.createElement("li"); prev.innerHTML = "&#9668;"; prev.style.display = "inline";
		var next = document.createElement("li"); next.innerHTML = "&#9658;"; next.style.display = "inline";
		prev.id = "create-matcap-displace-decrease"; prev.classList.add("btn","btn-primary","get-prev-btn","pull-left");
		next.id = "create-matcap-displace-increase"; next.classList.add("btn","btn-primary","get-next-btn","pull-right"); 

		var input = document.createElement("input"); input.id = "create-matcap-displace-input";
		input.setAttribute("placeholder", "scale" ); input.classList.add("form-control","text-center");
		input.style.cssText = "color:#000;border:none;display:inline;width:80px;margin:0px 5px;text-align:center;font-size:large;font-weigth:bold;background:none;";
		vect.appendChild(prev); vect.appendChild(input); vect.appendChild(next); row.appendChild(vect); tab.appendChild( row );

	})( TabUI.NewMatcap.tab );
*/