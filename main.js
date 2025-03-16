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
     // Función para mostrar los detalles del video - MODIFICADA PARA UN VIDEO MÁS GRANDE
    function displayVideoDetails(videoData, videoId) {
        if (!videoData || !videoData.items || videoData.items.length === 0) {
            videoDetails.innerHTML = `
                <div class="alert alert-warning">
                    No se pudieron cargar los detalles del video.
                </div>
            `;
            return;
        }
        
        const video = videoData.items[0];
        const title = video.snippet.title;
        const description = video.snippet.description.replace(/\n/g, '<br>');
        const channelTitle = video.snippet.channelTitle;
        const publishedAt = new Date(video.snippet.publishedAt).toLocaleDateString();
        const viewCount = parseInt(video.statistics.viewCount).toLocaleString();
        const likeCount = parseInt(video.statistics.likeCount).toLocaleString();
        
        // Modificado para hacer el video más grande
        videoDetails.innerHTML = `
            <div class="row">
                <div class="col-lg-8">
                    <div class="video-container mb-3">
                        <iframe src="https://www.youtube.com/embed/${videoId}?autoplay=1" 
                                title="${title}" 
                                allowfullscreen></iframe>
                    </div>
                    <h4 class="mt-3">${title}</h4>
                    <div class="d-flex justify-content-between mb-3">
                        <span>
                            <i class="bi bi-person-circle"></i> ${channelTitle}
                        </span>
                        <span>
                            <i class="bi bi-eye"></i> ${viewCount} visualizaciones
                        </span>
                        <span>
                            <i class="bi bi-hand-thumbs-up"></i> ${likeCount} me gusta
                        </span>
                    </div>
                </div>
                <div class="col-lg-4">
                    <div class="card">
                        <div class="card-header bg-light">
                            <i class="bi bi-info-circle"></i> Información del video
                        </div>
                        <div class="card-body">
                            <p><strong>Fecha de publicación:</strong> ${publishedAt}</p>
                            <hr>
                            <h6>Descripción:</h6>
                            <div class="description-container" style="max-height: 300px; overflow-y: auto;">
                                <p>${description}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }
    // Función para mostrar los comentarios
    function displayComments(commentsData) {
        if (!commentsData || !commentsData.items || commentsData.items.length === 0) {
            videoComments.innerHTML = `
                <div class="alert alert-info">
                    No hay comentarios disponibles para este video.
                </div>
            `;
            return;
        }
        
        videoComments.innerHTML = '';
        
        commentsData.items.forEach(item => {
            const comment = item.snippet.topLevelComment.snippet;
            const authorName = comment.authorDisplayName;
            const authorProfileImg = comment.authorProfileImageUrl;
            const commentText = comment.textDisplay;
            const publishedAt = new Date(comment.publishedAt).toLocaleDateString();
            const likeCount = comment.likeCount;
            
            const commentElement = document.createElement('div');
            commentElement.className = 'comment-item';
            commentElement.innerHTML = `
                <div class="d-flex">
                    <div class="me-3">
                        <img src="${authorProfileImg}" alt="${authorName}" class="comment-avatar">
                    </div>
                    <div class="flex-grow-1">
                        <div class="d-flex justify-content-between">
                            <span class="comment-author">${authorName}</span>
                            <span class="comment-date">${publishedAt}</span>
                        </div>
                        <div class="comment-text">${commentText}</div>
                        <div class="mt-2">
                            <small><i class="bi bi-hand-thumbs-up"></i> ${likeCount}</small>
                        </div>
                    </div>
                </div>
            `;
            
            videoComments.appendChild(commentElement);
        });
    }
});