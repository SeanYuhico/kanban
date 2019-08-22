// const express = require("express")
// const router = express.Router()
// const bodyparser = require("body-parser")
// const jQuery = require("../models/jquery")

// const app = express()

// const urlencoder = bodyparser.urlencoded({
//   extended : true
// })

// router.use(urlencoder)

// jQuery(document).ready(function() {
// 	/**
// 	 * Our trigger event for opening the overlay. This class
// 	 * should exist on the overlay trigger, as well as an
// 	 * attribute (data-overlay) to adentify the overlay to open.
// 	*/
// 	jQuery( '.overlay-trigger' ).on( 'click', function( event ) {
// 		event.preventDefault();

// 		/**
// 		 * Set the overlay variable based on the data provided
// 		 * by the overlay trigger.
// 		 */
// 		var overlay = jQuery( this ).data( 'overlay' );

// 		/**
// 		 * If the overlay variable is not defined, give a message
// 		 * and return.
// 		*/
// 		if ( ! overlay ) {
// 			console.log( 'You must provide the overlay id in the trigger. (data-overlay="overlay-id").' );
// 			return;
// 		}

// 		/**
// 		 * If we've made it this far, we should have the data
// 		 * needed to open a overlay. Here we set the id variable
// 		 * based on overlay variable.
// 		 */
// 		var id = '#' + overlay;

// 		/**
// 		 * Let's open up the overlay and prevent the body from
// 		 * scrolling, both by adding a simple class. The rest
// 		 * is handled by CSS (awesome).
// 		 */
// 		jQuery( id ).addClass( 'overlay-open' );
// 		jQuery( 'body' ).addClass( 'overlay-view' );

// 		/**
// 		 * When the overlay outer wrapper or `overlay-close`
// 		 * triger is clicked, lets remove the classes from
// 		 * the current overlay and body. Removal of these
// 		 * classes restores the current state of the user
// 		 * experience. Again, all handled by CSS (awesome).
// 		 */
// 		jQuery( id ).on( 'click', function( event ) {
// 			// Verify that only the outer wrapper was clicked.
// 			if ( event.target.id == overlay ) {
// 				jQuery( id ).removeClass( 'overlay-open' );
// 				jQuery( 'body' ).removeClass( 'overlay-view' );
// 			}
// 		});

// 		/**
// 		 * Closes the overlay when the esc key is pressed. See
// 		 * comment above on closing the overlay for more info
// 		 * on how this is accomplished.
// 		 */
// 		jQuery( document ).keyup( function( event ) {
// 			// Verify that the esc key was pressed.
// 			if ( event.keyCode == 27 ) {
// 				jQuery( id ).removeClass( 'overlay-open' );
// 				jQuery( 'body' ).removeClass( 'overlay-view' );
// 			}
// 		});		
// 	});
// });

// module.exports = router