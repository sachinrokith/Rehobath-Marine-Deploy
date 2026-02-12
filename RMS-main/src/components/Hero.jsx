import { Check, ArrowRight } from "lucide-react";
import heroImage from "../assets/hero-shipyard.jpg";
import { Link } from "react-router-dom";


const features = [
  "Advanced Maintenance Programs",
  "ISO-Certified Testing & Inspection",
  "Precision in Every Operation",
];

const Hero = () => {
  return (
    <section className="relative min-h-[70vh] sm:min-h-[75vh] lg:min-h-[80vh] flex items-center px-4 sm:px-6 lg:px-10">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0">
        <img
          src={heroImage}
          alt="Marine equipment and boats"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-blue-900/50" />
      </div>

      {/* Content */}
      <div className="container mx-auto px-3 sm:px-4 lg:px-6 relative z-10">
        <div className="max-w-2xl lg:max-w-3xl text-white">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold leading-tight mb-4 sm:mb-6 lg:mb-8">
            Innovating Automation
            <br />
            <span className="text-blue-300">Engine Performance</span> & Reliabilty
          </h1>

          <div className="space-y-3 sm:space-y-4 mb-6 sm:mb-8 lg:mb-10">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center gap-2 sm:gap-3">
                <div className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                  <Check className="w-2 h-2 sm:w-2.5 sm:h-2.5 lg:w-3 lg:h-3 text-white" />
                </div>
                <span className="text-sm sm:text-base lg:text-lg">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex flex-col sm:flex-row gap-3 sm:gap-4">
            <Link
              to="/services"
              className="bg-white text-blue-900 hover:bg-gray-100 font-medium px-6 sm:px-8 py-2.5 sm:py-3 rounded-md
               flex items-center justify-center transition-colors text-sm sm:text-base"
            >
              Our Services
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
            </Link>

            <Link
              to="/contact"
              className="bg-blue-600 hover:bg-blue-700 text-white font-medium px-6 sm:px-8 py-2.5 sm:py-3 rounded-md
               flex items-center justify-center transition-colors border border-white/20 text-sm sm:text-base"
            >
              Contact Us
              <ArrowRight className="w-3 h-3 sm:w-4 sm:h-4 ml-2" />
            </Link>
          </div>

        </div>
      </div>

      {/* Navigation Arrows */}
      <div className="absolute bottom-6 sm:bottom-8 lg:bottom-10 left-0 right-0 flex justify-center space-x-3 sm:space-x-4">
        <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors text-sm sm:text-base">
          ←
        </button>
        <button className="w-8 h-8 sm:w-10 sm:h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/30 transition-colors text-sm sm:text-base">
          →
        </button>
      </div>

      {/* Bottom Services - Hidden on mobile, optimized for tablet and desktop */}
      <div className="hidden sm:block absolute bottom-0 left-0 right-0 bg-white/10 backdrop-blur-sm py-3 sm:py-4">
        <div className="container mx-auto px-3 sm:px-4 lg:px-6">
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6 lg:gap-8">
            <div className="text-center text-white px-2">
              <h3 className="text-base sm:text-lg font-medium">Technical Services</h3>
              <p className="text-xs sm:text-sm text-blue-100">Expert solutions for your marine needs</p>
            </div>
            <div className="text-center text-white px-2">
              <h3 className="text-base sm:text-lg font-medium">Onboard Services</h3>
              <p className="text-xs sm:text-sm text-blue-100">Comprehensive care while you're at sea</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;