function MetricCards({ metrics }) {
  return (
    <div className="metric-cards">
      <div className="metric-card">
        <h3>Average Daily Rate</h3>
        <p>${metrics.adr} / night</p>
      </div>

      <div className="metric-card">
        <h3>Occupancy Rate</h3>
        <p>{metrics.occupancy}%</p>
      </div>

      <div className="metric-card">
        <h3>Average Length of Stay</h3>
        <p>{metrics.avgStay} days</p>
      </div>
    </div>
  );
}

export default MetricCards;