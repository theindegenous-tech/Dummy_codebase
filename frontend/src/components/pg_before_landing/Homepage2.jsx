import React from 'react'
import BookDescription5 from '../Reusable/BookDescription5'
import BookDescription6 from '../Reusable/BookDescription6'
import { BookReusable3 } from '../Reusable/BookReusable3'
import { BookReusable7 } from '../Reusable/BookReusable7'
function Homepage2() {
  return (
     <div style={{
                            display: 'flex',
                            flexDirection: 'column',
                            background: '#FFFFFF',
                            height:'auto'
                          }}>
                             <BookReusable7 />
                             <div style={{position:'relative', height:'511px', marginTop:'44px'}}>
                                  <BookDescription5 />
                            
                                </div>
                                <div style={{position:'relative', height:'511px',marginTop:'48px'}}>
                                  <BookDescription6 />
                            
                                </div>
                                <BookReusable3 />
                                
                                
                        
                      </div> 
  )
}

export default Homepage2