import React from 'react';

import MultiStep from './Multi';
import { steps } from './stepper/stepmain';

class Stepper extends React.Component {
    render() {
        return (
          <div className="containerWrapper">
              <MultiStep steps={steps}/>
          </div>
        )
              }
}

export default Stepper;
