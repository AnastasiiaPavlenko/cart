function Cart(sSelector, sCartSelector){
	var c = this; 
	c.init(sSelector);

	/* свойства */
	c.cart = $(sCartSelector);
	c.list = c.cart.find(".b-minicart__list"); //для получения объекта из каталога- метод findObj
	c.button = c.cart.find(".b-minicart__button");
	c.total = c.cart.find(".b-minicart__total");
	c.quantity = c.cart.find(".b-minicart__quantity");
	c.goods = {}; //соответствие между id и qty(количеством)
	$.cookie.json = true;

	/* методы */
	c.add = function(event){ //метод для работы со строкой с товаром
		event.preventDefault();
		console.log("no errors");
		var orderForm = $(this);
		console.log(orderForm);
		var currentGood = orderForm.closest(".b-good"); //ищем предка элемента, родителя
		console.log(currentGood.attr("class"));
		var addedGood = c.put(currentGood);
		console.log(addedGood); //вызываем метод для размещения товара в корзине (на вход - товар-строка tr с данными о товаре)
		c.goods[addedGood.getId()] = orderForm.find(".b-order-form__quantity").val();
		$.cookie("cartGoods", c.goods, {"expires": 7, "path": "/"}); //утсановка куки
		c.list.stop().slideDown();//разворачивает список товаров корзины
		c.showCartInfo();
	};
	c.put = function(oCurrentGood){ //метод отвечает за визуализацию товаров в корзине
		var addedGood = new Good(oCurrentGood);
		console.log(addedGood);
		oCurrentGood.addClass("b-good_in-cart");
		var goodIdClass = "b-good_id_" + addedGood.getId();
		console.log(goodIdClass);
		var existingGood = c.list.find("." + goodIdClass); //ищем в листе строку с конкретным товаром
		console.log(existingGood);
		if (existingGood.length){
			c.copyData(oCurrentGood, existingGood, [".b-order-form__quantity"]);
		}
		else {
			var newGood = c.list.find(".b-good:first-child").clone();
			newGood.addClass(goodIdClass);
			console.log(newGood);
			c.copyData(oCurrentGood, newGood, [
				".b-good__image"
				,".b-good__name"
				,".b-order-form__quantity"
				]);
			 c.list.find(".b-goods").append(newGood);
			 newGood.find(".b-good__delete").click(c.del);
			 newGood.find(".b-order-form__plus").click(c.increaseQuantity);
			 newGood.find(".b-order-form__minus").click(c.decreaseQuantity);
			 newGood.find(".b-order-form").submit(c.add);
		}
		return addedGood; //возвращаем товар, который добавляем
		//послк return ничего не пишем больше
	};
	c.load = function(){
		c.goods = $.cookie("cartGoods");
		console.log("c.goods from load", c.goods);
		if(c.goods){
			$.each(c.goods, function(goodId, quantity){
				var currentGood = c.findObj(".b-good_id_" + goodId);
				currentGood.find(".b-order-form__quantity").val(quantity);
				c.put(currentGood);
			})
		}else{
			c.goods = {};
		}
		c.showCartInfo();
	};
	c.showHideCart = function(){
		c.list.stop().slideToggle();
	};
	c.changeQuantity = function(oBtn, iShift){
		console.log(oBtn, iShift);
		var quantityTextField = $(oBtn).siblings(".b-order-form__quantity")
			,currentQuantity = parseInt(quantityTextField.val()) + iShift;
		console.log("quantityTextField:", quantityTextField);
		if(currentQuantity > 0){
			quantityTextField.val(currentQuantity);
			console.log("currentQuantity", currentQuantity);
		}
		else{
			alert("товаров не может быть менее одного");
		}
	};
	c.del = function(){ //предотвращаем перезагрузку страницы, когда нажимаем на ссылку
		event.preventDefault();
		var currentGood = $(this).closest(".b-good") //поиск ближайшего родителя с классом b-good
			,goodDel = new Good(currentGood)
			,goodId = goodDel.getId()
			;
		console.log(goodId); //выводим идентификатор товара на консоль
		currentGood.remove();//удалить из списка
		c.findObj(".b-good_id_" + goodId).removeClass(".b-good_in-cart");
		c.saveCookie();
		c.showCartInfo();
		delete c.goods[goodId]; //удаляем из куки
	};
	c.showCartInfo = function(){
		var quantity   = 0 //переменная, которая будет хранить общее кол-во товаров в корзине
			,total 	   = 0
			,price	   = 0
			,name      = ""
			,goodsList = ""
			;
		$.each(c.goods, function(id, qty){
			quantity += + qty;
			name      = c.findObj(".b-good_id_" + id + " .b-good__name").text(); //пробел перед классом нужен, чтобы сделать каскад	
			price	  = + c.findObj(".b-good_id_" + id + " .b-good__price").text() * qty;//взяли классы .b-good_id_82 и .b-good__price	
			total    += price * qty;	
			goodsList += name + " " + id + " :" + price + " uah " + qty + " шт.<br>"; 
		});
		console.log("goodsList++++++++++++++++++++++++");
		console.log(goodsList);
		c.quantity.text(quantity);
		c.total.text(total);
		$(".b-order__textfield_goods").val(goodsList);
	};
	c.saveCookie = function(){
		$.cookie("cartGoods", c.goods, {"expires": 7, "path": "/"});
	};
	c.increaseQuantity = function(){
		c.changeQuantity(this, 1);
	};
	c.decreaseQuantity = function(){
		c.changeQuantity(this, -1)
	};
	c.load();

	/* события */
	c.findObj(".b-order-form").submit(c.add);
	c.button.click(c.showHideCart);
	c.findObj(".b-order-form__plus").click(c.increaseQuantity);
	c.findObj(".b-order-form__minus").click(c.decreaseQuantity);

};

Cart.prototype = new Component();