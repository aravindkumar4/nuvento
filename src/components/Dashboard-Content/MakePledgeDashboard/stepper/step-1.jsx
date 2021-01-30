'use strict'
import React from 'react';
import AccordionList from '../AccordionList';

export default function StepOne() {
    localStorage.setItem("step2", "false");
    localStorage.setItem("ApplyToD", "");
    //
    const accountData = JSON.parse(localStorage.getItem("customerDetailsD"));

    return (
        <div className='rows'>
            <div class="stepone">
                <div className='accountarea'>
                    <div class="grouppay ">
                        <AccordionList data={accountData} />
                    </div>
                </div>
            </div>
        </div>
    );
}