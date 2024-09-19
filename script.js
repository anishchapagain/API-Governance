fetch('results.json')  // Adjust if using results.yaml
    .then(response => response.json())
    .then(data => {
        const summary = document.getElementById('summary');
        const errorResults = document.getElementById('error-results');
        const warningResults = document.getElementById('warning-results');

        const errors = data.filter(item => item.severity === 'error');
        const warnings = data.filter(item => item.severity === 'warning');

        summary.innerHTML = `
            <h2>Summary</h2>
            <ul>
                <li>
                    <span class="circle error-circle"></span> 
                    Errors: ${errors.length}
                </li>
                <li>
                    <span class="circle warning-circle"></span> 
                    Warnings: ${warnings.length}
                </li>
            </ul>
        `;

        errors.forEach(issue => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${issue.code}</td>
                <td>${issue.message}</td>
                <td>${issue.path.join(' > ')}</td>
                <td>Line ${issue.range.start.line}, Column ${issue.range.start.column}</td>
                <td>
                    <span class="toggle" onclick="toggleDetails(this)">[Details]</span>
                    <div class="details">
                        <p>Details: ${JSON.stringify(issue)}</p>
                    </div>
                </td>
            `;
            errorResults.appendChild(row);
        });

        warnings.forEach(issue => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${issue.code}</td>
                <td>${issue.message}</td>
                <td>${issue.path.join(' > ')}</td>
                <td>Line ${issue.range.start.line}, Column ${issue.range.start.column}</td>
                <td>
                    <span class="toggle" onclick="toggleDetails(this)">[Details]</span>
                    <div class="details">
                        <p>Details: ${JSON.stringify(issue)}</p>
                    </div>
                </td>
            `;
            warningResults.appendChild(row);
        });
    })
    .catch(error => console.error('Error loading results:', error));

function toggleDetails(element) {
    const details = element.nextElementSibling;
    details.style.display = details.style.display === 'none' || details.style.display === '' ? 'block' : 'none';
}
