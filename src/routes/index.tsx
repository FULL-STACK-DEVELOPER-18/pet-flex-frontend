import { FC } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { routeConstant } from '../constants/routes';
import { AuthorizedLayout } from '../components/authorized-layout';
import { UnAuthorizedLayout } from '../components/unAuthorized-layout';
import { PageNotFound } from '../components/page-not-found';
import { Profile } from '../pages/profile';
import { ClientPets } from '../pages/clients-pets';
import { CalendarEvents } from '../pages/calendar';
import { Programs } from '../pages/programs';
import { Inbox } from '../pages/inbox';
import { CommunityBlog } from '../pages/community-blog';
import { Payments } from '../pages/payment';
import { ReferralPrograms } from '../pages/referral-programs';
import { Teammates } from '../pages/teammates';
import { Billing } from '../pages/billing';
import { Login } from '../pages/auth/login.auth';
import { Signup } from '../pages/auth/signup.auth';
import { ForgotPassword } from '../pages/auth/forgot-password.auth';
import { ResetPassword } from '../pages/auth/reset-password.auth';
import { ChangePassword } from '../pages/change-password';

export const MainRoutes: FC = () => {
  return (
    <BrowserRouter>
      <Routes>
         <Route path={routeConstant.app.initialHome.path} element={<AuthorizedLayout />}>
           <Route path={routeConstant.app.clientPets.path} element={<ClientPets />} />
           <Route path={routeConstant.app.calendar.path} element={<CalendarEvents />} />
           <Route path={routeConstant.app.programs.path} element={<Programs />} />
           <Route path={routeConstant.app.inbox.path} element={<Inbox />} />
           <Route path={routeConstant.app.blogs.path} element={<CommunityBlog />} />
           <Route path={routeConstant.app.payment.path} element={<Payments />} />
           <Route path={routeConstant.app.referral.path} element={<ReferralPrograms />} />
           <Route path={routeConstant.app.teammates.path} element={<Teammates />} />
           <Route path={routeConstant.app.profile.path} element={<Profile />} />
           <Route path={routeConstant.app.billing.path} element={<Billing />} />
         </Route>
         <Route path={routeConstant.app.initialHome.path} element={<UnAuthorizedLayout />}>
           <Route path={routeConstant.app.login.path} element={<Login />} />
           <Route path={routeConstant.app.signup.path} element={<Signup />} />
           <Route path={routeConstant.app.forgot.path} element={<ForgotPassword />} />
           <Route path={routeConstant.app.reset_password.path} element={<ResetPassword />} />
           <Route path={routeConstant.app.changePassword.path} element={<ChangePassword />} />
         </Route>
         <Route path={routeConstant.pageNotFound.path} element={<PageNotFound />}/>
      </Routes>
    </BrowserRouter>
  );
};
