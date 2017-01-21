(function(){
    
var index;
var player1Array = [];
var player2Array = [];
var winningArray = [       
    [0, 4, 8],
    [2, 4, 6],
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8]
];

console.log(winningArray);
console.log(winningArray.length);
/* When the page loads, the startup screen should appear. Use the tictactoe-01-start.png mockup, and the start.txt HTML snippet to guide you. */

function startscreen (){
    
    $("#board").hide();  
    
    $("body").append("<div class='screen screen-start' id='start'><header><h1>Tic Tac Toe</h1><a href='#' class='button'>Start game</a></header</div>");
    
    $("#start .button").on("click", function() {
    $("#start").hide();
    $("#board").show();
    }); 
    
    game();

}

/*
Add programming, so that when the player clicks the start button the start screen disappears, the board appears, and the game begins. Use the tictactoe-02-inprogress.png mockup, and the board.txt HTML snippet to guide you.
*/ 
        

//Function which adding the right class to players and handle the hoover event.
function highlight(player){
    
    if (player === "player1" ) {
        $("#player1").addClass("active");    
        $("#player2").removeClass("active");
        
        //When mouse is hovered 
        $("li.box").hover(
            function(){
                $(this).css("background-image", "url(../img/o.svg)");
            }, function(){
                $(this).css("background-image", "");
                });
        
    } else if (player === "player2") {
        $("#player1").removeClass("active");
        $("#player2").addClass("active");  
        
        //When mouse is hovered
        $("li.box").hover(
            function(){
                $(this).css("background-image", "url(../img/x.svg)");
            }, function(){
                $(this).css("background-image", "");
                });
        
    }
}



//The game ends when one player has three of their symbols in a row either horizontally, vertically or diagonally. If all of the squares are filled and no players have three in a row, the game is a tie.


//Function that checks for tie.
function checkTie(){
    
    if (player1Array.length + player2Array.length === 9) {
    return true; 
    }
}
    
//Function that checks for winners    
function checkWinner(player) {
        for (var i=0; i < winningArray.length; i++){    
            var winNums = winningArray[i];

            for (var j=0; j < winNums.length; j++) {
                var num = winNums[j];
                var compare = player.indexOf(num);
                console.log(compare);
                

                if (compare === -1) {
                    break;
                }

                if(j === winNums.length - 1) {
                    console.log(player1Array);
                    console.log("we have a winner");
                    return true;
                    
                }
            } 
        }        
    }    


function game(){

//Starts with player one is active
highlight("player1");

$("li.box").on("click", function() {
        
    //Ceck if box is clicked and which players turn - fills square and change turn to next player. 
    if ($(this).attr("clicked") !== "true" && $("#player1").hasClass("active")) {
       
        $(this).attr("clicked","true").addClass("box-filled-1");                                   
        index = $(this).index();
        player1Array.push(index);
        highlight("player2");
        
        Tie = checkTie();
        winner = checkWinner(player1Array);
        
        if(!Tie && !winner ) {
        
        highlight("player2");    
        
        } else if(Tie) {
        gameOverScreen("Tie");
        } else if(winner) {
        gameOverScreen("player1");    
        }
        
        
        
    } else if ($(this).attr("clicked") !== "true" && $("#player2").hasClass("active")) {
        
        $(this).attr("clicked","true").addClass("box-filled-2"); 
        index = $(this).index();
        player2Array.push(index);
        highlight("player1");
        
        Tie = checkTie();
        winner = checkWinner(player2Array);
        
        if(!Tie && !winner ) {
        
        highlight("player1");    
        
        } else if(Tie) {
        gameOverScreen("Tie");
        } else if(winner) {
        gameOverScreen("player2");    
        }
        
        }
    });
}

    
/*Add the appropriate class to the <div> for the winning screen: <div class="screen screen-win" id="finish"> screen-win-one for player 1, screen-win-two for player two, or screen-win-tie if the game ends with no winner. 

For example, if player 1 wins, the HTML should look like this: <div class="screen screen-win screen-win-one" id="finish">*/
    
function gameOverScreen(result){
    
    $("#board").hide();

    if (result === "Tie") {                                 $("#start").show();
        $("a").before("<h2>It's a Tie!</h2>");
    
    } else if (result === "player1") {
      $("body").append("<div class='screen screen-win screen-win-one' id='finish'>" +
             "<header><h1>Tic Tac Toe</h1><p class='message'>"+ result + " wins</p><a href='#' class='button'>New game</a></header</div>");
        
    } else if (result === "player2") {
         $("body").append("<div class='screen screen-win screen-win-two' id='finish'>" +
        "<header><h1>Tic Tac Toe</h1><p class='message'>"+ result + " wins</p><a href='#' class='button'>New game</a></header</div>");
        }
    
    $(".button").on("click", function() {
        $("h2").remove();
    newGame();
    }); 
    
   
}    
    
function newGame() {    
    
    $("#start").hide();
    $("#finish").remove();
    $("#board").show();

    
    player1Array = [];
    player2Array = [];    
    $(".box").removeAttr("clicked").removeClass("box-filled-1 box-filled-2");    
    
    game();
    
}
        
startscreen();

})();


