// app.controller('cookiesCtrl', function($scope, $cookies, $window){
//     var now = new $window.Date();
//     now.setDate(now.getDate()+2);
    
//     if($cookies.get('name') === undefined){
//         console.log('set cookies');
//         $cookies.put('name', 'Ling', {
//             expires : now
//         });
//     } else {
//         console.log('retrieve cookies');
//         $scope.cookieValue = $cookies.get('name');
//     }
    
// });



app.controller('headerCtrl', ['$scope', function($scope){
    $scope.showMobileSearch = function(){
        var mobileMenu = angular.element(document.querySelector('#mobile-menu'));
        mobileMenu.css('display', 'block');
    };
}]);
app.controller('homepageCtrl', ['$scope', '$location', '$rootScope','cityWeatherData', 'slider', function($scope, $location, $rootScope, cityWeatherData, slider){

    // var weekendcount = 0;

    //redirect to title page if cityWeatherData cache not populated
    if(Object.keys(cityWeatherData.getCache()).length === 0) $location.path('/');

    $scope.data = cityWeatherData.getCache(); 
    
    $scope.filter_precip = function(element) {
        if ( (element.rain || element.snow) && element.day < $scope.data.forecast[$scope.forecastdays].date.day) return true;
    };
    
    $scope.filter_weekend = function(element) {
        // weekendcount++;
        if ( element.date.weekday == "Saturday" || element.date.weekday == "Sunday") {
            // console.log(weekendcount);
            // weekendcount++;
            return true;  
        }
        // console.log(weekendcount);
        // weekendcount++;
        return false;
    };
    
    $scope.seven_days = function(){
        $scope.forecastdays=8; 
        $scope.pa_details=false;  
        $rootScope.$broadcast('seven');
        
        slider.init();
    };
    
    $scope.three_days = function(){
        $scope.forecastdays=4; 
        $scope.pa_details=false;
        $rootScope.$broadcast('three');
        
        slider.init();
    };
    
    console.log($scope.data);
    $scope.farenheit = true;
    $scope.pa_details = false;
    $scope.wa_details = false;
    
    //disable 3-day option
    // $scope.forecastdays = 4;
    $scope.forecastdays = 8;
    
    slider.init();
        
}]);
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
app.controller('mobileMenuCtrl', function($scope){
    $scope.closeMobileMenu = function(){
        var mobileMenu = angular.element(document.querySelector('#mobile-menu'));
        mobileMenu.css('display', 'none');
    };
});



app.controller('titleCtrl', function($scope, $cookies, cityWeatherData){
   
   if ($cookies.get('city') !== undefined && $cookies.get('city') !== undefined) {
      
       var city = $cookies.get('city');
       var state = $cookies.get('state');
       cityWeatherData.getWeather(city, state);
   }
   
});
app.directive('advisory', function($compile, textPreview){
    return {
        restrict: "E",
        replace: true,
        scope: {
            message: "@"
        },
        link: function(scope, element, attrs, controller) {
            var message = scope.message,
                preview = textPreview.newPreview(message),
                preview_message = preview.change(),
                markup = createMarkup(preview_message);
            
            element.append($compile(markup)(scope));
        
            attachEvent();
        
            //recursive function to dynamically attach event to new markup
            function attachEvent()
            {
                angular.element(document.querySelector('#preview'))
                    .on('click', function(){
                        preview_message = preview.change();
                        markup = createMarkup(preview_message);
                        element.empty().append($compile(markup)(scope));
                        
                        if(preview.getPreview())
                            angular.element(document.querySelector('#preview')).text('less');
                        else 
                            angular.element(document.querySelector('#preview')).text('more');
                            
                        attachEvent();
                    });
            }
            
            function createMarkup(string) {
                return "<p>"+ string +"<a id='preview'>more</a></p>"
            }
        }
    }
});


//LEFT OFF HERE 4/7
//PARAGRAPH PREVIEW OBJECT TO HIDE alert messages which are super long. Create a filter or directive implementing this.

//HTML
// <input type="button" id="crop" value="oh Hi" />
// <div id="preview">
// </div>


