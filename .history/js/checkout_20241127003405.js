document.addEventListener("DOMContentLoaded", function () {
  // Recuperar el subtotal desde localStorage
  const subtotal = parseFloat(localStorage.getItem("subtotal"));
  if (subtotal !== null) {
      document.getElementById("subtotal").textContent = `${subtotal.toFixed(2)} UYU`;
      document.getElementById("total").textContent = `${subtotal.toFixed(2)} UYU`;
  } else {
      console.error("Subtotal no disponible");
  }

  // Función para calcular el costo de envío y el total
  function updateCost() {
      const shippingType = document.querySelector('input[name="shipping"]:checked');
      let costoEnvio = 0;

      if (shippingType) {
          if (shippingType.value === "premium") {
              costoEnvio = subtotal * 0.15;
          } else if (shippingType.value === "express") {
              costoEnvio = subtotal * 0.07;
          } else if (shippingType.value === "standard") {
              costoEnvio = subtotal * 0.05;
          }
      }

      const total = subtotal + costoEnvio;
      document.getElementById("envio").textContent = `${costoEnvio.toFixed(2)} UYU`;
      document.getElementById("total").textContent = `${total.toFixed(2)} UYU`;
  }

  // Escuchar cambios en las opciones de envío
  const shippingOptions = document.querySelectorAll('input[name="shipping"]');
  const addressTab = document.getElementById("addressTab");
  const paymentTab = document.getElementById("paymentTab");

  shippingOptions.forEach((option) => {
      option.addEventListener("change", function () {
          updateCost();
          if (this.checked) {
              // Habilitar la pestaña de Dirección de Envío
              addressTab.classList.remove("disabled");
          }
      });
  });

  // Validar la sección Dirección
  const addressInputs = document.querySelectorAll("#address input[required]");

  function validateAddressSection() {
      let valid = true;
      addressInputs.forEach((input) => {
          if (input.type === "radio" && !input.checked) {
              valid = false;
              input.classList.add("is-invalid");
          } else if (input.type !== "radio" && input.value.trim() === "") {
              valid = false;
              input.classList.add("is-invalid");
          } else {
              input.classList.remove("is-invalid");
          }
      });
      return valid;
  }

  // Validar la sección Pago
  function validatePaymentSection() {
      let valid = true;
      const paymentMethods = document.querySelectorAll('input[name="payment"]:checked');
      const paymentFields = {
          debit: ["debitNumber", "debitExpiry"],
          credit: ["creditNumber", "creditExpiry"],
          bank_transfer: ["bankAccount"],
          cash: ["cashInfo"]
      };

      paymentMethods.forEach(method => {
          const requiredFields = paymentFields[method.value];
          requiredFields.forEach(fieldId => {
              const field = document.getElementById(fieldId);
              if (!field || field.value.trim() === "") {
                  valid = false;
                  field.classList.add("is-invalid");
              } else {
                  field.classList.remove("is-invalid");
              }
          });
      });

      return valid;
  }

  // Función para cambiar a la siguiente pestaña
  function goToNextTab(currentTab, nextTab) {
      if (nextTab.classList.contains("disabled")) {
          nextTab.classList.remove("disabled");
      }
      nextTab.click();
  }

  // Habilitar la pestaña de pago cuando se selecciona una forma de pago
  const paymentRadios = document.querySelectorAll('input[name="payment"]');
  paymentRadios.forEach(function (radio) {
      radio.addEventListener("change", function () {
          // Habilitar la pestaña de pago
          if (!paymentTab.classList.contains("disabled")) {
              goToNextTab(addressTab, paymentTab);
          }
      });
  });

  // Validación final al hacer clic en "finalizar compra"
  const finalizarCompraButton = document.getElementById("finalize-purchase");
  finalizarCompraButton.addEventListener("click", function (event) {
      event.preventDefault(); // Evitar el envío del formulario inicialmente

      // Validar la sección de dirección
      if (!validateAddressSection()) {
          alert("Por favor, completa todos los campos obligatorios de la dirección.");
          return;
      }

      // Validar la forma de pago
      if (!validatePaymentSection()) {
          alert("Por favor, selecciona una forma de pago y completa todos los campos obligatorios.");
          return;
      }

      // Si todo es válido, continuar con el proceso de compra
      alert("¡Compra exitosa!");
      window.location.href = 'categories.html'; // Redirigir a la página de categorías o donde lo necesites
  });

  // Funcionalidad para mostrar los campos correspondientes según el método de pago
  const debitFields = document.getElementById("debitFields");
  const creditFields = document.getElementById("creditFields");
  const bankFields = document.getElementById("bankFields");
  const cashFields = document.getElementById("cashFields");

  function hideAllPaymentFields() {
      debitFields.style.display = "none";
      creditFields.style.display = "none";
      bankFields.style.display = "none";
      cashFields.style.display = "none";
  }

  paymentRadios.forEach(function (radio) {
      radio.addEventListener("change", function () {
          hideAllPaymentFields();

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
