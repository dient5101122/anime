import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        background: theme.background,
        border: 0,
        fontSize: 16,
        borderRadius: 3,
        boxShadow: theme.boxShadow,
        color: 'white',
        height: 48,
        padding: '0 30px',
    },
}));

export default useStyles;