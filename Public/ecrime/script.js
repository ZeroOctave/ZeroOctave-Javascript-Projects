// Function to handle the submission of the crime report
function submitCrimeReport() {
    // Fetch values from the form
    var name = document.getElementById('name').value;
    var crimeDescription = document.getElementById('crimeDescription').value;
    var region = document.getElementById('region').value;
    var county = document.getElementById('county').value;

    // Perform further processing or send the data to a server for storage

    // For now, just log the data to the console
    console.log("Name: " + name);
    console.log("Crime Description: " + crimeDescription);
    console.log("Region: " + region);
    console.log("County: " + county);

    // You can add additional logic here, such as sending the data to a server using AJAX
}

