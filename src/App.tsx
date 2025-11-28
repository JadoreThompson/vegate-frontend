import { BrowserRouter, Route, Routes } from "react-router";
import TradingAuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import TradingPage from "./pages/TradingPage";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/auth" element={<TradingAuthPage />} />
          <Route path="/trade" element={<TradingPage />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
