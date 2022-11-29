import { InputBase } from '@mui/material'
import SearchIcon from "@material-ui/icons/Search";
import {Box} from '@mui/material';
import React from 'react'
import './Search.css'
import { makeStyles } from '@material-ui/core/styles';
import { useState } from 'react'
import { useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'



const useStyles = makeStyles(theme => ({
    
      inputRoot: {
        width: '100%'
      },
      inputInput: {
        
        paddingLeft: 30,
        fontSize: 14,
        height: 15,  
        paddingTop:0,
        paddingBottom:0,
        width: '100%'
    }
}));

function Search() {
  let navigate = useNavigate()
  const [searchBarText, setSearchBarText] = useState("")
  // const [text,setText]=useState("");
  // const [filteredData, setFilteredData] = useState([]);
  // const data = [
  //   "History Adventures, World of Characters, Revolutions & Industrialization",
  //   "The Guns of August",
  //   "The Liberation Trilogy",
  //   "1776",
  //   "1491",
  //   "David McCullough",
  //   "In Search of Lost Time by Marcel Proust",
  //   "One Hundred Years of Solitude by Gabriel Garcia Marquez.",
  //   "The Great Gatsby by F",
  //   "Moby Dick by Herman Melville",
  //   "Hamlet by William Shakespeare. Hamlet by William Shakespeare. Hamlet by William Shakespeare. Hamlet by William Shakespeare."
  // ];
  const classes = useStyles();

  // useEffect(()=>{

  //   const newFilter = data.filter((value) => {
  //     return value.toLowerCase().includes(text.toLowerCase());
  //   });

  //   if (text === "") {
  //     setFilteredData([]);
  //   } else {
  //     setFilteredData(newFilter);
  //   }


  // },[text]);

  const handleSearch = async(e)=>{
    e.preventDefault()
    // console.log(searchBarText)
    try{
      let res = await axios({
        method:'post',
        url:'http://64.227.182.173:8000/library/search/',
        data:{
          "searchkey":searchBarText
        }
      })
      console.log(res)
      navigate('/dashboard/discoverbook',{state:res.data})
    }
    catch(error) {
      console.log(error.name)
    }

  }
 

  return (
    <div >
    <Box style={{ 
        height: 48,
        display: 'flex',
     
        marginTop:'16px',
        marginLeft:0,
        transition: 'box-shadow .18s ease-out,background-color .25s ease-out'}}>
      <Box style={{position: 'relative',
        borderRadius: 18,
        backgroundColor: '#ECF1F4',
        width: '100%',
        display:'flex',
        flexDirection:'row-reverse'}}>
      
      <InputBase styles={{width:'857px'}}
      placeholder="Search by author, ISBN, title or topic"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              onChange={(e)=>{setSearchBarText(e.target.value)}}
      />
      <Box style={{
        height: '100%',
        position: 'absolute',
        display: 'flex',
        alignItems: 'center',

        }}>
            <SearchIcon onClick={handleSearch} fontSize="small" style={{marginRight:12}}/>
      </Box>
      </Box>
      </Box>
      </div>
    
  )
}

export default Search
