import React from "react";
import Papa from "papaparse";

function FileUpload({setData}) {
    const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
        const text = e.target.result;
        
        Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
        complete: (results) => {
            setData(results.data);
        },
        error: (err) => {
            console.error("Error parsing CSV:", err);
        },
    });
    };

    reader.readAsText(file);
};

    return (
    <div>
        <label htmlFor="csvInput">Upload CSV File:</label>
        <input
        id="csvInput"
        type="file"
        accept=".csv"
        onChange={handleFileUpload}
        />
    </div>
    );
}

export default FileUpload;
