app.service('httpService', function($http){
    this.httpConnect = function(url){
        return $http.get(url);
    };
});