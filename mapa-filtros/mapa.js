//Declaración de variables
let map;
let pos;
let zoomLevel = window.innerWidth > 768 ? 11.5 : 9;
let farmacias = [];
let esClickOnMarker = false;

let latMap = -34.62806412044143;
let lonMap = -58.59426151657458;
let zoomMap = zoomLevel;

//Guarda los últimos datos seleccionados por el usuario
let provinciaSeleccionada = "";
let localidadSeleccionada = "";

//Testing
console.log("Esta es mi ubicación" + provinciaSeleccionada + localidadSeleccionada);

//Chekcbox -> Reinicia el mapa para reimprimir los marcadores
var isChecked = false;
const checkbox = document.getElementById('checkbox');

checkbox.addEventListener('click', function (e) {
  isChecked = checkbox.checked;
  console.log(isChecked);
  limpiarRecuadros();
  initMap();
});


//Carga asincrona del JSON
(async function () {
  const url = "./marcadores.json";
  const response = await fetch(url);
  const result = await response.json();
  farmacias.push(result.features);
  setProvincias();
  updateListFarmaciasVisibles();
})();


//Lista de provincias y localidades obtenidas del json
const provincias = [];
const localidades = [];



document.addEventListener('DOMContentLoaded', async () => {
  const formulario = document.querySelector('#filtrar-mapa');
  const selectProvincias = document.querySelector('#provincias');
  const selectLocalidades = document.querySelector('#localidades');

  // Asignar los eventos a los selectores
  selectProvincias.addEventListener('change', handleProvinciaChange);
  selectLocalidades.addEventListener('change', handleLocalidadChange);

  formulario.addEventListener('submit', handleSubmit);

  /*Cuando se cambia el estado del checkbox se vuelve a inicializar el mapa, para poder recargar los marcadores, pero se guardan las variables de provincia y localidad para no reiniciar la ubicación  */
  document.getElementById('checkbox').addEventListener('click', function () {
    initMap();
    provinciaSelected(provinciaSeleccionada);
    localidadSelected(localidadSeleccionada);
  });

});


//Crea opciones de provincias a partir de la información que obtiene del JSON
function setProvincias() {
  let provincias = [];

  // Extraer las provincias de las farmacias
  farmacias[0].forEach(farmacia => {
    provincias.push(farmacia.properties.Provincia.toUpperCase());
  });


  // Eliminar duplicados y ordenar alfabéticamente
  provincias = Array.from(new Set(provincias)).sort();

  // Seleccionar el elemento del DOM
  const selector = document.getElementById('provincias');

  // Crear y agregar opciones al select
  provincias.forEach(p => {
    let option = document.createElement('option');
    option.value = p;
    option.textContent = p;
    selector.appendChild(option);
  });
}


//Vacia los recuadros que se agregaron al html con la información de las farmacias encontradas 
function limpiarRecuadros() {
  const contenedor = document.getElementById('farmacias-container');
  if (contenedor) {
    contenedor.innerHTML = ''; // Vacía todo el contenido del contenedor
  }
}

// Función para manejar el evento y obtener la provincia seleccionada
function handleProvinciaChange(e) {
  let provinciaSeleccionada = e.target.value.toUpperCase();
  provinciaSelected(provinciaSeleccionada);
  console.log("Esta es mi provincia" + provinciaSeleccionada);
  limpiarRecuadros();
}


// Función para manejar el evento y obtener la localidad seleccionada
function handleLocalidadChange(e) {
  let localidadSeleccionada = e.target.value.toUpperCase();
  localidadSelected(localidadSeleccionada);
  console.log("Esta es mi localidad" + localidadSeleccionada);
  limpiarRecuadros();
}

