package kr.co.enitt.poscoWebSystem.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.enitt.poscoWebSystem.dao.ConveyorDAO;
import kr.co.enitt.poscoWebSystem.service.ConveyorService;
import kr.co.enitt.poscoWebSystem.vo.CommonVO;
import kr.co.enitt.poscoWebSystem.vo.ConveyorVO;

@Service("conveyorService")
public class ConveyorServiceImpl implements ConveyorService{
	@Autowired
	private ConveyorDAO conveyorDAO;
	
	/**
	  * @Method_Name : getList , getPagingList, getrListCnt
	  * @Method_Description : 목록
	  * ---------------------
	  * @변경이력
	  * 2020. 9. 9. KEJ : 생성
	  */
	@Override
	public List<ConveyorVO> getConveyorList(CommonVO vo) throws Exception {
		List<ConveyorVO> list = conveyorDAO.getConveyorList(vo);
		return list;
	}
	@Override
	public List<ConveyorVO> getConveyorPagingList(CommonVO vo) throws Exception {
		List<ConveyorVO> list = conveyorDAO.getConveyorPagingList(vo);
		return list;
	}
	public int getConveyorListCnt(CommonVO vo) throws Exception {
		int cnt = conveyorDAO.getConveyorListCnt(vo);
		return cnt;
	}
	
	
}
