app.controller('mainWeatherCtrl', ['$scope', '$location', 'cityWeatherData', function($scope, $location, cityWeatherData){
    
    $scope.getWeather = function(location) {
        if ($scope.getWeatherForm.$valid) {
            
            //using returned $http promise
            // cityWeatherData.getWeather(location.city, location.state)
                // .then(function(weatherData){
                //     console.log(weatherData); 
                // });
            
            //using $q deferred obj    
            // var deferred = cityWeatherData.getWeather(location.city, location.state);
            // deferred.then(function(response){
            //   console.log(response); 
            // });
            
            cityWeatherData.getWeather(location.city, location.state);
            
        } 
    };
    
}]);