// Función para manejar la lógica de la provincia seleccionada
async function provinciaSelected(nombreProvincia) {
  const puntos = farmacias[0].filter(f => f.properties.Provincia.toUpperCase() === nombreProvincia);
  console.log("Provincia seleccionada:", nombreProvincia);

  if (puntos.length > 0) {
    const { lon, lat, zoom } = obtener_cordenadasZoom(nombreProvincia);
    centerMap(lat, lon, zoom);

    latMap = lat;
    lonMap = lon;
    zoomMap = zoom;

    // Filtrar y eliminar duplicados de localidades
    const localidades = [...new Set(puntos.map(f => f.properties.Localidad?.toUpperCase() || ''))].sort();

    console.log(localidades);

    // Limpiar y actualizar la lista de localidades
    const datalistCiudades = document.getElementById("ciudades");
    const inputLocalidad = document.getElementById("localidades");

    // Limpia el contenido del datalist
    datalistCiudades.innerHTML = "";

    // Limpia el contenido del input
    inputLocalidad.value = "";

    // Agregar las nuevas opciones
    localidades.forEach(l => {
      let option = document.createElement('option');
      option.value = l;
      datalistCiudades.appendChild(option);
    });
  } else {
    console.log("No se encontraron localidades para la provincia seleccionada.");
  }
}

const inputLocalidad = document.getElementById('localidades');

inputLocalidad.addEventListener('click', function () {
  inputLocalidad.value = '';
});


async function localidadSelected(ciudad) {
  const localidades = farmacias[0].filter(f => f.properties.Localidad?.toUpperCase() === ciudad);
  console.log("Localidad seleccionada:", ciudad);

  if (localidades.length > 0) {
    const lon = localidades[0].properties.location_latitud * 1;
    const lat = localidades[0].properties.location_longitud * 1;
    let zoom = 14;

    centerMap(lat, lon, zoom);

    latMap = lat;
    lonMap = lon;
    zoomMap = zoom;

  } else {
    console.log("No se encontró la localidad seleccionada.");
  }
}





function centerMap(lat, lng, zoom) {
  // console.log(zoom);
  map.setCenter({ lat, lng });
  map.setZoom(zoom);
}


//Envio de formulario -> Buscar 
async function handleSubmit(e) {
  e.preventDefault();

  if (document.querySelector('#farmacias-container')) {
    document.querySelector('#farmacias-container').remove();
  }

  const provincia = document.querySelector('#provincias').value;
  const localidades = document.querySelector('#localidades').value;

  const farmacias = await buscarFarmacias(provincia, localidades);

  document.querySelector('#mapa').appendChild(farmacias);
}




/*Centra el mapa  para cada provincia */
function obtener_cordenadasZoom(provincia) {
  let ubicaciones = {
    "BUENOS AIRES": {
      zoom: 6,
      lat: -36.526317,
      lon: -60.260102,
    },
    "CAPITAL FEDERAL": {
      zoom: 12,
      lat: -34.615513,
      lon: -58.449439
    },
    "CATAMARCA": {
      zoom: 8,
      lat: -27.536173,
      lon: -66.986804
    },
    "CHACO": {
      zoom: 8,
      lat: -26.593155,
      lon: -60.674030
    },
    "CHUBUT": {
      zoom: 7,
      lat: -44.056368, lon: -68.987164
    },
    "CORDOBA": {
      zoom: 7,
      lat: -32.380668, lon: -64.094324
    },
    "CORRIENTES": {
      zoom: 8,
      lat: -28.840986, lon: -57.923359
    },
    "ENTRE RIOS": {
      zoom: 8,
      lat: -32.239381, lon: -59.325284
    },
    "FORMOSA": {
      zoom: 8,
      lat: -24.793085, lon: -60.221033
    },
    "JUJUY": {
      zoom: 8,
      lat: -23.257322, lon: -65.858888
    },
    "LA PAMPA": {
      zoom: 7,
      lat: -37.267300, lon: -65.733505
    },
    "LA RIOJA": {
      zoom: 8,
      lat: -29.835032, lon: -67.626211
    },
    "MENDOZA": {
      zoom: 7,
      lat: -34.747561, lon: -68.548380
    },
    "MISIONES": {
      zoom: 8,
      lat: -27.073725, lon: -54.755784
    },
    "NEUQUEN": {
      zoom: 7,
      lat: -38.824217, lon: -70.382446
    },
    "RIO NEGRO": {
      zoom: 7,
      lat: -40.461485, lon: -67.354401
    },
    "SALTA": {
      zoom: 8,
      lat: -24.195012, lon: -65.416052
    },
    "SAN JUAN": {
      zoom: 8,
      lat: -31.047322, lon: -68.927757
    },
    "SAN LUIS": {
      zoom: 8,
      lat: -33.916108, lon: -66.005558
    },
    "SANTA CRUZ": {
      zoom: 7,
      lat: -48.945329, lon: -70.477722
    },
    "SANTA FE": {
      zoom: 7,
      lat: -31.083190, lon: -61.338084
    },
    "SANTIAGO DEL ESTERO": {
      zoom: 8,
      lat: -27.885291, lon: -63.518001
    },
    "TIERRA DEL FUEGO": {
      zoom: 8,
      lat: -53.979941, lon: -67.943161
    },
    "TUCUMAN": {
      zoom: 8,
      lat: -27.066882, lon: -65.401178
    },
  };
  if (ubicaciones.hasOwnProperty(provincia)) {
    console.log("encontro", ubicaciones[provincia])
    return ubicaciones[provincia];
  } else {
    console.log("NO ESTA")
    return {
      zoom: 7,
      lat: -30, lon: -62
    }
  }
}




