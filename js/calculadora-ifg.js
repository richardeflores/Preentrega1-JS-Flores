// Obteniendo los datos mediante función
function obtenerDatos() {
    const sexo = prompt('Ingrese su sexo (hombre/mujer):').toLowerCase();
    const edad = parseInt(prompt('Ingrese su edad (años):'), 10);
    const peso = parseFloat(prompt('Ingrese su peso (kg):'));
    const creatinina = parseFloat(prompt('Ingrese su creatinina sérica (mg/dL):'));
    const esNegro = prompt('¿Es usted de raza negra? (si/no):').toLowerCase();
    //creación de un objeto de los valores ingresados
    return { sexo, edad, peso, creatinina, esNegro };
}

// Validando los datos
function sonDatosValidos({ sexo, edad, peso, creatinina, esNegro }) {
    return (sexo === 'hombre' || sexo === 'mujer') && !isNaN(edad) && !isNaN(peso) && !isNaN(creatinina) && (esNegro === 'si' || esNegro === 'no');
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

// Ejecutar la función automáticamente al cargar la página
window.onload = calcularDepuracionCreatinina;