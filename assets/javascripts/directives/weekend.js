app.directive('weekend', function(){
    
    var template = "<div>hello this is a {{test}}</div>",
    
        controller = function($scope){
        //deep copy data to dataCopy in controller so we can make changes freely without changing original data.
        //controller executes prior to template rendering that's why we created a directive controller; link executes 
        //after template rendering
        $scope.dataCopy = $scope.data;  
    };
    
    return {
        restrict: "E",
        replace: true,
        link: function(scope, element, attr, ctrl) {
            //Left off here 3/14 --- figure out a way to parse dataCopy and render weekend data using ngRepeat.
            //don't think link can be used here since link executes after template is rendered.  may have to do this in controller
            //or compile??  But compile doesn't have access to scope variables.
            //ORRRR we may be trying to do too much in this custom directive--- it may be simpler to use Angular's native 
            //directives to ng-repeat only the weekend days and parsing the inner data in the custom directive...
        },
        controller: controller,
        template: template
    }
})