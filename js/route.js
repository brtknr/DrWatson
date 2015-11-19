angular.module("touristApp")
  .config(['$routeProvider', function($routeProvider) {
    $routeProvider.
      when("/", {
        templateUrl: 'partials/home.html'
      
      })
      .when("/map/:from/:to", {
        templateUrl: 'partials/map.html',
        controller: function($routeParams) {
          var vm = this;
          vm.from = $routeParams.from;
          vm.to = $routeParams.to;
          
        },
        controllerAs: "vm"
      })
      .otherwise({redirectTo: "/"});
  }]);