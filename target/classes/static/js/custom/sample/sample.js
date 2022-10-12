$(document).ready(function(){
	$("#searchTimeStart").datepicker();  // 시작 날짜 
	$("#searchTimeEnd").datepicker();   // 종료 날짜
});
	// 페이징
	function goPage(page) {
		$('#list_form [name="pageNo"]').val(page);
		$('#list_form').submit();
	}

	//목록 화면으로 이동
	function goList(formId){
		$('#'+formId+' [name="mode"]').val("list");
		$('#'+formId+' [name="eventId"]').val("");
		$('#'+formId).submit();
	}
	
	//상세화면으로 이동
	function goDetail(formId,id){
		$('#'+formId+' [name="mode"]').val("detail");
		$('#'+formId+' [name="eventId"]').val(id);
		$('#'+formId).submit();
	}
	
	//등록화면으로 이동
	function goCreate(){
		$('#list_form [name="mode"]').val("create");
		$('#list_form').submit();
	}
	
	//수정화면으로 이동
	function goUpdate(){
		$('#detail_form [name="mode"]').val("update");
		$('#detail_form').submit();
	}


	//저장
	function goSave(mode){
		var eventId = $("[name=eventId]").val();
		var eventTime = $("[name=eventTime]").val();
		var eventCode = $("[name=eventCode]").val();
		var eventLocation = $("[name=eventLocation]").val();
		var mode = $("[name=mode]").val();
		
		if(mode == "create"){
			if(eventTime == "" || eventTime == null){
				alert("시간을 입력해주세요.");
				$("[name=eventTime]").focus();
				return;
			}
			if(eventCode == "" || eventCode == null){
				alert("이벤트를 입력해주세요.");
				$("[name=eventCode]").focus();
				return;
			}
			if(eventLocation == "" || eventLocation == null){
				alert("구간을 입력해주세요.");
				$("[name=eventLocation]").focus();
				return;
			}
			
			if(confirm("저장하시겠습니까 ?")){
				var params = $("[name=form_form]").serialize();
				rAjaxCall.async("/sample/ajaxCreate", 'POST', params, function(r) {
					if(r.result){
						alert(r.content);
						goList('page_form');
					}else{
						alert(r.content);
					}
				});
			}
		}else if(mode == "update"){
			if(eventTime == "" || eventTime == null){
				alert("시간을 입력해주세요.");
				$("[name=eventTime]").focus();
				return;
			}
			if(eventCode == "" || eventCode == null){
				alert("이벤트를 입력해주세요.");
				$("[name=eventCode]").focus();
				return;
			}
			if(eventLocation == "" || eventLocation == null){
				alert("구간을 입력해주세요.");
				$("[name=eventLocation]").focus();
				return;
			}
			
			if(confirm("수정하시겠습니까 ?")){
				var params = $("[name=form_form]").serialize();
				rAjaxCall.async("/sample/ajaxUpdate", 'POST', params, function(r) {
					if(r.result){
						alert(r.content);
						goDetail('page_form',eventId);
					}else{
						alert(r.content);
					}
				});
			}
		}
	}
	
	//삭제
	function goDelete(){
		if(confirm("삭제하시겠습니까 ?")){
			var params = $("[name=detail_form]").serialize();
			rAjaxCall.async("/sample/ajaxDelete", 'POST', params, function(r) {
				if(r.result){
					alert(r.content);
					goList('detail_form');
				}else{
					alert(r.content);
				}
			});
		}
	
	}