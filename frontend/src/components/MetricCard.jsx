import { useTheme } from '../context/ThemeContext';

const MetricCard = ({ title, value, icon, color }) => {
  const { theme } = useTheme();

  return (
    <div className={`${theme === 'dark' ? 'bg-surface' : 'bg-surface'} p-6 rounded-xl shadow-sm hover:shadow-md transition-shadow duration-200 group`}>
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <div className={`${color} p-3 rounded-lg transition-all duration-300 group-hover:scale-110`}>
            <span className="text-2xl">{icon}</span>
          </div>
          <div>
            <h3 className={`text-sm font-medium text-secondary mb-1`}>{title}</h3>
            <p className={`text-2xl font-bold text-primary`}>{value}</p>
          </div>
        </div>
      </div>
      <div className={`mt-4 border-t ${
        theme === 'dark' ? 'border-gray-700' : 'border-gray-100'
      } pt-4`}>
        <span className={`text-sm ${
          theme === 'dark' ? 'text-green-400' : 'text-green-600'
        } flex items-center`}>
          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
          </svg>
          2.5% from last month
        </span>
      </div>
    </div>
  );
};

export default MetricCard; 