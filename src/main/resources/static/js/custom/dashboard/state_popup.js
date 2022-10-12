$(document).ready(function(){
	
});

// 대시보드 : 팝업 - 상태 변경
function setUpdateDashEventState() {
	var eventId = $("#dashEventStateChange [name='eventId']").val();
	var eventStateNote = $("#eventStateNote").val();
	var eventStateCode = $("#dashEventStateChange [name='eventStateCode']").val();
	dashEventState = "Y";
	
	var params = {
			"eventId" : eventId,
			"eventStateCode" : eventStateCode,
			"eventStateNote" : eventStateNote
	};
	
	rAjaxCall.async("/event/ajaxInsertEventStateLog", 'POST', params, function(r) {
		if(eventStateCode == "STATE_03") {
			alarmIdx = 0;
		}
		alert(r.content);
		popClose('dashEventStateChange');
		getEventCntSetting();
		dasEvent();
		$("#eventStateNote").val("");
	});
}





