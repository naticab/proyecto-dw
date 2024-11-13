document.addEventListener("DOMContentLoaded", function() {
    const tabs = document.querySelectorAll("#checkoutTabs .nav-link");
    const contentSections = document.querySelectorAll(".tab-pane");
  
    // Función para validar cada sección
    function validateSection(index) {
      // Selecciona la sección actual en base al índice
      const section = contentSections[index];
      const inputs = section.querySelectorAll("input[required]");
      
      // Verifica que todos los campos requeridos estén llenos
      return Array.from(inputs).every(input => input.checked || input.value.trim() !== "");
    }
  
    // Función para activar la siguiente viñeta si está completa
    function enableNextTab(currentIndex) {
      if (validateSection(currentIndex)) {
        tabs[currentIndex + 1]?.classList.remove("disabled");
      }
    }
  
    // Desactiva todas las pestañas menos la primera
    tabs.forEach((tab, index) => {
      if (index > 0) tab.classList.add("disabled");
      
      // Evento para cambio de pestaña
      tab.addEventListener("click", (event) => {
        if (tab.classList.contains("disabled")) {
          event.preventDefault();
        }
      });
    });
  
    // Control de validación y activación
    contentSections.forEach((section, index) => {
      const inputs = section.querySelectorAll("input[required]");
      inputs.forEach(input => {
        input.addEventListener("change", () => {
          enableNextTab(index);
        });
      });
    });
  });
  