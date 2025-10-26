'use strict';
(function () {

    let displayDiv = document.getElementById('video-results');
    const messageDiv = document.createElement('div');
    const backButton = document.querySelector('#back-button');
    messageDiv.classList.add('font-bold', 'mb-2', 'text-center');



    document.getElementById('search-button').addEventListener('click', async function (e) {
        e.preventDefault();
        if(document.getElementById('video-search-box').value.trim() === '') {
            displayMessage('Please enter a search term.');
            return;
        }
        window.scrollTo(0, 0);
        backButton.classList.add('invisible');

        let videosObject;

        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'a39a21b178msh40497569c91c8eep11bb3djsnb809c6f753e5',
                'x-rapidapi-host': 'youtube138.p.rapidapi.com'
            }
        };


        try {
            let response = await fetch(`https://youtube138.p.rapidapi.com/search/?q=${document.getElementById('video-search-box').value.trim()}&hl=en&gl=US`, options);

            if (!response.ok) {
                throw new Error(`${response.status} - ${response.statusText}`);
            }
            console.log(response);
            videosObject = await response.json();
            console.log(videosObject);
        } catch (error) {
            displayMessage(`Error: ${error.message}`);
            return;
        }

        if (videosObject.contents === null || videosObject.contents.length === 0) {
            displayMessage('No videos found. Please try another search.');
        }

        else {
            const multipleVideoResultsDiv = document.createElement('div');
            videosObject.contents.forEach(result => {
                if (result.type !== 'video') return;
                const singleVideoResultDiv = document.createElement('div');
                singleVideoResultDiv.classList.add('border', 'p-4', 'mb-4', 'rounded', 'shadow',
                    'cursor-pointer', 'hover:bg-blue-200', 'active:scale-95', 'transition',
                    'duration-150', 'ease-in-out', 'hover:scale-99', 'flex-col', 'justify-center', 'items-center');

                singleVideoResultDiv.innerText = `${result.video.title}`;
                const thumbnail = document.createElement('img');
                thumbnail.src = result.video.thumbnails[0].url || 'images/placeholder.jpg';
                thumbnail.alt = `Picture of: ${result.video.title}`;
                thumbnail.style.width = '4em';
                thumbnail.classList.add('border', 'rounded');
                singleVideoResultDiv.appendChild(thumbnail);

                multipleVideoResultsDiv.appendChild(singleVideoResultDiv);

                singleVideoResultDiv.addEventListener('click', () => displayVideo(result.video, multipleVideoResultsDiv));
                displayDiv.appendChild(multipleVideoResultsDiv);
            });
        }
    });


    async function displayVideo(video, multipleVideoResultsDiv = null) {

        if (multipleVideoResultsDiv) {

            backButton.textContent = 'Back to Results';
            backButton.classList.add('bg-gray-500', 'text-white', 'p-2', 'rounded', 'hover:bg-gray-600', 'active:bg-gray-700', 'active:scale-95', 'transition', 'duration-150', 'cursor-pointer');
            backButton.addEventListener('click', () => {
                displayDiv.innerHTML = '';
                displayDiv.appendChild(multipleVideoResultsDiv);
                backButton.classList.add('invisible');
            });
            backButton.classList.remove('invisible');
        }



        displayDiv.innerHTML = '';
        const videoDiv = document.createElement('div');
        videoDiv.classList.add('border', 'p-4', 'rounded', 'shadow', 'grid', 'gap-4', 'grid-cols-1', 'md:grid-cols-2', '[grid-template-rows:auto_1fr]');
        const titleDiv = document.createElement('div');
        const title = document.createElement('h2');
        title.classList.add('text-2xl', 'font-bold', 'text-center', 'self-start');
        title.textContent = video.title;
        titleDiv.appendChild(title);
        titleDiv.classList.add('border', 'p-4', 'rounded', 'shadow', 'w-full', 'col-start-1','row-start-1', 'flex', 'justify-center', 'items-center');


        const descriptionDiv = document.createElement('div');
        const channelHeading = document.createElement('h3');
        channelHeading.textContent = `Channel: ${video.author.title}\n Views: ${video.stats.views.toLocaleString()}`;
        channelHeading.classList.add('whitespace-pre-line', 'text-lg', 'font-semibold', 'mb-2', 'text-center', 'border', 'p-4', 'rounded', 'shadow', 'w-full');
        descriptionDiv.appendChild(channelHeading);
        const description = document.createElement('p');

        const options = {
            method: 'GET',
            headers: {
                'x-rapidapi-key': 'a39a21b178msh40497569c91c8eep11bb3djsnb809c6f753e5',
                'x-rapidapi-host': 'yt-api.p.rapidapi.com'
            }
        };
        let descriptionData;
        try {
            const response = await fetch(`https://yt-api.p.rapidapi.com/video/info?id=${video.videoId}`, options);
            descriptionData = await response.json();
            console.log(descriptionData);
        } catch (error) {
            console.error(error);
            description.textContent = 'Error fetching video description.';
        }
        description.textContent = `${descriptionData.description}` || 'No description available.';


        description.classList.add('whitespace-pre-line', 'mb-4', 'overflow-y-auto', 'max-h-[60vh]');
        descriptionDiv.appendChild(description);

        
        descriptionDiv.classList.add('border', 'p-4', 'rounded', 'shadow', 'w-full', 'col-start-2', 'md:row-start-1', 'md:row-span-2');

       
        let ytEmbedDiv;
        if (video.videoId) {

            
                ytEmbedDiv = document.createElement('div');
                const ytEmbed = document.createElement('iframe');
                ytEmbed.classList.add('rounded', 'shadow', 'w-full', 'h-full');
                ytEmbed.src = `https://www.youtube.com/embed/${video.videoId}`;
                ytEmbed.width = '100%';
                ytEmbed.height = '315';
                ytEmbed.allowFullscreen = true;
                ytEmbedDiv.classList.add('border', 'rounded', 'shadow', 'w-full', 'justify-center', 'items-center', 'col-start-1', 'md:row-start-2');
                ytEmbedDiv.appendChild(ytEmbed);
            
        }


        videoDiv.appendChild(titleDiv);
        
        videoDiv.appendChild(ytEmbedDiv);
        videoDiv.appendChild(descriptionDiv);
    
        displayDiv.appendChild(videoDiv);




    }

    function displayMessage(message) {
        displayDiv.innerHTML = '';
        messageDiv.textContent = message;
        displayDiv.appendChild(messageDiv);
    }

})();