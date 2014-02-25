function formElements(){
    //key: id, val: formElement
   var formElements = {};

   this.setData  = function(key, val) { formElements[key] = val;}
   this.getData = function(key) { return formElements[key]; }
}
   var allFormElements = new formElements();
   var elementIDLastClicked = 0;
$(function() {
    $( ".sortable" ).sortable();
  });
$( init );
 
function init() {

  $('.draggable').draggable({
      
  opacity:0.7, helper:"clone",

  stop: function(event, ui) {
		//check to see if ele dropped on result area.
      var coords = $('#resultArea').position();
      coords.bottom = coords.top + $('#resultArea').height();
      coords.bottomRight = coords.left + $('#resultArea').width();
      //inside results area.
        if(ui.position.top >= coords.top && ui.position.top <= 
           coords.bottom && ui.position.left >= coords.left && ui.position.left 
           <= coords.bottomRight){
			//store the dragged element id
			var elementType = $(this).attr('id');
			$( '#outputForm').appendElement(elementType);
        }else{//outside
   
        }
    }
      });
}
//function to append a bootstrap styled form element to target.
(function ( $ ) { 
    $.fn.appendElement = function(elementType) {
        
    switch(elementType){
        case 'textBoxController': 
                //create a new bj to append
                toAppend = new bsFormElement({
                    type: 'textBox',
                    label: 'Text Box',
                    placeHolder: 'Enter text',
                    glyphicon: 'glyphicon glyphicon-font'
                });
                toAppend.buildHTML();
                
                break;
        case 'textAreaController':
                //create a new bj to append
                toAppend = new bsFormElement({
                    type: 'textArea',
                    label: 'Text Area',
                    placeHolder: 'Enter text',
                    glyphicon: 'glyphicon glyphicon-align-justify'          
                });
                toAppend.buildHTML();
                break;
        case 'dropdownController':
                //create a new bj to append
                toAppend = new bsFormElement({
                    type: 'dropdown',
                    label: 'Dropdown',
                    placeHolder: 'Pick One',
                    glyphicon: 'glyphicon-align-justify',     
                    multiOptions: [1,2,3,99,101,514]
                });
                toAppend.buildHTML();
            break;
        case 'radioController':
            //create a new bj to append
            toAppend = new bsFormElement({
                type: 'radio',
                label: 'Pick One',     
                multiOptions: ['hot','cold','rainy']
            });
            toAppend.buildHTML();
        break;
        case 'checkController':
            //create a new bj to append
            toAppend = new bsFormElement({
                type: 'check',
                label: 'Pick One at least one?',
                glyphicon: 'glyphicon-align-justify',     
                multiOptions: [1,2,3,99,101]
            });
            toAppend.buildHTML();
        break;
        default:
                console.log('No element given');
        }
		//html to append
		var outputHTML;

//append the new element to array.
        allFormElements.setData(toAppend.id,toAppend);
        console.log(toAppend.id);
        return this.append(toAppend.html);
    };

    
}( jQuery ));

// Object to represent a bootstrap form item
    var idCount = 0;
    
