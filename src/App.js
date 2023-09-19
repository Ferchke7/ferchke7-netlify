
import './App.css';
import {BrowserRouter, Link, Route,Routes} from "react-router-dom";

import About from "./components/About";
import Project from "./components/Projects";
import {MantineProvider, Tabs} from "@mantine/core";


function App() {
  return (
      <MantineProvider theme={{ colorScheme: 'dark',
          fontFamily: 'Verdana, sans-serif',
          fontFamilyMonospace: 'Monaco, Courier, monospace',
          headings: { fontFamily: 'Greycliff CF, sans-serif' },}} withGlobalStyles withNormalizeCSS>
          <BrowserRouter>
              <Tabs variant="outline" color="gray.5" defaultValue="about" >
              <Tabs.List>
                  <Link color="white" to="/about">
                  <Tabs.Tab value="about" to="/about">
                      About me
                  </Tabs.Tab>
                  </Link>
                  <Link to="/projects">
                  <Tabs.Tab value="projects">
                      Projects
                  </Tabs.Tab>
                  </Link>

              </Tabs.List>
              </Tabs>
              <Routes>
                  <Route path="/" element={<About />} />
                  <Route path="/projects" element={<Project />} />
                  <Route path="/about" element={<About />} />
              </Routes>
          </BrowserRouter>

      </MantineProvider>
  );
}

export default App;
