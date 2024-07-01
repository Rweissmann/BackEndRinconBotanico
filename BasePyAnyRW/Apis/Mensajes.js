url = "https://RaulWeissmann1.pythonanywhere.com/mensajes"
fetch(url)
    .then(response => response.json())
    .then(
        data => {
            console.log(data)
            cad=``
            for (item of data ){
                cad=cad+`
                <tr class="">mensajes.idMensajes}</td>
                    <td>${mensajes.NombreYApellido}</td>
                    <td>${mensajes.Email}</td>
                    <td>${mensajes.Direccion}</td>
                    <td>${mensajes.Celular}</td>
                    <td>${mensajes.CodigoArea}</td>
                    <td>${mensajes.Area}</td>
                    <td>${mensajes.Mensaje}</td>
                    <td>${mensajes.Archivo}</td>
                    <td>${mensajes.Estado}</td>
                    <td>${mensajes.Proceso}</td>
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
