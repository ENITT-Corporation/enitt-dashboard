$(function(){
	
});


// 상세 화면으로 이동
function fncGoDetail(fSubId) {
	$('#f_form [name="mode"]').val("detail");
	$('#f_form [name="fileSubId"]').val(fSubId);
	$('#f_form').submit();
}

// 수정 화면으로 이동
function fncGoUpdate(fSubId) {
	$('#f_form [name="mode"]').val("update");
	$('#f_form [name="fileSubId"]').val(fSubId);
	$('#f_form').submit();
}

// 등록 화면으로 이동
function fncGoCreate(){
	$('#f_form [name="mode"]').val("create");
	$('#f_form').submit();
}
