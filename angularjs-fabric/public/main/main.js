angular.module('main', [
		'common.fabric',
		'common.fabric.utilities',
		'common.fabric.constants'
	])
	.run(function ($http) {
		$http.defaults.headers.common['Access-Control-Allow-Origin'] = '*';
	})

	.controller('MainCtrl', ['$scope', '$http', 'Fabric', 'FabricConstants', 'Keypress', function ($scope, $http, Fabric, FabricConstants, Keypress) {

		var url = 'http://localhost:8080/api/v1/image';
		$scope.fabric = {};
		$scope.FabricConstants = FabricConstants;
		$scope.myImages = [];

		//
		// Retrieve All designs
		// ================================================================
		$scope.getAllImages = function () {
			$http.get(url).then(
				function (response) {
					// success callback
					console.log(response);
					$scope.myImages = response.data;
				},
				function (response) {
					// failure callback
					console.log(response)
				}
			);
		}

		//
		// Creating Canvas Objects
		// ================================================================
		$scope.addShape = function (path) {
			$scope.fabric.addShape('http://fabricjs.com/assets/15.svg');
		};

		//
		// Saving Image
		// ================================================================

		$scope.saveImage = function () {

			var canvas = document.querySelector('canvas');
			var link = document.getElementById('save');

			$http.post(url, {
				image: canvas.toDataURL()
			}).then(
				function (response) {
					// success callback
					console.log(response)
				},
				function (response) {
					// failure callback
					console.log(response)
				}
			);

		};

		$scope.addImage = function () {
			// Get a reference to the file select input field
			var fileChooser = document.getElementById('fileChooser');

			// When a selection is made the "change" event will be fired
			fileChooser.addEventListener('change', handleFileSelect, false);

			function handleFileSelect(event) {
				// Get the FileList object from the file select event
				var files = event.target.files;

				// Check if there are files in the FileList
				if (files.length === 0) {
					return;
				}

				// For this example we only want one image. We'll take the first.
				var file = files[0];

				// Check that the file is an image
				if (file.type !== '' && !file.type.match('image.*')) {
					return;
				}

				// The URL API is vendor prefixed in Chrome
				window.URL = window.URL || window.webkitURL;

				// Create a data URL from the image file
				var imageURL = window.URL.createObjectURL(file);
				
				// loadAndDrawImage(imageURL);
				$scope.fabric.addImage(imageURL);
			}


			// $scope.fabric.addImage('http://stargate-sg1-solutions.com/blog/wp-content/uploads/2007/08/daniel-season-nine.jpg');
		};

		$scope.addImageUpload = function (data) {
			var obj = angular.fromJson(data);
			$scope.addImage(obj.filename);
		};

		//
		// Editing Canvas Size
		// ================================================================
		$scope.selectCanvas = function () {
			$scope.canvasCopy = {
				width: $scope.fabric.canvasOriginalWidth,
				height: $scope.fabric.canvasOriginalHeight
			};
		};

		$scope.setCanvasSize = function () {
			$scope.fabric.setCanvasSize($scope.canvasCopy.width, $scope.canvasCopy.height);
			$scope.fabric.setDirty(true);
			delete $scope.canvasCopy;
		};

		//
		// Init
		// ================================================================
		$scope.init = function () {
			$scope.fabric = new Fabric({
				JSONExportProperties: FabricConstants.JSONExportProperties,
				textDefaults: FabricConstants.textDefaults,
				shapeDefaults: FabricConstants.shapeDefaults,
				json: {}
			});
		};

		$scope.$on('canvas:created', $scope.init);

		Keypress.onSave(function () {
			$scope.updatePage();
		});



	}]);