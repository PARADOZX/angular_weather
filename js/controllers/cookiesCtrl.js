app.controller('cookiesCtrl', function($scope, $cookies, $window){
    var now = new $window.Date();
    now.setDate(now.getDate()+2);
    
    if($cookies.get('name') === undefined){
        console.log('set cookies');
        $cookies.put('name', 'Ling', {
            expires : now
        });
    } else {
        console.log('retrieve cookies');
        $scope.cookieValue = $cookies.get('name');
    }
    
});