//JS
// var string = "Wind Advisory in effect from 2 PM this afternoon to 7 PM EDT this evening... The National Weather Service in Taunton has issued a Wind Advisory...which is in effect from 2 PM this afternoon to 7 PM EDT this evening. * Location...Rhode Island and eastern Massachusetts. * Winds...south 15 to 20 mph with gusts up to 50 mph. * Timing...this afternoon and early evening. * Impacts...strong wind gusts may result in some downed large tree limbs. Isolated power outages possible. Precautionary/preparedness actions... A Wind Advisory is issued when sustained winds are forecast to be 31 to 39 mph or gusts will range between 46 and 57 mph. Winds this strong are capable of Downing small tree limbs and branches...possibly causing isolated power outages. Driving can also be difficult...especially for high profile vehicles";

// appendText('preview', string);

// var preview = new Preview(string);

// document.getElementById('crop').onclick = function(){
//   var text = preview.change();
// 	appendText('preview', text);
// };

// function appendText(id, string)
// {
// 	document.getElementById(id).innerHTML = string;
// }

// function Preview(string)
// {

// 	var string = string,
//   		preview = false, 
//       cropText = '';

// 	var cropString = function(string) {
//   		if(!string) return false;
  
//       var words = string.split(' ');

//       if(words.length > 5) {
//           words = words.slice(0,5);
//       }

//       var cropped_para = words.join(' ');
//       return cropped_para;
//   }

// 	var previewString = function() {
//   		if(!cropText) {
// 					cropText = cropString(string);  	
//       }
//       return cropText;
//   }
  
