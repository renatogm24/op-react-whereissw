import { makeStyles } from "@material-ui/styles";
import React from "react";
import { Divider, Drawer, IconButton, useTheme } from "@material-ui/core";
import { Typography } from "@material-ui/core";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import ChevronLeftIcon from "@material-ui/icons/ChevronLeft";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import MenuIcon from "@material-ui/icons/Menu";
import { useHistory, useLocation } from "react-router";
import { AppBar } from "@material-ui/core";
import { Toolbar } from "@material-ui/core";
import { format } from "date-fns";
import { Avatar } from "@material-ui/core";
import clsx from "clsx";
import Switch from "@material-ui/core/Switch";
import { green } from "@material-ui/core/colors";
import VideogameAssetIcon from "@material-ui/icons/VideogameAsset";
import EmojiEventsIcon from "@material-ui/icons/EmojiEvents";
import { motion } from "framer-motion";
import Timer from "./Timer2";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => {
  return {
    page: {
      background: theme.palette.background.default,
      width: "100%",
      height: "95vh",
      padding: theme.spacing(5),
    },
    root: {
      display: "flex",
    },
    active: {
      background: theme.palette.background.default,
    },
    title: {
      padding: theme.spacing(2),
    },
    toolbarDiv: theme.mixins.toolbar,
    date: {
      flexGrow: 1,
    },
    avatar: {
      marginLeft: theme.spacing(1),
      backgroundColor: green[500],
    },
    appBar: {
      background: theme.palette.background.default,
      color: theme.palette.type === "dark" ? "white" : "black",
      zIndex: theme.zIndex.drawer + 1,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
    },
    appBarShift: {
      marginLeft: drawerWidth,
      width: `calc(100% - ${drawerWidth}px)`,
      transition: theme.transitions.create(["width", "margin"], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    menuButton: {
      marginRight: 36,
    },
    hide: {
      display: "none",
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: "nowrap",
    },
    drawerOpen: {
      width: drawerWidth,
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
    },
    drawerClose: {
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      overflowX: "hidden",
      width: theme.spacing(7) + 1,
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(8) + 1,
      },
    },
    toolbar: {
      display: "flex",
      alignItems: "center",
      justifyContent: "flex-end",
      padding: theme.spacing(0, 1),
      // necessary for content to be below app bar
      ...theme.mixins.toolbar,
    },
    content: {
      flexGrow: 1,
      padding: theme.spacing(3),
    },
  };
});

export default function Layout({
  children,
  toggleDark,
  settoggleDark,
  setShowCart,
  open,
  setOpen,
  setTimerIsRunning,
  timerIsRunning,
  saveData,
  setTime,
}) {
  const classes = useStyles();
  const history = useHistory();
  const location = useLocation();
  const theme = useTheme();

  // Trigger toggle using onChange Switch
  const handleModeChange = () => {
    settoggleDark(!toggleDark);
  };

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const menuItems = [
    {
      text: "Games",
      icon: <VideogameAssetIcon color="primary" />,
      action: () => history.push("/op-react-whereissw"),
    },
    {
      text: "Records",
      icon: <EmojiEventsIcon color="primary" />,
      action: () => history.push("/op-react-whereissw/records"),
    },
  ];

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}
          >
            <MenuIcon />
          </IconButton>
          <Typography className={classes.date}>
            {format(new Date(), "MMM do")}
          </Typography>
          <Timer
            setTimerIsRunning={setTimerIsRunning}
            timerIsRunning={timerIsRunning}
            saveData={saveData}
            setTime={setTime}
          />
          <Switch
            checked={toggleDark}
            onChange={handleModeChange}
            name="toggleDark"
            color="default"
          />
          <Typography className={classes.user}>Renato Garay</Typography>
          <Avatar className={classes.avatar}>RG</Avatar>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="permanent"
        className={clsx(classes.drawer, {
          [classes.drawerOpen]: open,
          [classes.drawerClose]: !open,
        })}
        classes={{
          paper: clsx({
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          }),
        }}
      >
        <div className={classes.toolbar}>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "rtl" ? (
              <ChevronRightIcon />
            ) : (
              <ChevronLeftIcon />
            )}
          </IconButton>
        </div>
        <Divider />

        <List>
          {menuItems.map((item) => (
            <ListItem
              button
              key={item.text}
              onClick={item.action}
              className={
                location.pathname === item.path ? classes.active : null
              }
              component={motion.div}
              whileHover={{
                scale: 1.1,
                transition: { type: "spring", stiffness: 1000 },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Drawer>

      <div className={classes.page}>
        <div className={classes.toolbarDiv}></div>
        {children}
      </div>
    </div>
  );
}
