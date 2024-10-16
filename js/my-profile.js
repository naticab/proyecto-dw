//Evento para cerrar sesión
document.getElementById('log-out').addEventListener('click', function () {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    sessionStorage.removeItem('user-name');
    
    console.log("Sesión cerrada correctamente.");
    
});



document.addEventListener("DOMContentLoaded", function () {
    // Obtener el email del login y precargar en el campo
    const emailField = document.getElementById("email");
    const savedEmail = localStorage.getItem("userEmail");
    if (savedEmail) {
      emailField.value = savedEmail;
    }

    // Cargar la imagen de perfil guardada en localStorage
    const profilePic = document.getElementById("profilePic");
    const savedProfilePic = localStorage.getItem("profilePic");
    if (savedProfilePic) {
      profilePic.src = savedProfilePic;
    }

    // Manejar la carga de una nueva imagen de perfil
    const profilePicInput = document.getElementById("profilePicInput");
    profilePicInput.addEventListener("change", function (event) {
      const file = event.target.files[0]; // Obtener el archivo seleccionado
      if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
          // Guardar la imagen en localStorage
          localStorage.setItem("profilePic", e.target.result);
          profilePic.src = e.target.result; // Actualizar la imagen mostrada
        };
        reader.readAsDataURL(file); // Leer la imagen como URL de datos
      }
    });
  
    // Validación del formulario
    document.getElementById("regBtn").addEventListener("click", function (e) {
      e.preventDefault(); // Evita el envío del formulario
  
      let isValid = true;
  
      // Validar campos requeridos
      const nombre1 = document.getElementById("nombre1");
      const apellido = document.getElementById("apellido");
      const email = document.getElementById("email");
  
      if (!nombre1.value.trim()) {
        nombre1.classList.add("is-invalid");
        isValid = false;
      } else {
        nombre1.classList.remove("is-invalid");
        nombre1.classList.add("is-valid");
      }
  
      if (!apellido.value.trim()) {
        apellido.classList.add("is-invalid");
        isValid = false;
      } else {
        apellido.classList.remove("is-invalid");
        apellido.classList.add("is-valid");
      }
  
      if (!email.value.trim()) {
        email.classList.add("is-invalid");
        isValid = false;
      } else {
        email.classList.remove("is-invalid");
        email.classList.add("is-valid");
      }
  
      // Si todo es válido, guardar en localStorage
      if (isValid) {
        localStorage.setItem("nombre", nombre1.value);
        localStorage.setItem("apellido", apellido.value);
        localStorage.setItem("userEmail", email.value);
  
        alert("Datos guardados con éxito.");
        
      }
    });
  });
  