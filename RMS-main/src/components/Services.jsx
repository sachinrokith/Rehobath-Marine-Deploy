import { Wrench, Anchor, Zap, Settings, Ship, Briefcase } from "lucide-react";

const services = [
  {
    icon: <Wrench className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
    title: "Ship Repair",
    description: "Comprehensive repair and maintenance services for all types of vessels, ensuring safety and reliability at sea.",
  },
  {
    icon: <Anchor className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
    title: "Dry Docking",
    description: "Professional dry docking services including hull cleaning, painting, and underwater repairs.",
  },
  {
    icon: <Zap className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
    title: "Marine Electrical",
    description: "Expert installation and maintenance of marine electrical systems and navigation equipment.",
  },
  {
    icon: <Settings className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
    title: "Marine Automation",
    description: "Advanced automation solutions for modern vessels to enhance operational efficiency.",
  },
  {
    icon: <Ship className="w-6 h-6 sm:w-7 sm:h-7 lg:w-8 lg:h-8" />,
    title: "Harbor Services",
    description: "Comprehensive harbor support including berthing, mooring, and cargo handling.",
  }
];

const Services = () => {
  return (
    <section id="services" className="py-12 sm:py-14 lg:py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-10 sm:mb-12 lg:mb-16">
          <span className="text-xs sm:text-sm font-semibold tracking-wider text-blue-600 uppercase">What We Offer</span>
          <h2 className="mt-2 text-2xl sm:text-3xl md:text-4xl font-extrabold text-gray-900">
            Our Marine Services
          </h2>
          <div className="mt-3 max-w-2xl mx-auto text-base sm:text-lg lg:text-xl text-gray-500">
            Comprehensive solutions for all your maritime needs
          </div>
        </div>

        <div className="grid gap-6 sm:gap-8 lg:gap-10 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => (
            <div 
              key={index}
              className="relative bg-white p-4 sm:p-5 lg:p-6 rounded-lg border border-gray-200 hover:border-blue-300 transition-all duration-300 group"
            >
              <div className="absolute -top-4 sm:-top-5 lg:-top-6 left-4 sm:left-5 lg:left-6 w-10 h-10 sm:w-12 sm:h-12 lg:w-14 lg:h-14 rounded-lg bg-blue-600 text-white flex items-center justify-center transform group-hover:rotate-6 transition-transform duration-300">
                {service.icon}
              </div>
              <div className="pt-6 sm:pt-7 lg:pt-8">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-2 sm:mb-3">{service.title}</h3>
                <p className="text-sm sm:text-base text-gray-600 leading-relaxed">{service.description}</p>
              </div>
              
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
