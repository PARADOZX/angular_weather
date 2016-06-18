app.directive('changeBackground', function(httpService){
    return {
        restrict: "A",
        replace: true,
        link: function(scope, element, attr, ctrl) {
            if(scope.data.weather) {
                // var element = angular.element(document.querySelector('#home-container'));
                
                // //loads image as background based on current weather forecast
                // var forecast = scope.data.weather,
                //     image = forecast.replace(/\s/g, '').toLowerCase(),
                //     imagePath = "img/" + image + "-back.jpg",
                //     currentURL = window.location.href,
                //     newURL = currentURL.substring(0, currentURL.indexOf('index'));
                
                // var promise = httpService.httpConnect(newURL + imagePath);
                
                // promise.then(function(result){
                //     //if requested data is not empty
                //     if(result.data !== '')
                //         element.css('background-image', 'url(' + imagePath + ')');
                //     else
                //         console.log('image does not exist');
                // }, function(error){
                //     console.log("Error: " + error.status + ' ' + error.statusText);
                // });
                
                //changes background color based on current weather forecast
                var forecast = scope.data.weather;
                var homeContainer = angular.element(document.querySelector('#home-container'));
                
                var weatherToColor = {
                      'Clear' : ['#FFD285','#FFFF85'],
                      'Partly Cloudy' : ['#FFD285','#4A537D'],
                      'Overcast' : ['#CCD0E3','#4A537D'],
                      'Thunderstorm' : ['#CCD0E3','#4A537D'],
                      'Chance of a Thunderstorm' : ['#CCD0E3','#4A537D'],
                      'Rain' : ['#CCD0E3','#4A537D']
                };
                
                if(forecast) {
                    for(wtcForecast in weatherToColor) {
                        if(wtcForecast === forecast) {
                            homeContainer.css('background', 'linear-gradient(to bottom, ' + weatherToColor[forecast][0] + ', '+weatherToColor[forecast][1] +')');
                        }
                    }
                }
                    
            }    
            
        }
    }
})