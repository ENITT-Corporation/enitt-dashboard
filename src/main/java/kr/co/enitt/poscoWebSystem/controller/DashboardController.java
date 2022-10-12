package kr.co.enitt.poscoWebSystem.controller;


import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import kr.co.enitt.poscoWebSystem.service.CodeService;
import kr.co.enitt.poscoWebSystem.service.DashboardService;
import kr.co.enitt.poscoWebSystem.service.EventService;
import kr.co.enitt.poscoWebSystem.util.ObjectUtil;
import kr.co.enitt.poscoWebSystem.vo.CodeVO;
import kr.co.enitt.poscoWebSystem.vo.CommonVO;
import kr.co.enitt.poscoWebSystem.vo.ConveyorVO;
import kr.co.enitt.poscoWebSystem.vo.EquipmentVO;
import kr.co.enitt.poscoWebSystem.vo.EventVO;
import kr.co.enitt.poscoWebSystem.vo.LocationVO;


/**
* @Project : poscoWebSystem
* @FileName : DashboardController.java
* @Author : ENITT_KHR
* @Date : 2022. 07. 05. 
* @Description : 대시보드
* ===========================================================
* DATE                   AUTHOR                     NOTE
* -----------------------------------------------------------
* 2022. 07. 05.        ENITT      최초작성
*/
@Controller 
@RequestMapping("/dashboard")
public class DashboardController {

	@Resource(name = "dashboardService")
	private DashboardService dashboardService;
	
	@Resource(name = "eventService")
	private EventService eventService;
	
	@Resource(name = "codeService")
	private CodeService codeService;

	private static final Logger logger = LoggerFactory.getLogger(DashboardController.class);
		
	/**
	  * @Method_Name : main
	  * @return :ModelAndView
	  * @Date : 2022. 07. 05.
	  * @Author : ENITT_KHR
	  * @Method_Description : 대시보드 화면 호출
	  * ---------------------
	  * @변경이력
	  * 2022. 07. 05. ENITT_KHR : 생성
	  */
	@RequestMapping(value= {"","/"})
	public ModelAndView main(HttpServletRequest request, CommonVO vo) throws Exception {
		ModelAndView mav = new ModelAndView();
		request.setCharacterEncoding("UTF-8");
		
		// 이벤트 상태 변경 selectBox
		vo.setParentCode("STATE");
		List<CodeVO> eventStateSearchList = codeService.getCodeList(vo);
		List<LocationVO> markingCheckList = dashboardService.getMarkingCheckList();
		
		mav.addObject("eventStateSearchList", eventStateSearchList);
		mav.addObject("markingCheckList",markingCheckList);
		mav.setViewName("dashboard/main");    
		return mav;
	}	
	
	
	@RequestMapping("/ajaxMainClickTrendView")
	public @ResponseBody void ajaxMainClickTrendView(HttpServletRequest request) {
		CommonVO commonVO = new CommonVO();
		
		try {
			// exe 파일 실행 
			
			Runtime rt = Runtime.getRuntime();
//			String file = "C:\\Program Files\\Microsoft Office\\root\\Office16\\EXCEL.EXE";
			String file = "C:\\Dev\\workspace\\poscoWebSystem\\src\\main\\webapp\\trendView\\TrendView_Start.bat";
				
			String now = ObjectUtil.getNow("",0);
			Process process;
			
			//Process process = new ProcessBuilder(file, now).start();
			
			process = rt.exec(file);
			process.waitFor();
			
//			commonVO.setTrendMarkingCheck('Y');
			commonVO.setTrendLocation("650");
			dashboardService.setTrendLogCreate(commonVO);

		} catch(Exception e) {
			logger.info("exception 확인::"+e);
		}
	}
	
	/**
	  * @Method_Name : ajaxExecuteExeFile
	  * @return :void
	  * @Date : 2022. 09. 05.
	  * @Author : ENITT_KHR
	  * @Method_Description : 이벤트 메세지 클릭 시, trend 차트 실행
	  * ---------------------
	  * @변경이력
	  * 2022. 09. 05. ENITT_KHR : 생성
	  * 2022. 10. 06. ENITT_KHR : 변경 - 이벤트 처리 되지 않은 상태로 21일이 초과하면 alert 표출
	  */

