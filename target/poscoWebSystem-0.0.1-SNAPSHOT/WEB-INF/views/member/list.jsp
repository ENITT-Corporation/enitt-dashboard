<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jstl/jstl.jsp"%>

<section class="content">
	<div class="search_info">
		<form action="/member" name="search_form" method="post">
			<input type="hidden" name="pageNo" value="1"/>
			<input type="hidden" name="pageSize" value="<c:out value="${commonVO.pageSize}" />" />
			<input type="hidden" name="index" value="<c:out value="${commonVO.index}" />" />
			<input type="hidden" name="mode" value="list" />
		
			<select name="searchType">
				<option value="">전체</option>
				<option value="ID" <c:out value="${commonVO.searchType eq 'ID' ? 'selected' : ''}" />>ID</option>
				<option value="NAME" <c:out value="${commonVO.searchType eq 'NAME' ? 'selected' : ''}" />>이름</option>		
			</select>
			<input type="text" class="Wd300" name="searchWord" value="<c:out value="${commonVO.searchWord}" />"  maxlength="50"  placeholder="검색어를 입력하세요." />
			<button type="button" class="btn_search" onClick="goSearch();">검색</button>
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
				<table class="tstyle_list" id="listTable">
					<colgroup>
						<col width="10%">
						<col width="45%">
						<col width="45%">
					</colgroup>
					<thead>
						<tr>
							<th>NO</th>
				          	<th>ID</th>
				            <th>이름</th>
				        </tr>
					</thead>
					<tbody>
						<c:choose>
			            	<c:when test="${commonVO.totalCount > 0}">
								<c:set var="num" value ="${commonVO.totalCount - ((commonVO.pageNo - 1) * commonVO.pageSize) }"/>          			
								<c:forEach var="data" items="${list}" varStatus="status">
					               	<tr id="<c:out value="${data.id}" />">
					               		<td><c:out value="${num}"/></td>
					                	<td><c:out value="${data.id}" /></td>
					                  	<td><c:out value="${data.name}" /></td>
					                </tr>
					                <c:set var="num" value ="${num-1}"/>
								</c:forEach>
							</c:when>
							<c:otherwise>
								<tr class="noData">
									<td colspan="3" class="TxtC">데이터가 없습니다.</td>
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
			    
				<button class="btn" type="button" onclick="goCreatePage();">등록</button>
				
				<form action="/member" name="list_form" method="post">
					<input type="hidden" name="pageNo" value="<c:out value="${commonVO.pageNo}" />" />
					<input type="hidden" name="pageSize" value="<c:out value="${commonVO.pageSize}" />" />
					<input type="hidden" name="searchType" value="<c:out value="${commonVO.searchType}" />" />
					<input type="hidden" name="searchWord" value="<c:out value="${commonVO.searchWord}" />" />
				</form>
			</div>
		</div>
		<div class="right_box">
			<div class="box_content" id="detail_content">
				<jsp:include page="./content/detail.jsp" />
			</div>
		</div>
	</div>
	
	<div class="pop_overlay" id="pop_state" style="display:none;">
		<div class="pop_layer  W40">
			<div class="header">
	      		<div class="tit">비밀번호 변경</div>
	      		<div class="close" onclick="popClose('pop_state');"> X</div>
	   		</div>
	   		<div class="con">
				<div class="pop_con_wrap basic_div_box"  style="height:245px;">
					 <div class="pop_con Mb10">
					 	<div class="table_st2">
			        		<table>
			        			<colgroup>
									<col width="*"> 
								</colgroup>
						 		<tbody>
						        	<tr>
										<td> 
						            		<input type="password" id="newPassword" class="W100" placeholder="새 비밀번호 " />	
				              			</td>
						        	</tr>
						        	<tr>
										<td> 
						            		<input type="password" id="newPasswordChk" class="W100" placeholder="새 비밀번호 확인" />
						   				</td>
						        	</tr>
								</tbody>
			        		</table>
			      		</div>
					 </div>
					 <p class="BtnArea">
						<button class="btn Ml10 Mr15" type="button" onclick="popClose('pop_state'); return false;">닫기</button>
						<button class="btn" type="button" onclick="updatePassword(); return false;">수정</button>
					</p>
				</div>
			</div>
		</div>
	</div>
</section>

<script src="${pageContext.request.contextPath}/resources/js/custom/member/member.js"></script>