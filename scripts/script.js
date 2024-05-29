const videoUrl = (url) => {
    document.getElementById('slider').src = url;
};


function formatDate(dateStr) {
    const date = new Date(dateStr);
    const options = {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false
    };
    return date.toLocaleDateString('es-ES', options).replace(',', '');
}

function cita(event) {
    event.preventDefault(); // Previene el envío del formulario
    var fecha = document.getElementById('fecha').value;
    var nombre = document.getElementById('nombre').value;
    var problema = document.getElementById('problema').value;

    if (fecha) {
        const formattedDate = formatDate(fecha);
        const { jsPDF } = window.jspdf;
        const doc = new jsPDF();
        doc.setFontSize(16);
        doc.text(20, 20, "Universidad Politécnica de San Luis Potosí");
        doc.setFontSize(12);
        doc.text(20, 30, "Urbano Villalón No. 500 La Ladrillera, 78363 San Luis Potosí, S.L.P.");
        doc.text(20, 40, "Tel: 444 870 2100");
        doc.text(20, 50, "Horario de Atención:");
        doc.text(20, 60, "Lunes a Viernes: 8 a.m. - 6:30 p.m.");
        doc.setFontSize(16);
        doc.text(20, 80, "Cita Programada");
        doc.setFontSize(12);
        doc.text(20, 90, "Nombre: " + nombre);
        doc.text(20, 100, "Fecha y Hora: " + formattedDate);
        doc.text(20, 110, "Descripción del Problema: " + problema);
        doc.text(20, 130, "Te esperamos en las oficinas de control escolar.");
        doc.text(20, 140, "Gracias por tu atención.");

        doc.save('Cita.pdf');
        const pdfDataUri = doc.output('datauristring');
        document.getElementById('pdfFrame').src = pdfDataUri;
    } else {
        document.getElementById('resultado').innerText = 'No se ha seleccionado una fecha y hora.';
    }
}


function enviarFormulario(event) {
    event.preventDefault(); // Evitar que el formulario se envíe de manera tradicional
    
    // Obtener los datos del formulario
    var nombre = document.getElementById("nombre").value;
    var email = document.getElementById("email").value;
    var carrera = document.getElementById("carrera").value;
    var tema = document.getElementById("tema").value;
    var mensaje = document.getElementById("mensaje").value;
    
    // Determinar la dirección de correo electrónico de destino basado en la carrera seleccionada
    var correoDestino;
    if (carrera === "ITI") {
        correoDestino = "iti@upslp.edu.mx";
    } else if (carrera === "ITEM") {
        correoDestino = "item@upslp.edu.mx";
    }
    
    // Crear el enlace de correo con los datos
    var enlaceCorreo = "mailto:" + correoDestino + "?subject=" + encodeURIComponent(tema) + "&body=";
    enlaceCorreo += encodeURIComponent("Nombre: " + nombre + "\n");
    enlaceCorreo += encodeURIComponent("Correo electrónico: " + email + "\n");
    enlaceCorreo += encodeURIComponent("Carrera: " + carrera + "\n");
    enlaceCorreo += encodeURIComponent("Tema del mensaje: " + tema + "\n");
    enlaceCorreo += encodeURIComponent("Mensaje: " + mensaje);
    
    // Abrir el enlace de correo
    window.location.href = enlaceCorreo;
}
