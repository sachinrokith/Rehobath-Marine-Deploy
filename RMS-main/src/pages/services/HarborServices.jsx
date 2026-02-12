import { Anchor } from 'lucide-react';
import ServiceTemplate from './ServiceTemplate';

const HarborServices = () => {
  const serviceData = {
    title: "Harbor & Marina Services",
    description: "Comprehensive harbor and marina support including maintenance, security, and operational services for smooth maritime activities.",
    icon: Anchor,
    image: "https://cdn.prod.website-files.com/62541bf65121fc5a245ebf9b/62541bf65121fc2ce25ec377_blog.jpg",
    features: [
      {
        title: "Berthing & Mooring",
        description: "Safe and secure berthing solutions for vessels of all sizes."
      },
      {
        title: "Fuel & Supplies",
        description: "On-site fuel stations and supply services for all your maritime needs."
      },
      {
        title: "Waste Management",
        description: "Eco-friendly waste disposal and management services in compliance with regulations."
      },
      {
        title: "Security & Safety",
        description: "24/7 security surveillance and emergency response services."
      }
    ]
  };

  return <ServiceTemplate {...serviceData} />;
};

export default HarborServices;