	@RequestMapping("/ajaxExecuteTrendChart")
	public @ResponseBody CommonVO ajaxExecuteTrendChart(CommonVO commonVO) throws Exception {
		String now = ObjectUtil.getNow("",0);
		String eventTime = commonVO.getEventTime();
		long checkDay = 21;
		
		try {
			if(ObjectUtil.diffDays(now, eventTime) <= checkDay) {
				dashboardService.setTrendLogCreate(commonVO);
			} else { // 21일 초과
				commonVO.setResult(true);
				commonVO.setContent("이벤트가 발생된 지 21일이 초과되었습니다. \n해당 이벤트는 트렌드 차트를 확인할 수 없습니다.");
			}
		} catch(Exception e) {
			e.printStackTrace();
		}
		return commonVO;
	}
	
	
	
	/**
	  * @Method_Name : ajaxExecuteTrendChartAll
	  * @return :void
	  * @Date : 2022. 09. 06.
	  * @Author : ENITT_KHR
	  * @Method_Description : 롤러 눈금 클릭 시, trend 차트 실행
	  * ---------------------
	  * @변경이력
	  * 2022. 09. 06. ENITT_KHR : 생성
	  */
	@RequestMapping("/ajaxExecuteTrendChartAll")
	public @ResponseBody void ajaxExecuteTrendChartAll(CommonVO commonVO) throws Exception {	
		try {
			// 버튼 클릭 시, trendLog 테이블에 삽입
			dashboardService.setTrendLogCreate(commonVO);
		} catch(Exception e) {
			e.printStackTrace();
		}
	}
	
	/**
	  * @Method_Name : ajaxEventList
	  * @return :ModelAndView
	  * @Date : 2022. 08. 01.
	  * @Author : ENITT_KHR
	  * @Method_Description : 대시보드의 이벤트 목록 출력
	  * ---------------------
	  * @변경이력
	  * 2022. 08. 01. ENITT_KHR : 생성
	  */
	@RequestMapping("/content/ajaxEventList")
	public @ResponseBody ModelAndView ajaxEventList(CommonVO vo) throws Exception {
		int listSize = 4;
		ModelAndView mav = new ModelAndView();
		vo.setNow(ObjectUtil.getNow("",0)); // 현재 시간
		
		// 이벤트 목록
	    List<CommonVO> list = eventService.getEventList(vo);
	    
	    // 대시보드 이벤트 목록 갯수가 4개 미만 일 경우, 빈칸으로 보여주기 
	    if(isListSizeOrLessBlank(list, listSize)) {
	    	orLessEventList(list, listSize);
	    } 
	    
	    vo.setTotalCount(list.size()); 
	    mav.addObject("eventList", list);
	    
		mav.addObject("commonVO", vo);	
		mav.setViewName("dashboard/content/event_list");
		return mav;
	}
	
	/**
	 * list의 갯수가 listSize의 미만이거나 값이 있는지 확인합니다.
	 * @param list 		- 대시보드에 보일 이벤트 목록
	 * @param listSize  - 해당 갯수 미만일 경우, 빈칸으로 보여주기
	 * @return 			- 확인 결과
	 */
	private static boolean isListSizeOrLessBlank(List<CommonVO> list, int listSize) {
		return list.size() < listSize || !list.isEmpty();
	}
	
	/**
	 * listSize의 미만일 경우, list에 빈칸을 추가합니다.
	 * @param list 		- 대시보드에 보일 이벤트 목록
	 * @param listSize  - 해당 갯수 미만일 경우, 빈칸으로 보여주기
	 * @return          - 빈칸이 포함된 이벤트 목록 결과
	 */
	private static List<CommonVO> orLessEventList(List<CommonVO> list, int listSize) {
		for(int i=list.size() ; i < listSize ; i++) {
			list.add(new CommonVO());
		}
		
		return list;
	}
	
	
	/**
	  * @Method_Name : ajaxEventCnt
	  * @return :Object
	  * @Date : 2022. 07. 28.
	  * @Author : ENITT_KHR
	  * @Method_Description : 이벤트 알림 갯수
	  * ---------------------
	  * @변경이력
	  * 2022. 07. 28. ENITT_KHR : 생성
	  */
	@RequestMapping("/ajaxEventCnt")
	public @ResponseBody Object ajaxEventCnt(CommonVO vo) throws Exception {
		HashMap<String,Object> result = new HashMap<String,Object>();
		
		vo.setNow(ObjectUtil.getNow("",0)); // 현재 시간
		String timeStr = ObjectUtil.getNow("SECOND", -4);		
		
		vo.setEventLastTime(timeStr);
		int eventNewCnt = eventService.getEventListCnt(vo);
		result.put("eventNewCnt", eventNewCnt);
		
		vo.setEventLastTime("");
		int eventCnt = eventService.getEventListCnt(vo);
		result.put("eventCnt", eventCnt);
		
		return result;
	}
	
