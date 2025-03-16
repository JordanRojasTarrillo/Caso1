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
});