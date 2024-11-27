document.addEventListener("DOMContentLoaded", function () {
  if (window.setupDone) return; // Evitar múltiples inicializaciones
  window.setupDone = true;

  // Variables iniciales
  const subtotal = parseFloat(localStorage.getItem("subtotal"));
  const finalizarCompraButton = document.getElementById("finalize-purchase");

  if (subtotal !== null) {
      document.getElementById("subtotal").textContent = `${subtotal.toFixed(2)} UYU`;
      document.getElementById("total").textContent = `${subtotal.toFixed(2)} UYU`;
  } else {
      console.error("Subtotal no disponible");
  }

  function updateCost() {
      const shippingType = document.querySelector('input[name="shipping"]:checked');
      let costoEnvio = 0;

      if (shippingType) {
          costoEnvio = shippingType.value === "premium" ? subtotal * 0.15 :
                       shippingType.value === "express" ? subtotal * 0.07 :
                       shippingType.value === "standard" ? subtotal * 0.05 : 0;
      }

      const total = subtotal + costoEnvio;
      document.getElementById("envio").textContent = `${costoEnvio.toFixed(2)} UYU`;
      document.getElementById("total").textContent = `${total.toFixed(2)} UYU`;
  }

  function validateAddressSection() {
      let valid = true;
      document.querySelectorAll("#address input[required]").forEach(input => {
          if (input.type === "radio" && !input.checked || 
              input.type !== "radio" && input.value.trim() === "") {
              valid = false;
              input.classList.add("is-invalid");
          } else {
              input.classList.remove("is-invalid");
          }
      });
      return valid;
  }

  function showSuccessMessageAndRedirect() {
      const successMessage = document.getElementById('success-message');
      successMessage.style.display = 'block';
      setTimeout(() => window.location.href = 'index.html', 3000);
  }

  function finalizarCompraHandler(event) {
      event.preventDefault();

      if (validateAddressSection()) {
          const selectedPayment = document.querySelector('input[name="payment"]:checked');
          if (!selectedPayment) {
              alert('Por favor, selecciona una forma de pago.');
              return;
          }
          showSuccessMessageAndRedirect();
          localStorage.removeItem("productoComprado");
      } else {
          alert("Por favor, completa todos los campos de dirección.");
      }
  }

  finalizarCompraButton.removeEventListener("click", finalizarCompraHandler);
  finalizarCompraButton.addEventListener("click", finalizarCompraHandler);

  document.querySelectorAll('input[name="shipping"]').forEach(option => {
      option.addEventListener("change", updateCost);
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
    }

    // Si algún campo es inválido, mostrar los errores y detener el flujo
    if (!isValid) {
      alert(errorMessage);
      return;
    }

    // Si todo es válido, continuar con el envío del formulario
    function showSuccessMessageAndRedirect() {
      const successMessage = document.getElementById('success-message');
      successMessage.style.display = 'block'; // Mostrar el mensaje (asegúrate de tener el elemento en HTML)
      setTimeout(() => {
        window.location.href = 'index.html'; // Cambia a la ruta necesaria
      }, 3000); // Esperar 3 segundos antes de redirigir
    }

    // Si todo es válido, mostrar el mensaje y redirigir
    showSuccessMessageAndRedirect();
  });
});
