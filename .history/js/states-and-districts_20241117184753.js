
  // Departamento y Localidad
  document.addEventListener("DOMContentLoaded", function () {
    // Definir la lista de departamentos directamente en el código
    const departments = [
      { id: 1, name: "Artigas", towns: [{ "id": 1, "name": "Artigas" },
        { "id": 2, "name": "Baltasar Brum" },
        { "id": 3, "name": "Bella Union" },
        { "id": 4, "name": "Bernabe Rivera" },
        { "id": 5, "name": "Cainsa" },
        { "id": 6, "name": "Cainza Campo 3" },
        { "id": 7, "name": "Calnu" },
        { "id": 8, "name": "Camaño" },
        { "id": 9, "name": "Catalan Grande" },
        { "id": 10, "name": "Catalan Volcan" },
        { "id": 11, "name": "Cerrito" },
        { "id": 12, "name": "Cerro Ejido" },
        { "id": 13, "name": "Cerro San Eugenio" },
        { "id": 14, "name": "Cerro Signorelli" },
        { "id": 15, "name": "Chiflero" },
        { "id": 16, "name": "Colonia España" },
        { "id": 17, "name": "Colonia Estrella" },
        { "id": 18, "name": "Colonia José Artigas" },
        { "id": 19, "name": "Colonia Palma" },
        { "id": 20, "name": "Colonia Pintado" },
        { "id": 21, "name": "Colonia Viñar" },
        { "id": 22, "name": "Coronado" },
        { "id": 23, "name": "Cuareim" },
        { "id": 24, "name": "Cuaro" },
        { "id": 25, "name": "Diego Lamas" },
        { "id": 26, "name": "Estiba" },
        { "id": 27, "name": "Fagúndez" },
        { "id": 28, "name": "Franquía" },
        { "id": 29, "name": "Guyubira" },
        { "id": 30, "name": "Javier De Viana" },
        { "id": 31, "name": "La Bolsa" },
        { "id": 32, "name": "Las Piedras" },
        { "id": 33, "name": "Lenguazo" },
        { "id": 34, "name": "Limite Contestado" },
        { "id": 35, "name": "Masoller" },
        { "id": 36, "name": "Meneses" },
        { "id": 37, "name": "Mones Quintela" },
        { "id": 38, "name": "Paguero" },
        { "id": 39, "name": "Palma Sola" },
        { "id": 40, "name": "Paredón" },
        { "id": 41, "name": "Paso Campamento" },
        { "id": 42, "name": "Paso De La Cruz" },
        { "id": 43, "name": "Paso De León" },
        { "id": 44, "name": "Paso De Ramos" },
        { "id": 45, "name": "Paso Farías" },
        { "id": 46, "name": "Patitas" },
        { "id": 47, "name": "Piedra Pintada" },
        { "id": 48, "name": "Pintadito" },
        { "id": 49, "name": "Pintado" },
        { "id": 50, "name": "Pintado Grande" },
        { "id": 51, "name": "Port. De Hierro Y Campodónico" },
        { "id": 52, "name": "Rincón De Pacheco" },
        { "id": 53, "name": "Sarandí De Cuaro" },
        { "id": 54, "name": "Sarandí De Yacuy" },
        { "id": 55, "name": "Sequeira" },
        { "id": 56, "name": "Tamandua" },
        { "id": 57, "name": "Taruman" },
        { "id": 58, "name": "Tomas Gomensoro" },
        { "id": 59, "name": "Topador" },
        { "id": 60, "name": "Zanja Aruera" }] },
      { id: 2, name: "Canelones", towns: [{ id: 3, name: "Las Piedras" }, { id: 4, name: "El Pinar" }] },
      { id: 3, name: "Canelones", towns: [{ id: 3, name: "Las Piedras" }, { id: 4, name: "El Pinar" }] },
      { id: 4, name: "Canelones", towns: [{ id: 3, name: "Las Piedras" }, { id: 4, name: "El Pinar" }] },
      { id: 5, name: "Canelones", towns: [{ id: 3, name: "Las Piedras" }, { id: 4, name: "El Pinar" }] },
      { id: 6, name: "Canelones", towns: [{ id: 3, name: "Las Piedras" }, { id: 4, name: "El Pinar" }] },
      { id: 7, name: "Canelones", towns: [{ id: 3, name: "Las Piedras" }, { id: 4, name: "El Pinar" }] },
      { id: 8, name: "Canelones", towns: [{ id: 3, name: "Las Piedras" }, { id: 4, name: "El Pinar" }] },
      { id: 9, name: "Canelones", towns: [{ id: 3, name: "Las Piedras" }, { id: 4, name: "El Pinar" }] },
      { id: 10, name: "Canelones", towns: [{ id: 3, name: "Las Piedras" }, { id: 4, name: "El Pinar" }] },
      { id: 11, name: "Canelones", towns: [{ id: 3, name: "Las Piedras" }, { id: 4, name: "El Pinar" }] },
      { id: 12, name: "Canelones", towns: [{ id: 3, name: "Las Piedras" }, { id: 4, name: "El Pinar" }] },
      { id: 13, name: "Canelones", towns: [{ id: 3, name: "Las Piedras" }, { id: 4, name: "El Pinar" }] },
      { id: 14, name: "Canelones", towns: [{ id: 3, name: "Las Piedras" }, { id: 4, name: "El Pinar" }] },
      { id: 15, name: "Canelones", towns: [{ id: 3, name: "Las Piedras" }, { id: 4, name: "El Pinar" }] },
      { id: 16, name: "Canelones", towns: [{ id: 3, name: "Las Piedras" }, { id: 4, name: "El Pinar" }] },
      { id: 17, name: "Canelones", towns: [{ id: 3, name: "Las Piedras" }, { id: 4, name: "El Pinar" }] },
      { id: 18, name: "Canelones", towns: [{ id: 3, name: "Las Piedras" }, { id: 4, name: "El Pinar" }] },
      { id: 19, name: "Canelones", towns: [{ id: 3, name: "Las Piedras" }, { id: 4, name: "El Pinar" }] },
    ];
  
    const stateSelect = document.getElementById('state');
    const districtSelect = document.getElementById('district');
  
    // Función para cargar los departamentos en el select
    function loadDepartments() {
      departments.forEach(department => {
        const option = document.createElement('option');
        option.value = department.id;
        option.textContent = department.name;
        stateSelect.appendChild(option);
      });
    }
  
    // Función para cargar las localidades en el select de distritos
    function loadTowns(departmentId) {
      districtSelect.innerHTML = '<option value="">Seleccione una localidad</option>';
      const department = departments.find(d => d.id == departmentId);
  
      if (department) {
        department.towns.forEach(town => {
          const option = document.createElement('option');
          option.value = town.id;
          option.textContent = town.name;
          districtSelect.appendChild(option);
        });
      }
    }
  
    // Llamar a la función para cargar los departamentos cuando el DOM esté listo
    loadDepartments();
  
    // Escuchar el cambio en el select de estado (departamento)
    stateSelect.addEventListener('change', function () {
      loadTowns(this.value);
    });
  });
  

