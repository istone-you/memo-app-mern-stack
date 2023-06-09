import { Box, Button, TextField } from '@mui/material'
import React from 'react'
import { LoadingButton } from "@mui/lab";
import { Link, useNavigate } from "react-router-dom";
import authApi from '../../api/auth';
import { useState } from 'react';

const Login = () => {
  const navigate = useNavigate();

  const [usernameErrText, setUsernameErrText] = useState('');
  const [passwordErrText, setPasswordErrText] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setUsernameErrText('');
    setPasswordErrText('');

    //入力した値を取得
    const data = new FormData(e.target);
    const username = data.get('username').trim();
    const password = data.get('password').trim();
    console.log(username);
    console.log(password);

    let error = false;

    if (username === '') {
      error = true;
      setUsernameErrText('お名前を入力してください');
    }
    if (password === '') {
      error = true;
      setPasswordErrText('パスワードを入力してください');
    }

    if (error) {
      return;
    }

    setLoading(true);

    //新規登録APIを叩く
    try {
      const res = await authApi.login({
        username,
        password,
      });
      setLoading(false);
      localStorage.setItem('token', res.token);
      console.log("ログインに成功しました");
      navigate('/');
    } catch (error) {
      console.log(error);
      const errors = error.data.errors;
      errors.forEach((err) => {
        if (err.param === 'username') {
          setUsernameErrText(err.msg);
        }
        if (err.param === 'password') {
          setPasswordErrText(err.msg);
        }
      });
      setLoading(false);
    }
  }
  return (
    <>
      <Box component="form" onSubmit={handleSubmit} noValidate>
        <TextField
          fullWidth
          id="username"
          label="お名前"
          margin="normal"
          name="username"
          required
          helperText={usernameErrText}
          error={usernameErrText !== ''}
          disabled={loading}
        />
        <TextField
          fullWidth
          id="password"
          label="パスワード"
          margin="normal"
          name="password"
          type="password"
          required
          helperText={passwordErrText}
          error={passwordErrText !== ''}
          disabled={loading}
        />
        <LoadingButton
          sx={{ mt: 3, mb: 2 }}
          fullWidth
          type="submit"
          loading={loading}
          color="primary"
          variant="contained"
        >ログイン
        </LoadingButton>
      </Box>
      <Button component={Link} to="/register">新規登録はこちら</Button>
    </>
  )
}

export default Login