document.addEventListener('DOMContentLoaded', function() {
    // Referencias a elementos del DOM
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results');
    const loadingIndicator = document.getElementById('loading');
    const videoModal = new bootstrap.Modal(document.getElementById('videoModal'));
    const videoDetails = document.getElementById('video-details');
    const videoComments = document.getElementById('video-comments');

    // Evento para el formulario de búsqueda
    searchForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        
        if (searchTerm) {
            // Mostrar indicador de carga
            resultsContainer.innerHTML = '';
            loadingIndicator.classList.remove('d-none');
            
            // Realizar la búsqueda
            searchVideos(searchTerm);
        }
    });

    // Función para buscar videos
    function searchVideos(query) {
        fetch(`youtube_api.php?action=search&q=${encodeURIComponent(query)}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Error en la respuesta de la API');
                }
                return response.json();
            })
            .then(data => {
                loadingIndicator.classList.add('d-none');
                displayResults(data.items);
            })
            .catch(error => {
                loadingIndicator.classList.add('d-none');
                resultsContainer.innerHTML = `
                    <div class="col-12 text-center">
                        <div class="alert alert-danger">
                            Error al buscar videos: ${error.message}
                        </div>
                    </div>
                `;
                console.error('Error:', error);
            });
    }
    // Función para mostrar los resultados
    function displayResults(videos) {
        if (!videos || videos.length === 0) {
            resultsContainer.innerHTML = `
                <div class="col-12 text-center">
                    <div class="alert alert-info">
                        No se encontraron resultados para tu búsqueda.
                    </div>
                </div>
            `;
            return;
        }

        resultsContainer.innerHTML = '';
        
        videos.forEach(video => {
            // Obtener información del video
            const videoId = video.id.videoId;
            const title = video.snippet.title;
            const thumbnail = video.snippet.thumbnails.high.url;
            const channelTitle = video.snippet.channelTitle;
            const publishedAt = new Date(video.snippet.publishedAt).toLocaleDateString();
            
            // Crear tarjeta para el video
            const videoCard = document.createElement('div');
            videoCard.className = 'col';
            videoCard.innerHTML = `
                <div class="card h-100 video-card" data-video-id="${videoId}">
                    <div class="video-thumbnail">
                        <img src="${thumbnail}" alt="${title}" class="card-img-top">
                    </div>
                    <div class="card-body">
                        <h5 class="video-title">${title}</h5>
                        <p class="video-channel">${channelTitle}</p>
                        <div class="video-stats">
                            <span><i class="bi bi-calendar"></i> ${publishedAt}</span>
                            <span><i class="bi bi-eye"></i> Ver detalles</span>
                        </div>
                    </div>
                </div>
            `;
            
            // Agregar evento de clic para mostrar detalles
            videoCard.querySelector('.video-card').addEventListener('click', function() {
                const videoId = this.getAttribute('data-video-id');
                showVideoDetails(videoId);
            });
            
            resultsContainer.appendChild(videoCard);
        });
    }
   // Función para mostrar detalles del video
   function showVideoDetails(videoId) {
    // Mostrar indicador de carga en el modal
    videoDetails.innerHTML = `
        <div class="text-center p-5">
            <div class="spinner-border text-danger" role="status">
                <span class="visually-hidden">Cargando...</span>
            </div>
        </div>
    `;
    videoComments.innerHTML = '';
    
    // Mostrar el modal
    videoModal.show();
    
    // Cargar detalles del video
    fetch(`detalles_video.php?video_id=${videoId}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los detalles del video');
            }
            return response.json();
        })
        .then(data => {
            displayVideoDetails(data, videoId);
            
            // Cargar comentarios
            return fetch(`comentarios.php?video_id=${videoId}`);
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cargar los comentarios');
            }
            return response.json();
        })
        .then(data => {
            displayComments(data);
        })
        .catch(error => {
            videoDetails.innerHTML = `
                <div class="alert alert-danger">
                    Error: ${error.message}
                </div>
            `;
            console.error('Error:', error);
        });
}
});