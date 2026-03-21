import React from "react";
import { Link } from "react-router-dom";

export type FooterLink = {
  label: string;
  url: string;
};

export type FooterSectionProps = {
  title: string;
  links: FooterLink[];
};

export const FooterSection: React.FC<FooterSectionProps> = ({
  title,
  links,
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
      <ul className="space-y-2 text-gray-600">
        {links.map((link, index) => (
          <li key={index}>
            {link.url.startsWith('/') ? (
              <Link to={link.url} className="hover:text-gray-900 transition-colors">
                {link.label}
              </Link>
            ) : (
              <a href={link.url} className="hover:text-gray-900 transition-colors">
                {link.label}
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterSection;