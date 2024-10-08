async function initialize() {
  console.log("Cargando mapa...");
  var coord = { lat: -34.5956145, lng: -58.4431949 };
  var map = new google.maps.Map(document.getElementById('map'), {
    zoom: 10,
    center: coord //Centra el mapa en las cordenadas provistas para la vista inicial.
  });

  //Desactiva los iconos por defecto para que no se superpongan con nuestro iconos personalizados.
  map.data.setStyle({
    icon: " " //Poner null no funciona, es necesario poner un objeto vacío
  });

  //Obtiene la información de la ventana
  var infowindow = new google.maps.InfoWindow()

  //Inicializa los marcadores
  //obtiene los objetos dentro del array "features"
  map.data.loadGeoJson('./marcadores.json', null, function (features) {
    //Crea un array con los objetos(marcadores) encontrados
    markers = features.map(function (feature) {
      //Obtiene los datos de latitud y longitud para cada marcador
      var pos = {
        lat: feature.getGeometry().get().lat(),
        lng: feature.getGeometry().get().lng()
      };
      //Obtiene el icono personalizado para cada marcador
      var iconUrl = feature.getProperty('icon'); // Obtener la URL del icono desde las propiedades

      //Crea el marcador con las propiedades asignadas
      var marker = new google.maps.Marker({
        position: pos,
        icon: iconUrl,
        map: map //Esta linea es necesaria para que reconozca el icono
      });

      //Crea el contenido para el cartel de cada marcador
      var content = '<div class="content-titulo"><div><h6 class="text-1">Parque ' +
        feature.getProperty('Titulo') + '</h6></div><div><p class="fw-normal"> <span class="text-upeercase fw-normal fs-14">' +
        feature.getProperty('Direccion') + ' ' +
        feature.getProperty('Direccion_Num') /*+ ' ' + feature.getProperty('location_longitud') + ' ' + feature.getProperty('location_latitud')*/ +
        '</span>, ' + feature.getProperty('Localidad') + ', ' + feature.getProperty('Provincia') +
        ' </p></div><a href="https://www.google.com/maps/search/?api=1&query=CAFETERIA%20' + //CAFETERIA puede ser reemplazado por la busqueda que se indexa en google maps
        feature.getProperty('Titulo') + '%20' + feature.getProperty('Direccion') + '%20' +
        feature.getProperty('Direccion_Num') + '" target="_blank">Ver en Google Maps</a>';


      
      google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
        return function () {
          infowindow.setContent(content); //Escribe el contenido 
          infowindow.open(map, marker); //Abre el cartel del marcador al hacer click sobre el icono
          map.panTo(marker.getPosition()); //Recupera la posición del marcador

          //zoom mapa
          console.log("click en icono")
          map.setZoom(22); //Hace zoom sobre el marcador
        };
      })(marker, content, infowindow));
      return marker; //retorna cada marcador antes de seguir iterando
    });

    // Crear el MarkerClusterer
    var markerCluster = new MarkerClusterer(map, markers, {
      // styles: [{
      //   textColor: 'white',
      //   url: '../images/m2.png', //Se puede cargar cualquier imagen en formato png
      //   height: 50,
      //   width: 50,
      //   textSize: 20,
      // }],
    });
  });
  
  map.data.setMap(null);
}


google.maps.event.addDomListener(window, "load", initialize);