import { makeStyles } from '@material-ui/core/styles';
import theme from "./../../common/theme";

const themeGlobal = localStorage.getItem("theme");
const themeSelected = themeGlobal === "light" ? theme.lightTheme : theme.darkTheme;

const useStyles = makeStyles((theme) => ({
    root: {
        background: theme.background,
        color: themeSelected.color,
        height: '100vh',
    },

    sectionImage: {
        width: '70%',
        backgroundColor: themeSelected.primary.p2,
        textAlign: 'center',
        borderRadius: '15px',
        paddingBottom: '3%'
    },

    movie_content: {
        display: 'flex',
        width: '100%',
        // backgroundColor: 'red'
    },

    image: {
        width: '100%',
        borderRadius: '15px',
    }
}));

export default useStyles;