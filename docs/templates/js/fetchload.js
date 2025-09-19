// Function to fetch and load HTML flcontent from an external file
        function loadPage(url, elementId) {
    fetch(url)
        .then(response => {
            if (!response.ok) {  // Check if the response status is not OK (e.g., 404)
                throw new Error('Page not found');  // Throw an error if not OK
            }
            return response.text();  // Return the HTML content if the response is successful
        })
        .then(html => {
            document.getElementById(elementId).innerHTML = html;  // Inject HTML into the element
        })
        .catch(error => {
            console.error('Error loading page:', error);
            document.getElementById(elementId).innerHTML = 'Sorry! The content could not be loaded at this moment';  // Display the error message on the front-end
        });
}

        // Load 'otherpage.html' into the element with id 'flcontent'
        loadPage('../sa6ang2rha7lay9/t6w2c7pfs/topics/desclets/testyourselfh.html', 'flcontent');