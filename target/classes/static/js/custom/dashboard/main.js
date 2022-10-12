$(document).ready(function(){
	// 장비 상태 1분마다 갱신
	fncSetting();
	
	setInterval(fncSetting, 3000);
	setInterval(eventLogCnt, 60000); //1분
	//setInterval(conveyorState, 60000);
});


var dashboard_dasEventId="";
var dashboard_dasEventCnt = 0;
var dashEventState="";
var alarmIdx=0;


function fncSetting() {
	conveyorState();
	eventCnt();
}


// trend 차트 실행
function ajaxMainClickTrendView() {
	rAjaxCall.async("/dashboard/ajaxMainClickTrendView", 'POST', null, function(data) {	
	});
}

//이벤트 메세지 클릭 시, trend 차트 실행
function ajaxExecuteTrendChart(eventTime, eventLocation) {
	var param = {
			"trendCheck" : 'Y'
			, "dashboard_dasEventId" : dashboard_dasEventId
			, "eventTime" : eventTime
			, "eventLocation" : eventLocation
	};
	
	
	rAjaxCall.async("/dashboard/ajaxExecuteTrendChart", 'POST', param, function(data) {	
	//	ajaxExecuteTrendChartAll();
		if(data.result) {
			alert(data.content);
		}
	});
}

//롤러 눈금 클릭 시, trend 차트 실행
function ajaxExecuteTrendChartAll(trendLocation) {	
	var param = {
			"trendMarkingCheck" : 'Y'
			, "trendLocation" : trendLocation
	};
	
	rAjaxCall.async("/dashboard/ajaxExecuteTrendChartAll", 'POST', param, function(data) {
	});
}

// 장비 상태
function equipmentState() {                                                                                                                                                                                                                                                                     
	var param = {};
	rAjaxCall.asyncH("/dashboard/content/equipmentState", 'POST', param, function(data) {
		$('.equipment').html("");
		$('.equipment').html(data);
	});
}

// 컨베이어 벨트 상태
function conveyorState() {
	
	// 컨베이어 벨트 상태
	rAjaxCall.asyncH("/dashboard/content/conveyorState", 'POST', null, function(data) {
		$('.conveyor_state').html("");
		$('.conveyor_state').html(data);
	});
	
	// 대시보드 컨베이어 벨트 상태
	rAjaxCall.asyncH("/dashboard/content/dashConveyorState", 'POST', null, function(data) {
		$('.dash_roller').html("");
		$('.dash_roller').html(data);
	});
}

// 발생된 이벤트 로그 개수
function eventLogCnt() {
	rAjaxCall.async("/dashboard/ajaxEventLogCnt", 'POST', null, function(data) {
		$.each(data, function(index, value) {
			var newEventLog = value.eventLogCount;
			var eventLog = $("#eventDiv > table > tbody > tr").eq(index).find("td").eq(3).text();
			
			if(newEventLog != eventLog) {
				$(".event_popup_click").html("");
				$(".event_popup_div > .event_msg").eq(index).find("span.popup_event_log_count").text(newEventLog);
				var eventAlarmHtml = $(".event_popup_div > .event_msg")[index].outerHTML;
				$("#eventDiv > table > tbody > tr").eq(index).find("td").eq(3).html(newEventLog);				
				$(".event_popup_click").html(eventAlarmHtml);
			}
		});
	});
}

// 발생된 이벤트 개수
function eventCnt() {
	var param = {
		"dashboard" : "Y"
		, "eventLastTime" : $("#eventLastTime").val()
	};
	
	rAjaxCall.async("/dashboard/ajaxEventCnt", 'POST', param, function(data) {
	
		if(data.eventNewCnt > 0){ // 새로운 이벤트가 들어왔을 경우
			dasEvent();
		} else { // 새로운 이벤트가 없을 경우
			if(data.eventCnt == 0){ // 상태가 처리 완료 되어, 이벤트 목록이 없을 경우
				$('.event_popup_click').html("");
			} else {
				if(dashboard_dasEventCnt != data.eventCnt) { // 이벤트 개수가 맞지 않았을 경우
					dasEvent();
				}
			}
		}
		dashboard_dasEventCnt = data.eventCnt;
	});
}


// 페이지 로딩 시, 새로 들어 온 이벤트 아이콘 및 메시지 노출
function dasEvent() {
	var param = {
		"dashboard" : "Y"
		, "eventLastTime" : $("#eventLastTime").val()
		, "dashboard_dasEventId" : dashboard_dasEventId
	};
	
		rAjaxCall.asyncH("/dashboard/content/ajaxEventList", 'POST', param, function(data) {
			$('.dash_box_content').html("");
			$('.dash_box_content').html(data);
			
			rAjaxCall.asyncH("/dashboard/content/ajaxEventAlarm", 'POST', param, function(data) {
				$('.event_popup_div').html("");
				$('.event_popup_div').html(data);
					
				rAjaxCall.asyncH("/dashboard/content/ajaxRollerMarking", 'POST', null, function(data) {
					$('.dash_roller_marking').html(data);
					
					// 대시보드에서 상태 변경 시, 알림 메시지 및 상태 변경 보여주기	
					var alarmHtml=""
					if(dashEventState == 'Y'&& alarmIdx != 0) {
						dashEventState = "";
						
						alarmHtml = $(".event_popup_div > .event_msg")[alarmIdx].outerHTML;
						$('.event_popup_click').html("");
						$(this).trigger('click');	
							
						if(alarmHtml != "") {
							$('.event_popup_click').html(alarmHtml);
						}
					} else if(alarmIdx == 0) { 
						$('#eventDiv > table > tbody > tr:eq(0)').trigger('click');
					}
				});			
				
			});
		});	
}
