const handleLogin = async (loginData) => {
  try {
    // 로그인 API 호출 후
    const response = await loginAPI(loginData);
    
    // 로그인 성공 시 localStorage에 필요한 정보 저장
    localStorage.setItem('isLoggedIn', 'true');
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify({
      nickname: response.nickname,
      // 기타 필요한 사용자 정보
    }));
    
    // 마이페이지로 이동
    navigate('/mypage');
  } catch (error) {
    console.error('로그인 실패:', error);
  }
}; 