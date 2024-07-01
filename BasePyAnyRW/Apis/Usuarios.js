url = "https://RaulWeissmann1.pythonanywhere.com/usuarios"
fetch(url)
    .then(response => response.json())
    .then(
        data => {
            console.log(data)
            cad=``
            for (item of data ){
                cad=cad+`
                <tr class="">usuarios.idUsuarios}</td>
                    <td>${plantas.NombreYApellido}</td>
                    <td>${plantas.Email}</td>
                    <td>${plantas.Clave}</td>
                    <td>${plantas.RolDba}</td>
                    <td>${plantas.Ciudad}</td>
                    <td>${plantas.Provincia}</td>
                    <td>${plantas.Pais}</td>
                    <td>${plantas.Estado}</td>
                    <td>${plantas.Proceso}</td>
                </tr>
                <td>
                    <a href="" class="btn btn-primary">Editar</a>
                    <a href="" class="btn btn-primary">Borrar</a>
                </td>
            }

            console.log(cad)
            document.querySelector("tbody").innerHTML=cad
        }
    )
    .catch(error => {
        console.log("Error:" + error)
        this.error = true
    });
//Faltan acciones y eliminar
//Alta
//Baja
//Modificaciones