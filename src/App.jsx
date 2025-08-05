import { useState } from 'react';
import './App.css';
import FileUpload from './Components/FileUpload';
import ChartViewer from './Components/ChartViewer';

function App() {
  const [data, setData] = useState([]);
  const [selectedExperiments, setSelectedExperiments] = useState([]);

  const experimentIds = Array.from(
    new Set(data.map((row) => row.experiment_id))
  );

  const handleCheckboxChange = (event) => {
    const { value, checked } = event.target;

    if (checked) {
      setSelectedExperiments((prev) => [...prev, value]);
    } else {
      setSelectedExperiments((prev) =>
        prev.filter((id) => id !== value)
      );
    }
  };

  return (
    <div className="container">
      <h1>MLOps Experiment Viewer</h1>
      <FileUpload setData={setData} />
      <p>Loaded rows: {data.length}</p>

      {experimentIds.length > 0 && (
        <>
          <h2>Select Experiments:</h2>
          <ul>
            {experimentIds.map((id) => (
              <li key={id}>
                <label>
                  <input
                    type="checkbox"
                    value={id}
                    checked={selectedExperiments.includes(id)}
                    onChange={handleCheckboxChange}
                  />
                  {id}
                </label>
              </li>
            ))}
          </ul>

          <h3>Selected Experiments:</h3>
          <ul>
            {selectedExperiments.map((id) => (
              <li key={id}>{id}</li>
            ))}
          </ul>
        </>
      )}

      <ChartViewer data={data} selectedExperiments={selectedExperiments} />
    </div>
  );
}

export default App;
