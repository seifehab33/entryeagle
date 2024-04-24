import React from 'react';
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
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
import { UserProvider } from './UserContext';

function App() {



  return (
    <div className='App flex flex-col min-h-screen '>
      <UserProvider>
      <Router>
        {<NavbarDefault />}
        <main className='flex-grow '>
        <Routes>
          <Route exact path="/" element={<Welcome />} />
          <Route exact path="/AdminPage" element={<Home />} />
          <Route exact path="/AboutUs" element={<AboutUs />} />

          <Route exact path="/UserPage" element={<UserHome />} />
          <Route exact path="/Dashboard" element={<Dashboard />} />
          <Route exact path="/UserSign" element={<Signin />} />
          <Route exact path="/AdminSign" element={<AdminSign />} />
          <Route exact path="/SignUp" element={<SignUp />}/>
          <Route exact path="/FormSignUp" element={<FormSignUp/>}/>
          <Route exact path="/Relatives'List" element={<RelativesList/>}/>
          <Route exact path="/Relatives'List/user/:id" element={<UserDetails/>}/>
          <Route exact path="/Person'sList" element={<PersonList/>}/>
          <Route path="/ProfileDetails/:ComId/:id" element={<ProfileDetails/>}/>
          <Route path="/ProfileDetails/:id/History" element={<HistoryPerson />} />
          <Route path="/CommunityList" element={<CommunityList/>}/>
          <Route path='/PrivacyPolicy' element={<PrivacyPolicy/>}/>
          <Route path='/ContactUs' element={<ContactUs/>}/>
          <Route path="/Relatives/:id" element={<RelativesListCommunity/>}/>

        </Routes>
        </main>
        <Footer/>
      </Router>
      </UserProvider>
    </div>
  );
}

export default App;
