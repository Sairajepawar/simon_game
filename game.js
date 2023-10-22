var colorSequence = [];
var colorAvaliable = ["green","red","yellow","blue"]
var beginning  = true;
var noOfLevel = 1;
var pre;

// play sound of respective button when pressed
function soundOnClick(temp)
{
    var path = "sounds/"+temp+".mp3";
    var audio = new Audio(path);
    audio.play();
}

function newSession(){
    // activate function when game is newly opened or previous game is over
    if(beginning){
        $(".btn-start").hide();
        beginning=false;
        pre = new Date();
        $(".result").hide();
        $(".time_taken").hide();
        // reset the sequence array
        colorSequence.splice(0,colorSequence.length);
        newLevel();
    }
}

// all operation required to continue to nextlevel
function newLevel(){
    //selecting random color
    var index = Math.floor(Math.random()*4);
    var newColor = colorAvaliable[index];
    colorSequence.push(newColor);
    //animating div with id same as the color
    $("#"+newColor).fadeOut();
    $("#"+newColor).fadeIn();
    //playing audio file of that respective color
    soundOnClick(newColor);
    //change title to level noOfLevel
    var levelTitle = "Level "+noOfLevel;
    //increament in the number of level
    noOfLevel=noOfLevel+1;
    // console.log(levelTitle);
    $("#level-title").text(levelTitle);
}
// animate the press even
function animatePress(temp){
    var target = "#"+temp;
    console.log(target);
    $(target).addClass("pressed");
    setTimeout(function(){
        $(target).removeClass("pressed");
    },100);
}

// start button press to start game
$(".btn-start").click(()=>{
    newSession();
})

//keypress to start game 
addEventListener("keypress",function(){
    newSession();
});

// iterator to check the sequence entered
var it = 0 ;
$(".btn").click(function(){
    var temp = $(this).attr("id");
    animatePress(temp);
    if(colorSequence[it]==temp)
    {
        it++;
        soundOnClick(temp);
    }
    else
    {
        //sequence not matched wrong answer
        // change title
        $("#level-title").text("Game Over, Press Any Key to Restart");
        soundOnClick("wrong"); //play the sound for failed level
        // animate the fail case
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");  
        },100)
        var statement1 = `Level Reached ${noOfLevel-1}`;
        var cur = new Date();
        var time = (cur-pre)/1000; //as Date case calculates time in milliseconds by default
        var statement2 = `Time Taken :- ${time} seconds`;
        $(".result").show();
        $(".time_taken").show();
        $(".result").text(statement1);
        $(".time_taken").text(statement2);
        noOfLevel = 1;
        beginning=true;
        $(".btn-start").show();
    }
    if(it==colorSequence.length)
    {
        it=0;
        setTimeout(newLevel,900);
    }
})


    
