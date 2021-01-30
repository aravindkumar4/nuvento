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
import NotificationRightGrid from './NotificationRightSection';
import Loader from '../../../src/shared/Views/Loader';
import ControlledExpansionPanels from '../Notifications/ExpansionPanel';
import RequestHelper from "../../common/RequestHelper";
import RequestMiddleware from "../../common/RequestMiddleware";
import { StatusCodeEnum, APIURLTypeEnum, NotificationMessageTypeEnum } from '../../core/Enum';

const styles = (theme) => ({
  root: {
    marginTop: theme.spacing.unit * 3,
  },
  paper: {
    boxShadow: ' 0 0 0 0 ',
    },
});

class HeadingSectionArea extends React.Component {
  render() {
    return (
    <Grid component="div" className="pageheading-wrapper">
        <MDBContainer>
          <MDBRow>
            <MDBCol lg="6" sm="6" xs="12">
              <Grid component="div" className="pageheading-box">
                    <Typography component="h1">Notifications</Typography>
              </Grid>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </Grid>
    );
  }
}

class MailBoxMain extends React.Component {
  //static contextType = UserContextModel;
  constructor(props) {
    super(props);

    this.toggle = this.toggle.bind(this);
    this.handleStatusOnClick = this.handleStatusOnClick.bind(this);
    this.categoryFilter = this.categoryFilter.bind(this);

    this.state = {
      isOpen: false,
      loading: true,
      activeClasStatus: 0,
      gridData: [],
    };

    this.notificationRef = React.createRef();
  }

  componentDidMount() {
    this.mailBind();
  }

  mailBind() {
    
    const self = this;
    const URL ="Notification/GetMessagesByUserId?userId=121";// Notification.GetMessagesByUserId.format(self.context.id);

    self.setState({ loading: true });
    var params = {
      searchString: "",
      status: [self.state.activeClasStatus],
      categories: [],
      index: 0,
      pageLength: 0,
      mode: 0, 
    };
    try {
    //  RequestHelper.PUT(URL, params, APITypeEnum.SWGNOTIFICATION, (res) => {
         RequestHelper.PUT1(URL,
            APIURLTypeEnum.Notification,
            params,
            (d) => {
            var res = d.data;
        if (res) {

          if (res.status && res.status.code == StatusCodeEnum.OK && res.data) {
            self.setState({ gridData: res.data, loading: false, totalUnreadCount: res.data.totalUnreadCount});
          } else {
            self.setState({ loading: false });
          }
        } else {
          self.setState({ loading: false });
        }
      });
    } catch (error) {
      console.log(error, "error");
      self.setState({ loading: false });
    }
  }

  categoryFilter(values){
    let self=this;
  const URL ="Notification/GetMessagesByUserId?userId=121";// Notification.GetMessagesByUserId.format(self.context.id);
    self.setState({ loading: true });
    let params = {
      searchString: "",
      status: [self.state.activeClasStatus],
      categories: values,
      index: 0,
      pageLength: 0,
      mode: 0,
    };
    try {
       RequestHelper.PUT1(URL,
            APIURLTypeEnum.Notification,
            params,
            (d) => {
        var res = d.data;
        if (res) {
          if (res.status && res.status.code == StatusCodeEnum.OK && res.data) {
            self.setState({ gridData: res.data, loading: false, totalUnreadCount: res.data.totalUnreadCount});
          } else {
            self.setState({ loading: false, gridData:[] });
          }
        } else {
          self.setState({ loading: false, gridData:[]  });
        }
      });
    } catch (error) {
      console.log(error, "error");
      self.setState({ loading: false, gridData:[]  });
    }
  }

  toggle() {
    this.setState({
      isOpen: !this.state.isOpen,
    });
  }

  handleStatusOnClick(value) {
    self.notificationRef;
    this.notificationRef.current.state.showReply=false;
    this.setState({ activeClasStatus: value }, () => {
      this.mailBind();
    });
  }

  render() {
    const { classes } = this.props;
    return (
      <section className="page-wrapper notificationSec">
        <HeadingSectionArea /> 
        {this.state.loading && <Loader />}
        <MDBContainer className={classes.root}>
          <Paper className={classes.paper}>
            <Grid component="div" className={""}>
              <MDBRow>
                <MDBCol lg="2">
                  <Navbar light expand="lg" className="NotificationNavbar">
                    {/* <NavbarToggler onClick={this.toggle} /> */}
                    <Collapse id="navbarCollapse3" isOpen={false} navbar>
                      <List component="ul" className="NotificationNavBar">
                        <ListItem
                          button
                          component="li"
                          value={0}
                          activeClassName={
                            this.state.activeClasStatus == 0 ? "active" : ""
                          }
                          onClick={() => this.handleStatusOnClick(0)}
                        >
                          <ListItemIcon className="lisitem">
                            <i className="material-icons">inbox</i>
                          </ListItemIcon>
                          <ListItemText primary="Inbox" />
                          <MDBBadge color="danger" className="ml-2">
                            {this.state.totalUnreadCount}
                          </MDBBadge>
                        </ListItem>
                        <ListItem
                          button
                          component="li"
                          activeClassName={
                            this.state.activeClasStatus == 1 ? "active" : ""
                          }
                          onClick={() => this.handleStatusOnClick(1)}
                        >
                          <ListItemIcon className="lisitem">
                            <i className="material-icons">star</i>
                          </ListItemIcon>
                          <ListItemText primary="Saved" />
                        </ListItem>
                        <ListItem
                          button
                          component="li"
                          activeClassName={
                            this.state.activeClasStatus == 2 ? "active" : ""
                          }
                          onClick={() => this.handleStatusOnClick(2)}
                        >
                          <ListItemIcon className="lisitem">
                            <i className="material-icons">send</i>
                          </ListItemIcon>
                          <ListItemText primary="Sent" />
                        </ListItem>
                        <ListItem
                          button
                          component="li"
                          activeClassName={
                            this.state.activeClasStatus == 5 ? "active" : ""
                          }
                          onClick={() => this.handleStatusOnClick(5)}
                        >
                          <ListItemIcon className="lisitem">
                            <i className="material-icons">delete_outline</i>
                          </ListItemIcon>
                          <ListItemText primary="Trash" />
                        </ListItem>
                      </List>
                    </Collapse>
                  </Navbar>
                </MDBCol>
                <MDBCol lg="10">
                  <NotificationRightGrid ref={this.notificationRef} {...this} categoryFilter={this.categoryFilter}/>
                </MDBCol>
              </MDBRow>
            </Grid>
          </Paper>
        </MDBContainer>
      </section>
    );
  }
}

MailBoxMain.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(MailBoxMain);