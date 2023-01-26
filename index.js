function leerExcel() {
  var input = document.getElementById("input");
  readXlsxFile(input.files[0]).then(function (data) {
    procesarInformacion(data);
  });
}

var cadena = ""

function procesarInformacion(registros) {

  for (let i = 0; i < registros.length; i++) {

    registros[i][1] = registros[i][1].substring(0, 2)
    registros[i][4] = registros[i][4].substring(0, 2)

    if (registros[i][2].substring(0, 2) == "12") {
      if (registros[i][3] == "p. m.") {
        registros[i][2] = 12
      } else {
        registros[i][2] = 0
      }
    } else {
      if (registros[i][3] == "p. m.") {
        registros[i][2] = parseInt(registros[i][2].substring(0, 2)) + 12
      } else {
        registros[i][2] = parseInt(registros[i][2].substring(0, 2))
      }
    }

    if (registros[i][5].substring(0, 2) == "12") {
      if (registros[i][6] == "p. m.") {
        registros[i][5] = 12
      } else {
        registros[i][5] = 0
      }
    } else {
      if (registros[i][6] == "p. m.") {
        registros[i][5] = parseInt(registros[i][5].substring(0, 2)) + 12
      } else {
        registros[i][5] = parseInt(registros[i][5].substring(0, 2))
      }
    }
  }

  crearCadena(registros)
}

var tabla = document.getElementById("tabla")

function crearCadena(registros) {

  cadena = ""

  var dias = []
  for (let i = 0; i < registros.length; i++) {
    dias.push(registros[i][1])
  }
  // Eliminando elementos duplicados
  let result = dias.filter((item, index) => {
    return dias.indexOf(item) === index;
  })
  dias = result.sort()

  var usuarios = []
  for (let i = 0; i < registros.length; i++) {
    usuarios.push(registros[i][0])
  }
  // Eliminando elementos duplicados
  result = usuarios.filter((item, index) => {
    return usuarios.indexOf(item) === index;
  })
  usuarios = result.sort()

  var horas = []
  var horasSalida = []
  var horasTotales = []
  var band = true
  var band2 = true

  var conectados = []

  for (let i = 0; i < dias.length; i++) {
    cadena += `<h1>Día ${dias[i]} de enero de 2023</h1>`
    cadena += `<table border="1"><tr><th></th><th>12 am</th><th>1 am</th><th>2 am</th><th>3 am</th><th>4 am</th><th>5 am</th><th>6 am</th><th>7 am</th><th>8 am</th><th>9 am</th><th>10 am</th><th>11 am</th><th>12 pm</th><th>1 pm</th><th>2 pm</th><th>3 pm</th><th>4 pm</th><th>5 pm</th><th>6 pm</th><th>7 pm</th><th>8 pm</th><th>9 pm</th><th>10 pm</th><th>11 pm</th><th>Total</th><th>Se conectó</th></tr>`

    for (let j = 0; j < usuarios.length; j++) {

      cadena += `<tr><td>${usuarios[j]}</td>`

      horas = []
      horasSalida = []
      band = true
      band2 = true

      // Lo mismo pero revisando los dias de salida
      for (let k = 0; k < registros.length; k++) {
        if (dias[i] === registros[k][4] && usuarios[j] === registros[k][0]) {
          if (registros[k][4] > registros[k][1]) {
            horas.push("0")
            horasSalida.push(registros[k][5])
            conectados = conectados.filter(item => item != registros[k][0])
          }
        }
      }

      for (let k = 0; k < conectados.length; k++) {
        if (usuarios[j] === conectados[k]) {
          horas.push("0")
          horasSalida.push("23")
        }
      }

      for (let k = 0; k < registros.length; k++) {
        if (dias[i] === registros[k][1] && usuarios[j] === registros[k][0]) {
          if (parseInt(registros[k][4]) > parseInt(registros[k][1])) {
            horas.push(registros[k][2])
            horasSalida.push("23")
            conectados.push(registros[k][0])
          } else if (registros[k][4] === registros[k][1]) {
            horas.push(registros[k][2])
            horasSalida.push(registros[k][5])
          }
        }
      }

      horasTotales = ["", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", "", ""]
      for (let k = 0; k < horas.length; k++) {
        for (let l = horas[k]; l <= horasSalida[k]; l++) {
          horasTotales[l] = 1
        }
      }

      for (let k = 0; k < horasTotales.length; k++) {
        if (horasTotales[k] === 1 && band2) {
          cadena += `<td bgcolor="lightblue"></td>`
          band = false
          band2 = false
        }
        else if (horasTotales[k] === 1 && band) {
          cadena += `<td bgcolor="lightblue">${horasTotales[k]}</td>`
          band = false
          band2 = false
        } else if (horasTotales[k] === 1) {
          cadena += `<td bgcolor="lightblue"></td>`
          band2 = false
        } else {
          cadena += `<td></td>`
          band = true
          band2 = false
        }
      }

      let total = 0
      let bandSeConecto = false
      for (let k = 0; k < horasTotales.length; k++) {
        if (horasTotales[k] === 1) {
          total++
        }
      }

      if (total > 0) {
        cadena += `<td bgcolor="lightblue">${total}</td><td bgcolor="lightblue">Sí</td></tr>`
      } else {
        cadena += `<td></td><td></td></tr>`
      }

    }

    cadena += `<tr><th>Total</th><td></td></tr></table>`
  }

  tabla.innerHTML = cadena
}