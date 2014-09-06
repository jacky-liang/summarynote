

$('.button').click(function(){
	$('.button').hide();
	$('#progressbar').show();
	$('#progressbar > div').show();
	$('#added').hide();
	}
);

$('#progressbar').click(function(){
	$('#progressbar').hide();
	$('.button').show();
	$('#added').show(100);

})