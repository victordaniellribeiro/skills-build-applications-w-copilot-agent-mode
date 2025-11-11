import React, { useEffect, useState } from 'react';

const Activities = () => {
  const [activities, setActivities] = useState([]);
  const endpoint = `https://${process.env.REACT_APP_CODESPACE_NAME}-8000.app.github.dev/api/activities/`;

  useEffect(() => {
    console.log('Fetching Activities from:', endpoint);
    fetch(endpoint)
      .then(res => res.json())
      .then(data => {
        const results = data.results || data;
        setActivities(results);
        console.log('Fetched Activities:', results);
      })
      .catch(err => console.error('Error fetching activities:', err));
  }, [endpoint]);

  return (
    <div className="card p-3">
      <h2 className="heading">Activities</h2>
      <table className="table table-striped table-bordered">
        <thead>
          <tr>
            {activities.length > 0 && Object.keys(activities[0]).map((key) => (
              <th key={key}>{key}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {activities.map((activity, idx) => (
            <tr key={idx}>
              {Object.values(activity).map((value, i) => (
                <td key={i}>{typeof value === 'object' ? JSON.stringify(value) : value}</td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Activities;
