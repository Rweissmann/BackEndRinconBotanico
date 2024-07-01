const {createApp} = Vue
  createApp({
    data() {
      return {
        mensajes:[],
        //url:'http://RaulWeissmann1.pythonwhere.com:5000/mensajes', 
   // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
        url:'http://RaulWeissmann1.pythonwhere.com/mensajes',   // si ya lo subieron a pythonanywhere
        error:false,
        cargando:true,
        /*atributos para el guardar los valores del formulario */
        idMensajes:0,
        NombreYApellido:"", 
        Email:"",
        Direccion:"",
        Celular:"",
        CodigoArea:"",
        Area:"",
        Mensaje:"",
        Archivo:"",
        Estado:"I",
        Proceso:"N",
    }  
    },

    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.mensajes = data;
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
			 alert('Registro Mensaje Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },

        grabar(){
            let mensajes = {
                NombreYApellido:this.NombreYApellido,
                Email: this.Email,
                Direccion: this.Direccion,
                Celular: this.Celular,
                CodigoArea: this.CodigoArea,
                Area: this.Area,
                Mensaje: this.Mensaje, 
                Archivo: this.Archivo,
                Estado:this.Estado,
                Proceso:this.Proceso            
            }
            var options = {
                body:JSON.stringify(mensajes),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }

            fetch(this.url, options)
                .then(function () {
                    alert("Registro Mensajes Grabado")
                    window.location.href = "./MensajesVue.html";  // recarga mensajes.html
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
