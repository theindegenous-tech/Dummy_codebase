import axios from 'axios';
import { useEffect, useState } from 'react';
import { FPress } from '../futurepress/futurepress'


// This component returns a list of books or renders an epub if the book is selected
function BookList() {

  const [books, listBooks] = useState([])
  const [book, setBook] = useState(false)


  const handleClick = () => {
    setBook(true)
  }

  // This is a react hook that makes the GET request upon page being rendered, fetching the list of books from the backend
  useEffect(() => {
    const getBookList = async () => {
      const response = await axios({
        method: 'get',
        url: 'http://localhost:8000/library',
      });
      console.log(response.status)
      listBooks(response.data)
    }
    getBookList()
  }, [])

  return (
    book ? <FPress url="www.xyz.com" /> : <div>
      {
        books.map(() =>
          <div>
            <button onClick={handleClick}></button>
          </div>
        )
      }
    </div>
  );
}

export { BookList };
