
// Define the Particles JS Configurations used in the game
monogatari.action('particles').particles({});
monogatari.action('canvas').objects({});
monogatari.configuration('main_character', {
  name: 'Elfi',
  color: '#3EA55C'
});
monogatari.assets('gallery', {
	
	
	
});



monogatari.assets('music', {
'epic': 'epic.mp3'	
	
	
});
monogatari.assets('voices', {});
monogatari.assets('sounds', {});
monogatari.assets('videos', {});
monogatari.assets('images', {});

monogatari.assets('scenes', {
	'inicio': 'index.png',
	'primaria': 'primariabg.png',
	'Inicio': 'inicio_historia.png',
	'puente': 'puente.png',
	'totem': 'totem.png',
	'reto2': 'reto2.png',
	'reto3': 'maestrofigura.png',
	'reto4': 'jaguar.png',
	'titoFinal': 'tito.png'
});

// Personajes
monogatari.characters({
  'y': {
    name: 'Yui',
    color: '#5bcaff'
  },
  'e': {
    name: 'Elfi',
    color: '#3EA55C',
    directory: 'elfi',              // carpeta: assets/characters/elfi/
    sprites: {
      normal: 'elfi.png',
      smile: 'elfi_smile.png'
    },
    default_expression: 'normal'
  }
});