import { Link } from "react-router-dom";
import { useTheme } from '../context/ThemeContext';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faTwitter, faYoutube } from '@fortawesome/free-brands-svg-icons';
import logo from '../assets/logo.png';
import { Send } from "lucide-react";

const fa = {
  facebook: faFacebook,
  linkedin: faLinkedin,
  twitter: faTwitter,
  youtube: faYoutube
};

const Footer = () => {
  const { theme } = useTheme();

  return (
    <div className="border-t border-color">
      {/* Footer CTA Section */}
      <section className="px-8 md:px-16 py-8 md:py-16 bg-gradient-to-b from-primary/90 to-primary-dark/80">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
          <div className="flex-1">
            <h1 className="text-3xl md:text-5xl font-bold text-surface mb-4 text-primary">
              Start Your Real Estate Journey Today
            </h1>
            <p className="text-surface-secondary mb-8 max-w-3xl text-sm md:text-base text-secondary">
              Your dream property is just a click away. Whether you're looking for a new home, 
              a strategic investment, or expert real estate advice, HouseFusion is here to assist 
              you every step of the way.
            </p>
          </div>
          <Link 
            to="/properties"
            className="px-6 py-3 rounded-lg border border-color hover:bg-surface-secondary transition-colors text-primary bg-background whitespace-nowrap"
          >
            Explore Properties
          </Link>
        </div>
      </section>

      {/* Main Footer Content */}
      <footer className="px-8 md:px-16 py-8 md:py-16 border-t border-color">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8">
          <div className="col-span-2 md:col-span-2">
            <div className="flex items-center gap-2 mb-6">
              <img 
                src={logo} 
                alt="Logo" 
                className={`h-8 w-auto filter ${theme === 'dark' ? 'invert-0' : 'invert-100'}`}
              />
              <span className="text-2xl font-bold text-primary">HouseFusion</span>
            </div>
            <div className="flex items-center gap-2 border border-color rounded-lg p-1 bg-background focus-within:ring-2 focus-within:ring-primary">
              <input
                type="email"
                placeholder="Enter Your Email"
                className="w-full bg-transparent px-4 py-2 text-primary focus:outline-none border-none"
              />
              <button className="flex items-center justify-center bg-primary hover:bg-primary-dark p-2 rounded-md transition-colors text-surface">
                <Send className="w-5 h-5"/>
              </button>
            </div>
          </div>

          <div className="col-span-1 md:col-span-1 text-center">
            <h3 className="text-primary font-semibold mb-4">Company</h3>
            <ul className="space-y-2 mx-auto w-fit">
              {['About Us', 'Our Story', 'Portfolio', 'Our Works', 'Our Offices', 'Our Team', 'Our Clients'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-secondary hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-1 text-center">
            <h3 className="text-primary font-semibold mb-4">Services</h3>
            <ul className="space-y-2 mx-auto w-fit">
              {['Services', 'Valuation Mastery', 'Strategic Marketing', 'Property Management', 'Closing Success', 'Negotiation Wizardry'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-secondary hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

          <div className="col-span-1 md:col-span-1 text-center">
            <h3 className="text-primary font-semibold mb-4">Resources</h3>
            <ul className="space-y-2">
              {['How It Works', 'Categories', 'Contact Form', 'Properties'].map((item) => (
                <li key={item}>
                  <a href="#" className="text-secondary hover:text-primary transition-colors">{item}</a>
                </li>
              ))}
            </ul>
          </div>

        </div>

        <div className="flex flex-col md:flex-row justify-between items-center mt-8 md:mt-16 pt-8 border-t border-color gap-4">
          <p className="text-secondary text-sm md:text-base">©2024 HouseFusion. All Rights Reserved.</p>
          <div className="flex gap-6">
            {['facebook', 'linkedin', 'twitter', 'youtube'].map((platform) => (
              <a key={platform} href="#" className="text-secondary hover:text-primary transition-colors">
                <FontAwesomeIcon icon={fa[platform]} className="text-xl" />
              </a>
            ))}
          </div>
          <a href="#" className="text-secondary hover:text-primary transition-colors">Terms & Conditions</a>
        </div>
      </footer>
    </div>
  );
};

export default Footer; 