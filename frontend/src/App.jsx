import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { SignIn, SignUp, useAuth } from "@clerk/clerk-react"
import Dashboard from "./pages/Dashboard"
import ProtectedRoute from "./components/ProtectedRoute"
import AuthPageLayout from "./components/AuthPageLayout"
import LoadingSpinner from "./components/LoadingSpinner"
import { useTheme } from "./context/ThemeContext"
import { dark, neobrutalism } from '@clerk/themes'
import RoleSelection from "./components/RoleSelection"
import LandingPage from "./pages/LandingPage"

function App() {
  const { isLoaded, isSignedIn } = useAuth()
  const { theme } = useTheme()  // Call inside functional component

  // Conditional appearance for Clerk
  const clerkAppearance = {
    SignIn: {
      elements: {
        rootBox: "w-full mx-auto",
        card: "shadow-none w-full",
        headerTitle: "text-2xl font-bold dark:text-white",
        headerSubtitle: "dark:text-gray-400",
        formFieldInput: "dark:bg-gray-800 dark:text-white",
        formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white w-full py-2 rounded transition-all",
        socialButtons: "hidden",
        footerActionText: "dark:text-gray-400",
        footerActionLink: "text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
      }
    },
    SignUp: {
      elements: {
        rootBox: "w-full mx-auto",
        card: "shadow-none w-full",
        headerTitle: "text-2xl font-bold dark:text-white",
        headerSubtitle: "dark:text-gray-400",
        formFieldInput: "dark:bg-gray-800 dark:text-white",
        formButtonPrimary: "bg-indigo-600 hover:bg-indigo-700 text-white w-full py-2 rounded transition-all",
        socialButtons: "hidden",
        footerActionText: "dark:text-gray-400",
        footerActionLink: "text-indigo-600 hover:text-indigo-700 dark:text-indigo-400"
      }
    }
  }

  if (!isLoaded) {
    return <LoadingSpinner />
  }

  // If user is signed in and tries to access auth pages, redirect to dashboard
  if (isSignedIn && window.location.pathname.includes("sign-")) {
    window.location.replace("/dashboard")
    return null
  }

  return (
    <div className={`min-h-screen ${theme}`}> {/* theme should be applied here */}
      <Routes>
        <Route
          path="/sign-in/*"
          element={
            <AuthPageLayout>
              <SignIn 
                path="/sign-in"
                routing="path"
                signUpUrl="/sign-up"
                appearance={clerkAppearance.SignIn}
              />
            </AuthPageLayout>
          }
        />
        <Route
          path="/sign-up/*"
          element={
            <AuthPageLayout>
              <SignUp
                path="/sign-up"
                routing="path"
                signInUrl="/sign-in"
                appearance={clerkAppearance.SignUp}
              />
            </AuthPageLayout>
          }
        />
        <Route
          path="/sso-callback"
          element={<Navigate to="/dashboard" replace />}
        />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/select-role"
          element={
            <ProtectedRoute>
              <RoleSelection />
            </ProtectedRoute>
          }
        />
        <Route
          path="/"
          element={<LandingPage />}
        />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  )
}

export default App
