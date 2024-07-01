const {createApp} = Vue
  createApp({
    data() {
      return {
        usuarios:[],
        //url:'http://RaulWeissmann1.pythonwhere.com:5000/usuarios', 
   // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
        url:'http://RaulWeissmann1.pythonwhere.com/usuarios',   // si ya lo subieron a pythonanywhere
        error:false,
        cargando:true,
        /*atributos para el guardar los valores del formulario */
        idUsuarios:0,
        NombreYApellido:"", 
        Email:"",
        Clave:"",
        RolDba:"",
        Ciudad:"",
        Provincia:"",
        Pais:"",
        Estado:"I",
        Proceso:"N",
    }  
    },

    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.usuarios = data;
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
			 alert('Registro Usuario Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },

        grabar(){
            let plantas = {
                NombreYApellido:this.NombreYApellido,
                Email: this.Email,
                Clave: this.Clave,
                RolDba: this.RolDba,
                Ciudad: this.Ciudad,
                Provincia: this.Provincia,
                Pais: this.Pais,        
                Estado:this.Estado,
                Proceso:this.Proceso
                
            }
            var options = {
                body:JSON.stringify(usuarios),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }

            fetch(this.url, options)
                .then(function () {
                    alert("Registro Usuario Grabado")
                    window.location.href = "./UsuariosVue.html";  // recarga productos.html
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
