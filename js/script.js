/* global monogatari */

// Define the messages used in the game.
monogatari.action('message').messages({
	'Help': {
		title: 'Help',
		subtitle: 'Some useful Links',
		body: `
			<p><a href='https://developers.monogatari.io/documentation/'>Documentation</a> - Everything you need to know.</p>
			<p><a href='https://monogatari.io/demo/'>Demo</a> - A simple Demo.</p>
		`
	}
});

// Define the notifications used in the game
monogatari.action('notification').notifications({
	'Welcome': {
		title: 'Welcome',
		body: 'Bienvenido a Aventumente, Una aventura educativa sin conexión.',
		icon: ''
	}
});



monogatari.script({

	'Cognitron': [
		'show scene #ffffff',
		
		'y ¡Bienvenido a Cognitron!',
		'y Este es un juego educativo diseñado para primaria y secundaria.',
		'jump Start'
	],

	// El juego empieza aquí: pide nombre y luego elige nivel
	'Start': [
		'show scene inicio with fadeIn',
		'show notification Welcome',
		{
			'Input': {
				'Text': '¿Cuál es tu nombre?',
				'Validation': function (input) {
					return input.trim().length > 0;
				},
				'Save': function (input) {
					this.storage({
						player: {
							name: input
						}
					});
					return true;
				},
				'Revert': function () {
					this.storage({
						player: {
							name: ''
						}
					});
				},
				'Warning': '¡Debes escribir tu nombre!'
			}
		},
		'y ¡Hola {{player.name}}!',
		'y Antes de comenzar, necesito saber tu nivel educativo.',
		{
			'Choice': {
				'Dialog': 'y ¿Eres estudiante de primaria o secundaria?',
				'Primaria': {
					'Text': 'Primaria',
					'Do': 'jump Primaria'
				},
				'Secundaria': {
					'Text': 'Secundaria',
					'Do': 'jump Secundaria'
				}
			}
		}
	],

	'Primaria': [
	'show scene primaria',
	'y Muy bien {{player.name}}, ¿qué tema de matemáticas quieres estudiar hoy?',
	{
		'Choice': {
			'Dialog': 'y Escoge un tema:',
			'Figuras Geométricas': {
				'Text': 'Figuras geométricas',
				'Do': 'jump MiniFiguras'
			}
		}
	}
],





	'Secundaria': [
		'show scene #f0f0f0',
		'y Excelente {{player.name}}, esta es la ruta para estudiantes de secundaria.',
		// Aquí puedes continuar con el contenido específico de secundaria
		'end'
	]
});
