import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import './index2.css'
import BookmarkBorderIcon from '@mui/icons-material/BookmarkBorder';
import BookmarkIcon from '@mui/icons-material/Bookmark'
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../context/AuthContext';
import CloseFullscreenIcon from '@mui/icons-material/CloseFullscreen';
import _ from 'lodash';
import Sample from '../LoginPage/Sample'





function FullScreenbook() {
    const [currentSectionIndex, setCurrentSectionIndex] = useState(null)
    const [book, setBook] = useState(null)
    const [bookpdf, setbookpdf] = useState(null)
    const [pageLocation, setLocation] = useState(null);
    const [show, setShow] = useState(true)
    let { user, setUser, readingbook } = useContext(UserContext);
    let navigate = useNavigate();
    let path = "/login"
    const[pageCount, setPageCount] = useState(0);
    let browseclick = 0;
    const [nav, setnav] = useState(0);
    let path2 = "/dashboard/reading4";
    document.addEventListener('contextmenu', event => event.preventDefault());
    useEffect(() => {
        document.addEventListener('contextmenu', event => event.preventDefault());
        if (nav !== 0) {
            navigate(path2);
        }

    }, [nav])

    const handleClick = () => {
        browseclick = browseclick + 1;
        setnav(browseclick);
    }

    // This is a hook that runs as soon as the page renders and a url string is recieved to the component as props
    //upon recieving it, a state variable is loaded with the book 
    useEffect(() => {
        document.addEventListener('contextmenu', event => event.preventDefault());
        if (readingbook) {
            var params = URLSearchParams && new URLSearchParams(document.location.search.substring(1));
            var c = (params && params.get("loc")) ? params.get("loc") : undefined;
            setCurrentSectionIndex(c)
            console.log("readingbook.url",readingbook.url)
            // var b = window.ePub(readingbook.url);
            setBook(readingbook.url)
            setbookpdf(readingbook.url)
        }
    }, [readingbook])

    //This is a hook that runs as soon as the book state variable is updated and renders the epub to the display
    //it also sets all up all the event handling when it comes to navigation with mouse or arrows
    // useEffect(() => {
    //     if (book != null) {
    //         var rendition = book.renderTo("viewer", {
    //             width: "100%",
    //             height: "100%",
    //             spread: "always"

    //         });
    //         rendition.display(currentSectionIndex);
    //         rendition.on("rendered", (section) => {
    //             var current = book.navigation && book.navigation.get(section.href);

    //             if (current) {
    //                 var $select = document.getElementById("toc");
    //                 var $selected = $select.querySelector("option[selected]");
    //                 if ($selected) {
    //                     $selected.removeAttribute("selected");
    //                 }

    //                 var $options = $select.querySelectorAll("option");
    //                 for (var i = 0; i < $options.length; ++i) {
    //                     let selected = $options[i].getAttribute("ref") === current.href;
    //                     if (selected) {
    //                         $options[i].setAttribute("selected", "");
    //                     }
    //                 }
    //             }

    //         });
    //         rendition.on("relocated", (location) => {
    //             setPageCount(pageCount+1)
    //             if (pageCount > 5 && !user) {
    //                 pageCount = 0;
    //                 navigate(path);
    //             }
    //             setLocation(location);
    //             setShow(true);
    //             var next = book.package.metadata.direction === "rtl" ? document.getElementById("prev") : document.getElementById("next");
    //             var prev = book.package.metadata.direction === "rtl" ? document.getElementById("next") : document.getElementById("prev");

    //             if (location.atEnd) {
    //                 next.style.visibility = "hidden";
    //             } else {
    //                 next.style.visibility = "visible";
    //             }

    //             if (location.atStart) {
    //                 prev.style.visibility = "hidden";
    //             } else {
    //                 prev.style.visibility = "visible";
    //             }

    //         });
    //         rendition.on("layout", (layout) => {
    //             let viewer = document.getElementById("viewer");

    //             if (layout.spread) {
    //                 viewer.classList.remove('single');
    //             } else {
    //                 viewer.classList.add('single');
    //             }
    //         });

    //         window.addEventListener("unload", () => {
    //             this.book.destroy();
    //         });

    //         book.loaded.navigation.then((toc) => {
    //             var $select = document.getElementById("toc"),
    //                 docfrag = document.createDocumentFragment();

    //             toc.forEach((chapter) => {
    //                 var option = document.createElement("option");
    //                 option.textContent = chapter.label;
    //                 option.setAttribute("ref", chapter.href);

    //                 docfrag.appendChild(option);
    //             });

    //             $select.appendChild(docfrag);

    //             $select.onchange = () => {
    //                 var index = $select.selectedIndex,
    //                     url = $select.options[index].getAttribute("ref");
    //                 rendition.display(url);
    //                 return false;
    //             };


    //         });
    //         book.ready.then(() => {
    //             var next = document.getElementById("next");

    //             next.addEventListener("click", (e) => {
    //                 book.package.metadata.direction === "rtl" ? rendition.prev() : rendition.next();
    //                 e.preventDefault();
    //             }, false);

    //             var prev = document.getElementById("prev");
    //             prev.addEventListener("click", (e) => {
    //                 book.package.metadata.direction === "rtl" ? rendition.next() : rendition.prev();
    //                 e.preventDefault();
    //             }, false);

    //             var keyListener = (e) => {

    //                 // Left Key
    //                 if ((e.keyCode || e.which) === 37) {
    //                     book.package.metadata.direction === "rtl" ? rendition.next() : rendition.prev();
    //                 }

    //                 // Right Key
    //                 if ((e.keyCode || e.which) === 39) {
    //                     book.package.metadata.direction === "rtl" ? rendition.prev() : rendition.next();
    //                 }

    //             };

    //             rendition.on("keyup", keyListener);
    //             document.addEventListener("keyup", keyListener, false);

    //         })
    //     }
    // }, [currentSectionIndex, book])

    // const isFound = user.personalisation.bookmarks.some(element => {
    //     if ( _.isEqual(pageLocation, element.location)) {
    //         return true;
    //     }

    //     return false;
    // });
    const handleSubmit = async (e) => {

        e.preventDefault();
        setShow(!show);
        var bookmarktitle = document.getElementById('bookmark').value;
        let data = {}
        data['book_id'] = readingbook.id
        data['bookmark_name'] = bookmarktitle
        data['location'] = Object.assign({}, pageLocation)
        data['personalisation'] = user.personalisation.id
        let res = await axios({
            method: 'post',
            url: 'http://64.227.182.173:8000/bookmarks/',
            data: data,
        });
        if(res.status === 201) {
            let updatedUser = await axios({
                method: 'get',
                url: 'http://64.227.182.173:8000/user/',
                withCredentials:true
            })
            setUser(updatedUser.data)
        }
    }

    function Form() {
        return (
            <form onSubmit={handleSubmit}>
                <input id="bookmark" placeholder='Bookmark Title'></input>
                <button type='submit'>Add Bookmark</button>
            </form>
        )
    }

    const RemoveBookmark = (e) => {
        e.preventDefault()
        user.personalisation.bookmarks.forEach(async(bookmark)=>{
            if(_.isEqual(bookmark.location, pageLocation)) {
                let res = await axios({
                    method: 'delete',
                    url: 'http://64.227.182.173:8000/bookmarks/'+bookmark.id+'/',
                });
                if(res.status === 204) {
                    let updatedUser = await axios({
                        method: 'get',
                        url: 'http://64.227.182.173:8000/user/',
                        withCredentials:true
                    })
                    setUser(updatedUser.data)
                }
            }
        })
    }

    function BookMark() {
        return (
            <div>{1 ? <BookmarkIcon onClick={RemoveBookmark} /> : <BookmarkBorderIcon onClick={() => setShow(!show)} />}</div>
        )
    }


    return (
        <div id="full-screen">
            <div style={{ display: 'flex', flexDirection: 'row-reverse', gap: '10px' }}>
                <div>
                    <CloseFullscreenIcon onClick={handleClick} />
                </div>
                <div>


                    {show ? <BookMark /> : <Form />}
                </div>

            </div>
            {/* <div className="FPress">
                <select id="toc"></select>

                <div id="viewer" class="spreads_2"></div>
                <a id="prev" href="#prev" class="arrow">‹</a>
                <a id="next" href="#next" class="arrow">›</a>
            </div> */}
            <Sample url = {bookpdf}/>

        </div>
    );
}
 
export { FullScreenbook };