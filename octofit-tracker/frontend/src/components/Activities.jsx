import { useEffect, useState } from 'react';
import { fetchCollection } from '../utils/apiClient.js';

function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadActivities() {
      try {
        const data = await fetchCollection('activities');
        if (isMounted) {
          setActivities(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load activities');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadActivities();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="mb-3">
          <h2 className="h4 fw-bold mb-1">Activities</h2>
          <p className="text-muted mb-0">Recent fitness logs captured by the backend API.</p>
        </div>

        {loading && <p className="text-muted">Loading activities...</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Type</th>
                  <th>Duration</th>
                  <th>Calories</th>
                  <th>Notes</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {activities.map((activity) => (
                  <tr key={activity._id || activity.id || activity.type}>
                    <td>{activity.type}</td>
                    <td>{activity.durationMinutes} min</td>
                    <td>{activity.calories}</td>
                    <td>{activity.notes}</td>
                    <td>{activity.date ? new Date(activity.date).toLocaleDateString() : 'n/a'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </section>
  );
}

export default Activities;
