document.addEventListener("DOMContentLoaded", function () {
  const defaultFile = 'img/usuario.png';
  const fileInput = document.getElementById('foto');
  const profilePic = document.getElementById('profilePic');
  const profilePicHeader = document.getElementById('profilePicHeader');
  const userImageElement = document.getElementById('user-image');
  const userImage = userImageElement ? userImageElement.querySelector('img') : null;

  let tempImage = null; // Variable para almacenar temporalmente la imagen seleccionada

  // Cargar la imagen de perfil desde localStorage al iniciar
  const savedImage = localStorage.getItem('profileImage');
  if (savedImage) {
    profilePic.src = savedImage;
    if (userImage) userImage.src = savedImage;
  } else {
    profilePic.src = defaultFile;
    if (userImage) userImage.src = defaultFile;
  }

  // Escuchar cambios en el input de archivo
  fileInput.addEventListener('change', e => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        tempImage = e.target.result; // Guardar la imagen temporalmente
        profilePic.src = tempImage; // Actualizar la vista previa de la imagen
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      tempImage = null; // Borrar la imagen temporal
      profilePic.src = defaultFile; // Revertir a la imagen por defecto
    }
  });


  // Recuperar los datos guardados en localStorage al cargar la página
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

  // Validación del formulario y guardar datos en localStorage
  document.getElementById("regBtn").addEventListener("click", function (e) {
    e.preventDefault(); // Evita el envío del formulario
    let isValid = true;

    // Validar campos requeridos
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

    // Validación del email usando una expresión regular para verificar que tenga @
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email.value.trim() || !emailRegex.test(email.value)) {
      email.classList.add("is-invalid");
      isValid = false;
    } else {
      email.classList.remove("is-invalid");
      email.classList.add("is-valid");
    }

   // Si todo es válido, guardar datos en localStorage
   if (isValid) {
    localStorage.setItem("nombre", nombre1.value);
    localStorage.setItem("apellido", apellido.value);
    localStorage.setItem("userEmail", email.value);

    // Guardar la imagen de perfil solo si se seleccionó y se presionó guardar cambios
    if (tempImage) {
      localStorage.setItem('profileImage', tempImage);
      if (userImage) userImage.src = tempImage; // Actualizar imagen en el header
    }

    alert("Datos guardados con éxito.");
  }
});
});
