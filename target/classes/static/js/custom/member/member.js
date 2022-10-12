$(document).ready(function(){
	var index = $("[name=index]").val();

	if( index > 0){
		$(".tstyle_list tbody tr").removeClass("selected");
		$(".tstyle_list tbody tr").eq(index).addClass("selected");
		var id = $(".tstyle_list tbody tr").eq(index).attr("id");
		getDetail(id);
	}else{// 이벤트 이력 화면 처음 로딩 시, 가장 최근 이벤트 이력 id를 보냄 
		var id = $(".tstyle_list tbody tr").eq(0).attr("id");
		$(".tstyle_list tbody tr").eq(0).addClass("selected");
		getDetail(id);
	}
	
	
	$(".tstyle_list tbody tr").click(function(){ 	
		$(".tstyle_list tbody tr").removeClass("selected");
		$(this).addClass("selected");
		
		var id = $(this).attr("id");
		getDetail(id);
		
		$("[name=search_form] [name=index]").val($(this).index());
		
	});
	
});

/* 리스트 */
	//검색
	function goSearch(){
		$("[name='search_form']").submit();
	}
	
	//페이징
	function goPage(page) {
		$('[name=list_form] [name="pageNo"]').val(page);
		$('[name=list_form]').submit();
	}
	
	//엑셀 다운
	function excelDown(){
		$('[name=list_form]').attr('action','/member/excel/list');
		$('[name=list_form]').submit();
		$('[name=list_form]').attr('action','/member');
	}
	
	
/* 상세 */
	//상세정보
	function getDetail(id){
		var param = {
						"id" : id
					};
		rAjaxCall.asyncH("/member/ajaxMemberDetail", 'POST', param, function(data) {
			$('#detail_content').html("");
			$('#detail_content').html(data);
		});
	}
	
	
