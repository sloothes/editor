//	toggle-buttons.js

	(function( skydome_droplist  ){

		function onMouseClickWatchersCall( button, droplist ){

			var interval;

			watch( button, "onclick", function( prop, event, value ){ 
				debugMode && console.log({item:button,property:prop,event:event,value:value}); // debug.
			});

		//	Call watchers.

			button.addEventListener( "click", function(){ 
				clearTimeout( interval );
				interval = setTimeout(function(button){
					callWatchers( button, "onclick", "click", droplist.value );
				}, 250, this); 
			});
		}

		onMouseClickWatchersCall( TabUI.Skydome.tab.querySelector("div#water-toggle-button"), {value:""} ); // water_toggle_button,
		onMouseClickWatchersCall( TabUI.Skydome.tab.querySelector("div#ground-toggle-button"), {value:""} ); // ground_toggle_button,
		onMouseClickWatchersCall( TabUI.Skydome.tab.querySelector("div#skydome-toggle-button"), {value:""} ); // skydome_toggle_button,

	})( TabUI.Skydome.tab.querySelector("select#skydome-texture-droplist") );

	(function( mirror,button ){

		watch( button, "onclick", function( prop, event, value ){ 
			if ( mirror ) mirror.visible = !mirror.visible;
		});

	})( mirror, TabUI.Skydome.tab.querySelector("div#water-toggle-button") );

	(function( helper,button ){

		watch( button, "onclick", function( prop, event, value ){ 
			if ( helper ) helper.visible = !helper.visible;
		});

	})( groundHelper, TabUI.Skydome.tab.querySelector("div#ground-toggle-button") );

	(function( skydome,button ){

		watch( button, "onclick", function( prop, event, value ){ 
			if ( skydome ) skydome.visible = !skydome.visible;
		});

	})( skydome, TabUI.Skydome.tab.querySelector("div#skydome-toggle-button") );
