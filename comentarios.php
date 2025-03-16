<?php
// Configuración de la API de YouTube
$api_key = 'AIzaSyBdDsQeeEx1G4SPw--o-Gduthoe6K1XH1A';
$api_url = 'https://www.googleapis.com/youtube/v3/';

// Verificar si se ha enviado un ID de video
if (!isset($_GET['video_id']) || empty($_GET['video_id'])) {
    sendErrorResponse('No se especificó un ID de video');
}

$video_id = $_GET['video_id'];
$maxResults = isset($_GET['max_results']) ? intval($_GET['max_results']) : 20;

// Obtener comentarios del video
getVideoComments($video_id, $maxResults);

/**
 * Obtiene los comentarios de un video específico
 * 
 * @param string $video_id ID del video
 * @param int $maxResults Número máximo de comentarios
 */
function getVideoComments($video_id, $maxResults) {
    global $api_key, $api_url;
    
    // Construir la URL de la API
    $url = $api_url . 'commentThreads?' . http_build_query([
        'part' => 'snippet',
        'videoId' => $video_id,
        'maxResults' => $maxResults,
        'textFormat' => 'html',
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