import { Anchor } from 'lucide-react';
import ServiceTemplate from './ServiceTemplate';

const DryDocking = () => {
  const serviceData = {
    title: "Dry Docking Production & Services",
    description: "Comprehensive dry docking solutions with state-of-the-art facilities and experienced teams for all your maintenance needs.",
    icon: Anchor,
    image: "https://interocean.co.uk/wp-content/uploads/2024/02/AdobeStock_308793177-2048x1151.jpeg",
    features: [
      {
        title: "Full-Service Dry Docking",
        description: "Complete dry docking services including hull cleaning, inspection, and maintenance."
      },
      {
        title: "Hull Maintenance",
        description: "Professional hull cleaning, painting, and repair services to ensure optimal performance."
      },
      {
        title: "Propeller & Rudder Services",
        description: "Inspection, repair, and maintenance of propellers and rudders for maximum efficiency."
      },
      {
        title: "Regulatory Compliance",
        description: "Ensuring your vessel meets all regulatory requirements during dry dock."
      }
    ]
  };

  return <ServiceTemplate {...serviceData} />;
};

export default DryDocking;