//   this.change = function() {
//   	if(!preview) {
//     	preview = true;
//       return previewString();
//     }
//     if(preview) {
//     	preview = false;
// 			return string;
// 		}
//   }
// }
app.directive('afterRender', ['$timeout', function ($timeout) {
    var def = {
        restrict: 'A',
        terminal: true,
        transclude: false,
        link: function (scope, element, attrs) {
            $timeout(scope.$eval(attrs.afterRender), 0);  //Calling a scoped method
        }
    };
    return def;
}]);
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
                    icon_path = "assets/img/" + icon_lc + ".png",
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
app.directive('precipWarning', function(){
    return {
        restrict: "E",
        replace: true,
        link: function(scope, element, attr, ctrl) {

            var obj = JSON.parse(attr.ngDataObj);
            var amt = obj[attr.ngDataType];
            var time_of_day = '.';
            
            var day = obj[attr.ngDataType + '_day'],
                night = obj[attr.ngDataType + '_night'];
           
            if (day === 0 && night === 0) time_of_day = '.';
                else if (day !== 0 && night === 0) time_of_day = ' during the day.';
                else if (night !== 0 && day === 0) time_of_day = ' during the night.';
                else if (day > (amt * 0.8) && night !== 0) time_of_day = ' mostly during the day.';
                else if (night > (amt * 0.8) && day !== 0) time_of_day = ' mostly during the night.';
                else time_of_day = ' throughout the day.';
            
            if (amt > 0 && amt <= 0.1) {
                var msg = attr.ngDataType == 'rain' ? 'Drizzle' : 'Dusting of snow';
            } else if (amt > 0.1 && amt <= 0.3) {
                var msg = attr.ngDataType == 'rain' ? 'Light accumulation' : 'Light accumulation';
            } else if (amt > 0.3 && amt <= 1.0) {
                var msg = attr.ngDataType == 'rain' ? 'Moderate accumulation' : 'Light accumulation';
            } else if (amt > 1.0 && amt <= 2.0) {
                var msg = attr.ngDataType == 'rain' ? 'Moderate to Heavy accumulation' : 'Light accumulation';
            } else if (amt > 2.0 && amt <= 4.0) {
                var msg = attr.ngDataType == 'rain' ? 'Heavy accumulation' : 'Light to Moderate accumulation';
            } else if (amt > 4.0 && amt <= 6.0) {
                var msg = attr.ngDataType == 'rain' ? 'Extremely heavy accumulation' : 'Moderate accumulation';
            } else if (amt > 6.0 && amt <= 12.0) {
                var msg = attr.ngDataType == 'rain' ? 'End of Days' : 'Moderate to Heavy accumulation';
            } else if (amt > 12.0 && amt <= 36.0) {
                var msg = attr.ngDataType == 'rain' ? 'End of Days' : 'Extremly Heavy accumulation';
            } else if (amt > 36.0 && amt <= 1000.0) {
                var msg = attr.ngDataType == 'rain' ? 'End of Days' : 'End of Days';
            }
            
            element.prepend('<div>' + msg + time_of_day + '</div>');
        }
    }
})
app.directive('scroller', function($timeout, $rootScope, scrollerConstructor) {
    return {
        restrict: "E",
        replace: true,
        transclude: true,
        template: "<div id='scroll-ctnr'><ng-transclude></ng-transclude></div>",
        link: function(scope, element, attr, ctrl){
            var scroller = scrollerConstructor.newScroller();
            
            var prev_button = angular.element(document.querySelector('#forecast-prev')),
                next_button = angular.element(document.querySelector('#forecast-next'));
    
            $rootScope.$on('seven', function(){
                
                next_button.css('visibility', 'visible');
                prev_button.css('visibility', 'visible');
             
                $timeout(function(){
                    // scroller.reset(7);
                    scroller.setLiLength(7);
                    scroller.load();
                }, 0);
                
            });
            
            $rootScope.$on('three', function(){
                
                next_button.css('visibility', 'visible');
                prev_button.css('visibility', 'visible');
             
                $timeout(function(){
                    // scroller.reset(3);
                    scroller.setLiLength(3);
                    scroller.load();    
                }, 0);
                
            });
                
            $timeout(function(){
                // var scroller = scrollerConstructor.newScroller();
                scroller.init();
            }, 0);
            
            scope.previous = function(){
                var ret = scroller.scrollLeft();
    
                if(ret) {
                    prev_button.css('visibility', 'hidden');
                    next_button.css('visibility', 'visible');
                } else {
                    next_button.css('visibility', 'visible');
                }
            };
            
            scope.next = function(){
                var ret = scroller.scrollRight();
                
                if(ret) {
                    next_button.css('visibility', 'hidden');
                    prev_button.css('visibility', 'visible');
                } else {
                    prev_button.css('visibility', 'visible');
                }
            };
        }
    }
});
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
app.directive('weather', function(){
    return {
        restrict: 'E',
        replace: true,
        // template:'',
        link: function(scope, elem, attr, ctrl){
            scope.$watch('result', function(value){
                if (value === 'yes') {
                    var element = angular.element(document.querySelector('#change'));
                    element.css('width', '200px');
                }
            });
        }, 
        controller: function($scope) {
            $scope.testSubmit = function(){
                alert('what');
            }
        }
    }
})
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
app.filter('filterPrecip', function(){
    
    return function(element) {
    
        if ( (element.rain || element.snow) && element.day < $scope.data.forecast[0].date.day + $scope.forecastdays) return true;

    }
});
app.service('asyncService', function($http, $q) {
    this.loadDataFromUrls = function(urls) {
        var deferred = $q.defer();
        var urlCalls = [];
        
        angular.forEach(urls, function(url) {
            urlCalls.push($http.get(url));
        });
          
        $q.all(urlCalls)
            .then(function(results) {
                deferred.resolve(results); 
            },
            function(errors) {
                deferred.reject(errors);
            },
            function(updates) {
                deferred.update(updates);
            });
        
        return deferred.promise;
        
    };
});
app.service('cityWeatherData', function($http, $q, $location, $route, $rootScope, $cookies, asyncService){
    
    //using returned $http promise
    // this.getWeather = function(city, state){
    //     return $http.get('http://api.wunderground.com/api/' + wunderground_API_key + '/conditions/q/' + state + '/' + city + '.json')
    //             .then(function(response){
    //                 if(response.data.response.error) return { error : response.data.response.error.description }; 
    //                 console.log(response);
    //                 return {
    //                     currentTempF : response.data.current_observation.temp_f
    //                 }
    //             },
    //             function(httpError){
    //                 throw httpError.status + " : " + httpError.data;
    //             });
    // };
    
    //using $q deferred obj
    // this.getWeather = function(city, state){
    //     var deferred = $q.defer();
    //     $http.get('http://api.wunderground.com/api/' + wunderground_API_key + '/conditions/q/' + state + '/' + city + '.json')
    //         .then(function(response){
    //             console.log(response);
    //             deferred.resolve({
    //                 currentTempF : response.data.current_observation.temp_f
    //             });
    //         });
    //     return deferred.promise;
    // };
    
    this.cache = {};
    
    this.getWeather = function(city, state){
        
        var that = this;
        
        var urls = [
            'http://api.wunderground.com/api/' + wunderground_API_key + '/conditions/q/' + state + '/' + city + '.json',
            'http://api.wunderground.com/api/' + wunderground_API_key + '/forecast10day/q/' + state + '/' + city + '.json',
            'http://api.wunderground.com/api/' + wunderground_API_key + '/alerts/q/' + state + '/' + city + '.json'
        ];
        
        var promise = asyncService.loadDataFromUrls(urls)
            .then(function(response){
        
                var data = {};
        
                console.log(response); //debug
        
                if(!response[0].data.current_observation) {
                    //display error via rootscope -- is there a better way to do this?  error is shown on searchByCity partial
                    if(response[0].data.response.error){
                        $rootScope.weatherDataError = response[0].data.response.error.description;
                    } else $rootScope.weatherDataError = "No cities match your search query";
                    
                    return;
                }
        
                if(response) {
                    //parse response
                    var reload = false,
                        co = response[0].data.current_observation,
                        fc = response[1].data.forecast.simpleforecast;
                        al = response[2].data.alerts;
                    
                    //if that.cache already populated set reload boolean flag to true    
                    if(Object.keys(that.cache).length !== 0) reload = true;
                    
                    //clears previous error message if there was one upon succesful query
                    $rootScope.weatherDataError = '';
                    
                    data.location = co.display_location.full;
                    data.temp_f = co.temp_f;
                    data.temp_c = co.temp_c;
                    
                    var index = co.observation_time_rfc822.indexOf('-');
                    if(index !== -1) co.observation_time_rfc822 = co.observation_time_rfc822.slice(0, index-1);
                    
                    data.local_time = co.observation_time_rfc822;
                    data.last_updated = co.observation_time;
                    data.weather = co.weather;
                    
                    data.forecast = [];
                    for (day in fc.forecastday) {
                        data.forecast.push(fc.forecastday[day]);
                    }
                    
                    data.precipAnalysis = that.analyzePrecip(data.forecast);
                    
                    data.alerts = [];
                    for (alert in al) {
                        data.alerts.push(al[alert]);
                    }
                    
                    //persists data between views
                    that.cache = data;
                    
                    //sets cookie values and expiration to 1 day
                    var date = new Date();
                    date.setDate(date.getDate()+1);
                    $cookies.put('city', co.display_location.city, {expires:date});
                    $cookies.put('state', co.display_location.state, {expires:date});
                    
                    if(reload) 
                        $route.reload();  //if cache already populated (if you're not on title page) then reload
                    else 
                        $location.path('/home'); //if cache not populated (this means you should be on title page) then redirect to home
                }
                
            },
            function(httpError) {
                throw httpError.status + " : " + httpError.data;
            });  //end asyncService
            
        return promise;
    };
    
    this.analyzePrecip = function(forecast){
        var forecast_seven = forecast.slice(1,8),
            precip_three_total = 0,
            precip_seven_total = 0,
            precip_three_rain = 0,
            precip_three_snow = 0,
            precip_seven_rain = 0,
            precip_seven_snow = 0,
            results = {};
            
            results.precip_data = [],
            
        console.log(forecast_seven);
        
        for(var day in forecast_seven) {
            
            var day_data = {};
            
            if(day < 3) {
                precip_three_total += forecast_seven[day].qpf_allday.in;
                //qpf includes snow.  if there is qpf but no snow then we know it's all rain
                //(this is a moderately safe assumption) in the off chance that it rains AND snows in same day this would be incorrect.
                if (forecast_seven[day].qpf_allday.in > 0 && forecast_seven[day].snow_allday.in == 0) {
                    precip_three_rain += forecast_seven[day].qpf_allday.in;
                } else {
                    precip_three_rain += 0;
                }
                precip_three_snow += forecast_seven[day].snow_allday.in;
            } 
            
            precip_seven_total += forecast_seven[day].qpf_allday.in;
            if (forecast_seven[day].qpf_allday.in > 0 && forecast_seven[day].snow_allday.in == 0) {
                precip_seven_rain += forecast_seven[day].qpf_allday.in;
                day_data.rain = forecast_seven[day].qpf_allday.in;
            } else {
                precip_seven_rain += 0;
                day_data.rain = 0;
            }
            
            precip_seven_snow += forecast_seven[day].snow_allday.in;
            day_data.snow = forecast_seven[day].snow_allday.in;
            
            day_data.month = forecast_seven[day].date.monthname;
            day_data.day = forecast_seven[day].date.day;
            day_data.rain_day = forecast_seven[day].qpf_day.in;
            day_data.rain_night = forecast_seven[day].qpf_night.in;
            day_data.snow_day = forecast_seven[day].snow_day.in;
            day_data.snow_night = forecast_seven[day].snow_night.in;
            
            results.precip_data[day] = day_data;
            
        }
        
        results.precip_three_bool = (precip_three_total > 0) ? true : false;
        results.precip_seven_bool = (precip_seven_total > 0) ? true : false;
        
        results.precip_three_rain = precip_three_rain;
        results.precip_three_snow = precip_three_snow;
        results.precip_seven_rain = precip_seven_rain;
        results.precip_seven_snow = precip_seven_snow;
        
        return results;
        
    };
    
    this.getCache = function(){
        return this.cache;
    };
    
});

