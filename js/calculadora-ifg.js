/*Creando las variables*/
const sexo = prompt('Ingrese su sexo (hombre/mujer):').toLowerCase();
const edad = parseInt(prompt('Ingrese su edad (años):'), 10);
const peso = parseFloat(prompt('Ingrese su peso (kg):'));
const creatinina = parseFloat(prompt('Ingrese su creatinina sérica (mg/dL):'));
const esNegro = prompt('¿Es usted de raza negra? (si/no):').toLowerCase();

/*Verificando que los datos sean correctos*/
if ((sexo !== 'hombre' && sexo !== 'mujer') || isNaN(edad) || isNaN(peso) || isNaN(creatinina) || (esNegro !== 'si' && esNegro !== 'no')) {
     alert('Datos ingresados no son válidos. Inténtelo de nuevo.');
}

/*Realizando la fórmula por sexo*/
let factorSexo;
const factorRacial = (esNegro === 'si') ? 1.21 : 1;
switch (sexo) {
    case 'hombre':
        factorSexo = 1;
        const depuracionCreatininaH= ((140 - edad) * peso * factorSexo) / (72 * creatinina) * factorRacial;
        alert('Su depuración de creatinina estimada es: ' + depuracionCreatininaH.toFixed(2) + ' ml/min');
        break;
    case 'mujer':
        factorSexo = 0.85;
        const depuracionCreatininaM = ((140 - edad) * peso * factorSexo) / (72 * creatinina) * factorRacial;
        alert('Su depuración de creatinina estimada es: ' + depuracionCreatininaM.toFixed(2) + ' ml/min');
        break;
    default:
        alert('Sexo no válido. Inténtelo de nuevo.');
}

/*Definiendo valores de referencia*/
let valoresReferencia;
if (sexo === 'hombre') {
    valoresReferencia = 'Valor normal para hombres: 90-120 ml/min';
} else if (sexo === 'mujer') {
    valoresReferencia = 'Valor normal para mujeres: 80-120 ml/min';
} else {
    valoresReferencia = 'No se pueden mostrar valores de referencia porque ingresó la información de sexo incorrecta';
}

alert(valoresReferencia);
location.reload();
