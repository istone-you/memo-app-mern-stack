import React from 'react'
import { useEffect } from 'react'
import { Box } from '@mui/system'
import { Drawer, IconButton, List, ListItemButton, Typography } from '@mui/material'
import LogoutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import assets from '../../assets/index';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import memoApi from '../../api/memo';
import { setMemo } from '../../redux/features/memoSlice';

const Sidebar = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const user = useSelector(state => state.user.value);
    const memos = useSelector(state => state.memo.value);

    const logout = () => {
        localStorage.removeItem('token');
        navigate('/login');
    };

    useEffect(() => {
        const getMemos = async () => {
            try {
                const res = await memoApi.getAll();
                dispatch(setMemo(res));
            } catch (error) {
                alert(error.message);
            }
        }
        getMemos();
    }, [dispatch])
  return (
    <Drawer
        container={window.document.body}
        variant="permanent"
        open={true}
        sx={{width: 350, height: "100vh"}}
    >
        <List sx={{ width: 350, height: "100vh", backgroundColor: assets.colors.secondary}}>
            <ListItemButton>
                <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <Typography variant='body2' fontWeight="700">
                        {user.username}
                    </Typography>
                    <IconButton onClick={logout}>
                        <LogoutlinedIcon />
                    </IconButton>
                </Box>
            </ListItemButton>
            <Box sx={{ paddingTop: "10px"}}></Box>
            <ListItemButton>
                <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <Typography variant='body2' fontWeight="700">
                        お気に入り
                    </Typography>
                </Box>
            </ListItemButton>
            <Box sx={{ paddingTop: "10px"}}></Box>
            <ListItemButton>
                <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <Typography variant='body2' fontWeight="700">
                        プライベート
                    </Typography>
                    <IconButton>
                        <AddBoxOutlinedIcon fontSize="small" />
                    </IconButton>
                </Box>
            </ListItemButton>
            {memos.map((memo, index) => (
                <ListItemButton sx ={{ pl: "20px"}} component={Link} to={`/memo/${memo._id}`} key={memo._id}>
                    <Typography>{memo.icon} {memo.title}</Typography>
                </ListItemButton>
            ))}
        </List>
    </Drawer>
  )
}

export default Sidebar