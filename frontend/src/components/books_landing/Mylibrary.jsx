import { useState, useEffect, useContext } from "react";
import './style.scss'
import './Hover.css'
import axios from "axios";
import { UserContext } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import DeleteIcon from '@mui/icons-material/Delete';
function Mylibrary() { 

  const [mylibrarybooks, setmylibrarybooks] = useState([])
  let { user, setUser,readingbook,setReadingbook } = useContext(UserContext);
  let navigate = useNavigate(); 
  let path = `/dashboard/reading1`;   

  useEffect(()=>{
    const getBooks = async()=>{
      let books = await Promise.all(user.personalisation.mylibrary.map(async(bookID)=>{
        let res = await axios({
          method: 'get',
          url: 'http://64.227.182.173:8000/library/' + bookID + '/',
        });
        return res.data
      }))
      setmylibrarybooks(books)

    }
    if(user) {
      getBooks()
    }
  },[user])


  const HandleAuthors=({authors})=>{
    const[authorString, setAuthorString] = useState("")
    useEffect(()=>{
      if(authors){
        let str=""
        authors.forEach(author=>{
          str+=author.first_name+" "+author.last_name+", "
        })
        str = str.substring(0, str.length - 2);
        setAuthorString(str)
      }
    },[authors])
    return (<div>{authorString}</div>) 
  }

  // This function remoes book from added mylibrary books

  const mylibraryClick = async(book) => {
    let librarybooks= user.personalisation.mylibrary;
    const index = librarybooks.indexOf(book.id);
    if (index > -1) { // only splice array when item is found
    librarybooks.splice(index, 1); // 2nd parameter means remove one item only
    }
    let mylibrary= mylibrarybooks;
    const filteredBooks = mylibrary.filter((item) => item.id !== book.id);
      console.log(filteredBooks);
      setmylibrarybooks(filteredBooks)
      // librarybooks.push(book.id)
      // console.log({...user.personalisation, liked:likedbooks})
      let res = await axios({
        method: 'put',
        url: 'http://64.227.182.173:8000/personalisation/'+user.personalisation.id+'/',
        data:{...user.personalisation, mylibrary:librarybooks},
        withCredentials: true
      });
      
  }

//This function renders all books    

function Items({ currentItems}) {
    
  return (
   
    <div className="books_container" style={{
      height:'auto',
      display:'flex',
      color:'#FFFFFF',
      flexDirection: 'row',
      alignItems:'flex-start',
      gap:'8px',
      top:'10%',
      order:1,
      flexGrow:1,
      flexWrap:'wrap',
      boxSizing:'border-box',
      maxWidth:'1200px'}}     
      >

      {
        currentItems &&
       currentItems.map((book, i)=>{
         return (
           <div className='book_out'style={{height:'504px',
              width:'278px',
              borderRadius:'8px',
              paddingLeft:'0px',
              paddingTop:'0px',
              gap:'24px',
              border:'1px solid #EFEFFD',
              display:'flex',
              flexDirection:'column',
              alignItems:'center',
              flex:'1 1 139px',
              order:'0',
              flexGrow:'0',
              border:'none',
              boxSizing:'border-box',}} key={i}>
             <div className="book_desc_button" style={{height:'360px',
                paddingLeft:'0px',
                width:'246px',
                borderRadius:'8px',
                margin:'16px 16px 0px 16px',
                border:'1px solid #EFEFFD',
                boxSizing:'border-box',
                flex:'none',
                order:'0',
                flexGrow:'0',
                alignItems:'center',
                backgroundImage:`url(${book.imageurl})`,
                backgroundSize:'100% 100%'}}>
                  <div style={{display:'flex',justifyContent:'flex-end'}}>
                    <DeleteIcon onClick={()=>{mylibraryClick(book)}}/>
                  </div>
               <div className="book_description" style={{height:'184px',
                  width:'234px',
                  gap:'16px',
                  display:'flex',
                  flexDirection:'column',
                  alignItems:'flex-start',
                  padding:'0px',
                  position:'absolute',
                  marginTop:'30px',
                  marginLeft:'6px',
                  fontFamily:'Work Sans',
                  fontStyle:'normal',
                  fontWeight:'600',
                  fontSize:'15px', 
                  lineHeight:'28px',
                  letterSpacing:'-0.02em',
                  color:'#',}}>
                            This section is all about description of book. Description of book gives us brief idea of what the book is all about and is also one of the main component of book which can either make reader read the book or not.
               </div>
              <button className="book_read_button" style={{position:'absolute',
                marginTop: '276px',
                height:'48px',
                width:'94px',
                borderRadius:'8px',
                padding:'12px 24px 12px 24px',
                boxSizing:'border-box',
                gap:'8px',
                background:'#FFFFFF',
                border:'1px solid #EFEFFD',
                display:'flex',
                flexDirection:'column',
                alignItems:'center',
                marginLeft:'73px',
                fontFamily:'Work sans',
                fontWeight:'700',
                fontSize:'16px',
                lineHeight:'19px',
                letterSpacing:'0.04em',
                color:'#428CFB',
                fontStyle:'normal',
                textAlign:'center'}} onClick={()=>{setReadingbook(book);navigate(path)}} >READ
                          </button>
             </div>
             <div style={{height:'88px',
                width:'246px',
                marginTop:'0px',
                marginLeft:'16px',
                gap:'16px',
                display:'flex',
                flexDirection:'column',
                alignItems:'flex-start',
                flex:'none',
                order:'1',
                alignSelf:'stretch',
                flexGrow:'0',}}>
                  <h2 style={{textAlign:'left',
                    color:'#0E0E2C',
                    width:'246px',
                    height:'28px',
                    marginTop:'4px',
                    marginBottom:'0px',
                    fontFamily:'Work Sans',
                    fontStyle:'normal',
                    fontWeight:'600',
                    fontSize:'17px',
                    lineHeight:'28px',
                    letterSpacing:'-0.02em',
                    flex:'none',
                    order:'0',
                    alignSelf:'stretch',
                    flexGrow:'0',}}>
                        {book.title}
                  </h2>
                  <div style={{width:'246px',
                      height:'44px',
                      textAlign:'left',
                      color:'#4A4A68',
                      fontFamily:'Work Sans',
                      fontStyle:'normal',
                      fontWeight:'500',
                      fontSize:'16px',
                      lineHeight:'22px',
                      flex:'none',
                      order:'1',
                      alignSelf:'stretch',
                      flexGrow:'0'}}>
                      <div style={{textAlign:'left',
                          color:'#4A4A68',
                          fontFamily:'Work Sans',
                          fontStyle:'normal',
                          fontWeight:'500',
                          fontSize:'16px',
                          lineHeight:'22px',
                          flex:'none',
                          order:'1',
                          alignSelf:'stretch',
                          flexGrow:'0'}}><HandleAuthors authors={book.author} />                                
                      </div>
                      <div style={{textAlign:'left',
                          color:'#4A4A68',
                          fontFamily:'Work Sans',
                          fontStyle:'normal',
                          fontWeight:'500',
                          fontSize:'16px',
                          lineHeight:'22px',
                          letterSpacing:'-0.02em',
                          flex:'none',
                          order:'1',
                          alignSelf:'stretch',
                          flexGrow:'0'}}>{book.year} 
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
   return (
<div  style={{display:'flex',
    flexDirection:'column',
    background:'#FFFFFF',}}>
    <div style={{
    height:'auto',
    maxWidth:'100%',
    padding:'8px 0 0px 0',
    display:'flex',
    flexDirection:'column',
    gap:'48px',
    
    background:'#FFFFFF',
    boxSizing:'border-box',
    backgroundColor:'#FFFFFF'}}>
      <Items currentItems={mylibrarybooks} >
        
      </Items>
      
      
    </div>
    </div>
     

  );
}

export { Mylibrary };