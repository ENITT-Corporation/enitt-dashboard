$(document).ready(function(){
	$('#id').focus();
	
	var loginValidHandler = new SimpleValidation("#frmLogin", {
		"id": {
			"required" : {"value" : true, "message": "아이디를 입력 해 주세요."},
			"maxlength": {"value": 20, "message": "최대 20글자만 가능합니다."},
		},
		"password": {
			"required" : {"value" : true, "message": "비밀번호를 입력 해 주세요."},
			"maxlength": {"value": 20, "message": "최대 20글자만 가능합니다."},
		}
	});
	
	$("#frmLogin").on("submit", function(e) {
		var inValid = loginValidHandler.valid(null, e);
		if (inValid) {
			alert(inValid);
			return false;
		}
		
		// 화면 > Controller : 비밀번호 + 밀리세컨(salt) : 암호화하여 전송
		var date = new Date();
		var hashedPassword = ""+date.getMilliseconds();
		var message = $("#password").val();
		var encrypt = CryptoJS.AES.encrypt(message,hashedPassword);
		
		$("#password").val(encrypt);
		$("input[name=now]").val(hashedPassword);	
	});
	
	if($("#id").val() != ""){
		$("#id").css("background-color","#6D6D6D");
		$("#id").css("color","white");
	}else{
		$("#id").css("background-color","white");
		$("#id").css("color","black");
	}
	if($("#password").val() != ""){
		$("#password").css("background-color","#6D6D6D");
		$("#password").css("color","white");
	}else{
		$("#password").css("background-color","white");
		$("#password").css("color","black");
	}
	
	$(".form-control").on("focusout",function(){
		if($("#id").val() != ""){
			$("#id").css("background-color","#6D6D6D");
			$("#id").css("color","white");
		}else{
			$("#id").css("background-color","white");
			$("#id").css("color","black");
		}
		if($("#password").val() != ""){
			$("#password").css("background-color","#6D6D6D");
			$("#password").css("color","white");
		}else{
			$("#password").css("background-color","white");
			$("#password").css("color","black");
		}
	})
	
});