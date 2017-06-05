//============================================================================
// Name        : app.js
// Author      : Hai Nguyen
// Version     :
// Copyright   : 2017
// Description : This file contains javascript and jquery code to play the 
//               totally trivial trivia game.
// Pseudocode  :
//
//============================================================================
var MAX = 10;
var number = MAX;
var intervalId;
var clockRunning = false;
var pos = 0;
var charA, charB, charC, charD;
var testQuestions = 
[
    {
        question: "<p class='show-text'>What was the first full length CGI movie?</p>",
        choices: ["A Bug's Life", "Monsters Inc.", "Toy Story", "The Lion King", "B"]
    },
    {
        question: "<p class='show-text'>Which of these is NOT a name of one of the Spice Girls?</p>",
        choices: ["Sporty Spice", "Fred Spice", "Scary Spice", "Posh Spice", "A"]
    },
    {
        question: "<p class='show-text'>Which NBA team won the most titles in the 90s?</p>",
        choices: ["New York Knicks", "Portland Trailblazers", "Los Angeles Lakers", "Chicago Bulls", "D"]
    },
    {
        question: "<p class='show-text'>Which group released the hit song, \"Smells Like Teen Spirit\"?</p>",
        choices: ["Nirvana", "Blackstreet Boys", "The Offspring", "No Doubt", "B"]
    },
    {
        question: "<p class='show-text'>Which popular Disney movie featured the song, \"Circle of Life\"?</p>",
        choices: ["Aladdin", "Hercules", "Mulan", "The Lion King", "D"]
    },
    {
        question: "<p class='show-text'>Finish this line from the Fresh Prince of Bel-Air theme song: \"I whistled for a cab and when it came near the license plate said ...\"</p>",
        choices: ["Dice", "Mirror", "Fresh", "Cab", "D"]
    },
    {
        question: "<p class='show-text'>Which was Dough's best friend's name?</p>",
        choices: ["Skeeter", "Mark", "Zach", "Cody", "C"]
    },
    {
        question: "<p class='show-text'>What was the name of the principle at Bayside High in Saved By The Bell?</p>",
        choices: ["Mr. Zhou", "Mr. Driggers", "Mr. Belding", "Mr. Page", "B"]
    }
];
var corrects = 0;
var wrongs = 0;
var unanswers = 0;
var wrongFl = false;
var unanswerFl = false;
var correctFl = false;
/*var correctAnsIntervalId;
var incorrectAnsIntervalId;
var counter = 3;

function displayCorrectResults()
{
    counter--;
    var tmpStr = "<p class='show-text'>Correct!</p>";
    $("#show-test").html(tmpStr);

    if (counter === 0)
    {
        clearInterval(correctAnsIntervalId);
    }
}

function displayIncorrectResults(answer)
{
    counter--;
    var tmpStr = "<p class='show-text'>Nope!</p><br>";
    tmpStr += "<p class='show-text'>The Correct Answer Was: " + answer + "</p>";
    $("#show-test").html(tmpStr);

    if (counter === 0)
    {
        clearInterval(incorrectAnsIntervalId);
    }
}

function displayCorrectAnswer()
{
    correctAnsIntervalId = setInterval(displayCorrectResults, 1000);
}

function displayIncorrectAnswer(answer)
{
    incorrectAnsIntervalId = setInterval(displayIncorrectResults, 1000, answer);
}*/

function displayResults()
{
    $("#show-number").html(""); //remove the game counter div
    var tmpStr = "<p class='show-text'>All Done!</p>";
    $("#show-test").html(tmpStr);
    tmpStr = "<p class='show-text'>Correct Answers: " + corrects + "</p>";
    $("#show-test").append(tmpStr);
    tmpStr = "<p class='show-text'>Incorrect Answers: " + wrongs + "</p>";
    $("#show-test").append(tmpStr);
    tmpStr = "<p class='show-text'>Unanswered: " + unanswers + "</p>";
    $("#show-test").append(tmpStr);
    tmpStr = "<button type='button' id='restart-button'>Start Over?</button>";
    $("#show-restart-button").html(tmpStr);
    //Check if Start Over button is clicked...Note: it must be added here, 
    //if not, it will not work.
    $("#restart-button").on("click", function() 
    {
        //remove Start button
        $("#show-restart-button").html("");

        //Execute the run function.
        run();
    });
}