function bsFormElement(options) {
    this.type = options.type;
    this.label = options.label;
    this.placeholder = options.placeHolder;
    this.glyphicon = options.glyphicon;
    this.multiOptions = options.multiOptions;
    this.class = 'formElement'; //need to wire this up to html below
    this.html;
    this.id = idCount; //make li have the id
    idCount++;
    this.buildHTML = function(){
        switch(this.type){
        case 'textBox': 
            this.html = '<li class="formElement" id="'+this.id+'"><div class="form-group"><label for="textBox" class="col-sm-2 control-label">'+
                    this.label+'</label><div class="col-sm-9"><div class="input-group"><span class="input-group-addon"><span class="'+
                    this.glyphicon+'"></span></span><input type="email" class="form-control"  placeholder="'+
                    this.placeholder+'"></div></div></div></li>'
                break;
        case 'textArea':
            console.log('build label: '+ this.label);
            this.html = '<li class="formElement" id="'+this.id+'"><div class="form-group"><label for="textArea" class="col-sm-2 control-label">'+
                    this.label+'</label><div class="col-sm-9"><div class="input-group"><span class="input-group-addon"><span class="'+
                    this.glyphicon+'"></span></span><textarea class="form-control" id="'+
                    this.id+'textArea" placeholder="'+
                    this.placeholder+'"></textarea></div></div></div></li>'
            break;
        case 'dropdown':
            this.html = '<li class="formElement" id="'+this.id+'"><div class="form-group"><label for="dropdown" class="col-sm-2 control-label">'+
                    this.label+'</label><div class="col-sm-9"><div class="input-group"><div class="dropdown"><button class="btn" +\n\
                    data-toggle="dropdown" id="dropdown">'+
                    this.placeholder+ ' '+ '<span class="caret"></span></button><ul class="dropdown-menu">';
                    for (var i = 0; i < this.multiOptions.length; i++) {
                        this.html += '<li><a href="#" tabindex="-1"> '
                                + this.multiOptions[i] + '</a></li>'
                    }
                    this.html+='</ul></div></div></div></div></li>'
            break;
        case 'radio':
            this.html = '<li class="formElement" id="'+this.id+'"> <div class="form-group"> <div class="col-sm-9 col-sm-offset-2 "> <span><b>'
                    +this.label+'</b></span><br />';
                for (var i = 0; i < this.multiOptions.length; i++) {
                    this.html += '<div class="radio"><label><input type="radio" name="count" value="hot" />'+this.multiOptions[i]+'</label><br/></div>'
                }
                this.html+='</div></div></li>';
            break;
        case 'check':
            this.html = '<li class="formElement" id="'+this.id+'"> <div class="form-group"> <div class="col-sm-9 col-sm-offset-2 "> <span><b>'
                    +this.label+'</b></span><br />';
                for (var i = 0; i < this.multiOptions.length; i++) {
                    this.html += '<div class="checkbox"><label><input type="checkbox" />'+this.multiOptions[i]+'</label><br/></div>'
                }
                this.html+='</div></div></li>';
            break;
        default:
                console.log('No type given');
        }
    
    
    }
};
bsFormElement.prototype.toString= function() {
    return 'Element at '+this.type+', '+this.baseHTML;
};

//var test = new bsFormElement('textArea','Text Area');
var test = new bsFormElement({
type: 'textBox',
label: 'Text Box',
placeHolder: 'Text',
glyphicon: 'glyphicon-align-justify'
}
);
//save Form using button function
(function ( $ ) { 

	$('#saveBtn').click(function(e){
		var savedForm= $('#resultArea').html();
		$.post('http://localhost:8080/Bootstrap-Forms/NewServlet',
                    {form : savedForm} 
                    ,function(data ){ //callback on success
			console.log(data);
		})
		.fail(function(){
			alert('error');
			})
	})	
        $('#resetBtn').click(function(e){
               $('#outputForm').empty();
               
	}) 
}( jQuery ));
//save the form when the list order is changed
$('.sortable').sortable({
    update: function(){
        console.log('Form order changed: Saving to server');
    }
});
//update label needs finshes
$(function() {
    $('.sortable').on('click', 'li', function(event){
    var clickElementId = $(this).attr('id');
    console.log('click id: ' + clickElementId);
    elementIDLastClicked = clickElementId;
    //load settings tab.
    $('#settingsTab a:last').tab('show');
    
    $('#elementId').html(clickElementId);

    
});
  });
  //takes element id,property,value of bsFormElement
  function updateElement(id,property,value){
      
      var elementToChange = allFormElements.getData(id);
      propertyToChange = elementToChange[property] = value;
      elementToChange.buildHTML();
      console.log('updated label: after '+ elementToChange.label);
      return elementToChange.html;
      //$( '#outputForm').appendElement(elementToChange.buildHTML());
  }

$(function() {
    $('#settingsForm').on('keyup', 'input', function(event){
        
       var elementToChange = $('#elementId').text();
       console.log(elementToChange);
       var newValue = $(this).val();
        $('#' + elementToChange).replaceWith(updateElement(elementToChange,'label',newValue));
});
  });
//    switch
//    $(this).replaceWith(updateElement(clickElementId,'label','bedTime'));
//}
// create a method that on key up of any elment setting text box call's update
// element with global varible elementIDLastClicked and new value.
						
							



