import { Box } from '@material-ui/core';
import React, { useState, useEffect } from 'react';
import { fetchFromServer } from './api/helper';
import './App.css';
import StateWiseList from './components/StateWiseList';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { fade, makeStyles } from '@material-ui/core/styles';
import MenuIcon from '@material-ui/icons/Menu';
import SearchIcon from '@material-ui/icons/Search';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(1),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: '12ch',
      '&:focus': {
        width: '20ch',
      },
    },
  },
}));

function App() {
  const classes = useStyles();
  const [covidData, setCovidData] = useState({});
  const [searchKey, setSearchKey] = useState("");

  useEffect(() => {
    if (!Object.keys(covidData).length)
      fetchFromServer('https://api.covid19india.org/state_district_wise.json').then((result) => {
        setCovidData(result);
      })
  }, [covidData]);
  const searchData = (e) => {
    e.preventDefault();
    let searchValue = e.target.value.toLowerCase() || "";
    setSearchKey(searchValue);
  }
  let newCovidData = {};
  Object.keys(covidData).forEach(state => {
    let eachState = covidData[state];
    let districtData = eachState.districtData || {};
    let newDistrictData = {};
    Object.keys(districtData).forEach((x) => {
      if (x.toLowerCase().includes(searchKey)) {
        Object.assign(newDistrictData, { [x]: districtData[x] });
      }
    })
    if (Object.keys(newDistrictData).length) {
      eachState.districtData = newDistrictData;
      Object.assign(newCovidData, { [state]: eachState });
    }
    else if (state.toLowerCase().includes(searchKey)) {
      Object.assign(newCovidData, { [state]: eachState });
    }
  })
  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Covid Report
          </Typography>
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Search…"
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ 'aria-label': 'search' }}
              value={searchKey}
              onChange={searchData}
            />
          </div>
        </Toolbar>
        <StateWiseList covidData={newCovidData} />
      </AppBar>
    </div>
  );
}

export default App;
