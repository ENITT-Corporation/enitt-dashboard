package kr.co.enitt.poscoWebSystem.service;

import java.util.HashMap;

import kr.co.enitt.poscoWebSystem.vo.CommonVO;

public interface EventStatsService {

	// 이벤트 통계 - 세로 막대 그래프
	HashMap<String, Object> getEventStatsDayList(CommonVO vo) throws Exception;
	HashMap<String, Object> getEventStatsMonthList(CommonVO vo) throws Exception;
	HashMap<String, Object> getEventStatsYearList(CommonVO vo) throws Exception;
}
