<?php
// Configuración de la API de YouTube
$api_key = 'AIzaSyBdDsQeeEx1G4SPw--o-Gduthoe6K1XH1A';
$api_url = 'https://www.googleapis.com/youtube/v3/';

// Verificar si se ha enviado un ID de video
if (!isset($_GET['video_id']) || empty($_GET['video_id'])) {
    sendErrorResponse('No se especificó un ID de video');
}

$video_id = $_GET['video_id'];

// Obtener detalles del video
getVideoDetails($video_id);

/**
 * Obtiene los detalles de un video específico
 * 
 * @param string $video_id ID del video
 */

?>