app.directive('scroller', function(scrollerConstructor) {
    return {
        restrict: "E",
        replace: true,
        transclude: true,
        template: "<ng-transclude></ng-transclude>",
        link: function(scope, element, attr, ctrl){
            var scroller = scrollerConstructor.newScroller();
        }
    }
});