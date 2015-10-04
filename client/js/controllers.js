app.controller('ProjectController', function($scope, httpFactory, $timeout) {

	$scope.edit = false;
	$scope.findProject = "";
	$scope.success = false;


	getProjects = function(url) {
		httpFactory.get(url)
		.then(function(response) {
			$scope.projects = response.data;
		});
	};

	getProjects('/api/v1/projects');

	messageTimeout = function() {
		$scope.success = false;
	};

	$scope.postProject = function() {
		var payload = $scope.project;
		httpFactory.post('/api/v1/projects', payload)
		.then(function(response) {
			console.log(response);
			$scope.projects.push(response.data);
			$scope.project = {};
			$scope.success = true;
			$scope.message = 'Added a new Project!';
			$timeout(messageTimeout, 3000);
		});
	};

	$scope.editProject = function(id) {
		$scope.findProject = '/api/v1/project/' + id;
		httpFactory.get($scope.findProject)
		.then(function(response) {
			$scope.project = response.data;
			console.log($scope.project);
		});
		$scope.edit = true;
	};

	$scope.updateProject = function() {
		var update = $scope.project;
		httpFactory.put($scope.findProject, update)
		.then(function(response) {
			console.log(response);
			getProjects('/api/v1/projects');
			$scope.project = {};
			$scope.edit = false;
			$scope.success = true;
			$scope.message = 'Edited the project!';
			$timeout(messageTimeout, 3000);
		});
	};

	$scope.removeProject = function(id) {
		$scope.findProject = '/api/v1/project/' + id;
		httpFactory.delete($scope.findProject)
		.then(function(response) {
			console.log(response);
			getProjects('/api/v1/projects');
			$scope.success = true;
			$scope.message = 'Delete the Project!';
			$timeout(messageTimeout, 3000);
		});
	};


});