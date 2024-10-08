  <?php

/**
 * Template Name: Mapa 13-8
 */

get_header();
?>
<meta name="description" content="El programa para pacientes de AstraZeneca que te acompañara durante tu tratamiento. Ingresa para conocer los beneficios en farmacias y más información sobre tu salud.">
<main>

<!-- TEALIUM CODE -->
<script type="text/javascript">
var utag_data = {
  im_init_js_ext_has_run_once : "" 
}
</script>

<!-- Loading script asynchronously -->
<script type="text/javascript">
    (function(a,b,c,d){
    a='https://tags.tiqcdn.com/utag/astrazeneca/ar-elegirsalud/prod/utag.js';
    b=document;c='script';d=b.createElement(c);d.src=a;d.type='text/java'+c;d.async=true;
    a=b.getElementsByTagName(c)[0];a.parentNode.insertBefore(d,a);
    })();
</script>


<!-- END TEALIUM CODE -->

<style>
    .gm-style .gm-style-iw-d {
    margin-top: -22px !important;
    }

    .form-check-input[type=checkbox]{
        padding: 1rem !important;
    }

    .form-check-input:checked{
        background-color: var(--purple);
    }
    .form-check-input:focus{
        box-shadow: none !important;
    }
    label {
    color: var(--purple);
    line-height: 1.2;
    font-size: 14px !important;
    }

    .form-check-input {
    margin-top: 0 !important;
    }

    .form-check-input:checked[type=checkbox]{
    background-size: 25px;
    }

    .w-40{
        width: 40%;
    }

    .w-30{
        width: 30%;
    }

    .gm-style-iw-d h6 {
    font-family: "Rubik", sans-serif;
    font-weight: 600;
    font-size: 17px;
    }

    .gm-style-iw-d p {
    font-family: "Rubik", sans-serif;
    }

    #mapa .container {
    padding: 0 !important;
    }

    @media (min-width: 992px){
    .p-custom{
        padding-left: 0 !important;
        padding-right: 0 !important;
        }
    }

    @media (max-width: 768px){
    #filtrar-mapa {
        flex-direction: column;
        }
    .checkmpn {
        width: 100%;
        justify-content: flex-start;
        }
        #or-1 {
            order: 1;
        }
        #or-2 {
            order: 3;
        }
        #or-3 {
            order: 2;
        }
        label {
            line-height: 1.1;
            max-width: 60%;
        }
        }
</style>

<?php
    set_query_var('h1','Encontrá la farmacia más cercana adherida al Programa Elegir Salud.');
    set_query_var('p','');
    set_query_var('img','farmacias-cercanas.png');
    set_query_var('alt','encontrando farmacias');

    get_template_part('template-parts/content','encabezado');
?>
  <!-- <section id="mapa" class="container mb-md-5 mb-0">
    <h2 class="visually-hidden">Mapa de farmacias:</h2>
      <div class="container">
          <div class="d-flex justify-content-start align-items-stretch flex-md-row flex-column-reverse">
              <div class="w-100">
                  <form id="filtrar-mapa" class="d-flex gap-md-2 justify-content-md-between justify-content-center align-items-center flex-md-row flex-column">
                      <div class="w-100 mb-3 mb-md-0">
                          <label for="provincias" class="visually-hidden">Seleccione una Provincia</label>
                          <select id="provincias" name="provincias" class="w-100">
                              <option disabled selected>Seleccioná una provincia</option>
                          </select>
                      </div>
                      <div class="w-100 mb-3 mb-md-0">
                          <label for="localidades" class="visually-hidden">Seleccione una localidad</label>
                          <input list="ciudades" name="localidades" id="localidades" class="w-100" placeholder="Seleccioná o escribí una localidad o barrio" autocomplete="off">
                          <datalist id="ciudades">
                              <option disabled selected>Buscar por localidad</option>
                          </datalist>
                      </div>
                      <div class="checkmpn w-30 d-flex gap-2 align-items-center">
                          <input class="form-check-input" type="checkbox" name="test" id="mpn">
                          <label for="mpn">Farmacias MPN</label>
                      </div>
                      <div class="w-40 mt-3 mt-md-0">
                          <button type="submit" data-tracking-id="buscar-farmacia" class="btn btn-purple w-100">Buscar</button>
                      </div>
                  </form>
                  <p class="mt-3 mb-md-5 mb-3 text-darker-gray fs-14 px-md-1">Escriba o seleccione una provincia y/o una localidad para encontrar las farmacias cercanas</p>
              </div>
          </div>
      </div>
  </section> -->

  <!-- <section id="mapa" class="container mb-md-4 mb-0">
    <h2 class="visually-hidden">Mapa de farmacias:</h2>
    <div class="row">
        <div class="col-md-12">
            <form id="filtrar-mapa" class="d-flex gap-md-2 justify-content-center flex-md-row flex-column">
                <div class="col-md-4 col-sm-12 mb-3 mb-md-0">
                    <label for="provincias" class="visually-hidden">Seleccione una Provincia</label>
                    <select id="provincias" name="provincias" class="form-select w-100">
                        <option disabled selected>Seleccioná una provincia</option>
                    </select>
                </div>
                <div class="col-md-4 col-sm-12 mb-3 mb-md-0">
                    <label for="localidades" class="visually-hidden">Seleccione una localidad</label>
                    <input list="ciudades" name="localidades" id="localidades" class="form-control w-100" placeholder="Seleccioná o escribí una localidad o barrio" autocomplete="off">
                    <datalist id="ciudades">
                        <option disabled selected>Buscar por localidad</option>
                    </datalist>
                </div>
                <div class="col-md-2 col-sm-12 d-flex gap-2 align-items-center mb-3 mb-md-0">
                    <input class="form-check-input" type="checkbox" name="test" id="mpn">
                    <label for="mpn">Farmacias MPN</label>
                </div>
                <div class="col-md-2 col-sm-12 mt-3 mt-md-0">
                    <button type="submit" data-tracking-id="buscar-farmacia" class="btn btn-purple w-100">Buscar</button>
                </div>
            </form>
            <p class="mt-3 mb-md-3 mb-3 text-darker-gray fs-14 px-md-1">Escriba o seleccione una provincia y/o una localidad para encontrar las farmacias cercanas</p>
        </div>
    </div>
