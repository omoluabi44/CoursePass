$(document).ready(function() {
    // Retrieve the measurement data from localStorage
    var measurements = localStorage.getItem('measurements');
    
    if (measurements) {
        measurements = JSON.parse(measurements);

        // Update the page with the measurement data
        $('#user-id').text(measurements.id || 'N/A');
        $('#height').text(measurements.height || 'N/A');
        $('#wrist').text(measurements.wrist || 'N/A');
        $('#chest_width').text(measurements.chest_width || 'N/A');
        $('#leg').text(measurements.leg || 'N/A');
        $('#arms').text(measurements.arms || 'N/A');

        // Clear the data from localStorage (optional)
        localStorage.removeItem('measurements');
    } else {
        console.error('No measurement data found in localStorage.');
    }
});
