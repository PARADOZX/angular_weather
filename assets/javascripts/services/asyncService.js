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