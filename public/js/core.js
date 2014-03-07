// public/core.js
var adminFunctions = angular.module('adminFunctions', []);

function mainController($scope, $http) {
	$scope.formData = {};

	// when landing on the page, get all todos and show them
	$http.get('/admin/listUsers')
		.success(function(data) {
			$scope.users = data;
			console.log(data);
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
		$http.delete('/deleteuser/' + id)
			.success(function(data) {
				$scope.users = data;
				console.log(data);
			})
			.error(function(data) {
				console.log('Error: ' + data);
			});
	};

}