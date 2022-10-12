<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jstl/jstl.jsp"%>

<div class="dash_top_box_content">
	<p class="das_logo"></p>
	<div class="dash_roller_bottom"></div>
	<div class="dash_roller">
		<jsp:include page="./dashboard/conveyor_belt.jsp" />
	</div>
	
	<div class="dash_roller_marking"  id="markingDiv">
		<jsp:include page="./dashboard/roller_marking.jsp" /> 
	</div>
	
	<!-- 이벤트 팝업(알림) 세팅 -->
	<div class="event_popup_div DiNone"></div>
	<div class="event_popup_click"></div>
	<div class="event_popup_focus"></div>
	
</div>
