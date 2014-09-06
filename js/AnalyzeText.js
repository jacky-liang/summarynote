/**
 * Created by JMBros on 9/5/14.
 */

/**
 * Takes in an array of paragraphs and runs analysis on the text and returns an array of sentences listed in order of decreasing relevance
 *
 * @param paragraphs  an array of the paragraphs that make up the text
 * @return            an array of the sentences that make up the text
 */

var FIRST_SENTENCE = 1;             // First Sentence Score Increase to be in master branch *******************************************************

function createSentenceArray (paragraphs){          // creates a 2D array of sentences with each array containing a sentence and its repective score
    var sentenceArray = [];
    var keywords = getKeyWords();

    for (var block = 0; block < paragraphs.length; block++){
        var tempSentenceArray = paragraphs[block].split(/[.?;!]/);
        for (var sentenceNumber = 0; sentenceNumber < tempSentenceArray.length; sentenceNumber++){
            var currentSentence = tempSentenceArray[sentenceNumber];
            if (currentSentence != ""){
                var score = 0;
                if (sentenceNumber === 0)           // 1st sentence of paragraph receives additional points
                    score += FIRST_SENTENCE;
                score += scoreSentence(currentSentence, keywords);
                sentenceArray.push([currentSentence, score])
            }
        }
    }
    return sentenceArray;
}
/**
 * Created by JMBros on 9/5/14.
 */

function scoreSentence (sentence, keywords){                  // helper function to calculate the score of the sentence
    var score = 0;
    for (var i = 0; i < keywords.length; i++){
        var targetKeyWord = keywords[i];
        if (sentence.indexOf(targetKeyWord[0]) != -1)
            score += targetKeyWord[1];
    }
    return score;
}

function getKeyWords(){                             // returns array of key words
    return [["NATO",.95], ["Ukraine", .86], ["summit meeting", .79]];
}

// TEST ENVIRONMENT
var test = ["NEWPORT, Wales — NATO struggled to find responses to new challenges as it concluded its summit meeting here on Friday, announcing limited steps to deter Russia in Eastern Europe and starting to marshal broader international support to confront radical Islamists in the Middle East.","The alliance said it would establish a rapid-reaction force with an essentially permanent presence in Eastern Europe and would enhance military cooperation with Ukraine.","But the limits of the alliance were visible, too. The United States and Britain used the meeting to try to advance their own emerging policies, especially toward the spread of the Islamic State in Iraq and Syria, while most members shied away from specific commitments to increase military spending."];
var answer = createSentenceArray (test);

console.log(answer);
