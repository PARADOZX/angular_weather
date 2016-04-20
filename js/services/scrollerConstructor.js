app.service('scrollerConstructor', function() {
    
    var Scroller = function Scroller(){
    
        var shown = 0,
            hidden = 0,
            lis_shown = [],
            lis_hidden = [],
            lis = document.getElementsByClassName("a");
    console.log(lis);
        this.load = function(){
            var width = window.innerWidth;
            
            var num_li = width/230;
            num_li = parseInt(num_li);
            
            shown = 0;
            hidden = 0;
            lis_shown = [];
            lis_hidden = [];
            
            console.log(document.getElementById('li1'));
            
            for (var i=0; i<num_li; i++) {
                document.getElementById('li'+(i+1)).style.display = "inline-block";
                shown++;
                lis_shown.push(i);
            }
            for(i=num_li; i<lis.length; i++) {
                document.getElementById('li'+(i+1)).style.display = "none";
                hidden++;
                lis_hidden.push(i);
            }
        };
        
        this.scrollRight = function() {
            
            var ls = lis_shown.shift();
            lis_hidden.push(ls);
            
            var ls2 = lis_hidden.shift();
            lis_shown.push(ls2);
        
            document.getElementById('li'+(ls+1)).style.display = "none";
            document.getElementById('li'+(ls2+1)).style.display = "inline-block";
    
            for( var i = 0; i < lis_shown.length; i++ ){
            
                var first = 'li'+(lis_shown[i]+1),
                    second = 'li'+(lis_shown[i+1]+1);
    
                if(i < lis_shown.length-1) {
                    document.getElementById(first).parentNode.insertBefore(document.getElementById(second), document.getElementById(first).nextSibling);
                }
            }
        };
        
        this.scrollLeft = function() {
            var ls = lis_shown.pop();
            lis_hidden.unshift(ls);
            
            var ls2 = lis_hidden.pop();
            lis_shown.unshift(ls2);
            
            document.getElementById('li'+(ls+1)).style.display = "none";
            document.getElementById('li'+(ls2+1)).style.display = "inline-block";
    
            for( var i = 0; i < lis_shown.length; i++ ){
            
                var first = 'li'+(lis_shown[i]+1),
                    second = 'li'+(lis_shown[i+1]+1);
    
                if(i < lis_shown.length-1) {
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
        
        this.init();
    };

    this.newScroller = function(){
        return new Scroller();
    }
});