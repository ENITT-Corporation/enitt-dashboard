package kr.co.enitt.poscoWebSystem.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.enitt.poscoWebSystem.vo.CommonVO;
import kr.co.enitt.poscoWebSystem.vo.EventStateVO;
import kr.co.enitt.poscoWebSystem.vo.EventVO;

@Mapper
public interface EventDAO {

	
	// 리스트 갯수
	public int getEventListCnt(CommonVO vo);

	// 분포도
	public List<CommonVO> getEventList(CommonVO vo);
	
	// 상세 정보 리스트
	public List<CommonVO> getEventStateDetail(EventVO vo);

	public List<CommonVO> getEventHistoryList(CommonVO vo);

	public int getEventHistoryListCnt(CommonVO vo);
	
	public EventVO getEventDetail(EventVO vo);
	
	public void ajaxInsertEventStateLog(EventStateVO vo);

	public CommonVO getEventPopupDetail(CommonVO vo);

	
}
