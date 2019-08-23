( function($) {
	/**
	 * Our trigger event for opening the overlay. This class
	 * should exist on the overlay trigger, as well as an
	 * attribute (data-overlay) to adentify the overlay to open.
	*/
	$( '.overlay-trigger' ).on( 'click', function( event ) {
		event.preventDefault();

		/**
		 * Set the overlay variable based on the data provided
		 * by the overlay trigger.
		 */
		var overlay = $( this ).data( 'overlay' );

		/**
		 * If the overlay variable is not defined, give a message
		 * and return.
		*/
		if ( ! overlay ) {
			console.log( 'You must provide the overlay id in the trigger. (data-overlay="overlay-id").' );
			return;
		}

		/**
		 * If we've made it this far, we should have the data
		 * needed to open a overlay. Here we set the id variable
		 * based on overlay variable.
		 */
		var id = '#' + overlay;

		/**
		 * Let's open up the overlay and prevent the body from
		 * scrolling, both by adding a simple class. The rest
		 * is handled by CSS (awesome).
		 */
		$( id ).addClass( 'overlay-open' );
		$( 'body' ).addClass( 'overlay-view' );


		/**
		 * When the overlay outer wrapper or `overlay-close`
		 * triger is clicked, lets remove the classes from
		 * the current overlay and body. Removal of these
		 * classes restores the current state of the user
		 * experience. Again, all handled by CSS (awesome).
		 */
		$( id ).on( 'click', function( event ) {
			// Verify that only the outer wrapper was clicked.
			if ( event.target.id == overlay ) {
				$( id ).removeClass( 'overlay-open' );
				$( 'body' ).removeClass( 'overlay-view' );
			}
		});

		/**
		 * Closes the overlay when the esc key is pressed. See
		 * comment above on closing the overlay for more info
		 * on how this is accomplished.
		 */
		$( document ).keyup( function( event ) {
			// Verify that the esc key was pressed.
			if ( event.keyCode == 27 ) {
				$( id ).removeClass( 'overlay-open' );
				$( 'body' ).removeClass( 'overlay-view' );
			}
		});		
	});
}) (jQuery);

let laneToAddCardID;

$( document ).ready(function() {
	$('.add-lane-form').toggle();
	$(".edit").click(function() {
		$(this).hide();
		$(".description-container").addClass("description-editable");
		$(".description-text").attr("contenteditable", "true");
		$(".save").show();
	  });
	  
	  $(".save").click(function() {
		$(this).hide();
		/*
			This is where you save the text
			description-text will contain the new text
			save contents of description-text to db
		*/
	
		$(".description-container").removeClass("description-editable");
		$(".description-text").removeAttr("contenteditable");
		$(".edit").show();
	});

	let cardIdFromSelect;

	$(".card").click(function() {
		cardIdFromSelect =  $(this).data('id');
	})
	
	$(document).on( "click", function( event ) {
		if (event.target.matches(".add-lane-toggle")) {
			$('.add-lane-form').toggle();
		} else if (!event.target.matches(".add-lane-form") 
			&& !event.target.matches("#new-lane-name")
			&& !event.target.matches("#new-lane-button")
			&& $('.add-lane-form').is(":visible") === true) {
			$('.add-lane-form').toggle();
		} 
	});
  
	$(".lanename").click(function() {
		// get id of lane
	});
  
	
	// this is for adding  a lane
	$("button#new-lane-button").click(function(){
		let name = $("#new-lane-name").val();
		// let boardid = ???
		console.log(name);
		
		$.ajax({
			url: "../board/new-lane",
			method: "POST",
			data:{
				listName: name
			}, 
			success: function(result){
				console.log(result);
				
				//place db shit here
				location.reload(true);
			}
		});
	});

	

	$(".add-card").click(function(){
		let $lane = $(this).parent().closest('div');
		laneToAddCardID = $lane.data('id')
	});
	
  
	// this is for adding a card
	// this needs to be changed to accomodate the list id since wala pa yun
	$("button#save-new-card").click(function(){
		let name = $("#new-card-name").text(),
			desc = $("#new-card-desc").text(),
			img = $("#new-img").val();
  

		let listid = laneToAddCardID;
		let boardID = $("#board_id").data("id")
		//let listid = $(this).data("id")
		console.log(name);
		console.log(desc);
		console.log(img);
		
		$.ajax({
			url: "../board/new-card",
			method: "POST",
			datatype:"json", 
			data:{
				cardName: name,
				description: desc,
				imgname: img,
				listID: listid,
				boardID: boardID
			}, 
			success: function(result){
				console.log(result);
				location.reload(true);
				//place db shit here
				
			}
		});
		 console.log("not success")
	});
  
  
	// this is for updating a card
	$("button#save-edit-card").click(function(){
		let id = $(this).attr("data-id"),
			name = $("#edit-card-name").text(),
			desc = $("#edit-card-desc").text(),
			img = $("#edit-img").val();
  
		console.log(id);
		console.log(name);
		console.log(desc);
		console.log(img);
		
		$.ajax({
			url: "../edit-card/" + id,
			method: "PUT",
			data:{
				id: id,
				cardname: name,
				carddesc: desc,
				filename: img
			}, 
			success: function(result){
				console.log(result);
				
				//place db shit here
				
			}
		});
	});
  });