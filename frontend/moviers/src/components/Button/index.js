import React from 'react';
import { ThemeProvider } from '@material-ui/core/styles';

import useStyles from "./style";

function DeepChild({ content }) {
    const classes = useStyles();

    return (
        <button type="button" className={classes.root}>
            {content}
        </button>
    );
}

export default function ThemeNesting({ content }) {
    return (
        <div>
            <ThemeProvider
                theme={{
                    background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
                    boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
                }}
            >
                <br />
                <ThemeProvider
                    theme={(outerTheme) => ({
                        ...outerTheme,
                        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
                    })}
                >
                    <DeepChild content={content} />
                </ThemeProvider>
            </ThemeProvider>
        </div>
    );
}
