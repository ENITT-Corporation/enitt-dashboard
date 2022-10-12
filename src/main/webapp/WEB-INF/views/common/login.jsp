<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jstl/jstl.jsp"%>

<div class="login_page">
	<div class="login_left"></div>
	<!-- <div class="login_bg"> -->
	<div class="login_right">
		<div class="login-box-body">
			<div class="login_title">포스코 모니터링 시스템</div>
			<form id="frmLogin" name="frmLogin" action="${pageContext.request.contextPath}/actionLogin" method="post">
				<div class="loginForm">
					<label for="id">ID</label>
					<input type="text" class="form-control"  id="id" name="id" placeholder="ID" title=" ID 필수 항목입니다" value="<c:out escapeXml='true' value='${memberVO.id}'/>" autocomplete="off">
					
					<label for="pwd">Password</label>
					<input type="password" class="form-control" id="password" name="password" placeholder="Password" title=" 비밀번호필수 항목입니다"  value="<c:out escapeXml='true' value=""/>"  autocomplete="off"> 
					
					<button type="submit">LOGIN</button>
					
					<!-- message -->
					<c:if test="${null ne message}">
						<pre class="text-white">${message}</pre>
					</c:if>
					
					<!-- 비밀번호 암호화에 사용 -->
					<input type="hidden" name="now" id="now" value="<c:out escapeXml='true' value=""/>">
				</div>
			</form>
		</div>
	</div> 
</div>
	


<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/custom/common/login.js"></script>
