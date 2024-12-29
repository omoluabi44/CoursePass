$(document).ready(function(){
    $('#onForm').on('submit', function(event){
        event.preventDefault(); // Prevent the default form submission

        // Get the values from the form fields
        let fullname = $('#fullname').val();
        let email = $('#email').val();
        let height = $('#height').val();

        // Get the selected gender value
        let gender = $('input[name="gender"]:checked').val();

        // Get the file input value
        let input_file = $('#input-file').val();

        // Log the values to the console
        console.log("Full Name: " + fullname);
        console.log("Email: " + email);
        console.log("Height: " + height);
        console.log("Gender: " + gender);
        console.log("File: " + input_file);
    });
});
