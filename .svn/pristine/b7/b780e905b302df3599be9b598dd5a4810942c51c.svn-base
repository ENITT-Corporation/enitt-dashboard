package kr.co.enitt.poscoWebSystem.interceptor;


import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import kr.co.enitt.poscoWebSystem.service.MenuService;

import kr.co.enitt.poscoWebSystem.util.WebUtil;
import kr.co.enitt.poscoWebSystem.vo.MenuVO;


@Component
public class AuthInterceptor extends HandlerInterceptorAdapter {
	@Autowired 
	MenuService menuService;
	
	
	@Override
	public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
		
		String[] url = WebUtil.getUri(request).split("/");		
		MenuVO vo = new MenuVO();
		
		vo.setMenuTitle(url[1]);
		MenuVO 	menuVO = menuService.getMenu(vo);
		request.setAttribute("menuVO", menuVO);

		return true;
	}
	
}