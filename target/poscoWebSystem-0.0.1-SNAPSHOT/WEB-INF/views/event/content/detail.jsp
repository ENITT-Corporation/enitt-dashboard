<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jstl/jstl.jsp"%>


<table class="tstyle_view">
	<colgroup>
		<col width="20%">
		<col width="30%">
		<col width="20%">
		<col width="30%">
	</colgroup>
	<tbody>
		<c:choose>
			<c:when test="${eventList.size() > 0}">
				<tr>
					<th>초기 발생시간</th>
					<td><c:out value="${detail.eventTime}" /></td>
					<th>롤러 ID</th>
					<td><c:out value="${detail.eventLocation}" /></td>
				</tr>
				<tr>
					<th>상태</th>
					<td>
						<c:out value="${detail.eventStateCodeName}" />
						<button class="ed_btn" type="button" onclick="ajaxPopupOpen('<c:out value="${detail.eventId}" />','<c:out value="${detail.eventStateCode}" />','statePopup');">변경</button>
					</td>
					<th>종류</th>
					<td><c:out value="${detail.eventCodeName}" /><td>
				</tr>
			</c:when>
			<c:otherwise>
				<tr>
					<th>초기 발생시간</th>
					<td>-</td>
					<th>구간(m)</th>
					<td>-</td>
				</tr>
				<tr>
					<th>상태</th>
					<td>-</td>
					<th>종류</th>
					<td>-</td>
				</tr>
			</c:otherwise>
		</c:choose>
	</tbody>
</table>
<div class="tdiv">
	<table class="tstyle_list">
		<colgroup>
			<col width="15%">
			<col width="30%">
			<col width="20%">
			<col width="35%">
		</colgroup>
		<thead>
			<tr>
				<th>NO</th>
	          	<th>처리시간</th>
	            <th>상태</th>
	            <th>비고</th>
	        </tr>
		</thead>
		<tbody>
			<c:choose>
	           	<c:when test="${eventList.size() > 0}">
					<c:set var="num" value ="${eventList.size() }"/>          			
					<c:forEach var="data" items="${eventList}" varStatus="status">
		               	<tr class="noData">
		               		<td><c:out value="${num}"/></td>
		                	<td><c:out value="${data.eventStateRegisterDate}" /></td>
		                  	<td><c:out value="${data.eventCodeName}" /></td>
		                  	<td><c:out value="${data.eventStateNote}" /></td>	
	                  	</tr>
		                <c:set var="num" value ="${num-1}"/>
					</c:forEach>
				</c:when>
				<c:otherwise>
					<tr class="noData">
						<td colspan="5" class="TxtC">데이터가 없습니다.</td>
					</tr>
				</c:otherwise>
			</c:choose>
		</tbody>
	</table>
</div>