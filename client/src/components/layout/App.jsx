import { Box } from '@mui/system';
import React from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import authUtils from '../../utils/auth';
import Sidebar from '../common/Sidebar';

const AppLayout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    //JWTを確認して、ログインしていない場合はログインページに遷移する
    const checkJWT = async () => {
      //認証チェック
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate('/login');
      }
    };
    checkJWT();
  }, [navigate])

  return (
    <div>
      <Box sx={{ display: 'flex'}}>
        <Sidebar />
        <Box sx={{ flexGrow: 1, p: 1, width: "max-comtent" }}>
            <Outlet />
        </Box>
      </Box>
    </div>
  )
}

export default AppLayout