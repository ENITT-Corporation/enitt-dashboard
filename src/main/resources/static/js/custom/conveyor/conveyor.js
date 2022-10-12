$(document).ready(function(){
	$("#timeStart").datepicker(); 
	$("#timeEnd").datepicker(); 
});

//검색
function goSearch() {
	var timeStart = $("[name=search_form] [name=timeStart]").val();
	var timeEnd = $("[name=search_form] [name=timeEnd]").val();
	if(timeStart > timeEnd){
		alert("시간의 시작 시간은 종료 시간보다 클 수 없습니다.");
		$("[name=search_form] [name=timeStart]").val("");
		return;
	}
	
	$('[name=search_form]').submit();
}

//페이징
function goPage(page) {
	$('[name=list_form] [name="pageNo"]').val(page);
	$('[name=list_form]').submit();
}

//엑셀 다운
function excelDown(){
	$('[name=list_form]').attr('action','/conveyor/excel/list');
	$('[name=list_form]').submit();
	$('[name=list_form]').attr('action','/conveyor');
}