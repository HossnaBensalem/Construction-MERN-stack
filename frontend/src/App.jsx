import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from "./components/Layout/Layout";
import ProjectForm from './components/Projects/ProjectForm';
import Projects from "./components/Projects/Projects";
import Resources from './components/Resources/Resources';
import ResourceForm from './components/Resources/ResourceForm';
import Tasks from './components/Tasks/Tasks';
import TaskForm from './components/Tasks/TaskForm';

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/project" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/resource" element={<Resources />} />
          <Route path="/resourceform/:id" element={<ResourceForm />} />
          <Route path="/projectform/:id" element={<ProjectForm />} />
          <Route path="/taskform/:id" element={<TaskForm />} />
          <Route path="/projectform" element={<ProjectForm />} />
          <Route path="/taskform" element={<TaskForm />} />
          <Route path="/resourceform" element={<ResourceForm />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;