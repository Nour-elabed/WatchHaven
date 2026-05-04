import React from "react";
import { Link } from "react-router-dom";
import FooterSection from "./shared/FooterSection";
import { footerSections, socialIcons } from "./constants/Footer";

const Footer: React.FC = () => {
  return (
    <footer className="bg-white dark:bg-card text-gray-800 dark:text-gray-200 border-t border-gray-200 dark:border-gray-800 mt-10 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 py-12">
          <div className="space-y-6">
            <Link to="/about">
              <img
                src="/assets/images/logo.svg"
                alt="WatchHaven"
                className="h-8 w-auto mb-2 cursor-pointer hover:opacity-80 transition-opacity dark:invert"
              />
            </Link>

            <div className="space-y-3">
              {socialIcons.map((social) => (
                <a
                  key={social.id}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center space-x-3 text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors group"
                >
                  <img
                    src={social.icon}
                    alt={social.text}
                    className="h-5 w-5 object-contain dark:invert"
                  />
                  <span className="text-sm group-hover:text-gray-900 dark:group-hover:text-white">{social.text}</span>
                </a>
              ))}
            </div>
          </div>

          {footerSections.map((section) => (
            <div key={section.id}>
              <FooterSection {...section} />
            </div>
          ))}
        </div>

        <div className="border-t border-gray-300 dark:border-gray-700"></div>

        <div className="py-6 flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-gray-600 dark:text-gray-400 font-bold tracking-tight">WatchHaven. © 2026</p>
          <div className="flex flex-wrap justify-center gap-4 items-center">
            <a href="https://stripe.com" target="_blank" rel="noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold text-sm transition-colors">Stripe</a>
            <a href="https://paypal.com" target="_blank" rel="noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold text-sm transition-colors">PayPal</a>
            <a href="https://visa.com" target="_blank" rel="noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold text-sm transition-colors">Visa</a>
            <a href="https://mastercard.com" target="_blank" rel="noreferrer" className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white font-semibold text-sm transition-colors">MasterCard</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;