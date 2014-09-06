/**
 * Created by JMBros on 9/5/14.
 */

/**
 * Description
 *
 * @param paragraphs  an array of the paragraphs that make up the text
 * @return            an array of the sentences that make up the text
 */

var FIRST_SENTENCE = 1;             // First Sentence Score Increase to be in master branch *******************************************************

function createSentenceArray (paragraphs){
    var sentenceArray = [];
    //console.log(sentenceArray.length);
    for (var block = 0; block < paragraphs.length; block++){
        var tempSentenceArray = paragraphs[block].split(/[.?;!]/);       ///";"|"."|"?"|"!"/);
        //console.log(paragraphs[block]);
        //console.log(tempSentenceArray);
        for (var sentenceNumber = 0; sentenceNumber < tempSentenceArray.length; sentenceNumber++){
            //console.log(tempSentenceArray[sentenceNumber]);
            var score = 0;
            if (sentenceNumber === 0)
                score += FIRST_SENTENCE;
            sentenceArray.push([tempSentenceArray[sentenceNumber], score])
        }
    }
    return sentenceArray;
}/**
 * Created by JMBros on 9/5/14.
 */

// TEST ENVIRONMENT
var test = ["NEWPORT, Wales — NATO struggled to find responses to new challenges as it concluded its summit meeting here on Friday, announcing limited steps to deter Russia in Eastern Europe and starting to marshal broader international support to confront radical Islamists in the Middle East.","The alliance said it would establish a rapid-reaction force with an essentially permanent presence in Eastern Europe and would enhance military cooperation with Ukraine.","But the limits of the alliance were visible, too. The United States and Britain used the meeting to try to advance their own emerging policies, especially toward the spread of the Islamic State in Iraq and Syria, while most members shied away from specific commitments to increase military spending."];
var answer = createSentenceArray (test);

console.log(answer);
