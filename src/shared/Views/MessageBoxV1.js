import React, { useState, useRef } from "react";

import PropTypes from 'prop-types';
import Snackbar from '@material-ui/core/Snackbar';
import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import WarningIcon from '@material-ui/icons/Warning';
import classNames from 'classnames';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => ({
    success: {
        backgroundColor: '#27A088',
    },
    error: {
        backgroundColor: '#AF0220',
    },
    info: {
        backgroundColor: theme.palette.primary.dark,
    },
    warning: {
        backgroundColor: '#f2c624',
        color:'#222221'
    },
    icon: {
        fontSize: 20,
    },
    iconVariant: {
        opacity: 0.9,
        marginRight: theme.spacing.unit,
    },
    message: {
        display: 'flex',
        alignItems: 'center',
        width: '100%'
    },
});

const variantIcon = {
    success: CheckCircleIcon,
    warning: WarningIcon,
    error: ErrorIcon,
    info: InfoIcon,
};

function MySnackbarContent(props) {
    const { classes, className, message, onClose, variant, ...other } = props;
    const Icon = variantIcon[variant];

    return (
        <SnackbarContent
            className={classNames(classes[variant], className)}
            aria-describedby="client-snackbar"
            message={
                <span id="client-snackbar" className={classes.message}>
                    <Icon className={classNames(classes.icon, classes.iconVariant)} />
                    {message}
                </span>
            }
            action={[
                <IconButton
                    key="close"
                    aria-label="Close"
                    color="inherit"
                    className={classes.close}
                    onClick={onClose}
                >
                    <CloseIcon className={classes.icon} />
                </IconButton>,
            ]}
            {...other}
        />
    );
}
MySnackbarContent.propTypes = {
    classes: PropTypes.object.isRequired,
    className: PropTypes.string,
    message: PropTypes.node,
    onClose: PropTypes.func,
    variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};
const MySnackbarContentWrapper = withStyles(styles)(MySnackbarContent);

export class SnakMessage extends React.Component {
    constructor() {
        super();
        this.state = {
            success: false,
            variant: '',
            message: '',
            vertical: 'top',
            horizontal: 'center',
            autoHideDuration: '5000',
            isSingle: true
        }
        this.showMessage = this.showMessage.bind(this);
    }


    showMessage(varientStatus, messageStatus, isSingle = true, Isfixed = false) {

        this.setState({
            success: true,
            variant: varientStatus,
            message: messageStatus,
            isSingle: isSingle
        });
        if (Isfixed) {
            this.setState({
                vertical: 'center',
                horizontal: 'center',
                autoHideDuration: null
            });
        }
        else {
            this.setState({
                vertical: 'top',
                horizontal: 'center',
                autoHideDuration: '10000'
            });
        }
    }

    handleonClick = () => {
        this.setState({ success: true });
    };
    handleonClose = () => {
        if (!this.state.Isfixed)
            this.setState({ success: false });
    };
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Snackbar classes={{ root: 'snackbarfull' }}
                    anchorOrigin={{
                        vertical: this.state.vertical,
                        horizontal: this.state.horizontal,
                    }}
                    open={this.state.success}
                    autoHideDuration={this.state.autoHideDuration}
                    onClose={this.handleonClose} >
                    <MySnackbarContentWrapper Isfixed={this.state.Isfixed}
                        onClose={this.handleonClose}
                        variant={this.state.variant}
                        message=
                        {this.state.isSingle === true ? this.state.message :
                            (this.state.message && this.state.message.length > 0 && Array.isArray(this.state.message) && <div>
                                {this.state.message.map((item) => <span className={"multiLineMessage"}><i class="material-icons">info</i>
                                    {item.msgType}{item.msgType === "" ? "" : ":"}{item.textMessage}</span>
                                )}
                            </div>)
                        }
                        isSingle={this.state.isSingle}
                    />
                </Snackbar>

            </React.Fragment>
        );
    }
}

SnakMessage.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(SnakMessage);
