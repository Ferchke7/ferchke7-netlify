import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import About from "./components/About";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider
      theme={{
        colorScheme: 'dark',
        fontFamily: 'JetBrains Mono, Monaco, Courier, monospace',
        fontFamilyMonospace: 'JetBrains Mono, Monaco, Courier, monospace',
        headings: { fontFamily: 'JetBrains Mono, Inter, sans-serif' },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <BrowserRouter>
        <div className="portfolio-shell">
          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="*" element={<About />} />
          </Routes>
        </div>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
