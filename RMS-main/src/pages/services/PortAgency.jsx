import { Briefcase } from 'lucide-react';
import ServiceTemplate from './ServiceTemplate';

const PortAgency = () => {
  const serviceData = {
    title: "Port Agency Services",
    description: "Efficient port agency services ensuring smooth operations and compliance with all port regulations and requirements.",
    icon: Briefcase,
    image: "https://thedigitalengineers.co/wp-content/uploads/2025/11/charterer-agency-port-call-operations-rallo-shipping.png",
    features: [
      {
        title: "Port Clearance",
        description: "Efficient handling of all port clearance procedures and documentation."
      },
      {
        title: "Crew & Passenger Services",
        description: "Comprehensive support for crew changes, visas, and passenger services."
      },
      {
        title: "Customs & Immigration",
        description: "Expert assistance with customs clearance and immigration procedures."
      },
      {
        title: "Logistics Support",
        description: "Complete logistics solutions including transportation and supply chain management."
      }
    ]
  };

  return <ServiceTemplate {...serviceData} />;
};

export default PortAgency;