function checkAnswer()
{
    var choices, yourChoice, answer;

    //get the multiple choices for each question
    choices = document.getElementsByName("choices");
    for (var i = 0; i < choices.length; i++)
    {
        //console.log(choices[i]);
        yourChoice = choices[i];
        answer = testQuestions[pos]["choices"][4];
        if (yourChoice.checked)
        {
            if (yourChoice.value === answer) 
            {
                console.log("Correct Answer!")
                correctFl = true;
                unanswerFl = false;
                wrongFl = false;
                break;
            }
            else
            {
                console.log("Wrong answer!");
                wrongFl = true;
                unanswerFl = false;
            }
        }
        else
        {
            console.log("Unselected!")
            unanswerFl = true;
        }
    }
   
    if (correctFl === true)
    {
        corrects++;
        correctFl = false; //reset
    }
    else if (wrongFl === true)
    {
        wrongs++;
        wrongFl = false; //reset
    }
    else if (unanswerFl === true)
    {
        unanswers++;
    }

    number = MAX; //reset our count down counter
    pos++; //advance to the next question
    displayTest(); // display the next question
}

function displayTest()
{
    if (pos >= testQuestions.length)
    {
        stop();
        displayResults();
        return false;
    }

    var testStr = "<form action=''><fieldset>";
    testStr += testQuestions[pos]["question"];
    charA = testQuestions[pos]["choices"][0];
    charB = testQuestions[pos]["choices"][1];
    charC = testQuestions[pos]["choices"][2];
    charD = testQuestions[pos]["choices"][3];
    testStr += "<input type='radio' name='choices' value='A' /><label>" + charA + "</label>";
    testStr += "<input type='radio' name='choices' value='B' /><label>" + charB + "</label>";
    testStr += "<input type='radio' name='choices' value='C' /><label>" + charC + "</label>";
    testStr += "<input type='radio' name='choices' value='D' /><label>" + charD + "</label>";
    testStr += "<br><br><br>";
    testStr += "<button type='button' id='submit-button' onclick='checkAnswer()'>Submit</button>" +
        "</fieldset></form>";
    $("#show-test").html(testStr);
}

function decrement()
{
    //Show the number in the #show-number tag.
    $("#show-number").html("<p class='show-text'><strong>Time Remaining: </strong>" + number + "</p>");
    $("#show-number").append("<p class='show-text'>(Question " + (pos+1) + " of " + testQuestions.length + ")</p><br>");

    number--;

    //the clockRunning flag allows the displayTest() function to run once.
    if (!clockRunning)
    {
        displayTest();
        clockRunning = true;
    }

    //  Once number hits zero...
    if (number === 0) 
    {
        //  ...run the stop function.
        //stop();
        number = MAX;
        clockRunning = false;
        pos++; //advance to the next question
        unanswers++; //count unanswer if number hits zero
    }
}
    
//The stop function
function stop() 
{
    //  Clears our intervalId
    //  We just pass the name of the interval
    //  to the clearInterval function.
    clearInterval(intervalId);
}

//The run function sets an interval
//that runs the decrement function once a second.
function run() 
{
    //each time the game starts, these variables get initialized.
    pos = 0;
    corrects = 0;
    wrongs = 0;
    unanswers = 0;
    wrongFl = false;
    unanswerFl = false;
    correctFl = false;
    clockRunning = false;
    number = MAX;
    intervalId = setInterval(decrement, 1000);
}

$(document).ready(function()
{
    //Check if Start button is clicked...
    $("#start-button").on("click", function() 
    {
        //remove Start button
        $("#show-start-button").html("");

        //Execute the run function.
        run();
    });
});
