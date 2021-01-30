import React from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';


const BorderLinearProgress = withStyles({
  root: {
    height: 8,
    backgroundColor: lighten('#ccc', 0.5),
    borderRadius: 40,
  },
  bar: {
    borderRadius: 40,
    backgroundColor: '#0096C4',
  },
})(LinearProgress);

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
  },
}));

export default function PasswordStrength() {
  const classes = useStyles();
  const progressBar = classes.root + ' resetProgressBar';
  return (
    <div className={progressBar}>
   
     
      <BorderLinearProgress
        variant="determinate"
        color="secondary"
        value={50}
      />

      <small>Password strength: Good</small>
      {/* <h3 className="mustPassword">Your password must have:</h3> */}
      <ul className="resetPasswordNeed">
          <li> <i class="material-icons">done</i> <span> Minimum 8 Characters (32 Maximum) </span> </li>
          <li><i class="material-icons ">done</i> <span> 1 lowercase letter </span> </li>
          <li><i class="material-icons ">done</i> <span> At least 1 uppercase letter </span> </li>
          <li><i class="material-icons ">clear</i> <span> At least 1 number OR special character </span></li>
          <li><i class="material-icons ">done</i> <span> Minium 6 characters (80 maximum) </span></li>
          <li><i class="material-icons ">done</i> <span> No spaces </span></li>
      </ul>
    
    </div>
  );
}