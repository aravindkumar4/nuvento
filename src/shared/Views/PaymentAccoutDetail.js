import React from 'react';

const PaymentAccountDetail = (props) => {
    const {address, accountNumber, schedulDate} = props;
    return <div className="WrapperCard">
        <div className="LeftSection">Address</div>
        <div className="RightSection">
           {address}
                  </div>
        <div className="LeftSection">Account</div>
        <div className="RightSection">{accountNumber}</div>
        <div className="LeftSection">Scheduled Pay Date</div>
        <div className="RightSection">{schedulDate}</div>
    </div>
}

export default PaymentAccountDetail;