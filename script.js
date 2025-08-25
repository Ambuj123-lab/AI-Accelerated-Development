// Tumhara live backend URL
const API_URL = 'https://data-analysis-tool-nine.vercel.app'; 

// File name ko update karne ke liye event listener
document.getElementById('file-input').addEventListener('change', (e) => {
    const fileName = e.target.files[0].name;
    document.querySelector('#upload-form > div > div').textContent = `📁 ${fileName}`;
});

document.getElementById('upload-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const fileInput = document.getElementById('file-input');
    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append('file', file);

    const response = await fetch(`${API_URL}/api/data`, {
        method: 'POST',
        body: formData,
    });

    if (response.ok) {
        const data = await response.json();
        populateDropdowns(data.columns);
        document.getElementById('chart-controls').style.display = 'block';
    } else {
        alert("File upload failed. Please check the file format and try again.");
    }
});

function populateDropdowns(columns) {
    const column1 = document.getElementById('column1');
    const column2 = document.getElementById('column2');
    column1.innerHTML = '';
    column2.innerHTML = '';
    columns.forEach(col => {
        const opt1 = document.createElement('option');
        const opt2 = document.createElement('option');
        opt1.value = opt1.textContent = col;
        opt2.value = opt2.textContent = col;
        column1.appendChild(opt1);
        column2.appendChild(opt2);
    });
}

document.getElementById('create-chart').addEventListener('click', async () => {
    const column1 = document.getElementById('column1').value;
    const column2 = document.getElementById('column2').value;
    const chartType = document.getElementById('chart-type').value;

    const response = await fetch(`${API_URL}/api/chart?column1=${column1}&column2=${column2}&chart_type=${chartType}`);
    
    if (response.ok) {
        const data = await response.json();
        Plotly.newPlot('chart-container', data.data, data.layout);
    } else {
        alert("Chart generation failed. Please try different columns or chart types.");
    }
});