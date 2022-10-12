<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jstl/jstl.jsp"%>

<section class="content">
	<form action="${pageContext.request.contextPath}/member/mypage" name="detail_form" method="post">
		<input type="hidden" name="mode" value="mypage" />
		<table class="tstyle_write">
			<caption>내정보</caption>
			<colgroup>
				<col width="15%">
				<col width="*">
			</colgroup>
			<tbody>
				<tr>
					<th>ID</th>
	              	<td class="Pt9 Pb9">
	              		<c:out value="${memberVO.id}" />
	              	</td>
	        	</tr>
				<tr>
					<th>이름 <span>*</span></th>
	              	<td>
	              		<input type="text" class="Wd200" name="name" maxlength="4" placeholder="이름을 입력하세요." value="<c:out value="${memberVO.name}" />" />
					</td>
	        	</tr>
				<tr>
					<th>권한</th>
	              	<td>
	              		<c:out value="${memberVO.authName}" />
	              	</td>
	        	</tr>
				<tr>
					<th>이메일 <span>*</span></th>
	              	<td>
					<input type="text" class="Wd200" name="email1" value="<c:out value="${memberVO.email1}" />" maxlength="20" placeholder="이메일을 입력하세요." value="" />@
					<input type="text" class="Wd200" name="email2" value="<c:out value="${memberVO.email2}" />" maxlength="20" placeholder="이메일 주소를 입력하세요." value="" />
	   					<select class="Wd200" id="emailDomain" onChange="domainChange()" >
						<c:forEach var="data" items="${mailList}" varStatus="status">
			            	<option value="<c:out value="${data.codeId}" />" <c:out value="${detail.email2 eq data.codeId ? 'selected=selected':'' }" />>
			            		<c:out value="${data.codeName}" />
			            	</option>
				        </c:forEach>
					</select>
	              	</td>
	        	</tr>
				<tr>
					<th>비밀번호변경</th>
	              	<td>
              			<button class="nBtn" type="button"  onClick="popOpen('pop_state')">변경</button>
              		</td>
	        	</tr>
			</tbody>
		</table>
	</form>
	<p class="BtnArea">
		<button class="btn"  type="button" onclick="goSave(); return false;">저장</button>
	</p>
	
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
						            		<input type="password" id="password" class="W100" placeholder="현재 비밀번호" />	
				              			</td>
						        	</tr>
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

<script src="${pageContext.request.contextPath}/resources/js/custom/member/mypage.js"></script>