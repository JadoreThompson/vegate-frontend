import { BrowserRouter, Navigate, Route, Routes } from "react-router";
import ThemeProvider from "./components/providers/theme-provider";
import BacktestResultsPage from "./pages/BacktestResultsPage";
import BrokersPage from "./pages/BrokersPage";
import DashboardPage from "./pages/DashboardPage";
import EmailVerificationPage from "./pages/EmailVerifcationPage";
import ExecutionLogsPage from "./pages/ExecutionLogsPage";
import LandingPage from "./pages/LandingPage";
import LiveDeploymentPage from "./pages/LiveDeploymentPage";
import LoginPage from "./pages/LoginPage";
import PricingPage from "./pages/PricingPage";
import RegisterPage from "./pages/RegisterPage";
import ReplaySessionPage from "./pages/ReplaySessionPage";
import StrategiesPage from "./pages/StrategiesPage";
import StrategyCreatePage from "./pages/StrategyCreatePage";
import StrategyDetailPage from "./pages/StrategyDetailPage";
import TradeHistoryPage from "./pages/TradeHistoryPage";
import TradingPage from "./pages/TradingPage";
function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/pricing" element={<PricingPage />} />
          <Route path="/features" element={<LandingPage />} />
          <Route path="/docs" element={<LandingPage />} />
          <Route path="/blog" element={<LandingPage />} />

          {/* Auth Routes */}
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/verify-email" element={<EmailVerificationPage />} />

          {/* Dashboard Routes */}
          <Route path="/dashboard" element={<DashboardPage />} />

          {/* Strategy Routes */}
          <Route path="/strategies" element={<StrategiesPage />} />
          <Route path="/strategies/new" element={<StrategyCreatePage />} />
          <Route path="/strategies/:id" element={<StrategyDetailPage />} />
          <Route path="/strategies/:id/live" element={<LiveDeploymentPage />} />

          {/* Backtest Routes */}
          <Route path="/backtests" element={<BacktestResultsPage />} />
          <Route path="/backtests/:id" element={<BacktestResultsPage />} />

          {/* Replay Routes */}
          <Route
            path="/replay/:sessionType/:sessionId"
            element={<ReplaySessionPage />}
          />

          {/* Trading Routes */}
          <Route path="/live-trading" element={<ExecutionLogsPage />} />
          <Route path="/trade/:symbol" element={<TradingPage />} />

          {/* History & Analytics */}
          <Route path="/trade-history" element={<TradeHistoryPage />} />
          <Route path="/performance" element={<DashboardPage />} />

          {/* Settings */}
          <Route path="/settings" element={<DashboardPage />} />
          <Route path="/brokers" element={<BrokersPage />} />

          {/* Fallback */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
