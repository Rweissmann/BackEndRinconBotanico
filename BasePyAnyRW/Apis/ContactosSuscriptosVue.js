const {createApp} = Vue
  createApp({
    data() {
      return {
        mensajes:[],
        //url:'http://RaulWeissmann1.pythonwhere.com:5000/mensajes', 
   // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
        url:'http://RaulWeissmann1.pythonwhere.com/contactos_suscriptos',   // si ya lo subieron a pythonanywhere
        error:false,
        cargando:true,
        /*atributos para el guardar los valores del formulario */
        idContacto:0, 
        Emails:"",
    }  
    },

    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.contactos_suscriptos = data;
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
			 alert('Registro Contacto Suscripto Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },

        grabar(){
            let contactos_suscriptos = {
                Emails: this.Emails,         
            }
            var options = {
                body:JSON.stringify(contactos_suscriptos),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }

            fetch(this.url, options)
                .then(function () {
                    alert("Registro Contactos Suscriptos Grabado")
                    window.location.href = "./ContactosSuscriptosVue.html";  // recarga mensajes.html
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
