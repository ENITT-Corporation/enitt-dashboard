<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jstl/jstl.jsp"%>

<section class="content">  
	<table class="tstyle_view">
		<caption>회원 상세 정보</caption>
		<colgroup>
			<col width="20%">
			<col width="*">
		</colgroup>
		<tbody>
			<tr>
				<th>시간</th>
	             <td><c:out value="${detail.eventTime}" /></td>
	       	</tr>
	       	<tr>
				<th>이벤트명</th>
	             <td><c:out value="${detail.eventCodeNm}" /></td>
	       	</tr>
	       	<tr>
				<th>구간(m)</th>
	             <td><c:out value="${detail.eventLocation}" /></td>
	       	</tr>
		</tbody>
	</table>
	
	<p class="BtnArea">
		<button type="button"  class="btn " onclick="goList('detail_form');">목록</button>
		<button type="button"  class="btn Mr5" onclick="goUpdate();">수정</button>
		<button type="button"  class="btn Mr5" onclick="goDelete();">삭제</button>
	</p>
		
	<form action="/sample" name="detail_form" id="detail_form" method="post">
		<input type="hidden" name="pageNo" value="<c:out value="${commonVO.pageNo}" />" />
		<input type="hidden" name="pageSize" value="<c:out value="${commonVO.pageSize}" />" />
		<input type="hidden" name="searchTimeStart" value="<c:out value="${commonVO.searchTimeStart}" />" />
		<input type="hidden" name="searchTimeEnd" value="<c:out value="${commonVO.searchTimeEnd}" />" />
		<input type="hidden" name="searchEventCode" value="<c:out value="${commonVO.searchEventCode}" />" />
		<input type="hidden" name="searchLocationStart" value="<c:out value="${commonVO.searchLocationStart}" />" />
		<input type="hidden" name="searchLocationEnd" value="<c:out value="${commonVO.searchLocationEnd}" />" />
		<input type="hidden" name="mode" value="detail" />
		<input type="hidden" name="eventId" value="<c:out value="${commonVO.eventId}" />" />
	</form>
</section>
<script src="${pageContext.request.contextPath}/resources/js/custom/sample/sample.js"></script>