import { useEffect, useState } from 'react';
import { fetchCollection } from '../utils/apiClient.js';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    async function loadTeams() {
      try {
        const data = await fetchCollection('teams');
        if (isMounted) {
          setTeams(data);
        }
      } catch (err) {
        if (isMounted) {
          setError(err.message || 'Unable to load teams');
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    loadTeams();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <section className="card shadow-sm border-0">
      <div className="card-body">
        <div className="mb-3">
          <h2 className="h4 fw-bold mb-1">Teams</h2>
          <p className="text-muted mb-0">Group training goals and the members assigned to each team.</p>
        </div>

        {loading && <p className="text-muted">Loading teams...</p>}
        {error && <div className="alert alert-danger">{error}</div>}

        {!loading && !error && (
          <div className="row g-3">
            {teams.map((team) => (
              <div className="col-md-6" key={team._id || team.id || team.name}>
                <div className="border rounded-3 p-3 h-100">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <div>
                      <h3 className="h5 fw-semibold mb-1">{team.name}</h3>
                      <p className="text-muted mb-0">{team.focus}</p>
                    </div>
                    <span className="badge bg-primary">{team.memberIds?.length || 0} members</span>
                  </div>
                  <p className="small text-muted">{team.description}</p>
                  <p className="fw-medium">Goal: {team.goal}</p>
                  <ul className="small mb-0 ps-3">
                    {(team.memberIds || []).map((member) => (
                      <li key={member._id || member.id || member.name}>{member.name}</li>
                    ))}
                  </ul>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export default Teams;
