document.addEventListener('DOMContentLoaded', function () {
    // Insertar el contenido del encabezado
    document.querySelector('header').innerHTML += `
        <div class="logo">
            <a href="index.html"><img src="./img/Logo.png" alt="Logo"></a>
        </div>
        
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.2/css/bootstrap.min.css">
        
        <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css">
        
        <div class="topnav" id="myTopnav">

            <a href="javascript:void(0);" class="icon" onclick="myFunction()">
            <i class="fa fa-bars"></i>
            </a>

            <div class="menu-list">
                <a href="index.html"></a>
                <a href="somos.html">Quiénes Somos</a>
                <a href="especies.html">Agregar Especie</a>
                <a href="contacto.html">Contacto</a>   
            </div>

        </div>

        `;

    // Insertar el contenido del pie de página
    document.querySelector('footer').innerHTML += `
        <div class="mapa-sitio">
            <h5>Mapa de Sitio:</h5>
            <ul>
                <li><a href="index.html">Inicio</a></li>
                <li><a href="somos.html">Quiénes Somos</a></li>
                <li><a href="especies.html" title="Próximamente en línea">Agregar Especie</a></li>
                <li><a href="exteriores.html">Plantas de exterior</a></li>
                <li><a href="interiores.html">Plantas de interior</a></li>
                <li><a href="acuaticas.html">Plantas Acuáticas</a></li>
                <li><a href="contacto.html">Contacto</a></li>
            </ul>
        </div>
        <div class="redes-sociales">
            <h5>Redes Sociales:</h5>
            <div class="redes">
                <a href="https://www.facebook.com"><img src="img/iconos/face.png" alt="Facebook" width="50px"></a>
                <a href="https://www.instagram.com"><img src="img/iconos/instagram.png" alt="Instagram" width="50px"></a>
                <a href="https://wa.me/1125277424" target="_blank"><img src="img/iconos/whatsapp.png" alt="WhatsApp" width="50px"></a>
            </div>
        </div>
    `;


    // Toggle responsive class for menu
    window.myFunction = function () {
        var x = document.getElementById('myTopnav');
        if (x.className === 'topnav') {
            x.className += ' responsive';
        } else {
            x.className = 'topnav';
        }
    };


});


/*document.getElementById("header").innerHTML=` <nav class="navbar navbar-expand-sm navbar-light bg-light">
<div class="container">
  <a class="navbar-brand" href="index.html">Navbar</a>
  <button class="navbar-toggler d-lg-none" type="button" data-bs-toggle="collapse" data-bs-target="#collapsibleNavId" aria-controls="collapsibleNavId"
      aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="collapsibleNavId">
      <ul class="navbar-nav me-auto mt-2 mt-lg-0">
          <li class="nav-item">
              <a class="nav-link active" href="index.html" aria-current="page">Home <span class="visually-hidden">(current)</span></a>
          </li>
          <li class="nav-item">
              <a class="nav-link" href="#">Link</a>
          </li>
          <li class="nav-item dropdown">
              <a class="nav-link dropdown-toggle" href="#" id="dropdownId" data-bs-toggle="dropdown" aria-haspopup="true" aria-expanded="false">CRUD</a>
              <div class="dropdown-menu" aria-labelledby="dropdownId">
                  <a class="dropdown-item" href="plantas.html">Plantas</a>
                  <a class="dropdown-item" href="#">Action 2</a>
              </div>
          </li>
      </ul>
      <form class="d-flex my-2 my-lg-0">
          <input class="form-control me-sm-2" type="text" placeholder="Search">
          <button class="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
      </form>
  </div>
</div>
</nav>
`*/

