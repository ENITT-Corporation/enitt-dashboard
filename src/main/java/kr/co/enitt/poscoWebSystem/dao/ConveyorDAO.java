package kr.co.enitt.poscoWebSystem.dao;

import java.util.List;

import org.apache.ibatis.annotations.Mapper;

import kr.co.enitt.poscoWebSystem.vo.CommonVO;
import kr.co.enitt.poscoWebSystem.vo.ConveyorVO;

@Mapper
public interface ConveyorDAO{
	// 목록
	public List<ConveyorVO> getConveyorList(CommonVO vo) throws Exception;
	public List<ConveyorVO> getConveyorPagingList(CommonVO vo) throws Exception;
	public int getConveyorListCnt(CommonVO vo) throws Exception;
	
}