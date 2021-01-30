import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { MDBNavLink } from "mdbreact";
import { lighten, makeStyles } from "@material-ui/core/styles";
import Button from '@material-ui/core/Button';
const useToolbarStyles = makeStyles((theme) => ({
    root: {
        paddingLeft: theme.spacing(2),
        paddingRight: theme.spacing(1),
    },

    title: {
        flex: "1 1 100%",
    },
}));


const EnrollUnEnrollButton = (props) => {
    const classes = useToolbarStyles();
    const { numSelected, btnText, handleOnClick, navigate } = props;

    return (
        <div className="autopbuttonarea">
            {numSelected > 0 ? (
                typeof handleOnClick == 'function' ?
                    <Button aria-label="click here to autopay" onClick={handleOnClick || false} variant="contained" color="secondary" className="autopayenable" >
                        ({numSelected}) {btnText}
                </Button> : <MDBNavLink
                        to={'/' + navigate}
                        variant="contained"
                        color="secondary"
                        className="autopayenable">
                        ({numSelected}) {btnText}
                    </MDBNavLink>
            ) : (
                    <MDBNavLink
                        aria-label="click here to autopay"
                        to="/"
                        variant="contained"
                        disabled
                        className="autopaydisable">
                        {btnText}
                    </MDBNavLink>
                )}
        </div>
    );
};

EnrollUnEnrollButton.propTypes = {
    numSelected: PropTypes.number.isRequired,
};

export default EnrollUnEnrollButton