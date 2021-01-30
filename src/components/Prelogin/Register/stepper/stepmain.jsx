import React from 'react'
import StepOne from './step-1'
import StepTwo from './step-2'
import StepThree from './step-3'

const steps = 
    [
      {name: 'Step 1:  Enter Company Information', component: <StepOne/>},
      {name: 'Step 2: Enter Contact Information', component: <StepTwo/>},
      {name: 'Step 3: Review & Confirm', component: <StepThree/>},
    ]

export { steps }