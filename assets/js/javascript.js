$(document).ready(function() {

var characterPicked;
	var enemyPicked;
	var enemyBattling = false;
	var playerWon;
	var enemies = [];

	var ryu = {
		name: "ryu",
		display: "Ryu",
		health: 135,
		attack: 8,
		baseAttack: 8,
		counterAttack: 12,
		iconPath: "assets/images/Ryu.jpg",
		charSpritePath: "assets/images/sprites/Ryu.gif",
		enemySpritePath: "assets/images/sprites/Ryu2.gif"
	};
	var ken = {
		name: "ken",
		display: "Ken",
		health: 100,
		attack: 10,
		baseAttack: 10,
		counterAttack: 13,
		iconPath: "assets/images/Ken.jpg",
		charSpritePath: "assets/images/sprites/Ken.gif",
		enemySpritePath: "assets/images/sprites/Ken2.gif"
	};
	var chunli = {
		name: "chunli",
		display: "Chun Li",
		health: 75,
		attack: 16,
		baseAttack: 16,
		counterAttack: 20,
		iconPath: "assets/images/ChunLi.jpg",
		charSpritePath: "assets/images/sprites/ChunLi.gif",
		enemySpritePath: "assets/images/sprites/ChunLi2.gif"
	};
	var bison = {
		name: "bison",
		display: "M. Bison",
		health: 200,
		attack: 2,
		baseAttack: 2,
		counterAttack: 11,
		iconPath: "assets/images/Bison.jpg",
		charSpritePath: "assets/images/sprites/Bison.gif",
		enemySpritePath: "assets/images/sprites/Bison2.gif"
	};
	var cammy = {
		name: "cammy",
		display: "Cammy",
		health: 100,
		attack: 14,
		baseAttack: 14,
		counterAttack: 17,
		iconPath: "assets/images/Cammy.jpg",
		charSpritePath: "assets/images/sprites/Cammy.gif",
		enemySpritePath: "assets/images/sprites/Cammy2.gif"
	};
	var akuma = {
		name: "akuma",
		display: "Akuma",
		health: 250,
		attack: 3,
		baseAttack: 3,
		counterAttack: 11,
		iconPath: "assets/images/Akuma.jpg",
		charSpritePath: "assets/images/sprites/Akuma.gif",
		enemySpritePath: "assets/images/sprites/Akuma2.gif"
	};

	var characters = [ryu, ken, chunli, bison, cammy, akuma];

	$(".enmyChars").hide(0);
	$("#newGame").hide(0);
	$("#attack").hide(0);

	$(".charThumb").on("click", function() {
		characterPicked = eval($(this).data("obj"));
		$("#playerCharArea").append('<img src="'+ characterPicked.charSpritePath + '" class="playerImage" data-obj="' + characterPicked.name + '">');
		newPlayerStats();
		$("#chooseChars").empty();
		for (i=0;i<characters.length;i++) {
			if (characters[i].name !== characterPicked.name) {
				$(".enmyChars").show(1000);

			}
		}
	});

	$(".enmyChars").on("click", function() {
		$("#newGame").show(1000);
		if (enemyBattling == false) {
			enemyPicked = eval($(this).data("obj"));
			console.log(enemyPicked);
			if (enemyPicked.name == characterPicked.name) {
				alert("Pick a different foe!");
				$(this).hide();
			} else {
			$("#enemyCharArea").append('<img src="'+ enemyPicked.enemySpritePath + '" class="enmyImage" id="enemyChar" data-obj="' + enemyPicked.name + '">');
			newEnemyStats();
			$("#attack").show(1000);
			$(this).hide();
			enemies.push(enemyPicked);
			enemyBattling = true;
		}
		}
	});



	$("#attack").on("click", function(){
		if (enemyBattling == true) {
			enemyPicked.health -= characterPicked.attack;
			characterPicked.attack += characterPicked.baseAttack;
			newEnemyStats();
			newPlayerStats();

			if (enemyPicked.health <= 0) {
				$("img").remove(".enmyImage");
				$("#enemyName").empty();
				$("#enemyHealth").empty();
				enemyBattling = false;

				if (enemies.length == 5) {
					var enemyAlive = false;
					for (i = 0; i < enemies.length; i++) {
						if (enemies[i].health > 0) {
							enemyAlive = true;
						}
					}
					if (enemyAlive == false) {
						playerWins = true;
						$("#attack").hide();
					}
				}

			
			
			} else {
				characterPicked.health -= enemyPicked.counterAttack;
				newPlayerStats();
					if (characterPicked.health <= 0) { //Checks to see if player has been defeated
						playerLoss = false;

						$("#attack").hide();
					}
				}
		}
	});

			

	$("#newGame").on("click", function() {
		location.reload();
	});
		


	



		function newPlayerStats() {
		$("#playerHealth").html("HP: " + characterPicked.health + "<br />Attack: " + characterPicked.attack);
		$("#playerName").html(characterPicked.display);
	}
	function newEnemyStats() {
		$("#enemyHealth").html("HP: " + enemyPicked.health + "<br />Attack: " + enemyPicked.attack);
		$("#enemyName").html(enemyPicked.display);
	}

	

});