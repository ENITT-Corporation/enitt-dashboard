<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jstl/jstl.jsp"%>

<ul class="roller_marking_content">
	<c:forEach var="data" items="${markingCheckList}" varStatus="status">
		<c:choose>
			<c:when test="${data.buttonCheck == 'Y'}">
				<li class="markingBtn" id="<c:out value="${data.eventId}" />" onclick="ajaxExecuteTrendChartAll(<c:out value="${data.location}" />);" style="bottom:<c:out value="${data.locationBottom}" />px; right:<c:out value="${data.locationRight}" />px;">
				</li>
			</c:when>
			<c:otherwise>
				<li class="rollerBtn" onclick="ajaxExecuteTrendChartAll(<c:out value="${data.location}" />);" style="bottom:<c:out value="${data.locationBottom}" />px; right:<c:out value="${data.locationRight}" />px;">
				</li>
			</c:otherwise>
		</c:choose> 
	</c:forEach>
</ul>

<script src='<c:out value="${pageContext.request.contextPath}" />/resources/js/custom/dashboard/roller_marking.js'></script>