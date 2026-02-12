import { useState } from "react";
import { Menu, X, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import companyLogo from "../assets/company-logo.png";
import companyName from "../assets/company-name.jpeg";  
const navLinks = [
  { name: "Home", href: "/" },
  { name: "Services", href: "/serviceMain" },
  { name: "Gallery", href: "/gallery" },
  { name: "Contact Us", href: "/contact" },
  { name: "Our Reach", href: "/ourReach" },
];

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50 w-full">
      <div className="container mx-auto px-6 sm:px-8 lg:px-10">
        <div className="flex items-center justify-between h-16 sm:h-18 lg:h-20">
          {/* Mobile menu button - moved to left */}
          <div className="flex items-center lg:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative p-2 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200 group"
            >
              <div className="w-6 h-6 flex items-center justify-center">
                {isOpen ? (
                  <X className="w-6 h-6 transform transition-transform duration-200 group-hover:rotate-90" />
                ) : (
                  <Menu className="w-6 h-6 transform transition-transform duration-200 group-hover:scale-110" />
                )}
              </div>
              <span className="sr-only">Toggle menu</span>
            </button>
          </div>

          {/* Logo and Company Name - centered on mobile and tablet */}
          <div className="flex items-center space-x-2 sm:space-x-3 flex-1 lg:flex-none justify-center lg:justify-start">
            <Link to="/" className="flex items-center">
              {/* Logo Image */}
              <img 
                src={companyLogo}
                alt="Rehoboth Marine Logo" 
                className="h-10 w-auto sm:h-12 lg:h-14 object-contain"
              />
              <img 
                src={companyName}
                alt="Rehoboth Marine" 
                className="h-8 w-auto sm:h-10 lg:h-12 object-contain ml-2"
              /> 
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6 xl:space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-gray-700 hover:text-blue-600 font-medium text-sm transition-colors px-2 py-1 sm:px-3 sm:py-2"
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* CTA Button */}
          <div className="hidden lg:block">
            <Link
              to="/enquiry"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-4 sm:px-6 py-2
               rounded-md flex items-center transition-colors text-sm sm:text-base"
            >
              Enquire Now
              <ArrowRight className="w-4 h-4 ml-2" />
            </Link>
          </div>

          {/* Spacer for mobile and tablet layout balance */}
          <div className="w-10 lg:hidden"></div>
        </div>

        {/* Mobile Navigation Sidebar */}
        <div className={`fixed inset-0 z-50 lg:hidden ${isOpen ? 'block' : 'hidden'}`}>
          {/* Overlay */}
          <div 
            className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isOpen ? 'opacity-60' : 'opacity-0'}`}
            onClick={() => setIsOpen(false)}
          />
          
          {/* Sidebar */}
          <div className={`absolute top-0 left-0 h-auto max-h-[90vh] w-72 sm:w-80 bg-white shadow-2xl transform transition-transform duration-300 ease-out ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            {/* Sidebar Header */}
            <div className="flex items-center justify-between p-3 sm:p-4 border-b border-gray-100">
              <div className="flex items-center space-x-2 sm:space-x-3">
                <img 
                  src={companyLogo}
                  alt="Rehoboth Marine Logo" 
                  className="h-8 w-auto sm:h-10 object-contain"
                />
                <img 
                  src={companyName}
                  alt="Rehoboth Marine" 
                  className="h-6 w-auto sm:h-8 object-contain ml-2"
                /> 
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-2 text-gray-500 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 transform hover:rotate-90"
              >
                <X className="w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200" />
              </button>
            </div>
            
            {/* Navigation Links */}
            <div className="p-3 sm:p-4 space-y-2">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className={`block py-2.5 px-3 sm:py-3 sm:px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 text-sm sm:text-base font-medium transform hover:translate-x-2 ${
                    isOpen ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-4'
                  }`}
                  onClick={() => setIsOpen(false)}
                  style={{
                    transitionDelay: isOpen ? `${index * 100}ms` : '0ms'
                  }}
                >
                  <span className="flex items-center">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-3 opacity-0 transition-all duration-300 group-hover:opacity-100"></span>
                    {link.name}
                  </span>
                </Link>
              ))}
              
              {/* Admin Login Link for Mobile */}
              <Link
                to="/admin/login"
                className="block py-2.5 px-3 sm:py-3 sm:px-4 text-gray-700 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-300 text-sm sm:text-base font-medium transform hover:translate-x-2"
                onClick={() => setIsOpen(false)}
              >
                Admin Login
              </Link>
            </div>
            
            {/* CTA Button */}
            <div className={`p-3 sm:p-4 border-t border-gray-100 bg-gray-50 transition-all duration-300 ${
              isOpen ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
            }`}
            style={{
              transitionDelay: isOpen ? '400ms' : '0ms'
            }}>
              <button className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-medium px-4 sm:px-6 py-2.5 sm:py-3 rounded-lg flex items-center justify-center transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-xl text-sm sm:text-base">
                <span className="mr-2">Enquire Now</span>
                <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;