package kr.co.enitt.poscoWebSystem.service;

import java.util.List;

import kr.co.enitt.poscoWebSystem.vo.CommonVO;
import kr.co.enitt.poscoWebSystem.vo.ConveyorVO;

public interface ConveyorService {
	//  목록
	List<ConveyorVO> getConveyorList(CommonVO vo) throws Exception;
	List<ConveyorVO> getConveyorPagingList(CommonVO vo) throws Exception;
	int getConveyorListCnt(CommonVO vo) throws Exception;
		
	
}
