console.log(location.search)      // lee los argumentos pasados a este formulario
var id=location.search.substr(4)  // Usuarios_update.html?id=1
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        idMensajes:0,
        NombreYApellido:"",
        Email:"",
        Direccion:"",
        Celular:"",
        CodigoArea:"",
        Area:""
        Mensaje:"",
        Archivo:"",
        Estado:"I",
        Proceso:"N",
        url:'http://RaulWeissmann1.pythonanywhere.com/mensajes/'+id,      
       }  
    },

    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.idMensajes=data.idMensajes
                    this.NombreYApellido = data.NombreYApellido
                    this.Email=data.Email
                    this.Direccion=data.Direccion
                    this.Celular=data.Celular
                    this.CodigoArea=data.CodigoArea
                    this.Area=data.Area
                    this.Mensaje=data.Mensaje
                    this.Archivo=data.Archivo
                    this.Estado=data.Estado
                    this.Proceso=data.Proceso
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        
        modificar() {
            let mensajes = {
                NombreYApellido:this.NombreYApellido,
                Email: this.Email,
                Direccion=this.Direccion,
		Celular=this.Celular,
		CodigoArea=this.CodigoArea,
		Area=this.Area,
		Mensaje=this.Mensaje,
                Archivo=this.Archivo,
                Estado: this.Estado,
                Proceso: this.Proceso
            }
            var options = {
                body: JSON.stringify(mensajes),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro mensajes modificado")
                    window.location.href = "./MwensajesVue.html"; // navega a productos.html          
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