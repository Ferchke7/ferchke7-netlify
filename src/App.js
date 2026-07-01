import './App.css';
import { BrowserRouter, Link, NavLink, Route, Routes } from "react-router-dom";

import About from "./components/About";
import Activity from "./components/Activity";
import { MantineProvider } from "@mantine/core";

function App() {
  return (
    <MantineProvider
      theme={{
        colorScheme: 'dark',
        fontFamily: 'Inter, Verdana, sans-serif',
        fontFamilyMonospace: 'JetBrains Mono, Monaco, Courier, monospace',
        headings: { fontFamily: 'Inter, Greycliff CF, sans-serif' },
      }}
      withGlobalStyles
      withNormalizeCSS
    >
      <BrowserRouter>
        <div className="portfolio-shell">
          <header className="site-header">
            <Link className="brand-mark" to="/about" aria-label="Ferdavs Majitov home">
              FM
            </Link>

            <nav className="site-nav" aria-label="Main navigation">
              <NavLink to="/about" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>
                About
              </NavLink>
              <NavLink to="/activity" className={({ isActive }) => isActive ? "nav-link nav-link-active" : "nav-link"}>
                Activity
              </NavLink>
            </nav>
          </header>

          <Routes>
            <Route path="/" element={<About />} />
            <Route path="/about" element={<About />} />
            <Route path="/activity" element={<Activity />} />
          </Routes>
        </div>
      </BrowserRouter>
    </MantineProvider>
  );
}

export default App;
