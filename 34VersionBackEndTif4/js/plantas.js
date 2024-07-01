const { createApp } = Vue
  createApp({
    data() {
      return {
        plantas:[],
        //url:'http://127.0.0.1:5000/plantas', 
   // si el backend esta corriendo local  usar localhost 5000(si no lo subieron a pythonanywhere)
        url:'https://pyteam2024.pythonanywhere.com/plantas',   // si ya lo subieron a pythonanywhere
        error:false,
        cargando:true,
        /*atributos para el guardar los valores del formulario */
        id:0,
        nombre:"", 
        categoria:"",
        ubicacion:"",
        sustrato:"",
        riego:"",
        floracion:"",
        tamano:"",
        descripcion:"",
        imagen:"",
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
                .then(res => res.text()) // or res.json()
                .then(res => {
			 alert('Registro Eliminado')
                    location.reload(); // recarga el json luego de eliminado el registro
                })
        },
        grabar(){
            let planta = {
                nombre:this.nombre,
                categoria: this.categoria,
                ubicacion: this.ubicacion,
                sustrato: this.sustrato,
                riego: this.riego,
                floracion: this.floracion,
                tamano: this.tamano,
                descripcion: this.descripcion,
                imagen:this.imagen
            }
            var options = {
                body:JSON.stringify(planta),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow'
            }
            fetch(this.url, options)
                .then(function () {
                    alert("Registro grabado")
                    window.location.href = "./plantas.html";  // recarga productos.html
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