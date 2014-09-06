/**
 * Created by JonChu on 9/5/14.
 */


function splitText(a){
    var paragraphs = a.split(/\n/);
    return paragraphs;
}

function getText(a){
$.get( "http://access.alchemyapi.com/calls/url/URLGetText",{apikey: "8e895965b26a429e8571eb42821dce8f231697dd"
,url: a, outputMode: "json"}, function( data ) {
    var x = data.text;
    console.log(splitText(x));
    return x;
});}

var url = "http://www.nytimes.com/2014/09/06/world/europe/nato-summit.html?partner=rss&emc=rss";

getText(url);