	/**
	  * @Method_Name : ajaxEventLogCnt
	  * @return :List<EventVO>
	  * @Date : 2022. 10. 04.
	  * @Author : ENITT_KHR
	  * @Method_Description : 이벤트 목록의 이벤트 로그 개수
	  * ---------------------
	  * @변경이력
	  * 2022. 10. 04. ENITT_KHR : 생성
	  */
	@RequestMapping("/ajaxEventLogCnt")
	public @ResponseBody List<EventVO> ajaxEventLogCnt() {
		List<EventVO> logCntList = dashboardService.getEventLogCnt();
		
		return logCntList;
	}
	
	/**
	  * @Method_Name : ajaxEvent
	  * @return :ModelAndView
	  * @Date : 2022. 07. 28.
	  * @Author : ENITT_KHR
	  * @Method_Description : 이벤트 알림 아이콘 출력
	  * ---------------------
	  * @변경이력
	  * 2022. 07. 28. ENITT_KHR : 생성
	  */
	@RequestMapping("/content/ajaxEvent")
	public @ResponseBody ModelAndView ajaxEvent(CommonVO vo) throws Exception {
		ModelAndView mav = new ModelAndView();
		
		vo.setNow(ObjectUtil.getNow("",0));
		List<CommonVO> dasEventList = eventService.getEventList(vo);
		mav.addObject("dasEventList", dasEventList);
	
		
		if(ObjectUtil.isNotEmpty(dasEventList)) {
			isDashboardEventId(vo, dasEventList);
			vo.setEventLastTime(dasEventList.get(0).getEventTime());
		}
		
		mav.addObject("commonVO", vo);
		mav.setViewName("dashboard/content/dashboard/das_event");
		return mav;
	}
	
	/**
	 * 대시보드 이벤트 ID의 존재 여부를 확인합니다.
	 * @param vo 		- 대시보드 이벤트 id
	 * @return 			- 확인 결과
	 */
	private static CommonVO isDashboardEventId(CommonVO vo, List<CommonVO> dasEventList) {
		if(vo.getDashboard_dasEventId() == null || vo.getDashboard_dasEventId().equals("")) {
			vo.setDashboard_dasEventId(dasEventList.get(0).getEventId());
		}
		
		return vo;
	}
	
	/**
	  * @Method_Name : ajaxEventAlarm
	  * @return :ModelAndView
	  * @Date : 2022. 07. 28.
	  * @Author : ENITT_KHR
	  * @Method_Description : 이벤트 메시지 출력
	  * ---------------------
	  * @변경이력
	  * 2022. 07. 28. ENITT_KHR : 생성
	  */
	@RequestMapping("/content/ajaxEventAlarm")
	public @ResponseBody ModelAndView ajaxEventAlarm(CommonVO vo) throws Exception {
		ModelAndView mav = new ModelAndView();
		
		vo.setNow(ObjectUtil.getNow("",0)); 
		List<CommonVO> dasEventList = eventService.getEventList(vo);
		mav.addObject("dasEventList", dasEventList);
		
		if(ObjectUtil.isNotEmpty(dasEventList)) {
			isDashboardEventId(vo, dasEventList);
		}
		
		
		mav.setViewName("dashboard/content/dashboard/event_popup");
		return mav;
	}
	
	/**
	  * @Method_Name : ajaxEquipmenState
	  * @return :ModelAndView
	  * @Date : 2022. 07. 27.
	  * @Author : ENITT_KHR
	  * @Method_Description : DAS 장비 상태 확인
	  * ---------------------
	  * @변경이력
	  * 2022. 07. 27. ENITT_KHR : 생성
	  */
	@RequestMapping("/content/equipmentState")
	public @ResponseBody ModelAndView ajaxEquipmenState(CommonVO vo) throws Exception {
		ModelAndView mav = new ModelAndView();
		
		// DAS 장비 상태
		EquipmentVO equipVO = dashboardService.getEquipmentState();
		mav.addObject("equipmentVO", equipVO);
		
		mav.setViewName("dashboard/content/dashboard/equipment_state");
		return mav;
	}
	
