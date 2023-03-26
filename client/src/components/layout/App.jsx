import { Box } from '@mui/system';
import React from 'react'
import { Outlet, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import authUtils from '../../utils/auth';
import Sidebar from '../common/Sidebar';
import { useDispatch } from 'react-redux';
import { setUser } from '../../redux/features/userSlice';

const AppLayout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    //JWTを確認して、ログインしていない場合はログインページに遷移する
    const checkJWT = async () => {
      //認証チェック
      const user = await authUtils.isAuthenticated();
      if (!user) {
        navigate('/login');
      } else {
        //認証済みの場合は、ユーザー情報を保存する
        dispatch(setUser(user));
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