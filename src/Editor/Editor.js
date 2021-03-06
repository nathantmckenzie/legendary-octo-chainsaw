import React, { useState } from 'react';

// Material UI Imports
import { makeStyles, useTheme } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import AddBoxIcon from '@material-ui/icons/AddBox';
import MenuIcon from '@material-ui/icons/Menu';
import clsx from 'clsx';

// Project Imports
import logo from '../logo.png';
import firebase from "../firebase";
import LibraryList from '../components/LibraryList';
import ProfileMenu from '../components/ProfileMenu';
import ShareMenu from '../components/ShareMenu';
import ProviderFlow from './ProviderFlow';


const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexGrow: 1,
  },
  navlogo: {
    marginRight: theme.spacing(1),
  },
  title: {
    flexGrow: 1,
    color: '#FFFFFF'
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up('sm')]: {
      width: 0,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  newdoc: {
    paddingLeft: '24px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  }
}));

export default function Editor() {
  const classes = useStyles();
  const [auth, setAuth] = React.useState(true);
  const theme = useTheme();
  const [openDrawer, setOpenDrawer] = React.useState(false);

  //FIRESTORE DOCUMENT STATE
  const [docs, setDocs] = React.useState([]);
  const [newDocName, setNewDocName] = React.useState();
  const [isPublic, setIsPublic] = React.useState(false);
  const [isPublicEditable, setIsPublicEditable] = React.useState(false);
  const [createdDate, setCreatedDate] = React.useState(new Date());

  const handleDrawerOpen = () => {
    setOpenDrawer(true);
  };

  const handleDrawerClose = () => {
    setOpenDrawer(false);
  };

  const handleChange = (event) => {
    setAuth(event.target.checked);
  };

  //GET DOCS FROM FIRESTORE
  React.useEffect(() => {
    const fetchData = async () => {
      const db = firebase.firestore();
      const data = await db.collection("docs").get();
      setDocs(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    };
    fetchData();
  }, []);

  const onCreate = () => {
    const db = firebase.firestore();
    db.collection("docs").add({ created_date: createdDate, is_public: isPublic, name: newDocName, public_editable: isPublicEditable});
  };




  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar className={clsx(classes.appBar, {
          [classes.appBarShift]: openDrawer,
        })} position="fixed">
        <Toolbar>
          <IconButton
              color="inherit"
              aria-label="open drawer"
              onClick={handleDrawerOpen}
              edge="start"
              className={clsx(classes.menuButton, {
                [classes.hide]: openDrawer,
              })}
            >
              <MenuIcon />
            </IconButton>
          <img className={classes.navlogo} src={logo} alt="Entropy Logo" height="32" width="32" />
          <Typography variant="h6" className={classes.title}>
            Entropy
          </Typography>
          {auth && (
            <ShareMenu/>
            )}
            <ProfileMenu/>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: openDrawer,
          [classes.drawerClose]: !openDrawer,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: openDrawer,
            [classes.drawerClose]: !openDrawer,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <Typography variant="body1" align="left">
            Documents
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </div>
        <Divider />
        <div className={classes.newdoc}>
          <Typography variant="body1">
            Private
            <TextField
              value={newDocName}
              onChange={e => setNewDocName(e.target.value)}
            />
          </Typography>
          <IconButton>
            {<AddBoxIcon onClick={onCreate}> </AddBoxIcon>}
          </IconButton>
            </div>
        <LibraryList public='false'/>
        <Divider/>
        <div className={classes.newdoc}>
          <Typography variant="body1">
            Shared
          </Typography>
          <IconButton>
            {<AddBoxIcon/>}
          </IconButton>
        </div>
        <LibraryList public='true'/>
      </Drawer>
      <ProviderFlow />
    </div>
  );
}
