import { Facebook, Twitter, Instagram, Linkedin, Phone, Mail, MapPin, Clock, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import companyLogo from "../assets/company-logo.png";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const quickLinks = [
    { name: "Home", href: "/" },
    { name: "Services", href: "/serviceMain" },
    { name: "About Us", href: "#about" },
    { name: "Contact", href: "/contact" },
    { name: "Our Reach", href: "/ourReach" },
    { name: "Admin", href: "/admin/login" },
  ];

  const services = [
    { name: "Ship Repair", href: "/services/ship-repair" },
    { name: "Dry Docking", href: "/services/dry-docking" },
    { name: "Marine Electrical", href: "/services/marine-electrical" },
    { name: "Marine Automation", href: "/services/marine-automation" },
    { name: "Harbor Services", href: "/services/harbor-services" },
    { name: "Port Agency", href: "/services/port-agency" },
  ];

  return (
    // FULL WIDTH BACKGROUND (FIX)
    <footer className="bg-gray-900 text-gray-300">
      {/* CONTENT WRAPPER */}
      <div className="pt-12 sm:pt-14 lg:pt-16 pb-6 sm:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Main Content - Mobile: 1-2-1 layout */}
          <div className="space-y-8 sm:space-y-12 lg:space-y-0 lg:grid lg:grid-cols-4 lg:gap-12 mb-8 sm:mb-10 lg:mb-12">

            {/* Row 1: Company Info - Full width on mobile/tablet, 1 column on desktop */}
            <div className="lg:col-span-1">
              <div className="flex items-center mb-4 sm:mb-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-blue-600 rounded-full flex items-center justify-center mr-3">
                  <img
                    src={companyLogo}
                    alt="Rehoboth Marine Logo"
                    className="h-12 w-auto sm:h-13 lg:h-14 object-contain"
                  />
                </div>
                <div>
                  <h3 className="text-lg sm:text-xl font-bold text-white">Rehoboth Marine</h3>
                  <p className="text-xs sm:text-sm text-gray-400">Equipment & Services</p>
                </div>
              </div>

              <p className="mb-4 sm:mb-6 text-gray-400 text-sm sm:text-base leading-relaxed">
                Providing top-tier marine equipment services with a commitment to excellence,
                safety, and customer satisfaction.
              </p>

              <div className="flex space-x-3 sm:space-x-4">
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Facebook className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Twitter className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Instagram className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
                <a href="#" className="text-gray-400 hover:text-white transition-colors">
                  <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" />
                </a>
              </div>
            </div>

            {/* Row 2: Quick Links + Services - Side by side on mobile/tablet, separate on desktop */}
            <div className="grid grid-cols-2 gap-6 sm:gap-8 lg:gap-0 lg:col-span-2 lg:grid-cols-2">

              {/* Quick Links - Row 2, Column 1 */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Quick Links</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {quickLinks.map((link, i) => (
                    <li key={i}>
                      <Link to={link.href} className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services - Row 2, Column 2 */}
              <div>
                <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Our Services</h3>
                <ul className="space-y-2 sm:space-y-3">
                  {services.map((service, i) => (
                    <li key={i}>
                      <Link to={service.href} className="text-gray-400 hover:text-white transition-colors text-sm sm:text-base">
                        {service.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>

            </div>

            {/* Row 3: Contact Info - Full width on mobile/tablet, 1 column on desktop */}
            <div className="lg:col-span-1">
              <h3 className="text-base sm:text-lg font-semibold text-white mb-4 sm:mb-6">Contact Us</h3>
              <ul className="space-y-3 sm:space-y-4 text-sm sm:text-base text-gray-400">
                <li className="flex items-start">
                  <MapPin className="mr-2 sm:mr-3 mt-0.5 text-blue-400 w-4 h-4 sm:w-5 sm:h-5" />
                  <span>
                    No.518, Sony building, Jumbo Electronics above,<br />
                    Near Asharaf DG metro station, Bur Dubai,<br />
                    United Arab Emirates
                  </span>
                </li>
                <li className="flex items-center">
                  <Phone className="mr-2 sm:mr-3 text-blue-400 w-4 h-4 sm:w-5 sm:h-5" />
                  +971 50 762 5477
                </li>
                <li className="flex items-center">
                  <Mail className="mr-2 sm:mr-3 text-blue-400 w-4 h-4 sm:w-5 sm:h-5" />
                  suthan@rehobothmarine.ae
                </li>
                <li className="flex items-center">
                  <Clock className="mr-2 sm:mr-3 text-blue-400 w-4 h-4 sm:w-5 sm:h-5" />
                  Mon - Sat: 8:00 AM - 6:00 PM
                </li>
              </ul>
            </div>

          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-6 flex flex-col sm:flex-row justify-between items-center">
            <p className="text-sm text-gray-500 text-center sm:text-left">
              © {currentYear} Rehoboth Marine. All rights reserved.
            </p>
            <div className="flex space-x-6 mt-3 sm:mt-0 text-sm text-gray-500">
              <a href="#" className="text-gray-500 hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors">Sitemap</a>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;