async function initMap() {
  console.log('Iniciando mapa')
  map = new google.maps.Map(document.getElementById('map'), {
    center: {
      lat: latMap,
      lng: lonMap
    },
    options: {
      gestureHandling: 'greedy'
    },
    zoom: zoomMap,
    styles: [{
      "featureType": "road",
      "stylers": [{
        "hue": "#5e00ff"
      }, {
        "saturation": -79
      }]
    }, {
      "featureType": "poi",
      "stylers": [{
        "saturation": -78
      }, {
        "hue": "#6600ff"
      }, {
        "lightness": -47
      }, {
        "visibility": "off"
      }]
    }, {
      "featureType": "road.local",
      "stylers": [{
        "lightness": 22
      }]
    }, {
      "featureType": "landscape",
      "stylers": [{
        "hue": "#6600ff"
      }, {
        "saturation": -11
      }]
    }, {}, {}, {
      "featureType": "water",
      "stylers": [{
        "saturation": -65
      }, {
        "hue": "#1900ff"
      }, {
        "lightness": 8
      }]
    }, {
      "featureType": "road.local",
      "stylers": [{
        "weight": 1.3
      }, {
        "lightness": 30
      }]
    }, {
      "featureType": "transit",
      "stylers": [{
        "visibility": "simplified"
      }, {
        "hue": "#5e00ff"
      }, {
        "saturation": -16
      }]
    }, {
      "featureType": "transit.line",
      "stylers": [{
        "saturation": -72
      }]
    }, {}],

  });
  //Desactiva los iconos por defecto para que no se superpongan con nuestro iconos personalizados.
  map.data.setStyle({
    icon: " " //Poner null no funciona, es necesario poner un objeto vacío
  });
  var infowindow = new google.maps.InfoWindow()

  map.data.loadGeoJson('./marcadores.json', null, function (features) {

    var mpnFeatures = features.filter(feature => feature.getProperty('es_MPN') === true);;

    var filteredFeatures = isChecked ? mpnFeatures : features;

    console.log(filteredFeatures);

    markers = filteredFeatures.map(function (feature) {
      pos = feature.getGeometry().get(0);
      var checkbox = feature.getProperty('es_MPN');
      var iconUrl = checkbox ? 'https://elegirsalud.com.ar/wp-content/themes/psp-eligir-salud-2022-2023/imgs/location.svg' : 'https://elegirsalud.com.ar/wp-content/themes/psp-eligir-salud-2022-2023/imgs/location-red.svg';
      var logoUrl = checkbox ? 'https://elegirsalud.com.ar/wp-content/themes/psp-eligir-salud-2022-2023/imgs/logo-checkbox.png' : ''
      marker = new google.maps.Marker({
        position: feature.getGeometry().get(0),
        icon: iconUrl,
        map: map
      });
      marker.id = feature.getProperty('id');
      var content = '<div class="content-farmacia ext-white"><div><img class="img-checkbox" src=' + logoUrl + '></div><div><h6 class="text-white">Farmacia ' +
        feature.getProperty('Farmacia') + '</h6></div><div><p class="text-white fw-normal"> <span class="text-upeercase text-white fw-normal fs-14">' +
        feature.getProperty('Direccion') + ' ' +
        feature.getProperty('Direccion_Num') /*+ ' ' + feature.getProperty('location_longitud') + ' ' + feature.getProperty('location_latitud')*/ +
        '</span>, ' + feature.getProperty('Localidad') + ', ' + feature.getProperty('Provincia') +
        ' </p></div><a href="https://www.google.com/maps/search/?api=1&query=FARMACIA%20' +
        feature.getProperty('Farmacia') + '%20' + feature.getProperty('Direccion') + '%20' +
        feature.getProperty('Direccion_Num') + '" target="_blank">Ver en Google Maps</a>';

      /*Modifica el info window de maps*/
      google.maps.event.addListener(marker, 'click', (function (marker, content, infowindow) {
        return function () {
          infowindow.setContent(content);
          infowindow.open(map, marker);
          map.panTo(marker.getPosition());
          google
            .
            maps
            .
            event
            .addListenerOnce
            (infowindow,
              'domready'
              ,
              function
                () {
                console
                  .log
                  (
                    "se ejecuta la agregación de clases"
                  );
                let
                  iwOuter
                    =
                    document
                      .querySelector
                      (
                        '.gm-style-iw-t'
                      );
                if
                  (iwOuter) {
                  iwOuter
                    .classList.add
                    (
                      'outer-mas-salud'
                    );
                  if
                    (checkbox
                    ===
                    true) {
                    iwOuter
                      .classList.add
                      (
                        'bg-outer-morado'
                      );
                  }
                  else {
                    iwOuter
                      .classList.add
                      (
                        'bg-outer-rojo'
                      );
                  }
                }
              });
        };
      })(marker, content, infowindow));
      return marker;

    });

    console.log("Check" + isChecked)

    var filteredFeatures = features.filter(feature => feature.getProperty('es_MPN') === true);

    var markerCluster = new MarkerClusterer(map, markers, {
      imagePath: 'https://elegirsalud.com.ar/wp-content/themes/elegirsalud/mapa/markerclusterer/images/m'
    });



    google.maps.event.addDomListener(window, "resize", function () {
      const center = map.getCenter();
      google.maps.event.trigger(map, "resize");
      map.setCenter(center);
    });
    google.maps.event.addDomListener(window, 'load', initMap);

    var screenWidth = window.screen.width * window.devicePixelRatio;
    var screenHeight = window.screen.height * window.devicePixelRatio;
    if (screenWidth < 600 && typeof map !== "undefined") {
      map.setZoom(1);
    }
  });


  map.data.setMap(null);


}



