$(document).ready(function(){
	// 롤러 눈금 마킹
	$("#markingDiv > ul > .markingBtn").on({ 
		mouseleave: function() {
			var leaveId = $(this).attr("id");
			
			$(this).removeClass("on");
			$(".event_popup_focus").html("");
			$("#eventDiv > table > tbody > #"+leaveId).removeClass("on");
		},
		mouseover: function() {		
			var overId = $(this).attr("id");
			var eventAlarmHtml = $(".event_popup_div > #popup_"+overId).clone().wrapAll("<div/>").parent().html();
			
			$(this).addClass("on");			
			$(".event_popup_focus").html(eventAlarmHtml);
			$("#eventDiv > table > tbody > #"+overId).addClass("on");
		},
		click: function() {
			var idx = $(this).index();
			alarmIdx = $(this).index();
			var thisId = $(this).attr("id");
			
			// 이벤트 알림 메세지 HTML
			var eventAlarmHtml = $(".event_popup_div > #popup_"+thisId).clone().wrapAll("<div/>").parent().html();

			// 이벤트 알림 메세지 ID
			var clickId = $("#markingDiv > ul > li.selected").attr("id");


			console.log("thisId / "+thisId);
			console.log("clickId / "+clickId);
			if(popupMode != "dashStatePopup") { // 대시보드 - 상태변경 팝업
				if(thisId == clickId){
					$(this).removeClass("selected");	
					$("#markingDiv > ul > #"+clickId).removeClass("selected");
					$("#eventDiv > table > tbody > tr:eq("+idx+")").removeClass("selected");
					$(".event_popup_click").html("");
					
					dashboard_dasEventId = "";
					
				}else{
					$("#markingDiv > ul > #"+clickId).removeClass("selected");	
					$("#eventDiv > table > tbody > tr").removeClass("selected");			
					$(".event_popup_click").html(eventAlarmHtml);
					$("#eventDiv > table > tbody > #"+thisId).addClass("selected");
					$(this).addClass("selected");	
					
					dashboard_dasEventId = thisId;
				}
			} else { // 이벤트목록 - 상태변경 팝업
				$(".event_popup_click").html("");
				$("#eventDiv > table > tbody > tr").removeClass("selected");	
				$("#markingDiv > ul > #"+clickId).removeClass("selected");					
				$(this).addClass("selected");	
				$(".event_popup_click").html(eventAlarmHtml);
				$("#eventDiv > table > tbody > #"+thisId).addClass("selected");
					
				dashboard_dasEventId = thisId;
			}	
		}
	});
});