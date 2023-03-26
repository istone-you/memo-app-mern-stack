import React from 'react'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { Box, IconButton, TextField } from '@mui/material'
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import memoApi from '../../api/memo'

const Memo = () => {
  const { memoId } = useParams()
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

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
    clearTimeout(timer)
    const newTitle = e.target.value
    setTitle(newTitle)

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
        <IconButton variant="outlined" color='error'>
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