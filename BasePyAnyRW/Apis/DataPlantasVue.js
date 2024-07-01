const {createApp} = Vue
  createApp({
    data() {
      return {
        dataplantas:[],
        //url:'http://RaulWeissmann1.pythonwhere.com:5000/data_plantas', 
   // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
        url:'http://RaulWeissmann1.pythonwhere.com/data_plantas',   // si ya lo subieron a pythonanywhere
        error:false,
        cargando:true,
        /*atributos para el guardar los valores del formulario */
        idDataPlantas:0,
        Ubicacion:"", 
        Sustrato"",
        Riego:"",
	Floracion:"",
        Tamano:"",
        Observaciones:"",
        LinkImagenes:"",
        Estado:"I",
        Proceso:"N",
    }  
    },

    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.plantas = data;
                    this.cargando=false
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },

        eliminar(id) {
            const url = this.url+'/' + id;
            var options = {
                method: 'DELETE',
            }
            fetch(url, options)
                .then(result => result.text()) // or res.json()
                .then(result => {
			 alert('Registro DataPlantas Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },

        grabar(){
            let data_plantas = {
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
                body:JSON.stringify(data_plantas),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }

            fetch(this.url, options)
                .then(function () {
                    alert("Registro Data Plantas Grabado")
                    window.location.href = "./DataPlantasVue.html";  // recarga productos.html
                })
                .catch(err => {
                    console.error(err);
                    alert("Error al Grabar")  // puedo mostrar el error tambien
                })      
        }
    },

    created() {
        this.fetchData(this.url)
    },
  }).mount('#app')
