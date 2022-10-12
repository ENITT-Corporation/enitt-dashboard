<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jstl/jstl.jsp"%>

<div class="board_info">
	<form action="/eventStats" name="day_form" id="day_form" method="post">
		<input type="hidden" name="mode" value="day" />
		<input type="hidden" name="searchMonth" value="${commonVO.searchMonth}" />
		<input type="hidden" name="searchYear" value="${commonVO.searchYear}" />
		<input type="hidden" name="searchYearEnd" value="${commonVO.searchYearEnd}" />
	
		<div class="search_stats_info">
			<label class="Wd50 ClearWS" for="searchDay">날짜</label>
			<input type="text" class="Wd100" name="searchDay" id="searchDay" value="<c:out value="${commonVO.searchDay}" />">
			<button type="submit"  class="btn_search" >검색</button>
		</div>
	</form>
</div>
<div id="dayContainer" class="chartDiv"></div>
<c:if test="${dayData.data.size() > 0}">
	<button class="btn_down" type="button" onclick="excelDown('day');">다운로드</button>
</c:if>
<div class="statsTable">
	<table class="tstyle_list3">
		<caption>이벤트 통계 일별 목록입니다.</caption>
		<colgroup>
	       	<col width="10%">
			<col width="*">
		</colgroup>
		<thead>
		
			<tr>
				<th>NO</th>
          		<th>날짜</th>        		
       			<c:forEach var="eventCategories" items="${dayData.data}">
       				<th><c:out value="${eventCategories.name}" /></th>
       			</c:forEach>
          		<th>분포도</th> 	
	        </tr>
		</thead>
		<tbody>
			<c:choose>
				<c:when test="${dayData.categories.size() > 0 }">
					<c:set var="num" value="1" />
					<c:forEach var="data" items="${dayData.categories}" varStatus="status">
						<tr class="noData">
				        	<td><c:out value="${num}" /></td>
				            <td>
				            	<c:out value="${data}일" />
				            </td>
				           <c:forEach var="dayData" items="${dayData.data}" varStatus="status2">
			          			<td><c:out value="${dayData.ListData[status.index]}" /></td>
			          		</c:forEach>				     
				            <td>			
				            	<span onClick="scatterPlot('<c:out value="${dayData.eventDates[status.index]}" />')">상세보기</span>         				            					            
				            </td>
				        </tr>				       
				        <c:set var="num" value ="${num+1}"/>
					</c:forEach>
				</c:when>
				<c:otherwise>
	       			<tr class="noData">
						<td colspan='4' class="TxtC">데이터가 없습니다.</td>
					</tr>
	        	</c:otherwise>
			</c:choose>
		</tbody>
	</table>
</div>
