package kr.co.enitt.poscoWebSystem.controller;

import java.util.HashMap;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import kr.co.enitt.poscoWebSystem.service.EventService;
import kr.co.enitt.poscoWebSystem.util.ObjectUtil;
import kr.co.enitt.poscoWebSystem.vo.CommonVO;

@Controller
@RequestMapping("/main")
public class MainController {
	
	@Resource(name = "eventService")
	private EventService eventService;

	/**
	  * @Method_Name : ajaxEventCnt
	  * @return :Object
	  * @Date : 2022. 9. 16.
	  * @Author : ENITT_KHR
	  * @Method_Description : 메뉴 - 이벤트 갯수 
	  * ---------------------
	  * @변경이력
	  * 2022. 9. 16. ENITT_KHR : 생성
	  */
	@RequestMapping("/ajaxEventCnt")
	public @ResponseBody Object ajaxEventCnt() throws Exception{
		Map<String, Object> result = new HashMap<String, Object>();
		CommonVO vo = new CommonVO();
		
		// 시간 적용
		vo.setDashboard("Y");
		vo.setNow(ObjectUtil.getNow("", 0));
		
		// 이벤트 갯수
		int cnt = eventService.getEventListCnt(vo);
		
		result.put("eventCnt", cnt);	
		result.put("commonVO", vo);
		return result;
	}
}
