import { Settings } from 'lucide-react';
import ServiceTemplate from './ServiceTemplate';

const MarineAutomation = () => {
  const serviceData = {
    title: "Marine Automation",
    description: "Advanced automation solutions for modern vessels, enhancing safety, efficiency, and operational performance.",
    icon: Settings,
    image: "https://www.noris-group.com/fileadmin/user_upload/Products_Systems/Maritime_systems/AMCS/Ship-Control-Station-with-NORIMOS.jpg",
    features: [
      {
        title: "Control Systems",
        description: "Advanced control systems for engine rooms, navigation, and onboard operations."
      },
      {
        title: "Monitoring Solutions",
        description: "Real-time monitoring of vessel performance and systems status."
      },
      {
        title: "Integration Services",
        description: "Seamless integration of new automation systems with existing vessel infrastructure."
      },
      {
        title: "Maintenance & Support",
        description: "Ongoing maintenance and technical support for all automation systems."
      }
    ]
  };

  return <ServiceTemplate {...serviceData} />;
};

export default MarineAutomation;
