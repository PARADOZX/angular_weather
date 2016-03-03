app.directive('weather', function(){
    return {
        restrict: 'E',
        replace: true,
        // template:'',
        link: function(scope, elem, attr, ctrl){
            scope.$watch('result', function(value){
                if (value === 'yes') {
                    var element = angular.element(document.querySelector('#change'));
                    element.css('width', '200px');
                }
            });
        }, 
        controller: function($scope) {
            $scope.testSubmit = function(){
                alert('what');
            }
        }
    }
})