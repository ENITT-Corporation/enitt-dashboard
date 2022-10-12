<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jstl/jstl.jsp"%>

<section class="content">
	<div class="search_info">
		<form action="/conveyor" name="search_form" method="post">
			<input type="hidden" name="pageNo" value="1"/>
			<input type="hidden" name="pageSize" value="<c:out value="${commonVO.pageSize}" />" />
			<input type="hidden" name="mode" value="list" />
			
			<label for="state" class="Ml0">상태</label>
			<select name="state">
				<option value="">전체</option>
				<c:forEach var="data" items="${sysStateSearchList}" varStatus="status">
	            	<option value="<c:out value="${data.codeId}" />" <c:out value="${commonVO.state eq data.codeId ? 'selected=selected':'' }" />>
	            		<c:out value="${data.codeName}" />
	            	</option>
		        </c:forEach>
			</select>
			
			<label for="timeStart">시간</label>
			<input type="text" class="Wd120" name="timeStart" id="timeStart" value="<c:out value="${commonVO.timeStart}" />" />
            &nbsp;&nbsp;&nbsp; ~ &nbsp;
           	<input type="text" class="Wd120" name="timeEnd" id ="timeEnd" value="<c:out value="${commonVO.timeEnd}" />" />
			
			<button type="button" class="btn_search" onclick="goSearch();">검색</button>
		</form>
	</div>
	
	<div class="content_wrap">
		<div class="tstyle_top">
			<p class="page_info">
				전체 <strong><fmt:formatNumber type="number" maxFractionDigits="3" value="${commonVO.totalCount}" /></strong>건,
				현재 페이지 <strong><fmt:formatNumber type="number" maxFractionDigits="3" value="${commonVO.pageNo}" /></strong>/<strong><fmt:formatNumber type="number" maxFractionDigits="3" value="${commonVO.finalPageNo}" /></strong>
			</p>
			<c:if test="${commonVO.totalCount > 0}">
				<button class="btn_down" type="button" onclick="excelDown();">다운로드</button>
			</c:if>
		</div>
		<table class="tstyle_list">
			<colgroup>
				<col width="10%">
				<col width="20%">
				<col width="30%">
				<col width="20%">
				<col width="20%">
			</colgroup>
			<thead>
				<tr>
					<th>NO</th>
					<th>컨베이어 종류</th>
		          	<th>발생시간</th>
		          	<th>가동시간(시:분:초)</th>
		            <th>상태</th>
		        </tr>
			</thead>
			<tbody>
				<c:choose>
	            	<c:when test="${commonVO.totalCount > 0}">
						<c:set var="num" value ="${commonVO.totalCount - ((commonVO.pageNo - 1) * commonVO.pageSize) }"/>          			
						<c:forEach var="data" items="${list}" varStatus="status">
			               	<tr>
			               		<td><c:out value="${num}"/></td>
			               		<td><c:out value="${data.conveyorType}" /></td>
			                	<td><c:out value="${data.conveyorStateTime}" /></td>
			                  	<td><c:out value="${data.conveyorUptime}" /></td>
			                  	<td><c:out value="${data.conveyorStateNm}" /></td>
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
		<div class="tstyle_bottom board_pager">
			<c:if test="${commonVO.totalCount > 0}">
	             	${commonVO.pageHtml}
	         </c:if>
		</div>
		
		<form action="/conveyor" name="list_form" method="post">
			<input type="hidden" name="pageNo" value="<c:out value="${commonVO.pageNo}" />" />
			<input type="hidden" name="pageSize" value="<c:out value="${commonVO.pageSize}" />" />
			<input type="hidden" name="state" value="<c:out value="${commonVO.state}" />" />
			<input type="hidden" name="timeStart" value="<c:out value="${commonVO.timeStart}" />" />
			<input type="hidden" name="timeEnd" value="<c:out value="${commonVO.timeEnd}" />" />
		</form>
	</div>
</section>

<script src="${pageContext.request.contextPath}/resources/js/custom/conveyor/conveyor.js"></script>