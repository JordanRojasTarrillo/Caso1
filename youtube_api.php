<?php
// Configuración de la API de YouTube
$api_key = 'AIzaSyBdDsQeeEx1G4SPw--o-Gduthoe6K1XH1A';
$api_url = 'https://www.googleapis.com/youtube/v3/';


//Conflictos con este archivo creare un nuevo commit que no genere problemas sobre este 
//Coloca simbolos raros inusual 
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
/**
 * Busca videos en YouTube según el término de búsqueda
 * 
 * @param string $query Término de búsqueda
 * @param int $maxResults Número máximo de resultados
 */
function searchVideos($query, $maxResults) {
    global $api_key, $api_url;
    
    // Construir la URL de la API
    $url = $api_url . 'search?' . http_build_query([
        'part' => 'snippet',
        'q' => $query,
        'maxResults' => $maxResults,
        'type' => 'video',
        'key' => $api_key
    ]);
    

    // Realizar la solicitud a la API
    $response = makeApiRequest($url);
    
    // Enviar la respuesta
    header('Content-Type: application/json');
    echo $response;
}




/**
 * Realiza una solicitud a la API de YouTube
 * 
 * @param string $url URL de la API
 * @return string Respuesta de la API
 */
function makeApiRequest($url) {
    // Inicializar cURL
    $ch = curl_init();
    
    // Configurar opciones de cURL
    curl_setopt($ch, CURLOPT_URL, $url);
    curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
    curl_setopt($ch, CURLOPT_SSL_VERIFYPEER, false);
    
    // Ejecutar la solicitud
    $response = curl_exec($ch);
    
    // Verificar si hubo errores
    if (curl_errno($ch)) {
        sendErrorResponse('Error en la solicitud cURL: ' . curl_error($ch));
    }
    
    // Cerrar la conexión cURL
    curl_close($ch);
    
    return $response;
}



/**
 * Envía una respuesta de error en formato JSON
 * 
 * @param string $message Mensaje de error
 */




function sendErrorResponse($message) {
    header('Content-Type: application/json');
    echo json_encode(['error' => true, 'message' => $message]);
    exit;
}
?>