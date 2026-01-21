import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "../../front_end/src/components/layout/Layout";
import Dashboard from "../../front_end/src/components/pages/Dashboard";
import FakeNews from "../../front_end/src/components/pages/FakeNews";
import RealNews from "../../front_end/src/components/pages/RealNews";
import Chatbot from "../../front_end/src/components/pages/ChatbotPage";

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/fake-news" element={<FakeNews />} />
          <Route path="/real-news" element={<RealNews />} />
          <Route path="/chatbot" element={<Chatbot />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;