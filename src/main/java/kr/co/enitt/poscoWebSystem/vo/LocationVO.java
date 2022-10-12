package kr.co.enitt.poscoWebSystem.vo;

import lombok.Data;


public @Data class LocationVO {

	private int locationId;
	private int location;
	private int locationRight;
	private int locationBottom;
	
	private String buttonCheck;
	private String eventId;
}
