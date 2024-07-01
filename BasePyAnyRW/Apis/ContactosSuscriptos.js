url = "https://RaulWeissmann1.pythonanywhere.com/contactos_suscriptos"
fetch(url)
    .then(response => response.json())
    .then(
        data => {
            console.log(data)
            cad=``
            for (item of data ){
                cad=cad+`
                <tr class="">contactos_suscriptos.idContacto}</td>
                    <td>${contactos_suscriptos.Emails}</td>
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
