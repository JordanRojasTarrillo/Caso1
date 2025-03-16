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
    
</body>

</html>