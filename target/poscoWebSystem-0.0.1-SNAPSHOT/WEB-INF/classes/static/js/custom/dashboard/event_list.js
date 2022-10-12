$(document).ready(function(){
	// 이벤트 목록 row
	$("#eventDiv > table > tbody > tr").on({ 
		mouseleave: function() {
			var leaveId = $(this).attr("id");
			$(this).removeClass("on");
			$(".event_popup_focus").html("");
			$("#markingDiv > ul > #"+leaveId).removeClass("on");
		},
		mouseover: function() {		
			var idx = $(this).index();
			var overId = $(this).attr("id");
			var eventAlarmHtml = $(".event_popup_div > .event_msg")[idx].outerHTML;
			
			$(this).addClass("on");			
			$(".event_popup_focus").html(eventAlarmHtml);
			$("#markingDiv > ul > #"+overId).addClass("on");
		},
		click: function() {
			var idx = $(this).index();
			alarmIdx = $(this).index();
			var thisId = $(this).attr("id");
			
			// 이벤트 알림 메세지 HTML
			var eventAlarmHtml = $(".event_popup_div > .event_msg")[idx].outerHTML;

			// 이벤트 알림 메세지 ID
			var clickId = $("#eventDiv > table > tbody > tr.selected").attr("id");

			if(popupMode != "dashStatePopup") { // 대시보드 - 상태변경 팝업
				if(thisId == clickId){
					$(this).removeClass("selected");	
					$("#markingDiv > ul > #"+clickId).removeClass("selected");
					$("#eventDiv > table > tbody > tr:eq("+idx+")").removeClass("selected");
					$(".event_popup_click").html("");
					
					dashboard_dasEventId = "";
					
				}else{
					$("#eventDiv > table > tbody > tr").removeClass("selected");	
					$("#markingDiv > ul > #"+clickId).removeClass("selected");			
					$(this).addClass("selected");	
					$(".event_popup_click").html(eventAlarmHtml);
					$("#markingDiv > ul > #"+thisId).addClass("selected");
					
					dashboard_dasEventId = thisId;
				}
			} else { // 이벤트목록 - 상태변경 팝업
				$(".event_popup_click").html("");
				$("#eventDiv > table > tbody > tr").removeClass("selected");	
				$("#markingDiv > ul > #"+clickId).removeClass("selected");					
				$(this).addClass("selected");	
				$(".event_popup_click").html(eventAlarmHtml);
				$("#markingDiv > ul > #"+thisId).addClass("selected");
					
				dashboard_dasEventId = thisId;
			}	
		}
	});
});