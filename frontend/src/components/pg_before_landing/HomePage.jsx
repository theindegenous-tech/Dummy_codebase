import * as React from 'react';
import { useState, useEffect } from 'react';
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
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import Discover from '../Discover/Discover';
import { Link, Outlet, Route, useLocation, Routes, useNavigate } from 'react-router-dom';
import Profile from '../user-profile/Profile';
import Homepage2 from './Homepage2';
import Reading1 from '../futurepress/Reading1'
import Discover2 from '../Discover/Discover2';
import Reading2 from '../futurepress/Reading2';
import Completed2 from '../Completed/Completed2';
import Bookmark2 from '../books_landing/Bookmark2';

const drawerWidth = 339;


// This is a function to render the tab based on its index 
function RenderSelectedTab({ currentDrawerTab }) {
    var tabArray = [<Homepage2 />, <Discover2 />, <Reading1 />, <Bookmark2 />, <Completed2 />, <Discover />, <Reading2 />]
    return tabArray[currentDrawerTab]
}


// This is a function to return the corresponding icon to the tab
function RenderIcon({ index }) {
    var iconArray = [<PersonOutlineIcon />, <SearchIcon />, <PersonOutlineIcon />, <BookmarkBorderOutlinedIcon />, <DoneOutlinedIcon />, <LibraryBooksRoundedIcon />, <FavoriteIcon />, <Profile />]
    return iconArray[index]
}

// This is a component to return an item in the list with its correct title and icon
function RenderListItemButtons({ setDrawerTab, text, index, currentDrawerTab }) {

    // This is a function to handle a click on the list of items in the drawer and call the callback function setDrawerTab in the App function
    const handleClick = () => {
        setDrawerTab(index)
    }
    return (
        <ListItem key={index} disablePadding>
            <ListItemButton onClick={handleClick} style={index === currentDrawerTab ? { backgroundColor: '#E8E8E8' } : { backgroundColor: '#FFFFFF' }} >
                <ListItemIcon >
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
export default function App() {

    // This is the state variable that holds the current selected tab in the drawer
    const [currentDrawerTab, setDrawerTab] = useState(0)
    const navNames = ['', 'discover1', 'reading1', 'bookmarks1', 'completed1', 'discoverbook', 'reading2']
    let location = useLocation();
    const [myarr, setMA] = useState([])

    let navigate = useNavigate()
    const togglePopup = () => {
        navigate('/login')
    }

    useEffect(() => {

        const str = location.pathname;
        var some = str.split('/');
        // console.log(some);
        if (some.length === 2) {
            setMA(some);
            setMA((state) => {
                for (let i = 0; i < 7; i++) {
                    if (navNames[i] === state[1]) {
                        setDrawerTab(i);

                    }
                }
                return state;
            });
        }


    }, [location])

    return (myarr ?
        <Box className="app_box" sx={{ display: 'flex' }}>
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
                    {['Home', 'Discover', 'Reading', 'Bookmarks', 'Completed'].map((text, index) => (<><Link to={navNames[index]} >
                        <RenderListItemButtons key={index} setDrawerTab={setDrawerTab} index={index} text={text} currentDrawerTab={currentDrawerTab} />
                    </Link>  </>))}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>

                    <div style={{ display: 'flex', width: 'auto', display: 'flex', alignItems: 'flex-end' }}>
                        <button style={{cursor:'pointer', padding: '12px 24px 12px 24px', marginTop: '16px', backgroundColor: '#428CFB', color: '#FFFFFF', border: 'none', width: '272px', height: '48px', gap: '8px', borderRadius: '8px', marginRight: '16px', fontFamily: 'Work Sans', fontSize: '16px', fontWeight: '700', lineHeight: '19px', letterSpacing: '0.04em', color: '#FFFFFF', alignItems: 'center', justifyContent: 'center', textAlign: 'center' }} onClick={togglePopup}>
                            Start reading for free
                        </button>
                    </div>

                </div>
                <Routes >

                    <Route path={navNames[currentDrawerTab]} element={<RenderSelectedTab currentDrawerTab={currentDrawerTab} setDrawerTab={setDrawerTab} />} />
                </Routes>
                <Outlet />
            </Box>
        </Box> : <></>
    );
}