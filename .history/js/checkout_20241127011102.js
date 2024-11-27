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

  // Los campos de teléfono, tarjetas y cuentas bancarias sólo puedan aceptar números
  const numericFields = document.querySelectorAll("#phoneNumber, #debitNumber, #creditNumber, #bankAccount, #debitExpiry, #creditExpiry");

  numericFields.forEach(field => {
    field.addEventListener("input", function () {
      this.value = this.value.replace(/[^0-9]/g, "");
    });
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

  // Modificamos esta parte para vaciar el carrito al finalizar la compra
  document.getElementById('finalize-purchase').addEventListener('click', function (event) {
    event.preventDefault(); // Evita el envío del formulario inicialmente

    // Validar la sección de Dirección
    if (!validateAddressSection()) {
      alert("Por favor, complete todos los campos de dirección antes de finalizar la compra.");
      return;
    }

    // Obtener el grupo de radio buttons de forma de pago
    const paymentMethods = document.querySelectorAll('input[name="payment"]');
    let selectedMethod = null;

    // Verificar si algún radio button está seleccionado
    paymentMethods.forEach(method => {
      if (method.checked) {
        selectedMethod = method.value; // Guardar el valor de la opción seleccionada
      }
    });

    // Si no se seleccionó ninguna forma de pago, mostrar alerta
    if (!selectedMethod) {
      alert('Por favor, selecciona una forma de pago.');
      return;
    }

    // Validar los campos específicos de la forma de pago seleccionada
    let isValid = true;
    let errorMessage = '';

    if (selectedMethod === 'debit') {
      const debitNumber = document.getElementById('debitNumber').value.trim();
      const debitExpiry = document.getElementById('debitExpiry').value.trim();
      if (!debitNumber) {
        isValid = false;
        errorMessage += 'Por favor, ingresa el número de la tarjeta de débito.\n';
      }
      if (!debitExpiry) {
        isValid = false;
        errorMessage += 'Por favor, ingresa la fecha de expiración de la tarjeta de débito.\n';
      }
    } else if (selectedMethod === 'credit') {
      const creditNumber = document.getElementById('creditNumber').value.trim();
      const creditExpiry = document.getElementById('creditExpiry').value.trim();
      if (!creditNumber) {
        isValid = false;
        errorMessage += 'Por favor, ingresa el número de la tarjeta de crédito.\n';
      }
      if (!creditExpiry) {
        isValid = false;
        errorMessage += 'Por favor, ingresa la fecha de expiración de la tarjeta de crédito.\n';
      }
    } else if (selectedMethod === 'bank_transfer') {
      const bankAccount = document.getElementById('bankAccount').value.trim();
      if (!bankAccount) {
        isValid = false;
        errorMessage += 'Por favor, ingresa el número de cuenta bancaria.\n';
      }
    } else if (selectedMethod === 'cash') {
      const cashInfo = document.getElementById('cashInfo').value.trim();
      if (!cashInfo) {
        isValid = false;
        errorMessage += 'Por favor, ingresa la información para el pago en efectivo.\n';
      }
    }

    // Si algún campo es inválido, mostrar los errores y detener el flujo
    if (!isValid) {
      alert(errorMessage);
      return;
    }

    // Si todo es válido, continuar con el envío del formulario
    alert('¡Compra exitosa!');

    // Vaciar el carrito en localStorage
    localStorage.removeItem("productoComprado");

    // Actualizar el contador de carrito (se debe definir esta función en tu código)
    updateCartCount(); // Esta función debe actualizar el contador del carrito, asegúrate de tenerla definida

    // Redirigir al usuario a la página principal o de categorías
    window.location.href = 'categories.html';
  });
});
