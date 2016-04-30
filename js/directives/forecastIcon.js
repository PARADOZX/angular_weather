app.directive('forecastIcon', function(httpService){
    return {
        restrict: "E",
        replace: true,
        scope:{
            icon : "="
        },
        link: function(scope, element, attr, ctrl) {
            if(scope.icon) {
                var icon = scope.icon,
                    icon_lc = icon.replace(/\s/g, '').toLowerCase(),
                    icon_path = "img/" + icon_lc + ".png",
                    currentURL = window.location.href,
                    newURL = currentURL.substring(0, currentURL.indexOf('index'));
                
                var promise = httpService.httpConnect(newURL + icon_path);
                
                promise.then(function(result){
                    //if requested data is not empty
                    if(result.data !== '')
                        element.css('background-image', 'url(' + icon_path + ')');
                    else
                        console.log('image does not exist');
                }, function(error){
                    console.log("Error: " + error.status + ' ' + error.statusText);
                });
                    
            }    
        }
    }
})