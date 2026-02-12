import {
  Phone,
  Mail,
  MapPin,
  Clock,
} from "lucide-react";

const ContactPage = () => {
  return (
    <section className="bg-gray-50 py-12 sm:py-14 lg:py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-10 sm:mb-12 lg:mb-14">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-2 sm:mb-3">
            Contact Us
          </h1>
          <p className="text-base sm:text-lg text-gray-600 max-w-2xl mx-auto">
            Get in touch with our marine service experts. We’re here to assist
            you with technical support, operations, and general inquiries.
          </p>
          <div className="w-16 h-1 sm:w-20 bg-blue-600 mx-auto mt-3 sm:mt-4"></div>
        </div>

        {/* Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 lg:gap-10">
          {/* Contact Info */}
          <div className="bg-white rounded-lg shadow-md p-5 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900">
              Contact Information
            </h2>

            <div className="space-y-4 sm:space-y-6">
              <div className="flex items-start gap-3 sm:gap-4">
                <MapPin className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 mt-1" />
                <p className="text-sm sm:text-base text-gray-700">
                  SSR Marine Services Pvt Ltd<br />
                  Chennai, Tamil Nadu, India
                </p>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <Phone className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                <a
                  href="tel:+919999999999"
                  className="text-sm sm:text-base text-gray-700 hover:text-blue-600"
                >
                  +91 99999 99999
                </a>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <Mail className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                <a
                  href="mailto:info@yourmarineservices.com"
                  className="text-sm sm:text-base text-gray-700 hover:text-blue-600"
                >
                  info@yourmarineservices.com
                </a>
              </div>

              <div className="flex items-center gap-3 sm:gap-4">
                <Clock className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600" />
                <p className="text-sm sm:text-base text-gray-700">
                  Mon – Sat: 9:00 AM – 6:00 PM
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-5 sm:p-6 lg:p-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6 text-gray-900">
              Send Us a Message
            </h2>

            <form className="space-y-4 sm:space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  placeholder="Your name"
                  className="w-full rounded-md border border-gray-300 px-3 sm:px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Email Address
                </label>
                <input
                  type="email"
                  placeholder="you@example.com"
                  className="w-full rounded-md border border-gray-300 px-3 sm:px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm sm:text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Subject
                </label>
                <input
                  type="text"
                  placeholder="Subject"
                  className="w-full rounded-md border border-gray-300 px-3 sm:px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm sm:text-base"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Message
                </label>
                <textarea
                  rows="5"
                  placeholder="Your message"
                  className="w-full rounded-md border border-gray-300 px-3 sm:px-4 py-2 focus:ring-2 focus:ring-blue-600 focus:outline-none text-sm sm:text-base"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-blue-600 text-white py-2.5 sm:py-3 rounded-md font-semibold hover:bg-blue-700 transition text-sm sm:text-base"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
