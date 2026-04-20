import { useState } from "react";
import dashboardData from "./data/dashboardData";
import MetricCards from "./components/MetricCards";
import ArrivalChart from "./charts/ArrivalChart";
import OriginChart from "./charts/OriginChart";
import WeatherWidget from "./components/WeatherWidget";

function Dashboard() {
  const [selectedIsland, setSelectedIsland] = useState("O'ahu");

  const islandNames = Object.keys(dashboardData);
  const currentData = dashboardData[selectedIsland];

  return (
    <div className="dashboard">
      <header className="dashboard-header">
        <h1>North Shore Family Vacation Rentals Dashboard</h1>
        <p>Explore island tourism trends, occupancy data, and current weather conditions.</p>
      </header>

      <div className="selector-section">
        <label htmlFor="island-select">Select Island: </label>
        <select
          id="island-select"
          value={selectedIsland}
          onChange={(e) => setSelectedIsland(e.target.value)}
        >
          {islandNames.map((island) => (
            <option key={island} value={island}>
              {island}
            </option>
          ))}
        </select>
      </div>

      <MetricCards metrics={currentData.metrics} />

      <div className="charts-section">
        <div className="chart-card">
          <h2>Visitor Arrivals</h2>
          <ArrivalChart island={selectedIsland} data={currentData.arrivals} />
        </div>

        <div className="chart-card">
          <h2>Visitor Origin</h2>
          <OriginChart island={selectedIsland} origin={currentData.origin} />
        </div>
      </div>

      <div className="weather-section">
        <WeatherWidget />
      </div>
    </div>
  );
}

export default Dashboard;