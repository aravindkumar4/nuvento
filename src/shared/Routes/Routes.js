import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router-dom';

import SecureRoutes from './SecureRoutes';
const Loader = React.lazy(() => import('../Views/Loader'));

import LoginPage from '../../views/login/loginPage';
import LoginSuccess from '../../components/Prelogin/Login/LoginSuccess';
const FaqPre = React.lazy(() => import('../../components/Faq'));
import ForgotPassword from './../../components/Prelogin/forgotPassword/ForgotUserPassword';
import ForgotUserID from './../../components/Prelogin/ForgotUserID/ForgotUserID';
import ResetPassword from './../../components/Prelogin/ResetPassword/ResetUserPasswordForm';
import { ForgotUserIDSuccess } from './../../components/Prelogin/ForgotUserID/ForgotUserIDSuccess';
import TwoFactorComponent from './../../components/Prelogin/twofactor/twoFactorAuth';
const Faq = React.lazy(() => import('../../components/Faq'));
const Dashboard = React.lazy(() => import('../../components/Dashboard'));
const Demo = React.lazy(() => import('../../components/AccountService/Profile/myprofile'));
const ManageUsersPage = React.lazy(() => import('../../components/AccountService/ManageUsers/manageusers'));
const MailBox = React.lazy(() => import('../../components/Notifications/Notifications'));
const Pledges = React.lazy(() => import('../../components/Pledges/Pledges'));
const MakePledge = React.lazy(() => import('../../components/Pledges/MakePledge/MakePledge'));
const MakePledgeSuccess = React.lazy(() => import('../../components/Pledges/MakePledge/MakePledgeSuccess'));
const PayPledge = React.lazy(() => import('../../components/Pledges/PayPledge/PayPledge'));
const EditPledge = React.lazy(() => import('../../components/Pledges/EditPledge/EditPledge'));
const PayPledgeSuccess = React.lazy(() => import('../../components/Pledges/PayPledge/PayPledgeSuccess'));
const EditPledgeSucess = React.lazy(() => import('../../components/Pledges/EditPledge/EditPledgeSucess'));
const PaymentHistory = React.lazy(() => import('../../components/PaymentHistory/PaymentHistory'));
const MakePledgeDashboard = React.lazy(() => import('../../components/Dashboard-Content/MakePledgeDashboard/MakePledgeDashboard'));
const MakePledgeDashboardSuccess = React.lazy(() => import('../../components/Dashboard-Content/MakePledgeDashboard/MakePledgeDashboardSuccess'));
const CustomerStatusDetails = React.lazy(() => import('../../components/Dashboard-Content/MakePledgeDashboard/CustomerStatusDetails'));
const Term = React.lazy(() => import('../../components/termPage/Term'));


const Login = React.lazy(() => import('../../components/Prelogin/Login/Login'));
const ResetUserNamePassword = React.lazy(() => import('../../components/Prelogin/ResetUserNamePassword/ResetUserNamePassword'));
import { DefaultRoute } from '../../auth/_components/index';

const Register = React.lazy(() => import('../../components/Prelogin/Register/Register'));
const RegisterSuccess = React.lazy(() => import('../../components/Prelogin/Register/RegisterSuccess'));
const RequestforStartServiceQuote = React.lazy(() => import('../../components/AccountService/RequestforStartServiceQuote/RequestforStartServiceQuote'));
const ThankyouSuccess = React.lazy(() => import('../../components/AccountService/RequestforStartServiceQuote/ThankYouSucess'));

import { ForgotSuccess } from './../../components/Prelogin/forgotPassword/ForgotSuccess';
import ResetPasswordFormSuccess from './../../components/Prelogin/ResetPassword/ResetPasswordFormSuccess';

class Routes extends React.Component {
    constructor(props) {
        super(props);

    }
    render() {
        //console.log(this.props, 'console.log(this.props)')
        return (
            <Suspense fallback={<Loader />}>
                <Switch>
                    <DefaultRoute exact path="/" component={LoginPage} />
                    <DefaultRoute path="/LoginPage" component={LoginPage} />
                    <Route path="/loginAdmin" component={LoginPage} />
                    <Route exact path="/PreFaq" component={FaqPre} />
                    <Route exact path="/Term" component={Term} />
                    <Route exact path='/authentication' component={TwoFactorComponent} />
                    <Route path="/LoginPage/:key" component={LoginPage} />
                    <Route exact path="/ForgotPassword" component={ForgotPassword} />
                    <Route exact path="/ForgotUserID" component={ForgotUserID} />
                    <Route exact path="/ResetPasswordForm" component={ResetPassword} />
                    <Route path='/MakePledge' component={MakePledge} />
                    <Route path='/MakePledgeSuccess' component={MakePledgeSuccess} />
                    <Route path='/PayPledge' component={PayPledge} />
                    <Route path='/editPledge' component={EditPledge} />
                    <Route path='/PayPledgeSuccess' component={PayPledgeSuccess} />
                    <Route path='/editPledgeSuccess' component={EditPledgeSucess} />
                    <Route path='/PaymentHistory' component={PaymentHistory} />
                    <Route path='/MakePledgeDashboard' component={MakePledgeDashboard} />
                    <Route path='/MakePledgeDashboardSuccess' component={MakePledgeDashboardSuccess} />
                    <Route path='/Register' component={Register} />
                    <Route path='/RegisterSuccess' component={RegisterSuccess} />
                    <Route path='/Login' component={Login} />
                    <Route path='/ResetUserNamePassword' component={ResetUserNamePassword} />
                    <Route path='/LoginSuccess' component={LoginSuccess} />
                    <Route path='/CustomerStatusDetails' component={CustomerStatusDetails} />
         
                    <Route path='/ThankyouSuccess' component={ThankyouSuccess} />
                    <Route path='/Login/:activationKey' component={Login} />
                    <Route path='/LoginSuccess/:isSuccess' component={LoginSuccess} />
                   
                    <Route path="/ForgotUserIDSuccess" component={ForgotUserIDSuccess} />
                    <Route path="/ForgotSuccess" component={ForgotSuccess} />
                    <Route path="/ResetPasswordFormSuccess" component={ResetPasswordFormSuccess} />

                    {/*For post login routes with Headers, add in the below component*/}
                    <SecureRoutes />
                </Switch>
            </Suspense>
        );
    }
}


export default withRouter(Routes)