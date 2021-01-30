import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import PaymentHistoryTable from './paymenthistory_table';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

function HeadingSectionArea() {
	return (
		<Grid component="div" className="pageheading-wrapper">
			<MDBContainer>
				<MDBRow>
					<MDBCol lg="6" sm="6" xs="12">
						<Grid component="div" className="pageheading-box">
							<Typography component="h1">Payment History</Typography>
						</Grid>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		</Grid>
	);
}

export default function Autopay() {
	return (
		<section class="page-wrapper">
			<HeadingSectionArea />
			<MDBContainer>
				<MDBRow>
					<MDBCol size="12">
						<div className={'paymenthistorywrapper responsiveTbl'}>
							<PaymentHistoryTable />
						</div>
					</MDBCol>
				</MDBRow>
			</MDBContainer>
		</section>
	);
}