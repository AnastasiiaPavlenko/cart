function Component() {
	this.elem = null;

	this.init = function(sSelector) {
		this.elem = $(sSelector);
	}

	this.findObj = function(sSelector) {
		// f.form.find(".b-form_surname");
		return this.elem.find(sSelector);
	}

	this.getVal = function(oElem, sSeparator){
    var elemType = oElem.attr("type")
    ,elemTagName = oElem.prop("tagName").toLowerCase()
    ,sSeparator  = sSeparator || ""
    ;
    // console.log(elemType, elemTagName);
      if(elemType == "radio") {
        return oElem.filter(":checked").val();
      }
      else if(elemType == "text" || elemTagName == "select" || elemTagName == "textarea"){
        return oElem.val();
      }
      else if(elemType == "checkbox"){
        var checkboxList = "" 
        oElem.filter(":checked")
          .each(function(){
            if(checkboxList){
              checkboxList += sSeparator;
            }
            checkboxList += $(this).val();
          });
          return checkboxList;
      }

  }
  this.copyData = function(oSource, oDestination, aFieldNames) {
  $.each(aFieldNames, function(i, fieldName){
      var oSourceElement = oSource.find(fieldName)
          ,oDestinationElement = oDestination.find(fieldName)
          ,tagName = oSourceElement.prop("tagName")
          ;
          console.log(oSourceElement, oDestinationElement, tagName);
          if(tagName == "IMG"){
            oDestinationElement.attr("src", oSourceElement.attr("src"));
          }
          else if(tagName=="INPUT"||tagName == "TEXTAREA"){
            oDestinationElement.val(oSourceElement.val());
          }
          else{
            oDestinationElement.html(oSourceElement.html());
          }
         
  });
}
}