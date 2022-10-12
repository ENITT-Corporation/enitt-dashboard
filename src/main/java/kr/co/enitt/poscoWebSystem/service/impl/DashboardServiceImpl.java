package kr.co.enitt.poscoWebSystem.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.enitt.poscoWebSystem.dao.DashboardDAO;
import kr.co.enitt.poscoWebSystem.service.DashboardService;
import kr.co.enitt.poscoWebSystem.vo.CommonVO;
import kr.co.enitt.poscoWebSystem.vo.ConveyorVO;
import kr.co.enitt.poscoWebSystem.vo.EquipmentVO;
import kr.co.enitt.poscoWebSystem.vo.EventVO;
import kr.co.enitt.poscoWebSystem.vo.LocationVO;

@Service("dashboardService")
public class DashboardServiceImpl implements DashboardService{
	
	@Autowired
	private DashboardDAO dashboardDAO;
	
	@Override
	public List<CommonVO> getEventList() throws Exception {
		return dashboardDAO.getEventList();
	}
	
	@Override
	public ConveyorVO getConveyorState() throws Exception {
		return dashboardDAO.getConveyorState();
	}

	@Override
	public EquipmentVO getEquipmentState() throws Exception {
		return dashboardDAO.getEquipmentState();
	}
	
	@Override
	public void setTrendLogCreate(CommonVO commonVO) throws Exception {
		dashboardDAO.setTrendLogCreate(commonVO);
	}

	@Override
	public EventVO getEvent(CommonVO commonVO) throws Exception {
		return dashboardDAO.getEvent(commonVO);
	}

	@Override
	public List<LocationVO> getMarkingList() throws Exception {
		return dashboardDAO.getMarkingList();
	}
	
	@Override
	public List<EventVO> getEventLogCnt() {
		return dashboardDAO.getEventLogCnt();
	}
	
	@Override
	public List<LocationVO> getMarkingCheckList() {
		return dashboardDAO.getMarkingCheckList();
	}
 }
