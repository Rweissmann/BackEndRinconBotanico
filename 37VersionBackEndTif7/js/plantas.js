const { createApp } = Vue;

createApp({
    data() {
        return {
            plantas: [],
            url: 'https://pyteam2024.pythonanywhere.com/plantas',
            error: false,
            cargando: true,
            /* Atributos para guardar los valores del formulario */
            id: 0,
            nombre: "",
            categoria: "",
            ubicacion: "",
            sustrato: "",
            riego: "",
            floracion: "",
            tamano: "",
            descripcion: "",
            imagen: "",
        };
    },
    methods: {
        fetchData(url) {
            fetch(url)
                .then(response => response.json())
                .then(data => {
                    this.plantas = data;
                    this.cargando = false;
                })
                .catch(err => {
                    console.error(err);
                    this.error = true;
                });
        },
        eliminar(id) {
            const url = this.url + '/' + id;
            var options = {
                method: 'DELETE',
            };
            fetch(url, options)
                .then(res => res.text()) // or res.json()
                .then(res => {
                    alert('Registro Eliminado');
                    location.reload(); // recarga el JSON luego de eliminado el registro
                });
        },
        grabar() {
            // Validación de campos
            if (!this.nombre || !this.categoria || !this.ubicacion || !this.sustrato || !this.riego || !this.floracion || !this.tamano || !this.descripcion || !this.imagen) {
                alert('Por favor completa todos los campos.');
                return;
            }

            // Si todos los campos están completos, proceder con la solicitud POST
            let planta = {
                nombre: this.nombre,
                categoria: this.categoria,
                ubicacion: this.ubicacion,
                sustrato: this.sustrato,
                riego: this.riego,
                floracion: this.floracion,
                tamano: this.tamano,
                descripcion: this.descripcion,
                imagen: this.imagen,
            };

            var options = {
                body: JSON.stringify(planta),
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                redirect: 'follow',
            };

            fetch(this.url, options)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Error al grabar la planta.');
                    }
                    alert('Planta grabada correctamente.');
                    window.location.href = "./plantas.html"; // Redirigir a la página de plantas
                })
                .catch(err => {
                    console.error(err);
                    alert('Error al grabar la planta.'); // Mostrar mensaje de error si falla la solicitud
                });
        },
    },
    created() {
        this.fetchData(this.url);
    },
}).mount('#app');
