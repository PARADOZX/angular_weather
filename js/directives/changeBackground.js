app.directive('changeBackground', function(){
    return {
        restrict: "A",
        replace: true,
        link: function(scope, element, attr, ctrl) {
            if(scope.data)
                var element = angular.element(document.querySelector('#home-container'));
                if(scope.data.temp_f > 45) {
                    element.css('background-color', '#eeeeee');
                } else element.css('background-color', 'gray');
                
        }
    }
})