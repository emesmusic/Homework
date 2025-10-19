"use strict";
/* global $ */


(function () {
    //I did it this way so the image was preloaded into the cache so even on a slow network it would display as soon as the button was clicked
   const loadingAnimation = $('<img src="images/loading.gif" id="loading" alt="Loading...">'); 
    const submitButton = $('#submitButton');
    submitButton.click(
        async () => {
            $('#fileContents').html(loadingAnimation);
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