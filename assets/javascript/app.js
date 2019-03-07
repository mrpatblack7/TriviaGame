$(document).ready(function () {
    //button to start game when user clicks
    $("#start-button").on("click", gameState.startTimer);
});

var gameState = {

    //set timer for 60 seconds
    timeRemaining: 60,

    //hide start & page start timer
    startTimer: function () {
        $("#timer").text("Time remaining: " + gameState.timeRemaining);
        setInterval(gameState.countdown, 1000);
        $("#start-page").hide();
        trivia.displayQuestions();
    },
    //stop timer at 0
    countdown: function () {
        gameState.timeRemaining--;
        $("#timer").text("Time Remaining: " + gameState.timeRemaining);
        if (gameState.timeRemaining === 0) {
            gameState.stopTimer();
            $("#timer").empty();
        }
    },

    // stop timer & check answers
    stopTimer: function () {
        clearInterval();
        trivia.checkAnswers();
    },

    //clear questions and show results page
    showEndPage: function (numCorrect, numIncorrect, numUnanswered) {
        $("#end-page").show();
        $("#questions-box").empty();
        $("#timer").empty();
        $("#timer").hide();
        $("#correct-answers").text("Correct answers: " + numCorrect);
        $("#incorrect-answers").text("Incorrect answers: " + numIncorrect);
        $("#unanswered").text("Unanswered Questions: " + numUnanswered);
    }
}


var trivia = {

    //show questions from array of questions
    displayQuestions: function () {
        var divContainer = $("#questions-box");
        var answerGroup = $(".form-check");

        for (var i = 0; i < questionArray.length; i++) {

            divContainer.append('<div id="question">' + questionArray[i].question + '</div>');
            var answer1 = questionArray[i].answers[0];
            var answer2 = questionArray[i].answers[1];
            var answer3 = questionArray[i].answers[2];

            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer1 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer2 + '</label></div>');
            divContainer.append('<div class="form-check"><input class="form-check-input" type="radio" name="radio-group' + i + '" id="radio' + i + '"><label class="form-check-label" id="radio' + i + 'label" for="radio' + i + '">' + answer3 + '</label></div>');

        }

        var doneButton = '<button class= "btn btn-primary" id="done-button" type="submit">Done</button>';
        divContainer.append(doneButton);
        $("#done-button").on("click", gameState.stopTimer);

    },

    //check answers
    checkAnswers: function () {
        var correctAnswer;
        var userAnswer;
        var numCorrect = 0;
        var numIncorrect = 0;
        var numUnanswered = 0;



        for (var i = 0; i < questionArray.length; i++) {
            correctAnswer = questionArray[i].correct;
            userAnswer = $('input[id=radio' + i + ']:checked + label').text();

            if (userAnswer === correctAnswer) {
                numCorrect++;
            } else if (userAnswer === "") {
                numUnanswered++;
            } else if (userAnswer !== correctAnswer) {
                {
                    numIncorrect++;
                }
            }
        }
        gameState.showEndPage(numCorrect, numIncorrect, numUnanswered);

    },
}
// array of questions and answer options

var questionArray = [
    {
        question: "Which of the following types of wine does the wine merchant attempt to poison Daenerys with??",
        answers: ["Dornish Red", "Vale White", "Arbor Red"],
        correct: "Arbor Red"
    },
    {
        question: "Which of the direwolves died in season 1??",
        answers: ["Nymeria", "Ghost", "Lady"],
        correct: "Lady"
    },
    {
        question: "What house has a sigil of a silver trout??",
        answers: ["House Stark sigil", "House Tyrell sigil", "House Tully sigil"],
        correct: "House Tully sigil"
    },
    {
        question: "Which of the following is not a position on King Joffrey Baratheon's small council?",
        answers: ["Master of Seas", "Master of Ships", "The Hand of the King"],
        correct: "Master of Sea"
    },
    {
        question: "Which of the following are NOT one of the daughters/granddaughters of Walder Frey that Robb Stark could have chosen to marry?",
        answers: ["Waldra", "Waldina", "Mary"],
        correct: "Waldina"
    },
    {
        question: "What's the name of the explosive that gave the Lannisters the edge in the Battle of Blackwater?",
        answers: ["Wildfire", "Dragon Fire", "GodsFire"],
        correct: "Wildfire"
    },
    {
        question: "Whose skull was crushed like an egg by The Mountain's giant hands?",
        answers: ["Oberyn Martell", "Beric Dondarrion", "Lady the direwolf"],
        correct: "Oberyn Martell"
    },
    {
        question: "Who had molten gold poured over their head like a deadly Noel's House Party gunge tank?",
        answers: ["Robb Stark", "Khal Drogo", "Viserys Targaryen"],
        correct: "Viserys Targaryen"
    },
]