app.controller('titleCtrl', function($scope, $cookies, cityWeatherData){
   
   if ($cookies.get('city') !== undefined && $cookies.get('city') !== undefined) {
       var city = $cookies.get('city');
       var state = $cookies.get('state');
       cityWeatherData.getWeather(city, state);
   }
   
});