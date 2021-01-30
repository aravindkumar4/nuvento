import React from 'react';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import ProfilePageMain from './myprofile-mainwrapper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

function HeadingSectionArea() {
	return (
		<Grid component="div" className="pageheading-wrapper">
			<MDBContainer>
				<MDBRow>
					<MDBCol lg="6" sm="6" xs="12">
						<Grid component="div" className="pageheading-box">
							<Typography component="h1">My Profile</Typography>
						</Grid>
					</MDBCol>
					
				</MDBRow>
			</MDBContainer>
		</Grid>
	);
}

export default function ProfilePage() {
	return (
		<React.Suspense fallback="">
		<section class="page-wrapper myProfileSec">
			<HeadingSectionArea />
			<MDBContainer>
				<MDBRow>
					<MDBCol size="12">
						<ProfilePageMain />
					</MDBCol>
				</MDBRow>
			</MDBContainer>
			</section>
		</React.Suspense>
	);
}