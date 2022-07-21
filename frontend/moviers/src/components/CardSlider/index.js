import React, { useEffect, useState } from "react";
import { Row, Col, Container } from "react-bootstrap";
import Card1 from "./../../components/Card1";
import { Fab, Grid } from '@material-ui/core';
import { ChevronLeft as ChevronLeftIcon, ChevronRight as ChevronRightIcon } from '@material-ui/icons';
import "./style.css";
import useStyles from "./style";

export default function Home({ content, isRS }) {
    const classes = useStyles();

    const [visible, setVisible] = useState(0);

    const decrementVisible = () => {

        if (visible > 0) {
            setVisible(visible - 1)
        }
    };

    const incrementVisible = () => {
        if (visible < content.length - 6) {
            setVisible(visible + 1)
        }
    };

    return (
        <div id="card-slider" className={classes.cardSlider}>

            <Row >
                {content.slice(visible, visible + 6).map((item, index) => {
                    return (
                        <Col key={index} lg={2} md={3} sm={4} xs={6}>
                            <Card1 movie={item} />
                        </Col>
                    );
                })}
            </Row>


            <div id="paginition">
                <div style={{ display: "flex" }}>
                    <div className="icon-slide">
                        <Fab size="small" color="primary" aria-label="add" className="fab-icon" onClick={decrementVisible}>
                            <ChevronLeftIcon />
                        </Fab>
                    </div>

                    <div style={{ padding: "0 15px" }}><p>{ }</p></div>

                    <div className="icon-slide">
                        <Fab size="small" color="primary" aria-label="add" className="fab-icon" onClick={incrementVisible}>
                            <ChevronRightIcon />
                        </Fab>
                    </div>
                </div>
            </div>
        </div>
    );
}
