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


document.getElementById('departamento').addEventListener('change', function () {
  const API_CIUDAD = `https://direcciones.ide.uy/api/ve/geocode/localidades?alias=true&departamento=${this.value}`

    fetch(API_CIUDAD).then(response => response.json()).then(cities => {
      const citySelect = document.getElementById('district');
      citySelect.innerHTML = '';
      cities.forEach(city => {
        const option = document.createElement('option');
        option.value = city.id;
        option.textContent = city.nombre.toLowerCase();
        option.textContent = option.textContent.charAt(0).toUpperCase() + option.textContent.slice(1);
        citySelect.appendChild(option);
      });

    });
});