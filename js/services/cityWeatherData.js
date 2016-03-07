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
            'http://api.wunderground.com/api/' + wunderground_API_key + '/forecast10day/q/' + state + '/' + city + '.json'
        ];
        
        var promise = asyncService.loadDataFromUrls(urls)
            .then(function(response){
        
                var data = {};
        
                console.log(response); //debug
        
                if(!response[0].data.current_observation) {
                    //display error via rootscope -- is there a better way to do this?
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
                    
                    //if that.cache already populated set reload boolean flag to true    
                    if(Object.keys(that.cache).length !== 0) reload = true;
                    
                    //clears previous error message if there was one upon succesful query
                    $rootScope.weatherDataError = '';
                    
                    data.location = co.display_location.full;
                    data.temp_f = co.temp_f;
                    data.temp_c = co.temp_c;
                    data.local_time = co.observation_time_rfc822;
                    data.last_updated = co.observation_time;
                    data.weather = co.weather;
                    
                    data.forecast = [];
                    for (day in fc.forecastday) {
                        data.forecast.push(fc.forecastday[day]);
                    }
                    
                    data.precipAnalysis = that.analyzePrecip(data.forecast);
                    
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
