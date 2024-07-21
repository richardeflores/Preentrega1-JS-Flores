// Array de usuarios registrados
let usuariosRegistrados = ['richard', 'profe', 'invitado'];
// Array de historial de pacientes
let historialPacientes = [
    { nombre: 'Paciente1', edad: 45, sexo: 'hombre', peso: 70, creatinina: 1.1, esNegro: 'no' },
    { nombre: 'Paciente2', edad: 30, sexo: 'mujer', peso: 60, creatinina: 0.9, esNegro: 'si' },
    { nombre: 'Paciente3', edad: 55, sexo: 'hombre', peso: 80, creatinina: 1.2, esNegro: 'no' },
];

function login() {
    // Solicitamos el nombre de usuario mediante un prompt
    const username = prompt('Ingrese su usuario:').toLowerCase();
    const usuarioValido = usuariosRegistrados.some(usuario => usuario === username);

    if (usuarioValido) {
        alert("Login exitoso!");
        elegirAccion(); // Llamamos a la función para elegir la acción a realizar
    } else {
        alert("Nombre de usuario incorrecto.");
        location.reload(); // Recargamos la página si el login falla
    }
}

function elegirAccion() {
    const accion = prompt('¿Qué desea hacer? (1: Calcular depuración de creatinina, 2: Revisar historial de pacientes)');
    if (accion === '1') {
        calcularDepuracionCreatinina();
    } else if (accion === '2') {
        revisarHistorial();
    } else {
        alert('Opción no válida. Inténtelo de nuevo.');
        elegirAccion(); // Pedimos de nuevo la acción si la opción no es válida
    }
}

// Obteniendo los datos mediante función
function obtenerDatos() {
    const sexo = prompt('Ingrese su sexo (hombre/mujer):').toLowerCase();
    const edad = parseInt(prompt('Ingrese su edad (años):'), 10);
    const peso = parseFloat(prompt('Ingrese su peso (kg):'));
    const creatinina = parseFloat(prompt('Ingrese su creatinina sérica (mg/dL):'));
    const esNegro = prompt('¿Es usted de raza negra? (si/no):').toLowerCase();
    return { sexo, edad, peso, creatinina, esNegro };
}

// Validando los datos
function sonDatosValidos({ sexo, edad, peso, creatinina, esNegro }) {
    return (sexo === 'hombre' || sexo === 'mujer') &&
           !isNaN(edad) && !isNaN(peso) && !isNaN(creatinina) &&
           (esNegro === 'si' || esNegro === 'no');
}

// Función para calcular la depuración de creatinina basada en el sexo
function calcularDepuracionCreatininaPorSexo(sexo, edad, peso, creatinina, factorRacial) {
    let factorSexo;
    switch (sexo) {
        case 'hombre':
            factorSexo = 1;
            break;
        case 'mujer':
            factorSexo = 0.85;
            break;
        default:
            alert('Sexo no válido. Inténtelo de nuevo.');
            return null;
    }
    return ((140 - edad) * peso * factorSexo) / (72 * creatinina) * factorRacial;
}

function calcularDepuracionCreatinina() {
    // Creación de un objeto con los valores ingresados
    const datos = obtenerDatos();

    // Verificar si los datos no son válidos
    if (!sonDatosValidos(datos)) {
        alert('Datos ingresados no son válidos. Inténtelo de nuevo.');
        location.reload();
        return;
    }

    const { sexo, edad, peso, creatinina, esNegro } = datos;
    const factorRacial = (esNegro === 'si') ? 1.21 : 1;
    const depuracionCreatinina = calcularDepuracionCreatininaPorSexo(sexo, edad, peso, creatinina, factorRacial);

    alert('Su depuración de creatinina estimada es: ' + depuracionCreatinina.toFixed(2) + ' ml/min');

    let valoresReferencia;
    if (sexo === 'hombre') {
        valoresReferencia = 'Valor normal para hombres: 90-120 ml/min';
    } else if (sexo === 'mujer') {
        valoresReferencia = 'Valor normal para mujeres: 80-120 ml/min';
    }

    alert(valoresReferencia);
    location.reload();
}

// Función para revisar el historial de pacientes
function revisarHistorial() {
    const nombrePaciente = prompt('Ingrese el nombre del paciente:').toLowerCase();
    const pacientesEncontrados = historialPacientes.filter(paciente => paciente.nombre.toLowerCase() === nombrePaciente);

    if (pacientesEncontrados.length > 0) {
        pacientesEncontrados.forEach(paciente => {
            alert(`Nombre: ${paciente.nombre}\nEdad: ${paciente.edad}\nSexo: ${paciente.sexo}\nPeso: ${paciente.peso}\nCreatinina: ${paciente.creatinina}\nRaza Negra: ${paciente.esNegro}`);
        });
    } else {
        alert('No se encontró el paciente.');
    }

    location.reload();
}

// Ejecutar la función automáticamente al cargar la página
window.onload = login;