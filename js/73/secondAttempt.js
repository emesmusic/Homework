'use strict';
(function () {

    //I hope you saw this. I've run out of free api calls

    let displayDiv = document.getElementById('video-results');
    const messageDiv = document.createElement('div');
    const backButton = document.querySelector('#back-button');
    messageDiv.classList.add('font-bold', 'mb-2', 'text-center');
    let currentVideo;
    const loadingDiv = document.createElement('div');
    const loadingImg = document.createElement('img');
    loadingImg.src = 'images/loading.gif';
    loadingImg.style.display = 'block';
    loadingImg.style.margin = '0 auto';
    loadingDiv.style.textAlign = 'center';



    loadingDiv.appendChild(loadingImg);


    backButton.classList.add('bg-gray-500', 'text-white', 'p-2', 'rounded', 'hover:bg-gray-600', 'active:bg-gray-700', 'active:scale-95', 'transition', 'duration-150', 'cursor-pointer');





    document.getElementById('search-button').addEventListener('click', (e) => videoSearch(document.getElementById('video-search-box').value.trim(), currentVideo ? currentVideo : null, e));



    async function videoSearch(searchValue, video, e = null) {
        e?.preventDefault();
        if (searchValue === '') {
            displayMessage('Please enter a search term.');
            return;
        }
        window.scrollTo(0, 0);

        loading();
        backButton.textContent = 'Back to Video';
        backButton.onclick = () => displayVideo(video, searchValue);






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
            multipleVideoResultsDiv.classList.add('grid', 'gap-4', 'grid-cols-1', 'md:grid-cols-2', 'lg:grid-cols-3', 'flex-wrap');
            videosObject.contents.forEach(result => {
                if (result.type !== 'video') return;

                const singleVideoResultDiv = document.createElement('div');
                singleVideoResultDiv.classList.add('border', 'p-4', 'mb-4', 'rounded', 'shadow',
                    'cursor-pointer', 'hover:bg-blue-200', 'active:scale-95', 'transition',
                    'duration-150', 'ease-in-out', 'hover:scale-99', 'flex-col', 'justify-center', 'items-center', 'text-justify', 'text-lg', 'font-bold');

                singleVideoResultDiv.innerText = `${result.video.title}`;
                const thumbnail = document.createElement('img');
                thumbnail.src = result.video.thumbnails[0].url || 'images/placeholder.jpg';
                thumbnail.alt = `Picture of: ${result.video.title}`;
                thumbnail.style.width = '100%';
                thumbnail.classList.add('border', 'rounded');
                singleVideoResultDiv.appendChild(thumbnail);

                multipleVideoResultsDiv.appendChild(singleVideoResultDiv);
                currentVideo = result.video;
                singleVideoResultDiv.addEventListener('click', () => displayVideo(currentVideo, searchValue));
                displayDiv.innerHTML = '';
                displayDiv.appendChild(multipleVideoResultsDiv);
            });
        }
    }









    async function displayVideo(video, searchValue) {
        backButton.classList.remove('invisible');
        loading();
        backButton.textContent = 'Back to Results';
        backButton.onclick = () => videoSearch(searchValue, video);




        const videoDiv = document.createElement('div');
        videoDiv.classList.add('border', 'p-4', 'rounded', 'shadow', 'grid', 'gap-4', 'grid-cols-1', 'md:grid-cols-2', '[grid-template-rows:auto_1fr]');
        const titleDiv = document.createElement('div');
        const title = document.createElement('h2');
        title.classList.add('text-2xl', 'font-bold', 'text-center', 'self-start');
        title.textContent = video.title;
        titleDiv.appendChild(title);
        titleDiv.classList.add('border', 'p-4', 'rounded', 'shadow', 'w-full', 'col-start-1', 'row-start-1', 'flex', 'justify-center', 'items-center');


        const descriptionDiv = document.createElement('div');
        const channelHeading = document.createElement('h3');
        channelHeading.textContent = `Video views: ${video.stats.views.toLocaleString()}\nChannel: ${video.author.title}`;
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
            //2nd api call to another api since I'm not using the official youtube api (since you have to make a google developer thing
            //to get an api key) and the original api I used, while great at search, doesn't provide video description.
            const response = await fetch(`https://yt-api.p.rapidapi.com/video/info?id=${video.videoId}`, options);
            descriptionData = await response.json();
            console.log(descriptionData);
        } catch (error) {
            console.error(error);
            description.textContent = `Error fetching video description. ${error.message}`;
        }
        description.textContent = `${descriptionData.description}` || 'No description available.';


        description.classList.add('whitespace-pre-line', 'mb-4', 'overflow-y-auto', 'max-h-[60vh]');
        descriptionDiv.appendChild(description);


        descriptionDiv.classList.add('border', 'p-4', 'rounded', 'shadow', 'w-full', 'md:col-start-2', 'md:row-start-1', 'md:row-span-2');


        let ytEmbedDiv;
        if (video.videoId) {


            ytEmbedDiv = document.createElement('div');
            const ytEmbed = document.createElement('iframe');
            ytEmbed.classList.add('rounded', 'shadow', 'w-full', 'h-full');
            ytEmbed.src = `https://www.youtube.com/embed/${video.videoId}?autoplay=1`;
            ytEmbed.width = '100%';
            ytEmbed.height = '315';
            ytEmbed.allow = 'autoplay; encrypted-media';
            ytEmbed.allowFullscreen = true;
            ytEmbedDiv.classList.add('border', 'rounded', 'shadow', 'w-full', 'justify-center', 'items-center', 'col-start-1', 'md:row-start-2', 'min-h-[50vh]', 'md:min-h-[60vh]');
            ytEmbedDiv.appendChild(ytEmbed);

        }


        videoDiv.appendChild(titleDiv);

        videoDiv.appendChild(ytEmbedDiv);
        videoDiv.appendChild(descriptionDiv);


        displayDiv.innerHTML = '';
        displayDiv.appendChild(videoDiv);




    }

    function displayMessage(message) {
        displayDiv.innerHTML = '';
        messageDiv.textContent = message;
        displayDiv.appendChild(messageDiv);
    }

    function loading() {
        displayDiv.innerHTML = '';
        displayDiv.appendChild(loadingDiv);
    }



})();