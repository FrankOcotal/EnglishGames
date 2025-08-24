/* global monogatari */

// MiniFiguras Aventura Amazonas

monogatari.script({

  'MiniFiguras': [
    'show scene Inicio with zoomIn',
    'play music epic with loop',
    'show character e normal at left with fadeIn',
    'Hace muchos años, en lo profundo del misterioso Amazonas, {{player.name}} emprendió una travesía valiente.',
    'Su misión era encontrar a su hermanito Tito, desaparecido mientras seguía pistas de figuras mágicas.',
    'y ¡Hermano, te encontraré cueste lo que cueste!',
    'Un brillo surge en el mapa revelando el Primer Reto...',
    'jump Reto1'
  ],

  // ========== RETO 1 ==========
  'Reto1': [
    'show scene puente with zoomIn',
    'show character e normal at left with fadeIn',
    'RETO 1: El Piso del Saber.',
    'Un puente está roto. ¿Qué figura tiene cuatro lados iguales y ángulos rectos?',
    {
      'Choice': {
        'Dialog': 'Selecciona la respuesta correcta:',
        'Círculo': { 'Text': 'Círculo', 'Do': 'jump Reto1_Error' },
        'Triángulo': { 'Text': 'Triángulo', 'Do': 'jump Reto1_Error' },
        'Cuadrado': { 'Text': 'Cuadrado', 'Do': 'jump Reto1_Good' }
      }
    }
  ],

  'Reto1_Error': [
    'show character e normal at left with fadeIn',
    'Incorrecto… observa los lados con detenimiento.',
    'jump Reto1'
  ],

  'Reto1_Good': [
    'show character e smile at left with fadeIn',
    '¡Bien hecho!',
    'jump Reto2'
  ],

  // ========== RETO 2 ==========
  'Reto2': [
    'show scene reto2 with fadeIn',
    'show character e normal at left with fadeIn',
    'RETO 2: El Cálculo del Guardián.',
    'Un espíritu aparece y exige resolver el volumen de un cubo de 3 cm de lado.',
    {
      'Choice': {
        'Dialog': 'Selecciona la respuesta correcta:',
        '18':  { 'Text': '18', 'Do': 'jump Reto2_Error' },
        '27':  { 'Text': '27', 'Do': 'jump Reto2_Good' },
        '36':  { 'Text': '36', 'Do': 'jump Reto2_Error' }
      }
    }
  ],

  'Reto2_Error': [
    'show character e normal at left with fadeIn',
    'Incorrecto… recuerda que es lado³.',
    'jump Reto2'
  ],

  'Reto2_Good': [
    'show character e smile at left with fadeIn',
    '¡Excelente!',
    'jump Reto3'
  ],

  // ========== RETO 3 ==========
  'Reto3': [
    'show scene totem with fadeIn',
    'show character e normal at left with fadeIn',
    'RETO 3: El Río de las Formas.',
    'Si con 4 litros de agua alimento 2 plantas, ¿cuántos litros necesito para 6 plantas?',
    {
      'Choice': {
        'Dialog': 'Selecciona la respuesta:',
        '8':  { 'Text': '8', 'Do': 'jump Reto3_Error' },
        '12': { 'Text': '12', 'Do': 'jump Reto3_Good' },
        '16': { 'Text': '16', 'Do': 'jump Reto3_Error' }
      }
    }
  ],

  'Reto3_Error': [
    'show character e normal at left with fadeIn',
    'Incorrecto… piensa en proporcionalidad.',
    'jump Reto3'
  ],

  'Reto3_Good': [
    'show character e smile at left with fadeIn',
    '¡Correcto!',
    'jump Reto4'
  ],

  // ========== RETO 4 ==========
  'Reto4': [
    'show scene reto3 with fadeIn',
    'show character e normal at left with fadeIn',
    'RETO 4: Maestro de Figuras.',
    '¿Cuál figura tiene tres lados y suma de ángulos interiores igual a 180°?',
    {
      'Choice': {
        'Dialog': 'Selecciona una figura:',
        'Cuadrado': { 'Text': 'Cuadrado', 'Do': 'jump Reto4_Error' },
        'Rectángulo': { 'Text': 'Rectángulo', 'Do': 'jump Reto4_Error' },
        'Triángulo': { 'Text': 'Triángulo', 'Do': 'jump Reto4_Good' }
      }
    }
  ],

  'Reto4_Error': [
    'show character e normal at left with fadeIn',
    'No es correcto… intenta nuevamente.',
    'jump Reto4'
  ],

  'Reto4_Good': [
    'show character e smile at left with fadeIn',
    '¡Muy bien!',
    'jump Reto5'
  ],

  // ========== RETO 5 ==========
  'Reto5': [
    'show scene reto4 with fadeIn',
    'show character e normal at left with fadeIn',
    'vibrate 300 100 300',
    'RETO FINAL: El Jaguar de Luz aparece rugiendo.',
    'Si una caja pesa 7 kg y cada ladrillo pesa 0.5 kg, ¿cuántos ladrillos hay?',
    {
      'Choice': {
        'Dialog': 'Selecciona la respuesta:',
        '12': { 'Text':'12','Do':'jump Reto5_Error' },
        '14': { 'Text':'14','Do':'jump Reto5_Good' },
        '16': { 'Text':'16','Do':'jump Reto5_Error' }
      }
    }
  ],

  'Reto5_Error': [
    'show character e normal at left with fadeIn',
    'Incorrecto… intenta nuevamente.',
    'jump Reto5'
  ],

  'Reto5_Good': [
    'show character e smile at left with fadeIn',
    '¡Lo lograste!',
    'jump Rescate'
  ],

  // ========== FINAL ==========
  'Rescate': [
    'show scene titoFinal with fadeIn',
    'show character e smile at left with fadeIn',
    'Suena música suave… Tito aparece junto a una fogata.',
    'Tito ¡Hermano! ¡Sabía que vendrías por mí!',
    'y Nunca me rendiré cuando se trate de ti.',
    'show character e smile at left with fadeIn',
    'Y así, {{player.name}} completó su misión más importante.',
    'stop music epic with fadeOut',
    'end',
    'jump Primaria'
  ]

});
