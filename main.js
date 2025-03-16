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
});