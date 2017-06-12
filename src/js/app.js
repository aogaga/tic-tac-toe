(function(){

    'use strict';
    var playCount = 0; 
    
    var playerO = [];
    var playerX = [];
    
	const winCombinations = [ 
							[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], 
                            [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6] 
                            ];
   
	var Gamecanvas = document.querySelector("#canvas");

	/**
	 * Handles the click event of the boxes
	 */
	Gamecanvas.addEventListener("click", function(e) {
	//	console.log(e.target.id);
		playGame(e.target.id);
		
	});


	/**
	 *  Starts the game
	 */
	function playGame(id) {
		var box =  document.getElementById(id);
	
		if(playCount < 9){
			
			
			if(isPlayerMoveValid(box)){
				
			
				if((playCount % 2) == 0 ){
					
					playerX.push(parseInt(id));
					updateBox(id, "X");
					checkWins("Player X", playerX);
						
				}else{
					
					playerO.push(parseInt(id));
					updateBox(id, "O");	
					
					checkWins("Player O", playerO);
						
				}
					
				playCount++;
				
				
			}else{
				
				alertBox({text : "That was an invalid play", class: "error"});
							
			}
			
			
		}else{
			
			
			alertBox({text : "Game over no more plays", class: "error"});
			
		}
	
					
	}


	/**
	 * updates the screen
	 */

	function updateBox(elementId, updateText){
			var box =  document.getElementById(elementId);
			box.innerText = updateText;
		
	}
	

	/**
	 * validates clicks
	 */
	function isPlayerMoveValid(elem){
			if(elem.innerHTML == ""){
				return true;
			}
			
		return false;	
	}
	
	
	/**
	 * udate game status on the screen
	 */
	function alertBox(updateInfo){
		
		var element = document.getElementById("alert");
		element.innerHTML = updateInfo.text;
		element.className = updateInfo.class;
		
		setTimeout(function () {
			element.innerHTML = null;
			element.className = null;
		   }, 2000);
		
	}
	
	/**
	 * check if a winnder has been found
	 */
		
	function  checkWins(text, playerPlays) {
	
		winCombinations.forEach(function(item){
			if(JSON.stringify(item) === JSON.stringify(playerPlays)){
				endGame(text);
			}
		});
	}	
	
	
	
	/**
	 * 
	 * Blurs the screen and ends the game
	 * 
	 */
	function endGame(player){	
		var gamestat = document.getElementById("gamestat");
		gamestat.innerHTML = player + "  Won the game";	
									
		var pageblur = document.getElementById("pageblur");
		pageblur.className = "pageblur";
						
	}
	


}());