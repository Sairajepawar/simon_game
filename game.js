var colorSequence = [];
var colorAvaliable = ["green","red","yellow","blue"]
var beginning  = true;
var noOfLevel = 1;
var pre;
function soundOnClick(temp)
{
    var path = "sounds/"+temp+".mp3";
    var audio = new Audio(path);
    audio.play();
}
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
function animatePress(temp){
    var target = "#"+temp;
    console.log(target);
    $(target).addClass("pressed");
    setTimeout(function(){
        $(target).removeClass("pressed");
    },100);
}
//keypress to start game only 
addEventListener("keypress",function(){
    if(beginning){
        newLevel();
        beginning=false;
        pre = new Date();
    }
});
var it = 0 ; //it will be used to iterate through colorSequnce as we keep clicking buttons
// for comparing the sequence entered by user with the answer
$(".btn").click(function(){
    var temp = $(this).attr("id");
    animatePress(temp);// issue here
    if(colorSequence[it]==temp)
    {
        it++;
        soundOnClick(temp);
    }
    else
    {
        //game over condition i.e input is not according to sequence
        $("#level-title").text("Game Over, Press Any Key to Restart");
        soundOnClick("wrong");
        $("body").addClass("game-over");
        setTimeout(function(){
            $("body").removeClass("game-over");  
        },100)
        // to display the result in terms of time taken and levels completed
        var statement1 = `Level Reached ${noOfLevel}`;
        // calculate time taken till now
        var cur = new Date();
        var time = (cur-pre)/1000; //as inbuilt function use milisecond as unit for time
        var statement2 = `Time Taken :- ${time} seconds`;
        $(".result").text(statement1);
        $(".time_taken").text(statement2);
        //reset the number of levels
        noOfLevel = 1;
        //reset the beginning condition
        beginning=true;
    }
    if(it==colorSequence.length)
    {
        it=0;
        setTimeout(newLevel,900);
    }
})


    
