
import React, { useState } from 'react';
import Snackbar from '@material-ui/core/Snackbar';
import MySnackbarContentWrapper from '../../components/Snackbar/Notifier';
import Button from '@material-ui/core/Button';

class MessageBox extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            open: false
        }
    }

    handleOnClose = () => {
        this.setState({ open: false })
    }
    showMessage = (message, type) => {
        this.setState({ open: true, message, type })
    }

    render() {
        const { open, message, type } = this.state;
        return <Snackbar className="snackbarmain" anchorOrigin={{ vertical: 'top', horizontal: 'center', }}
            open={open} autoHideDuration={30000} onClose={this.handleOnClose}>
            <MySnackbarContentWrapper
                onClose={this.handleOnClose}
                variant={type}
                message={<span id="message-id">{message}</span>}
                action={[
                    <Button aria-label="click here to close" key="undo" className="SnackBarClose" color="primary" size="small" onClick={this.handleOnClose}>
                        CLOSE
              </Button>,
                ]}
            />
        </Snackbar>
    }
}


export default MessageBox;