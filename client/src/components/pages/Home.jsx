import { LoadingButton } from '@mui/lab'
import { Box } from '@mui/system'
import React from 'react'
import { useState } from 'react'
import memoApi from '../../api/memo'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const createMemo = async () => {
    try {
      setLoading(true)
      //メモを作成する
      const res = await memoApi.create();
      console.log(res);
      //作成したメモのページに遷移する
      navigate(`/memo/${res._id}`)
    } catch (error) {
      alert(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box sx={{
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center"
    }}>
      <LoadingButton variant='outlined' onClick={() => createMemo()} loading={loading}>メモを作成</LoadingButton>
    </Box>
  )
}

export default Home