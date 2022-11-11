import React from 'react'
import "../books_landing/Hover.css"
function BookDescription3({ book }) {

  return (
    book ? <div className='bookdescription_3' style={{ marginLeft: '24px', width: '973px', height: '462px', display: 'flex', flexDirection: 'column', position: 'absolute', borderRadius: '12px', alignItems: 'flex-start' }}>
      <div style={{ marginLeft: '40px', marginTop: '40px', width: '905px', height: '382px', display: 'flex', flexDirection: 'row', alignItems: 'flex-start', flex: 'none', order: 1, flexGrow: 0 }}>
        <img src="https://media.istockphoto.com/photos/wooden-brown-books-shelves-with-a-lamp-picture-id1085770318?k=20&m=1085770318&s=612x612&w=0&h=1MmiueCOCEEjQOGDLuUHAonGuFZQFz2BOicOs0cK1cY=" alt="IMG" style={{ width: '320px', height: '320px', borderRadius: '8px' }}>

        </img>
        <div style={{ marginLeft: '24px', height: '382px', width: '561px', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 'none', order: 1, flexGrow: 0, }}>
          <div style={{ height: '45px', width: '561px', gap: '16px', padding: 0, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 'none', order: 1, flexGrow: 0, alignSelf: 'stretch' }}>
            <h3 style={{ height: '28px', width: '561px', fontFamily: 'Work Sans', fontSize: '24px', fontWeight: '600', lineHeight: '28.15px', letterSpacing: '-2%', color: '#0E0E2C', alignItems: 'flex-start', flex: 'none', order: 1, flexGrow: 0, alignSelf: 'stretch', margin: 0 }}>
              {book.title}
            </h3>

          </div>
          <div style={{ marginTop: '40px', height: '209px', width: '561px', display: 'flex', flexDirection: 'column', alignItems: 'center', flex: 'none', order: 1, flexGrow: 0, alignSelf: 'stretch' }}>
            <div style={{ height: '44px', width: '561px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 'none', order: 1, flexGrow: 0, alignSelf: 'stretch', padding: 0, gap: '10px' }}>
              <p style={{ height: '28px', width: '561px', fontFamily: 'Work Sans', fontSize: '16px', fontWeight: '500', lineHeight: '22px', letterSpacing: '-2%', color: '#0E0E2C', alignItems: 'flex-start', flex: 'none', order: 1, flexGrow: 0, alignSelf: 'stretch', margin: 0 }}>
                {/* {book.author[0].first_name + " " + book.author[0].last_name} */}

              </p>

            </div>
            <div style={{ height: '157px', width: '561px', marginTop: '8px', backgroundColor: '#FAFCFE', borderRadius: '8px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 'none', order: 1, flexGrow: 0, alignSelf: 'stretch' }}>
              <div style={{ height: '132px', width: '529px', marginTop: '12px', marginLeft: '16px', display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                <p style={{ fontFamily: 'Work Sans', fontSize: '16px', fontWeight: '500', lineHeight: '22px', letterSpacing: '-2%', color: '#8C8CA1', alignItems: 'flex-start', flex: 'none', order: 1, flexGrow: 0, alignSelf: 'stretch', margin: 0 }}>
                {book.description}
                </p>

              </div>

            </div>

          </div>
          <div>

          </div>
        </div>
      </div>

    </div> : <></>
  )
}

export default BookDescription3