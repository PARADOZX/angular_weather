app.controller('headerCtrl', ['$scope', function($scope){
    $scope.showMobileSearch = function(){
        var mobileMenu = angular.element(document.querySelector('#mobile-menu'));
        mobileMenu.css('display', 'block');
    };
}]);