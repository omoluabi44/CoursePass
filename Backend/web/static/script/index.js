
// const form = document.getElementById("onForm");
// const url = 'http://' + window.location.hostname + ':5001/api/v1/users';

// async function sendData() {
//   // Associate the FormData object with the form element
//   const formData = new FormData(form);

//   try {
//     const response = await fetch(url, {
//       method: "POST",
//       body: formData,
//     });

//     if (!response.ok) {
//       throw new Error('Network response was not ok: ' + response.statusText);
//     }

//     const data = await response.json();
//     console.log("Response data:", data);


//   } catch (e) {
//     console.error("Fetch error:", e);
//   }
// }

// // Take over form submission
// form.addEventListener("submit", async (event) => {
//   event.preventDefault();
//   await sendData(); // Wait for the sendData function to complete

// });




























console.log("before Jquery");


$(document).ready(function() {
    console.log("before2 Jquery");

    $('#onForm').on('submit', function(event) {
        event.preventDefault(); // Prevent the default form submission

        // Create a FormData object
        var formData = new FormData(this); // `this` refers to the form element

        $.ajax({
            
            url: 'http://' + window.location.hostname + ':5001/api/v1/users',
            type: 'POST',
            data: formData,
            processData: false, // Prevent jQuery from automatically transforming the data into a query string
            contentType: false, // Prevent jQuery from setting the Content-Type header
            success: function(response) {
                localStorage.setItem('measurements', JSON.stringify(response));
                window.location.href = '/measurement';
            },
            error: function(xhr, status, error) {
                console.error('Error occurred:', error);
            }
        
        }); console.log("before2 Jquery");
    });
});


console.log("after Jquery");