/*Imprime en html el resultado de buscar farmacias */
function noFarmacias() {
  const h4 = document.createElement('h4');
  h4.className = 'h3 text-center text-md-start text-purple fw-normal';
  h4.textContent = 'No se encontraron locaciones';

  $('#listaVisibles').append(h4);
}

async function buscarFarmacias(provincia = '', localidades = '') {
  let farmacias;
  const url = './marcadores.json';
  const response = await fetch(url);
  const result = await response.json();
  if (localidades) {
    console.log('localidades');
    provincia = provincia === 'ciudad autónoma de buenos aires' ? 'Capital Federal' : provincia;
    farmacias = result.features.filter(farmacia => {
      const provinciaValida = farmacia.properties.Provincia.toUpperCase() === provincia.toUpperCase();
      const localidadValida = farmacia.properties.Localidad ?
        farmacia.properties.Localidad.toUpperCase().includes(localidades.toUpperCase()) || localidades.toUpperCase().includes(farmacia.properties.Localidad.toUpperCase()) :
        false;
      const esMPNValida = !isChecked || farmacia.properties.es_MPN === true;

      return provinciaValida && localidadValida && esMPNValida;

    });

  } else if (provincia) {
    console.log('provincia')
    provincia = provincia === 'ciudad autónoma de buenos aires' ? 'Capital Federal' : provincia;
    console.log(provincia);
    farmacias = result.features.filter(farmacia => farmacia.properties.Provincia.toUpperCase() === provincia.toUpperCase());
    const esMPNValida = !isChecked || farmacia.properties.es_MPN === true;
    return provinciaValida && esMPNValida;
  } else {
    farmacias = [];
  }

  console.log('FARMACIAS DEVUETAS POST FILTER')
  console.log(farmacias);



  if (document.querySelector('#farmacias')) {
    document.querySelector('#farmacias').remove();
  }

  const contenedor = document.createElement('div');
  const table = document.createElement('table');
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  contenedor.setAttribute('id', 'farmacias-container')
  table.setAttribute('id', 'farmacias');
  table.classList.add('table', 'table-striped', 'm-0');

  thead.innerHTML = `
      <tr>
          <th class="ps-md-3 align-middle text-purple">Farmacia</th>
          <th class="text-center align-middle text-purple">Localidad</th>
          <th class="text-center align-middle text-purple d-none">Teléfono</th>
          <th class="text-center align-middle text-purple d-none">Email</th>
          <th class="text-center align-middle text-purple">Dirección</th>
          <th class="text-center align-middle text-purple">Mapa</th>
      </tr>
  `;

  table.appendChild(thead);

  if (farmacias.length > 0) {
    farmacias.forEach(farma => {
      tbody.appendChild(generarRecuadro(farma));
    });
  } else {
    tbody.innerHTML = `<tr>
          <td colspan="100%" class="fs-4 text-purple text-center py-2">No se han encontrado farmacias en esta zona</td>
      </tr>`;
  }

  table.appendChild(tbody);
  contenedor.appendChild(table);
  return contenedor;
}

