// Function back-end side

	$('.delCate').on('click',function(e){
		console.log("http://localhost:1337/cate/destroy/" + $(this).attr('id'));
		var $tr = $(this).closest('tr');
		var cfrm = confirm("Are you sure delete this category product");

		if (!cfrm) {return;}

		$.ajax({
			method: "GET",
			url: "http://localhost:1337/cate/destroy/" + $(this).attr('id'),
			statusCode: {
				404: function() {
				  alert( "page not found" );
				},
				304: function() {
				  alert( "Id error" );
				},
				200: function(data) {
					console.log('data200', data);
					if (data.data == 1){
						$tr.find('td').fadeOut(500,function(){ 
							tr.remove();
						});
					}	
				}
			},
			error:function (xhr, ajaxOptions, thrownError){
				console.log(xhr);
				//On error, we alert user
				alert(thrownError); 
			}
		});
		
	});

// (function( $ ) {
// /**
//  * START - ONLOAD - JS
//  */
// /* ----------------------------------------------- */
// /* ------------- FrontEnd Functions -------------- */
// /* ----------------------------------------------- */

// function deleteCate() {
// 	$(".delCate").on('click', function(e) {
// 		console.log("http://localhost:1337/cate/destroy/" + $(this).attr('id'));
// 		$.ajax({
// 			method: "GET",
// 			url: "http://localhost:1337/cate/destroy/" + $(this).attr('id'),
// 			success: function() {
// 				$(this).remove();
// 			}
// 		})
// 	});
// }



// /* ----------------------------------------------- */
// /* ----------------------------------------------- */
// /* OnLoad Page */
// $(document).ready(function($){
//     deleteCate ();
// });
// /* OnLoad Window */
// var init = function () {

// };
// window.onload = init;

// })(jQuery);