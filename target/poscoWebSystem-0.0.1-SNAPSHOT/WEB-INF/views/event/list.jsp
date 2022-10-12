<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jstl/jstl.jsp"%>

<section class="content">
	<div class="search_info">
		<form action="/event" id="eventSearch" name="search_form" method="post">
			<input type="hidden" name="pageNo" value="1"/>
			<input type="hidden" name="pageSize" value="<c:out value="${commonVO.pageSize}" />" />
			<input type="hidden" name="index" value="<c:out value="${commonVO.index}" />" />
			<input type="hidden" name="mode" value="list" />
		
			<label for="eventCode" class="Ml0">종류</label>
			<select name="eventCode">
				<option value="">전체</option>
				<c:forEach var="data" items="${eventCodeSearchList}" varStatus="status">
	            	<option value="<c:out value="${data.codeId}" />" <c:out value="${commonVO.eventCode eq data.codeId ? 'selected=selected':'' }" />>
	            		<c:out value="${data.codeName}" />
	            	</option>
		        </c:forEach>
			</select>
			<label for="eventStateCode">상태</label>
			<select name="eventStateCode">
				<option value="">전체</option>
				<c:forEach var="data" items="${eventStateSearchList}" varStatus="status">
	            	<option value="<c:out value="${data.codeId}" />" <c:out value="${commonVO.eventStateCode eq data.codeId ? 'selected=selected':'' }" />>
	            		<c:out value="${data.codeName}" />
	            	</option>
		        </c:forEach>
			</select>
			<label for="eventTimeStart">시간</label>
			<input type="text" class="Wd120" name="eventTimeStart" id="timeStart" value="<c:out value="${commonVO.eventTimeStart}" />" />
                &nbsp;&nbsp;&nbsp; ~ &nbsp;
              	<input type="text" class="Wd120" name="eventTimeEnd" id ="timeEnd" value="<c:out value="${commonVO.eventTimeEnd}" />" />
              	<label for="eventLocationStart">롤러 ID</label>
              	<input type="text" class="Wd80" name="eventLocationStart" value="<c:out value="${commonVO.eventLocationStart}" />" maxlength="4" onKeyUp="onlyNumber(this);" placeholder="전체" /> 
              	 &nbsp;&nbsp;&nbsp; ~ &nbsp;
              	<input type="text" class="Wd80" name="eventLocationEnd" value="<c:out value="${commonVO.eventLocationEnd}" />"  maxlength="4" onKeyUp="onlyNumber(this);" placeholder="전체" /> 
			
			<button type="button" class="btn_search" onclick="goSearch();">검색</button>
		</form>
	</div>
	
	<div class="content_wrap">
		<div class="left_box">
			<div class="box_title">
				<p>목록</p>
			</div>
			<div class="box_content">
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
						<col width="30%">
						<col width="20%">
						<col width="20%">
						<col width="20%">
					</colgroup>
					<thead>
						<tr>
							<th>NO</th>
				          	<th>초기 발생시간</th>
				            <th>롤러 ID</th>
				            <th>종류</th>
				            <th>상태</th>
				        </tr>
					</thead>
					<tbody>
						<c:choose>
			            	<c:when test="${commonVO.totalCount > 0}">
								<c:set var="num" value ="${commonVO.totalCount - ((commonVO.pageNo - 1) * commonVO.pageSize) }"/>          			
								<c:forEach var="data" items="${eventList}" varStatus="status">
					               	<tr class="noData" id="<c:out value="${data.eventId}" />">					               		
					               		<td><c:out value="${num}"/></td>
					                	<td><c:out value="${data.eventTime}" /></td>
					                  	<td><c:out value="${data.eventLocation}" /></td>
					                  	<td><c:out value="${data.eventCodeName}" /></td>
					                  	<td>
					                  		<c:choose>
					                  			<c:when test="${data.eventStateCode eq 'STATE_01'}">
					                  				<p class="error"><c:out value="${data.eventStateCodeName}" /></p>
					                  			</c:when>
					                  			<c:when test="${data.eventStateCode eq 'STATE_02'}">
					                  				<p class="processing"><c:out value="${data.eventStateCodeName}" /></p>
					                  			</c:when>
					                  			<c:otherwise>
					                  				<p class="Pt10"><c:out value="${data.eventStateCodeName}" /></p>
					                  			</c:otherwise>
					                  		</c:choose>
					                  	</td>
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
				<div class="tstyle_bottom board_pager">
					<c:if test="${commonVO.totalCount > 0}">
		             	${commonVO.pageHtml}
		         	</c:if>
				</div>
				<form action="/event" name="list_form" method="post">
					<input type="hidden" name="pageNo" value="<c:out value="${commonVO.pageNo}" />" />
					<input type="hidden" name="pageSize" value="<c:out value="${commonVO.pageSize}" />" />
					<input type="hidden" name="eventStateCode" value="<c:out value="${commonVO.eventStateCode}" />" />
					<input type="hidden" name="eventTimeStart" value="<c:out value="${commonVO.eventTimeEnd}" />" />
					<input type="hidden" name="eventLocationStart" value="<c:out value="${commonVO.eventLocationStart}" />" />
					<input type="hidden" name="eventLocationEnd" value="<c:out value="${commonVO.eventLocationEnd}" />" />
					<input type="hidden" name="index" value="<c:out value="${commonVO.index}" />" />
					<input type="hidden" name="mode" value="list" />
				</form>
			</div>
		</div>
		<div class="right_box">
			<div class="box_title">
				<p>상세정보</p>
			</div>
			<div class="box_content" id="event_detail">
				<jsp:include page="./content/detail.jsp" />
			</div>
		</div>
	</div>
	
	<!-- 이벤트 상태 팝업 -->
	<div class="popup_content"></div>
	
</section>

<script src="${pageContext.request.contextPath}/resources/js/custom/event/event.js"></script>