</section> -->

<section id="mapa" class="container mb-md-4 mb-0">
    <h2 class="visually-hidden">Mapa de farmacias:</h2>
    <div class="row">
        <div class="col-md-12">
            <form id="filtrar-mapa" class="d-flex gap-md-2 justify-content-center flex-column">
            <p class="mt-3 mb-md-4 mb-4 text-darker-gray fs-14 px-md-1">Escriba o seleccione una provincia y/o una localidad para encontrar las farmacias cercanas</p>
                <div class="row">
                    <div class="col-md-4 col-sm-12 mb-3 mb-md-0">
                        <label for="provincias" class="visually-hidden">Seleccione una Provincia</label>
                        <select id="provincias" name="provincias" class="form-select w-100">
                            <option disabled selected>Seleccioná una provincia</option>
                        </select>
                    </div>

                    <div id="or-1" class="col-md-4 col-sm-12 mb-md-0">
                        <label for="localidades" class="visually-hidden">Seleccione una localidad</label>
                        <input list="ciudades" name="localidades" id="localidades" class="form-control w-100" placeholder="Seleccioná o escribí una localidad o barrio" autocomplete="off">
                        <datalist id="ciudades">
                            <option disabled selected>Buscar por localidad</option>
                        </datalist>
                    </div>
                    
                    <div id="or-2" class="col-md-4 col-sm-12 mt-3 mt-md-0 d-none d-md-block">
                        <button type="submit" data-tracking-id="buscar-farmacia" class="btn btn-purple w-100">Buscar</button>
                    </div>
                </div>

                <div class="row">
                    <div id="or-3" class="col-md-12 col-sm-12 d-flex gap-2 align-items-center mb-3 mt-3 mb-md-0">
                        <input class="form-check-input" type="checkbox" name="test" id="mpn">
                        <label for="mpn">Farmacias adheridas a Medicamentos de Primer Nivel</label>
                    </div>
                </div>

                <!-- Nuevo botón de búsqueda para móviles -->
                <div class="row d-md-none">
                    <div class="col-12">
                        <button type="submit" data-tracking-id="buscar-farmacia-mobile" class="btn btn-purple w-100">Buscar</button>
                    </div>
                </div>
            </form>
        </div>
    </div>
</section>

  <div id="map" class='container' style="height: 50vh"></div>
