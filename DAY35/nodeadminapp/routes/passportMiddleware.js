
// 사용자 로그인 여부를 체크하고
// 미로그인 상태에서의 요청시 로그인 페이지로 이동처리시킨다. 
// 반드시 로그인을 한 상태에서만 호출되어야하는 각종 라우팅메소드에서 설정해준다. 
exports.isLoggedIn=() =>{
    if (req.isAuthenticated()) {
		next();
	} else {
		res.redirect("/login");
	}
};

// 사용자가 로그인을 안한상태인 경우 특징 페이지로 이동시키기
// 만약에 이미 로그인 상태에서 회원가입 페이지에 대한 요청을 해오는 경우 특정 페이지(메인페이지)로 이동키시기
// 로그인을 안한상태인 경우만 요청한 라우팅 메소드로 이동시키기 
exports.isNotLoggedIn=() =>{
    if (!req.isAuthenticated()) {
		next();
	} else {
		res.redirect("/login");
	}
};