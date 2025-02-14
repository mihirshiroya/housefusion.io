import { UserButton, useUser } from "@clerk/clerk-react";
import { useTheme } from "../context/ThemeContext";
import ThemeSwitcher from "../components/ThemeSwitcher";
import MetricCard from "../components/MetricCard";
import logo from "../assets/logo.png"
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useUser();
  const { theme } = useTheme();
  const userRole = user?.publicMetadata?.role || 'buyer';

  const NavLinks = ({ role }) => {
    const commonClasses = "text-primary transition-colors px-3 py-2 rounded-lg";
    
    const roleBasedLinks = {
      buyer: [
        { name: 'Properties', path: '/properties' },
        { name: 'Saved Props', path: '/saved' },
        { name: 'Inquiries', path: '/inquiries' },
        { name: 'Appointments', path: '/appointments' },
        { name: 'Transactions', path: '/transactions' }
      ],
      seller: [
        { name: 'Manage Properties', path: '/manage-properties' },
        { name: 'Appointments', path: '/appointments' },
        { name: 'Inquiries', path: '/inquiries' },
        { name: 'Transactions', path: '/transactions' }
      ],
      admin: [
        { name: 'Overview', path: '/admin' },
        { name: 'Users', path: '/admin/users' },
        { name: 'Listings', path: '/admin/listings' },
        { name: 'Flagged Content', path: '/admin/flagged' }
      ]
    };

    return (
      <nav className="hidden md:flex items-center gap-6 flex-grow justify-center">
        {roleBasedLinks[role].map((link) => (
          <Link
            key={link.path}
            to={link.path}
            className={`${commonClasses} ${
              location.pathname === link.path ? 'bg-surface-secondary text-primary font-semibold' : ''
            } text-center`}
          >
            {link.name}
          </Link>
        ))}
      </nav>
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Modified Header matching Landing Page style */}
      <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 h-20 border-b border-color">
        <div className="max-w-7xl mx-auto px-4 sm:px-4 lg:px-4 h-full">
          <div className="flex items-center justify-between h-full">
            <div className="flex items-center gap-3 flex-shrink-0">
              <img
                src={logo}
                alt="HouseFusion Logo"
                className={`h-8 w-auto filter ${
                  theme === "dark" ? "invert-0" : "invert-100"
                }`}
              />
              <span className="text-xl font-semibold text-primary whitespace-nowrap">
                HouseFusion.io
              </span>
            </div>
            <div className="flex items-center gap-4 flex-grow justify-end flex-shrink-0">
              <NavLinks role={userRole} />
              <div className="flex items-center gap-3">
                <ThemeSwitcher />
                <UserButton
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "h-9 w-9",
                      userButtonPopoverCard:
                        theme === "dark" ? "bg-gray-800" : "bg-white",
                    },
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      <Footer/>
    </div>
  );
};

export default Dashboard;
