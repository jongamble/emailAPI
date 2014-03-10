// public/core.js
var adminFunctions = angular.module('adminFunctions', []);

function adminController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all todos and show them
	$http.get('/admin/listUsers')
		.success(function(data) {
			$scope.users = data;
			//console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	// $scope.createTodo = function() {
	// 	$http.post('/api/todos', $scope.formData)
	// 		.success(function(data) {
	// 			$scope.formData = {}; // clear the form so our user is ready to enter another
	// 			$scope.todos = data;
	// 			console.log(data);
	// 		})
	// 		.error(function(data) {
	// 			console.log('Error: ' + data);
	// 		});
	// };

	// delete a todo after checking it
	$scope.deleteUser = function(id) {
		$http.delete('/admin/deleteuser/' + id)
			.success(function(data) {
				$scope.users = data;
				//console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

};


var profileFunctions = angular.module('profileFunctions', []);

function profileController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all todos and show them
	$http.get('/profile/listLeads')
		.success(function(data) {
			$scope.leads = data;
			//console.log(data);
		})
		.error(function(data) {
			console.log('Error: ' + data);
		});

	// when submitting the add form, send the text to the node API
	// $scope.createTodo = function() {
	// 	$http.post('/api/todos', $scope.formData)
	// 		.success(function(data) {
	// 			$scope.formData = {}; // clear the form so our user is ready to enter another
	// 			$scope.todos = data;
	// 			console.log(data);
	// 		})
	// 		.error(function(data) {
	// 			console.log('Error: ' + data);
	// 		});
	// };

	// delete a todo after checking it
	$scope.deleteLead = function(id) {
		$http.delete('/profile/deleteLead/' + id)
			.success(function(data) {
				$scope.users = data;
				//console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}