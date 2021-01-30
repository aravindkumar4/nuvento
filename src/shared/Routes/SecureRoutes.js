import { PrivateRoute } from '../../auth/_components/index';
import React, { Suspense } from 'react';
import { Route, Switch } from "react-router-dom";
import { withRouter } from 'react-router-dom';

const Loader = React.lazy(() => import('../Views/Loader'));

import LoginPage from '../../views/login/loginPage';
import LoginSuccess from '../../components/Prelogin/Login/LoginSuccess';
import FaqPre from './../../components/Prelogin/Faq/faq';
import ForgotPassword from './../../components/Prelogin/forgotPassword/ForgotUserPassword';
import ForgotUserID from './../../components/Prelogin/ForgotUserID/ForgotUserID';
import ResetPassword from './../../components/Prelogin/ResetPassword/ResetUserPasswordForm';

const Faq = React.lazy(() => import('../../components/Faq'));
const Dashboard = React.lazy(() => import('../../components/Dashboard'));
const Demo = React.lazy(() => import('../../components/AccountService/Profile/myprofile'));
const ManageUsersPage = React.lazy(() => import('../../components/AccountService/ManageUsers/manageusers'));
const MailBox = React.lazy(() => import('../../components/Notifications/Notifications1'));
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

const Login = React.lazy(() => import('../../components/Prelogin/Login/Login'));

const Register = React.lazy(() => import('../../components/Prelogin/Register/Register'));
const RegisterSuccess = React.lazy(() => import('../../components/Prelogin/Register/RegisterSuccess'));
const RequestforStartServiceQuote = React.lazy(() => import('../../components/AccountService/RequestforStartServiceQuote/RequestforStartServiceQuote'));
const ThankyouSuccess = React.lazy(() => import('../../components/AccountService/RequestforStartServiceQuote/ThankYouSucess'));


const SecureRoutes = () => <React.Fragment>
    <PrivateRoute path="/Dashboard" component={Dashboard} />
    <PrivateRoute path='/Pledges' component={Pledges} />

    <PrivateRoute path='/myprofile' component={Demo} />
    <PrivateRoute path='/manageusers' component={ManageUsersPage} />
    <PrivateRoute path='/RequestforStartServiceQuote' component={RequestforStartServiceQuote} />

    <PrivateRoute path="/Faq" component={Faq} />

    <PrivateRoute path='/Notifications' component={MailBox} />

</React.Fragment>

export default SecureRoutes;