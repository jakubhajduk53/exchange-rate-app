import { Header } from "./components";
import MainPage from "./pages/MainPage";
import ConvertCurrencies from "./pages/ConvertCurrencies";
import { Routes, Route } from "react-router";

function App() {
  return (
    <div className="w-full h-full min-h-screen bg-gray-500 text-white">
      <Header />
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/convert-currencies" element={<ConvertCurrencies />} />
        <Route path="/enriched-data" />
      </Routes>
    </div>
  );
}

export default App;
