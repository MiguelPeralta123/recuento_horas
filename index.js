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
        registros[i][2] = 12
      } else {
        if (registros[i][3] == "p. m.") {
          registros[i][2] = parseInt(registros[i][2].substring(0, 2)) + 12
        } else {
          registros[i][2] = parseInt(registros[i][2].substring(0, 2))
        }
      }

      if (registros[i][5].substring(0, 2) == "12") {
        registros[i][5] = 12
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
    let result = dias.filter((item,index)=>{
      return dias.indexOf(item) === index;
    })
    result.sort()

    for (let i = 0; i < result.length; i++) {
      cadena += `<h1>Día ${result[i]} de enero de 2023</h1>`

    }

    tabla.innerHTML = cadena
  }