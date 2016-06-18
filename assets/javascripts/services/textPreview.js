app.service('textPreview', function() {
    
    function Preview(string)
    {
    	var string = string,
      		preview = true, 
            cropText = '';
    
    	var cropString = function(string) {
      	    if(!string) return false;
      
            var words = string.split(' ');
    
            if(words.length > 5) {
                words = words.slice(0,5);
            }
    
            var cropped_para = words.join(' ');
            return cropped_para;
        };
    
    	var previewString = function() {
      	    if(!cropText) {
			    cropText = cropString(string);  	
            }
            return cropText;
        };
      
        this.change = function() {
            
      	    if(preview) {
        	    preview = false;
                return previewString();
            }
        
            if(!preview) {
        	    preview = true;
    			return string;
    		}
        };
        
        this.getString = function(){
            return string;
        };
        
        this.getPreview = function(){
            return preview;  
        };
    }
    
    this.newPreview = function(string) {
        return new Preview(string);
    }
});