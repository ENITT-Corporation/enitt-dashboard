<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jstl/jstl.jsp"%>

<div class="top-header">
	<div class="logo"><img src="/resources/css/lib/images/icon_posco.png"></div>
	<ul class="clockDiv">
		<li>
			<p class="clock"></p>
		</li>
	</ul>
	<%-- <ul>
		<li class="mypage">
			<a class="mypage">
				<c:out value="${memberVO.name}" /> 님
			</a>
		</li>
		<li class="line"></li>
		<li class="login">
			<c:choose>
				<c:when test="${not empty memberVO.id}">
					<a href="${pageContext.request.contextPath}/logout">로그아웃</a>
				</c:when>
				<c:otherwise>
					<a href="${pageContext.request.contextPath}/login">로그인</a>
				</c:otherwise>
			</c:choose>
		</li>
	</ul> --%>
</div>
