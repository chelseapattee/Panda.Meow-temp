import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Landing from './pages/Landing';
import Projects from './pages/Projects';
import ProjectDetail from './pages/ProjectDetail';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';
import './App.scss';
import { supabase } from './utils/supabase';

function AppRoutes() {
  const location = useLocation();
  const isLanding = location.pathname === '/';
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    async function getTodos() {
      const { data: todos, error } = await supabase.from('todos').select();
      if (error) {
        console.error('Error fetching todos:', error);
        return;
      }
      if (todos && todos.length > 0) {
        setTodos(todos);
      }
    }
    getTodos();
  }, []);

  return (
    <>
      {!isLanding && <Navbar />}
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/projects" element={<Projects />} />
        <Route path="/projects/:id" element={<ProjectDetail />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
      <div>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id || JSON.stringify(todo)}>{JSON.stringify(todo)}</li>
          ))}
        </ul>
      </div>
    </>
  );
}

function App() {
  return (
    <Router>
      <AppRoutes />
    </Router>
  );
}

export default App;
