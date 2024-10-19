//Evento para cerrar sesión
document.getElementById('log-out').addEventListener('click', function () {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('username');
    sessionStorage.removeItem('user-name');
    
    console.log("Sesión cerrada correctamente.");
    
});

document.addEventListener("DOMContentLoaded", function () {
  const defaultFile = 'img/usuario.png';
  const fileInput = document.getElementById('foto');
  const profilePic = document.getElementById('profilePic');

  // Cargar la imagen de perfil desde localStorage si existe
  const savedImage = localStorage.getItem('profileImage');
  if (savedImage) {
    profilePic.src = savedImage; // Si existe una imagen guardada, se muestra
  } else {
    profilePic.src = defaultFile; // Si no, se usa la imagen por defecto
  }

  // Escucha el cambio en el input de archivo
  fileInput.addEventListener('change', e => {
  if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
          const imageBase = e.target.result;
          profilePic.src = imageBase; // Actualiza la imagen con la nueva foto
          localStorage.setItem('profileImage', imageBase); // Guarda la imagen en localStorage
      };
    reader.readAsDataURL(e.target.files[0]); // Lee el archivo como URL en Base64
  } else {
    profilePic.src = defaultFile; // Si no hay un archivo seleccionado, usa la imagen por defecto
    localStorage.removeItem('profileImage'); // Elimina la imagen de localStorage
  }

});

  // Obtener el email del login y precargar en el campo
  const emailField = document.getElementById("email");
  const savedEmail = localStorage.getItem("userEmail");
  if (savedEmail) {
    emailField.value = savedEmail;
  }
  
  // Validación del formulario
  document.getElementById("regBtn").addEventListener("click", function (e) {
      e.preventDefault(); // Evita el envío del formulario
      let isValid = true;
    
      // Validar campos requeridos
      const nombre1 = document.getElementById("nombre1");
      const apellido = document.getElementById("apellido1");
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
  