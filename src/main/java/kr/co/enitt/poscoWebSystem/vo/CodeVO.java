package kr.co.enitt.poscoWebSystem.vo;

import lombok.Data;

public @Data class CodeVO {
	private String codeId;
	private String codeName;
	private String parentCodeId;
	private String codeLevel;
	private String codeOrder;
	private String codeUseYn;
}