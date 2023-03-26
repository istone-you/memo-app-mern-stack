import React from 'react'
import { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { Box, IconButton, TextField } from '@mui/material'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import memoApi from '../../api/memo'
import { useSelector, useDispatch } from 'react-redux'
import { setMemo } from '../../redux/features/memoSlice'


const Memo = () => {
  const { memoId } = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const memos = useSelector(state => state.memo.value);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const getMemo = async () => {
      try {
        const res = await memoApi.getOne(memoId)
        setTitle(res.title)
        setDescription(res.description)
      } catch (error) {
        alert(error)
      }
    }
    getMemo()
  }, [memoId])

  let timer;
  const timeout = 1000;

  const updateTitle = async (e) => {
    const newTitle = e.target.value
    setTitle(newTitle)
    clearTimeout(timer)

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { title: newTitle })
      } catch (error) {
        alert(error)
      }
    }, timeout)
  }

  const updateDescription = async (e) => {
    clearTimeout(timer)
    const newDescription = e.target.value
    setDescription(newDescription)

    timer = setTimeout(async () => {
      try {
        await memoApi.update(memoId, { description: newDescription })
      } catch (error) {
        alert(error)
      }
    }, timeout)
  }

  const deleteMemo = async () => {
    try {
      const deletedMemo = await memoApi.delete(memoId)
      alert(deletedMemo)
      const newMemos = memos.filter(memo => memo._id !== memoId)
      if  (newMemos.length === 0) {
        navigate(`/memo`)
      } else {
        navigate(`/memo/${newMemos[0]._id}`)
      }

      dispatch(setMemo(newMemos))
    } catch (error) {
      alert(error)
    }
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          width: "100%",
        }}
      >
        <IconButton>
          <StarBorderOutlinedIcon />
        </IconButton>
        <IconButton
          variant="outlined"
          color='error'
          onClick={deleteMemo}
        >
          <DeleteOutlinedIcon />
        </IconButton>
      </Box>
      <Box sx={{ padding: "10px 50px" }}>
        <TextField
          onChange={updateTitle}
          value={title}
          placeholder='無題'
          variant='outlined'
          fullWidth
          sx={{
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
            ".MuiOutlinedInput-root": { fontSize: "2rem", fontWeight: "700" },
          }}
        />
        <TextField
          onChange={updateDescription}
          value={description}
          placeholder='追加'
          variant='outlined'
          fullWidth
          sx={{
            ".MuiOutlinedInput-notchedOutline": { border: "none" },
            ".MuiOutlinedInput-root": { fontSize: "1rem" },
          }}
        />
      </Box>
    </>
  )
}

export default Memo