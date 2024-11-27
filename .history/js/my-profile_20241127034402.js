document.addEventListener("DOMContentLoaded", function () {
  const defaultFile = 'img/usuario.png'; // Imagen predeterminada
  const fileInput = document.getElementById('foto');
  const profilePic = document.getElementById('profilePic');
  const userImageElement = document.getElementById('user-image');
  const userImage = userImageElement ? userImageElement.querySelector('img') : null;

  // Cargar la imagen de perfil desde localStorage si existe
  const savedImage = localStorage.getItem('profileImage');
  if (savedImage) {
    profilePic.src = savedImage; // Actualiza la imagen en el perfil
    if (userImage) userImage.src = savedImage; // Actualiza la imagen en el header 
  } else {
    profilePic.src = defaultFile; // Imagen por defecto
    if (userImage) userImage.src = defaultFile; // Imagen por defecto
  }

  // Evento para cambiar la imagen de perfil cuando el usuario selecciona un archivo
  fileInput.addEventListener('change', function (e) {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const imageBase64 = event.target.result; // Obtiene la imagen en Base64
        profilePic.src = imageBase64; // Muestra la nueva imagen en el perfil
        if (userImage) userImage.src = imageBase64; // También actualiza la imagen en el header
        localStorage.setItem('profileImage', imageBase64); // Guarda la imagen en localStorage
      };
      reader.readAsDataURL(file); // Convierte el archivo en una cadena Base64
    } else {
      // Si no se selecciona archivo, restaura la imagen por defecto
      profilePic.src = defaultFile;
      if (userImage) userImage.src = defaultFile;
      localStorage.removeItem('profileImage'); // Elimina la imagen de localStorage
    }
  });

  // Recuperar y cargar otros datos del perfil desde localStorage (si existen)
  const nombre1 = document.getElementById("nombre1");
  const apellido = document.getElementById("apellido1");
  const email = document.getElementById("email");

  if (localStorage.getItem("nombre")) {
    nombre1.value = localStorage.getItem("nombre");
  }
  if (localStorage.getItem("apellido")) {
    apellido.value = localStorage.getItem("apellido");
  }
  if (localStorage.getItem("username")) {
    email.value = localStorage.getItem("username");
  }

  // Guardar datos del formulario en localStorage
  document.getElementById("regBtn").addEventListener("click", function (e) {
    e.preventDefault(); // Evita el envío del formulario

    let isValid = true;

    // Validación de campos de texto
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

    // Validación del correo electrónico
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
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
