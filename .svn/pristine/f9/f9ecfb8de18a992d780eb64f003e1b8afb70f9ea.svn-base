package kr.co.enitt.poscoWebSystem.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.enitt.poscoWebSystem.dao.MenuDAO;
import kr.co.enitt.poscoWebSystem.service.MenuService;
import kr.co.enitt.poscoWebSystem.vo.MenuVO;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

@Service("menuService")
public class MenuServiceImpl implements MenuService{
	@Autowired
	private MenuDAO menuDAO;

	@Override
	public List<MenuVO> getMenuList(MenuVO menuVO) throws Exception {
		List<MenuVO> list = menuDAO.getMenuList(menuVO);
		int level;
		int level2;
		String name;
		String url;
		List<MenuVO> reault = new ArrayList<MenuVO>();
		int index = 0;
		for(MenuVO vo : list) {
			level = Integer.parseInt(vo.getMenuLevel());
			name = "";
			url = "";
			for(MenuVO vo2 : list) {
				level2 = Integer.parseInt(vo2.getMenuLevel());
				if(level > level2) {
					if(vo.getParentMenuId().equals(vo2.getMenuId())) {
						name = vo2.getName()+",";
						url = vo2.getUrl()+",";
					}
				}else {
					break;
				}
				
			}
			index = 0;
			for(MenuVO reaultVo : reault) {
				if(!"1".equals(reaultVo.getMenuLevel())) {
					if(reaultVo.getParentMenuId().equals(vo.getMenuId())) {
						index = reault.indexOf(reaultVo);
					}
					if(reaultVo.getParentMenuId().equals(vo.getParentMenuId())) {
						index = reault.indexOf(reaultVo);
					}
				}
			}
			if(index == 0) {
				reault.add(vo);
			}else {
				reault.add(index+1,vo);
			}
			
			name = name+vo.getMenuName();
			url = url+vo.getMenuUrl();
			vo.setNameList(Arrays.asList(name.split(",")));
			vo.setUrlList(Arrays.asList(url.split(",")));
		}
		
		return list;
	}
	
	@Override
	public MenuVO getMenu(MenuVO vo) throws Exception {
		MenuVO detail = menuDAO.getMenu(vo);
		return detail;
	}
	
}
