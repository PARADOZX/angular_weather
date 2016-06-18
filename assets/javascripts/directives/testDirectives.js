app.directive('top', function(){
    return {
        restrict: "A",
        controller : function($scope){
            $scope.colors = [];
            this.setcolors = function(colorArr) {
                $scope.colors.push(colorArr[0]);
            };
        },
        link : function(scope, element, attrs, controller){
            scope.color1 = scope.colors;
        }
    }
});

app.directive('middle', function(){
    return {
        restrict: "A", 
        require: ["^top", "middle"],
        controller : function($scope){
            var colors = [];
            this.addcolor = function(color){
                colors.push(color);
            };
            this.getcolor = function(){
                return colors;
            }
        }, 
        link : function(scope, element, attrs, controllers){
            var middleController = controllers[1];
            var topController = controllers[0];
            
            middleController.addcolor(attrs.color);
            topController.setcolors(middleController.getcolor());

        }
    } 
});