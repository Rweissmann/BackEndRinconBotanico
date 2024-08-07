const {createApp} = Vue
  createApp({
    data() {
      return {
        plantas:[],
        //url:'http://RaulWeissmann1.pythonwhere.com:5000/plantas', 
   // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
        url:'http://RaulWeissmann1.pythonwhere.com/plantas',   // si ya lo subieron a pythonanywhere
        error:false,
        cargando:true,
        /*atributos para el guardar los valores del formulario */
        idPlantas:0,
        PlantasNombre:"", 
        Categoria:0,
        CategoriaDescripcion:"",
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
			 alert('Registro Plantas Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },

        grabar(){
            let plantas = {
                PlantasNombre:this.PlantasNombre,
                Categoria: this.Categoria,
                CategoriaDescripcion: this.CategoriaDescripcion,
                Estado:this.Estado,
                Proceso:this.Proceso
                
            }
            var options = {
                body:JSON.stringify(plantas),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }

            fetch(this.url, options)
                .then(function () {
                    alert("Registro Plantas Grabado")
                    window.location.href = "./PlantasVue.html";  // recarga productos.html
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
