<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jstl/jstl.jsp"%>
<div class="con">
	<section class="dashboard_content">
		<div class="dash_top_box" id="dashboardDiv">
			<div class="dash_box_title">
				<p class="system">B-311 B.C 시스템</p>
			</div>
			<jsp:include page="./content/dashboard.jsp" />
		</div>
		<div class="dash_bottom_box">
			<div class="dash_b_left_box">
				<div class="dash_box_title">
					<p class="system">B-311 B.C 상태</p>
					<ul>
						<li>정지<span class="STOP">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></li>
						<!-- <li>광물 미적재 가동<span class="NORMAL_01">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></li> -->
						<li><!-- 광물 적재  -->가동<span class="NORMAL_02">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</span></li>
					</ul>
				</div>
				<div class="dash_left_content">
					<jsp:include page="./content/dashboard/conveyor.jsp" />
				</div>
			</div>
			<div class="dash_b_right_box">
				<div class="dash_box_title">
					<p class="list">이벤트 목록</p>
				</div>
				<div class="dash_box_content">
					<jsp:include page="./content/event_list.jsp" />
				</div>
			</div>
		</div>  
		<div>Copyright 2022 ENITT Co., Ltd. All right reserved</div>
	</section>
	
	<!-- 이벤트 상태 변경 팝업 세팅  -->
	<div class="state_popup_content"></div>
</div>
<script type="text/javascript" src="${pageContext.request.contextPath}/resources/js/custom/dashboard/main.js"></script>