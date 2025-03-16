<?php
// Configuración de la API de YouTube
$api_key = 'AIzaSyBdDsQeeEx1G4SPw--o-Gduthoe6K1XH1A';
$api_url = 'https://www.googleapis.com/youtube/v3/';

// Verificar si se ha enviado una acción
if (!isset($_GET['action'])) {
    sendErrorResponse('No se especificó ninguna acción');
}

// Procesar la acción solicitada
$action = $_GET['action'];

switch ($action) {
    case 'search':
        // Verificar si se ha enviado un término de búsqueda
        if (!isset($_GET['q']) || empty($_GET['q'])) {
            sendErrorResponse('No se especificó un término de búsqueda');
        }
        
        $query = $_GET['q'];
        $maxResults = isset($_GET['max_results']) ? intval($_GET['max_results']) : 12;
        
        // Realizar la búsqueda
        searchVideos($query, $maxResults);
        break;
        
    default:
        sendErrorResponse('Acción no válida');
}


?>