app.controller('homepageCtrl', ['$scope', '$location', 'cityWeatherData', function($scope, $location, cityWeatherData){

    //redirect to title page if cityWeatherData cache not populated
    if(Object.keys(cityWeatherData.getCache()).length === 0) $location.path('/');

    $scope.data = cityWeatherData.getCache(); 
    
    console.log($scope.data);
    $scope.farenheit = true;
    $scope.pa_details = false;
    $scope.forecastdays = 4;
    
}]);