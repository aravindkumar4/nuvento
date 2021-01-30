import React from 'react';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { MDBContainer, MDBRow, MDBCol } from 'mdbreact';
import DashboardBlock1 from './Dashboard-Content/DashboardBlock1';
import DashboardBlock2 from './Dashboard-Content/DashboardBlock2';
import UserContextModel from '../store/UserContextModel';
import GreetingBox from '../shared/Views/GreetingBox';
import Loader from "../shared/Views/Loader";
import HeaderSwitch from '../HeaderSwitch';

export default function Dashboard() {
	const agencyData = JSON.parse(localStorage.getItem("UData"));

	return (
		<React.Suspense fallback={<Loader />}>
			<section class="dashboard-wrapper">
				<section className="Dashheader">
					<MDBContainer>
						<MDBRow>
							<UserContextModel.Consumer>
								{(user) => {
									console.log(user)
									return <GreetingBox name={agencyData.firstName + ' '  } />
								}}
							</UserContextModel.Consumer>
							<MDBCol lg="6" sm="6" xs="12">
								<ul class="right-top-select">
								</ul>
							</MDBCol>
						</MDBRow>
					</MDBContainer>
				</section>
				<MDBContainer>
						<DashboardBlock1 />
						{/* <DashboardBlock2 /> */}
				</MDBContainer>
			</section>
		</React.Suspense>
	);
}
