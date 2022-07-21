import { makeStyles } from '@material-ui/core/styles';
import theme from "./../../../common/theme";

const themeGlobal = localStorage.getItem("theme");
const themeSelected = themeGlobal === "light" ? theme.lightTheme : theme.darkTheme;

const useStyles = makeStyles((theme) => ({
    root: {
        height: "100vh",
        backgroundColor: themeSelected.backgroundColor1,
    },
    textContent: {
        color: themeSelected.color1,
    },
    description: {
        height: "150px",
        wordWrap: "break-word",
        overflowY: "hidden",
    },
    sectionImage: {
        position: "relative",
        width: "100%",
        height: "100%",
    },
    image: {
        width: "100%",
        borderRadius: "15px",
    }
}));

export default useStyles;