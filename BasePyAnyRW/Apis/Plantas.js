url = "https://RaulWeissmann1.pythonanywhere.com/plantas"
fetch(url)
    .then(response => response.json())
    .then(
        data => {
            console.log(data)
            cad=``
            for (item of data ){
                cad=cad+`
                <tr class="">plantas.idPlantas}</td>
                    <td>${plantas.PlantasNombre}</td>
                    <td>${plantas.Categoria}</td>
                    <td>${plantas.CategoriaDescripcion}</td>
                    <td>${plantas.Estado}</td>
                    <td>${plantas.Proceso}</td>
                <td>
                       '''<img width="100"  src=${plantas.imagen}  alt=${plantas.PlantasNombre}   >
                    </td>
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
