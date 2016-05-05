app.directive('changeBackground', function(httpService){
    return {
        restrict: "A",
        replace: true,
        link: function(scope, element, attr, ctrl) {
            if(scope.data.weather) {
                // var element = angular.element(document.querySelector('#home-container'));
                
                var forecast = scope.data.weather,
                    image = forecast.replace(/\s/g, '').toLowerCase(),
                    imagePath = "img/" + image + "-back.jpg",
                    currentURL = window.location.href,
                    newURL = currentURL.substring(0, currentURL.indexOf('index'));
                
                var promise = httpService.httpConnect(newURL + imagePath);
                
                promise.then(function(result){
                    //if requested data is not empty
                    if(result.data !== '')
                        element.css('background-image', 'url(' + imagePath + ')');
                    else
                        console.log('image does not exist');
                }, function(error){
                    console.log("Error: " + error.status + ' ' + error.statusText);
                });
                    
            }    
            
        }
    }
})