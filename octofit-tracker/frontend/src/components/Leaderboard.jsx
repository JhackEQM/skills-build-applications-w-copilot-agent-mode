import { useEffect, useState } from 'react';
import { fetchCollection } from '../utils/apiClient.js';

function Leaderboard() {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadLeaderboard() {
      try {
        const data = await fetchCollection('leaderboard');
        if (isMounted) {
          setEntries(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load leaderboard');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadLeaderboard();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="mb-3">
          <h2 className="h4 fw-bold mb-1">Leaderboard</h2>
          <p className="text-muted mb-0">Live ranking data for the current competition window.</p>
        </div>

        {loading && <p className="text-muted">Loading leaderboard...</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="table-responsive">
            <table className="table table-hover align-middle mb-0">
              <thead>
                <tr>
                  <th>Rank</th>
                  <th>Name</th>
                  <th>Team</th>
                  <th>Score</th>
                  <th>Streak</th>
                </tr>
              </thead>
              <tbody>
                {entries.map((entry) => (
                  <tr key={entry._id || entry.id || entry.rank}>
                    <td>{entry.rank}</td>
                    <td>{entry.name}</td>
                    <td>{entry.teamName}</td>
                    <td>{entry.score}</td>
                    <td>{entry.streak}</td>
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

export default Leaderboard;
