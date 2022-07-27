// import axios from 'axios';
import { useEffect, useState, useRef, useContext } from 'react';
import './index.css'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { Navigate, useNavigate } from 'react-router-dom';
import { UserContext } from '../context/AuthContext';
function FpressBeforeLogin() {
    const [currentSectionIndex, setCurrentSectionIndex] = useState(null)
    const [book, setBook] = useState(null)
    const [locationn,setLocation] = useState(null);
    const [show,setShow]=useState(true)
    const [bookmarked,setbookmarked] = useState(false)
    let {readingbook, setReadingbook}= useContext(UserContext)
    const [bookmarkarray, setbookmarkarray]= useState([])
    let navigate= useNavigate();
    let path="/login"
    var urlbookmarkmap= new Map()
    let pagescount=0;
    let url;
    if(readingbook.url){
        url=readingbook.url;
    }
    // This is a hook that runs as soon as the page renders and a url string is recieved to the component as props
    //upon recieving it, a state variable is loaded with the book 
    useEffect(() => {
        if (url) {
            var params = URLSearchParams && new URLSearchParams(document.location.search.substring(1));
            var c = (params && params.get("loc")) ? params.get("loc") : undefined;
            setCurrentSectionIndex(c)
            var b = window.ePub(url);
            setBook(b)
            // if(urlbookmarkmap[url]!==undefined){
            //     setBookmarkarray(urlbookmarkmap[url]);
            // }
            // else{
            //     setBookmarkarray([]);
            // }
            // setLoc([]);
        }
    }, [url])

    //This is a hook that runs as soon as the book state variable is updated and renders the epub to the display
    //it also sets all up all the event handling when it comes to navigation with mouse or arrows
    useEffect(() => {
        if (book != null) {
            var rendition = book.renderTo("viewer", {
                width: 461,
                height: 500,
                spread: "always"               
                
            });
            rendition.display(currentSectionIndex);
            rendition.on("rendered", (section) => {
                

                

            });   
            rendition.on("relocated", (location) => {
                pagescount++;
                if(pagescount>5){
                    pagescount=0;
                    navigate(path);
                }
                setLocation(location);
                setShow(true);
                

            });
            rendition.on("layout", (layout) => {
                let viewer = document.getElementById("viewer");

                if (layout.spread) {
                    viewer.classList.remove('single');
                } else {
                    viewer.classList.add('single');
                }
            });

            window.addEventListener("unload", () => {
                this.book.destroy();
            });

           
            book.ready.then(() => {
                

                var keyListener = (e) => {

                    // Left Key
                    if ((e.keyCode || e.which) === 37) {
                        book.package.metadata.direction === "rtl" ? rendition.next() : rendition.prev();
                    }

                    // Right Key
                    if ((e.keyCode || e.which) === 39) {
                        book.package.metadata.direction === "rtl" ? rendition.prev() : rendition.next();
                    }

                };

                rendition.on("keyup", keyListener);
                document.addEventListener("keyup", keyListener, false);

            })
        }
    }, [currentSectionIndex, book])
    const isFound = bookmarkarray && bookmarkarray.some(element => {
            if (locationn && element.start.cfi === locationn.start.cfi) {
                return true;
            }

            return false;
        });
    const handleSubmit = (e) => {
    
        e.preventDefault();
        setShow(!show);
        var bmtitle= document.getElementById('bm').value;
        if(isFound===false){
            const tempMyObj = Object.assign({}, locationn);
            tempMyObj.bookmarktitle=bmtitle;
            bookmarkarray.push(tempMyObj);
             
        } 
        urlbookmarkmap[url]=bookmarkarray;
    }

        function Form() {
          return (
            <form onSubmit = {handleSubmit}>
            <input id="bm" placeholder='Bookmark Title'></input>
            <button type = 'submit'>Add Bookmark</button>
            </form>
          )
        }

        const RemoveBookmark=()=>{
            setbookmarked(!bookmarked);
            var index = bookmarkarray.findIndex(function(o){
                return o.start.cfi === locationn.start.cfi;
            })
            if (index !== -1) {
                bookmarkarray=bookmarkarray.splice(index, 1);
            }
            urlbookmarkmap[url]=bookmarkarray;
        }
        
        function BookMark() {
          return (
            <div>{isFound?<BookmarkIcon onClick={RemoveBookmark}/>:<BookmarkBorderIcon onClick={()=>setShow(!show)}/>}</div>
          )
        }
        

    return (
        <div>
        <div className="FPress">

            <div id="viewer" class="spreads"></div>
          
        </div>
        
        </div>
    );
}

export { FpressBeforeLogin };