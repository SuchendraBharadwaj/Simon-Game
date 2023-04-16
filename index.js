var button_colors=["red", "blue", "green", "yellow"];

// array for storing colors randomly generated by computer

var game_pattern=[];

// array for storing colors chosen by you

var chosen_color_arr=[];

// starting checking condition

var is_started=false;

var level=0;

// recognise any key being pressed and start the game

$(document).keypress(function(){
    setTimeout(function(){
        $("body").removeClass("game-over");
    },200);

    if(is_started==false){
        
        nextSequence();
        is_started=true;
    }
    
    
})


// recognise what has been clicked 

$(".btn").click(function () {

    // stores the id of the element which invoked the function
    var chosen_color=$(this).attr("id");
   
    chosen_color_arr.push(chosen_color);
    animate(chosen_color);
    play_sound(chosen_color);

    // index of the color chosen is sent
    checkAnswer(chosen_color_arr.length-1);

  });


  // check whether what you ahve pressed is matching with pattern or nor

  function checkAnswer(curr_level){
 
    // if your chosen color matches pattern

    if(game_pattern[curr_level]==chosen_color_arr[curr_level]){

        // if you have completed pattern
        if(game_pattern.length==chosen_color_arr.length){

            // after 1 second new level is started by nextsequence function

           setTimeout(function () {
                nextSequence();
              }, 1000);
        }
    }
    // wrong answer
    else{

        const audio = new Audio("sounds/wrong.mp3");
        audio.play();

        // game over is a class added in css by us

        $("body").addClass("game-over");

        // remove it after 0.2 sec

       

        $("h1").html("Game Over, Press Any Key to Restart");

        start_over();

       
    }
  }

  // next level as well as restart of the game is done by this function


  function nextSequence(){
    chosen_color_arr=[];

    level++;

    $("h1").html("Level " +level );

var a= Math.random();
var rand= Math.floor(a*4);



var rand_color=button_colors[rand];

game_pattern.push(rand_color);



$("#"+rand_color).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

play_sound(rand_color);
   

}


// for sounds 
function play_sound(name){
    const audio = new Audio("sounds/"+name+".mp3");
    audio.play();
   
}
  

// for flashy animations

 function animate(current_color){

    // pressed is a class added in css 
    
    $("#"+current_color).addClass("pressed");

    // remove it after 0.2 sec
    
    setTimeout(function(){
        $("#"+current_color).removeClass("pressed");
    },200);
  
}

// for restarting the game
function start_over(){
    level=0;
    is_started=false;
    game_pattern=[];
}

  
  


