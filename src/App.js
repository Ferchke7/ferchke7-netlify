
import './App.css';
import {BrowserRouter, Link, Route,Routes} from "react-router-dom";
import Home from "./components/Home";
import About from "./components/About";
import Project from "./components/Projects";
import {MantineProvider, Tabs} from "@mantine/core";
import Contact from "./components/Contact";

function App() {
  return (
      <MantineProvider theme={{ colorScheme: 'dark',
          fontFamily: 'Verdana, sans-serif',
          fontFamilyMonospace: 'Monaco, Courier, monospace',
          headings: { fontFamily: 'Greycliff CF, sans-serif' },}} withGlobalStyles withNormalizeCSS>

          <BrowserRouter>
              <Tabs color="gray.5" defaultValue="about" >
              <Tabs.List>
                  <Tabs.Tab value="about" to="/about">
                      <Link color="white" to="/about">About me</Link>
                  </Tabs.Tab>
                  <Tabs.Tab value="projects">
                      <Link to="/projects">Projects</Link>
                  </Tabs.Tab>
                  <Tabs.Tab value="contact" ml="auto">
                      <Link to="/contact">Contact me</Link>
                  </Tabs.Tab>
              </Tabs.List>
              </Tabs>
              <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Project />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/contact" element={< Contact />} />
              </Routes>
          </BrowserRouter>

      </MantineProvider>
  );
}

export default App;
