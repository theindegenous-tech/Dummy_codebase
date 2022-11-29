import * as React from 'react';
import './index.css'
import { useState, useEffect, useContext } from 'react';
import { Books } from './components/books_landing/Books'
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import ListItem from '@mui/material/ListItem';
// import DropdownMenu from './sort/DropdownMenu'
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import SearchIcon from '@mui/icons-material/Search';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import BookmarkBorderOutlinedIcon from '@mui/icons-material/BookmarkBorderOutlined';
import DoneOutlinedIcon from '@mui/icons-material/DoneOutlined';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Bookmark from './components/books_landing/Bookmark';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Mylibrary } from './components/books_landing/Mylibrary';
import { LikedBooks } from './components/books_landing/LikedBooks';
import Discover from './components/Discover/Discover';
import Completed from './components/Completed/Completed';
import { Link, Outlet, Route, useLocation, Routes } from 'react-router-dom';
import Profile from './components/user-profile/Profile';
import Popup from './components/bookUpload/Popup';
import './components/LoginPage/Signup.css'
import Search from './components/books_landing/Search';
import Discover2 from './components/Discover/Discover2';
import Reading1 from './components/futurepress/Reading1';
import Reading2 from './components/futurepress/Reading2';
import Reading4 from './components/futurepress/Reading4';
import { UserContext } from './components/context/AuthContext';


const drawerWidth = 339;
// This is a function to render the tab based on its index 
function RenderSelectedTab({ currentDrawerTab, setDrawerTab }) {

    var tabArray = [<Books />, <Discover2 />, <Reading1 />, <Bookmark />, <Completed />, <Mylibrary />, <LikedBooks />, <Profile />, <Reading2 />, <Discover />, <Reading4 />]
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
        <ListItem key={index} disablePadding sx={{ borderRadius: '8px', width: '323px' }}>
            <ListItemButton onClick={handleClick} style={index === currentDrawerTab ? { backgroundColor: '#EFEFFD' } : { backgroundColor: '#FFFFFF' }} >
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
    const [navNames] = useState(['home', 'discover1', 'reading1', 'bookmarks', 'completed', 'mylibrary', "liked", "profile", "reading2", "discoverbook", 'reading4'])
    const [isprofile, setisprofile] = useState(false);
    let location = useLocation();
    const [myarr, setMA] = useState([])
    const { user } = useContext(UserContext)
    const [isOpen, setIsOpen] = useState(false);

    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {
        
        document.addEventListener('contextmenu', (e) => { e.preventDefault(); });
        const str = location.pathname;
        var some = str.split('/');
        console.log(some);
        if (some.length === 3) {
            setMA(some);
            setMA((state) => {
                for (let i = 0; i < 11; i++) {
                    if (navNames[i] === state[2]) {
                        setDrawerTab(i);

                    }
                }
                return state;
            });
        }


    }, [location])

    const handleSubmit = (e) => {

        e.preventDefault();
        console.log("Book Added");
    }

    return (myarr ?
        <Box className="app_box" sx={{ display: 'flex', color: 'none' }}>
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
                <Card sx={{ border: "none", boxShadow: "none", minWidth: 240 }}>
                    <CardContent>
                        <Typography sx={{ color: '#0E0E2C', fontFamily: "Work Sans", fontWeight: 700, fontSize: "64px", lineHeight: "75.07px", letterSpacing: "-2%", padding: 0, marginTop: '28px', marginBottom: 0 }} gutterBottom>
                            Gyani
                        </Typography>
                        <Typography sx={{ color: '#4A4A68', fontFamily: "Work Sans", fontWeight: 500, fontSize: "24px", lineHeight: "28.52px", padding: 0 }} component="div">
                            The Indegenous Library
                        </Typography>
                    </CardContent>
                </Card>

                <List style={{ marginTop: '16px', marginLeft: '8px' }}>
                    {['Home', 'Discover', 'Reading', 'Bookmarks', 'Completed', 'My Library', "Liked"].map((text, index) => (<><Link to={navNames[index]} >
                        <RenderListItemButtons key={index} setDrawerTab={setDrawerTab} index={index} text={text} currentDrawerTab={currentDrawerTab} />
                    </Link>  </>))}
                </List>
            </Drawer>
            <Box
                component="main"
                className='main'
                sx={{
                    flexGrow: 1,
                    bgcolor: 'background.default',
                    p: 3
                }}
            >
                <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                    <div style={{ marginTop: '9px', height: '48px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                        {currentDrawerTab === 1 ? <></> : <Search />}
                    </div>
                    <div style={{ display: 'flex', width: '192px', flexDirection: 'row', alignItems: 'flex-end' }}>

                        <button style={{ padding: '0px', marginTop: '22px', backgroundColor: '#428CFB', color: '#FFFFFF', border: 'none', width: '48px', height: '48px', borderRadius: '8px', marginRight: '16px' }} onClick={togglePopup}>
                      {/* Sort By */}
                        </button>
                                  {/* <DropdownMenu style={{ marginTop: '8px',}} setsortDrawerTab={setsortDrawerTab}/> */}


                        {!isprofile ? <Link to="profile">
                            <button style={{ marginRight: '16px', marginTop: '22px', width: '48px', height: '48px', backgroundColor: '#31D0AA', color: '#FFFFFF', border: 'none', borderRadius: '8px', boxShadow: 'none' }} onClick={() => setisprofile(!isprofile)} >
                                {/* {user.first_name.charAt(0)} */}
                            </button>
                        </Link> : <Link to="home">
                            <button style={{ marginRight: '16px', marginTop: '22px', width: '48px', height: '48px', backgroundColor: '#31D0AA', color: '#FFFFFF', border: 'none', borderRadius: '8px', boxShadow: 'none' }} onClick={() => setisprofile(!isprofile)} >
                                {/* {user.first_name.charAt(0)} */}
                            </button>
                        </Link>}


                    </div>

                </div>
                <Routes >

                    <Route path={myarr[myarr.length - 1]} element={<RenderSelectedTab currentDrawerTab={currentDrawerTab} setDrawerTab={setDrawerTab} />} />

                </Routes>
                <Outlet />
                {isOpen && <Popup
                    content={<>
                        <form method="POST" onSubmit={handleSubmit} >
                            <div className="input-container">
                                <label>Book Title </label>
                                <input type="text" name="booktitle" />
                            </div>
                            <div className="input-container" style={{ height: 'auto' }}>
                                <label>Description </label>
                                <input type="text" name="description" />
                            </div>
                            <div className="input-container">
                                <label>Author </label>
                                <input type="text" name="author" />
                            </div>
                            <div className="button-container">
                                <input type="submit" />
                            </div>

                        </form>

                    </>}
                    handleClose={togglePopup}
                />}
            </Box>
        </Box> : <></>
    );
}