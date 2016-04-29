app.controller('homepageCtrl', ['$scope', '$location', '$rootScope','cityWeatherData', function($scope, $location, $rootScope, cityWeatherData){

    //redirect to title page if cityWeatherData cache not populated
    if(Object.keys(cityWeatherData.getCache()).length === 0) $location.path('/');

    $scope.data = cityWeatherData.getCache(); 
    
    $scope.filter_precip = function(element) {
        if ( (element.rain || element.snow) && element.day < $scope.data.forecast[$scope.forecastdays].date.day) return true;
    };
    
    $scope.filter_weekend = function(element) {
        if ( element.date.weekday == "Saturday" || element.date.weekday == "Sunday") return true;  
        return false;
    };
    
    $scope.seven_days = function(){
        $scope.forecastdays=8; 
        $scope.pa_details=false;  
        $rootScope.$broadcast('seven');
    };
    
    $scope.three_days = function(){
        $scope.forecastdays=4; 
        $scope.pa_details=false;
        $rootScope.$broadcast('three');
    };
    
    console.log($scope.data);
    $scope.farenheit = true;
    $scope.pa_details = false;
    $scope.forecastdays = 4;
    
}]);