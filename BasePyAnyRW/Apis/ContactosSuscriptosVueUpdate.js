console.log(location.search)      // lee los argumentos pasados a este formulario
var id=location.search.substr(4)  // ContactosSuscriptos_update.html?id=1
console.log(id)
const { createApp } = Vue
  createApp({
    data() {
      return {
        idContacto:0,
        Emails:"",
        url:'http://RaulWeissmann1.pythonanywhere.com/contactos_suscriptos/'+id,      
       }  
    },

    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    console.log(data)
                    this.idContacto=data.idContacto
                    this.Emails=data.Emails
                })
                .catch(err => {
                    console.error(err);
                    this.error=true              
                })
        },
        
        modificar() {
            let contactos_suscriptos = {
                Emails: this.Emails
            }
            var options = {
                body: JSON.stringify(contactos_suscriptos),
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro Contactos Suscriptos modificado")
                    window.location.href = "./ContactosSuscriptosVue.html"; // navega a productos.html          
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