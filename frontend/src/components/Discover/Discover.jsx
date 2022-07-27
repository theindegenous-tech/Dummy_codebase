import React from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import BookDescription3 from '../Reusable/BookDescription3'
import { BookReusable5 } from '../Reusable/BookReusable5'
import { BookReusable6 } from '../Reusable/BookReusable6'

function Discover() {
  const { state } = useLocation()
  const { suggestions } = state
  console.log(suggestions)
  return (
    <div style={{ marginLeft: '20px' }}>
      <div style={{ marginLeft: 0, display: 'flex' }}>
        <button style={{ width: '136px', height: '48px', marginTop: '60px', border: '1px solid #EFEFFD', background: '#428CFB', borderRadius: '8px', boxShadow: '0px 6px 2px -4px rgba(14, 14, 44, 0.1), inset 0px -1px 0px rgba(14, 14, 44, 0.4)', color: '#FFFFFF', padding: '12px 24px', fontFamily: 'Work Sans', fontSize: '16px', fontWeight: '700', lineHeight: '18.77px', letterSpacing: '4%' }}>
          TITLE
        </button>
        <button style={{ width: '130px', height: '48px', marginTop: '60px', border: '1px solid #EFEFFD', background: '#EFEFFD', borderRadius: '8px', color: '#428CFB', padding: '12px 24px', fontFamily: 'Work Sans', fontSize: '16px', fontWeight: '700', lineHeight: '18.77px', letterSpacing: '4%' }}>
          ANOTHER
        </button>
        <button style={{ width: '130px', height: '48px', marginTop: '60px', border: '1px solid #EFEFFD', background: '#EFEFFD', borderRadius: '8px', color: '#428CFB', padding: '12px 24px', fontFamily: 'Work Sans', fontSize: '16px', fontWeight: '700', lineHeight: '18.77px', letterSpacing: '4%' }}>
          BUTTON
        </button>
        <button style={{ width: '130px', height: '48px', marginTop: '60px', border: '1px solid #EFEFFD', background: '#EFEFFD', borderRadius: '8px', color: '#428CFB', padding: '12px 24px', fontFamily: 'Work Sans', fontSize: '16px', fontWeight: '700', lineHeight: '18.77px', letterSpacing: '4%' }}>
          HERE
        </button>
      </div>
      {suggestions.map((book,index) => {
        return (<div key={index} style={{ marginTop: '42px', width: '973px', height: '462px' }}>
          <BookDescription3 book={book}/>
        </div>)

      })}
      {/* <div style={{marginTop:'97px', width:'973px',height:'462px'}}>
          <BookDescription3 />
         </div>
         <div style={{marginTop:'42px', width:'973px',height:'462px'}}>
          <BookDescription3 />
         </div>
         <div style={{marginTop:'23px', width:'973px',height:'462px'}}>
          <BookDescription3 />
         </div> */}
      {/* <div style={{marginTop:'8px'}}>
          <BookReusable5 />
         </div>
         <div style={{marginTop:'52px'}}>
          <BookReusable6 />
         </div> */}
    </div>
  )
}

export default Discover