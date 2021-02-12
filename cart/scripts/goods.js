function Good(oGoodElement){
	var g = this;

//***************************свойства**************************************
g.elem = oGoodElement;

//******************методи********************
g.getId =function(){
	return g.elem.attr("class").match(/id_(\d{1,11})/)[1]; 
}
}
;