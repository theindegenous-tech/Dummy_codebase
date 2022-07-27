import React from 'react'
import Search from '../books_landing/Search'
import {useNavigate} from 'react-router-dom'
function Discover2() {
    let navigate= useNavigate();
    let path="/dashboard/discoverbook"
  return (
    <div style={{marginLeft:'56px'}}>

   
        <div style={{marginLeft:'93px', width:'807px', height:'71px',marginTop:'236px', alignItems:'center', justifyContent:'center', textAlign:'center',}}>
            <h2 style={{margin:0,fontFamily: 'Work Sans',fontSize:'40px',fontWeight:'700',  lineHeight:'46.92px', letterSpacing:'-2%', color:'#0E0E2C',}}>
                Find the next adventure to lose yourself in
            </h2>
            <h3 style={{margin:0,fontFamily: 'Work Sans',fontSize:'24px',fontWeight:'500',lineHeight:'28px',color:'#0E0E2C'}}>
                Over 10,000 titles to choose from
            </h3>
        </div>
        <div style={{marginTop:'82px', width:'857px',alignItems:'center', justifyContent:'center', textAlign:'center', marginLeft:'76px'}}>
            <Search style={{margin:0}}/>
        </div>
        <div style={{marginLeft:'76px',alignItems:'center', justifyContent:'center', textAlign:'center',width:'857px',height:'48px',marginTop:'28px'}}>
            <button style={{padding:'12px 24px', borderRadius:'8px', background:'#428CFB', width:'182px', height:'38px', border:'none', color:'#FFFFFF',fontFamily: 'Work Sans',fontSize:'16px',fontWeight:'700',lineHeight:'18.77px',letterSpacing:'4%'}} onClick={()=>navigate(path,{state:{suggestions:[]}})}>
            Lets Go
        </button>
        </div>
     </div>

  )
}

export default Discover2    