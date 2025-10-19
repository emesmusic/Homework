"use strict";
/* global $ */


(function () {
    const submitButton = $('#submitButton');
    submitButton.click(
        async () => {
            $('#fileContents').html('<img src="images/loading.gif" id="loading" alt="Loading...">');
            try {
                if (!$('#fileNameInput').val()) {
                    throw new Error('No valid file name provided');
                }
                let fileNameObjectThing = await fetch($('#fileNameInput').val());

                if (!fileNameObjectThing.ok) {
                    throw new Error(`${fileNameObjectThing.status} - ${fileNameObjectThing.statusText}`);
                }
                let fileContents = await fileNameObjectThing.text();
                $('#fileContents').text(fileContents);

            } catch (error) {
                $('#fileContents').text(error.message);

            }




        }





    );









}());