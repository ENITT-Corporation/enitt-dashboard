package kr.co.enitt.poscoWebSystem.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.enitt.poscoWebSystem.vo.CommonVO;

@Mapper
public interface EventStatsDAO {

	public List<CommonVO> getEventStatsDayList(CommonVO vo) throws Exception;

	public List<CommonVO> getEventStatsMonthList(CommonVO vo) throws Exception;

	public List<CommonVO> getEventStatsYearList(CommonVO vo) throws Exception;
	
}
