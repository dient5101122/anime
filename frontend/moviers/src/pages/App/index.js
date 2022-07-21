import React, { useState } from "react";
import Header from './../../layouts/Header';
import Body from './../../layouts/Body';
import './style.css';
import useStyles from "./style";
import { useEffect } from "react";

function App() {
  const [themeSelected, setThemeSelected] = useState(state => {
    let theme = localStorage.getItem("theme");
    state = theme;
    return state;
  });

  useEffect(() => {
    localStorage.setItem("theme", themeSelected);
  }, [])

  const classes = useStyles();

  return (
    <div className={`App ${classes.root}`}>
      <Header />
      <Body />
    </div>
  );
}


export default App;
