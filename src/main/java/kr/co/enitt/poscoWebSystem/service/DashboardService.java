package kr.co.enitt.poscoWebSystem.service;

import java.util.List;

import kr.co.enitt.poscoWebSystem.vo.CommonVO;
import kr.co.enitt.poscoWebSystem.vo.ConveyorVO;
import kr.co.enitt.poscoWebSystem.vo.EquipmentVO;
import kr.co.enitt.poscoWebSystem.vo.EventVO;
import kr.co.enitt.poscoWebSystem.vo.LocationVO;

public interface DashboardService {
	// 이벤트 목록
	List<CommonVO> getEventList() throws Exception;
	
	// 컨베이어 벨트 상태
	ConveyorVO getConveyorState() throws Exception;
	
	// DAS 장비 상태
	EquipmentVO getEquipmentState() throws Exception;
	
	// trendLog 
	void setTrendLogCreate(CommonVO commonVO) throws Exception;
	
	// exe 버튼 클릭 시, 해당 롤러ID 가져오기
	EventVO getEvent(CommonVO commonVO) throws Exception;
	
	List<LocationVO> getMarkingList() throws Exception;
	
	List<EventVO> getEventLogCnt();
	
	List<LocationVO> getMarkingCheckList();
}
