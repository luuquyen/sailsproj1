
(function( $ ) {
/**
 * START - ONLOAD - JS
 */
/* ----------------------------------------------- */
/* ------------- FrontEnd Functions -------------- */
/* ----------------------------------------------- */
//Function count down timer
function countDown () {
	if (!$('.countime-down').length) {return;}

	$('.countime-down').each(function(){
		$(this).countdown($(this).data('time'),function(event) {
			$(this).html(event.strftime('%D ngày %H:%M:%S'));		
		})
		.on('finish.countdown', function(event) {
			$(this).parent().remove();
			$(this).parent().click(function(e){
                alert('Đã hết thời gian mua sản phẩm này');
                e.preventDefault();
            });
		});
	});
};
//Function delete category using AJAX
function delCate () {
	$('.delCate').on('click',function(e){
		console.log("http://localhost:1337/cate/destroy/" + $(this).attr('id'));
		var $tr = $(this).closest('tr');
		var cfrm = confirm("Are you sure delete this category product");

		if (!cfrm) {return;}

		$.ajax({
			method: "GET",
			url: "/cate/destroy/" + $(this).attr('id'),
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
						$tr.find('td').fadeOut(200,function(){ 
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
};





/* ----------------------------------------------- */
/* ----------------------------------------------- */
/* OnLoad Page */
$(document).ready(function($){
   countDown ();
   delCate ();
});
/* OnLoad Window */
var init = function () {

};
window.onload = init;

})(jQuery);