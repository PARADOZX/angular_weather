app.directive('advisory', function($compile, textPreview){
    return {
        restrict: "E",
        replace: true,
        scope: {
            message: "@"
        },
        link: function(scope, element, attrs, controller) {
            var message = scope.message,
                preview = textPreview.newPreview(message),
                preview_message = preview.change(),
                markup = createMarkup(preview_message);
            
            element.append($compile(markup)(scope));
        
            attachEvent();
        
            //recursive function to dynamically attach event to new markup
            function attachEvent()
            {
                angular.element(document.querySelector('#preview'))
                    .on('click', function(){
                        preview_message = preview.change();
                        markup = createMarkup(preview_message);
                        element.empty().append($compile(markup)(scope));
                        
                        if(preview.getPreview())
                            angular.element(document.querySelector('#preview')).text('less');
                        else 
                            angular.element(document.querySelector('#preview')).text('more');
                            
                        attachEvent();
                    });
            }
            
            function createMarkup(string) {
                return "<p>"+ string +"<a id='preview'>more</a></p>"
            }
        }
    }
});


//LEFT OFF HERE 4/7
//PARAGRAPH PREVIEW OBJECT TO HIDE alert messages which are super long. Create a filter or directive implementing this.

//HTML
// <input type="button" id="crop" value="oh Hi" />
// <div id="preview">
// </div>


//JS
// var string = "Wind Advisory in effect from 2 PM this afternoon to 7 PM EDT this evening... The National Weather Service in Taunton has issued a Wind Advisory...which is in effect from 2 PM this afternoon to 7 PM EDT this evening. * Location...Rhode Island and eastern Massachusetts. * Winds...south 15 to 20 mph with gusts up to 50 mph. * Timing...this afternoon and early evening. * Impacts...strong wind gusts may result in some downed large tree limbs. Isolated power outages possible. Precautionary/preparedness actions... A Wind Advisory is issued when sustained winds are forecast to be 31 to 39 mph or gusts will range between 46 and 57 mph. Winds this strong are capable of Downing small tree limbs and branches...possibly causing isolated power outages. Driving can also be difficult...especially for high profile vehicles";

// appendText('preview', string);

// var preview = new Preview(string);

// document.getElementById('crop').onclick = function(){
//   var text = preview.change();
// 	appendText('preview', text);
// };

// function appendText(id, string)
// {
// 	document.getElementById(id).innerHTML = string;
// }

// function Preview(string)
// {

// 	var string = string,
//   		preview = false, 
//       cropText = '';

// 	var cropString = function(string) {
//   		if(!string) return false;
  
//       var words = string.split(' ');

//       if(words.length > 5) {
//           words = words.slice(0,5);
//       }

//       var cropped_para = words.join(' ');
//       return cropped_para;
//   }

// 	var previewString = function() {
//   		if(!cropText) {
// 					cropText = cropString(string);  	
//       }
//       return cropText;
//   }
  
//   this.change = function() {
//   	if(!preview) {
//     	preview = true;
//       return previewString();
//     }
//     if(preview) {
//     	preview = false;
// 			return string;
// 		}
//   }
// }