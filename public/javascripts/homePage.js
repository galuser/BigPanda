var myApp = angular.module("mainApp", []);

myApp.directive("insertComments", function(){
    return{
        restrict: 'A',
        templateUrl: "/html/insert_comments.html"
    }
});

myApp.directive("viewComments", function(){
    return{
        restrict: 'A',
        templateUrl: "/html/view_comments.html"
    }
});

myApp.directive("commentForm", function(){
    return{
        restrict: 'A',
        templateUrl: "/html/comments_form.html"
    }
});

myApp.controller('postController', function($scope, $http) {

    $scope.user = {};

    $scope.submitForm = function() {

        $http({
            method  : 'POST',
            url     : '/send',
            data    : $scope.user
        })
            .success(function(data) {
                if (data.errors) {
                    $scope.errorName = data.errors.name;
                    $scope.errorMessage = data.errors.message;
                } else {
                    $scope.message = data.message;
                }
            });
    };
});

myApp.controller("viewController", function($scope, $http){

    $http.get("/get").success(function(response){
        $scope.comments = response;
    });
    
});
