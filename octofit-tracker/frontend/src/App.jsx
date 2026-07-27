import { NavLink, Route, Routes } from 'react-router-dom';
import './App.css';
import Activities from './components/Activities.jsx';
import Leaderboard from './components/Leaderboard.jsx';
import Teams from './components/Teams.jsx';
import Users from './components/Users.jsx';
import Workouts from './components/Workouts.jsx';

function App() {
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();

  return (
    <main className="container py-4 py-lg-5">
      <section className="row g-4 align-items-start">
        <div className="col-lg-4">
          <div className="card shadow-sm border-0 p-4 sticky-top">
            <p className="text-uppercase fw-semibold text-primary mb-2">OctoFit Tracker</p>
            <h1 className="display-6 fw-bold mb-3">Fitness data for modern teams</h1>
            <p className="text-muted mb-4">
              Explore users, teams, activities, leaderboard entries, and workouts from the backend API.
            </p>
            <nav className="d-flex flex-column gap-2">
              <NavLink className="btn btn-outline-primary text-start" to="/users">Users</NavLink>
              <NavLink className="btn btn-outline-primary text-start" to="/teams">Teams</NavLink>
              <NavLink className="btn btn-outline-primary text-start" to="/activities">Activities</NavLink>
              <NavLink className="btn btn-outline-primary text-start" to="/leaderboard">Leaderboard</NavLink>
              <NavLink className="btn btn-outline-primary text-start" to="/workouts">Workouts</NavLink>
            </nav>
            <div className="alert alert-info mt-4 mb-0 small">
              Define <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> for Codespaces URLs. When it is unset, the app falls back to localhost.
            </div>
            {codespaceName ? (
              <p className="small text-muted mt-3 mb-0">Codespaces base URL: https://{codespaceName}-8000.app.github.dev/api/</p>
            ) : (
              <p className="small text-muted mt-3 mb-0">Local base URL: http://localhost:8000/api/</p>
            )}
          </div>
        </div>

        <div className="col-lg-8">
          <Routes>
            <Route path="/" element={<Users />} />
            <Route path="/users" element={<Users />} />
            <Route path="/teams" element={<Teams />} />
            <Route path="/activities" element={<Activities />} />
            <Route path="/leaderboard" element={<Leaderboard />} />
            <Route path="/workouts" element={<Workouts />} />
          </Routes>
        </div>
      </section>
    </main>
  );
}

export default App;
