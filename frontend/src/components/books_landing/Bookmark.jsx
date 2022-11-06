import React, { useState,useEffect ,useContext} from 'react'
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { UserContext } from '../context/AuthContext';
function Bookmark() {
    const [currentSectionIndex, setCurrentSectionIndex] = useState(null)
    const [book, setBook] = useState(null)
    const [locationn,setLocation] = useState(null);
    const [bookmarkclicked, setbookmarkclicked]= useState(false);
    const [bookmarkarray, setbookmarkarray]= useState([]);
    const {user, setUser, readingbook, setReadingbook}= useContext(UserContext);
    let url=null;
    if(readingbook){
        url= readingbook.description;
    }
    
     // This is a hook that runs as soon as the page renders and a url string is recieved to the component as props
    //upon recieving it, a state variable is loaded with the book 
    useEffect(() => {
        if (url) {
            var params = URLSearchParams && new URLSearchParams(document.location.search.substring(1));
            var c = (params && params.get("loc")) ? params.get("loc") : undefined;
            setCurrentSectionIndex(locationn)
            var b = window.ePub(url);
            setBook(b)
        }
    }, [url])

    //This is a hook that runs as soon as the book state variable is updated and renders the epub to the display
    //it also sets all up all the event handling when it comes to navigation with mouse or arrows
    useEffect(() => {
        if (book != null) {
            var rendition = book.renderTo("viewer", {
                width: "100%",
                height: 600,
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

            rendition.on("layout", (layout) => {
                let viewer = document.getElementById("viewer");

                if (layout.spread) {
                    viewer.classList.remove('single');
                } else {
                    viewer.classList.add('single');
                }
            });

            window.addEventListener("unload", () => {
                console.log("unloading");
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
                    
  return (
        <div >
      {
        !bookmarkclicked?( bookmarkarray &&
       bookmarkarray.map((book, i)=>{
         return (
           <div onClick={()=>{setbookmarkclicked(!bookmarkclicked);setCurrentSectionIndex(book.start.cfi)}} key={i}>
               {book.bookmarktitle}
            </div>
       )
       
     })):<div className="FPress">
            <ArrowBackIcon onClick={()=>{setbookmarkclicked(!bookmarkclicked)}}/>
            <select id="toc"></select>
            <div id="viewer" class="spreads" oncontextmenu="return false;"></div>
            <a id="prev" href="#prev" class="arrow">‹</a>
            <a id="next" href="#next" class="arrow">›</a>
        </div>}
    </div>
    );
}


export default Bookmark