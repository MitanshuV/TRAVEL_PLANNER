import React from "react";

const Footer = () => {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 px-4 sm:px-6 lg:px-8">
        {/* Company Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-2">Ocular</h3>
          <p className="text-gray-400 text-sm leading-relaxed">
            Ocular provides high-quality services to clients worldwide. We
            are committed to delivering the best.
          </p>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-2">Quick Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Home
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                About Us
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Services
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Contact
              </a>
            </li>
          </ul>
        </div>

        {/* Support Links */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-2">Support Links</h3>
          <ul className="space-y-2">
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                FAQ
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Help Center
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Privacy Policy
              </a>
            </li>
            <li>
              <a href="#" className="text-gray-400 hover:text-white transition-colors duration-300">
                Terms of Service
              </a>
            </li>
          </ul>
        </div>

        {/* Contact Info */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold mb-2">Contact Us</h3>
          <ul className="space-y-2 text-gray-400 text-sm">
            <li>
              <i className="fas fa-phone-alt mr-2"></i> +123 456 7890
            </li>
            <li>
              <i className="fas fa-envelope mr-2"></i> info@yourcompany.com
            </li>
            <li>
              <i className="fas fa-map-marker-alt mr-2"></i> 123 Business St, City, Country
            </li>
          </ul>
        </div>
      </div>

      {/* Bottom Footer */}
      <div className="mt-12 border-t border-gray-700 pt-6">
        <p className="text-center text-gray-500 text-sm">
          &copy; {new Date().getFullYear()} Your Company. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
