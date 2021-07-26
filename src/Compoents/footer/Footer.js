import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import BottomNavigation from "@material-ui/core/BottomNavigation";
import BottomNavigationAction from "@material-ui/core/BottomNavigationAction";
import WhatshotIcon from "@material-ui/icons/Whatshot";
import TheatersIcon from "@material-ui/icons/Theaters";
import TvIcon from "@material-ui/icons/Tv";
import SearchIcon from "@material-ui/icons/Search";

import { Link } from "react-router-dom";

const useStyles = makeStyles({
  root: {
    width: " 100%",
    position: "fixed",
    bottom: 0,
    background: "#2C2B2B",
  },
});

export default function LabelBottomNavigation() {
  const classes = useStyles();
  const [value, setValue] = React.useState("recents");

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
 
    <BottomNavigation
      value={value}
      onChange={handleChange}
      className={classes.root}
    >
      <BottomNavigationAction
        label="Trending"
        value="recents"
        icon={
          <Link to="/">
            <WhatshotIcon styles={{ color: "#fff" }} />
          </Link>
        }
      />
      <BottomNavigationAction
        label="Movies"
        value="favorites"
        icon={
          <Link to="Movies">
            {" "}
            <TheatersIcon />
          </Link>
        }
      />
      <BottomNavigationAction
        label="TV Series"
        value="nearby"
        icon={
          <Link to="Series">
            {" "}
            <TvIcon />{" "}
          </Link>
        }
      />

      <BottomNavigationAction
        label="search"
        value="folder"
        icon={
          <Link to="Search">
            {" "}
            <SearchIcon />{" "}
          </Link>
        }
      />
    </BottomNavigation>
  );
}
