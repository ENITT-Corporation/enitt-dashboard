<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jstl/jstl.jsp"%>

<c:choose>
	<c:when test="${conveyorVO.conveyorState eq 'NORMAL_01'}">
		<div class="NORMAL_01"></div>
	</c:when>
	<c:when test="${conveyorVO.conveyorState eq 'NORMAL_02'}">
		<div>
			<span class="NORMAL_02"></span>
			<span class="NORMAL_02"></span>
			<span class="NORMAL_02"></span>
			<span class="NORMAL_02"></span>
			<span class="NORMAL_02"></span>
			<span class="NORMAL_02"></span>
			<span class="NORMAL_02"></span>
			<span class="NORMAL_02"></span>
			<span class="NORMAL_02"></span>
		</div>
	</c:when>
	<c:otherwise>
		<div class="STOP"></div>
	</c:otherwise>
</c:choose>


