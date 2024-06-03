// document.getElementById('linkForm').addEventListener('submit', function(event) {
//     event.preventDefault();
    
//     const urls = document.getElementById('websiteUrls').value.split(',').map(url => url.trim());
//     const linksContainer = document.getElementById('linksContainer');
//     linksContainer.innerHTML = ''; // Clear previous results

//     const allLinks = [];

//     urls.forEach(url => {
//         fetch('http://localhost:3000/extract-links', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ url })
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             const urlHeading = document.createElement('h2');
//             urlHeading.textContent = `Links for ${url}`;
//             linksContainer.appendChild(urlHeading);

//             const table = document.createElement('table');
//             const headerRow = table.insertRow();
//             const headers = ['Link Type', 'Links'];
//             headers.forEach(headerText => {
//                 const header = document.createElement('th');
//                 header.textContent = headerText;
//                 headerRow.appendChild(header);
//             });

//             const addRow = (type, links, color) => {
//                 links.forEach(link => {
//                     const row = table.insertRow();
//                     const typeCell = row.insertCell();
//                     const linkCell = row.insertCell();
//                     typeCell.textContent = type;
//                     linkCell.textContent = link;
//                     linkCell.style.color = color;
//                 });
//             };

//             addRow('All Links', data.allLinks, 'blue');
//             addRow('Links with #', data.hashLinks, 'black');
//             addRow('Links with aka.ms', data.akaMsLinks, 'red');
//             addRow('Broken Links', data.brokenLinks, 'green');
//             addRow('Unbroken Links', data.unbrokenLinks, 'white');

//             linksContainer.appendChild(table);

//             allLinks.push(...data.allLinks);

//             if (allLinks.length > 0) {
//                 document.getElementById('downloadBtn').style.display = 'block';
//             }
//         })
//         .catch(error => console.error('Error:', error));
//     });
// });

// document.getElementById('downloadBtn').addEventListener('click', function() {
//     const csvContent = "data:text/csv;charset=utf-8," + allLinks.map(link => link.replace(/"/g, '""')).join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "extracted_links.csv");
//     document.body.appendChild(link);
//     link.click();
// });






// document.getElementById('linkForm').addEventListener('submit', function(event) {
//     event.preventDefault();
    
//     const urls = document.getElementById('websiteUrls').value.split(',').map(url => url.trim());
//     const linksContainer = document.getElementById('linksContainer');
//     linksContainer.innerHTML = ''; // Clear previous results

//     const allLinks = [];

//     urls.forEach(url => {
//         fetch('http://localhost:3000/extract-links', {
//             method: 'POST',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ url })
//         })
//         .then(response => {
//             if (!response.ok) {
//                 throw new Error('Network response was not ok');
//             }
//             return response.json();
//         })
//         .then(data => {
//             const urlHeading = document.createElement('h2');
//             urlHeading.textContent = `Links for ${url}`;
//             linksContainer.appendChild(urlHeading);

//             const table = document.createElement('table');
//             const headerRow = table.insertRow();
//             const headers = ['Link Type', 'Links'];
//             headers.forEach(headerText => {
//                 const header = document.createElement('th');
//                 header.textContent = headerText;
//                 headerRow.appendChild(header);
//             });

//             const addRow = (type, links, color) => {
//                 links.forEach(link => {
//                     const row = table.insertRow();
//                     const typeCell = row.insertCell();
//                     const linkCell = row.insertCell();
//                     typeCell.textContent = type;
//                     linkCell.textContent = link;
//                     linkCell.style.color = color;
//                 });
//             };

//             addRow('All Links', data.allLinks, 'blue');
//             addRow('Links with #', data.hashLinks, 'black');
//             addRow('Links with aka.ms', data.akaMsLinks, 'red');
//             addRow('Broken Links', data.brokenLinks, 'green');
//             addRow('Unbroken Links', data.unbrokenLinks, 'white');

//             linksContainer.appendChild(table);

//             allLinks.push(...data.allLinks);

//             if (allLinks.length > 0) {
//                 document.getElementById('downloadBtn').style.display = 'block';
//             }
//         })
//         .catch(error => console.error('Error:', error));
//     });
// });

// document.getElementById('downloadBtn').addEventListener('click', function() {
//     const csvContent = "data:text/csv;charset=utf-8," + allLinks.map(link => link.replace(/"/g, '""')).join("\n");
//     const encodedUri = encodeURI(csvContent);
//     const link = document.createElement("a");
//     link.setAttribute("href", encodedUri);
//     link.setAttribute("download", "extracted_links.csv");
//     document.body.appendChild(link);
//     link.click();
//     document.body.removeChild(link); // Cleanup
// });



document.getElementById('linkForm').addEventListener('submit', function(event) {
    event.preventDefault();
    
    const urls = document.getElementById('websiteUrls').value.split(',').map(url => url.trim());
    const linksContainer = document.getElementById('linksContainer');
    linksContainer.innerHTML = ''; // Clear previous results

    const allLinks = []; // Define allLinks here, outside the loop

    urls.forEach(url => {
        fetch('http://localhost:3000/extract-links', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            const urlHeading = document.createElement('h2');
            urlHeading.textContent = `Links for ${url}`;
            linksContainer.appendChild(urlHeading);

            const table = document.createElement('table');
            const headerRow = table.insertRow();
            const headers = ['Link Type', 'Links'];
            headers.forEach(headerText => {
                const header = document.createElement('th');
                header.textContent = headerText;
                headerRow.appendChild(header);
            });

            const addRow = (type, links, color) => {
                links.forEach(link => {
                    const row = table.insertRow();
                    const typeCell = row.insertCell();
                    const linkCell = row.insertCell();
                    typeCell.textContent = type;
                    linkCell.textContent = link;
                    linkCell.style.color = color;
                });
            };

            addRow('All Links', data.allLinks, 'blue');
            addRow('Links with #', data.hashLinks, 'black');
            addRow('Links with aka.ms', data.akaMsLinks, 'red');
            addRow('Broken Links', data.brokenLinks, 'green');
            addRow('Unbroken Links', data.unbrokenLinks, 'white');

            linksContainer.appendChild(table);

            allLinks.push(...data.allLinks);

            if (allLinks.length > 0) {
                document.getElementById('downloadBtn').style.display = 'block';
            }
        })
        .catch(error => console.error('Error:', error));
    });
});

document.getElementById('downloadBtn').addEventListener('click', function() {
    const allLinks = []; // Define allLinks here again to access it in this event listener
    const urls = document.getElementById('websiteUrls').value.split(',').map(url => url.trim());
    
    urls.forEach(url => {
        fetch('http://localhost:3000/extract-links', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ url })
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            return response.json();
        })
        .then(data => {
            allLinks.push(...data.allLinks);
            if (allLinks.length > 0) {
                const csvContent = "data:text/csv;charset=utf-8," + allLinks.map(link => link.replace(/"/g, '""')).join("\n");
                const encodedUri = encodeURI(csvContent);
                const link = document.createElement("a");
                link.setAttribute("href", encodedUri);
                link.setAttribute("download", "extracted_links.csv");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link); // Cleanup
            }
        })
        .catch(error => console.error('Error:', error));
    });
});

