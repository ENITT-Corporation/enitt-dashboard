package kr.co.enitt.poscoWebSystem.vo;

import java.util.ArrayList;
import java.util.List;

import lombok.Data;

public @Data class MenuVO {
	private String menuId;
	private String menuName;
	private String parentMenuId;
	private String menuLevel;
	private String menuOrder;
	private String menuUrl;
	private String menuUseYn;
	private String menuTitle;
	private String menuAuth;

	
	private String parentMenuName;
	private String parentMenuLevel;
	private String parentMenuOrder;
	private String parentMenuUrl;
	private String parentMenuUseYn;
	private String parentMenuTitle;
	private String parentMenuAuth;
	
	private String name;
	private List<String> nameList = new ArrayList<String>();
	private String url;
	private List<String> urlList = new ArrayList<String>();	
	
}