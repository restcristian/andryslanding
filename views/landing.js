module.exports = function (data) {
  return `
	<!DOCTYPE html>
	<html lang="en">
	  <head>
		<meta charset="UTF-8" />
		<meta name="viewport" content="width=device-width, initial-scale=1.0" />
		<link rel="stylesheet" href="css/index.css" />
		<title>Andrys frias Portfolio</title>
		<link rel="icon" type="image/svg" href="./icons/logo.svg" />
	  </head>
	  <body>
		<header class="header">
		  <nav class="header__nav">
			<ul class="header__icon-list">
			  <li class="header__icon-list-item">
				<a
				  href="https://www.linkedin.com/in/andrys-frias-047ab8152/"
				  target="__blank"
				  ><img src="./icons/linkedin.svg"
				/></a>
			  </li>
			  <li class="header__icon-list-item">
				<a href="tel:+18295717040">
				  <img src="./icons/telephone.svg" />
				</a>
			  </li>
			</ul>
		  </nav>
		</header>
		<main>
		  <div class="content">
			<div class="content__wrapper">
			  <div class="content__logo">
				<img class="content__logo-image" src="./icons/logo.svg" alt="" />
			  </div>
			  <h1 class="content__title">Muy Pronto.</h1>
			  <p class="content__description">
				Esta página se encuentra bajo mantenimiento.</br>Si estas interesado/a,contáctame.
			  </p>
			</div>
			<form action="/" class="content__contact-form" method="POST">
			  <div class="content__contact-form-wrapper">
				<input
				  class="content__input content__email"
				  type="email"
				  name="email"
				  placeholder="Email"
				  required
				/>
				<input
				  class="content__input content__message"
				  type="text"
				  name="message"
				  placeholder="Escribe aquí"
				  required
				/>
				<button class="content__button" type="submit">Enviar</button>
			  </div>
			</form>
			<h3 class= "content__title content__title-message">${data.message}</h3>
		  </div>
		</main>
	  </body>
	</html>
	
	`;
};
