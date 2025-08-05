import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

function ChartViewer({ data, selectedExperiments }) {
  if (!data.length || !selectedExperiments.length) return null;

  const metrics = Array.from(
    new Set(data.map((row) => row.metric_name))
  );

  const getChartData = (metric) => {
    const filtered = data.filter(
      (row) =>
        row.metric_name === metric &&
        selectedExperiments.includes(row.experiment_id)
    );

    const grouped = {};

    filtered.forEach((row) => {
      const step = Number(row.step);
      const expId = row.experiment_id;
      const value = Number(row.value);

      if (!grouped[step]) grouped[step] = { step };
      grouped[step][expId] = value;
    });

    return Object.values(grouped).sort((a, b) => a.step - b.step);
  };

  return (
    <div>
      <h2>Metric Charts</h2>
      {metrics.map((metric) => (
        <div key={metric} style={{ marginBottom: "2rem" }}>
          <h3>{metric}</h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={getChartData(metric)}>
              <XAxis dataKey="step" />
              <YAxis />
              <Tooltip />
              <Legend />
              {selectedExperiments.map((id, index) => (
                <Line
                  key={id}
                  type="monotone"
                  dataKey={id}
                  stroke={`hsl(${(index * 60) % 360}, 70%, 50%)`}
                  dot={false}
                />
              ))}
            </LineChart>
          </ResponsiveContainer>
        </div>
      ))}
    </div>
  );
}

export default ChartViewer;
