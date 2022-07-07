// import axios from 'axios';
import { useEffect, useState, useRef, useContext } from 'react';
import './index.css'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { Navigate } from 'react-router-dom';
import { UserContext } from '../context/AuthContext';
function FPress({  bookmarkarray, setBookmarkarray,loc,setLoc }) {
    console.log(3);
    const [currentSectionIndex, setCurrentSectionIndex] = useState(null)
    const [book, setBook] = useState(null)
    const [locationn,setLocation] = useState(null);
    const [show,setShow]=useState(true)
    const [bookmarked,setbookmarked] = useState(false)
    let {url, setUrl}= useContext(UserContext)
    console.log(url);
    var urlbookmarkmap= new Map()
    // This is a hook that runs as soon as the page renders and a url string is recieved to the component as props
    //upon recieving it, a state variable is loaded with the book 
    useEffect(() => {
        if (url) {
            var params = URLSearchParams && new URLSearchParams(document.location.search.substring(1));
            var c = (params && params.get("loc")) ? params.get("loc") : undefined;
            setCurrentSectionIndex(c)
            var b = window.ePub(url);
            setBook(b)
            if(urlbookmarkmap[url]!==undefined){
                setBookmarkarray(urlbookmarkmap[url]);
            }
            else{
                setBookmarkarray([]);
            }
            setLoc([]);
        }
    }, [url])

    //This is a hook that runs as soon as the book state variable is updated and renders the epub to the display
    //it also sets all up all the event handling when it comes to navigation with mouse or arrows
    useEffect(() => {
        if (book != null) {
            var rendition = book.renderTo("viewer", {
                width: "100%",
                height: "100%",
                spread: "always"               
                
            });
            rendition.display(currentSectionIndex);
            rendition.on("rendered", (section) => {
                var current = book.navigation && book.navigation.get(section.href);

                if (current) {
                    var $select = document.getElementById("toc");
                    var $selected = $select.querySelector("option[selected]");
                    if ($selected) {
                        $selected.removeAttribute("selected");
                    }

                    var $options = $select.querySelectorAll("option");
                    for (var i = 0; i < $options.length; ++i) {
                        let selected = $options[i].getAttribute("ref") === current.href;
                        if (selected) {
                            $options[i].setAttribute("selected", "");
                        }
                    }
                }

            });   
            rendition.on("relocated", (location) => {
                setLocation(location);
                setShow(true);
                var next = book.package.metadata.direction === "rtl" ? document.getElementById("prev") : document.getElementById("next");
                var prev = book.package.metadata.direction === "rtl" ? document.getElementById("next") : document.getElementById("prev");

                if (location.atEnd) {
                    next.style.visibility = "hidden";
                } else {
                    next.style.visibility = "visible";
                }

                if (location.atStart) {
                    prev.style.visibility = "hidden";
                } else {
                    prev.style.visibility = "visible";
                }

            });
            book.loaded.spine.then((spine) => { console.log(spine) });
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

            book.loaded.navigation.then((toc) => {
                var $select = document.getElementById("toc"),
                    docfrag = document.createDocumentFragment();

                toc.forEach((chapter) => {
                    var option = document.createElement("option");
                    option.textContent = chapter.label;
                    option.setAttribute("ref", chapter.href);

                    docfrag.appendChild(option);
                });

                $select.appendChild(docfrag);

                $select.onchange = () => {
                    var index = $select.selectedIndex,
                    url = $select.options[index].getAttribute("ref");
                    rendition.display(url);
                    return false;
                };
                

            });
            book.ready.then(() => {
                var next = document.getElementById("next");

                next.addEventListener("click", (e) => {
                    book.package.metadata.direction === "rtl" ? rendition.prev() : rendition.next();
                    e.preventDefault();
                }, false);

                var prev = document.getElementById("prev");
                prev.addEventListener("click", (e) => {
                    book.package.metadata.direction === "rtl" ? rendition.next() : rendition.prev();
                    e.preventDefault();
                }, false);

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
    const isFound = bookmarkarray.some(element => {
            if (locationn && element.start.cfi === locationn.start.cfi) {
                return true;
            }

            return false;
        });
    const handleSubmit = (e) => {
    
        e.preventDefault();
        setShow(!show);
        var bmtitle= document.getElementById('bm').value;
        console.log(locationn);
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
           <div>

          
        {show?<BookMark/>:<Form /> }
         </div>
        <div className="FPress">
            <select id="toc"></select>

            <div id="viewer" class="spreads"></div>
            <a id="prev" href="#prev" class="arrow">‹</a>
            <a id="next" href="#next" class="arrow">›</a>
        </div>
        
        </div>
    );
}

export { FPress };