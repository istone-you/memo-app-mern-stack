import React from 'react'
import { Box } from '@mui/system'
import { Drawer, IconButton, List, ListItemButton, Typography } from '@mui/material'
import LogoutlinedIcon from '@mui/icons-material/LogoutOutlined';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import assets from '../../assets/index';

const Sidebar = () => {
  return (
    <Drawer
        container={window.document.body}
        valiant="permanent"
        open={true}
        sx={{width: 350, height: "100vh"}}
    >
        <List sx={{ width: 350, height: "100vh", backgroundColor: assets.colors.secondary}}>
            <ListItemButton>
                <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <Typography variant='body2' fontWeight="">
                        istone
                    </Typography>
                    <IconButton>
                        <LogoutlinedIcon />
                    </IconButton>
                </Box>
            </ListItemButton>
            <Box sx={{ paddingTop: "10px"}}></Box>
            <ListItemButton>
                <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <Typography variant='body2' fontWeight="">
                        お気に入り
                    </Typography>
                </Box>
            </ListItemButton>
            <Box sx={{ paddingTop: "10px"}}></Box>
            <ListItemButton>
                <Box sx={{ width: "100%", display: "flex", alignItems: "center", justifyContent: "space-between"}}>
                    <Typography variant='body2' fontWeight="">
                        プライベート
                    </Typography>
                    <IconButton>
                        <AddBoxOutlinedIcon fontsize="small" />
                    </IconButton>
                </Box>
            </ListItemButton>
        </List>
    </Drawer>
  )
}

export default Sidebar