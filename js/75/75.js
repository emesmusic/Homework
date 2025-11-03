'use strict';
/* global google apiKeys */
(async function () {

    const displayDiv = document.getElementById('display-div');
    const mapWindow = document.getElementById('map');
    let sidebarList;
    let favoritesList;
    let openMarker;
    let zIndex = 0;
    let regularMarkers = [];
    let favoritesMarkers = [];
    let favoritesAndRegularMarkers = [];
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
            displayDiv.insertAdjacentHTML('afterbegin', `<aside class="bg-white shadow px-4 py-2 border-r-4 border-gray-400 xborder-black overflow-y-auto">
                <ul id="sidebar-list"></ul>
            </aside>`);
            displayDiv.classList.add('grid', 'grid-cols-[10%_90%]');
            sidebarList = document.getElementById('sidebar-list');
        }
        else {
            clearMarkers();
            if (openMarker)
                google.maps.event.trigger(openMarker.infoWindow, 'closeclick');
        }

        document.querySelector('#search-box').value = '';




        sidebarList.innerHTML = '';
        const bounds = new google.maps.LatLngBounds();

        wikipediaResults.geonames.forEach(result => {
            const img = document.createElement('img');
            img.style.width = '4rem';
            img.style.height = '3rem';
            img.classList.add('rounded-[10px]', 'border-4', 'border-black', 'hover:scale-150', 'hover:border-blue-500');
            //img.style.border = '1px solid black';
            //img.style.borderRadius = '10px';
            img.src = result.thumbnailImg || 'images/placeholder.jpg';

            bounds.extend({ lat: result.lat, lng: result.lng });


            const marker = new AdvancedMarkerElement({
                map,
                position: { lat: result.lat, lng: result.lng },
                title: result.title,
                content: img
            });
            regularMarkers.push(marker);

            const infoContent = document.createElement('div');
            const infoImage = document.createElement('img');
            infoImage.src = result.thumbnailImg || 'images/placeholder.jpg';
            infoImage.classList.add('rounded-[10px]', 'border', 'border-black', 'inline');
            infoImage.style.maxWidth = '120px';
            infoImage.style.maxHeight = '75px';

            const title = document.createElement('h3');
            title.innerText = result.title;
            title.classList.add('inline', 'font-bold', 'text-base');
            title.style.cssText += 'xfont-size:20px; margin-left:1rem; padding:0;';

            const summary = document.createElement('p');
            summary.innerText = result.summary;
            summary.style.cssText += 'margin:0; padding:2px 0 0 0; xfont-size:18px;';
            summary.classList.add('text-sm');

            const wikiLink = document.createElement('a');
            wikiLink.href = `https://${result.wikipediaUrl}`;
            wikiLink.target = '_blank';
            wikiLink.innerText = 'Open Wikipedia Page';
            wikiLink.classList.add('link', 'block', 'mt-2');


            const addToFavoriteDiv = document.createElement('div');
            addToFavoriteDiv.classList.add('link', 'cursor-pointer', 'mt-4');
            const favoritesImg = document.createElement('img');
            favoritesImg.src = 'images/favorite.webp';
            favoritesImg.alt = 'Add to favorites icon';
            favoritesImg.style.height = '1rem';
            favoritesImg.classList.add('inline-block');
            const addToFavoritesSpan = document.createElement('span');
            addToFavoritesSpan.innerText = 'Add to Favorites';
            addToFavoritesSpan.classList.add('font-semibold');
            addToFavoriteDiv.appendChild(favoritesImg);
            addToFavoriteDiv.appendChild(addToFavoritesSpan);


            infoContent.appendChild(infoImage);
            infoContent.appendChild(title);
            infoContent.appendChild(summary);
            infoContent.appendChild(wikiLink);
            infoContent.appendChild(addToFavoriteDiv);




            const infoWindow = new google.maps.InfoWindow({
                content: infoContent
            });
            marker.infoWindow = infoWindow;

            marker.addListener("click", () => {

                img.classList.add('border-blue-500', 'scale-150');
                if (openMarker) {
                    if (openMarker === marker) return;
                    openMarker.zIndex = openMarker.previousZIndex;
                    if (favoritesMarkers.includes(openMarker)) {
                        openMarker.favoritesListItem.classList.remove('scale-95', 'ease-in-out', 'duration-150', 'bg-blue-200', 'border-blue-500');
                        openMarker.favoritesListItem.classList.add('border-yellow-400');
                    }
                    google.maps.event.trigger(openMarker.infoWindow, 'closeclick');
                    // openMarker?.content?.classList.remove('border-blue-500', 'scale-150');
                    // openMarker?.sidebarListItem?.classList.remove('scale-95', 'ease-in-out', 'bg-blue-200', 'border-blue-500');
                    // openMarker?.sidebarListItem?.classList.add('text-gray-400', 'hover:text-black', 'hover:border-blue-500', 'border-gray-200');
                    // const sidebarImage = openMarker?.sidebarListItem?.querySelector('#sidebarImage');
                    // sidebarImage?.classList.add('grayscale', 'group-hover:grayscale-0', 'border-gray-400', 'group-hover:border-black', 'opacity-50', 'group-hover:opacity-100');

                }







                openMarker = marker;

                marker.previousZIndex = marker.zIndex;
                map.panTo(marker.position);

                infoWindow.open({ map, anchor: marker });
                marker.zIndex = ++zIndex;
                marker.sidebarListItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                marker.sidebarListItem.classList.add('scale-95', 'ease-in-out', 'bg-blue-200', 'border-blue-500');
                marker.sidebarListItem.classList.remove('text-gray-400', 'border-gray-200');
                marker.sidebarListItem.querySelector('#sidebarImage').classList.remove('grayscale', 'opacity-50', 'border-gray-400');


                if (favoritesMarkers.includes(marker)) {
                    marker.favoritesListItem.scrollIntoView({ behavior: 'smooth', block: 'center' });
                    marker.favoritesListItem.classList.add('scale-95', 'ease-in-out', 'duration-150', 'bg-blue-200', 'border-blue-500');
                    marker.favoritesListItem.classList.remove('border-yellow-400');




                }





            });
            marker.previousZIndex = marker.zIndex;
            marker.addEventListener('mouseenter', () => {
                marker.zIndex = ++zIndex;
            });

            marker.addEventListener('mouseleave', () => {
                if (openMarker !== marker) {
                    marker.zIndex = marker.previousZIndex;
                }
            });

            // marker.infoWindow.closeHandler = () => {
            // marker.infoWindow.close();
            // marker.content.classList.remove('border-blue-500', 'scale-150');
            // marker.sidebarListItem.classList.remove('scale-95', 'ease-in-out', 'bg-blue-200');
            // marker.sidebarListItem.classList.add('text-gray-400', 'hover:text-black', 'hover:border-gray-400', 'border-gray-200');
            // const sidebarImage = marker.sidebarListItem.querySelector('#sidebarImage');
            // sidebarImage.classList.add('grayscale', 'group-hover:grayscale-0', 'border-gray-400', 'group-hover:border-black', 'opacity-50', 'group-hover:opacity-100');
            //};











            infoWindow.addListener("closeclick", () => {
                //marker.infoWindow.closeHandler();
                marker.infoWindow.close();
                marker.content.classList.remove('border-blue-500', 'scale-150');
                marker.content.classList.add('border-black');
                marker.sidebarListItem.classList.remove('scale-95', 'ease-in-out', 'bg-blue-200');
                marker.sidebarListItem.classList.add('text-gray-400', 'hover:text-black', 'hover:border-gray-400', 'border-gray-200');
                const sidebarImage = marker.sidebarListItem.querySelector('#sidebarImage');
                sidebarImage.classList.add('grayscale', 'group-hover:grayscale-0', 'border-gray-400', 'group-hover:border-black', 'opacity-50', 'group-hover:opacity-100');
                if (favoritesMarkers.includes(marker)) {
                    marker.favoritesListItem.classList.remove('scale-95', 'ease-in-out', 'duration-150', 'bg-blue-200', 'border-blue-500');
                    marker.favoritesListItem.classList.add('border-yellow-400');
                }
                openMarker = null;


            });

            const sidebarListItem = document.createElement('li');

            sidebarListItem.classList.add('border-4', 'border-gray-400', 'p-4', 'mb-4', 'rounded-[10px]', 'shadow',
                'cursor-pointer', 'hover:bg-blue-200', 'active:scale-95',
                'transition', 'duration-150', 'ease-in-out', 'hover:scale-95',
                'flex', 'flex-col', 'justify-center', 'items-center',
                'text-center', 'text-sm', 'group', 'xfont-bold', 'h-25', 'hover:border-blue-500');
            sidebarListItem.innerHTML = `<img src="${result.thumbnailImg || 'images/placeholder.jpg'}" id="sidebarImage" class="rounded-[10px] border border-black" style="display:inline; margin-bottom:1rem; xborder-radius:10px; xborder:1px solid black; max-width:120px; max-height:75px">
                <h3 style="display:inline; padding:0; font-weight:bold">${result.title}</h3>` +/*<p style="margin:0; padding:2px 0 0 0; font-size:18px;">${result.summary}</p>*/
                `<a href="https://${result.wikipediaUrl}" target="_blank" style="display:block" class="link">Open Wikipedia Page</a>`;





            /*const sidebarListItemImage = document.createElement('img');
            sidebarListItemImage.src = result.thumbnailImg || 'images/placeholder.jpg';
            sidebarListItemImage.style = `margin - bottom: 1rem; border - radius: 10px; border: 1px solid black; max - width: 120px; max - height: 75px`;
            const sidebarListItemSummary = document.createElement('p');
            sidebarListItemSummary.innerText = `${ result.summary } `;
            sidebarListItem.innerText = `${ result.title } `;
            sidebarListItem.appendChild(sidebarListItemImage);
            sidebarListItem.appendChild(sidebarListItemSummary);*/
            sidebarList.appendChild(sidebarListItem);

            sidebarListItem.addEventListener('click', () => {
                google.maps.event.trigger(marker, 'click');
            });

            marker.sidebarListItem = sidebarListItem;



            addToFavoriteDiv.addEventListener('click', () => {


                if (favoritesMarkers.includes(marker)) return;

                if (favoritesMarkers.length === 0) {
                    if (!favoritesList) {


                        favoritesList = document.createElement('aside');
                        favoritesList.classList.add('bg-white', 'shadow', 'xpx-4', 'py-2', 'border-l-4', 'border-gray-400', 'xborder-black', 'overflow-y-auto');
                        favoritesList.innerHTML = ` <h2 class="font-bold text-center  border-b-4 border-gray-400 pb-2 mb-2">Favorites</h2><ul id="favorites-list"></ul>`;
                        displayDiv.appendChild(favoritesList);






                    }
                    else {
                        displayDiv.appendChild(favoritesList);
                    }
                    displayDiv.classList.add('grid-cols-[10%_70%_20%]');

                }



                const addToFavoritesSpan = marker.infoWindow.content.removeChild(marker.infoWindow.content.lastElementChild);




                if (!marker.favoritesListItem) {
                    const favoritesListItem = document.createElement('li');

                    favoritesListItem.classList.add('border-4', 'border-blue-500', 'p-4', 'mb-4', 'rounded-[10px]', 'shadow',
                        'cursor-pointer', 'hover:bg-blue-200', 'active:scale-95',
                        'transition', 'duration-150', 'ease-in-out', 'hover:scale-95', 'scale-95',
                        'flex', 'flex-col', 'bg-blue-200', 'justify-center', 'items-center',
                        'text-center', 'text-sm', 'group', 'xfont-bold', 'h-25', 'hover:border-blue-500', 'mx-3');
                    favoritesListItem.innerHTML = `<img src="${result.thumbnailImg || 'images/placeholder.jpg'}" id = "sidebarImage" class="rounded-[10px] border-2 border-yellow-400" style = "display:inline; margin-bottom:1rem; xborder-radius:10px; xborder:1px solid black; max-width:120px; max-height:75px" >
                <h3 style="display:inline; padding:0; font-weight:bold" class="xtext-base">${result.title}</h3><p style="margin:0; padding:2px 0 0 0;" class="xtext-base">${result.summary}</p>
                    <a href="https://${result.wikipediaUrl}" target="_blank" style="display:block" class="link mt-2">Open Wikipedia Page</a>`;

                    let removeFromFavorites = document.createElement('div');
                    removeFromFavorites.classList.add('cursor-pointer', 'rounded-[10px]', 'border-2', 'border-black', 'bg-white', 'p-2', 'mt-4', 'link-cancel', 'hover:border-red-500', 'hover:bg-red-100');
                    removeFromFavorites.innerText = 'Remove from Favorites';
                    favoritesListItem.appendChild(removeFromFavorites);







                    marker.favoritesListItem = favoritesListItem;


                    favoritesListItem.addEventListener('click', () => {
                        google.maps.event.trigger(marker, 'click');
                    });


                    removeFromFavorites.addEventListener('click', (e) => {
                        e.stopPropagation();
                        if (favoritesAndRegularMarkers.includes(marker)) {
                            marker.content.style.width = '4rem';
                            marker.content.style.height = '3rem';
                            marker.content.classList.add('rounded-[10px]', 'border-4', 'hover:scale-150', 'hover:border-blue-500');
                            if (openMarker === marker) {
                                marker.content.classList.add('border-blue-500');
                            }
                            else {
                                marker.content.classList.add('border-black');
                            }
                            marker.content.src = result.thumbnailImg || 'images/placeholder.jpg';
                            regularMarkers.push(marker);

                            favoritesAndRegularMarkers.splice(favoritesAndRegularMarkers.indexOf(marker), 1);

                        }
                        else {
                            marker.map = null;
                        }

                        marker.infoWindow.content.appendChild(addToFavoritesSpan);


                        favoritesMarkers.splice(favoritesMarkers.indexOf(marker), 1);
                        favoritesListItem.remove();
                        if (favoritesMarkers.length === 0) {
                            favoritesList.remove();
                            displayDiv.classList.remove('grid-cols-[10%_70%_20%]');
                            displayDiv.classList.add('grid-cols-[10%_90%]');

                        }


                    });

                }
                marker.content.src = 'images/favorite-final.png';
                marker.content.alt = "Favorite marker";
                marker.content.className = 'scale-150 hover:scale-150';
                marker.content.zIndex = ++zIndex;

                favoritesMarkers.push(marker);
                favoritesAndRegularMarkers.push(marker);
                regularMarkers.splice(regularMarkers.indexOf(marker), 1);

                favoritesList.appendChild(marker.favoritesListItem);
                marker.favoritesListItem.scrollIntoView({ behavior: 'smooth', block: 'center' });

            });


        });
        document.querySelectorAll('a').forEach(link => link.addEventListener('click', (e) => e.stopPropagation()));

        map.fitBounds(bounds);


    });


    map.addListener('click', () => {

        if (openMarker)
            google.maps.event.trigger(openMarker.infoWindow, 'closeclick');
    });



    function clearMarkers() {
        regularMarkers.forEach(marker => marker.map = null);
        regularMarkers = [];
        favoritesAndRegularMarkers = [];
    }


})();