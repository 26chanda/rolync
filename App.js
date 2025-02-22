import React, { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import TagManager from 'react-gtm-module';

// Lazy load all components
const Login = lazy(() => import('./components/Login.jsx'));
const SignUp = lazy(() => import('./components/SignUp.jsx'));
const AcademicInfo = lazy(() => import('./components/AcademicInfo.jsx'));
const CareerInterests = lazy(() => import('./components/CareerInterests.jsx'));
const PreviousExperience = lazy(() => import('./components/PreviousExperience.jsx'));
const AdditionalInformation = lazy(() => import('./components/AdditionalInformation.jsx'));
const HomePage = lazy(() => import('./components/homepage.jsx'));
const ContactUs = lazy(() => import('./components/ContactUs.jsx'));
const Faq = lazy(() => import('./components/Faq.jsx'));
const ForgetPassword = lazy(() => import('./components/ForgetPassword.jsx'));
const Jobs2 = lazy(() => import('./components/Jobs2.jsx'));
const DataScientist = lazy(() => import('./components/DataScientist.jsx'));
const BusinessAnalyst = lazy(() => import('./components/BusinessAnalyst.jsx'));
const PeopleWithUSViewALL = lazy(() => import('./components/PeopleWithUSViewALL.jsx'));
const TermsAndCondition = lazy(() => import('./components/TermsAndCondition.jsx'));
const Cookies = lazy(() => import('./components/Cookies.jsx'));
const AccountSetting = lazy(() => import('./components/AccountSetting.jsx'));
const TwoFactorPage = lazy(() => import('./components/TwoFactorPage.jsx'));
const ChangePassword = lazy(() => import('./components/ChangePassword.jsx'));
const ProfileOne = lazy(() => import('./components/ProfileOne.jsx'));
const SpecializedRoles = lazy(() => import('./components/SpecializedRoles.jsx'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy.jsx'));
const CompaniesTheyWorkAtViewAll = lazy(() => import('./components/CompaniesTheyWorkAtViewAll.jsx'));
const Career = lazy(() => import('./components/Career.jsx'));
const FindJobs = lazy(() => import('./components/findJobs.jsx'));
const QuestionnairePage = lazy(() => import('./components/questionnaire.jsx'));
const RolesNewPage = lazy(() => import('./components/RolesNewPage.jsx'));
const Blogs = lazy(() => import('./components/Blogs.jsx'));
const AboutUs = lazy(() => import('./components/AboutUs.jsx'));
const HelpCenter = lazy(() => import('./components/HelpCenter.jsx'));
const EmployeeProfiles = lazy(() => import('./components/EmployeeProfiles.jsx'));
const DataAnalyst = lazy(() => import('./components/DataAnalyst.jsx'));
const DataEngineer = lazy(() => import('./components/DataEngineer.jsx'));
const ResetPassword = lazy(() => import('./components/ResetPassword.jsx'));
const MatchingProfile = lazy(() => import('./components/matchingProfile.jsx'));


function App() {
  useEffect(() => {
    const tagManagerArgs = {
      gtmId: 'G-LF7M080NQ0',  // Replace with your GTM ID
    };
    TagManager.initialize(tagManagerArgs);
  }, []);
  return (
    <Router>
      {/* <PageTracker /> */}
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/academic-info" element={<AcademicInfo />} />
          <Route path="/career-interests" element={<CareerInterests />} />
          <Route path="/previous-experience" element={<PreviousExperience />} />
          <Route path="/additional-info" element={<AdditionalInformation />} />
          <Route path="/login" element={<Login />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/profile-one" element={<ProfileOne />} />
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/help-center" element={<HelpCenter />} />
          <Route path="/contact-us" element={<ContactUs />} />
          <Route path="/faq" element={<Faq />} />
          <Route path="/forget-pass" element={<ForgetPassword />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />
          <Route path="/employee-profile/:id" element={<EmployeeProfiles />} />
          <Route path="/jobs2" element={<Jobs2 />} />
          <Route path="/roles" element={<RolesNewPage />} />
          <Route path="/data-analyst" element={<DataAnalyst />} />
          <Route path="/data-engineer" element={<DataEngineer />} />
          <Route path="/Data-Scientist" element={<DataScientist />} />
          <Route path="/Business-Analyst" element={<BusinessAnalyst />} />
          <Route path="/specialized-roles" element={<SpecializedRoles />} />
          <Route path="/view-all" element={<PeopleWithUSViewALL />} />
          <Route path="/company-view" element={<CompaniesTheyWorkAtViewAll />} />
          <Route path="/Career" element={<Career />} />
          <Route path="/terms" element={<TermsAndCondition />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/cookies" element={<Cookies />} />
          <Route path="/accountSet" element={<AccountSetting />} />
          <Route path="/two-factor-auth" element={<TwoFactorPage />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/change-password" element={<ChangePassword />} />
          <Route path="/find-jobs" element={<FindJobs />} />
          <Route path="/questionnaire-page" element={<QuestionnairePage />} />
          <Route path="/matching-findYourDream" element={<MatchingProfile />} />
        </Routes>
      </Suspense>
    </Router>
  );
}



export default App;
