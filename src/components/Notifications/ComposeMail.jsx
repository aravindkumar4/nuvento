import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Editor from './Editor';

const styles = theme => ({
  GridLeft: { display: 'flex', justifyContent: 'flex-start' },
  GridRight: { display: 'flex', justifyContent: 'flex-end' },
  button: {
    display: 'inline-flex'
  },
  MailuserInfoIcons: { display: 'inline-flex', alignItems: 'center', margin: '0px 5px' },
  HeadSubjectName: {
    fontSize: 18,
    color: '#555555',
  },
  ReplySubject: {
    padding: '0px 10px',
    textAlign: 'left',
  }
});

class StarButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isCardView: false,
    }
  }
  render() {
    return (
      <IconButton aria-label="Favourite" onClick={() => this.setState({ isCardView: !this.state.isCardView })}>
        {this.state.isCardView
          ? <i class="material-icons StarIconButtonfilled">star</i>
          : <i class="material-icons StarIconButtonbordered">star_border</i>
        }
      </IconButton>

    );
  }
}

class MailBody extends React.Component {
  render() {
    return (
      <div className="MailBodyContent">
        <Typography> Dear Joe, </Typography>
        <Typography>on 03/03/2019, you reached xx.xx kWh of your daily consumption limit of xx.xx.</Typography>

        <Typography>If you need further assistance please reply back or call us on 8003451570</Typography>
        <Typography>Best, </Typography>
        <br />
        <Typography>Customer Support Team</Typography>
      </div>
    );
  }
}

class ComposeMailContent extends React.Component {
  constructor() {
    super();
    this.state = {
      showReply: false
    }
  }

  onClick = event => {
    event.preventDefault();
    this.setState({ showReply: !this.state.showReply })
  }

  render() {
    const { classes } = this.props;

    return (
      <div className='ComposeMailWrapper notification-reply-section'>
        <div class="profileContainer">
          <div class="ViewSection">
            <div className="MailUserInfo">
              <Grid item xs={12} lg={6} sm={6} className={classes.GridLeft}>
                <Typography className="CategoryIcons">
                  <i class="material-icons">assessment</i>
                </Typography>
                <Typography className={classes.ReplySubject}>
                  <Typography component="h3" className={classes.HeadSubjectName}>High Usage Alert</Typography>
                  <Typography>to me</Typography>
                </Typography>
              </Grid>
              <Grid item xs={12} lg={6} sm={6} className={classes.GridRight}>
                <div className={classes.MailuserInfoIcons}>
                  <Button aria-label="click here to reply" variant="outlined" color="secondary" className={classes.button} onClick={this.onClick.bind(this)}>Reply</Button>
                </div>
                <div className={classes.MailuserInfoIcons}>
                  <StarButton />
                  <IconButton aria-label="Settings" onClick={() => { console.log("123") }}>
                    <i class="material-icons">delete_outline</i>
                  </IconButton>
                </div>
              </Grid>
            </div>
            <MailBody />
          </div>
        </div>
        <div class="profileContainer">

          {this.state.showReply && (
            <div className="EditSection">
              <div className="MailUserInfo">
                <Grid item lg={6} sm={6} xs={12} className={classes.GridLeft}>
                  <Typography className="ReplyPartIcons">
                    <i class="material-icons">reply</i>
                  </Typography>
                  <Typography className={classes.ReplySubject}>
                    <Typography component="h3" className={classes.HeadSubjectName}>High Usage Alert</Typography>
                  </Typography>
                </Grid>
              </div>
              <Editor />
            </div>
          )}


        </div>
      </div>
    );
  }
}

ComposeMailContent.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(ComposeMailContent);
