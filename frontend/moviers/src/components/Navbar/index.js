// import React from "react";
// import { Container, Nav, Navbar } from "react-bootstrap";
// import { NavLink } from "react-router-dom";

// export default function NavBar() {
//   return (
//     <>
//       <Navbar
//         // bg="light"

//         style={{ backgroundColor: "rgba(0,0,0,0.2)" }}
//         fixed="top"
//         expand="lg"
//       >
//         <Container>
//           <Navbar.Brand href="#home">NT Movie</Navbar.Brand>

//           <div >
//             <Navbar.Toggle aria-controls="basic-navbar-nav" />
//             <Navbar.Collapse id="basic-navbar-nav" >
//               <Nav className="me-auto">
//                 <NavLink to="/" style={{ marginRight: "10px" }}>
//                   Home
//                 </NavLink>
//                 <NavLink to="/about">About</NavLink>
//               </Nav>
//             </Navbar.Collapse>
//           </div>
//         </Container>
//       </Navbar>
//     </>
//   );
// }

import React from "react";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import Badge from "@material-ui/core/Badge";
import MenuItem from "@material-ui/core/MenuItem";
import Menu from "@material-ui/core/Menu";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";
import AccountCircle from "@material-ui/icons/AccountCircle";
import MailIcon from "@material-ui/icons/Mail";
import NotificationsIcon from "@material-ui/icons/Notifications";
import MoreIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";

import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormGroup from "@material-ui/core/FormGroup";
import Switch from "@material-ui/core/Switch";

import useStyles from "./style";

import theme from "./../../common/theme";
import { fetchMovieDidSearch, BASE_DIR } from "./../../service/movie";

const themeGlobal = localStorage.getItem("theme");
const themeSelected =
  themeGlobal === "light" ? theme.lightTheme : theme.darkTheme;

export default function PrimarySearchAppBar() {
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const [search, setSearch] = React.useState("");

  const [auth, setAuth] = React.useState((state) => {
    let theme = localStorage.getItem("theme");
    if (theme === "light") {
      state = false;
    } else {
      state = true;
    }
    return state;
  });

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleChange = (event) => {
    setAuth(event.target.checked);

    let theme = event.target.checked ? "dark" : "light";
    localStorage.setItem("theme", theme);
    window.location.reload();
  };

  const handleKeyDown = async (e) => {
    if (e.key === "Enter") {
      let res = await fetchMovieDidSearch(search);
      window.location =
        "http://localhost:3000/movie/" + res.data.results[0].anime_id;
    }
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Trang chủ</MenuItem>
      <MenuItem onClick={handleMenuClose}>Giới thiệu</MenuItem>
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      {/* <MenuItem>
        <IconButton aria-label="show 4 new mails" color="inherit">
          <Badge badgeContent={4} color="secondary">
            <MailIcon />
          </Badge>
        </IconButton>
        <p>Messages</p>
      </MenuItem> */}
      {/* <MenuItem>
        <IconButton aria-label="show 11 new notifications" color="inherit">
          <Badge badgeContent={11} color="secondary">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        <p>Notifications</p>
      </MenuItem> */}
      <MenuItem onClick={handleProfileMenuOpen}>
        {/* <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton> */}
        <div style={{ display: "block" }}>
          <p>Trang chủ</p>
          <p>Giới thiệu</p>
        </div>
      </MenuItem>
    </Menu>
  );

  return (
    <div className={classes.grow}>
      {/* <AppBar position="fixed" color="default" style={{ color: "black", opacity: "0.7" }}> */}
      <AppBar
        position="static"
        color="transparent"
        style={{ color: `${themeSelected.color}`, opacity: "0.7" }}
      >
        <Toolbar>
          {/* <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
            aria-label="open drawer"
          >
            <MenuIcon />
          </IconButton> */}

          <Typography className={classes.title} variant="h6" noWrap>
            <Link to="/" className={classes.url}>
              MOVIE
            </Link>
          </Typography>

          <div className={classes.grow} />

          {/* Search Box */}
          <div className={classes.search}>
            <div className={classes.searchIcon}>
              <SearchIcon />
            </div>
            <InputBase
              placeholder="Tìm kiếm..."
              classes={{
                root: classes.inputRoot,
                input: classes.inputInput,
              }}
              inputProps={{ "aria-label": "search" }}
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onKeyDown={handleKeyDown}
            />
          </div>
          {/* --------------------------------------- */}
          {/* ---------------THEME TOGGLE------------ */}
          <FormGroup>
            <FormControlLabel
              control={
                <Switch
                  checked={auth}
                  onChange={handleChange}
                  aria-label="login switch"
                />
              }
              label={auth ? "Light" : "Dark"}
            />
          </FormGroup>
          {/* --------------------------------------- */}

          <div className={classes.sectionDesktop}>
            {/* <IconButton aria-label="show 4 new mails" color="inherit">
              <Badge badgeContent={4} color="secondary">
                <MailIcon />
              </Badge>
            </IconButton>
            <IconButton aria-label="show 17 new notifications" color="inherit">
              <Badge badgeContent={17} color="secondary">
                <NotificationsIcon />
              </Badge>
            </IconButton> */}

            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              {/* <AccountCircle /> */}
              <MenuIcon />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
