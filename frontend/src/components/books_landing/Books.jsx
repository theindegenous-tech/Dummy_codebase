import { useState, useEffect } from "react";
import axios from "axios";

//This All_books function requests for All the book data and stores it in array named books
function Books({setUrl}) {

  //Upon clicking button to read a book, the url is sent to parent component
  const handleClick=(e)=>{
      setUrl("https://s3.amazonaws.com/moby-dick/moby-dick.epub")
  }
  const HandleAuthors=({authors})=>{
    const[authorString, setAuthorString] = useState("")
    useEffect(()=>{
      if(authors){
        let authorFullName=""
        authors.forEach(author=>{
          authorFullName+=author.first_name+" "+author.last_name+", "
        })
        authorFullName = authorFullName.substring(0, authorFullName.length - 2);
        setAuthorString(authorFullName)
      }
    },[authors])
    return (<div>{authorString}</div>)
  }
  const [books, setBooks] = useState([])
  useEffect(() => {
    async function getAllBooks() {
      try {
        const Books = await axios.get('http://localhost:8000/library')
        setBooks(Books.data)
      } catch (error) {
        console.log(error)
      }
    }
    getAllBooks()
  }, [])


  return (

  <div style={{
      position: 'absolute',
      height: '628px',
      width: '1598px',
      padding: '8px 0 48px 0',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'flex-start',
      background: '#FFFFFF',
      gap: '48px',
      boxSizing: 'border-box',
      backgroundColor: '#FFFFFF'
    }}>
      <h3 style={{
        color: '#000000',
        minHeight: '28px',
        width: '300px',
        height: '28px',
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
      <div style={{
        width: '1598px',
        height: '504px',
        display: 'flex',
        color: '#FFFFFF',
        flexDirection: 'row',
        alignItems: 'flex-start',
        gap: '8px',
        flex: 'none',
        order: 1,
        flexGrow: 0,
      }}>

        {
          books.map((book, i) => {
            return (
              <div style={{
                height: '504px',
                width: '278px',
                borderRadius: '8px',
                paddingLeft: '0px',
                paddingTop: '0px',
                gap: '24px',
                border: '1px solid #EFEFFD',
                background: '#EFEFFD',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                flex: 'none',
                order: '0',
                flexGrow: '0',
                boxSizing: 'border-box',
              }} key={i}>
                <div style={{
                  height: '360px',
                  paddingLeft: '0px',
                  width: '246px',
                  margin: '16px 16px 0px 16px',
                  border: '1px solid #EFEFFD',
                  boxSizing: 'border-box',
                  flex: 'none',
                  order: '0',
                  flexGrow: '0',
                  alignItems: 'center'

                }}>
                  <div style={{
                    height: '184px',
                    width: '234px',
                    gap: '16px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                    padding: '0px',
                    position: 'absolute',
                    marginTop: '50px',
                    marginLeft: '6px',
                    fontFamily: 'Work Sans',
                    fontStyle: 'normal',
                    fontWeight: '600',
                    fontSize: '24px',
                    lineHeight: '28px',
                    letterSpacing: '-0.02em',
                    color: '#0E0E2C'
                  }}>
                    DESCRIPTION BOX
                  </div>
                  <button onClick={handleClick} style={{
                    position: 'absolute',
                    marginTop: '296px',
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
                  }} >READ
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
                    fontSize: '20px',
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
                    }}>
                      <HandleAuthors authors={book.author}/>
                    </div>
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
                    }}>
                      {book.year}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        }
      </div>
    </div>

  );
}

export { Books };