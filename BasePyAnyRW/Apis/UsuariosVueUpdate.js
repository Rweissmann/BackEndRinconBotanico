console.log(location.search)      // lee los argumentos pasados a este formulario
var id=location.search.substr(4)  // Usuarios_update.html?id=1
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        idUsuarios:0,
        NombreYApellido:"",
        Email:"",
        Clave:"",
        RolDba:"",
        Ciudad:"",
        Provincia:""
        Pais:"",
        Estado:"I",
        Proceso:"N",
        url:'http://RaulWeissmann1.pythonanywhere.com/usuarios/'+id,
       }  
    },

    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.idUsuarios=data.idUsuarios
                    this.NombreYApellido = data.NombreYApellido
                    this.Email=data.Email
                    this.Clave=data.Clave
                    this.RolDba=data.RolDba
                    this.Ciudad=data.Ciudad
                    this.Provincia=data.Provincia
                    this.Pais=data.Pais                    
                    this.Estado=data.Estado
                    this.Proceso=data.Proceso
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        
        modificar() {
            let usuarios = {
                NombreYApellido:this.NombreYApellido,
                Email: this.Email,
                Clave: this.Clave,
                RolDba: this.RolDba,
                Ciudad: this.Ciudad,
                Provincia: this.Provincia,
                Pais: this.Pais,
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
                    alert("Registro usuario modificado")
                    window.location.href = "./UsuariosVue.html"; // navega a productos.html          
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