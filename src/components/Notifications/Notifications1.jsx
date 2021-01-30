import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Paper from '@material-ui/core/Paper';
import { withStyles } from "@material-ui/core/styles";
import Typography from '@material-ui/core/Typography';
import { MDBBadge, MDBCol, MDBContainer, MDBRow } from 'mdbreact';
import PropTypes from "prop-types";
import { default as React } from 'react';
import { Collapse, Navbar, NavbarToggler } from 'reactstrap';
import NotificationRightGrid1 from './NotificationRightSection1';
import Loader from '../../../src/shared/Views/Loader';
import ControlledExpansionPanels from '../Notifications/ExpansionPanel';
import RequestHelper from "../../common/RequestHelper";
import RequestMiddleware from "../../common/RequestMiddleware";
import { StatusCodeEnum, APIURLTypeEnum, NotificationMessageTypeEnum } from '../../core/Enum';

const styles = theme => ({
    root: {
        marginTop: theme.spacing.unit * 3,
    },

});

export function HeadingSectionArea() {
    return (
        <Grid component="div" className="pageheading-wrapper">
            <MDBContainer>
                <MDBRow>
                    <MDBCol md="6" xs="12">
                        <Grid component="div" className="pageheading-box">
                            <Typography component="h1">Notifications</Typography>
                        </Grid>
                    </MDBCol>
                    <MDBCol md="6" xs="12" className="accountboxContainer">
                        {/* <AccountSelectDropDown /> */}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
        </Grid>
    );
}


class SideBar extends React.Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            isOpen: false,
            totalInboxUnreadCount: 0
        };
    }

    componentWillReceiveProps(props) {
        props = props == undefined ? this.props : props;
        this.setState({
            totalInboxUnreadCount: props.data.data
        });
    }
    toggle() {
        this.setState({
            isOpen: !this.state.isOpen
        });
    }

    activeTabonClick = event => {
        event.preventDefault();
        event.currentTarget.parentElement.querySelectorAll(".active")
            .forEach(
                e => e.classList.remove("active"));
        event.currentTarget.classList.add("active");
        var status = [];
        switch (event.currentTarget.id) {
            case "inbox": status = [0, 1, 2];
                break;
            case "saved": status = [2];
                break;
            case "sent": status = [5];
                break;
            case "trash": status = [3];
                break;
            default: status = [0, 1, 2];
                break;
        }
        this.props.handleTabChange(status, true);
    }

    render() {
        const { classes } = this.props;
        return (
            <Navbar light expand="lg" className="NotificationNavbar">
                <NavbarToggler onClick={this.toggle} />
                <Collapse id="navbarCollapse3" isOpen={this.state.isOpen} navbar>
                    <List component="ul" className="NotificationNavBar">
                        <ListItem button aria-label="Click Here to inbox" component="li" className="active" id="inbox" onClick={this.activeTabonClick}>
                            <ListItemIcon className="lisitem">
                                <i className="material-icons">inbox</i>
                            </ListItemIcon>
                            <ListItemText primary="Inbox" />
                            {this.state.totalInboxUnreadCount > 0 && <MDBBadge color="danger" className="ml-2">{this.state.totalInboxUnreadCount}</MDBBadge>}
                        </ListItem>
                        <ListItem button aria-label="Click Here to save" component="li" id="saved" onClick={this.activeTabonClick}>
                            <ListItemIcon className="lisitem">
                                <i class="material-icons">star</i>
                            </ListItemIcon>
                            <ListItemText primary="Saved" />
                        </ListItem>
                        <ListItem button aria-label="Click Here to send" component="li" id="sent" onClick={this.activeTabonClick}>
                            <ListItemIcon className="lisitem">
                                <i class="material-icons">send</i>
                            </ListItemIcon>
                            <ListItemText primary="Sent" />
                        </ListItem>
                        <ListItem button aria-label="Click Here to delete" component="li" id="trash" onClick={this.activeTabonClick}>
                            <ListItemIcon className="lisitem">
                                <i class="material-icons">delete_outline</i>
                            </ListItemIcon>
                            <ListItemText primary="Trash" />
                        </ListItem>
                    </List>
                </Collapse>
            </Navbar>
        );
    }
}

SideBar.propTypes = {
    classes: PropTypes.object.isRequired,
};

class Notifications1 extends React.Component {
    constructor(props) {

        super(props);
        this.state = {
            currentSelectedTab: [0, 1, 2],
            isTabChanged: false,
            data: {
                isChange: false,
                data: {}
            }
        }
        this.handleDataChange = this.handleDataChange.bind(this);
    }


    handleDataChange(data) {
        this.state.data.isChange = true;
        this.state.data.data = data;
        this.setState({ data: this.state.data });
        this.setState({ isTabChanged: false });
    }

    handleTabChange = (data, isChange) => {

        if (data == undefined || data == null) {
            data = [0, 1, 2];
        }
        if (isChange) {
            this.setState({ currentSelectedTab: data });
            this.setState({ isTabChanged: true });
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <section class="page-wrapper">
                <HeadingSectionArea />
                <MDBContainer className={classes.root}>
                    <Paper elevation={0} className={classes.paper}>
                        <Grid component="div" className={'profileContainer custom-notification'}>
                            <MDBRow>
                                <MDBCol lg="2">
                                    <SideBar data={this.state.data} handleTabChange={this.handleTabChange} />
                                </MDBCol>
                                <MDBCol lg="10">
                                    <NotificationRightGrid1 handleDataChange={this.handleDataChange} isTabChanged={this.state.isTabChanged} data={this.state.currentSelectedTab} />
                                </MDBCol>
                            </MDBRow>
                        </Grid>
                    </Paper>
                </MDBContainer>
            </section>
        );
    }
}

Notifications1.propTypes = {
    classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Notifications1);
