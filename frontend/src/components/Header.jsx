import { UserButton } from '@clerk/clerk-react';
import ThemeSwitcher from './ThemeSwitcher';
import { useTheme } from '../context/ThemeContext';

const Header = () => {
  const { theme } = useTheme();

  return (
    <header className={`sticky top-0 z-10 backdrop-blur-lg border-b border-color ${theme === 'light' ? 'bg-surface/70' : 'bg-surface/70'}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <div className="flex justify-center items-center gap-4">
            <div className="h-full flex items-center justify-center">
              <ThemeSwitcher />
            </div>
            <UserButton appearance={{
              elements: {
                userButtonAvatarBox: "h-9 w-9",
                userButtonPopoverCard: theme === 'dark' ? 'bg-gray-800' : 'bg-white'
              }
            }} />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header; 