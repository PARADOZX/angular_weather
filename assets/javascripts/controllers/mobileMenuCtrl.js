app.controller('mobileMenuCtrl', function($scope){
    $scope.closeMobileMenu = function(){
        var mobileMenu = angular.element(document.querySelector('#mobile-menu'));
        mobileMenu.css('display', 'none');
    };
});


