import { Wrench } from 'lucide-react';
import ServiceTemplate from './ServiceTemplate';

const ShipRepair = () => {
  const serviceData = {
    title: "Ships & Boats Repair",
    description: "Expert repair and maintenance services for all types of vessels, ensuring peak performance and safety at sea with our certified technicians.",
    icon: Wrench,
    image: "https://reinamarine.com.sg/wp-content/uploads/2022/10/ship-repair-2-1548509156.jpg",
    features: [
      {
        title: "Comprehensive Vessel Repairs",
        description: "Complete repair services for all types of vessels, from small boats to large commercial ships."
      },
      {
        title: "Hull & Structure Repairs",
        description: "Expert repair and maintenance of hulls and structural components using advanced techniques."
      },
      {
        title: "Engine & Propulsion",
        description: "Specialized repair and maintenance of marine engines and propulsion systems."
      },
      {
        title: "24/7 Emergency Services",
        description: "Round-the-clock emergency repair services to minimize downtime and ensure safety."
      }
    ]
  };

  return <ServiceTemplate {...serviceData} />;
};

export default ShipRepair;
