url = "https://RaulWeissmann1.pythonanywhere.com/data_plantas"
fetch(url)
    .then(response => response.json())
    .then(
        data => {
            console.log(data)
            cad=``
            for (item of data ){
                cad=cad+`
                <tr class="">plantas.idDataPlantas}</td>
                    <td>${data_plantas.PlantasNombre}</td>
                    <td>${data_plantas.Ubicacion}</td>
                    <td>${data_plantas.Sustrato}</td>
                    <td>${data_plantas.Riego}</td>
                    <td>${data_plantas.Floracion}</td>
                    <td>${data_plantas.Tamano}</td>
                    <td>${data_plantas.Observaciones}</td>
                    <td><img width="100"  src=${plantas.imagen}  alt=${plantas.PlantasNombre}></td>
                    <td>${data_plantas.Estado}</td>
                    <td>${data_plantas.Proceso}</td>
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
//Acciones NewHtml para alta
//Acciones Html Modificar
//Borrar