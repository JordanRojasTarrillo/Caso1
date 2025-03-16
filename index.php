<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Buscador de YouTube</title>
    <!-- Bootstrap 5 CSS -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Bootstrap Icons -->
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.8.1/font/bootstrap-icons.css">
    <!-- Estilos personalizados -->
    <link rel="stylesheet" href="styles.css">
</head>

<body>
    <div class="container mt-5">
        <div class="row justify-content-center">
            <div class="col-md-8">
                <div class="card shadow">
                    <div class="card-header bg-danger text-white">
                        <h1 class="text-center mb-0">
                            <i class="bi bi-youtube"></i> Buscador de YouTube
                        </h1>
                    </div>
                    <div class="card-body">
                        <form id="search-form" class="mb-4">
                            <div class="input-group">
                                <input type="text" id="search-input" class="form-control" placeholder="Buscar videos..."
                                    required>
                                <button type="submit" class="btn btn-danger">
                                    <i class="bi bi-search"></i> Buscar
                                </button>
                            </div>
                        </form>

                        <div id="results" class="row row-cols-1 row-cols-md-3 g-4"></div>
                        <div id="loading" class="text-center d-none">
                            <div class="spinner-border text-danger" role="status">
                                <span class="visually-hidden">Cargando...</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <!-- Modal para detalles del video - MODIFICADO PARA VIDEO MÁS GRANDE -->
    <div class="modal fade" id="videoModal" tabindex="-1" aria-labelledby="videoModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-xl"> <!-- Cambiado a modal-xl para hacerlo extra grande -->
            <div class="modal-content">
                <div class="modal-header bg-danger text-white">
                    <h5 class="modal-title" id="videoModalLabel">Detalles del Video</h5>
                    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="modal"
                        aria-label="Close"></button>
                </div>
                <div class="modal-body p-0"> <!-- Quitado el padding para maximizar espacio -->
                    <div class="row g-0"> <!-- Sin gutters para maximizar espacio -->
                        <div class="col-12">
                            <div id="video-details" class="video-details-container">
                                <!-- El contenido se llenará dinámicamente desde JavaScript -->
                            </div>
                        </div>
                    </div>
                    <div class="p-3"> <!-- Padding solo para la sección de comentarios -->
                        <h4>Comentarios</h4>
                        <div id="video-comments" class="mt-3"></div>
                    </div>
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Cerrar</button>
                </div>
            </div>
        </div>
    </div>
    <!-- Bootstrap 5 JS Bundle with Popper -->
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js"></script>
    <!-- Script personalizado -->
    <script src="main.js"></script>
</body>

</html>