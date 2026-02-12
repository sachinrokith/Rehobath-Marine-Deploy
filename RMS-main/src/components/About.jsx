import aboutImage from "../assets/ship-aboutus.png";
import { Users, Award, Clock, ArrowRight } from "lucide-react";

const About = () => {
  return (
    <section id="about" className="py-12 sm:py-14 lg:py-20 bg-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8 sm:mb-10 lg:mb-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">About Us</h1>
          <div className="w-16 h-1 sm:w-20 bg-blue-600 mx-auto mb-4 sm:mb-6"></div>
          <p className="text-base sm:text-lg text-gray-600 max-w-3xl mx-auto">
            Delivering excellence in marine services with a commitment to quality, safety, and customer satisfaction.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-10 lg:gap-12">
          <div className="lg:w-1/2 w-full">
            <div className="relative">
              <img
                src={aboutImage}
                alt="Marine services at Rehoboth Marine"
                className="rounded-lg shadow-xl w-full h-auto"
                loading="lazy"
              />
              <div className="absolute -bottom-4 sm:-bottom-5 lg:-bottom-6 -right-4 sm:-right-5 lg:-right-6 bg-blue-600 text-white p-3 sm:p-4 lg:p-6 rounded-lg shadow-lg w-3/4 sm:w-2/3 lg:w-3/4">
                <p className="text-xs sm:text-sm font-bold">15+ Years of Excellence</p>
              </div>
            </div>
          </div>
          <div className="lg:w-1/2 w-full">
            <h2 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-4 sm:mb-6">
              Leading Marine Solutions Provider
            </h2>

            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              At <b className="text-blue-600">Rehoboth Marine Services LLC</b>, we are a trusted provider of end-to-end marine and offshore solutions,
              delivering reliable, efficient, and cost-effective services to ship owners, operators, and port authorities.
              Our expertise spans ship repair and maintenance, dry docking, marine electrical systems, automation,
              harbor support, and port agency services. We are driven by a commitment to operational excellence,
              safety, and long-term client partnerships.
            </p>

            <p className="text-sm sm:text-base text-gray-600 mb-4 sm:mb-6">
              With a deep understanding of the maritime industry's evolving needs, we combine advanced technology
              with skilled craftsmanship to ensure vessels operate at peak performance. From routine maintenance
              to complex technical projects, our team ensures timely delivery without compromising quality.
            </p>

            <p className="text-sm sm:text-base text-gray-600 mb-6 sm:mb-8">
              Our certified professionals bring decades of hands-on experience and operate in full compliance
              with international maritime standards. Backed by ISO-certified processes and a strong safety culture,
              Rehoboth Marine is dedicated to keeping your fleet seaworthy, efficient, and future-ready.
            </p>
          </div>

        </div>
      </div>
    </section>
  );
};

export default About;