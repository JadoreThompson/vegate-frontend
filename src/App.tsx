import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import ThemeProvider from "./components/providers/theme-provider";
import BacktestResultsPage from "./pages/BacktestResultsPage";
import BacktestsPage from "./pages/BacktestsPage";
import BrokersPage from "./pages/BrokersPage";
import ContactNew from "./pages/ContactNew";
import ContactPage from "./pages/ContactPage";
import EmailVerificationPage from "./pages/EmailVerifcationPage";
import LandingPage from "./pages/LandingPage";
import LandingPageNew from "./pages/LandingPageNew";
import LiveDeploymentPage from "./pages/LiveDeploymentPage";
import LoginPage from "./pages/LoginPage";
import PricingPageNew from "./pages/PricingPageNew";
import RegisterPage from "./pages/RegisterPage";
import SettingsPage from "./pages/SettingsPage";
import StrategiesPage from "./pages/StrategiesPage";
import StrategyCreatePage from "./pages/StrategyCreatePage";
import StrategyDetailPage from "./pages/StrategyDetailPage";
import PricingPage from "./pages/PricingPage";

function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/landing-new" element={<LandingPageNew />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/pricing-new" element={<PricingPageNew />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/contact-new" element={<ContactNew />} />

          {/* Auth Routes */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-email" element={<EmailVerificationPage />} />

          {/* Strategy Routes */}
          <Route path="/strategies" element={<StrategiesPage />} />
          <Route path="/strategies/create" element={<StrategyCreatePage />} />
          <Route
            path="/strategies/:strategyId"
            element={<StrategyDetailPage />}
          />
          <Route
            path="/deployments/:deploymentId"
            element={<LiveDeploymentPage />}
          />

          {/* Backtest Routes */}
          <Route path="/backtests" element={<BacktestsPage />} />
          <Route path="/backtests/:id" element={<BacktestResultsPage />} />

          {/* Settings */}
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/brokers" element={<BrokersPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
