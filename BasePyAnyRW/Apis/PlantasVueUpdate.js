console.log(location.search)      // lee los argumentos pasados a este formulario
var id=location.search.substr(4)  // plantas_update.html?id=1
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        idPlantas:0,
        PlantasNombre:"",
        Categoria:0,
        CategoriaDescripcion:"",
        Estado:"I",
        Proceso:"N",
        url:'http://RaulWeissmann1.pythonanywhere.com/plantas/'+id,
       }  
    },

    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.idPlantas=data.idPlantas
                    this.PlantasNombre = data.PlantasNombre
                    this.Categoria=data.Categoria
                    this.CategoriaDescripcion=data.CategoriaDescripcion
                    this.Estado=data.Estado
                    this.Proceso=data.Proceso
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        
        modificar() {
            let plantas = {
                PlantasNombre:this.PlantasNombre,
                Categoria: this.precio,
                CategoriaDescripcion: this.CategoriaDescripcion,
                Estado: this.Estado,
                Proceso: this.Proceso
            }
            var options = {
                body: JSON.stringify(plantas),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro plantas modificado")
                    window.location.href = "./PlantasVue.html"; // navega a productos.html          
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Modificar")
                })      
        }
    },
    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')