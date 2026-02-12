import { Phone, Mail, Clock, Twitter, Facebook, Instagram } from "lucide-react";

const TopBar = () => {
  return (
    <div className="bg-blue-800 text-white text-sm py-2 hidden lg:block">
      <div className="container mx-auto flex justify-between items-center px-4 sm:px-6 lg:px-8">
        {/* Contact Info */}
        <div className="flex flex-wrap items-center justify-center md:justify-start gap-6 text-sm">
          <div className="flex items-center gap-2">
            <Phone className="w-4 h-4 text-blue-300" />
            <span>Call us: +971 50 762 5477</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-blue-300" />
            <span>Email us: suthan@rehobothmarine.ae</span>
          </div>
          
          <div className="flex items-center gap-2">
            <Clock className="w-4 h-4 text-blue-300" />
            <span>Opening Hours: Mon - Sat: 8am - 6pm</span>
          </div>
        </div>

        {/* Social Icons */}
        <div className="flex items-center gap-3">
          <a href="#" className="text-white hover:text-blue-300 transition-colors">
            <Twitter className="w-5 h-5" />
          </a>
          <a href="#" className="text-white hover:text-blue-300 transition-colors">
            <Facebook className="w-5 h-5" />
          </a>
          <a href="#" className="text-white hover:text-blue-300 transition-colors">
            <Instagram className="w-5 h-5" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default TopBar;
