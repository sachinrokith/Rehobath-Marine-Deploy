import { Zap } from 'lucide-react';
import ServiceTemplate from './ServiceTemplate';

const MarineElectrical = () => {
  const serviceData = {
    title: "Marine Electrical Systems",
    description: "Professional installation, maintenance, and repair of marine electrical systems for yachts and commercial vessels.",
    icon: Zap,
    image: "https://ignitionmarine.com/wp-content/uploads/2024/10/Depositphotos_552004034_L.jpg",
    features: [
      {
        title: "Electrical System Installation",
        description: "Professional installation of marine electrical systems for new builds and retrofits."
      },
      {
        title: "Troubleshooting & Repairs",
        description: "Expert diagnosis and repair of electrical issues to minimize downtime."
      },
      {
        title: "Navigation & Communication Systems",
        description: "Installation and maintenance of advanced navigation and communication equipment."
      },
      {
        title: "Battery & Power Systems",
        description: "Comprehensive services for marine battery systems and power management."
      }
    ]
  };

  return <ServiceTemplate {...serviceData} />;
};

export default MarineElectrical;
