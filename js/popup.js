$('#login').click(function(){
	$('#login').hide();
	$('#summarize').css('display', 'inline-block');
	}
);

$('#summarize').click(function(){
	$('#summarize').hide();
	$('#progressbar').show();
	$('#progressbar > div').show();
})

$('#progressbar').click(function(){
	$('#progressbar').hide();
	$('#summarize').show();
	$('#added').show(100);

})