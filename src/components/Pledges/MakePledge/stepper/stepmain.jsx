import React from 'react'
import StepOne from './step-1'
import StepTwo from './step-2'
import StepThree from './step-3'

const steps =
    [
        { name: 'Step 1: Find Account', component: <StepOne /> },
        { name: 'Step 2: Pledge Amount', component: <StepTwo /> },
        { name: 'Step 3: Review and Confirm', component: <StepThree /> }
    ]

export { steps }