/* 등록/수정 */
	//등록
	function goCreatePage(){
		var param = {
			};
		rAjaxCall.asyncH("/member/ajaxMemberCreatepage", 'POST', param, function(data) {
			$('#detail_content').html("");
			$('#detail_content').html(data);
			$(".tstyle_list tbody tr").removeClass("selected");
		});
	}

	//ID 체크
	function goIdCheck(){
		var validate_id = /^.*(?=.{5,20})(?=.*[0-9a-zA-Z]).*$/;
		var id = $("[name=id]").val();
		if(id == null || id == ""){
			$("#idCheck").val("");
			$("#idCheckMsg").html("");
			$("#idCheckMsg").attr("style","");
		}else{
			if (!validate_id.test(id)) {
				$("#idCheck").val("");
				$("#idCheckMsg").html("ID 형식이 바르지않습니다.\n(영문,숫자 5~20자 이내)");
				$("#idCheckMsg").attr("style","color:red;");
			}else{
				var param = {
						"id" : id
				};
				rAjaxCall.async("/member/ajaxMemberIdCheck", 'POST', param, function(data) {
					if(data.result){
						$("#idCheck").val(data.result);
						$("#idCheckMsg").html(data.msg);
						$("#idCheckMsg").attr("style","");
					}else{
						$("#idCheck").val(data.result);
						$("#idCheckMsg").html(data.msg);
						$("#idCheckMsg").attr("style","color:red;");
						
					}
				});
			}
		}
	}
	
	//비밀번호 체크
	function goPwCheck(){
		var reg_pwd = /^.*(?=.{9,20})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/;
		var pw = $("[name=password]").val();
		if (!reg_pwd.test(pw)) {
			$("#pwCheckMsg").html("영대소문자,숫자 3가지를 혼합하여 9~20자 이내 입력하세요.");
			$("[name=password]").val("");
		}else{
			$("#pwCheckMsg").html("");
		}
	}
	
	//비밀번호 확인 체크
	function goPwCheck2(){
		var reg_pwd = /^.*(?=.{9,20})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/;
		var pw = $("#passwordCheck").val();
		if (!reg_pwd.test(pw)) {
			$("#pwCheckMsg2").html("영대소문자,숫자 3가지를 혼합하여 9~20자 이내 입력하세요.");
			$("#passwordCheck").val("");
		}else{
			$("#pwCheckMsg2").html("");
		}
	}
	
	// 비밀번호 변경
	function updatePassword(){
		var id = $("[name=id]").val();
		var newPassword = $("#newPassword").val();
		var newPasswordChk = $("#newPasswordChk").val();
		var reg_pwd = /^.*(?=.{9,20})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/;
		var date = new Date();
		var hashedPassword = ""+date.getMilliseconds();
		var newPasswordEncrypt = CryptoJS.AES.encrypt(newPassword, hashedPassword);
		var newPasswordChkEncrypt = CryptoJS.AES.encrypt(newPasswordChk, hashedPassword);
		
		
		if(newPassword == ""){
			alert("새 비밀번호를 입력해주세요.");
			$("#newPassword").focus();
			return;
		}else if(newPasswordChk == ""){
			alert("새 비밀번호 확인을 입력해주세요.");
			$("#newPasswordChk").focus();
			return;
		}else if (!reg_pwd.test(newPassword)) {
			alert("비밀번호 형식이 바르지않습니다.\n(영대소문자,숫자 3가지를 혼합하여 9~20자 이내)");
			$("#newPassword").val("");
			$("#newPasswordChk").val("");
			$("#newPassword").focus();
			return;
		}else if(newPassword != newPasswordChk){
			alert("새비밀번호가 일치하지않습니다.\n다시 입력해 주십시오.");
			$("#newPassword").val("");
			$("#newPasswordChk").val("");
			$("#newPassword").focus();
			return;
		}

		$("#newPassword").val(newPasswordEncrypt);
		$("#newPasswordChk").val(newPasswordEncrypt);
		
		var params = {
				"id" : id 
				,"newPassword" : newPasswordEncrypt.toString()
				,"now" : hashedPassword
		};
		rAjaxCall.async("/member/ajaxUpdatePassword", 'POST', params, function(r) {
			if(r.result){
				alert(r.content);
				$("#newPassword").val("");
				$("#newPasswordChk").val("");
				popClose('pop_state');
			}else{
				alert(r.content);
				$("#newPassword").val("");
				$("#newPasswordChk").val("");
				$("#newPassword").focus();
			}
		});
	}
	
	//이메일 도메인 바꿔주기
	function domainChange(){
		var domain = $("#emailDomain").val();
		if(domain == "직접입력"){
			$("[name=email2]").css("background-color","");
			$("[name=email2]").removeAttr("readonly");
			$("[name=email2]").val("");
		}else{
			$("[name=email2]").val(domain);
			$("[name=email2]").css("background-color", "#EEEEEE");
			$("[name=email2]").attr("readonly", true);
		}
	}
	
	//등록 버튼
	function goCreate(){
		var id = $("[name=id]").val();
		var idCheck = $("#idCheck").val();
		var validate_id = /^.*(?=.{5,20})(?=.*[0-9a-zA-Z]).*$/;
		var name = $("[name=name]").val();
		var validate_name =  /^[가-힣a-zA-Z]+$/;	
		var password = $("[name=password]").val();
		var passwordCheck = $("#passwordCheck").val();
		var validate_pwd = /^.*(?=.{9,20})(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).*$/;
		var auth = $("[name=auth]").val();
		var email1 = $("[name=email1]").val();
		var email2 = $("[name=email2]").val();
		var useYn = $("[name=useYn]").val();
		var confirmTxt = "";
		
		var date = new Date();
		var hashedPassword = ""+date.getMilliseconds();
		var encrypt = CryptoJS.AES.encrypt(password, hashedPassword);
		
		if(id == "" || id == null){
			alert("ID를 입력해주세요.");
			$("[name=id]").focus();
			return;
		}
		if (!validate_id.test(id)) {
			alert("ID 형식이 바르지않습니다.\n(영문,숫자 5~20자 이내)");
			 $("[name=id]").focus();
			return;
		}
		if(idCheck == "false"){
			alert("아이디 중복확인이 필요합니다.");
			$("[name=id]").focus();
			return;
		}
		if(name == "" || name == null){
			alert("이름을 입력해주세요.");
			$("[name=name]").focus();
			return;
		}
		if(!validate_name.test(name)) {
			alert("이름 형식이 바르지 않습니다. \n(한글 또는 영문 20자 이내)");
			$("[name=name]").val("");
			return;
		} 
		if(name.length < 2 || name.length > 20) {
			alert("이름 형식이 바르지 않습니다. \n(한글 또는 영문 2~20자 이내)");
			$("[name=name]").val("");
			return;
		} 
		if(password == "" || password == null){
			alert("비밀번호를 입력해주세요.");
			$("[name=password]").focus();
			return;
		}
		if(password != "" && password != null){
			if(passwordCheck == "" || passwordCheck == null){
				alert("비밀번호 확인을 입력해주세요.");
				$("#passwordCheck").focus();
				return;
			}
		}
		if(password  != passwordCheck){
			alert("비밀번호와 비밀번호 확인이 다릅니다. \n다시 입력해주세요.");
			$("#passwordCheck").focus();
			return;
		}
		if(!validate_pwd.test(password)) {
			alert("비밀번호 형식이 바르지않습니다.\n(영대소문자,숫자 3가지를 혼합하여 9~20자 이내)");
			$("[name=password]").focus();
			return;
		}
		if(!validate_pwd.test(passwordCheck)) {
			alert("비밀번호 확인의 형식이 바르지않습니다.\n(영대소문자,숫자 3가지를 혼합하여 9~20자 이내)");
			$("#passwordCheck").focus();
			return;
		}
		if(auth == "" || auth == null){
			alert("권한을 선택해주세요.");
			$("[name=auth]").focus();
			return;
		}
		if(email1 == "" || email1 == null){
			alert("이메일을 입력해주세요.");
			$("[name=email1]").focus();
			return;
		}
		if(email2 == "" || email2 == null){
			alert("이메일을 입력해주세요.");
			$("[name=email2]").focus();
			return;
		}
		if(useYn == "" || useYn == null){
			alert("사용여부를 선택해주세요.");
			$("[name=useYn]").focus();
			return;
		}
		
		confirmTxt = "저장하시겠습니까 ?";
		
		
		if(confirm(confirmTxt)){
			$("[name=password]").val(encrypt);
			$("#passwordCheck").val(encrypt);
			$("input[type=hidden][name=now]").val(hashedPassword);
			
			var params = $("[name=detail_form]").serialize();
			rAjaxCall.async("/member/ajaxMemberCreate", 'POST', params, function(r) {
				if(r.result){
					alert(r.msg);
					location.reload();
				}else{
					alert(r.msg);
				}
			});
		}
	}
	
	//수정 버튼
	function goUpdate(){
		var name = $("[name=name]").val();
		var validate_name =  /^[가-힣a-zA-Z]+$/;	
		var auth = $("[name=auth]").val();
		var email1 = $("[name=email1]").val();
		var email2 = $("[name=email2]").val();
		var useYn = $("[name=useYn]").val();
		var confirmTxt = "";
		
		if(name == "" || name == null){
			alert("이름을 입력해주세요.");
			$("[name=name]").focus();
			return;
		}
		if(!validate_name.test(name)) {
			alert("이름 형식이 바르지 않습니다. \n(한글 또는 영문 20자 이내)");
			$("[name=name]").val("");
			return;
		} 
		if(name.length < 2 || name.length > 20) {
			alert("이름 형식이 바르지 않습니다. \n(한글 또는 영문 2~20자 이내)");
			$("[name=name]").val("");
			return;
		} 
		if(auth == "" || auth == null){
			alert("권한을 선택해주세요.");
			$("[name=auth]").focus();
			return;
		}
		if(email1 == "" || email1 == null){
			alert("이메일을 입력해주세요.");
			$("[name=email1]").focus();
			return;
		}
		if(email2 == "" || email2 == null){
			alert("이메일을 입력해주세요.");
			$("[name=email2]").focus();
			return;
		}
		if(useYn == "" || useYn == null){
			alert("사용여부를 선택해주세요.");
			$("[name=useYn]").focus();
			return;
		}
		
		confirmTxt = "수정하시겠습니까 ?";
		
		
		if(confirm(confirmTxt)){
			var params = $("[name=detail_form]").serialize();
			rAjaxCall.async("/member/ajaxMemberUpdate", 'POST', params, function(r) {
				if(r.result){
					alert(r.msg);
					location.reload();
				}else{
					alert(r.msg);
				}
			});
		}
	}
	
	//취소
	function goCancel(){
		$(".tstyle_list > tbody > tr:eq(0)").trigger("click");
	}