var playerApp = angular.module('playerApp', ['ngRoute','ngAnimate']);

playerApp.config(['$routeProvider', function($routeProvider){
    $routeProvider
    .when('/home', {
        templateUrl: 'views/home.html',
        controller: 'SkController'
    })
    
    .when('/contact', {
        templateUrl: 'views/contact.html',
        controller: 'ContactController'
        
    }) 
    .when('/contact-success', {
        templateUrl: 'views/contact-success.html',
        controller: 'ContactController'
        
    }) 
    .when('/dir', {
        templateUrl: 'views/dir.html',
        controller: 'SkController'
    }).otherwise({
        redirectTo: '/home'
    });
}]);

playerApp.directive('randomPlayer', [function(){

    return {
        restrict: 'E',
        scope: {
          sk: '=',
          title: '='
        },
        transclude: true,
        templateUrl: 'views/random.html',
        replace: true,
        controller: function($scope){$scope.random = Math.floor(Math.random()*5);
        }
    };
}]);

// Controller to print the sk players in index.html
playerApp.controller('SkController', ['$scope','$http', function($scope, $http){

    $scope.removeP = function(player){
        var removedPlayer = $scope.Sk.indexOf(player);
        $scope.Sk.splice(removedPlayer,1);
       
       };
    
    $scope.addPlayer = function(){
        $scope.Sk.push({
            name: $scope.newPlayer.name,
            rank: parseInt($scope.newPlayer.rank),
            country: $scope.newPlayer.country,
            status: true
        });
        $scope.newPlayer.name = "",
        $scope.newPlayer.rank = "",
        $scope.newPlayer.country = ""
    };

    $scope.removeAll = function(){
        $scope.Sk = [];
    };

  

$http.get('data/player.json').then( function(response){
    $scope.Sk = response.data;
});



}]);

playerApp.controller('ContactController', ['$scope', '$location', function($scope, $location){

    $scope.send = function(name){
        $location.path('contact-success');
    };
    
    }]); 