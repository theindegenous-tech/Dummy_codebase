import { useState, useEffect } from "react";
import axios from "axios";
import './style.scss'
import './Hover.css'
import { SortByAuthor } from '../sort/SortByAuthor'
import SortByLanguage from "../sort/SortByLanguage";
import SortByTitle from "../sort/SortByTitle";
import BookDescription from '../Reusable/BookDescription'
import { BookReusable } from '../Reusable/BookReusable'
import { BookReusable2 } from '../Reusable/BookReusable2'

//This All_books function requests for All the book data and stores it in array named books
function Books() {

  const [currentsortDrawerTab, setsortDrawerTab] = useState(-1);
  const [books, setBooks] = useState([])
  const [booksupdated, setBooksUpdated] = useState(false)
  // This hook fetches all books 
  useEffect(() => {
    async function getAllBooks() {
      try {
        const Books = await axios.get('http://127.0.0.1:8000/library/')
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

  useEffect(() => {
    const updatedBooks = () => {
      var count = 0;
      let newbooks = books.map((item) => {
        if (item.url) {
          var desc = window.ePub(item.url);
          desc.coverUrl().then((data) => {
            item.imageurl = data;
            count = count + 1;
            setimgval(count);
          })
        }
        return item
      })
      setBooks(newbooks)
    }
    if (booksupdated) {
      updatedBooks()
      setBooksUpdated(false)
    }
  }, [booksupdated])


  //Render either sorted or home tab
  function RenderSelectedSortTab({ currentsortDrawerTab, books, setsortDrawerTab }) {

    var tabArray = [<SortByTitle books={books} setsortDrawerTab={setsortDrawerTab} />, <SortByAuthor books={books} setsortDrawerTab={setsortDrawerTab} />, <SortByLanguage books={books} setsortDrawerTab={setsortDrawerTab} />]
    return tabArray[currentsortDrawerTab]
  }








  return (
    <>

      <div style={{
        display: 'flex',
        flexDirection: 'column',
        background: '#FFFFFF',
        height: 'auto'
      }}>
        <BookReusable2 books_props={books}/>
        {currentsortDrawerTab === -1 ?
          <BookReusable />
          : <RenderSelectedSortTab currentsortDrawerTab={currentsortDrawerTab} books={books} setsortDrawerTab={setsortDrawerTab} />}
        {/* <div style={{ position: 'relative', height: '511px', marginTop: '44px' }}>
          <BookDescription />

        </div>
        <div style={{ position: 'relative', height: '511px', marginTop: '48px' }}>
          <BookDescription />

        </div> */}
      </div>

    </>

  );
}

export { Books };