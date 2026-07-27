import { useEffect, useState } from 'react';
import { fetchCollection } from '../utils/apiClient.js';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadWorkouts() {
      try {
        const data = await fetchCollection('workouts');
        if (isMounted) {
          setWorkouts(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load workouts');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadWorkouts();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="mb-3">
          <h2 className="h4 fw-bold mb-1">Workouts</h2>
          <p className="text-muted mb-0">Suggested routines for the next training block.</p>
        </div>

        {loading && <p className="text-muted">Loading workouts...</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="row g-3">
            {workouts.map((workout) => (
              <div className="col-md-6" key={workout._id || workout.id || workout.title}>
                <div className="border rounded-3 p-3 h-100">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h3 className="h5 fw-semibold mb-1">{workout.title}</h3>
                      <p className="text-muted mb-0">{workout.focus}</p>
                    </div>
                    <span className="badge bg-secondary">{workout.difficulty}</span>
                  </div>
                  <p className="small text-muted">{workout.description}</p>
                  <p className="fw-medium mb-2">{workout.durationMinutes} minutes</p>
                  <div className="d-flex flex-wrap gap-2">
                    {(workout.equipment || []).map((item) => (
                      <span className="badge bg-light text-dark" key={item}>{item}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Workouts;
