// plantas.js
const { createApp } = Vue;

createApp({
    data() {
        return {
            plantas: [],
            url: 'https://pyteam2024.pythonanywhere.com/plantas',
            error: false,
            cargando: true,
            userRole: ''
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
            if (this.userRole !== 'readonly') {
                const url = this.url + '/' + id;
                var options = {
                    method: 'DELETE',
                };
                fetch(url, options)
                    .then(res => res.text()) // or res.json()
                    .then(res => {
                        alert('Registro Eliminado');
                        this.fetchData(this.url); // actualizar la lista después de eliminar
                    });
            } else {
                alert('No tienes permiso para eliminar registros.');
            }
        },
    },
    created() {
        this.fetchData(this.url);
        this.userRole = localStorage.getItem('userRole');
    },
}).mount('#app');
