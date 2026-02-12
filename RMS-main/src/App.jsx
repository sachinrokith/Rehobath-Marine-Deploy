import { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import { AuthProvider } from './context/AuthContext';

import TopBar from "./components/TopBar";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Services from "./components/Services";
import ShipRepair from "./pages/services/ShipRepair";
import DryDocking from "./pages/services/DryDocking";
import MarineElectrical from "./pages/services/MarineElectrical";
import MarineAutomation from "./pages/services/MarineAutomation";
import HarborServices from "./pages/services/HarborServices";
import PortAgency from "./pages/services/PortAgency";
import About from "./components/About";
import Testimonials from "./components/Testimonials";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import ServicesMain from "./components/ServicesMain";
import ContactMain from "./components/ContactMain";
import OurReach from './components/OurReach';
import Enquiry from "./components/Enquiry";
import ScrollToTop from "./components/ScrollToTop";
import ProjectsGallery from "./components/ProjectsGallery";

// Admin imports
import Login from './pages/admin/Login';
import AdminLayout from './components/admin/AdminLayout';
import ProtectedRoute from './components/ProtectedRoute';
import Dashboard from './pages/admin/Dashboard';
import Projects from './pages/admin/Projects';
import SubAdmins from './pages/admin/SubAdmins';
import Settings from './pages/admin/Settings';

function App() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Admin Routes */}
          <Route path="/admin/login" element={<Login />} />
          <Route path="/admin" element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }>
            <Route path="dashboard" element={<Dashboard />} />
            <Route path="projects" element={<Projects />} />
            <Route path="subadmins" element={
              <ProtectedRoute requiredRole="admin">
                <SubAdmins />
              </ProtectedRoute>
            } />
            <Route path="settings" element={<Settings />} />
          </Route>
          
          {/* Public Routes */}
          <Route path="/*" element={
            <>
              <TopBar />
              <header className={`sticky top-0 z-50 transition-shadow ${isScrolled ? 'shadow-md' : ''}`}>
                <Navbar />
              </header>
              
              <main className="grow">
                <ScrollToTop>
                  <Routes>
                    <Route index element={
                      <>
                        <Hero />
                        <Services />
                        <About />
                        <Testimonials />
                        <Contact />
                      </>
                    } />
                    <Route path="services" element={<Services />} />
                    <Route path="services/ship-repair" element={<ShipRepair />} />
                    <Route path="services/dry-docking" element={<DryDocking />} />
                    <Route path="services/marine-electrical" element={<MarineElectrical />} />
                    <Route path="services/marine-automation" element={<MarineAutomation />} />
                    <Route path="services/harbor-services" element={<HarborServices />} />
                    <Route path="services/port-agency" element={<PortAgency />} />
                    <Route path="about" element={<About />} />
                    <Route path="contact" element={<Contact />} />
                    <Route path="serviceMain" element={<ServicesMain />} />
                    <Route path="contactus" element={<ContactMain />} />
                    <Route path="ourReach" element={<OurReach />} />
                    <Route path="gallery" element={<ProjectsGallery />} />
                    <Route path="enquiry" element={<Enquiry />} />
                  </Routes>
                </ScrollToTop>
              </main>
              
              <Footer />
            </>
          } />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
