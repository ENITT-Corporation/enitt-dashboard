<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jstl/jstl.jsp"%>

<section class="content">  
	<div class="board_info">
		<form action="/sample" id="search_form" name="search_form" method="post">
	       	<input type="hidden" name="pageNo" value="1" />
			<input type="hidden" name="pageSize" value="<c:out value="${commonVO.pageSize}" />" />
			<input type="hidden" name="mode" value="list" />
			
			<div class="search_area">
	        	<div class="search_area_row">
	        		<label for="searchTimeStart">날짜</label>
					<input type="text" class="Wd150" name="searchTimeStart" id="searchTimeStart" value="<c:out value="${commonVO.searchTimeStart}" />" maxlength="10" onBlur="onlyDate(this);" />
					&nbsp;~&nbsp;
					<input type="text" class="Wd150" name="searchTimeEnd" id="searchTimeEnd" value="<c:out value="${commonVO.searchTimeEnd}" />" maxlength="10" onBlur="onlyDate(this);" />
	        		
	        		<label for="searchEventCode">이벤트명</label>
	              	<select name="searchEventCode">
	                	<option value="">전체</option>
	                	<c:forEach var="data" items="${eventList}" varStatus="status">
	                		<option value="<c:out value="${data.codeId}" />" <c:out value="${commonVO.searchEventCode eq data.codeId ? 'selected':''}" />><c:out value="${data.codeName}" /></option>
						</c:forEach>
					</select>
	        		
	        		<label for="searchLocationStart">구간</label>
					<input type="text" class="Wd150" name="searchLocationStart" value="<c:out value="${commonVO.searchLocationStart}" />" maxlength="4" onKeyUp="onlyNumber(this);" onBlur="onlyNumberChk(this,0,5000);"/> m
					&nbsp;~&nbsp;
					<input type="text" class="Wd150" name="searchLocationEnd" value="<c:out value="${commonVO.searchLocationEnd}" />" maxlength="4" onKeyUp="onlyNumber(this);" onBlur="onlyNumberChk(this,0,5000);"/> m
	        		
					<button type="submit"  class="btn_search">검색</button>
				</div>
			</div>
	    </form>
	</div>
	
	<p class="page_info">
		전체 <strong><fmt:formatNumber type="number" maxFractionDigits="3" value="${commonVO.totalCount}" /></strong>건,
		현재 페이지 <strong><fmt:formatNumber type="number" maxFractionDigits="3" value="${commonVO.pageNo}" /></strong>/<strong><fmt:formatNumber type="number" maxFractionDigits="3" value="${commonVO.finalPageNo}" /></strong>
	</p>
	<table class="tstyle_list" id="listTable">
		<caption>목록 입니다.</caption>
		<colgroup>
	       	<col width="8%">
			<col width="*">
			<!-- <col width="30%"> -->
			<col width="46%">
		</colgroup>
		<thead>
			<tr>
				<th>NO</th>
	            <th>시간</th>
	            <th>이벤트명</th>
	            <th>구간(m)</th>
			</tr>
		</thead>
		<tbody>
			<c:choose>
	           	<c:when test="${commonVO.totalCount > 0}">
					<c:set var="num" value ="${commonVO.totalCount - ((commonVO.pageNo - 1) * commonVO.pageSize) }"/> 	
					<c:forEach var="data" items="${list}" varStatus="status">
		               	<tr onClick="goDetail('list_form','<c:out value="${data.eventId}" />')">
		               		<td><c:out value="${num}"/></td>
		                  	<td><c:out value="${data.eventTime}" /></td>
		                  	<td><c:out value="${data.eventCodeNm}" /></td>
		                  	<td><c:out value="${data.eventLocation}" /></td>
		                </tr>
		                <c:set var="num" value ="${num-1}"/>
					</c:forEach>
				</c:when>
				<c:otherwise>
					<tr class="noData">
						<td colspan="4" class="TxtC">데이터가 없습니다.</td>
					</tr>
				</c:otherwise>
			</c:choose>
		</tbody>
	</table>
	
	 <p class="BtnArea">
		<button class="btn" type="button" onclick="goCreate()">등록</button>
	</p>
					
	<div class="board_pager Mt10">
		<c:if test="${commonVO.totalCount > 0}">
	       	${commonVO.pageHtml}
	     </c:if>
	</div>	
	
	<form action="/sample" name="list_form" id="list_form" method="post">
		<input type="hidden" name="pageNo" value="<c:out value="${commonVO.pageNo}" />" />
		<input type="hidden" name="pageSize" value="<c:out value="${commonVO.pageSize}" />" />
		<input type="hidden" name="searchTimeStart" value="<c:out value="${commonVO.searchTimeStart}" />" />
		<input type="hidden" name="searchTimeEnd" value="<c:out value="${commonVO.searchTimeEnd}" />" />
		<input type="hidden" name="searchEventCode" value="<c:out value="${commonVO.searchEventCode}" />" />
		<input type="hidden" name="searchLocationStart" value="<c:out value="${commonVO.searchLocationStart}" />" />
		<input type="hidden" name="searchLocationEnd" value="<c:out value="${commonVO.searchLocationEnd}" />" />
		<input type="hidden" name="mode" value="list" />
		<input type="hidden" name="eventId" value="" />
	</form>
		
</section>

<script src="${pageContext.request.contextPath}/resources/js/custom/sample/sample.js"></script>