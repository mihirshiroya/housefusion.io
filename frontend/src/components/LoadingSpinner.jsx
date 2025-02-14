import { useTheme } from '../context/ThemeContext';
import { Home } from "lucide-react"

const LoadingSpinner = () => {
  const { theme } = useTheme();

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center transition-colors duration-300 ${
      theme === 'dark' ? 'bg-gray-900' : 'bg-blue-50'
    }`}>
      <div className="text-center">
        <div className="relative mb-4 inline-block">
          <Home className={`h-16 w-16 animate-bounce ${
            theme === 'dark' ? 'text-blue-400' : 'text-blue-600'
          }`} />
          <div className="absolute inset-0 animate-ping">
            <Home className={`h-16 w-16 ${
              theme === 'dark' ? 'text-blue-800' : 'text-blue-200'
            }`} />
          </div>
        </div>
        <h1 className={`text-2xl font-bold mb-2 ${
          theme === 'dark' ? 'text-white' : 'text-gray-900'
        }`}>
          HouseFusion
        </h1>
        <p className="text-gray-500">
          Discovering your dream home...
        </p>
      </div>
    </div>
  );
};

export default LoadingSpinner;