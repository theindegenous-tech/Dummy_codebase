import * as React from 'react';
import { useState, useEffect } from 'react';
import { FPress } from '../futurepress/futurepress'
import { Books } from '../books_landing/Books'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

const drawerWidth = 339;


// This is a function to render the tab based on its index 
function RenderSelectedTab({ currentDrawerTab, setDrawerTab }) {
    const [url, setUrl] = useState(null)
    useEffect(()=>{
        if(url){
            setDrawerTab(2)
        }
    },[url, setDrawerTab])
    var tabArray = [<Books setUrl={setUrl}/>, <div></div>, <FPress url={url} />, <div></div>, <div></div>]
    return tabArray[currentDrawerTab]
}

// This is a function to return the corresponding icon to the tab
function RenderIcon({ index }) {
    var iconArray = [<PersonOutlineIcon />, <SearchIcon />, <PersonOutlineIcon />, <BookmarkBorderOutlinedIcon />, <DoneOutlinedIcon />]
    return iconArray[index]
}

// This is a component to return an item in the list with its correct title and icon
function RenderListItemButtons({ setDrawerTab, text, index }) {

    // This is a function to handle a click on the list of items in the drawer and call the callback function setDrawerTab in the App function
    const handleClick = () => {
        setDrawerTab(index)
    }
    return (
        <ListItem key={index} disablePadding>
            <ListItemButton onClick={handleClick}>
                <ListItemIcon>
                    <RenderIcon index={index} />
                </ListItemIcon>
                <ListItemText primaryTypographyProps={{
                    color: '#4A4A68',
                    fontFamily: "Work Sans",
                    fontWeight: 500,
                    fontSize: "16px",
                    lineHeight: "22.4px"
                }} primary={text} />
            </ListItemButton>
        </ListItem>
    )
}


// This is the root function from which all other components are loaded
function Home() {

    // This is the state variable that holds the current selected tab in the drawer
    const [currentDrawerTab, setDrawerTab] = useState(0)


    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="permanent"
                anchor="left"
            >
                <Toolbar />
                <Card sx={{ border: "none", boxShadow: "None", minWidth: 240 }}>
                    <CardContent>
                        <Typography sx={{ color: '#0E0E2C', fontFamily: "Work Sans", fontWeight: 700, fontSize: "64px", lineHeight: "75.07px", letterSpacing: "-2%" }} gutterBottom>
                            Gyani
                        </Typography>
                        <Typography sx={{ color: '#4A4A68', fontFamily: "Work Sans", fontWeight: 500, fontSize: "24px", lineHeight: "28.52px" }} component="div">
                            The Indegenous Library
                        </Typography>
                    </CardContent>
                </Card>

                <List>
                    {['Home', 'Discover', 'Reading', 'Bookmarks', 'Completed'].map((text, index) => (
                        <RenderListItemButtons key={index} setDrawerTab={setDrawerTab} index={index} text={text} />
                    ))}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <RenderSelectedTab currentDrawerTab={currentDrawerTab} setDrawerTab={setDrawerTab}/>
            </Box>
        </Box>
    );
}

export { Home };