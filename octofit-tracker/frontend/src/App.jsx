import './App.css'

function App() {
  return (
    <main className="container py-5">
      <section className="row align-items-center g-4">
        <div className="col-lg-7">
          <p className="text-uppercase fw-semibold text-primary">OctoFit Tracker</p>
          <h1 className="display-4 fw-bold mb-3">Modern fitness tracking for teams and solo athletes</h1>
          <p className="lead text-muted mb-4">
            Log workouts, manage teams, and stay motivated with a streamlined dashboard designed for multi-tier growth.
          </p>
          <div className="d-flex gap-3">
            <a className="btn btn-primary btn-lg" href="https://vite.dev/" target="_blank" rel="noreferrer">
              View app stack
            </a>
            <a className="btn btn-outline-secondary btn-lg" href="/api/health" target="_blank" rel="noreferrer">
              Check API health
            </a>
          </div>
        </div>
        <div className="col-lg-5">
          <div className="card shadow-sm border-0 p-4">
            <h2 className="h4 fw-bold mb-3">What’s included</h2>
            <ul className="list-group list-group-flush">
              <li className="list-group-item px-0">React 19 + Vite frontend</li>
              <li className="list-group-item px-0">Express + TypeScript API</li>
              <li className="list-group-item px-0">MongoDB connectivity via Mongoose</li>
            </ul>
          </div>
        </div>
      </section>
    </main>
  )
}

export default App
