import * as React from 'react';
import './index.css'
import { useState, useEffect } from 'react';
import { FPress } from './components/futurepress/futurepress'
import { Books } from './components/books_landing/Books'
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
import Bookmark from './components/books_landing/Bookmark';
import LibraryBooksRoundedIcon from '@mui/icons-material/LibraryBooksRounded';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { Mylibrary } from './components/books_landing/Mylibrary';
import { LikedBooks } from './components/books_landing/LikedBooks';
import Discover from './components/Discover/Discover';
import Completed from './components/Completed/Completed';
import { Link, Outlet, Route, useLocation, Routes } from 'react-router-dom';
import Profile from './components/user-profile/Profile';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Button } from '@mui/material';
import Popup from './components/bookUpload/Popup';
import './components/LoginPage/Signup.css'
import Login from './components/LoginPage/Login';
const drawerWidth = 339;

// This is a function to render the tab based on its index 
function RenderSelectedTab({ currentDrawerTab, setDrawerTab }) {
    console.log(currentDrawerTab);
    const [url, setUrl] = useState(null)
    const [bookmarkarray, setBookmarkarray] = useState([]);
    const [loc, setLoc] = useState([]);
    const [mylibrarybooks, setmylibrarybooks] = useState([]);
    const [likedbooks, setlikedbooks] = useState([]);
    useEffect(() => {
        if (url) {
            setDrawerTab(2)
        }
    }, [url, setDrawerTab])
    var tabArray = [<Books setUrl={setUrl} mylibrarybooks={mylibrarybooks} likedbooks={likedbooks} setlikedbooks={setlikedbooks} setDrawerTab={setDrawerTab} />, <Discover />, <FPress loc={loc} url={url} bookmarkarray={bookmarkarray} setBookmarkarray={setBookmarkarray} setLoc={setLoc} />, <Bookmark setDrawerTab={setDrawerTab} bookmarkarray={bookmarkarray} url={url} />, <Completed />, <Mylibrary mylibrarybooks={mylibrarybooks} setUrl={setUrl} setmylibrarybooks={setmylibrarybooks} />, <LikedBooks setUrl={setUrl} likedbooks={likedbooks} setlikedbooks={setlikedbooks} />, <Profile />]
    return tabArray[currentDrawerTab]
}

// This is a function to return the corresponding icon to the tab
function RenderIcon({ index }) {
    var iconArray = [<PersonOutlineIcon />, <SearchIcon />, <PersonOutlineIcon />, <BookmarkBorderOutlinedIcon />, <DoneOutlinedIcon />, <LibraryBooksRoundedIcon />, <FavoriteIcon />, <Profile />]
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
export default function App() {

    // This is the state variable that holds the current selected tab in the drawer
    const [currentDrawerTab, setDrawerTab] = useState(0)
    const [navNames, setnavNames] = useState(['home', 'discover', 'reading', 'bookmarks', 'completed', 'mylibrary', "liked","profile"])
    const [p, sP] = useState(useLocation());
    const [isprofile, setisprofile]= useState(false);
    let location = useLocation();
    const [myarr, setMA] = useState([])

    const [isOpen, setIsOpen] = useState(false);
 
    const togglePopup = () => {
        setIsOpen(!isOpen);
    }

    useEffect(() => {

        const str = location.pathname;
        var some = str.split('/');
        if (some.length === 3) {
            setMA(some);
            setMA((state) => {
                for (let i = 0; i < 8; i++) {
                    if (navNames[i] == state[2]) {
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
                    {['Home', 'Discover', 'Reading', 'Bookmarks', 'Completed', 'My Library', "Liked"].map((text, index) => (<><Link to={navNames[index]} >
                        <RenderListItemButtons key={index} setDrawerTab={setDrawerTab} index={index} text={text} />
                    </Link>  </>))}
                </List>
            </Drawer>
            <Box
                component="main"
                sx={{ flexGrow: 1, bgcolor: 'background.default', p: 3 }}
            >
                <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
                    <div style={{ display: 'flex', width: '192px' }}>
                        <button style={{padding:'0px', marginTop:'16px', backgroundColor:'#428CFB', color:'#FFFFFF', border:'none', width:'90px'}} onClick={togglePopup}>
                            Add Book
                        </button>
                    <p style={{ marginTop: '16px', marginBottom: 0, width: '136px', textAlign: 'right' }}>Hariharan</p>
                    
                      {!isprofile? <Link to="profile">
                         <AccountCircleIcon style={{ marginRight: '16px', marginTop: '16px' }} onClick={() => setisprofile(!isprofile)} />
                       </Link>:<Link to="home">
                         <AccountCircleIcon style={{ marginRight: '16px', marginTop: '16px' }} onClick={() => setisprofile(!isprofile)} />
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
                        <div className="input-container" style={{height:'auto'}}>
                        <label>Description </label>
                        <input type="text" name="description"  />
                        </div>
                        <div className="input-container">
                        <label>Author </label>
                        <input type="text" name="author"  />
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