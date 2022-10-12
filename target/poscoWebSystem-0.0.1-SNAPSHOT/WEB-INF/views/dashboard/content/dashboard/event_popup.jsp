<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jstl/jstl.jsp"%>

<c:forEach var="data" items="${dasEventList}" varStatus="status"> 
	<div class="event_msg <c:out value="${commonVO.dashboard_dasEventId eq data.eventId ? 'selected':''}" /> <c:out value="${data.eventStateCode}" />" id="popup_<c:out value="${data.eventId}" />" style="right:<c:out value="${data.locationRight}" />px; bottom:<c:out value="${data.locationBottom+55}" />px;">
		<div class="event_msg_title <c:out value="${data.eventStateCode}" />">
			<p>이벤트 발생</p>
		</div>
		<ul>
			<li>
				<span>발생시간 : </span>
				<span><c:out value="${data.eventTime}" /></span>
			</li>
			<li>
				<span>이벤트 상태 : </span>
				<span class="<c:out value="${data.eventCode}" />"><c:out value="${data.eventCodeName}" /></span>
			</li>
			<li>
				<span>처리 상태 : </span>
				<span class="<c:out value="${data.eventStateCode}" />"><c:out value="${data.eventStateCodeName}" /></span>
			</li>
			<li>
				<span>롤러 ID : </span>
				<span><c:out value="${data.eventLocation}" /></span>
				(감지 횟수 : <span class="popup_event_log_count"><c:out value="${data.eventLogCount}" /></span>)
			</li>
		</ul>
		<div class="exe_<c:out value="${data.eventStateCode}" />" onclick="ajaxExecuteTrendChart('<c:out value="${data.eventTime}" />',<c:out value="${data.eventLocation}" />);"></div>
	</div>
</c:forEach> 						
