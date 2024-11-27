document.addEventListener("DOMContentLoaded", function () {
  const defaultFile = 'img/usuario.png'; // Imagen por defecto
  const fileInput = document.getElementById('foto');
  const profilePic = document.getElementById('profilePic');
  const userImageElement = document.getElementById('user-image');
  const userImage = userImageElement ? userImageElement.querySelector('img') : null;

  // Cargar la imagen de perfil desde localStorage si existe
  const savedImage = localStorage.getItem('profileImage');
  if (savedImage) {
    // Si existe una imagen guardada en localStorage, actualizar la imagen del perfil
    profilePic.src = savedImage;
    if (userImage) userImage.src = savedImage; // También actualizar en el encabezado
  } else {
    // Si no hay imagen guardada, cargar la imagen por defecto
    profilePic.src = defaultFile;
    if (userImage) userImage.src = defaultFile;
  }

  // Evento para cambiar la imagen de perfil cuando el usuario selecciona un archivo
  fileInput.addEventListener('change', function (e) {
    const file = e.target.files[0]; // Obtén el primer archivo seleccionado
    if (file) {
      const reader = new FileReader();
      reader.onload = function (event) {
        const imageBase64 = event.target.result; // Obtiene la imagen en Base64
        profilePic.src = imageBase64; // Actualiza la imagen del perfil
        if (userImage) userImage.src = imageBase64; // También actualiza la imagen en el encabezado
        localStorage.setItem('profileImage', imageBase64); // Guarda la imagen en localStorage
      };
      reader.readAsDataURL(file); // Convierte el archivo a Base64
    } else {
      // Si no se selecciona archivo (por ejemplo, si se elimina la imagen)
      profilePic.src = defaultFile; // Restaurar la imagen por defecto
      if (userImage) userImage.src = defaultFile; // Restaurar también en el encabezado
      localStorage.removeItem('profileImage'); // Eliminar la imagen del localStorage
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
