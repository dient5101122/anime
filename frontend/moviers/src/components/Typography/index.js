import React from 'react';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
    root: {
        display: 'inline',
        width: '100%',
        maxWidth: 500,
    },
    title: {
        fontWeight: 'bold',
    }
});

export default function Types({ variant, content, color = "black" }) {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Typography variant={variant} gutterBottom style={{ color: `${color}` }} className={classes.title}>
                {content}
            </Typography>
        </div>
    );
}
