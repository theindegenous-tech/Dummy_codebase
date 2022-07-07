import { useState, useEffect, useMemo, useContext } from "react";
import axios from "axios";
import Pagination from '../pagination/Pagination';
import './style.scss'
import './Hover.css'
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useNavigate, Link } from 'react-router-dom';
import { UserContext } from '../context/AuthContext';
import {SortByAuthor} from '../sort/SortByAuthor'
import DropdownMenu from '../sort/DropdownMenu'




//This All_books function requests for All the book data and stores it in array named books
let PageSize = 4;
function Books() {

  //states to set book cover page as icons
  let {user, setUser,url, setUrl}= useContext(UserContext)
  const[authorsort, setauthorsort]= useState(false);
  const [liked, setLikedBooks] = useState([]);
  const [mylibrarybooks, setmylibrarybooks] = useState([])
  const _ = require("lodash"); 
  let navigate = useNavigate(); 
  let path = `/dashboard/reading`; 

  useEffect(()=>{
    if(user.personalisation.liked) {
      setLikedBooks(user.personalisation.liked)
    }
    if(user.personalisation.mylibrary) {
      setmylibrarybooks(user.personalisation.mylibrary)
    }
  },[user])

  const HandleAuthors = ({ authors }) => {
    const [authorString, setAuthorString] = useState("")
    useEffect(() => {
      if (authors) {
        let str = ""
        authors.forEach(author => {
          str += author.first_name + " " + author.last_name + ", "
        })
        str = str.substring(0, str.length - 2);
        setAuthorString(str)
      }
    }, [authors])
    return (<div>{authorString}</div>)
  }
  const [books, setBooks] = useState([])
  const [booksupdated, setBooksUpdated] = useState(false)
  // This hook fetches all books 
 useEffect(() => {
    async function getAllBooks() {
      try {
        const Books = await axios.get('http://127.0.0.1:8000/library/')
        console.log(Books)
        setBooks(Books.data)
        setBooksUpdated(true)
      } catch (error) {
        console.log(error)
      }
    }
    getAllBooks()
  }, [])

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "/epub.js";
    script.async = true;
    document.body.appendChild(script);
    return () => {
      document.body.removeChild(script);
    }
  }, []);
  //This hook maps the book array and adds one more property to array of object namely imgurl which is used to display as icon of book
  const [imgval, setimgval] = useState(0);

  // useEffect(() => {
  //   const updatedBooks = () => {
  //     var count = 0;
  //     let newbooks = books.map((item) => {
  //       if (item.url) {
  //         var url = window.ePub(item.url);
  //         url.coverUrl().then((data) => {
  //           item.imageurl = data;
  //           count = count + 1;
  //           setimgval(count);
  //         })
  //       }
  //       return item
  //     })
  //     setBooks(newbooks)
  //   }
  //   if(booksupdated) {
  //     updatedBooks()
  //     setBooksUpdated(false)
  //   }
  // }, [booksupdated])


  


  //This function adds new book to likedBooks array if its not there
  const likeClick = async(book) => {
      let likedbooks = user.personalisation.liked
      likedbooks.push(book.id)
      // console.log({...user.personalisation, liked:likedbooks})
      let res = await axios({
        method: 'put',
        url: 'http://localhost:8000/personalisation/'+user.personalisation.id+'/',
        data:{...user.personalisation, liked:likedbooks},
        withCredentials: true
      });
      setLikedBooks(res.data.liked)
  }

  //This function adds new book to mylibraryBooks array if its not there
  const mylibraryClick = async(book) => {
      let librarybooks = user.personalisation.mylibrary
      librarybooks.push(book.id)
      let res = await axios({
        method: 'put',
        url: 'http://localhost:8000/personalisation/'+user.personalisation.id+'/',
        data:{...user.personalisation, mylibrary:librarybooks},
        withCredentials: true
      });
      setmylibrarybooks(res.data.mylibrary)
  }

  //This function renders all books    

  function Items({ currentItems }) {
    console.log(currentItems);
    return (

      <div className="books_container" style={{
        height: 'auto',
        display: 'flex',
        color: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: '8px',
        top: '10%',
        order: 1,
        flexGrow: 1,
        flexWrap: 'wrap',
        boxSizing: 'border-box',
        maxWidth: '1200px'
      }}



      >

        {
          currentItems &&
          currentItems.map((book, i) => {
            return (
              <div className='book_out' style={{
                height: '504px',
                width: '278px',
                borderRadius: '8px',
                paddingLeft: '0px',
                paddingTop: '0px',
                gap: '24px',
                border: '1px solid #EFEFFD',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: '1 1 139px',
                order: '0',
                flexGrow: '0',
                boxSizing: 'border-box',
              }} key={i}>

                <div className="book_desc_button" style={{
                  height: '360px',
                  paddingLeft: '0px',
                  width: '246px',
                  borderRadius: '8px',
                  margin: '16px 16px 0px 16px',
                  border: '1px solid #EFEFFD',
                  boxSizing: 'border-box',
                  flex: 'none',
                  order: '0',
                  flexGrow: '0',
                  alignItems: 'center',
                  backgroundImage: `url(data:image/png;base64,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)`,
                  backgroundSize: '100% 100%'
                }}>
                  <div >
                    {liked.includes(book.id) ? <FavoriteIcon style={{ color: "red" }}
                      onClick={() => {
                        likeClick(book)
                      }} /> : <FavoriteIcon
                      onClick={() => {
                        likeClick(book)
                      }} />}
                  </div>
                  <div className="book_description" style={{
                    height: '184px',
                    width: '234px',
                    gap: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '0px',
                    position: 'absolute',
                    marginTop: '30px',
                    marginLeft: '6px',
                    fontFamily: 'Work Sans',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: '15px',
                    lineHeight: '28px',
                    letterSpacing: '-0.02em',
                    color: '#',
                  }}>
                    This section is all about description of book. Description of book gives us brief idea of what the book is all about and is also one of the main component of book which can either make reader read the book or not.
                  </div>
                  <button className="book_read_button" style={{
                    position: 'absolute',
                    marginTop: '276px',
                    height: '48px',
                    width: '94px',
                    borderRadius: '8px',
                    padding: '12px 24px 12px 24px',
                    boxSizing: 'border-box',
                    gap: '8px',
                    background: '#FFFFFF',
                    border: '1px solid #EFEFFD',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginLeft: '73px',
                    fontFamily: 'Work sans',
                    fontWeight: '700',
                    fontSize: '16px',
                    lineHeight: '19px',
                    letterSpacing: '0.04em',
                    color: '#428CFB',
                    fontStyle: 'normal',
                    textAlign: 'center'
                  }} onClick={() => { setUrl(book.url); {mylibraryClick(book)}; navigate(path); }} >READ
                  </button>
                </div>
                <div style={{
                  height: '88px',
                  width: '246px',
                  marginTop: '0px',
                  marginLeft: '16px',
                  gap: '16px',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'flex-start',
                  flex: 'none',
                  order: '1',
                  alignSelf: 'stretch',
                  flexGrow: '0',
                }}>
                  <h2 style={{
                    textAlign: 'left',
                    color: '#0E0E2C',
                    width: '246px',
                    height: '28px',
                    marginTop: '4px',
                    marginBottom: '0px',
                    fontFamily: 'Work Sans',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: '17px',
                    lineHeight: '28px',
                    letterSpacing: '-0.02em',
                    flex: 'none',
                    order: '0',
                    alignSelf: 'stretch',
                    flexGrow: '0',
                  }}>
                    {book.title}
                  </h2>
                  <div style={{
                    width: '246px',
                    height: '44px',
                    textAlign: 'left',
                    color: '#4A4A68',
                    fontFamily: 'Work Sans',
                    fontStyle: 'normal',
                    fontWeight: '500',
                    fontSize: '16px',
                    lineHeight: '22px',
                    flex: 'none',
                    order: '1',
                    alignSelf: 'stretch',
                    flexGrow: '0'
                  }}>
                    <div style={{
                      textAlign: 'left',
                      color: '#4A4A68',
                      fontFamily: 'Work Sans',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      fontSize: '16px',
                      lineHeight: '22px',
                      flex: 'none',
                      order: '1',
                      alignSelf: 'stretch',
                      flexGrow: '0'
                    }}><HandleAuthors authors={book.author} />
                    </div>
                    <div style={{
                      textAlign: 'left',
                      color: '#4A4A68',
                      fontFamily: 'Work Sans',
                      fontStyle: 'normal',
                      fontWeight: '500',
                      fontSize: '16px',
                      lineHeight: '22px',
                      letterSpacing: '-0.02em',
                      flex: 'none',
                      order: '1',
                      alignSelf: 'stretch',
                      flexGrow: '0'
                    }}>{book.year}
                    </div>
                  </div>
                </div>
              </div>

            )
          }
          )

        }

      </div>

    );
  }
  //setting intitial page number as 1
  const [currentPage, setCurrentPage] = useState(1);
  //function to get array of number of books we want to render
  const currentTableData = useMemo(() => {
    const firstPageIndex = (currentPage - 1) * PageSize;
    const lastPageIndex = firstPageIndex + PageSize;
    return books.slice(firstPageIndex, lastPageIndex);
  }, [currentPage, books]);

  return (
    <>
      
      {!authorsort? <div style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#FFFFFF',
      }}>
        <div style={{
          height: 'auto',
          maxWidth: '100%',
          padding: '8px 0 0px 0',
          display: 'flex',
          flexDirection: 'column',
          gap: '48px',

          background: '#FFFFFF',
          boxSizing: 'border-box',
          backgroundColor: '#FFFFFF'
        }}>
          <div style={{display:'flex'}}>
          <h3 style={{
            color: '#000000',
            height: 'auto',
            width: '279px',
            marginTop: '8px',
            textAlign: 'left',
            fontFamily: 'Work Sans',
            fontWeight: '500',
            fontSize: '24px',
            marginBottom: '0px',
            lineHeight: '28px',
            letterSpacing: '-2%',
            flex: 'none',

            order: 0,
            flexGrow: 0
          }}>Based on your interests</h3>
          {/* <DropdownMenu style={{ marginTop: '8px',}}/> */}
          {/* <SortIcon style={{ marginTop: '8px',}} onClick={()=>setauthorsort(!authorsort)}/> */}
          </div>
          <Items currentItems={currentTableData} >

          </Items>


        </div>
        <div style={{
          position: 'relative',
        }}>
          <Pagination
            className="pagination-bar"
            currentPage={currentPage}
            totalCount={books.length}
            pageSize={PageSize}
            onPageChange={page => setCurrentPage(page)} />
        </div>
      </div>:<SortByAuthor setauthorsort={setauthorsort} authorsort={authorsort} books={books}/> }
    </>

  );
}

export { Books };