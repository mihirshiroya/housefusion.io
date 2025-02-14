import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { ClerkProvider } from '@clerk/clerk-react'
import { ThemeProvider, useTheme } from './context/ThemeContext'
import App from './App'
import './index.css'
import { dark, neobrutalism } from '@clerk/themes'

// Create a wrapper component to access the theme context
const ClerkProviderWithTheme = ({ children }) => {
  const { theme } = useTheme();

  return (
    <ClerkProvider
      publishableKey={import.meta.env.VITE_CLERK_PUBLISHABLE_KEY}
      signInUrl="/sign-in"
      signUpUrl="/sign-up"
      afterSignInUrl="/dashboard"
      afterSignUpUrl="/select-role"
      appearance={{
        baseTheme: theme === 'dark' ? dark : neobrutalism,
        variables: {
          colorPrimary: theme === 'dark' ? '#ffffff' : '#000000',
          colorText: theme === 'dark' ? '#ffffff' : '#000000',
        }
      }}
    >
      {children}
    </ClerkProvider>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <ThemeProvider>
        <ClerkProviderWithTheme>
          <App />
        </ClerkProviderWithTheme>
      </ThemeProvider>
    </BrowserRouter>
  </React.StrictMode>,
)
