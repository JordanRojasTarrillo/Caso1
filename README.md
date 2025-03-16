# Aplicación de Búsqueda de YouTube

![Aplicación de Búsqueda de YouTube](https://img.shields.io/badge/YouTube-Búsqueda-red)
![Bootstrap 5](https://img.shields.io/badge/Bootstrap-5.1.3-purple)
![PHP](https://img.shields.io/badge/PHP-7.4+-blue)
![JavaScript](https://img.shields.io/badge/JavaScript-ES6-yellow)

Una aplicación web responsiva que permite a los usuarios buscar videos de YouTube, ver resultados de búsqueda y acceder a información detallada sobre cada video, incluyendo estadísticas y comentarios.

## 📋 Características

- **Búsqueda de Videos**: Busca videos de YouTube usando palabras clave
- **Diseño de Cuadrícula Responsiva**: Visualiza los resultados de búsqueda en un diseño de tarjetas limpio y responsivo
- **Detalles del Video**: Haz clic en cualquier video para ver información detallada que incluye:
  - Reproductor de video integrado
  - Contador de visualizaciones
  - Contador de "me gusta"
  - Fecha de publicación
  - Información del canal
  - Descripción completa
- **Sección de Comentarios**: Visualiza los comentarios de cada video
- **Diseño Responsivo**: Funciona en dispositivos de escritorio, tabletas y móviles
- **Indicadores de Carga**: Retroalimentación visual durante las solicitudes a la API

## 🖼️ Capturas de Pantalla

*[Considera añadir capturas de pantalla de tu aplicación aquí]*

## 🛠️ Tecnologías Utilizadas

- **Frontend**:
  - HTML5
  - CSS3
  - JavaScript (ES6+)
  - Bootstrap 5.1.3
  - Bootstrap Icons
  
- **Backend**:
  - PHP
  - YouTube Data API v3

## 📁 Estructura del Proyecto

```
├── index.php              # Estructura HTML principal
├── styles.css             # Estilos CSS personalizados
├── main.js                # Funcionalidad JavaScript
├── youtube_api.php        # Script PHP para solicitudes de búsqueda a la API de YouTube
├── detalles_video.php     # Script PHP para obtener detalles del video
└── comentarios.php        # Script PHP para obtener comentarios del video
```

## ⚙️ Instalación

1. Clona este repositorio:
   ```bash
   git clone https://github.com/tuusuario/youtube-search-app.git
   ```

2. Coloca los archivos en el directorio de tu servidor web (por ejemplo, htdocs para XAMPP)

3. Obtén una clave de API de YouTube Data:
   - Ve a [Google Cloud Console](https://console.cloud.google.com/)
   - Crea un nuevo proyecto
   - Habilita la API de YouTube Data v3
   - Crea credenciales de API
   - Copia tu clave de API

4. Configura tu clave de API en los archivos PHP:
   - Abre `youtube_api.php`, `detalles_video.php` y `comentarios.php`
   - Reemplaza `YOUR_API_KEY` con tu clave de API de YouTube Data real

5. Accede a la aplicación a través de tu servidor web (por ejemplo, http://localhost/youtube-search-app)

## 🚀 Uso

1. Ingresa un término de búsqueda en el cuadro de búsqueda
2. Haz clic en el botón "Buscar" o presiona Enter
3. Navega por los resultados de búsqueda
4. Haz clic en cualquier tarjeta de video para ver información detallada
5. Mira el video directamente en el modal
6. Desplázate hacia abajo para ver los comentarios del video

## 🔧 Configuración

Puedes modificar los siguientes archivos para personalizar la aplicación:

- `styles.css`: Cambia la apariencia visual
- `main.js`: Modifica la funcionalidad JavaScript
- Archivos PHP: Ajusta los parámetros de la API o el manejo de respuestas

## 📝 Límites de la API

La API de YouTube Data tiene límites de uso. Por defecto, tienes una cuota de 10,000 unidades por día. Diferentes operaciones consumen diferentes cantidades de cuota:

- Solicitud de búsqueda: 100 unidades
- Solicitud de detalles de video: 1 unidad
- Solicitud de comentarios: 1 unidad

Monitorea tu uso en la Consola de Google Cloud para evitar exceder los límites.

## 🤝 Contribuciones

¡Las contribuciones son bienvenidas! No dudes en enviar un Pull Request.

1. Haz un fork del repositorio
2. Crea tu rama de características (`git checkout -b feature/caracteristica-asombrosa`)
3. Haz commit de tus cambios (`git commit -m 'Añadir alguna característica asombrosa'`)
4. Haz push a la rama (`git push origin feature/caracteristica-asombrosa`)
5. Abre un Pull Request

## 📄 Licencia

Este proyecto está licenciado bajo la Licencia MIT - consulta el archivo LICENSE para más detalles.

## 🙏 Agradecimientos

- [YouTube Data API](https://developers.google.com/youtube/v3)
- [Bootstrap](https://getbootstrap.com/)
- [Bootstrap Icons](https://icons.getbootstrap.com/)