	/**
	  * @Method_Name : ajaxConveyorState
	  * @return :ModelAndView
	  * @Date : 2022. 07. 27.
	  * @Author : ENITT_KHR
	  * @Method_Description : 컨베이어 벨트 상태 확인
	  * ---------------------
	  * @변경이력
	  * 2022. 07. 27. ENITT_KHR : 생성
	  */
	@RequestMapping("/content/conveyorState")
	public @ResponseBody ModelAndView ajaxConveyorState() throws Exception {
		ModelAndView mav = new ModelAndView();			
		
		// 컨베이어 벨트 상태
		ConveyorVO conveyorVO = dashboardService.getConveyorState();
		
		mav.addObject("conveyorVO", conveyorVO);	
		mav.setViewName("dashboard/content/dashboard/conveyor");
		return mav;
	}
	
	/**
	  * @Method_Name : dashConveyorState
	  * @return :ModelAndView
	  * @Date : 2022. 09. 02.
	  * @Author : ENITT_KHR
	  * @Method_Description : 대시보드의 컨베이어 벨트 상태 확인
	  * ---------------------
	  * @변경이력
	  * 2022. 09. 02. ENITT_KHR : 생성
	  */
	@RequestMapping("/content/dashConveyorState")
	public @ResponseBody ModelAndView ajaxDashConveyorState() throws Exception {
		ModelAndView mav = new ModelAndView();
		
		// 컨베이어 벨트 상태
		ConveyorVO conveyorVO = dashboardService.getConveyorState();
		
		mav.addObject("conveyorVO", conveyorVO);	
		mav.setViewName("dashboard/content/dashboard/conveyor_belt");
		return mav;
	}
	
	/**
	  * @Method_Name : ajaxEventPop
	  * @return :ModelAndView
	  * @Date : 2022. 08. 05.
	  * @Author : ENITT_KHR
	  * @Method_Description : 이벤트 목록 - 이벤트 발생 알림 메시지 노출
	  * ---------------------
	  * @변경이력
	  * 2022. 08. 05. ENITT_KHR : 생성
	  */
	@RequestMapping("/content/ajaxEventPop")
	public @ResponseBody ModelAndView ajaxEventPop(CommonVO vo) throws Exception {
		ModelAndView mav = new ModelAndView();
		
		vo = eventService.getEventPopupDetail(vo);
		mav.addObject("commonVO", vo);
		
		mav.setViewName("dashboard/content/dashboard/event_popup");
		return mav;
	}
	
	/**
	  * @Method_Name : ajaxDashStatePopupOpen
	  * @return :ModelAndView
	  * @Date : 2022. 08. 19.
	  * @Author : ENITT_KHR
	  * @Method_Description : 이벤트 목록 - 상태 변경 팝업 노출
	  * ---------------------
	  * @변경이력
	  * 2022. 08. 19. ENITT_KHR : 생성
	  */
	@RequestMapping("/content/ajaxDashStatePopupOpen")
	public @ResponseBody ModelAndView ajaxDashStatePopupOpen(CommonVO vo) throws Exception {
		ModelAndView mav = new ModelAndView();
		
		// selectBox
		vo.setParentCode("STATE");
		List<CodeVO> eventStateList = codeService.getCodeList(vo);
		mav.addObject("eventStateList", eventStateList);

		mav.addObject("commonVO", vo);		
		mav.setViewName("dashboard/content/dashboard/state_popup");
		return mav;
	}
	
	/**
	  * @Method_Name : ajaxRollerMarking
	  * @return :ModelAndView
	  * @Date : 2022. 09. 05
	  * @Author : ENITT_KHR
	  * @Method_Description : 이벤트 존재 시, 롤러 눈금에 마킹 표시
	  * ---------------------
	  * @변경이력
	  * 2022. 09. 05 ENITT_KHR : 생성
	  * 2022. 10. 06 ENITT_KHR : 변경
	  */
	@RequestMapping("/content/ajaxRollerMarking")
	public @ResponseBody ModelAndView ajaxRollerMarking() throws Exception {
		ModelAndView mav = new ModelAndView();
		
		List<LocationVO> markingCheckList = dashboardService.getMarkingCheckList();
		
		mav.addObject("markingCheckList",markingCheckList);
		mav.setViewName("dashboard/content/dashboard/roller_marking");
		return mav;
	}
}
