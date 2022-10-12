package kr.co.enitt.poscoWebSystem.util;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;

import com.fasterxml.jackson.databind.ObjectMapper;

public class SessionScopeUtil {
	public static Object getAttribute(String name) {
		return RequestContextHolder.getRequestAttributes().getAttribute(name, RequestAttributes.SCOPE_SESSION);
	}
	
	public static <T> T getAttribute(String name, Class<T> clzz) {
		Object attr = getAttribute(name);
		ObjectMapper om = new ObjectMapper();
		
		if (attr == null) {
			return null;
		}
		
		return om.convertValue(attr, clzz);
	}
	
	public static void setAttribute(String name, Object object) {
		RequestContextHolder.getRequestAttributes().setAttribute(name, object, RequestAttributes.SCOPE_SESSION);
	}
	
	public static void removeAttribute(String name) {
		RequestContextHolder.getRequestAttributes().removeAttribute(name, RequestAttributes.SCOPE_SESSION);
	}
	
	public static HttpSession getSession() {
		HttpServletRequest request = ((ServletRequestAttributes) RequestContextHolder.getRequestAttributes()).getRequest();
		return request.getSession(true);
	}
}
