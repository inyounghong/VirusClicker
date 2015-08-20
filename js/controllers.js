app.controller('MainController', function($scope, $http){

	$scope.game = { score: 0, growth: 0.2 };

	$scope.microbes = [
		{"name": "Extra Spoke", 		"cost": 10, "count":0, "growth": 0.2, 	"spoke": 'spoke1', "req": 0},
		{"name": "Advanced Spoke", 		"cost": 20, "count":0, "growth": 0.4, 	"spoke": 'spoke2', "req": 0.6},
		{"name": "Cool Spoke", 			"cost": 100, "count":0, "growth": 1, 	"spoke": 'spoke3', "req": 1.2},
		{"name": "Super Spoke", 		"cost": 500, "count":0, "growth": 5, 	"spoke": 'spoke4', "req": 5},
		{"name": "Super Ultra Spoke", 	"cost": 3000, "count":0, "growth": 10, 	"spoke": 'spoke5', "req": 10},
		{"name": "Ultra Mega Spoke", 	"cost": 10000, "count":0, "growth": 25, 	"spoke": 'spoke6', "req": 25},
	]

	function addScore(amount){
		$scope.game.score += amount;
	}

	function subtractScore(amount){
		$scope.game.score -= amount;
	}

	function addGrowth(amount){
		$scope.game.growth += amount;
	}

	function reqMet(microbe){
		return $scope.game.growth >= microbe.req;
	}

	function addSpoke(img){
		var deg = Math.floor(Math.random() * 360);
		var style = "-ms-transform: rotate(" + deg + " deg); -webkit-transform: rotate(" + deg + "deg); transform: rotate(" + deg + "deg);";
		var spoke = '<img class="spoke" src="img/' + img + '.png" style="' + style + '">';
		console.log(spoke);
		$('#virus-box').append(spoke);
	}


	$scope.clickVirus = function(){
		addScore(1);
	}

	$scope.buyMicrobe = function(microbe){
		if ($scope.game.score >= microbe.cost){
			subtractScore(microbe.cost);
			addGrowth(microbe.growth);
			microbe.count += 1;
			microbe.cost = Math.floor(microbe.cost * 1.3);
			addSpoke(microbe.spoke);
		}
	}

	$scope.getIcon = function(microbe){
		if (reqMet(microbe)){
			return microbe.spoke;
		}
		return 'question';
	}

	$scope.getName = function(microbe){
		if (reqMet(microbe)){
			return microbe.name;
		}
		return "???";
	}

	$scope.highlight = function(microbe){
		var str = "";
		if (reqMet(microbe)){
			str += "available "
			if ($scope.game.score >= microbe.cost){
				str += "highlight ";
			}
		}
		
		return str;
	}

	// Score growth
	setInterval(function(){
		$scope.$apply(function(){
			addScore($scope.game.growth/10);
		})
	}, 100);
});