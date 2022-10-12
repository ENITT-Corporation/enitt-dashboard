package kr.co.enitt.poscoWebSystem.vo;

import lombok.Data;

public @Data class EventVO {

	private int eventId;
	private String eventTime;
	private String eventLocation;
	private int eventLogCount;
	private String eventRegisterDate;
	private String eventCode;	
	private String eventStateCode;	
	
	private String eventCodeName;
	private String eventStateCodeName;	
}