
import React from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Home from './Home/Home';
import Dashboard from './Dashboard/Dashboard';
import Welcome from './Welcome/Welcome';
import { NavbarDefault } from './Navbar/Navbar';
import Signin from './SignIn/Signin';
import AdminSign from './SignIn/AdminSign';
import UserHome from './Home/UserHome';
import RelativesList from './UserPages/RelativesList';
import UserDetails from './UserPages/UserDetails';
import SignUp from './SignIn/SignUp/SignUp';
import FormSignUp from './FormSignUp/FormSignUp';
import PersonList from './Person\'sList/PersonList';
import ProfileDetails from './Person\'sList/ProfileDetails';
import HistoryPerson from './Person\'sList/HistoryPerson';
import CommunityList from './CommunityList/CommunityList';
import Footer from './Footer/Footer';
import AboutUs from './Home/AboutUs/AboutUs';
import PrivacyPolicy from './Home/PrivacyPolicy/PrivacyPolicy';
import ContactUs from './Home/ContactUs/ContactUs';
import RelativesListCommunity from './CommunityList/Relative\'sListCommunity';
import { UserProvider, useUser } from './UserContext'; 

const App = () => {

  return (
    <div className='App flex flex-col min-h-screen'>
      
      <Router>
        <UserProvider>
        <NavbarDefault />
        <main className='flex-grow '>
          <Routes>
            <Route path="/" element={<Welcome />} />
            <Route path="/AdminPage" element={<PrivateRoute component={Home} />} />
            <Route path="/AboutUs" element={<PrivateRoute component={AboutUs} />} />
            <Route path="/UserPage" element={<PrivateRoute component={UserHome} />} />
            <Route path="/Dashboard" element={<PrivateRoute component={Dashboard} />} />
            <Route path="/UserSign" element={<Signin />} />
            <Route path="/AdminSign" element={<AdminSign />} />
            <Route path="/SignUp" element={<SignUp />} />
            <Route path="/FormSignUp" element={<PrivateRoute component={FormSignUp} />} />
            <Route path="/Relatives'List" element={<PrivateRoute component={RelativesList} />} />
            <Route path="/Relatives'List/user/:id" element={<PrivateRoute component={UserDetails} />} />
            <Route path="/Person'sList" element={<PrivateRoute component={PersonList} />} />
            <Route path="/ProfileDetails/:ComId/:id" element={<PrivateRoute component={ProfileDetails} />} />
            <Route path="/ProfileDetails/:id/History" element={<PrivateRoute component={HistoryPerson} />} />
            <Route path="/CommunityList" element={<PrivateRoute component={CommunityList} />} />
            <Route path='/PrivacyPolicy' element={<PrivateRoute component={PrivacyPolicy} />} />
            <Route path='/ContactUs' element={<PrivateRoute component={ContactUs} />} />
            <Route path="/Relatives/:id" element={<PrivateRoute component={RelativesListCommunity} />} />
            <Route path="/ProfileDetails/:id" element={<PrivateRoute component={ProfileDetails} />} />
          </Routes>
        </main>
        <Footer />
        </UserProvider>
      </Router>
    </div>
  )
}

const PrivateRoute = ({ component: Component }) => {
  const { isLoggedIn } = useUser();

  return isLoggedIn ? <Component /> : <Navigate to="/UserSign" />;
};

export default App;
