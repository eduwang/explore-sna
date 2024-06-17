function handleFile() {
    const input = document.getElementById('csvFileInput');
    const file = input.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function(e) {
            const arrayBuffer = e.target.result;
            const encoding = detectEncoding(arrayBuffer);
            const text = decodeText(arrayBuffer, encoding); // Decode the text with detected encoding
            parseCSV(text);
        };
        reader.readAsArrayBuffer(file);
    }
}

function detectEncoding(buffer) {
    // Placeholder function to detect encoding
    // You might use a library or custom logic to detect encoding more accurately
    // For the sake of example, let's assume the encoding is EUC-KR
    return 'euc-kr'; // Change this to the detected encoding if possible
}

function decodeText(arrayBuffer, encoding) {
    const decoder = new TextDecoder(encoding);
    return decoder.decode(new Uint8Array(arrayBuffer));
}

function parseCSV(text) {
    Papa.parse(text, {
        header: true,
        dynamicTyping: true,
        complete: function(results) {
            displayTable(results.data);
        }
    });
}

function displayTable(data) {
    const csvHeader = document.getElementById('csvHeader');
    const csvBody = document.getElementById('csvBody');

    // Clear existing table data
    csvHeader.innerHTML = '';
    csvBody.innerHTML = '';

    if (data.length > 0) {
        // Create header row
        const headers = Object.keys(data[0]);
        headers.forEach(header => {
            const th = document.createElement('th');
            th.textContent = header;
            csvHeader.appendChild(th);
        });

        // Create data rows
        data.forEach(row => {
            const tr = document.createElement('tr');
            headers.forEach(header => {
                const td = document.createElement('td');
                td.textContent = row[header];
                tr.appendChild(td);
            });
            csvBody.appendChild(tr);
        });
    }
}