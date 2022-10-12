<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@include file="/WEB-INF/jstl/jstl.jsp"%>

<div class="box_title">
	<c:choose>
		<c:when test="${detail.id eq NULL or detail.id == '' }">
			<p>등록</p>
		</c:when>
		<c:otherwise>
			<p>상세정보</p>
		</c:otherwise>
	</c:choose>
</div>

<div class="box_content">
	<form action="/member" name="detail_form" method="post">
		<input type="hidden" name="now" value="">
		<table class="tstyle_write">
			<colgroup>
				<col width="25%">
				<col width="75%">
			</colgroup>
			<tbody>
				<tr>
					<th><span>*</span>ID</th>
					<td>
						<c:choose>
							<c:when test="${detail.id eq NULL or detail.id == '' }">
								<input type="text" class="Wd200" name="id" maxlength="20" placeholder="ID를 입력하세요." value="<c:out value="${detail.id}" />" onfocusout="goIdCheck();" />
								<input type="hidden" id="idCheck" value=""/> 
								<span id="idCheckMsg"></span>
							</c:when>
							<c:otherwise>
								<c:out value="${detail.id}" />
								<input type="hidden" class="Wd200" name="id" value="<c:out value="${detail.id}" />" />
							</c:otherwise>
						</c:choose>
					</td>
				</tr>
				<tr>
					<th><span>*</span>이름</th>
					<td>
						<input type="text" class="Wd200" name="name" maxlength="20" placeholder="이름을 입력하세요." value="<c:out value="${detail.name}" />" />
					</td>
				</tr>
				<c:choose>
					<c:when test="${detail.id eq NULL or detail.id == '' }">
						<tr>
							<th><span>*</span>비밀번호</th>
							<td>
								<input type="password" class="Wd200" name="password" maxlength="20" placeholder="비밀번호를 입력하세요." onfocusout="goPwCheck();" />
								<span id="pwCheckMsg"></span>
							</td>
						</tr>
						<tr>
							<th><span>*</span>비밀번호 확인</th>
							<td>
								<input type="password" class="Wd200" id="passwordCheck" maxlength="20" placeholder="비밀번호를 한번 더 입력하세요." onfocusout="goPwCheck2();" />
								<span id="pwCheckMsg2"></span>
							</td>
						</tr>
					</c:when>
					<c:otherwise>
						<tr>
							<th>비밀번호 변경</th>
							<td>
								<input type="button" class="Wd200" value="변경"  onClick="popOpen('pop_state')"/>
							</td>
						</tr>
					</c:otherwise>
				</c:choose>
				
				<tr>
					<th><span>*</span>권한</th>
					<td>
						<select name="auth" class="Wd200">
							<c:forEach var="data" items="${authList}" varStatus="status">
				            	<option value="<c:out value="${data.codeId}" />" <c:out value="${detail.auth eq data.codeId ? 'selected=selected':'' }" />>
				            		<c:out value="${data.codeName}" />
				            	</option>
					        </c:forEach>
						</select>
					</td>
				</tr>
				<tr>
					<th><span>*</span>이메일</th>
					<td>
						<input type="text" class="Wd200" name="email1" value="<c:out value="${detail.email1}" />" maxlength="20" placeholder="이메일을 입력하세요." value="" />@
						<input type="text" class="Wd200" name="email2" value="<c:out value="${detail.email2}" />" maxlength="20" placeholder="이메일 주소를 입력하세요." value="" />
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
					<th><span>*</span>사용여부</th>
					<td>
		             	<input type="radio" name="useYn" id="useYnY" value="Y" <c:out value="${detail.useYn ne 'N' ? 'checked=checked':''}" /> /><label for="useYnY"><span></span>사용</label>
		             	<input type="radio" name="useYn" id="useYnN" value="N" <c:out value="${detail.useYn eq 'N' ? 'checked=checked':''}" />  /><label for="useYnN"><span></span>미사용</label>
					</td>
				</tr>
			</tbody>
		</table>
	</form>
	<c:choose>
		<c:when test="${detail.id eq NULL or detail.id == '' }">
			<button class="btn Ml10" type="button" onclick="goCancel();">취소</button>
			<button class="btn" type="button" onclick="goCreate();">등록</button>
		</c:when>
		<c:otherwise>
			<button class="btn Ml10" type="button" onclick="goCancel();">취소</button>
			<button class="btn" type="button" onclick="goUpdate();">수정</button>
		</c:otherwise>
	</c:choose>
	
			
</div>