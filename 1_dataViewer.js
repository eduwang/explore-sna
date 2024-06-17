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
            const errorLoadingCsv = document.getElementById('error-csv-message');
            if (!results.data[0] || results.data[0].Source1 === undefined || results.data[0].Source2 === undefined || results.data[0].Weight === undefined) {
                errorLoadingCsv.textContent = "CSV file의 각 열제목은 Source1, Source2, Weight이어야 함";
                errorLoadingCsv.style.display = 'block'; // 에러 메시지를 보이게 설정
                return;
            } else{
                errorLoadingCsv.style.display = 'none';
            }
            // Filter out rows with any empty values
            const filteredData = results.data.filter(row => {
                return Object.values(row).every(value => value !== null && value !== '');
            }).map((row, index) => ({
                ID: index + 1,
                Source1: row.Source1,
                Source2: row.Source2,
                Weight: row.Weight
            }));
            displayTable(filteredData);
            displayDataCount(filteredData.length);
            window.csvData = filteredData; // Store data globally for graph visualization
        }
    });
}

function displayDataCount(count) {
    const dataCount = document.getElementById('data-count');
    dataCount.textContent = '전체 데이터 수: ' + count + '개의 선분 데이터';
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