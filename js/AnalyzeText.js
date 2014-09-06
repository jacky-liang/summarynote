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
var FIRST_SENTENCE = 2;                                                                 // First Sentence Score Increase
var TOPIC_SENTENCE = 1;                                                                 // First Sentence Score Increase
var SENTENCE_LENGTH_FACTOR = 300;                                                       // Sentence Length Factor (sentence length / factor is calculated)
var ALCHEMY_URL_T = "http://access.alchemyapi.com/calls/url/URLGetText";                // Alchemy URL
var ALCHEMY_URL_K = "http://access.alchemyapi.com/calls/url/URLGetRankedKeywords";      // Alchemy URL
var API_KEY = "8e895965b26a429e8571eb42821dce8f231697dd";                               // API Key for Alchemy API
var keywordsArray = [];                                                                           // Array of keywords
var sortedArray = [];                                                                   // Array of sentences in order of decreasing relevance

function analyzeText(website){
    $.get(ALCHEMY_URL_T, {apikey: API_KEY, url: website, outputMode: "json"}, function(dataText){
        $.get(ALCHEMY_URL_K,{apikey: API_KEY, url: website, outputMode: "json"}, function(data){
            for(var i = 0; i<50; i++){
                keywordsArray.push([data['keywords'][i]['text'], parseFloat(data['keywords'][i]['relevance'])]);
            }
            var x = dataText.text;
            var paragraphs = createParagraphArray(x);
            var sentences = createSentenceArray(paragraphs);
            sortedArray = sortArray(sentences);
            console.log(sortedArray);
        });
    });
}

function createParagraphArray(text){
    return text.split("\n");
}

function createSentenceArray (paragraphs){      // creates a 2D array of sentences with each array containing a sentence and its respective score
    var sentenceArray = [];
    var sentencePosition = 0;

    for (var block = 0; block < paragraphs.length; block++){
        var tempSentenceArray = paragraphs[block].split(/[.?;!]/);
        for (var sentenceNumber = 0; sentenceNumber < tempSentenceArray.length; sentenceNumber++){
            var currentSentence = tempSentenceArray[sentenceNumber];
            if (currentSentence != ""){
                var score = 0;
                if (sentencePosition === 0 || sentencePosition === 1)       // 1st 2 sentences of article receives additional points
                    score += FIRST_SENTENCE;
                if (sentenceNumber === 0)           // 1st sentence of each paragraph receives additional points
                    score += TOPIC_SENTENCE;
                score += scoreSentence(currentSentence);
                sentenceArray.push([currentSentence, score, sentencePosition]);
                sentencePosition ++;
            }
        }
    }
    return sentenceArray;
}

function scoreSentence (sentence){                  // helper function to calculate the score of the sentence
    var score = 0;
    for (var i = 0; i < keywordsArray.length; i++){
        var targetKeyWord = keywordsArray[i];
        if (sentence.indexOf(targetKeyWord[0]) != -1)
            score += targetKeyWord[1];
    }
    score -= sentence.length/SENTENCE_LENGTH_FACTOR;
    return score;
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
var url4 = "http://sports.yahoo.com/blogs/nba-ball-dont-lie/team-usa-handles-mexico-with-ease--heads-to-fiba-world-cup-quarterfinals-162855502.html";
var url5 = "http://en.wikipedia.org/wiki/Evernote";         // Evernote Wikipedia Article
var url6 = "http://www.economist.com/blogs/buttonwood/2012/07/economic-history";        // Econ 1 Article
var answer = analyzeText(url6);
console.log(answer);


