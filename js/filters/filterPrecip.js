app.filter('filterPrecip', function(){
    
    return function(element) {
    
        if ( (element.rain || element.snow) && element.day < $scope.data.forecast[0].date.day + $scope.forecastdays) return true;

    }
});