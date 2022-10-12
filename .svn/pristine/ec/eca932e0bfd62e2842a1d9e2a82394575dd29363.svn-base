if (typeof (Utils) == "undefined") var Utils = {};

(function($) {
	Utils.Attach_Common = function() {
	};
	
	var file;
	
	Utils.Attach_Common.prototype = {		
		// 파일 추가 클릭 시 파일 첨부 칸 추가됨
		fncPlusFile : function() {
			
		
			var fAchBtnArr = $(".fAchBtn");		
			var last = Number(fAchBtnArr.eq(fAchBtnArr.length-1).attr("name").replace("attachFile",""))+1;
			
			// 파일 확장자 지정
			var fTypeName = $("#attachFile0").attr('class');
			if(fTypeName.indexOf("fAchBtn") != -1) {
				fTypeName = fTypeName.replace("fAchBtn","");
			}
			var fileTypeArr = afCommon.fncSetFileType($.trim(fTypeName));
			
			var fileHtml = `<div class="fileBox">
								<label for="attachFile${last}">찾아보기</label>
								<input type="file" class="fAchBtn ${fTypeName}" name="attachFile${last}" id="attachFile${last}" accept="${fileTypeArr}" onchange="afCommon.fncAttachFile(${last});">
								<input type="text" class="fileNmInput${last}" readonly />
								<button class="imgBtn btnMinus" type="button" onclick="afCommon.fncMinusFile(this)">
									<span style="color: #5586EB;">
										<i class="fa fa-minus-square fa-3x" aria-hidden="true"></i>
									</span>
								</button>
							</div>`;
						
			$(".bottomDiv").before(fileHtml);		
		},
		
		// - 클릭 시 파일 첨부 칸 삭제
		fncMinusFile : function(val) {
			var target = $(val).parents('div .fileBox');
			
			target.remove();
		},
		
		// 수정 화면 - 파일 삭제
		fncDeleteFile : function(fileNo) {
			var fileSubId = $("#f_form [name='fileSubId']").val();
			var fileListLen = $("ul > li.fileList").length;
			var params = {
				"fileNo" : fileNo,
				"fileSubId" : fileSubId
			};

			if(fileListLen > 1) {
				rAjaxCall.async("/attach/ajaxDeleteFile", "POST", params, function(r){
					var r = r.FileUtilVO;
					if(r.result) {
						alert(r.content);
						fncGoUpdate(fileSubId);
					}	
				});
			} else {
				alert("한개의 파일은 삭제가 불가능 합니다.");
			}
		},
		
		// 파일 첨부 후 파일명 나옴
		fncAttachFile : function(idx) {
			file = $('input[name="attachFile'+idx+'"]')[0].files[0];
			
			var fileName = file.name;
			var fileLength = fileName.length - 1;
			var fileSize = file.size;
			var maxSize = 31457280; //30MB
			
			if(fileLength > 20) {
				alert("파일명 길이가 20이하인 파일을 등록해주세요.");
				return;
			}
			
			if(fileSize > maxSize) {
				alert("30M 이하의 파일만 등록 가능합니다.");
				return;
			}
			
			$('.fileNmInput'+idx+'').val(fileName);
			$('input[name="fileIdx"]').val(idx);
		},
		
		// 등록 및 수정
		fncSetFile : function(mode, fileSubId) {
			var fileLength = $(".fAchBtn").length;
			var maxSize = 5242880; //50MB
			var totalFileSize = 0;
			
			// 첨부하는 파일 목록 돌리는 것
			for(var i=0 ; i<fileLength ; i++) { 
				let fileChk = $(".fAchBtn").eq(i).val();
			
				if((fileChk == null || fileChk == "") && mode == "create") {
					alert("파일 첨부 후 등록 가능합니다.");
					return;
				} else if(fileChk != null && fileChk != ""){
					var eqFileSize =  $(".fAchBtn").eq(i)[0].files[0].size;
					totalFileSize += eqFileSize;
				}
			}
			
			if(mode == "create") { // 등록
				if(totalFileSize == 0) { 
					alert("등록할 파일이 없습니다.");
					return;
				} else if(totalFileSize > maxSize) {
					alert("크기 합이 50M 이하의 파일만 등록 가능합니다.");
					return;
				} else { 
					$('#attach_form [name="mode"]').val(mode);	
					$('#attach_form [name="fileSubId"]').val(fileSubId);
					$('#attach_form').submit();
				} 
			} else { // 수정
				if(totalFileSize == 0) {
					fncGoDetail(fileSubId);
				} else if(totalFileSize > maxSize) {
					alert("크기 합이 50M 이하의 파일만 등록 가능합니다.");
					return;
				} else {
					$('#attach_form [name="mode"]').val(mode);	
					$('#attach_form [name="fileSubId"]').val(fileSubId);
					$('#attach_form').submit();
				}
			}
		},
		
		// 파일 첨부 시 확장자 설정	
		fncSetFileType : function(fTypeName) {
			var fTypeList = new Array();
			
			console.log("fncSetFileType::"+fTypeName);
			
			switch(fTypeName) {
				case "image" : 
					fTypeList = new Array ("image/bmp","image/png","image/jpg","image/jpeg");
					break;
				case "excel" :
					fTypeList = new Array ("application/vnd.ms-excel","application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
					break;
				case "text" :
					fTypeList = new Array ("text/csv","text/html","text/xml","text/plain");
					break;
				case "docx" :
					fTypeList = new Array (".doc",".docx","application/msword","application/vnd.openxmlformats-officedocument.wordprocessingml.document");
					break;
				case "ppt" :
					fTypeList = new Array ("text/x-jsp");
					break;
				case "pdf" :
					fTypeList = new Array ("application/pdf");
					break;
				case "video" :
					fTypeList = new Array ("video/*");
					break;
				default :
					break;
			}
			
			return fTypeList;
		}
	};
})(jQuery);

var afCommon = new Utils.Attach_Common();