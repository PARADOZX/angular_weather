app.service('scrollerConstructor', function() {
    
    var Scroller = function Scroller(){
    
        var shown = 0,
            hidden = 0,
            lis_shown = [],
            lis_hidden = [],
            lis = document.getElementsByClassName("a"),
            lis_length_override = null,
            num_of_li = null,
            scroll_buttons = document.getElementsByClassName('scroll-button');
            
        this.setLiLength = function(length){
            lis_length_override = length;
        };
    
        this.load = function(){
    
            var width = window.innerWidth;
            
            var num_li = width/230;
            num_li = parseInt(num_li);
        
            shown = 0;
            hidden = 0;
            lis_shown = [];
            lis_hidden = [];
            
            var lis_length = lis_length_override || lis.length;
            
            for (var i=0; i<num_li; i++) {
                if(lis_length >= (i+1)) {
                    document.getElementById('li'+(i+1)).style.display = "inline-block";
                    shown++;
                    lis_shown.push(i);
                }
            }
            
            for(var j=num_li; j<lis_length; j++) {
                document.getElementById('li'+(j+1)).style.display = "none";
                hidden++;
                lis_hidden.push(j);
            }
            
            //scroll left is always initially hidden on load
            scroll_buttons[0].style.visibility = "hidden";
            
            if(lis_length <= num_li) {
                // scroll_buttons[0].style.visibility = "hidden";
                scroll_buttons[1].style.visibility = "hidden";
            } else {
                // scroll_buttons[0].style.visibility = "visible";
                scroll_buttons[1].style.visibility = "visible";    
            }
        };
        
        this.scrollRight = function() {
            
            var ls = lis_shown.shift();
            lis_hidden.push(ls);
            
            var ls2 = lis_hidden.shift();
            lis_shown.push(ls2);
        
            document.getElementById('li'+(ls+1)).style.display = "none";
            document.getElementById('li'+(ls2+1)).style.display = "inline-block";
    
            var lis_length = lis_length_override || lis.length;
   
            if(document.getElementById('li'+ lis_length).style.display == "inline-block") {
                return true;
            } else return false;
            
            //LEFT OFF HERE 4/21 ---- the problem with switching between 3 and 7-day views after scrolling seems to be 
//because the nodes are being reordered.  Angular seems to be confused when the nodes are reordered b/c
//if we don't reorder switching between 3 and 7-day views works.
            
            
            // for( var i = 0; i < lis_shown.length; i++ ){
            
            //     var first = 'li'+(lis_shown[i]+1),
            //         second = 'li'+(lis_shown[i+1]+1);
    
            //     if(i < lis_shown.length-1) {

            //         document.getElementById(first).parentNode.insertBefore(document.getElementById(second), document.getElementById(first).nextSibling);
            //     }
            // }
        };
        
        this.scrollLeft = function() {
            
            var ls = lis_shown.pop();
            lis_hidden.unshift(ls);
            
            var ls2 = lis_hidden.pop();
            lis_shown.unshift(ls2);
            
            document.getElementById('li'+(ls+1)).style.display = "none";
            document.getElementById('li'+(ls2+1)).style.display = "inline-block";
            
            if(document.getElementById('li1').style.display == "inline-block") {
                return true;
            } else return false;
            
            // for( var i = 0; i < lis_shown.length; i++ ){
            
            //     var first = 'li'+(lis_shown[i]+1),
            //         second = 'li'+(lis_shown[i+1]+1);
    
            //     if(i < lis_shown.length-1) {
            //         document.getElementById(first).parentNode.insertBefore(document.getElementById(second), document.getElementById(first).nextSibling);
            //     }
            // }
        };
        
        this.reset = function(length) {
            for( var i = 0; i < length; i++ ){
            
                var first = 'li'+(i+1),
                    second = 'li'+(i+2);
    
                if(i < length-1) {
                    document.getElementById(first).parentNode.insertBefore(document.getElementById(second), document.getElementById(first).nextSibling);
                }
            }
        };
        
        this.init = function() {
            
            var that = this;
            
            window.onresize = function(){
                that.load();
            };
            
            this.load();
        };
        
        // this.init();
    };

    this.newScroller = function(){
        return new Scroller();
    }
});