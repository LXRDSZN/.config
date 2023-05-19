<!DOCTYPE html>
<html>
<head>
	<title>SHOPPING STROM</title>
	<meta charset="utf-8">

	<link href="https://fonts.googleapis.com/css2?family=Open+Sans&family=Encode+Sans&family=Inter&display=swap" rel="stylesheet"> 
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/css/bootstrap.min.css" integrity="sha384-9aIt2nRpC12Uk9gS9baDl411NQApFmC26EwAOH8WgZl5MYYxFfc+NcPb1dKGj7Sk" crossorigin="anonymous">
	<meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
	<script src="https://kit.fontawesome.com/94f47f52fa.js" crossorigin="anonymous"></script>
</head>
<body class="bg-light" style="font-family: Open Sans;">

  

<!-- inicio de pie de pagina --> 
    <footer class="footer">
     <div class="container">
      <div class="row">
        <div class="footer-col">
          <h4>EMPRESA/COLEGIO</h4>
          <ul>
            <li><a href="#">TECNM</a></li>
            <li><a href="#">A P T</a></li>
            <li><a href="#">POLITICAS DE PRIVACIDAD</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>AYUDA</h4>
          <ul>
            <li><a href="#">Productos</a></li>
            <li><a href="#">Compras</a></li>
            <li><a href="#">¿Tienes dudas?</a></li>
            <li><a href="#">Mas Opciones</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>CONTACTO CON EL DISEÑADOR WEB</h4>
          <ul>
            <li><a href="mailto:ivangaliciagarces@gmail.com">Correo: ivangaliciagarces@gmail.com</a></li>
            <li><a href="#">Telefono: 735298046</a></li>
          </ul>
        </div>
        <div class="footer-col">
          <h4>REDES SOCIALES DEL DISEÑADOR</h4>
          <div class="social-links">
            <a href="https://www.facebook.com/Ivangaliciagarces" target="_blank"><i class="fab fa-facebook-f"></i></a>
            <a href="#" target="_blank"><i class="fab fa-twitter"></i></a>
            <a href="#" target="_blank"><i class="fab fa-instagram"></i></a>
            <a href="#" target="_blank"><i class="fab fa-linkedin-in"></i></a>

            <div id="clockdate">
  <div class="clockdate-wrapper">
    <div id="clock"></div>
    <div id="date"></div>
  </div>
</div>

          </div>
        </div>
      </div>
     </div>
  </footer>

<!--  fin de pie de pagina -->

  <!-- Bootstrap core JavaScript -->
<script src="https://code.jquery.com/jquery-3.5.1.slim.min.js" integrity="sha384-DfXdz2htPH0lsSSs5nCTpuj/zy4C+OGpamoFVy38MVBnE+IbbVYUew+OrCXaRkfj" crossorigin="anonymous"></script>
    <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.0/dist/umd/popper.min.js" integrity="sha384-Q6E9RHvbIyZFJoft+2mJbHaEWldlvI9IOYy5n3zV9zzTtmI3UksdQRVvoxMfooAo" crossorigin="anonymous"></script>
    <script src="https://stackpath.bootstrapcdn.com/bootstrap/4.5.0/js/bootstrap.min.js" integrity="sha384-OgVRvuATP1z7JjHLkuOU7Xw704+h835Lr+6QL9UvYjZE3Ipu6Tp75j7Bh/kR0JKI" crossorigin="anonymous"></script>

</body>
<style type="text/css">

.carousel-item {
  height: 100%;
  min-height: 350px;
  background: no-repeat center center scroll;
  -webkit-background-size: cover;
  -moz-background-size: cover;
  -o-background-size: cover;
  background-size: cover;
}

.navbarx {
  background-color: #f2f2f2;
  z-index: 99;
  overflow: hidden;
  position: fixed;
  bottom: 0;
  width: 100%;
}

/* Style the links inside the navigation bar */
.navbarx a {
  display: block;
  color: #f2f2f2;
  text-align: center;
  padding: 3% 5%;
  text-decoration: none;
  font-size: 17px;
}

/* decoracion de pie de la página */

.footer{
    background-color: #24262b;
    padding: 70px 0;
    margin-top: 1%;
  }
.footer-col{
   width: 25%;
   padding: 0 15px;
}
.footer-col h4 {
    font-size: 18px;
    color: #ffffff;
    text-transform: capitalize;
    margin-bottom: 35px;
    font-weight: 500;
    position: relative;
}
.footer-col h4::before{
    content: '';
    position: absolute;
    left:0;
    bottom: -10px;
    background-color: #e91e63;
    height: 2px;
    box-sizing: border-box;
    width: 50px;
}
.footer-col ul li:not(:last-child){
    margin-bottom: 10px;
}
.footer-col ul li a{
    font-size: 16px;
    text-transform: capitalize;
    color: #ffffff;
    text-decoration: none;
    font-weight: 300;
    color: #bbbbbb;
    display: block;
    transition: all 0.3s ease;
}
.footer-col ul li a:hover{
    color: #ffffff;
    padding-left: 8px;
}
.footer-col .social-links a{
    display: inline-block;
    height: 40px;
    width: 40px;
    background-color: rgba(255,255,255,0.2);
    margin:0 10px 10px 0;
    text-align: center;
    line-height: 40px;
    border-radius: 50%;
    color: #ffffff;
    transition: all 0.5s ease;
}
.footer-col .social-links a:hover{
    color: #24262b;
    background-color: #ffffff;
}

@media(max-width: 767px){
  .footer-col{
    width: 50%;
    margin-bottom: 30px;
}
}
@media(max-width: 574px){
  .footer-col{
    width: 100%;
}
}
/* fin de la decoracion del pie de página */

</style>
</html>