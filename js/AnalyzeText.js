/**
 * Created by JMBros on 9/5/14.
 */

/**
 * Takes in an array of paragraphs and runs analysis on the text and returns an array of sentences listed in order of decreasing relevance
 *
 * @param paragraphs  an array of the paragraphs that make up the text
 * @return            an array of the sentences that make up the text
 */

// FINAL VARIABLES
var FIRST_SENTENCE = 10;                                                     // First Sentence Score Increase
var TOPIC_SENTENCE = 1;                                                     // First Sentence Score Increase
var ALCHEMY_URL = "http://access.alchemyapi.com/calls/url/URLGetText";      // Alchemy URL
var API_KEY = "8e895965b26a429e8571eb42821dce8f231697dd";                   // API Key for Alchemy API
var sortedArray = [];                                                       // Array of sentences in order of decreasing relevance

function analyzeText(website){
    $.get(ALCHEMY_URL, {apikey: API_KEY,url: website, outputMode: "json"}, function(data){
        var x = data.text;
        var paragraphs = createParagraphArray(x);
        var keywords = getKeyWords(website);
        var sentences = createSentenceArray(paragraphs, keywords);
        sortedArray = sortArray(sentences);
        console.log(sortedArray);
    });
}

function createParagraphArray(text){
    var paragraphArray = [];
    paragraphArray = text.split("\n");
    return paragraphArray;
}

function createSentenceArray (paragraphs, keywords){          // creates a 2D array of sentences with each array containing a sentence and its repective score
    var sentenceArray = [];
    var sentencePosition = 0;

    for (var block = 0; block < paragraphs.length; block++){
        var tempSentenceArray = paragraphs[block].split(/[.?;!]/);
        for (var sentenceNumber = 0; sentenceNumber < tempSentenceArray.length; sentenceNumber++){
            var currentSentence = tempSentenceArray[sentenceNumber];
            if (currentSentence != ""){
                var score = 0;
                if (sentencePosition === 0 || sentencePosition === 1)         // 1st sentence of article receives additional points
                    score += FIRST_SENTENCE;
                if (sentenceNumber === 0)           // 1st sentence of each paragraph receives additional points
                    score += TOPIC_SENTENCE;
                score += scoreSentence(currentSentence, keywords);
                sentenceArray.push([currentSentence, score, sentencePosition])
                sentencePosition ++;
            }
        }
    }
    return sentenceArray;
}

function scoreSentence (sentence, keywords){                  // helper function to calculate the score of the sentence
    var score = 0;
    for (var i = 0; i < keywords.length; i++){
        var targetKeyWord = keywords[i];
        if (sentence.indexOf(targetKeyWord[0]) != -1)
            score += targetKeyWord[1];
    }
    return score;
}

function getKeyWords(url){                             // returns array of key words
    url = "";
    return [["NATO",.95], ["Ukraine", .86], ["summit meeting", .79]];
}

function sortArray(arr){
    arr = arr.sort(function(a,b) {
        return b[1] - a[1];
    });
    return arr;
}



// TEST ENVIRONMENT

var url1 = "http://www.nytimes.com/2014/09/06/world/europe/nato-summit.html?partner=rss&emc=rss";
var url2 = "http://nyti.ms/1pxmTUw";
var url3 = "http://time.com/3281851/obama-immigration-midterms-elections/";
var answer = analyzeText(url1);
console.log(answer);


