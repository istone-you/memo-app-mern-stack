import { Box, Container } from '@mui/system';
import React from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import logo from '../../assets/images/Notion_logo.png';
import authUtils from '../../utils/auth';

const Auth = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //JWTを確認して、ログインしていない場合はログインページに遷移する
    const checkJWT = async () => {
      //認証チェック
      const isAuth = await authUtils.isAuthenticated();
      if (isAuth) {
        navigate('/');
      }
    };
    checkJWT();
  }, [navigate])

  return (
    <div>
      <Container component="main" maxWidth="xs">
        <Box sx={{
          marginTop: 4,
          display: 'flex',
          alignItems: 'center',
          flexDirection: 'column',
        }}
        >
          <img src={logo} alt="logo" style={{ width: 100, height: 100, marginBottom: 3 }} />
          Memo App
        </Box>
        <Outlet />
      </Container>
    </div>
  )
}

export default Auth