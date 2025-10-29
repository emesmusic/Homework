'use strict';
/* global google apiKeys */
(async function () {

    const displayDiv = document.getElementById('display-div');
    const mapWindow = document.getElementById('map');
    let sidebarList;
    let openInfoWindow;
    let zIndex = 0;
    let markers = [];
    let firstSearch = true;


    const { Map } = await google.maps.importLibrary("maps");
    const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");
    const map = new Map(mapWindow, {
        center: { lat: 5.292721, lng: - 27.616713, },
        zoom: 3,
        mapId: 'DEMO_MAP_ID',
        zoomControl: true

    });


    document.getElementById('search-button').addEventListener('click', async (e) => {
        e.preventDefault();
        if (!document.getElementById('search-box').value || document.getElementById('search-box').value.trim() === '') {
            document.getElementById('message').textContent = 'Please enter a search term!';
            document.getElementById('message').classList.add('text-red-500');
            return;
        }

        let wikipediaResults;
        try {
            const response = await fetch(`http://api.geonames.org/wikipediaSearchJSON?q=${document.getElementById('search-box').value}&username=${apiKeys.geonames}&maxRows=${document.getElementById('results-number').value}`);
            if (!response.ok) {
                throw new Error(`${response.status} - ${response.statusText}`);
            }
            wikipediaResults = await response.json();
        }
        catch (error) {
            document.getElementById('message').textContent = `Error: ${error.message}`;
            document.getElementById('message').classList.add('text-red-500');

            return;
        }
        if (wikipediaResults.geonames.length === 0) {
            document.getElementById('message').textContent = 'No results found!';
            document.getElementById('message').classList.add('text-red-500');
            return;
        }

        document.getElementById('message').classList.remove('text-red-500');
        document.getElementById('message').textContent = 'Search for places!';


        if (firstSearch) {
            firstSearch = false;
            displayDiv.insertAdjacentHTML('afterbegin', `<aside class="sidebar bg-white shadow px-4 py-2 border-r-4 border-gray-400 xborder-black overflow-y-auto">
                <ul id="sidebar-list"></ul>
            </aside>`);
            displayDiv.style.display = 'grid';
            displayDiv.style.gridTemplateColumns = '20% 80%';
            sidebarList = document.getElementById('sidebar-list');
        }
        else {
            clearMarkers();
        }

        document.querySelector('#search-box').value = '';

        sidebarList.innerHTML = '';
        const bounds = new google.maps.LatLngBounds();

        wikipediaResults.geonames.forEach(result => {
            const img = document.createElement('img');
            img.style.width = '4rem';
            img.style.height = '3rem';

            img.style.border = '1px solid black';
            img.style.borderRadius = '10px';
            img.src = result.thumbnailImg || 'images/placeholder.jpg';

            bounds.extend({ lat: result.lat, lng: result.lng });


            const marker = new AdvancedMarkerElement({
                map,
                position: { lat: result.lat, lng: result.lng },
                title: result.title,
                content: img
            });
            markers.push(marker);
            const infoWindow = new google.maps.InfoWindow({
                content: `<img src="${result.thumbnailImg || 'images/placeholder.jpg'}" style="display:inline; margin-bottom:1rem; border-radius:10px; border:1px solid black; max-width:120px; max-height:75px">
                <h3 style="display:inline;font-size:20px; margin-left:1rem; padding:0; font-weight:bold">${result.title}</h3><p style="margin:0; padding:2px 0 0 0; font-size:18px;">${result.summary}</p>
                <a href="https://${result.wikipediaUrl}" target="_blank" style="margin-top:1rem; display:block" class="link">Open Wikipedia Page</a>`

            });
            infoWindow.marker = marker;


            marker.addListener("click", () => {
                openInfoWindow?.close();
                openInfoWindow?.marker?.sidebarListItem?.classList.remove('scale-95', 'ease-in-out', 'bg-blue-200');
                openInfoWindow?.marker?.sidebarListItem?.classList.add('text-gray-400', 'hover:text-black', 'hover:border-gray-400', 'border-gray-200');
                const sidebarImage = openInfoWindow?.marker?.sidebarListItem?.querySelector('#sidebarImage');
                sidebarImage?.classList.add('grayscale', 'group-hover:grayscale-0', 'border-gray-400', 'group-hover:border-black', 'opacity-50', 'group-hover:opacity-100');
                //sidebarImage?.classList.remove('border');
                openInfoWindow = infoWindow;

                infoWindow.open({ map, anchor: marker });
                marker.zIndex = ++zIndex;
                marker.sidebarListItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                marker.sidebarListItem.classList.add('scale-95', 'ease-in-out', 'bg-blue-200');
                marker.sidebarListItem.classList.remove('text-gray-400', 'border-gray-200');
                marker.sidebarListItem.querySelector('#sidebarImage').classList.remove('grayscale', 'opacity-50', 'border-gray-400');
                // marker.sidebarListItem.querySelector('#sidebarImage').classList.add('border');


            });

            const sidebarListItem = document.createElement('li');

            sidebarListItem.classList.add('border-4', 'border-gray-400', 'p-4', 'mb-4', 'rounded-[10px]', 'shadow',
                'cursor-pointer', 'hover:bg-blue-200', 'active:scale-95',
                'transition', 'duration-150', 'ease-in-out', 'hover:scale-95',
                'flex', 'flex-col', 'justify-center', 'items-center',
                'text-center', 'text-sm', 'group', 'xfont-bold', 'h-25');
            sidebarListItem.innerHTML = `<img src="${result.thumbnailImg || 'images/placeholder.jpg'}" id="sidebarImage" class="rounded-[10px] border border-black" style="display:inline; margin-bottom:1rem; xborder-radius:10px; xborder:1px solid black; max-width:120px; max-height:75px">
                <h3 style="display:inline;font-size:1rem; padding:0; font-weight:bold">${result.title}</h3>` +/*<p style="margin:0; padding:2px 0 0 0; font-size:18px;">${result.summary}</p>*/
                `<a href="https://${result.wikipediaUrl}" target="_blank" style="display:block" class="link">Open Wikipedia Page</a>`;


            /*const sidebarListItemImage = document.createElement('img');
            sidebarListItemImage.src = result.thumbnailImg || 'images/placeholder.jpg';
            sidebarListItemImage.style = `margin-bottom:1rem; border-radius:10px; border:1px solid black; max-width:120px; max-height:75px`;
            const sidebarListItemSummary = document.createElement('p');
            sidebarListItemSummary.innerText = `${result.summary}`;
            sidebarListItem.innerText = `${result.title}`;
            sidebarListItem.appendChild(sidebarListItemImage);
            sidebarListItem.appendChild(sidebarListItemSummary);*/
            sidebarList.appendChild(sidebarListItem);

            sidebarListItem.addEventListener('click', () => {
                google.maps.event.trigger(marker, 'click');
            });

            marker.sidebarListItem = sidebarListItem;




        });
        document.querySelector('a').addEventListener('click', (e) => e.stopPropagation());
        map.fitBounds(bounds);


    });


    map.addListener('click', () => openInfoWindow?.close());



    function clearMarkers() {
        markers.forEach(marker => marker.map = null);
        markers = [];
    }


})();