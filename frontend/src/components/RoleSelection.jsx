import { useUser } from '@clerk/clerk-react';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../context/ThemeContext';
import { useAuth } from '@clerk/clerk-react';

const RoleSelection = () => {
  const { user } = useUser();
  const { theme } = useTheme();
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const handleRoleSelect = async (role) => {
    try {
      const token = await getToken();
      const response = await fetch(`/api/users/${user.id}/role`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ role }),
      });

      if (response.ok) {
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error updating role:', error);
    }
  };

  return (
    <div className={`min-h-screen flex items-center justify-center p-4 bg-background ${theme}`}>
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-primary mb-4">Select Your Role</h2>
          <p className="text-secondary mb-8">Choose how you'd like to use the platform</p>
        </div>
        
        <div className="grid grid-cols-1 gap-6">
          <button 
            onClick={() => handleRoleSelect('buyer')}
            className="group p-6 rounded-xl bg-surface hover:bg-surface-secondary transition-colors shadow-sm hover:shadow-md text-left"
          >
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg transition-all group-hover:scale-110">
                <span className="text-2xl">🏠</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Home Buyer</h3>
                <p className="text-secondary text-sm">Browse properties, save favorites, and connect with sellers</p>
              </div>
            </div>
          </button>

          <button 
            onClick={() => handleRoleSelect('seller')}
            className="group p-6 rounded-xl bg-surface hover:bg-surface-secondary transition-colors shadow-sm hover:shadow-md text-left"
          >
            <div className="flex items-center gap-4">
              <div className="bg-green-100 dark:bg-green-900 p-3 rounded-lg transition-all group-hover:scale-110">
                <span className="text-2xl">💰</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-primary">Property Seller</h3>
                <p className="text-secondary text-sm">List properties, manage listings, and connect with buyers</p>
              </div>
            </div>
          </button>

        
        </div>
      </div>
    </div>
  );
};

export default RoleSelection; 