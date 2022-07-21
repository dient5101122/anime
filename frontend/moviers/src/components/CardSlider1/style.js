import { makeStyles } from '@material-ui/core/styles';
import theme from "./../../common/theme";

const themeGlobal = localStorage.getItem("theme");
const themeSelected = themeGlobal === "light" ? theme.lightTheme : theme.darkTheme;

const useStyles = makeStyles((theme) => ({
    cardSlider: {
        backgroundColor: themeSelected.primary.p2,
    }
}));

export default useStyles;