
// variables principales

const listaPaises = document.getElementById("countries-list");
const modal = document.querySelector(".modal"); //modales para almacenar la información
 // ordenar alfaberticamente
const ordenarPaises = (countries) => {
    const paisesOrdenados = countries.sort((a, b) =>
        a.name.common.localeCompare(b.name.common)
    );

    return paisesOrdenados;
};
// cerrar el recuadro (modal)
const cerrarModal = () => {
    modal.classList.add("hidden");
};
// información que va dentro del modal
const detallesPaisesModal = (country) => {
    modal.classList.remove("hidden");
    const capital = country.capital ? country.capital[0] : "No tiene capital"; // esto es necesario ya que al no ponerlo da error


    // aqui estamos creando los div en lugar de en html. Incluimos el boton para cerrar el modal//
    modal.innerHTML = `
    <div>
      <div class="img-info-container">
        <img src="${country.flags[1]}" alt="image country">
        <div>
          <h2>${country.name.common}</h2>
          <p>Capital: ${capital}</p>
          <p>Población: ${country.population}</p>
          <p>Lado de la carretera: ${country.car.side}</p>
        </div>
      </div>
      <button class="cerrar-btn" onclick="cerrarModal()">Cerrar</button>  
    </div>
    `;
};
// mostraos los paises en pantalla con la imagen de la bandera y el nombre
const mostrarPaises = (countries) => {
    countries.forEach((country) => {
        listaPaises.innerHTML += `
        <div class="card">
        <img src="${country.flags[1]}" alt="image country">
        <h2>${country.name.common}</h2>
        </div>
        `;
    });
// agregamos los elementos click para cada modal
    countries.forEach((country, index) => {
        const elementCountry = document.getElementsByClassName("card")[index];
        elementCountry.addEventListener("click", () => detallesPaisesModal(country));
    });
};
// llamamos a la Api
const obtenerPaises = async() => {
    try {
        const res = await fetch("https://restcountries.com/v3/all");
        if (!res.ok) {
            throw new Error("Hubo un problema cargando los países");
        }
        const countries = await res.json();
        const paisesOrdenados = ordenarPaises(countries);
        mostrarPaises(paisesOrdenados);
    } catch (error) {
        console.error(error);
        listaPaises.innerHTML = error;
    }
};

obtenerPaises();