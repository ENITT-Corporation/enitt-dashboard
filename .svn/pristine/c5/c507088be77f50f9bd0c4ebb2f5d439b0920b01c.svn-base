<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jstl/jstl.jsp"%>

<section class="content">  
	<form action="/sample" name="form_form" id="form_form" method="post">
		<input type="hidden" name="eventId" value="<c:out value="${detail.eventId}" />" />
		<table class="tstyle_write">
			<caption>회원 정보 등록/수정</caption>
			<colgroup>
				<col width="20%">
				<col width="*">
			</colgroup>
			<tbody>
				<tr>
					<th>시간 <span>*</span></th>
		             <td>
		             	<input type="text" name="eventTime" value="<c:out value="${detail.eventTime}" />"  maxlength="19" onBlur="onlyDateTime(this);" />
		             </td>
		       	</tr>
				<tr>
					<th>이벤트 <span>*</span></th>
		             <td>
		             	<select name="eventCode" class="Wd190">
	                		<option value="">선택</option>
		             		<c:forEach var="data" items="${eventList}" varStatus="status">
				            	<option value="<c:out value="${data.codeId}" />" <c:out value="${detail.eventCode eq data.codeId ? 'selected=selected':'' }" />>
				            		<c:out value="${data.codeName}" />
				            	</option>
					        </c:forEach>
		                </select>
		             </td>
		       	</tr>
				<tr>
					<th>구간(m) <span>*</span></th>
		             <td>
		             	<input type="text" name="eventLocation" value="<c:out value="${detail.eventLocation}" />" maxlength="4" onKeyUp="onlyNumber(this);" onBlur="onlyNumberChk(this,0,5000);"/>
		             </td>
		       	</tr>
			</tbody>
		</table>
	</form>
		
	<p class="BtnArea">
		<c:choose>
			<c:when test="${commonVO.mode eq 'update'}">
				<button type="button"  class="btn" onclick="goDetail('page_form','<c:out value="${detail.eventId}" />');">뒤로</button>
				<button type="button"  class="btn Mr5" onclick="goSave('update');">수정</button>
			</c:when>
			<c:otherwise>
				<button type="button"  class="btn" onclick="goList('page_form');">목록</button>
				<button type="button"  class="btn Mr5" onclick="goSave('create');">저장</button>
			</c:otherwise>
		</c:choose>
	</p>
	
	<form action="/sample" name="page_form" id="page_form" method="post">
		<input type="hidden" name="pageNo" value="<c:out value="${commonVO.pageNo}" />" />
		<input type="hidden" name="pageSize" value="<c:out value="${commonVO.pageSize}" />" />
		<input type="hidden" name="searchTimeStart" value="<c:out value="${commonVO.searchTimeStart}" />" />
		<input type="hidden" name="searchTimeEnd" value="<c:out value="${commonVO.searchTimeEnd}" />" />
		<input type="hidden" name="searchEventCode" value="<c:out value="${commonVO.searchEventCode}" />" />
		<input type="hidden" name="searchLocationStart" value="<c:out value="${commonVO.searchLocationStart}" />" />
		<input type="hidden" name="searchLocationEnd" value="<c:out value="${commonVO.searchLocationEnd}" />" />
		<input type="hidden" name="mode" value="${commonVO.mode}" />
		<input type="hidden" name="eventId" value="<c:out value="${commonVO.eventId}" />" />
	</form>
</section>

<script src="${pageContext.request.contextPath}/resources/js/custom/sample/sample.js"></script>
