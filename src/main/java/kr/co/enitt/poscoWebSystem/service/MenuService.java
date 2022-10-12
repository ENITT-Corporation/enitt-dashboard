package kr.co.enitt.poscoWebSystem.service;

import java.util.List;

import kr.co.enitt.poscoWebSystem.vo.MenuVO;

public interface MenuService {
	//메뉴 목록
	List<MenuVO> getMenuList(MenuVO vo) throws Exception;
	
	//메뉴 상세
	MenuVO getMenu(MenuVO vo) throws Exception;
}
