app.directive('scroller', function($timeout, $rootScope, scrollerConstructor) {
    return {
        restrict: "E",
        replace: true,
        transclude: true,
        template: "<div id='scroll-ctnr'><ng-transclude></ng-transclude></div>",
        link: function(scope, element, attr, ctrl){
            var scroller = scrollerConstructor.newScroller();
            
            var prev_button = angular.element(document.querySelector('#forecast-prev')),
                next_button = angular.element(document.querySelector('#forecast-next'));
    
            $rootScope.$on('seven', function(){
                
                next_button.css('visibility', 'visible');
                prev_button.css('visibility', 'visible');
             
                $timeout(function(){
                    // scroller.reset(7);
                    scroller.setLiLength(7);
                    scroller.load();
                }, 0);
                
            });
            
            $rootScope.$on('three', function(){
                
                next_button.css('visibility', 'visible');
                prev_button.css('visibility', 'visible');
             
                $timeout(function(){
                    // scroller.reset(3);
                    scroller.setLiLength(3);
                    scroller.load();    
                }, 0);
                
            });
                
            $timeout(function(){
                // var scroller = scrollerConstructor.newScroller();
                scroller.init();
            }, 0);
            
            scope.previous = function(){
                var ret = scroller.scrollLeft();
    
                if(ret) {
                    prev_button.css('visibility', 'hidden');
                    next_button.css('visibility', 'visible');
                } else {
                    next_button.css('visibility', 'visible');
                }
            };
            
            scope.next = function(){
                var ret = scroller.scrollRight();
                
                if(ret) {
                    next_button.css('visibility', 'hidden');
                    prev_button.css('visibility', 'visible');
                } else {
                    prev_button.css('visibility', 'visible');
                }
            };
        }
    }
});