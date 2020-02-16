import React from 'react';
import './App.css';
import ReactGoogleMaps from './ReactGoogleMaps';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import dino from './img/dino.png';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
}));

function App() {
  const classes = useStyles();

  return (
    <div className="App">
    <AppBar position="static">
        <Toolbar>
          <Typography variant="title">
            <img src={dino} alt='U of C Dino Logo' height={60} />
          </Typography>
          <Typography id="title" variant="h5" className={classes.title}>
            Dino-Watch
          </Typography>
        </Toolbar>
      </AppBar>
      <ReactGoogleMaps> </ReactGoogleMaps>
    </div>
  );
}

export default App;