app.service('httpService', function($http){
    this.httpConnect = function(url){
        return $http.get(url);
    };
});
app.service('scrollerConstructor', function() {
    
    var Scroller = function Scroller(){
    
        var shown = 0,
            hidden = 0,
            lis_shown = [],
            lis_hidden = [],
            lis = document.getElementsByClassName("a"),
            lis_length_override = null,
            num_of_li = null,
            scroll_buttons = document.getElementsByClassName('scroll-button');
            
        this.setLiLength = function(length){
            lis_length_override = length;
        };
    
        this.load = function(){
    
            var width = window.innerWidth;
            
            var num_li = width/230;
            num_li = parseInt(num_li);
        
            shown = 0;
            hidden = 0;
            lis_shown = [];
            lis_hidden = [];
            
            var lis_length = lis_length_override || lis.length;
            
            for (var i=0; i<num_li; i++) {
                if(lis_length >= (i+1)) {
                    document.getElementById('li'+(i+1)).style.display = "inline-block";
                    shown++;
                    lis_shown.push(i);
                }
            }
            
            for(var j=num_li; j<lis_length; j++) {
                document.getElementById('li'+(j+1)).style.display = "none";
                hidden++;
                lis_hidden.push(j);
            }
            
            //scroll left is always initially hidden on load
            scroll_buttons[0].style.visibility = "hidden";
            
            if(lis_length <= num_li) {
                // scroll_buttons[0].style.visibility = "hidden";
                scroll_buttons[1].style.visibility = "hidden";
            } else {
                // scroll_buttons[0].style.visibility = "visible";
                scroll_buttons[1].style.visibility = "visible";    
            }
        };
        
        this.scrollRight = function() {
            
            var ls = lis_shown.shift();
            lis_hidden.push(ls);
            
            var ls2 = lis_hidden.shift();
            lis_shown.push(ls2);
        
            document.getElementById('li'+(ls+1)).style.display = "none";
            document.getElementById('li'+(ls2+1)).style.display = "inline-block";
    
            var lis_length = lis_length_override || lis.length;
   
            if(document.getElementById('li'+ lis_length).style.display == "inline-block") {
                return true;
            } else return false;
            
            //LEFT OFF HERE 4/21 ---- the problem with switching between 3 and 7-day views after scrolling seems to be 
//because the nodes are being reordered.  Angular seems to be confused when the nodes are reordered b/c
//if we don't reorder switching between 3 and 7-day views works.
            
            
            // for( var i = 0; i < lis_shown.length; i++ ){
            
            //     var first = 'li'+(lis_shown[i]+1),
            //         second = 'li'+(lis_shown[i+1]+1);
    
            //     if(i < lis_shown.length-1) {

            //         document.getElementById(first).parentNode.insertBefore(document.getElementById(second), document.getElementById(first).nextSibling);
            //     }
            // }
        };
        
        this.scrollLeft = function() {
            
            var ls = lis_shown.pop();
            lis_hidden.unshift(ls);
            
            var ls2 = lis_hidden.pop();
            lis_shown.unshift(ls2);
            
            document.getElementById('li'+(ls+1)).style.display = "none";
            document.getElementById('li'+(ls2+1)).style.display = "inline-block";
            
            if(document.getElementById('li1').style.display == "inline-block") {
                return true;
            } else return false;
            
            // for( var i = 0; i < lis_shown.length; i++ ){
            
            //     var first = 'li'+(lis_shown[i]+1),
            //         second = 'li'+(lis_shown[i+1]+1);
    
            //     if(i < lis_shown.length-1) {
            //         document.getElementById(first).parentNode.insertBefore(document.getElementById(second), document.getElementById(first).nextSibling);
            //     }
            // }
        };
        
        this.reset = function(length) {
            for( var i = 0; i < length; i++ ){
            
                var first = 'li'+(i+1),
                    second = 'li'+(i+2);
    
                if(i < length-1) {
                    document.getElementById(first).parentNode.insertBefore(document.getElementById(second), document.getElementById(first).nextSibling);
                }
            }
        };
        
        this.init = function() {
            
            var that = this;
            
            window.onresize = function(){
                that.load();
            };
            
            this.load();
        };
        
        // this.init();
    };

    this.newScroller = function(){
        return new Scroller();
    }
});
app.service('slider', function() {
    
    this.init = function(){
        setTimeout(function(){
            var mySwiper = new Swiper ('.swiper-container', {
                direction: 'horizontal',
                loop: false,
                nextButton: '.swiper-button-next',
                prevButton: '.swiper-button-prev',
                // slidesPerView: 3,
                freeMode: true,
                // freeModeMomentum: false,
                spaceBetween: 10,
                initialSlide: 0,
                breakpoints: {
                    // when window width is <= 320px
                    500: {
                      slidesPerView: 1,
                      spaceBetweenSlides: 10
                    },
                    // when window width is <= 480px
                    900: {
                      slidesPerView: 2,
                      spaceBetweenSlides: 20
                    },
                    // when window width is <= 640px
                    2000: {
                      slidesPerView: 3,
                      spaceBetweenSlides: 30
                    }
                }
            }); 
        }, 500);    
    };
    
});
app.service('textPreview', function() {
    
    function Preview(string)
    {
    	var string = string,
      		preview = true, 
            cropText = '';
    
    	var cropString = function(string) {
      	    if(!string) return false;
      
            var words = string.split(' ');
    
            if(words.length > 5) {
                words = words.slice(0,5);
            }
    
            var cropped_para = words.join(' ');
            return cropped_para;
        };
    
    	var previewString = function() {
      	    if(!cropText) {
			    cropText = cropString(string);  	
            }
            return cropText;
        };
      
        this.change = function() {
            
      	    if(preview) {
        	    preview = false;
                return previewString();
            }
        
            if(!preview) {
        	    preview = true;
    			return string;
    		}
        };
        
        this.getString = function(){
            return string;
        };
        
        this.getPreview = function(){
            return preview;  
        };
    }
    
    this.newPreview = function(string) {
        return new Preview(string);
    }
});