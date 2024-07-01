console.log(location.search)      // lee los argumentos pasados a este formulario
var id=location.search.substr(4)  // plantas_update.html?id=1
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        idDataPlantas:0,
        Ubicacion:"",
        Sustrato:"",
        Riego:"",
        Floracion:"",
        Tamano:"",
        Observaciones:"",
        LinkImagenes:"",
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
                    this.idDataPlantas=data.idDataPlantas
                    this.Ubicacion = data.Ubicacion
                    this.Sustrato=data.Sustrato
                    this.Riego=data.Riego
                    this.Floracion = data.Floracion
                    this.Tamano=data.Tamano
                    this.Observaciones=data.Observaciones
                    this.LinkImagenes=data.LinkImagenes
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
                Ubicacion:this.Ubicacion,
                Sustrato: this.Sustrato,
                Riego: this.Riego,
                Floracion: this.Floracion,
                Tamano: this.Tamano,
                Observaciones: this.Observaciones,
                LinkImagenes: this.LinkImagenes,
                Estado: this.Estado,
                Proceso: this.Proceso
            }
            var options = {
                body: JSON.stringify(data_plantas),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro data_plantas modificado")
                    window.location.href = "./DataPlantasVue.html"; // navega a data_plantas.html          
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