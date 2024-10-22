document.addEventListener("DOMContentLoaded", function () {
  const defaultFile = 'img/usuario.png';
  const fileInput = document.getElementById('foto');
  const profilePic = document.getElementById('profilePic');
  const userImageElement = document.getElementById('user-image');
  const userImage = userImageElement ? userImageElement.querySelector('img') : null;

  // Cargar la imagen de perfil desde localStorage 
  const savedImage = localStorage.getItem('profileImage');
  if (savedImage) {
    profilePic.src = savedImage; // Actualiza la imagen en el perfil
    if (userImage) userImage.src = savedImage; // Actualiza la imagen en el header 
  } else {
    profilePic.src = defaultFile; // Imagen por defecto
    if (userImage) userImage.src = defaultFile; // Imagen por defecto 
  }

  fileInput.addEventListener('change', e => {
    if (e.target.files[0]) {
      const reader = new FileReader();
      reader.onload = function (e) {
        const imageBase = e.target.result;
        profilePic.src = imageBase; // Actualiza la imagen en el perfil
        if (userImage) userImage.src = imageBase; // Actualiza la imagen en el header 
        localStorage.setItem('profileImage', imageBase); // Guarda la imagen en localStorage
      };
      reader.readAsDataURL(e.target.files[0]); // Lee el archivo como URL en Base64
    } else {
      profilePic.src = defaultFile; // Imagen por defecto
      if (userImage) userImage.src = defaultFile; // Imagen por defecto 
      localStorage.removeItem('profileImage'); // Eliminar imagen de localStorage
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

  if (localStorage.getItem("userEmail")) {
    email.value = localStorage.getItem("userEmail");
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

    // Si todo es válido, guardar en localStorage
    if (isValid) {
      localStorage.setItem("nombre", nombre1.value);
      localStorage.setItem("apellido", apellido.value);
      localStorage.setItem("userEmail", email.value);
      alert("Datos guardados con éxito.");
    }
  });
});
