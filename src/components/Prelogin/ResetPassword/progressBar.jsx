import React from 'react';
import { lighten, makeStyles, withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import LinearProgress from '@material-ui/core/LinearProgress';


const BorderLinearProgress = withStyles({
  root: {
    height: 8,
    backgroundColor: lighten('#ccc', 0.5),
    borderRadius: 40,
    marginTop:'30px'
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

export default function CustomizedProgressBars() {
  const classes = useStyles();
  const progressBar = classes.root + ' resetProgressBar';
  return (
    <div className={progressBar}>
   
     
      <BorderLinearProgress
        variant="determinate"
        color="secondary"
        value={50}
      />

      <small className="w-100 text-left d-block mt-2">Password strength: Good</small>
      <h3 className="mustPassword">Your password must have:</h3>
      <ul className="resetPasswordNeed">
          <li> <i class="material-icons">done</i> <span> Minimum 8 Characters (Maximum 32) </span> </li>
          <li><i class="material-icons ">done</i> <span> 1 lowercase letter </span> </li>
          <li><i class="material-icons ">done</i> <span> At least 1 uppercase letter </span> </li>
          <li><i class="material-icons ">done</i> <span> At least 1 number OR special character </span></li>
      </ul>
    
    </div>
  );
}