</main>
<?php get_footer();?>
<!--- SCRIPTS DEL MAPA --->
<script src="https://code.jquery.com/jquery-3.6.3.min.js" integrity="sha256-pvPw+upLPUjgMXY0G+8O0xUf+/Im1MZjXxxgOcBQBXU=" crossorigin="anonymous"></script>
<script src="<?php echo get_stylesheet_directory_uri(); ?>/mapa/mapa-farmacias1-13-8.js"></script>
<script src="<?php echo get_stylesheet_directory_uri(); ?>/mapa/markerclusterer/src/markerclusterer2.js"></script>
<script src="https://maps.googleapis.com/maps/api/js?key=AIzaSyD1kQoInu_58ivAdV4VJgfPjWmI0QcDTVc&callback=initMap" async defer></script>
<script>

    let provinciaSeleccionada = "";
    let localidadSeleccionada = "";

    console.log("Esta es mi ubicación" + provinciaSeleccionada + localidadSeleccionada);

    console.log(provinciaSeleccionada, localidadSeleccionada);

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

        document.getElementById('mpn').addEventListener('click', function() {
    initMap();
    provinciaSelected(provinciaSeleccionada);
    localidadSelected(localidadSeleccionada);
        });

    });


    provinciaSelected();
    /*    
    document.addEventListener('DOMContentLoaded', async () => {
        const formulario = document.querySelector('#filtrar-mapa');
        const selectProvincias = document.querySelector('#provincias');
        const selectLocalidades = document.querySelector('#localidades');

        selectProvincias.addEventListener('change', provinciaSelected);
        selectLocalidades.addEventListener('change', localidadSelected);
        formulario.addEventListener('submit', handleSubmit);

        Promise.all([fetch("https://elegirsalud.com.ar/wp-content/themes/psp-eligir-salud-2022-2023/formularios/argentina.json"), fetch("https://elegirsalud.com.ar/wp-content/themes/psp-eligir-salud-2022-2023/mapa/localidades.json")])
            .then(([responseProvincias, responseLocalidades]) => Promise.all([responseProvincias.json(), responseLocalidades.json()]))
            .then(([resultProvincias, resultLocalidades]) => {
                localidades.push(resultLocalidades['localidades']);
                provincias.push(resultProvincias);
                generarProvincias(resultProvincias);
                generarLocalidades(resultLocalidades['localidades']);
            });
    });

    function generarProvincias(provincias) {
        const selectProvincias = document.querySelector('#provincias');

        provincias.forEach(provincia => {
            const { nombre } = provincia;
            const option = document.createElement('option');

            option.textContent = nombre;
            option.value = nombre.toLowerCase();

            selectProvincias.appendChild(option);
        });
    }

    function generarLocalidades(localidades) {
        const select = document.querySelector('#ciudades');

        localidades.forEach(localidad => {
           const option = document.createElement('option');
           const { id,  nombre } = localidad;

           option.value = nombre;
           // option.textContent = id;
            option.dataset.value = id;

           select.appendChild(option);
        });

        // console.log(localidades);
    }
    */

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
    // Función para manejar el evento y obtener la provincia seleccionada
    function handleProvinciaChange(e) {
        let provinciaSeleccionada = e.target.value.toUpperCase();
        provinciaSelected(provinciaSeleccionada);
        console.log("Esta es mi provincia" + provinciaSeleccionada);
    }

    // Función para manejar la lógica de la provincia seleccionada
    async function provinciaSelected(nombreProvincia) {
        let puntos = farmacias[0].filter(f => f.properties.Provincia.toUpperCase() == nombreProvincia);
        console.log("Provincia: ", nombreProvincia);

        if (puntos.length > 0) {
            let { lon, lat, zoom } = obtener_cordenadasZoom(nombreProvincia);
            centerMap(lat, lon, zoom);
        }

        let localidades = puntos.map(l => (l.properties.Localidad ? l.properties.Localidad.toUpperCase() : '')).sort();
        localidades = new Set(localidades); // Eliminar duplicados
        console.log(localidades);

        $("#localidades").val("");
        $("#ciudades").html('');

        localidades.forEach(l => $("#ciudades").append("<option value='" + l + "'>" + l + "</option>"));
    }

    // Función para manejar el evento y obtener la localidad seleccionada
    function handleLocalidadChange(e) {
        let localidadSeleccionada = e.target.value.toUpperCase();
        localidadSelected(localidadSeleccionada);
        console.log("Esta es mi localidad" + localidadSeleccionada);
    }

    // Función para manejar la lógica de la localidad seleccionada
    async function localidadSelected(ciudad) {
        let localidades = farmacias[0].filter(f => (f.properties.Localidad ? f.properties.Localidad.toUpperCase() : "") == ciudad);
        console.log("Ciudad: ", ciudad);
        console.log(localidades);

        if (localidades.length > 0) {
            const lon = localidades[0].properties.location_latitud * 1;
            const lat = localidades[0].properties.location_longitud * 1;
            let zoom = 14;

            centerMap(lat, lon, zoom);
        }
    }



    function filtrarLocalidades(provinciaSeleccionada = '') {
        const datalistCiudades = document.querySelector('#ciudades');

        while (datalistCiudades.firstElementChild) {
            datalistCiudades.firstElementChild.remove();
        }

        if (provinciaSeleccionada === "") {
            return generarLocalidades(localidades);
        }

        const localidadFiltrada = provincias[0].filter(provincia => provincia.nombre.toLowerCase() === provinciaSeleccionada);

        generarLocalidades(localidadFiltrada[0].ciudades);
    }

    function centerMap(lat, lng, zoom) {
        // console.log(zoom);
        map.setCenter({ lat, lng });
        map.setZoom(zoom);
    }

    async function handleSubmit(e) {
        e.preventDefault();

        if (document.querySelector('#farmacias-container')) {
            document.querySelector('#farmacias-container').remove();
        }

        const provincia = document.querySelector('#provincias').value;
        const localidades = document.querySelector('#localidades').value;
        // const mpn = document.querySelector('#mpn').value;

        const farmacias = await buscarFarmacias(provincia, localidades);

        document.querySelector('#mapa').appendChild(farmacias);
    } 

</script>