function generarRecuadro(farma) {
  console.log("resultados");
  console.log(farma);
  const { properties: {
    Farmacia,
    Direccion,
    id,
    location_latitud,
    location_longitud,
    telefono,
    email,
    Localidad,
    Provincia
  } } = farma;

  const newRecuadro = document.createElement('tr');
  const tdNombre = document.createElement('td');
  const tdTelefono = document.createElement('td');
  const tdEmail = document.createElement('td');
  const tdDireccion = document.createElement('td');
  const tdFarmacia = document.createElement('td');
  const tdBtn = document.createElement('td');
  const tdLocalidad = document.createElement('td');
  const btn = document.createElement('a');

  tdTelefono.textContent = telefono !== "" ? telefono : '-';
  tdEmail.textContent = email ?? '-';
  tdDireccion.textContent = Direccion ?? '-';
  tdFarmacia.textContent = Farmacia;
  tdLocalidad.textContent = Localidad ? Localidad.toUpperCase() : '';


  btn.textContent = 'Ver en el mapa';
  btn.setAttribute('href', 'https://www.google.com/maps/search/?api=1&query=' + Direccion + ',' + Localidad + ',' + Provincia);
  btn.setAttribute('target', '_blank');



  tdFarmacia.classList.add('text-purple', 'h6', 'fw-normal', 'align-middle', 'ps-md-3', 'text-md-start', 'text-center');
  tdLocalidad.classList.add('text-purple', 'fw-normal', 'align-middle', 'ps-md-3', 'text-center');
  tdTelefono.classList.add('text-purple', 'align-middle', 'fw-normal', 'text-center', 'd-none');
  tdEmail.classList.add('text-purple', 'align-middle', 'fw-normal', 'text-center', 'd-none');
  tdDireccion.classList.add('text-purple', 'align-middle', 'fw-normal', 'text-center');
  tdBtn.classList.add('align-middle', 'fw-normal');
  btn.classList.add('btn', 'btn-purple', 'w-100');

  tdBtn.appendChild(btn);
  newRecuadro.appendChild(tdFarmacia);
  newRecuadro.appendChild(tdLocalidad);
  newRecuadro.appendChild(tdTelefono);
  newRecuadro.appendChild(tdEmail);
  newRecuadro.appendChild(tdDireccion);
  newRecuadro.appendChild(tdBtn);

  return newRecuadro;
}


google.maps.event.addDomListener(window, "load", initMap);