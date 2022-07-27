import * as React from 'react';
import Button from '@mui/material/Button';
import ClickAwayListener from '@mui/material/ClickAwayListener';
import Grow from '@mui/material/Grow';
import Paper from '@mui/material/Paper';
import Popper from '@mui/material/Popper';
import MenuItem from '@mui/material/MenuItem';
import MenuList from '@mui/material/MenuList';
import Stack from '@mui/material/Stack';

export default function DropdownMenu({setsortDrawerTab}) {
  const [open, setOpen] = React.useState(false);
  const anchorRef = React.useRef(null);

  const handleToggle = () => {
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event) => {
    
    
    if (anchorRef.current && anchorRef.current.contains(event.target)) {
      return;
    }
    if(event.currentTarget.dataset!==undefined){
      const { myValue } = event.currentTarget.dataset;
      console.log(myValue);
    if(myValue==="title"){
      setsortDrawerTab(0);
    }
    else if(myValue==="author"){
      setsortDrawerTab(1);
    }
    else if(myValue==="language"){
      setsortDrawerTab(2);
    }
    else if(myValue==="remove"){
      setsortDrawerTab(-1);
    }
    }
    setOpen(false);
  };

  function handleListKeyDown(event) {
    if (event.key === 'Tab') {
      event.preventDefault();
      setOpen(false);
    } else if (event.key === 'Escape') {
      setOpen(false);
    }
  }

  // return focus to the button when we transitioned from !open -> open
  const prevOpen = React.useRef(open);
  React.useEffect(() => {
    if (prevOpen.current === true && open === false) {
      anchorRef.current.focus();
    }

    prevOpen.current = open;
  }, [open]);

  return (
    <Stack 
    direction="row"
     spacing={2}>
      
      <div>
        <Button
          ref={anchorRef}
          id="composition-button"
          aria-controls={open ? 'composition-menu' : undefined}
          aria-expanded={open ? 'true' : undefined}
          aria-haspopup="true"
          onClick={handleToggle}
          style={{backgroundColor:'blue',color:'#FFFFFF'}}
        >
          SortBy
        </Button>
        <Popper
          open={open}
          anchorEl={anchorRef.current}
          role={undefined}
          placement="bottom-start"
          transition
          disablePortal
        >
          {({ TransitionProps, placement }) => (
            <Grow
              {...TransitionProps}
              style={{
                transformOrigin:
                  placement === 'bottom-start' ? 'left top' : 'left bottom',
              }}
            >
              <Paper>
                <ClickAwayListener onClickAway={handleClose}>
                  <MenuList
                    autoFocusItem={open}
                    id="composition-menu"
                    aria-labelledby="composition-button"
                    onKeyDown={handleListKeyDown}
                  >
                    <MenuItem data-my-value="title" onClick={handleClose}>Title</MenuItem>
                    <MenuItem data-my-value="author" onClick={handleClose}>Author</MenuItem>
                    <MenuItem data-my-value="language" onClick={handleClose}>Language</MenuItem>
                    <MenuItem data-my-value="remove" onClick={handleClose}>RemoveSort</MenuItem>
                  </MenuList>
                </ClickAwayListener>
              </Paper>
            </Grow>
          )}
        </Popper>
      </div>
    </Stack>
  );
}
