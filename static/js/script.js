var sscApp = angular.module('sscApp', ['ngRoute']);

sscApp.config(function($routeProvider) {
	$routeProvider

	// route for the home page.
	.when('/', {
		templateUrl: 'pages/home.html',
		controller: 'SunsetCoveController'
	})

	.when('/province/:provinceCode', {
		templateUrl: 'pages/province.html',
		controller: 'SunsetCoveController'
	})
})
// Scope.Model.
// Need to put Scope in it's own model.
// 

sscApp.controller('SunsetCoveController', function($scope, $http, filterFilter, $location) {
	$http.get('static/js/JSON/provinces.json')
       .then(function(res){
          $scope.listedProvinces = res.data.provinces;
          $scope.provinceData = $scope.listedProvinces;  
          $scope.reverse = true;
          $scope.column = 'provincePopulation';


          $scope.setSort = function(column) {
          	$scope.reverse = !$scope.reverse;
          	$scope.column = column;
          };

          $scope.filterString = '';
          $scope.setFilter = function(value) {
          	$scope.provinceData = filterFilter($scope.listedProvinces, $scope.filterString) 
          };


		$scope.go = function(provLoc) {
			console.log(provLoc);
			$location.path('province/'+provLoc);
		}

        });
});

sscApp.controller('SunsetCoveController', function($scope, $routeParams, filterFilter) {
	$scope.message = $scope.listedProvinces;
	$scope.prov = $routeParams.provinceCode;
	$scope.reverse = true;
    $scope.column = 'cityPopulation';
	
	angular.forEach($scope.listedProvinces, function(value, key){
		console.log(value.provinceCode)
		if(value.provinceCode === $scope.prov) {
			$scope.provinceName = value.provinceName;
			$scope.cities = value.topCities;
		}
	}) 
});