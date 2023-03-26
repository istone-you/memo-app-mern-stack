import { Box, Container } from '@mui/system';
import React from 'react'
import { Outlet } from "react-router-dom";
import logo from '../../assets/images/Notion_logo.png';

const Auth = () => {
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
          メモアプリ
        </Box>
        <Outlet />
      </Container>
    </div>
  )
}

export default Auth