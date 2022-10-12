package kr.co.enitt.poscoWebSystem.service;

import java.util.List;

import kr.co.enitt.poscoWebSystem.vo.CommonVO;
import kr.co.enitt.poscoWebSystem.vo.EventStateVO;
import kr.co.enitt.poscoWebSystem.vo.EventVO;

public interface EventService {

	// 리스트 개수
	int getEventListCnt(CommonVO vo) throws Exception;
	
	// 분포도 
	List<CommonVO> getEventList(CommonVO vo) throws Exception;
	
	EventVO getEventDetail(EventVO vo) throws Exception;
	
	// 이벤트 이력 - 목록
	List<CommonVO> getEventHistoryList(CommonVO vo) throws Exception;
	int getEventHistoryListCnt(CommonVO vo) throws Exception;
	
	// 이벤트 이력 - 상세 정보 - 목록
	List<CommonVO> getEventStateDetail(EventVO vo) throws Exception;
	
	// 이벤트 상태 변경
	void ajaxInsertEventStateLog(EventStateVO vo) throws Exception;

	CommonVO getEventPopupDetail(CommonVO vo) throws Exception;
	
}
