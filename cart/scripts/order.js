function Order(sSelector) {
var o = this;

o.init(sSelector);
o.name		= o.findObj('.b-order__textfield_name');
o.email		= o.findObj('.b-order__textfield_email');
o.tel		= o.findObj('.b-order__textfield_tel');
o.goods		= o.findObj('.b-order__textfield_goods');
o.message	= o.findObj('.b-order__message');
o.btn		= o.findObj('.b-order__btn');

o.cartOrder = function(event){
	event.preventDefault();
	console.log(o.name.val(), o.email.val(), o.tel.val());

	$.ajax({
		'url' 		: 'order.php'
		,'method'	: 'POST'
		,'dataType'	: 'json'
		,'timeout'	: 5000
		,'data'		: {
			 'name'	: o.name.val()	 
			,'email': o.email.val()
			,'tel'	: o.tel.val()
			,'goods': o.goods.val()
			}
		,'success'	: function(serverResponse){
			}
		,'error'	: function(oAjax){
		}
		,'complete'	: function(oAjax){
			var serverResponse = oAjax.responseJSON;
			console.log(oAjax)
			if (oAjax.status == 200){	
				if (serverResponse!=undefined){
					o.message.html(serverResponse.message);
					}
				else {
					alert('The server has returned an incorrect '
						+ 'response that cannot be parsed as JSON:\n' 
						+ oAjax.responseText);
					}
				}
			else{
				alert('Totally unpredicted error.');
				console.log(oAjax);
				}
			}
		});
	}

o.elem.bind('submit', o.cartOrder);
}


Order.prototype = new Component();