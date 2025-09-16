import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DoctorSignup from './pages/DoctorSignup';
import PatientSignup from './pages/PatientSignup';
import SearchResults from './pages/SearchResults';
import ContactUs from './pages/ContactUs';
import Services from './pages/Services';
import Searchpage from './pages/Searchpage';
import DoctorDashboard from './pages/DoctorDashboard';
import AppointmentHistory from './pages/AppointmentHistory';
import BookAppointment from './pages/BookAppointment';
import UpdateProfile from './pages/UpdateProfile';
import DeleteAccount from './pages/DeleteAccount';
import PatientDashboard from './pages/PatientDashboard';
import DoctorSchedule from './pages/DoctorSchedule';
import DoctorAppointments from './pages/DoctorAppointments';
import DoctorPatients from './pages/DoctorPatients';
import DoctorAvailability from './pages/DoctorAvailability';
import DoctorProfile from './pages/DoctorProfile';
import DoctorsManagement from './pages/DoctorsManagement';
import PatientsManagement from './pages/PatientsManagement';
import AdminDashboard from './pages/AdminDashboard';
import DeleteDoctoraccont from './pages/DoctorDeleteAccount';



const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/signup/doctor" element={<DoctorSignup />} />
      <Route path="/signup/patient" element={<PatientSignup />} />
      <Route path="/dashboard/doctor" element={<DoctorDashboard />} />

      <Route path="/dashboard/patient" element={<PatientDashboard />} />
      <Route path="/dashboard/patient/book" element={<BookAppointment />} />
      <Route path="/dashboard/patient/appointments" element={<AppointmentHistory />} />
      <Route path="/dashboard/patient/profile" element={<UpdateProfile />} />
      <Route path="/dashboard/patient/delete" element={<DeleteAccount />} />

      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/doctors" element={<DoctorsManagement />} />
      <Route path="/admin/patients" element={<PatientsManagement />} />

      <Route path="/dashboard/doctor/schedule" element={<DoctorSchedule />} />
      <Route path="/dashboard/doctor/appointments" element={<DoctorAppointments />} />
      <Route path="/dashboard/doctor/patients" element={<DoctorPatients />} />
      <Route path="/dashboard/doctor/availability" element={<DoctorAvailability />} />
      <Route path="/dashboard/doctor/profile" element={<DoctorProfile />} />
      <Route path="/dashboard/doctor/delete" element={<DeleteDoctoraccont/>} /> 

      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/doctors" element={<DoctorsManagement />} />
      <Route path="/admin/patients" element={<PatientsManagement />} />


      <Route path="/results" element={<SearchResults />} />
      <Route path="/ContactUs" element={<ContactUs />} />
      <Route path="/Services" element={<Services />} />
      <Route path="/Searchpage" element={<Searchpage />} />
    </Routes>
  </Router>
);

export default App;
