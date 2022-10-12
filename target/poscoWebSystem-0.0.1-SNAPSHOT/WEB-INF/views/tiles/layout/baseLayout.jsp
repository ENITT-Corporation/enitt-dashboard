<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="tiles" uri="http://tiles.apache.org/tags-tiles"%>

<!DOCTYPE html>

<html>
	<head>
		<tiles:insertAttribute name="header" />
		<tiles:insertAttribute name="resource" />
	</head>
	
	<body>
		<input type="hidden" value="${pageContext.request.contextPath}" id="contextPath" />
		<div class="wrap">
			<header id="header">
				<tiles:insertAttribute name="top-header" />
				<tiles:insertAttribute name="menu" />
			</header>
			<div id="container">
				<div class="contents-wrap">
					<tiles:insertAttribute name="navi" />
					<tiles:insertAttribute name="content" />
				</div>
			</div>
			
		</div>
		
	</body>
	
</html>


