import React from "react";
import { MDBRow, MDBCol,MDBContainer } from "mdbreact";
import './term-page.scss';
import { StatusCodeEnum } from "../../core/Enum";
import RequestHelper from "../../common/RequestHelper";
import ReactHtmlParser from 'react-html-parser';
import Loader from "../../shared/Views/Loader";
function Term(){
    const [termsConditions, setTermsConditions] = React.useState();
    const [loading, setLoading] = React.useState(true);
    React.useEffect(() => {
        setLoading(true);
        const url = "https://u-swg.smartcmobile.net/Configuration-API/api/1/Configuration/GetTermsConditions?Mode=0&Utilityid=0";
        RequestHelper.GET1(url, (res) => {
            if (res && res.status == StatusCodeEnum.OK) {
                if (res.data) {
                    if (res.data.data) {
                        setTermsConditions(Object.values(res.data.data)[0].termsConditions);
                    } else {
                    }
                    setLoading(false);
                } else {
                    setTermsConditions(Object.values(res.data.data)[0].termsConditions);
                    setLoading(false);
                }
            } else {
            }
        }
        );
    }, []);
    return(
        <section>
            <MDBContainer>
                <MDBRow className="text-left term-page">
                    <MDBCol size="12">
                    {ReactHtmlParser(termsConditions)}
                    </MDBCol>
                </MDBRow>
            </MDBContainer>
            {loading && (
                <Loader />
            )}
        </section>
    )
}
export default Term;