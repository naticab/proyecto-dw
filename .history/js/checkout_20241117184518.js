document.addEventListener("DOMContentLoaded", function () {
  // Recuperar el subtotal desde localStorage
  const subtotal = parseFloat(localStorage.getItem("subtotal")); // Asegurarnos de que sea un número

  // Verificar si el subtotal está disponible y mostrarlo
  if (subtotal !== null) {
    document.getElementById("subtotal").textContent = `${subtotal.toFixed(2)} UYU`;
    document.getElementById("total").textContent = `${subtotal.toFixed(2)} UYU`;
  } else {
    console.error("Subtotal no disponible");
  }

  // Función para calcular el costo de envío y el total
  function updateCost() {
    const shippingType = document.querySelector('input[name="shipping"]:checked'); // Obtener el tipo de envío seleccionado
    let costoEnvio = 0;

    if (shippingType) {
      // Calcular el costo de envío basado en el tipo seleccionado
      if (shippingType.value === "premium") {
        costoEnvio = subtotal * 0.15; // 15%
      } else if (shippingType.value === "express") {
        costoEnvio = subtotal * 0.07; // 7%
      } else if (shippingType.value === "standard") {
        costoEnvio = subtotal * 0.05; // 5%
      }
    }

    const total = subtotal + costoEnvio;

    // Actualizar los elementos HTML con los valores calculados
    document.getElementById("envio").textContent = `${costoEnvio.toFixed(2)} UYU`;
    document.getElementById("total").textContent = `${total.toFixed(2)} UYU`;
  }

  // Escuchar cambios en las opciones de envío
  const shippingOptions = document.querySelectorAll('input[name="shipping"]');
  const addressTab = document.getElementById("addressTab");
  const paymentTab = document.getElementById("paymentTab");

  shippingOptions.forEach((option) => {
    option.addEventListener("change", function () {
      updateCost(); // Actualizar costos al seleccionar un envío
      if (this.checked) {
        // Habilitar la pestaña de Dirección de Envío
        addressTab.classList.remove("disabled");
      }
    });
  });

  // Validar la sección Dirección y habilitar la pestaña de Pago
  const addressInputs = document.querySelectorAll("#address input[required]");

  // Función para validar todos los campos de dirección
  function validateAddressSection() {
    let valid = true;
    addressInputs.forEach((input) => {
      if (input.type === "radio" && !input.checked) {
        valid = false;
        input.classList.add("is-invalid"); // Marcar los campos vacíos
      } else if (input.type !== "radio" && input.value.trim() === "") {
        valid = false;
        input.classList.add("is-invalid"); // Marcar los campos vacíos
      } else {
        input.classList.remove("is-invalid"); // Eliminar la clase de error si está lleno
      }
    });
    return valid;
  }

  const departments = window.departments;

  const stateSelect = document.getElementById('state');
  const districtSelect = document.getElementById('district');

  function loadDepartments() {
    departments.forEach(department => {
      const option = document.createElement('option');
      option.value = department.id;
      option.textContent = department.name;
      stateSelect.appendChild(option);
    });
  }


  // Que el campo teléfono sólo acepte números
  document.getElementById("phoneNumber").addEventListener("input", function (e) {
    this.value = this.value.replace(/[^0-9]/g, "");
  });


  // Cambiar a la pestaña de Pago al hacer clic en Finalizar compra
  const finalizarCompraButton = document.getElementById("finalize-purchase");
  finalizarCompraButton.addEventListener("click", function () {
    if (validateAddressSection()) {
      paymentTab.classList.remove("disabled");
      paymentTab.click(); // Cambiar a la pestaña de pago
    } else {
      alert("Por favor, complete todos los campos de dirección antes de finalizar la compra.");
    }
  });

  // Funcionalidad para mostrar los campos correspondientes según el método de pago
  const paymentRadios = document.querySelectorAll('input[name="payment"]');
  const debitFields = document.getElementById("debitFields");
  const creditFields = document.getElementById("creditFields");
  const bankFields = document.getElementById("bankFields");
  const cashFields = document.getElementById("cashFields");

  // Función para ocultar todos los campos de pago
  function hideAllPaymentFields() {
    debitFields.style.display = "none";
    creditFields.style.display = "none";
    bankFields.style.display = "none";
    cashFields.style.display = "none";
  }

  // Mostrar los campos correspondientes al tipo de pago seleccionado
  paymentRadios.forEach(function (radio) {
    radio.addEventListener("change", function () {
      hideAllPaymentFields(); // Ocultar todos los campos primero

      if (this.checked) {
        switch (this.value) {
          case "debit":
            debitFields.style.display = "block";
            break;
          case "credit":
            creditFields.style.display = "block";
            break;
          case "bank_transfer":
            bankFields.style.display = "block";
            break;
          case "cash":
            cashFields.style.display = "block";
            break;
        }
      }
    });
  });
});




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
      { id: 2, name: "Canelones", towns: [{ id: 3, name: "Las Piedras" }, { id: 4, name: "El Pinar" }] }
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
  

