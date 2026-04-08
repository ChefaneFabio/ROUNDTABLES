import { MultiSkillQuestionData } from '../types'

// Spanish Reading Questions — ~82 total (42 original + 40 new)
// Types: READING, MULTIPLE_CHOICE, FILL_BLANK with passages

export const spanishReadingQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A1 — Beginner (7 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Mi familia',
    passage: 'Me llamo Carlos. Tengo diez años. Tengo una hermana. Se llama María. Ella tiene ocho años. Tenemos un gato. El gato es negro. Vivimos en una casa pequeña.',
    questionText: '¿Cuántos años tiene Carlos?',
    options: [{ label: '8', value: '8' }, { label: '10', value: '10' }, { label: '12', value: '12' }, { label: '6', value: '6' }],
    correctAnswer: '10', points: 1, orderIndex: 1, tags: ['familia', 'números']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Mi familia',
    passage: 'Me llamo Carlos. Tengo diez años. Tengo una hermana. Se llama María. Ella tiene ocho años. Tenemos un gato. El gato es negro. Vivimos en una casa pequeña.',
    questionText: '¿De qué color es el gato?',
    options: [{ label: 'Blanco', value: 'blanco' }, { label: 'Marrón', value: 'marrón' }, { label: 'Negro', value: 'negro' }, { label: 'Gris', value: 'gris' }],
    correctAnswer: 'negro', points: 1, orderIndex: 2, tags: ['familia', 'colores']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'MULTIPLE_CHOICE', skill: 'READING',
    passageTitle: 'En la tienda',
    passage: 'Voy a la tienda. Compro pan y leche. El pan cuesta dos euros. La leche cuesta un euro. Pago tres euros.',
    questionText: '¿Cuánto cuesta el pan?',
    options: [{ label: 'Un euro', value: 'un euro' }, { label: 'Dos euros', value: 'dos euros' }, { label: 'Tres euros', value: 'tres euros' }, { label: 'Cuatro euros', value: 'cuatro euros' }],
    correctAnswer: 'dos euros', points: 1, orderIndex: 3, tags: ['compras', 'números']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Voy a la tienda. Compro pan y leche. El pan cuesta dos euros. La leche cuesta un euro. Pago tres euros.',
    questionText: 'Compro pan y ___.',
    correctAnswer: 'leche', points: 1, orderIndex: 4, tags: ['compras']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Mi día',
    passage: 'Me despierto a las siete. Desayuno. Luego voy al colegio. El colegio empieza a las ocho y media. Vuelvo a casa a las tres. Juego con mis amigos.',
    questionText: '¿A qué hora empieza el colegio?',
    options: [{ label: '7:00', value: '7:00' }, { label: '8:30', value: '8:30' }, { label: '3:00', value: '3:00' }, { label: '9:00', value: '9:00' }],
    correctAnswer: '8:30', points: 1, orderIndex: 5, tags: ['rutina diaria', 'hora']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Mi día',
    passage: 'Me despierto a las siete. Desayuno. Luego voy al colegio. El colegio empieza a las ocho y media. Vuelvo a casa a las tres. Juego con mis amigos.',
    questionText: '¿Qué hace después del colegio?',
    options: [{ label: 'Cena', value: 'cena' }, { label: 'Juega con sus amigos', value: 'juega con sus amigos' }, { label: 'Va de compras', value: 'va de compras' }, { label: 'Ve la televisión', value: 've la televisión' }],
    correctAnswer: 'juega con sus amigos', points: 1, orderIndex: 6, tags: ['rutina diaria']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Me despierto a las siete. Desayuno. Luego voy al colegio.',
    questionText: 'Me despierto a las ___. (Escribe la palabra que falta)',
    correctAnswer: 'siete', points: 1, orderIndex: 7, tags: ['hora']
  },

  // ============================================================
  // A2 — Elementary (7 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Un viaje a Barcelona',
    passage: 'El verano pasado, Laura visitó Barcelona por primera vez. Se alojó en un hotel cerca de la playa. Visitó la Sagrada Familia, el Parque Güell y Las Ramblas. El tiempo fue cálido y soleado. Sacó muchas fotos y compró recuerdos para su familia.',
    questionText: '¿Dónde se alojó Laura en Barcelona?',
    options: [{ label: 'En una casa', value: 'en una casa' }, { label: 'En un hotel cerca de la playa', value: 'en un hotel cerca de la playa' }, { label: 'Con amigos', value: 'con amigos' }, { label: 'En un apartamento', value: 'en un apartamento' }],
    correctAnswer: 'en un hotel cerca de la playa', points: 1, orderIndex: 8, tags: ['viajes', 'pasado']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Un viaje a Barcelona',
    passage: 'El verano pasado, Laura visitó Barcelona por primera vez. Se alojó en un hotel cerca de la playa. Visitó la Sagrada Familia, el Parque Güell y Las Ramblas. El tiempo fue cálido y soleado. Sacó muchas fotos y compró recuerdos para su familia.',
    questionText: '¿Cómo fue el tiempo?',
    options: [{ label: 'Frío y lluvioso', value: 'frío y lluvioso' }, { label: 'Cálido y soleado', value: 'cálido y soleado' }, { label: 'Nublado', value: 'nublado' }, { label: 'Ventoso', value: 'ventoso' }],
    correctAnswer: 'cálido y soleado', points: 1, orderIndex: 9, tags: ['viajes', 'clima']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'El nuevo restaurante',
    passage: 'El mes pasado abrió un nuevo restaurante mexicano en la calle Mayor. El restaurante se llama "Casa Puebla". Sirven tacos, enchiladas y ensaladas. Los precios no son caros. Mucha gente va los fines de semana. El restaurante abre de once de la mañana a diez de la noche todos los días excepto el lunes.',
    questionText: '¿Cuándo está cerrado el restaurante?',
    options: [{ label: 'Domingo', value: 'domingo' }, { label: 'Sábado', value: 'sábado' }, { label: 'Lunes', value: 'lunes' }, { label: 'Martes', value: 'martes' }],
    correctAnswer: 'lunes', points: 1, orderIndex: 10, tags: ['comida', 'lugares']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'El mes pasado abrió un nuevo restaurante mexicano en la calle Mayor. El restaurante se llama "Casa Puebla".',
    questionText: 'El restaurante se llama "Casa ___".',
    correctAnswer: 'Puebla', points: 1, orderIndex: 11, tags: ['comida', 'lugares']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Correo a un amigo',
    passage: 'Hola Pedro, espero que estés bien. Me mudé a un apartamento nuevo la semana pasada. Es más grande que el anterior. Tiene dos dormitorios, una cocina y un balcón bonito. El barrio es tranquilo y hay un parque cerca. ¿Te gustaría venir a visitarme el próximo fin de semana? Un abrazo, Ana',
    questionText: '¿Por qué escribió Ana a Pedro?',
    options: [{ label: 'Para invitarlo a visitarla', value: 'para invitarlo a visitarla' }, { label: 'Para pedir dinero', value: 'para pedir dinero' }, { label: 'Para despedirse', value: 'para despedirse' }, { label: 'Para quejarse', value: 'para quejarse' }],
    correctAnswer: 'para invitarlo a visitarla', points: 1, orderIndex: 12, tags: ['comunicación', 'vivienda']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Correo a un amigo',
    passage: 'Hola Pedro, espero que estés bien. Me mudé a un apartamento nuevo la semana pasada. Es más grande que el anterior. Tiene dos dormitorios, una cocina y un balcón bonito. El barrio es tranquilo y hay un parque cerca. ¿Te gustaría venir a visitarme el próximo fin de semana? Un abrazo, Ana',
    questionText: '¿Cuántos dormitorios tiene el apartamento nuevo?',
    options: [{ label: 'Uno', value: 'uno' }, { label: 'Dos', value: 'dos' }, { label: 'Tres', value: 'tres' }, { label: 'Cuatro', value: 'cuatro' }],
    correctAnswer: 'dos', points: 1, orderIndex: 13, tags: ['vivienda']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Hola Pedro, me mudé a un apartamento nuevo la semana pasada. Es más grande que el anterior.',
    questionText: 'El apartamento nuevo es más ___ que el anterior.',
    correctAnswer: 'grande', points: 1, orderIndex: 14, tags: ['comparativos']
  },

  // ============================================================
  // B1 — Intermediate (7 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'El teletrabajo',
    passage: 'El número de personas que trabajan desde casa ha aumentado significativamente desde 2020. Muchas empresas descubrieron que los empleados pueden ser igual de productivos en casa que en la oficina. Sin embargo, algunos trabajadores dicen que se sienten aislados y echan de menos la interacción social del lugar de trabajo. Las empresas ahora intentan encontrar un equilibrio, y muchas adoptan un modelo híbrido en el que los empleados trabajan desde casa dos o tres días a la semana.',
    questionText: '¿Qué es un "modelo híbrido" según el texto?',
    options: [
      { label: 'Trabajar solo desde casa', value: 'trabajar solo desde casa' },
      { label: 'Trabajar algunos días en casa y otros en la oficina', value: 'trabajar algunos días en casa y otros en la oficina' },
      { label: 'Trabajar solo en la oficina', value: 'trabajar solo en la oficina' },
      { label: 'Trabajar en diferentes oficinas', value: 'trabajar en diferentes oficinas' }
    ],
    correctAnswer: 'trabajar algunos días en casa y otros en la oficina', points: 2, orderIndex: 15, tags: ['trabajo', 'vida moderna']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'El teletrabajo',
    passage: 'El número de personas que trabajan desde casa ha aumentado significativamente desde 2020. Muchas empresas descubrieron que los empleados pueden ser igual de productivos en casa que en la oficina. Sin embargo, algunos trabajadores dicen que se sienten aislados y echan de menos la interacción social del lugar de trabajo.',
    questionText: '¿Qué problema experimentan algunos teletrabajadores?',
    options: [
      { label: 'Ganan menos dinero', value: 'ganan menos dinero' },
      { label: 'Se sienten aislados', value: 'se sienten aislados' },
      { label: 'Trabajan más horas', value: 'trabajan más horas' },
      { label: 'Tienen problemas técnicos', value: 'tienen problemas técnicos' }
    ],
    correctAnswer: 'se sienten aislados', points: 2, orderIndex: 16, tags: ['trabajo']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Los beneficios del ejercicio',
    passage: 'El ejercicio físico regular tiene numerosos beneficios para la salud. Reduce el riesgo de enfermedades cardíacas, ayuda a controlar el peso y mejora la salud mental. Los estudios demuestran que incluso treinta minutos de ejercicio moderado, como caminar, cinco veces a la semana pueden marcar una diferencia significativa. A pesar de esto, muchos adultos no hacen suficiente ejercicio. Las razones más comunes incluyen la falta de tiempo, motivación o acceso a instalaciones.',
    questionText: '¿Cuánto ejercicio semanal recomienda el texto?',
    options: [
      { label: '30 minutos una vez a la semana', value: '30 minutos una vez a la semana' },
      { label: '30 minutos cinco veces a la semana', value: '30 minutos cinco veces a la semana' },
      { label: 'Una hora cada día', value: 'una hora cada día' },
      { label: 'Dos horas tres veces a la semana', value: 'dos horas tres veces a la semana' }
    ],
    correctAnswer: '30 minutos cinco veces a la semana', points: 2, orderIndex: 17, tags: ['salud', 'ejercicio']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'El ejercicio físico regular tiene numerosos beneficios para la salud. Reduce el riesgo de enfermedades cardíacas, ayuda a controlar el peso y mejora la salud mental.',
    questionText: 'El ejercicio mejora la salud ___. (¿Qué tipo de salud además de la física?)',
    correctAnswer: 'mental', points: 2, orderIndex: 18, tags: ['salud']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La contaminación por plástico',
    passage: 'La contaminación por plástico se ha convertido en uno de los problemas medioambientales más urgentes. Cada año, millones de toneladas de residuos plásticos acaban en los océanos, dañando la vida marina. Muchos países han empezado a prohibir los plásticos de un solo uso como bolsas y pajitas. Las tasas de reciclaje han mejorado, pero los expertos dicen que necesitamos reducir nuestro consumo de plástico en general, no solo reciclar más.',
    questionText: 'Según los expertos, ¿qué es más importante que reciclar?',
    options: [
      { label: 'Producir más plástico', value: 'producir más plástico' },
      { label: 'Reducir el consumo de plástico', value: 'reducir el consumo de plástico' },
      { label: 'Usar materiales diferentes', value: 'usar materiales diferentes' },
      { label: 'Construir más fábricas', value: 'construir más fábricas' }
    ],
    correctAnswer: 'reducir el consumo de plástico', points: 2, orderIndex: 19, tags: ['medioambiente']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La contaminación por plástico',
    passage: 'La contaminación por plástico se ha convertido en uno de los problemas medioambientales más urgentes. Cada año, millones de toneladas de residuos plásticos acaban en los océanos, dañando la vida marina. Muchos países han empezado a prohibir los plásticos de un solo uso como bolsas y pajitas.',
    questionText: '¿Qué ejemplos de plásticos de un solo uso se mencionan?',
    options: [
      { label: 'Botellas y vasos', value: 'botellas y vasos' },
      { label: 'Bolsas y pajitas', value: 'bolsas y pajitas' },
      { label: 'Envases y envoltorios', value: 'envases y envoltorios' },
      { label: 'Platos y tenedores', value: 'platos y tenedores' }
    ],
    correctAnswer: 'bolsas y pajitas', points: 2, orderIndex: 20, tags: ['medioambiente']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'La contaminación por plástico se ha convertido en uno de los problemas medioambientales más urgentes. Cada año, millones de toneladas de residuos plásticos acaban en los océanos.',
    questionText: 'Millones de toneladas de plástico acaban en los ___.',
    correctAnswer: 'océanos', points: 2, orderIndex: 21, tags: ['medioambiente']
  },

  // ============================================================
  // B2 — Upper Intermediate (7 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'La economía colaborativa',
    passage: 'La economía colaborativa ha transformado la forma en que millones de personas trabajan. Plataformas como Uber, Glovo y Fiverr conectan a trabajadores autónomos con clientes que necesitan servicios específicos. Los defensores argumentan que ofrece flexibilidad e independencia, permitiendo a las personas trabajar en sus propios términos. Sin embargo, los críticos señalan que los trabajadores de estas plataformas a menudo carecen de prestaciones como seguro médico, vacaciones pagadas y cotizaciones a la seguridad social. El debate sobre si estos trabajadores deben clasificarse como empleados o como autónomos continúa en los tribunales de todo el mundo.',
    questionText: '¿Cuál es la principal controversia sobre los trabajadores de plataformas?',
    options: [
      { label: 'Si deberían pagar más impuestos', value: 'si deberían pagar más impuestos' },
      { label: 'Si deberían clasificarse como empleados o autónomos', value: 'si deberían clasificarse como empleados o autónomos' },
      { label: 'Si son lo suficientemente cualificados', value: 'si son lo suficientemente cualificados' },
      { label: 'Si trabajan demasiadas horas', value: 'si trabajan demasiadas horas' }
    ],
    correctAnswer: 'si deberían clasificarse como empleados o autónomos', points: 2, orderIndex: 22, tags: ['trabajo', 'economía']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'La economía colaborativa',
    passage: 'Los defensores argumentan que la economía colaborativa ofrece flexibilidad e independencia, permitiendo a las personas trabajar en sus propios términos. Sin embargo, los críticos señalan que los trabajadores de estas plataformas a menudo carecen de prestaciones como seguro médico, vacaciones pagadas y cotizaciones a la seguridad social.',
    questionText: '¿Qué prestación NO se menciona como carencia de estos trabajadores?',
    options: [
      { label: 'Seguro médico', value: 'seguro médico' },
      { label: 'Vacaciones pagadas', value: 'vacaciones pagadas' },
      { label: 'Oportunidades de formación', value: 'oportunidades de formación' },
      { label: 'Cotizaciones a la seguridad social', value: 'cotizaciones a la seguridad social' }
    ],
    correctAnswer: 'oportunidades de formación', points: 2, orderIndex: 23, tags: ['trabajo', 'economía']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'El sueño y el aprendizaje',
    passage: 'Investigaciones recientes en neurociencia han revelado una fuerte conexión entre el sueño y la consolidación de la memoria. Durante el sueño profundo, el cerebro repite y fortalece las vías neuronales formadas durante las horas de vigilia, transfiriendo efectivamente información de la memoria a corto plazo a la memoria a largo plazo. Los estudiantes que duermen lo suficiente después de estudiar rinden significativamente mejor en los exámenes que aquellos que se quedan despiertos hasta tarde repasando. Además, la privación del sueño afecta las funciones cognitivas como la atención, la resolución de problemas y el pensamiento creativo.',
    questionText: 'Según el texto, ¿qué ocurre durante el sueño profundo?',
    options: [
      { label: 'El cerebro deja de procesar información', value: 'el cerebro deja de procesar' },
      { label: 'El cerebro repite y fortalece las vías neuronales', value: 'el cerebro repite y fortalece las vías neuronales' },
      { label: 'Se borran los recuerdos nuevos', value: 'se borran los recuerdos nuevos' },
      { label: 'El cerebro crea nuevas vías neuronales', value: 'el cerebro crea nuevas vías neuronales' }
    ],
    correctAnswer: 'el cerebro repite y fortalece las vías neuronales', points: 2, orderIndex: 24, tags: ['ciencia', 'educación']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'El sueño y el aprendizaje',
    passage: 'Los estudiantes que duermen lo suficiente después de estudiar rinden significativamente mejor en los exámenes que aquellos que se quedan despiertos hasta tarde repasando. Además, la privación del sueño afecta las funciones cognitivas como la atención, la resolución de problemas y el pensamiento creativo.',
    questionText: '¿Qué funciones cognitivas se ven afectadas por la falta de sueño?',
    options: [
      { label: 'Memoria, habla y audición', value: 'memoria, habla y audición' },
      { label: 'Atención, resolución de problemas y pensamiento creativo', value: 'atención, resolución de problemas y pensamiento creativo' },
      { label: 'Lectura, escritura y expresión oral', value: 'lectura, escritura y expresión oral' },
      { label: 'Visión, audición y equilibrio', value: 'visión, audición y equilibrio' }
    ],
    correctAnswer: 'atención, resolución de problemas y pensamiento creativo', points: 2, orderIndex: 25, tags: ['ciencia']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Durante el sueño profundo, el cerebro repite y fortalece las vías neuronales formadas durante las horas de vigilia, transfiriendo efectivamente información de la memoria a corto plazo a la memoria a largo plazo.',
    questionText: 'El sueño ayuda a transferir información de la memoria a corto plazo a la memoria a ___ plazo.',
    correctAnswer: 'largo', points: 2, orderIndex: 26, tags: ['ciencia']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'La agricultura urbana',
    passage: 'La agricultura urbana está ganando popularidad en ciudades de todo el mundo como respuesta a las preocupaciones sobre la seguridad alimentaria y la conciencia medioambiental. Los huertos en azoteas, las granjas verticales y los huertos comunitarios están transformando espacios urbanos sin uso en fuentes productivas de alimentos. Los defensores argumentan que la agricultura urbana reduce los costes de transporte y las emisiones, proporciona productos más frescos y fortalece los vínculos comunitarios. Sin embargo, persisten desafíos como el espacio limitado, la contaminación del suelo en antiguas zonas industriales y el alto coste de instalar instalaciones de cultivo interior.',
    questionText: '¿Cuál es un desafío de la agricultura urbana mencionado en el texto?',
    options: [
      { label: 'Demasiada agua', value: 'demasiada agua' },
      { label: 'Contaminación del suelo', value: 'contaminación del suelo' },
      { label: 'Demasiados agricultores', value: 'demasiados agricultores' },
      { label: 'Falta de interés', value: 'falta de interés' }
    ],
    correctAnswer: 'contaminación del suelo', points: 2, orderIndex: 27, tags: ['medioambiente', 'urbano']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Los huertos en azoteas, las granjas verticales y los huertos comunitarios están transformando espacios urbanos sin uso en fuentes productivas de alimentos.',
    questionText: 'Las granjas ___ son un tipo de agricultura urbana que aprovecha el espacio vertical.',
    correctAnswer: 'verticales', points: 2, orderIndex: 28, tags: ['medioambiente']
  },

  // ============================================================
  // C1 — Advanced (7 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La ética de la inteligencia artificial',
    passage: 'El rápido avance de la inteligencia artificial ha planteado profundas cuestiones éticas que la sociedad debe afrontar. El sesgo algorítmico, donde los sistemas de IA perpetúan o amplifican los prejuicios sociales existentes, se ha documentado en áreas que van desde la justicia penal hasta las prácticas de contratación. La opacidad de los modelos de aprendizaje profundo — a menudo denominada el problema de la "caja negra" — dificulta comprender por qué un sistema de IA toma determinadas decisiones, lo que plantea cuestiones de responsabilidad. Además, el posible desplazamiento de trabajadores a causa de la automatización plantea importantes desafíos socioeconómicos que requieren respuestas políticas proactivas.',
    questionText: '¿A qué se refiere el problema de la "caja negra" en el contexto de la IA?',
    options: [
      { label: 'Los sistemas de IA son caros', value: 'los sistemas de IA son caros' },
      { label: 'Los procesos de toma de decisiones de la IA no son transparentes', value: 'los procesos de toma de decisiones de la IA no son transparentes' },
      { label: 'Los sistemas de IA se averían con frecuencia', value: 'los sistemas de IA se averían con frecuencia' },
      { label: 'El hardware de IA es difícil de fabricar', value: 'el hardware de IA es difícil de fabricar' }
    ],
    correctAnswer: 'los procesos de toma de decisiones de la IA no son transparentes', points: 3, orderIndex: 29, tags: ['tecnología', 'ética']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La ética de la inteligencia artificial',
    passage: 'El sesgo algorítmico, donde los sistemas de IA perpetúan o amplifican los prejuicios sociales existentes, se ha documentado en áreas que van desde la justicia penal hasta las prácticas de contratación. La opacidad de los modelos de aprendizaje profundo dificulta comprender por qué un sistema de IA toma determinadas decisiones, lo que plantea cuestiones de responsabilidad.',
    questionText: 'La palabra "opacidad" en el texto es sinónimo de:',
    options: [
      { label: 'Transparencia', value: 'transparencia' },
      { label: 'Eficiencia', value: 'eficiencia' },
      { label: 'Falta de transparencia', value: 'falta de transparencia' },
      { label: 'Complejidad', value: 'complejidad' }
    ],
    correctAnswer: 'falta de transparencia', points: 3, orderIndex: 30, tags: ['vocabulario', 'tecnología']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Lengua y pensamiento',
    passage: 'La hipótesis de Sapir-Whorf, que postula que la estructura de una lengua influye en la visión del mundo y la cognición de sus hablantes, ha sido objeto de un considerable debate en lingüística. La versión fuerte — el determinismo lingüístico — sugiere que la lengua determina el pensamiento, mientras que la versión débil — la relatividad lingüística — propone que la lengua simplemente influye en los patrones de pensamiento. La investigación contemporánea ha respaldado en gran medida la forma débil, demostrando que los hablantes de diferentes lenguas pueden percibir el tiempo, el espacio y el color de manera diferente, aunque no hasta el punto de que no puedan conceptualizar ideas ausentes en su lengua.',
    questionText: '¿Cuál es la diferencia entre el determinismo lingüístico y la relatividad lingüística?',
    options: [
      { label: 'El determinismo dice que la lengua determina el pensamiento; la relatividad dice que lo influye', value: 'el determinismo determina, la relatividad influye' },
      { label: 'Son el mismo concepto con nombres diferentes', value: 'mismo concepto' },
      { label: 'El determinismo trata de gramática; la relatividad de vocabulario', value: 'gramática vs vocabulario' },
      { label: 'El determinismo es más reciente que la relatividad', value: 'el determinismo es más reciente' }
    ],
    correctAnswer: 'el determinismo determina, la relatividad influye', points: 3, orderIndex: 31, tags: ['lingüística', 'filosofía']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Lengua y pensamiento',
    passage: 'La investigación contemporánea ha respaldado en gran medida la forma débil, demostrando que los hablantes de diferentes lenguas pueden percibir el tiempo, el espacio y el color de manera diferente, aunque no hasta el punto de que no puedan conceptualizar ideas ausentes en su lengua.',
    questionText: '¿Qué ha concluido la investigación contemporánea sobre la hipótesis de Sapir-Whorf?',
    options: [
      { label: 'La versión fuerte es correcta', value: 'versión fuerte correcta' },
      { label: 'Ambas versiones son incorrectas', value: 'ambas incorrectas' },
      { label: 'La versión débil está respaldada en gran medida', value: 'versión débil respaldada' },
      { label: 'La hipótesis ha sido completamente refutada', value: 'completamente refutada' }
    ],
    correctAnswer: 'versión débil respaldada', points: 3, orderIndex: 32, tags: ['lingüística']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'La hipótesis de Sapir-Whorf postula que la estructura de una lengua influye en la visión del mundo y la cognición de sus hablantes.',
    questionText: 'La hipótesis de Sapir-Whorf trata de la relación entre la lengua y la ___.',
    correctAnswer: 'cognición', points: 3, orderIndex: 33, tags: ['lingüística']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La economía conductual',
    passage: 'La teoría económica tradicional asume que los individuos toman decisiones racionales para maximizar su utilidad. La economía conductual, impulsada por investigadores como Daniel Kahneman y Amos Tversky, cuestiona esta suposición demostrando sesgos cognitivos sistemáticos que conducen a una toma de decisiones irracional. El concepto de "aversión a la pérdida" — la tendencia de las personas a preferir evitar las pérdidas frente a adquirir ganancias equivalentes — tiene profundas implicaciones para el diseño de políticas, el marketing y la planificación financiera.',
    questionText: '¿Qué significa "aversión a la pérdida"?',
    options: [
      { label: 'Las personas prefieren asumir riesgos', value: 'las personas prefieren riesgos' },
      { label: 'Las personas sienten las pérdidas con más intensidad que las ganancias equivalentes', value: 'las pérdidas se sienten más que las ganancias' },
      { label: 'Las personas evitan tomar decisiones financieras', value: 'evitan decisiones financieras' },
      { label: 'Las personas siempre eligen la opción más barata', value: 'eligen la opción más barata' }
    ],
    correctAnswer: 'las pérdidas se sienten más que las ganancias', points: 3, orderIndex: 34, tags: ['economía', 'psicología']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'La economía conductual cuestiona la suposición de que los individuos toman decisiones racionales para maximizar su utilidad.',
    questionText: 'La economía conductual demuestra sesgos cognitivos sistemáticos que conducen a una toma de decisiones ___.',
    correctAnswer: 'irracional', points: 3, orderIndex: 35, tags: ['economía']
  },

  // ============================================================
  // C2 — Proficiency (7 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Posverdad y crisis epistémica',
    passage: 'La proliferación de la desinformación en la era digital ha precipitado lo que los filósofos denominan una "crisis epistémica" — un colapso fundamental en la capacidad de la sociedad para establecer verdades compartidas. El fenómeno se ve agravado por las cámaras de eco algorítmicas que refuerzan las creencias existentes, la mercantilización de la atención que incentiva el sensacionalismo por encima de la precisión, y la erosión de la confianza en las autoridades epistémicas tradicionales como las instituciones científicas y el periodismo de calidad. Algunos académicos sostienen que la propia noción de verdad objetiva ha sido suplantada por un paradigma de "posverdad" en el que la resonancia emocional y la afiliación tribal prevalecen sobre la evidencia empírica en la configuración del discurso público.',
    questionText: 'Según el texto, ¿qué contribuye a la "crisis epistémica"?',
    options: [
      { label: 'Mejores sistemas educativos', value: 'mejores sistemas educativos' },
      { label: 'Cámaras de eco algorítmicas, mercantilización de la atención y erosión de la confianza', value: 'cámaras de eco, mercantilización de la atención, erosión de la confianza' },
      { label: 'Mayor financiación de la investigación científica', value: 'mayor financiación' },
      { label: 'Mejor acceso a la información', value: 'mejor acceso a la información' }
    ],
    correctAnswer: 'cámaras de eco, mercantilización de la atención, erosión de la confianza', points: 3, orderIndex: 36, tags: ['filosofía', 'medios']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Posverdad y crisis epistémica',
    passage: 'Algunos académicos sostienen que la propia noción de verdad objetiva ha sido suplantada por un paradigma de "posverdad" en el que la resonancia emocional y la afiliación tribal prevalecen sobre la evidencia empírica en la configuración del discurso público.',
    questionText: '¿Qué significa "suplantada" en este contexto?',
    options: [
      { label: 'Apoyada', value: 'apoyada' },
      { label: 'Reemplazada', value: 'reemplazada' },
      { label: 'Cuestionada', value: 'cuestionada' },
      { label: 'Mejorada', value: 'mejorada' }
    ],
    correctAnswer: 'reemplazada', points: 3, orderIndex: 37, tags: ['vocabulario']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Conciencia cuántica',
    passage: 'La teoría de la Reducción Objetiva Orquestada (Orch-OR), propuesta por el físico Roger Penrose y el anestesiólogo Stuart Hameroff, postula que la conciencia surge de computaciones cuánticas dentro de los microtúbulos de las neuronas. Esta controvertida hipótesis sugiere que el cerebro no es simplemente un ordenador clásico, sino que opera a un nivel fundamentalmente cuántico. Los críticos sostienen que el ambiente cálido y húmedo del cerebro provocaría una decoherencia cuántica demasiado rápida para que tales procesos fueran biológicamente relevantes. No obstante, experimentos recientes que detectan efectos cuánticos en sistemas biológicos — como la fotosíntesis y la navegación de las aves — han otorgado cierta credibilidad a la noción más amplia de que la mecánica cuántica puede desempeñar un papel en los procesos biológicos.',
    questionText: '¿Cuál es la principal crítica a la teoría Orch-OR?',
    options: [
      { label: 'Carece de fundamentos matemáticos', value: 'carece de fundamentos' },
      { label: 'La decoherencia cuántica ocurriría demasiado rápido en el cerebro', value: 'decoherencia demasiado rápida' },
      { label: 'Penrose no es neurocientífico', value: 'no es neurocientífico' },
      { label: 'Los microtúbulos no existen en las neuronas', value: 'los microtúbulos no existen' }
    ],
    correctAnswer: 'decoherencia demasiado rápida', points: 3, orderIndex: 38, tags: ['ciencia', 'filosofía']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Conciencia cuántica',
    passage: 'Experimentos recientes que detectan efectos cuánticos en sistemas biológicos — como la fotosíntesis y la navegación de las aves — han otorgado cierta credibilidad a la noción más amplia de que la mecánica cuántica puede desempeñar un papel en los procesos biológicos.',
    questionText: '¿Qué procesos biológicos han mostrado evidencia de efectos cuánticos?',
    options: [
      { label: 'Digestión y respiración', value: 'digestión y respiración' },
      { label: 'Fotosíntesis y navegación de las aves', value: 'fotosíntesis y navegación de las aves' },
      { label: 'Circulación sanguínea y respuesta inmunitaria', value: 'circulación sanguínea y respuesta inmunitaria' },
      { label: 'División celular y síntesis de proteínas', value: 'división celular y síntesis de proteínas' }
    ],
    correctAnswer: 'fotosíntesis y navegación de las aves', points: 3, orderIndex: 39, tags: ['ciencia']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'La teoría Orch-OR postula que la conciencia surge de computaciones cuánticas dentro de los microtúbulos de las neuronas.',
    questionText: 'La teoría Orch-OR sugiere que la conciencia surge de computaciones cuánticas dentro de los ___.',
    correctAnswer: 'microtúbulos', points: 3, orderIndex: 40, tags: ['ciencia']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'La relatividad lingüística revisitada',
    passage: 'El pueblo kuuk thaayorre de la península del Cabo York, en Australia, utiliza direcciones cardinales en lugar de términos espaciales egocéntricos. En vez de decir "la taza está a tu izquierda", dirían "la taza está al norte-noreste". Notablemente, esta práctica lingüística se correlaciona con una excepcional capacidad de orientación espacial — los hablantes de kuuk thaayorre mantienen una brújula interna precisa en todo momento, una hazaña que los hablantes de lenguas con sistemas espaciales egocéntricos encuentran extraordinariamente difícil de replicar.',
    questionText: '¿Qué hace único al sistema espacial kuuk thaayorre?',
    options: [
      { label: 'Usan izquierda y derecha con más precisión', value: 'izquierda y derecha' },
      { label: 'Usan direcciones cardinales en lugar de términos relativos como izquierda/derecha', value: 'direcciones cardinales en lugar de egocéntricos' },
      { label: 'No tienen palabras para las direcciones', value: 'no tienen palabras' },
      { label: 'Solo usan gestos para las direcciones', value: 'solo gestos' }
    ],
    correctAnswer: 'direcciones cardinales en lugar de egocéntricos', points: 3, orderIndex: 41, tags: ['lingüística', 'cultura']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'El pueblo kuuk thaayorre utiliza direcciones cardinales en lugar de términos espaciales egocéntricos.',
    questionText: 'Los kuuk thaayorre usan direcciones ___ en lugar de términos espaciales egocéntricos.',
    correctAnswer: 'cardinales', points: 3, orderIndex: 42, tags: ['lingüística']
  },

  // ============================================================
  // NEW QUESTIONS — 40 additional (orderIndex 43–82)
  // ============================================================

  // ── A1 — Menus & signs (7 questions, 43–49) ─────────────────
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Menú del restaurante',
    passage: 'MENÚ DEL DÍA — Primer plato: Sopa de tomate o ensalada. Segundo plato: Pollo con arroz o pescado con patatas. Postre: Fruta o helado. Bebida incluida. Precio: 10 euros.',
    questionText: '¿Cuánto cuesta el menú del día?',
    options: [{ label: '8 euros', value: '8 euros' }, { label: '10 euros', value: '10 euros' }, { label: '12 euros', value: '12 euros' }, { label: '15 euros', value: '15 euros' }],
    correctAnswer: '10 euros', points: 1, orderIndex: 43, tags: ['menú', 'comida']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Menú del restaurante',
    passage: 'MENÚ DEL DÍA — Primer plato: Sopa de tomate o ensalada. Segundo plato: Pollo con arroz o pescado con patatas. Postre: Fruta o helado. Bebida incluida. Precio: 10 euros.',
    questionText: '¿Qué opciones hay de segundo plato?',
    options: [{ label: 'Sopa o ensalada', value: 'sopa o ensalada' }, { label: 'Pollo con arroz o pescado con patatas', value: 'pollo con arroz o pescado con patatas' }, { label: 'Fruta o helado', value: 'fruta o helado' }, { label: 'Pan y mantequilla', value: 'pan y mantequilla' }],
    correctAnswer: 'pollo con arroz o pescado con patatas', points: 1, orderIndex: 44, tags: ['menú', 'comida']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Cartel en la puerta',
    passage: 'HORARIO: Lunes a viernes de 9:00 a 14:00 y de 17:00 a 20:00. Sábados de 10:00 a 14:00. Domingos cerrado.',
    questionText: '¿A qué hora abre la tienda los sábados?',
    options: [{ label: '9:00', value: '9:00' }, { label: '10:00', value: '10:00' }, { label: '14:00', value: '14:00' }, { label: '17:00', value: '17:00' }],
    correctAnswer: '10:00', points: 1, orderIndex: 45, tags: ['horario', 'carteles']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'HORARIO: Lunes a viernes de 9:00 a 14:00 y de 17:00 a 20:00. Sábados de 10:00 a 14:00. Domingos cerrado.',
    questionText: 'Los domingos la tienda está ___.',
    correctAnswer: 'cerrado', points: 1, orderIndex: 46, tags: ['horario']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Nota en la nevera',
    passage: 'Mamá: He ido al colegio. Hay leche en la nevera. Vuelvo a las tres. Besos, Pedro.',
    questionText: '¿Dónde está Pedro?',
    options: [{ label: 'En casa', value: 'en casa' }, { label: 'En el colegio', value: 'en el colegio' }, { label: 'En la tienda', value: 'en la tienda' }, { label: 'En el parque', value: 'en el parque' }],
    correctAnswer: 'en el colegio', points: 1, orderIndex: 47, tags: ['notas', 'rutina']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Nota en la nevera',
    passage: 'Mamá: He ido al colegio. Hay leche en la nevera. Vuelvo a las tres. Besos, Pedro.',
    questionText: '¿A qué hora vuelve Pedro?',
    options: [{ label: 'A la una', value: 'a la una' }, { label: 'A las dos', value: 'a las dos' }, { label: 'A las tres', value: 'a las tres' }, { label: 'A las cuatro', value: 'a las cuatro' }],
    correctAnswer: 'a las tres', points: 1, orderIndex: 48, tags: ['notas', 'hora']
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Mamá: He ido al colegio. Hay leche en la nevera.',
    questionText: 'Hay ___ en la nevera.',
    correctAnswer: 'leche', points: 1, orderIndex: 49, tags: ['comida', 'casa']
  },

  // ── A2 — Short texts (7 questions, 50–56) ───────────────────
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Anuncio de trabajo',
    passage: 'Se busca camarero/a para restaurante en el centro. Horario: de jueves a domingo, de 18:00 a 23:00. Experiencia mínima de un año. Se ofrece contrato fijo y buenas propinas. Enviar currículum a info@restauranteluna.es.',
    questionText: '¿Qué experiencia se necesita?',
    options: [{ label: 'No se necesita experiencia', value: 'no se necesita' }, { label: 'Mínimo un año', value: 'mínimo un año' }, { label: 'Mínimo dos años', value: 'mínimo dos años' }, { label: 'Mínimo cinco años', value: 'mínimo cinco años' }],
    correctAnswer: 'mínimo un año', points: 1, orderIndex: 50, tags: ['trabajo', 'anuncios']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Anuncio de trabajo',
    passage: 'Se busca camarero/a para restaurante en el centro. Horario: de jueves a domingo, de 18:00 a 23:00. Experiencia mínima de un año. Se ofrece contrato fijo y buenas propinas. Enviar currículum a info@restauranteluna.es.',
    questionText: '¿Cuántos días a la semana hay que trabajar?',
    options: [{ label: 'Tres', value: 'tres' }, { label: 'Cuatro', value: 'cuatro' }, { label: 'Cinco', value: 'cinco' }, { label: 'Seis', value: 'seis' }],
    correctAnswer: 'cuatro', points: 1, orderIndex: 51, tags: ['trabajo', 'horarios']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Mensaje de texto',
    passage: 'Hola Sara, ¿quedamos mañana a las cinco en el café de la plaza? Tengo que contarte algo importante. Si no puedes, dime y quedamos otro día. Un abrazo, Lucía.',
    questionText: '¿Dónde quiere quedar Lucía?',
    options: [{ label: 'En el parque', value: 'en el parque' }, { label: 'En el café de la plaza', value: 'en el café de la plaza' }, { label: 'En su casa', value: 'en su casa' }, { label: 'En el cine', value: 'en el cine' }],
    correctAnswer: 'en el café de la plaza', points: 1, orderIndex: 52, tags: ['comunicación', 'citas']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Hola Sara, ¿quedamos mañana a las cinco en el café de la plaza? Tengo que contarte algo importante.',
    questionText: 'Lucía tiene que contar algo ___ a Sara.',
    correctAnswer: 'importante', points: 1, orderIndex: 53, tags: ['comunicación']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Receta sencilla',
    passage: 'Tortilla española: Ingredientes — 4 huevos, 3 patatas, 1 cebolla, aceite de oliva y sal. Primero, pela y corta las patatas y la cebolla. Luego fríelas en aceite. Después, bate los huevos con sal y mezcla con las patatas. Finalmente, cocina en la sartén por ambos lados.',
    questionText: '¿Cuántos huevos se necesitan?',
    options: [{ label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }, { label: '6', value: '6' }],
    correctAnswer: '4', points: 1, orderIndex: 54, tags: ['comida', 'recetas']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Receta sencilla',
    passage: 'Tortilla española: Ingredientes — 4 huevos, 3 patatas, 1 cebolla, aceite de oliva y sal. Primero, pela y corta las patatas y la cebolla. Luego fríelas en aceite. Después, bate los huevos con sal y mezcla con las patatas. Finalmente, cocina en la sartén por ambos lados.',
    questionText: '¿Qué se hace primero?',
    options: [{ label: 'Batir los huevos', value: 'batir los huevos' }, { label: 'Pelar y cortar las patatas y la cebolla', value: 'pelar y cortar las patatas y la cebolla' }, { label: 'Cocinar en la sartén', value: 'cocinar en la sartén' }, { label: 'Mezclar todo', value: 'mezclar todo' }],
    correctAnswer: 'pelar y cortar las patatas y la cebolla', points: 1, orderIndex: 55, tags: ['comida', 'secuencia']
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Tortilla española: Finalmente, cocina en la sartén por ambos lados.',
    questionText: 'Se cocina la tortilla en la ___ por ambos lados.',
    correctAnswer: 'sartén', points: 1, orderIndex: 56, tags: ['cocina', 'vocabulario']
  },

  // ── B1 — Articles & reports (7 questions, 57–63) ────────────
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Las redes sociales y los jóvenes',
    passage: 'Un estudio reciente revela que los adolescentes españoles pasan una media de tres horas al día en redes sociales. Los expertos alertan de que el uso excesivo puede afectar negativamente al rendimiento escolar y a la autoestima. Sin embargo, también destacan beneficios como la posibilidad de mantener relaciones a distancia y acceder a información educativa. La clave, según los psicólogos, está en enseñar a los jóvenes a hacer un uso responsable de la tecnología.',
    questionText: '¿Cuántas horas al día pasan los adolescentes españoles en redes sociales?',
    options: [{ label: 'Una hora', value: 'una hora' }, { label: 'Dos horas', value: 'dos horas' }, { label: 'Tres horas', value: 'tres horas' }, { label: 'Cuatro horas', value: 'cuatro horas' }],
    correctAnswer: 'tres horas', points: 1, orderIndex: 57, tags: ['tecnología', 'jóvenes']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Las redes sociales y los jóvenes',
    passage: 'Un estudio reciente revela que los adolescentes españoles pasan una media de tres horas al día en redes sociales. Los expertos alertan de que el uso excesivo puede afectar negativamente al rendimiento escolar y a la autoestima. Sin embargo, también destacan beneficios como la posibilidad de mantener relaciones a distancia y acceder a información educativa. La clave, según los psicólogos, está en enseñar a los jóvenes a hacer un uso responsable de la tecnología.',
    questionText: '¿Cuál es la solución que proponen los psicólogos?',
    options: [
      { label: 'Prohibir las redes sociales', value: 'prohibir las redes sociales' },
      { label: 'Enseñar un uso responsable de la tecnología', value: 'enseñar un uso responsable de la tecnología' },
      { label: 'Limitar el acceso a internet', value: 'limitar el acceso a internet' },
      { label: 'Sustituir las redes por libros', value: 'sustituir las redes por libros' }
    ],
    correctAnswer: 'enseñar un uso responsable de la tecnología', points: 1, orderIndex: 58, tags: ['tecnología', 'soluciones']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'El turismo sostenible',
    passage: 'El turismo sostenible busca minimizar el impacto negativo del turismo en el medioambiente y las comunidades locales. Esto incluye elegir alojamientos ecológicos, respetar la cultura local, usar transporte público y apoyar la economía local comprando productos artesanales. Cada vez más viajeros se interesan por este tipo de turismo, especialmente entre los jóvenes de 25 a 35 años.',
    questionText: '¿Qué grupo de edad se interesa más por el turismo sostenible?',
    options: [
      { label: '18 a 24 años', value: '18 a 24 años' },
      { label: '25 a 35 años', value: '25 a 35 años' },
      { label: '35 a 50 años', value: '35 a 50 años' },
      { label: 'Mayores de 50 años', value: 'mayores de 50 años' }
    ],
    correctAnswer: '25 a 35 años', points: 1, orderIndex: 59, tags: ['turismo', 'medioambiente']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'El turismo sostenible',
    passage: 'El turismo sostenible busca minimizar el impacto negativo del turismo en el medioambiente y las comunidades locales. Esto incluye elegir alojamientos ecológicos, respetar la cultura local, usar transporte público y apoyar la economía local comprando productos artesanales.',
    questionText: '¿Cuál NO es una práctica del turismo sostenible según el texto?',
    options: [
      { label: 'Elegir alojamientos ecológicos', value: 'elegir alojamientos ecológicos' },
      { label: 'Comprar productos artesanales', value: 'comprar productos artesanales' },
      { label: 'Viajar siempre en avión', value: 'viajar siempre en avión' },
      { label: 'Usar transporte público', value: 'usar transporte público' }
    ],
    correctAnswer: 'viajar siempre en avión', points: 1, orderIndex: 60, tags: ['turismo', 'medioambiente']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'El turismo sostenible busca minimizar el impacto negativo del turismo en el medioambiente y las comunidades locales.',
    questionText: 'El turismo sostenible busca ___ el impacto negativo.',
    correctAnswer: 'minimizar', points: 1, orderIndex: 61, tags: ['turismo', 'vocabulario']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La alimentación saludable',
    passage: 'La dieta mediterránea es considerada una de las más saludables del mundo. Se basa en el consumo de frutas, verduras, legumbres, pescado y aceite de oliva. Los estudios han demostrado que seguir esta dieta reduce el riesgo de enfermedades cardiovasculares y ayuda a mantener un peso saludable. Los nutricionistas recomiendan también reducir el consumo de alimentos ultraprocesados y azúcar.',
    questionText: '¿Qué aceite es fundamental en la dieta mediterránea?',
    options: [
      { label: 'Aceite de girasol', value: 'aceite de girasol' },
      { label: 'Aceite de coco', value: 'aceite de coco' },
      { label: 'Aceite de oliva', value: 'aceite de oliva' },
      { label: 'Aceite de palma', value: 'aceite de palma' }
    ],
    correctAnswer: 'aceite de oliva', points: 1, orderIndex: 62, tags: ['salud', 'alimentación']
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Los nutricionistas recomiendan también reducir el consumo de alimentos ultraprocesados y azúcar.',
    questionText: 'Se recomienda reducir los alimentos ___ y el azúcar.',
    correctAnswer: 'ultraprocesados', points: 1, orderIndex: 63, tags: ['salud', 'vocabulario']
  },

  // ── B2 — Opinion articles (6 questions, 64–69) ──────────────
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'La inteligencia emocional en el trabajo',
    passage: 'Frente a la tradicional valoración del coeficiente intelectual, cada vez más empresas reconocen la importancia de la inteligencia emocional en el entorno laboral. Capacidades como la empatía, la autorregulación y las habilidades sociales resultan cruciales para el liderazgo efectivo y el trabajo en equipo. Un estudio de la Universidad Complutense demostró que los directivos con alta inteligencia emocional logran equipos un 20% más productivos. No obstante, algunos expertos advierten del riesgo de instrumentalizar las emociones con fines exclusivamente corporativos.',
    questionText: '¿Qué porcentaje más productivos son los equipos liderados por directivos con alta inteligencia emocional?',
    options: [{ label: '10%', value: '10%' }, { label: '15%', value: '15%' }, { label: '20%', value: '20%' }, { label: '30%', value: '30%' }],
    correctAnswer: '20%', points: 2, orderIndex: 64, tags: ['trabajo', 'psicología']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'La inteligencia emocional en el trabajo',
    passage: 'Capacidades como la empatía, la autorregulación y las habilidades sociales resultan cruciales para el liderazgo efectivo y el trabajo en equipo. No obstante, algunos expertos advierten del riesgo de instrumentalizar las emociones con fines exclusivamente corporativos.',
    questionText: '¿Qué preocupa a algunos expertos?',
    options: [
      { label: 'Que la inteligencia emocional no se pueda medir', value: 'que no se pueda medir' },
      { label: 'Que se instrumentalicen las emociones con fines corporativos', value: 'que se instrumentalicen las emociones con fines corporativos' },
      { label: 'Que los empleados sean demasiado emocionales', value: 'que sean demasiado emocionales' },
      { label: 'Que desaparezca el coeficiente intelectual', value: 'que desaparezca el CI' }
    ],
    correctAnswer: 'que se instrumentalicen las emociones con fines corporativos', points: 2, orderIndex: 65, tags: ['trabajo', 'ética']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'La gentrificación urbana',
    passage: 'La gentrificación transforma barrios populares en zonas de moda, atrayendo nuevos comercios, restaurantes y residentes con mayor poder adquisitivo. Si bien esto puede significar una mejora en infraestructuras y servicios, también provoca el desplazamiento de los residentes originales, que ya no pueden pagar los alquileres. En ciudades como Barcelona y Madrid, este fenómeno ha generado protestas vecinales y debates sobre el derecho a la vivienda.',
    questionText: '¿Cuál es la consecuencia negativa principal de la gentrificación según el texto?',
    options: [
      { label: 'La llegada de nuevos comercios', value: 'nuevos comercios' },
      { label: 'El desplazamiento de residentes originales', value: 'el desplazamiento de residentes originales' },
      { label: 'La mejora de infraestructuras', value: 'mejora de infraestructuras' },
      { label: 'El aumento del turismo', value: 'aumento del turismo' }
    ],
    correctAnswer: 'el desplazamiento de residentes originales', points: 2, orderIndex: 66, tags: ['urbanismo', 'sociedad']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'La gentrificación urbana',
    passage: 'En ciudades como Barcelona y Madrid, este fenómeno ha generado protestas vecinales y debates sobre el derecho a la vivienda.',
    questionText: '¿Qué han generado los procesos de gentrificación en Barcelona y Madrid?',
    options: [
      { label: 'Nuevas leyes de construcción', value: 'nuevas leyes' },
      { label: 'Protestas vecinales y debates sobre el derecho a la vivienda', value: 'protestas vecinales y debates sobre el derecho a la vivienda' },
      { label: 'Más empleo', value: 'más empleo' },
      { label: 'Reducción de impuestos', value: 'reducción de impuestos' }
    ],
    correctAnswer: 'protestas vecinales y debates sobre el derecho a la vivienda', points: 2, orderIndex: 67, tags: ['urbanismo', 'política']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'La gentrificación transforma barrios populares en zonas de moda, atrayendo nuevos comercios, restaurantes y residentes con mayor poder adquisitivo.',
    questionText: 'La gentrificación atrae residentes con mayor poder ___.',
    correctAnswer: 'adquisitivo', points: 2, orderIndex: 68, tags: ['urbanismo', 'vocabulario']
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Frente a la tradicional valoración del coeficiente intelectual, cada vez más empresas reconocen la importancia de la inteligencia emocional.',
    questionText: 'Las empresas valoran cada vez más la inteligencia ___.',
    correctAnswer: 'emocional', points: 2, orderIndex: 69, tags: ['trabajo', 'vocabulario']
  },

  // ── C1 — Academic & analytical (7 questions, 70–76) ─────────
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La paradoja de la elección',
    passage: 'El psicólogo Barry Schwartz sostiene que, contrariamente a lo que podría esperarse, una mayor cantidad de opciones no conduce necesariamente a una mayor satisfacción. En su obra "La paradoja de la elección", argumenta que el exceso de alternativas puede generar ansiedad, parálisis decisoria y arrepentimiento posterior. Los "maximizadores" — aquellos que buscan siempre la mejor opción posible — tienden a experimentar mayor insatisfacción que los "satisficers", quienes aceptan una opción suficientemente buena sin agonizar sobre las alternativas descartadas.',
    questionText: '¿Qué diferencia hay entre "maximizadores" y "satisficers"?',
    options: [
      { label: 'Los maximizadores compran más y los satisficers menos', value: 'compran más vs menos' },
      { label: 'Los maximizadores buscan la mejor opción; los satisficers aceptan una suficientemente buena', value: 'los maximizadores buscan la mejor; los satisficers aceptan una suficientemente buena' },
      { label: 'Los maximizadores son más felices', value: 'maximizadores más felices' },
      { label: 'No hay diferencia significativa', value: 'no hay diferencia' }
    ],
    correctAnswer: 'los maximizadores buscan la mejor; los satisficers aceptan una suficientemente buena', points: 2, orderIndex: 70, tags: ['psicología', 'consumo']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La paradoja de la elección',
    passage: 'Schwartz argumenta que el exceso de alternativas puede generar ansiedad, parálisis decisoria y arrepentimiento posterior.',
    questionText: '¿Qué efectos negativos produce el exceso de opciones según Schwartz?',
    options: [
      { label: 'Creatividad y motivación', value: 'creatividad y motivación' },
      { label: 'Ansiedad, parálisis decisoria y arrepentimiento', value: 'ansiedad, parálisis decisoria y arrepentimiento' },
      { label: 'Indiferencia y aburrimiento', value: 'indiferencia y aburrimiento' },
      { label: 'Agresividad y frustración', value: 'agresividad y frustración' }
    ],
    correctAnswer: 'ansiedad, parálisis decisoria y arrepentimiento', points: 2, orderIndex: 71, tags: ['psicología']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'El sesgo de confirmación',
    passage: 'El sesgo de confirmación es la tendencia cognitiva a buscar, interpretar y recordar información de manera que confirme las creencias previas. Este fenómeno, ampliamente documentado en la literatura científica, resulta especialmente preocupante en la era de las redes sociales, donde los algoritmos personalizan el contenido reforzando las opiniones existentes del usuario. Los investigadores sugieren que la exposición deliberada a perspectivas contrarias y la práctica del pensamiento crítico son las estrategias más eficaces para contrarrestar este sesgo.',
    questionText: '¿Cómo contribuyen las redes sociales al sesgo de confirmación?',
    options: [
      { label: 'Eliminando contenido sesgado', value: 'eliminando contenido sesgado' },
      { label: 'Mediante algoritmos que refuerzan las opiniones existentes', value: 'mediante algoritmos que refuerzan las opiniones existentes' },
      { label: 'Ofreciendo diversidad de opiniones', value: 'ofreciendo diversidad' },
      { label: 'Bloqueando noticias falsas', value: 'bloqueando noticias falsas' }
    ],
    correctAnswer: 'mediante algoritmos que refuerzan las opiniones existentes', points: 2, orderIndex: 72, tags: ['psicología', 'tecnología']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'El sesgo de confirmación',
    passage: 'Los investigadores sugieren que la exposición deliberada a perspectivas contrarias y la práctica del pensamiento crítico son las estrategias más eficaces para contrarrestar este sesgo.',
    questionText: '¿Qué estrategias se proponen para contrarrestar el sesgo de confirmación?',
    options: [
      { label: 'Evitar las redes sociales por completo', value: 'evitar redes sociales' },
      { label: 'Exposición a perspectivas contrarias y pensamiento crítico', value: 'exposición a perspectivas contrarias y pensamiento crítico' },
      { label: 'Leer solo fuentes oficiales', value: 'solo fuentes oficiales' },
      { label: 'No formar opiniones propias', value: 'no formar opiniones' }
    ],
    correctAnswer: 'exposición a perspectivas contrarias y pensamiento crítico', points: 2, orderIndex: 73, tags: ['psicología', 'metodología']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'El sesgo de confirmación es la tendencia cognitiva a buscar, interpretar y recordar información de manera que confirme las creencias previas.',
    questionText: 'El sesgo de confirmación refuerza las ___ previas del individuo.',
    correctAnswer: 'creencias', points: 2, orderIndex: 74, tags: ['psicología', 'vocabulario']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La obsolescencia programada',
    passage: 'La obsolescencia programada consiste en diseñar productos con una vida útil deliberadamente limitada para estimular el consumo continuado. Esta práctica, denunciada por ecologistas y asociaciones de consumidores, genera enormes cantidades de residuos electrónicos. Países como Francia han aprobado leyes que penalizan esta práctica, mientras que en otros países el debate legislativo avanza lentamente. Los defensores del modelo argumentan que la innovación constante beneficia al consumidor, pero los críticos señalan que prioriza los beneficios corporativos sobre la sostenibilidad.',
    questionText: '¿Qué país ha legislado contra la obsolescencia programada?',
    options: [
      { label: 'Alemania', value: 'Alemania' },
      { label: 'Francia', value: 'Francia' },
      { label: 'España', value: 'España' },
      { label: 'Italia', value: 'Italia' }
    ],
    correctAnswer: 'Francia', points: 2, orderIndex: 75, tags: ['consumo', 'legislación']
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'La obsolescencia programada consiste en diseñar productos con una vida útil deliberadamente limitada para estimular el consumo continuado.',
    questionText: 'Los productos se diseñan con una vida ___ deliberadamente limitada.',
    correctAnswer: 'útil', points: 2, orderIndex: 76, tags: ['consumo', 'vocabulario']
  },

  // ── C2 — Philosophical & literary texts (6 questions, 77–82) ─
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'La aporía del libre albedrío',
    passage: 'El debate sobre el libre albedrío constituye una de las aporías más persistentes de la filosofía occidental. El determinismo duro sostiene que toda acción humana es producto inevitable de causas precedentes, lo que convertiría la responsabilidad moral en una ficción útil pero ontológicamente infundada. El compatibilismo, por su parte, intenta reconciliar el determinismo causal con una noción pragmática de libertad, definiendo al agente libre no como aquel exento de causas, sino como aquel cuyas acciones emanan de sus propios deseos y deliberaciones, sin coacción externa.',
    questionText: '¿Cómo define el compatibilismo la libertad del agente?',
    options: [
      { label: 'Como la ausencia total de causas', value: 'ausencia total de causas' },
      { label: 'Como acciones que emanan de los propios deseos sin coacción externa', value: 'acciones que emanan de los propios deseos sin coacción externa' },
      { label: 'Como una ilusión sin fundamento', value: 'una ilusión' },
      { label: 'Como la capacidad de predecir el futuro', value: 'predecir el futuro' }
    ],
    correctAnswer: 'acciones que emanan de los propios deseos sin coacción externa', points: 2, orderIndex: 77, tags: ['filosofía', 'libre albedrío']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'La aporía del libre albedrío',
    passage: 'El determinismo duro sostiene que toda acción humana es producto inevitable de causas precedentes, lo que convertiría la responsabilidad moral en una ficción útil pero ontológicamente infundada.',
    questionText: '¿Qué implicación tiene el determinismo duro para la responsabilidad moral?',
    options: [
      { label: 'La refuerza', value: 'la refuerza' },
      { label: 'La convertiría en una ficción sin fundamento ontológico', value: 'la convertiría en una ficción sin fundamento ontológico' },
      { label: 'No la afecta', value: 'no la afecta' },
      { label: 'La hace más importante', value: 'la hace más importante' }
    ],
    correctAnswer: 'la convertiría en una ficción sin fundamento ontológico', points: 2, orderIndex: 78, tags: ['filosofía', 'ética']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Borges y la metaficción',
    passage: 'En "Tlön, Uqbar, Orbis Tertius", Borges despliega una sofisticada estrategia metaficcional al narrar el descubrimiento de una enciclopedia que describe un mundo inventado cuya filosofía idealista termina infiltrándose en la realidad. La frontera entre ficción y realidad se disuelve progresivamente, sugiriendo que toda construcción cultural — incluida la que llamamos "realidad" — es, en última instancia, un artefacto lingüístico. Esta disolución ontológica anticipa debates posmodernos sobre la naturaleza construida del conocimiento.',
    questionText: '¿Qué sugiere Borges sobre la relación entre ficción y realidad?',
    options: [
      { label: 'Son completamente independientes', value: 'son independientes' },
      { label: 'La frontera entre ambas se disuelve; la realidad es un artefacto lingüístico', value: 'la frontera se disuelve; la realidad es un artefacto lingüístico' },
      { label: 'La ficción siempre es inferior a la realidad', value: 'la ficción es inferior' },
      { label: 'Solo la ciencia puede distinguirlas', value: 'solo la ciencia' }
    ],
    correctAnswer: 'la frontera se disuelve; la realidad es un artefacto lingüístico', points: 2, orderIndex: 79, tags: ['literatura', 'filosofía']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Borges y la metaficción',
    passage: 'Esta disolución ontológica anticipa debates posmodernos sobre la naturaleza construida del conocimiento.',
    questionText: 'La palabra "anticipa" en este contexto significa:',
    options: [
      { label: 'Contradice', value: 'contradice' },
      { label: 'Precede y anuncia', value: 'precede y anuncia' },
      { label: 'Imita', value: 'imita' },
      { label: 'Rechaza', value: 'rechaza' }
    ],
    correctAnswer: 'precede y anuncia', points: 2, orderIndex: 80, tags: ['vocabulario', 'literatura']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'El determinismo duro sostiene que toda acción humana es producto inevitable de causas precedentes.',
    questionText: 'El determinismo duro considera que las acciones humanas son producto ___ de causas precedentes.',
    correctAnswer: 'inevitable', points: 2, orderIndex: 81, tags: ['filosofía', 'vocabulario']
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'FILL_BLANK', skill: 'READING',
    passage: 'Borges despliega una sofisticada estrategia metaficcional al narrar el descubrimiento de una enciclopedia que describe un mundo inventado.',
    questionText: 'La estrategia narrativa de Borges en este cuento es de tipo ___.',
    correctAnswer: 'metaficcional', points: 2, orderIndex: 82, tags: ['literatura', 'narratología']
  },

  // ===== PREGUNTAS DE LECTURA PROFESIONAL / LABORAL =====

  // --- A1: Correo electrónico de oficina sobre un cambio de hora de reunión ---
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Cambio de hora de la reunión',
    passage: 'Estimado equipo, La reunión del miércoles es ahora a las 15:00, no a las 14:00. La sala de reuniones es la sala 5B. Por favor, traigan su portátil. Gracias, David.',
    questionText: '¿A qué hora es la reunión ahora?',
    options: [
      { label: 'A las 14:00', value: 'A las 14:00' },
      { label: 'A las 15:00', value: 'A las 15:00' },
      { label: 'A las 17:00', value: 'A las 17:00' },
      { label: 'A las 13:00', value: 'A las 13:00' }
    ],
    correctAnswer: 'A las 15:00', points: 1, orderIndex: 83, tags: ['correo profesional', 'trabajo']
  },

  // --- A1: Menú de restaurante para un almuerzo de negocios ---
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Menú del almuerzo de negocios',
    passage: 'Menú del día — Restaurante El Rincón. Sopa del día: Tomate — 4,50 €. Pollo a la plancha con ensalada — 9,00 €. Pasta con verduras — 7,50 €. Café o té incluido con cada plato.',
    questionText: '¿Cuánto cuesta el pollo a la plancha con ensalada?',
    options: [
      { label: '4,50 €', value: '4,50 €' },
      { label: '7,50 €', value: '7,50 €' },
      { label: '9,00 €', value: '9,00 €' },
      { label: '12,00 €', value: '12,00 €' }
    ],
    correctAnswer: '9,00 €', points: 1, orderIndex: 84, tags: ['almuerzo de negocios', 'trabajo']
  },

  // --- A1: Tarjeta de información del hotel ---
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Tarjeta de bienvenida del hotel',
    passage: 'Bienvenido al Hotel Central. Su habitación es la 412. El desayuno es de 7:00 a 10:00 en el restaurante de la planta baja. Contraseña Wi-Fi: CENTRAL2024. La salida es a las 11:00.',
    questionText: '¿Cuál es la contraseña del Wi-Fi?',
    options: [
      { label: 'HOTEL2024', value: 'HOTEL2024' },
      { label: 'CENTRAL2024', value: 'CENTRAL2024' },
      { label: 'HABITACION412', value: 'HABITACION412' },
      { label: 'BIENVENIDO', value: 'BIENVENIDO' }
    ],
    correctAnswer: 'CENTRAL2024', points: 1, orderIndex: 85, tags: ['viaje de negocios', 'hotel']
  },

  // --- A1: Horario de trabajo semanal ---
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Horario de trabajo semanal',
    passage: 'Horario de trabajo — Semana 12. De lunes a miércoles: 9:00 – 17:00. Jueves: Día libre. Viernes: 9:00 – 13:00. Sábado y domingo: Cerrado.',
    questionText: '¿Cuándo es el día libre?',
    options: [
      { label: 'Lunes', value: 'Lunes' },
      { label: 'Miércoles', value: 'Miércoles' },
      { label: 'Jueves', value: 'Jueves' },
      { label: 'Viernes', value: 'Viernes' }
    ],
    correctAnswer: 'Jueves', points: 1, orderIndex: 86, tags: ['horario laboral', 'trabajo']
  },

  // --- A2: Anuncio de empleo para recepcionista ---
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Oferta de empleo',
    passage: 'Buscamos un/a recepcionista para nuestra oficina en Barcelona. Es necesario hablar español e inglés. El horario de trabajo es de lunes a viernes, de 8:30 a 17:30. Se requiere experiencia con Microsoft Office. Envíe su CV a rrhh@globaltech.es antes del 30 de marzo.',
    questionText: '¿Qué idiomas debe hablar el/la recepcionista?',
    options: [
      { label: 'Español y francés', value: 'Español y francés' },
      { label: 'Español e inglés', value: 'Español e inglés' },
      { label: 'Inglés y alemán', value: 'Inglés y alemán' },
      { label: 'Español e italiano', value: 'Español e italiano' }
    ],
    correctAnswer: 'Español e inglés', points: 1, orderIndex: 87, tags: ['oferta de empleo', 'trabajo']
  },

  // --- A2: Correo para rechazar una invitación a una reunión ---
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Rechazo de una reunión',
    passage: 'Hola Marco, Gracias por la invitación a la reunión comercial del martes a las 10:00. Lamentablemente, no puedo asistir porque tengo una visita a un cliente en ese momento. ¿Podrías enviarme el acta de la reunión después? Saludos cordiales, Ana Fischer.',
    questionText: '¿Por qué Ana no puede asistir a la reunión?',
    options: [
      { label: 'Está de vacaciones', value: 'Está de vacaciones' },
      { label: 'Tiene una visita a un cliente', value: 'Tiene una visita a un cliente' },
      { label: 'No se siente bien', value: 'No se siente bien' },
      { label: 'Tiene otra reunión con su jefe', value: 'Tiene otra reunión con su jefe' }
    ],
    correctAnswer: 'Tiene una visita a un cliente', points: 1, orderIndex: 88, tags: ['correo profesional', 'trabajo']
  },

  // --- A2: Aviso de cierre de la oficina ---
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Cierre de la oficina',
    passage: 'Les informamos de que la oficina estará cerrada del 23 de diciembre al 2 de enero por las fiestas. El último día laborable es el 22 de diciembre. Si necesitan ayuda durante este período, envíen un correo electrónico a soporte@brightcorp.es. ¡Felices fiestas a todos!',
    questionText: '¿Cuál es el último día laborable antes de las fiestas?',
    options: [
      { label: 'El 20 de diciembre', value: 'El 20 de diciembre' },
      { label: 'El 22 de diciembre', value: 'El 22 de diciembre' },
      { label: 'El 23 de diciembre', value: 'El 23 de diciembre' },
      { label: 'El 2 de enero', value: 'El 2 de enero' }
    ],
    correctAnswer: 'El 22 de diciembre', points: 1, orderIndex: 89, tags: ['aviso de empresa', 'trabajo']
  },

  // --- A2: Instrucciones para la máquina de café ---
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Instrucciones para la máquina de café',
    passage: 'Cómo usar la máquina de café: 1. Coloque su taza debajo de la boquilla. 2. Pulse el botón azul para espresso o el botón verde para capuchino. 3. Espere 30 segundos. 4. Limpie la bandeja de goteo al final de cada día. Si la máquina muestra una luz roja, contacte con el servicio técnico en la extensión 220.',
    questionText: '¿Qué hay que hacer si la máquina muestra una luz roja?',
    options: [
      { label: 'Pulsar el botón azul', value: 'Pulsar el botón azul' },
      { label: 'Limpiar la bandeja de goteo', value: 'Limpiar la bandeja de goteo' },
      { label: 'Contactar con el servicio técnico en la extensión 220', value: 'Contactar con el servicio técnico en la extensión 220' },
      { label: 'Esperar 30 segundos', value: 'Esperar 30 segundos' }
    ],
    correctAnswer: 'Contactar con el servicio técnico en la extensión 220', points: 1, orderIndex: 90, tags: ['instrucciones de oficina', 'trabajo']
  },

  // --- B1: Correo sobre la prórroga de un plazo de proyecto ---
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Actualización del proyecto',
    passage: 'Estimados colegas, Les informo de que el plazo para el informe del tercer trimestre se ha prorrogado hasta el 15 de octubre. Varios miembros del equipo han reportado dificultades con la recopilación de datos debido a la migración del sistema de la semana pasada. Por favor, aprovechen este tiempo adicional para garantizar la exactitud de sus entregas. Para cualquier consulta, contacten con su responsable de departamento. Atentamente, Sara García, Directora de Proyecto.',
    questionText: '¿Por qué se prorrogó el plazo del informe?',
    options: [
      { label: 'La directora de proyecto estaba de vacaciones', value: 'La directora de proyecto estaba de vacaciones' },
      { label: 'Hubo dificultades con la recopilación de datos por la migración del sistema', value: 'Hubo dificultades con la recopilación de datos por la migración del sistema' },
      { label: 'El cliente solicitó cambios', value: 'El cliente solicitó cambios' },
      { label: 'El equipo quería más tiempo para celebrar', value: 'El equipo quería más tiempo para celebrar' }
    ],
    correctAnswer: 'Hubo dificultades con la recopilación de datos por la migración del sistema', points: 1, orderIndex: 91, tags: ['correo profesional', 'trabajo']
  },

  // --- B1: Artículo sobre el teletrabajo vs oficina ---
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Teletrabajo o oficina',
    passage: 'Una encuesta reciente a 2.000 empleados reveló que el 65% prefiere un modelo de trabajo híbrido, que combina días en remoto y días en la oficina. Los trabajadores afirmaron ser más productivos en casa porque hay menos interrupciones. Sin embargo, muchos también dijeron que echan de menos las interacciones cara a cara con los compañeros. Las empresas están experimentando ahora con "días de colaboración" en los que los equipos acuden a la oficina los mismos días para reunirse y planificar juntos. Los expertos aseguran que la clave es la flexibilidad.',
    questionText: '¿Qué prefiere la mayoría de los empleados según la encuesta?',
    options: [
      { label: 'Trabajar solo desde casa', value: 'Trabajar solo desde casa' },
      { label: 'Un modelo de trabajo híbrido', value: 'Un modelo de trabajo híbrido' },
      { label: 'Trabajar solo desde la oficina', value: 'Trabajar solo desde la oficina' },
      { label: 'Cambiar de trabajo cada año', value: 'Cambiar de trabajo cada año' }
    ],
    correctAnswer: 'Un modelo de trabajo híbrido', points: 1, orderIndex: 92, tags: ['teletrabajo', 'tendencias laborales']
  },

  // --- B1: Boletín de empresa sobre un nuevo beneficio ---
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Nuevo beneficio de bienestar',
    passage: 'Nos complace anunciar un nuevo beneficio de bienestar para todos los empleados a tiempo completo a partir del 1 de enero. La empresa cubrirá hasta 500 € al año para membresías de gimnasio, clases de yoga o asesoramiento psicológico. Para utilizar este beneficio, los empleados deben enviar los recibos a través del portal de RRHH en un plazo de 30 días desde el pago. Esta iniciativa forma parte de nuestro compromiso con el bienestar de los colaboradores. Para más detalles, visiten la sección de Beneficios en la intranet de la empresa.',
    questionText: '¿Cómo pueden los empleados utilizar el nuevo beneficio?',
    options: [
      { label: 'Pidiendo la aprobación de su jefe', value: 'Pidiendo la aprobación de su jefe' },
      { label: 'Enviando los recibos a través del portal de RRHH', value: 'Enviando los recibos a través del portal de RRHH' },
      { label: 'Inscribiéndose en el gimnasio de la empresa', value: 'Inscribiéndose en el gimnasio de la empresa' },
      { label: 'Asistiendo a un taller obligatorio', value: 'Asistiendo a un taller obligatorio' }
    ],
    correctAnswer: 'Enviando los recibos a través del portal de RRHH', points: 1, orderIndex: 93, tags: ['beneficios laborales', 'trabajo']
  },

  // --- B1: Política de viajes de empresa ---
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Política de viajes de empresa',
    passage: 'Todos los viajes de empresa deben ser aprobados por su responsable directo al menos dos semanas antes del viaje. Los vuelos en clase turista deben reservarse para viajes de menos de cinco horas. Los costes de hotel no deben superar los 150 € por noche. Los empleados deben utilizar el portal de viajes de la empresa para reservar vuelos y hoteles. Las comidas durante el viaje se reembolsan hasta 45 € por día. Todos los recibos deben presentarse en un plazo de 10 días laborables desde su regreso.',
    questionText: '¿Cuál es el coste máximo de hotel permitido por noche?',
    options: [
      { label: '100 €', value: '100 €' },
      { label: '120 €', value: '120 €' },
      { label: '150 €', value: '150 €' },
      { label: '200 €', value: '200 €' }
    ],
    correctAnswer: '150 €', points: 1, orderIndex: 94, tags: ['política de viajes', 'trabajo']
  },

  // --- B2: Artículo sobre estilos de liderazgo ---
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Estilos de liderazgo en las empresas modernas',
    passage: 'El modelo tradicional de liderazgo basado en el mando y control está siendo sustituido cada vez más por enfoques colaborativos. Los líderes transformacionales, que inspiran y motivan a sus equipos articulando una visión convincente, han demostrado impulsar niveles más altos de compromiso de los empleados. El liderazgo de servicio, donde el papel principal del líder es apoyar el crecimiento y desarrollo de sus colaboradores, ha ganado popularidad en las empresas tecnológicas. Sin embargo, la investigación sugiere que ningún estilo único es universalmente eficaz; los mejores líderes adaptan su enfoque según la situación, la madurez del equipo y la naturaleza de la tarea. Este concepto, conocido como liderazgo situacional, requiere inteligencia emocional y una comprensión profunda de las dinámicas de equipo.',
    questionText: 'Según el artículo, ¿qué requiere el liderazgo situacional?',
    options: [
      { label: 'Un conjunto estricto de reglas para cada situación', value: 'Un conjunto estricto de reglas para cada situación' },
      { label: 'Inteligencia emocional y comprensión de las dinámicas de equipo', value: 'Inteligencia emocional y comprensión de las dinámicas de equipo' },
      { label: 'Experiencia solo en el sector tecnológico', value: 'Experiencia solo en el sector tecnológico' },
      { label: 'Un enfoque de liderazgo único y constante', value: 'Un enfoque de liderazgo único y constante' }
    ],
    correctAnswer: 'Inteligencia emocional y comprensión de las dinámicas de equipo', points: 2, orderIndex: 95, tags: ['liderazgo', 'gestión']
  },

  // --- B2: Resultados de una encuesta de satisfacción laboral ---
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Resultados de la encuesta de satisfacción de los empleados',
    passage: 'La encuesta anual de satisfacción de los empleados, completada por el 87% de la plantilla, revela varias tendencias destacables. La satisfacción general ha subido del 72% al 78% en comparación con el año pasado, impulsada principalmente por las mejoras en la comunicación directiva y las modalidades de trabajo flexible. Sin embargo, las oportunidades de desarrollo profesional siguen siendo la categoría peor valorada con un 58%, y muchos encuestados expresan frustración por la falta de vías de promoción claras. El departamento de RRHH ha propuesto un programa de mentoría y talleres trimestrales de desarrollo profesional. Además, el 40% de los encuestados señaló que la distribución de la carga de trabajo sigue siendo desigual entre los departamentos.',
    questionText: '¿Cuál es el área peor valorada en la encuesta?',
    options: [
      { label: 'La comunicación directiva', value: 'La comunicación directiva' },
      { label: 'Las modalidades de trabajo flexible', value: 'Las modalidades de trabajo flexible' },
      { label: 'Las oportunidades de desarrollo profesional', value: 'Las oportunidades de desarrollo profesional' },
      { label: 'La distribución de la carga de trabajo', value: 'La distribución de la carga de trabajo' }
    ],
    correctAnswer: 'Las oportunidades de desarrollo profesional', points: 2, orderIndex: 96, tags: ['encuesta satisfacción', 'RRHH']
  },

  // --- B2: Tendencias de conciliación vida-trabajo ---
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Tendencias de conciliación vida-trabajo en Europa',
    passage: 'Un estudio exhaustivo de la Fundación Europea para la Mejora de las Condiciones de Vida y de Trabajo ha revelado variaciones significativas en la conciliación vida-trabajo entre los Estados miembros de la UE. Los países nórdicos se sitúan sistemáticamente en los primeros puestos, con horarios laborales medios más cortos y generosas políticas de permiso parental. Por el contrario, los países del sur de Europa registran jornadas laborales más largas pero se benefician de redes de apoyo familiar más sólidas. El estudio también identificó una tendencia creciente hacia la semana laboral de cuatro días, con programas piloto en Bélgica, España y el Reino Unido que muestran resultados prometedores — la productividad se mantuvo estable o mejoró, mientras que el agotamiento laboral disminuyó un 30%. Los críticos argumentan, sin embargo, que estos modelos son principalmente adecuados para sectores basados en el conocimiento.',
    questionText: '¿Qué mostraron los programas piloto de la semana de cuatro días?',
    options: [
      { label: 'La productividad bajó significativamente', value: 'La productividad bajó significativamente' },
      { label: 'La productividad se mantuvo estable o mejoró y el agotamiento disminuyó', value: 'La productividad se mantuvo estable o mejoró y el agotamiento disminuyó' },
      { label: 'Los empleados preferían trabajar cinco días', value: 'Los empleados preferían trabajar cinco días' },
      { label: 'Solo las empresas industriales se beneficiaron', value: 'Solo las empresas industriales se beneficiaron' }
    ],
    correctAnswer: 'La productividad se mantuvo estable o mejoró y el agotamiento disminuyó', points: 2, orderIndex: 97, tags: ['conciliación vida-trabajo', 'tendencias europeas']
  },

  // --- B2: Resumen ejecutivo de una propuesta comercial ---
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Resumen ejecutivo: Propuesta de expansión',
    passage: 'Esta propuesta describe una estrategia para expandirse en la región DACH (Alemania, Austria y Suiza) durante los próximos 18 meses. La investigación de mercado indica una fuerte demanda de nuestra plataforma SaaS entre las pymes del sector manufacturero, con un mercado direccionable estimado de 45 millones de euros anuales. El enfoque propuesto incluye la apertura de una oficina comercial regional en Múnich, la contratación de un equipo de cinco comerciales locales y la asociación con dos consultoras establecidas. La inversión total requerida es de 1,2 millones de euros, con un punto de equilibrio proyectado a los 14 meses. Los principales riesgos incluyen diferencias regulatorias entre los tres mercados y la competencia de proveedores locales establecidos.',
    questionText: '¿Cuándo se prevé alcanzar el punto de equilibrio de esta expansión?',
    options: [
      { label: '6 meses', value: '6 meses' },
      { label: '14 meses', value: '14 meses' },
      { label: '18 meses', value: '18 meses' },
      { label: '24 meses', value: '24 meses' }
    ],
    correctAnswer: '14 meses', points: 2, orderIndex: 98, tags: ['propuesta comercial', 'estrategia']
  },

  // --- C1: Estrategias de negociación intercultural ---
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Estrategias de negociación intercultural',
    passage: 'Una negociación intercultural eficaz requiere mucho más que competencia lingüística; exige una comprensión de marcos culturales profundamente arraigados que moldean cómo se construye la confianza, se toman las decisiones y se alcanzan los acuerdos. En las culturas de alto contexto, como Japón y muchos países de Oriente Medio, la construcción de relaciones a menudo precede cualquier discusión sobre las condiciones, y el silencio durante las negociaciones puede señalar reflexión más que desacuerdo. Por el contrario, las culturas de bajo contexto, incluidos Estados Unidos y Alemania, tienden a priorizar la franqueza, los argumentos basados en datos y los contratos escritos. Las investigaciones de Erin Meyer en INSEAD han demostrado que incluso dentro de Europa existen diferencias significativas — los negociadores franceses, por ejemplo, a menudo participan en debates intelectuales como parte del proceso, mientras que sus homólogos escandinavos favorecen la búsqueda de consenso y pueden percibir las tácticas confrontativas como contraproducentes.',
    questionText: 'Según el pasaje, ¿qué puede indicar el silencio durante una negociación en culturas de alto contexto?',
    options: [
      { label: 'Desacuerdo con la propuesta', value: 'Desacuerdo con la propuesta' },
      { label: 'El deseo de terminar la negociación', value: 'El deseo de terminar la negociación' },
      { label: 'Reflexión más que desacuerdo', value: 'Reflexión más que desacuerdo' },
      { label: 'Falta de preparación', value: 'Falta de preparación' }
    ],
    correctAnswer: 'Reflexión más que desacuerdo', points: 2, orderIndex: 99, tags: ['intercultural', 'negociación']
  },

  // --- C1: Responsabilidad social corporativa ---
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'El impacto de la responsabilidad social corporativa',
    passage: 'La responsabilidad social corporativa (RSC) ha evolucionado de un ejercicio periférico de relaciones públicas a un imperativo estratégico para muchas multinacionales. Estudios de la Harvard Business School han demostrado que las empresas con programas de RSC sólidos tienden a superar financieramente a sus competidores a largo plazo, en parte porque atraen y retienen a los mejores talentos que buscan cada vez más un trabajo con propósito. Sin embargo, el auge del "lavado verde" — declaraciones superficiales o engañosas sobre prácticas medioambientales — ha generado un escepticismo creciente entre consumidores y reguladores. La Directiva europea sobre información de sostenibilidad corporativa (CSRD), que entró en vigor en 2024, exige a las grandes empresas divulgar datos detallados sobre criterios ambientales, sociales y de gobernanza (ESG). Los críticos de la RSC argumentan que puede desviar la atención de los cambios estructurales fundamentales necesarios para abordar la desigualdad y el cambio climático.',
    questionText: '¿Cuál es la principal preocupación sobre el "lavado verde" mencionada en el pasaje?',
    options: [
      { label: 'Aumenta injustamente los beneficios empresariales', value: 'Aumenta injustamente los beneficios empresariales' },
      { label: 'Ha generado escepticismo sobre la autenticidad de los compromisos de RSC', value: 'Ha generado escepticismo sobre la autenticidad de los compromisos de RSC' },
      { label: 'Solo lo practican las pequeñas empresas', value: 'Solo lo practican las pequeñas empresas' },
      { label: 'Es exigido por la normativa europea', value: 'Es exigido por la normativa europea' }
    ],
    correctAnswer: 'Ha generado escepticismo sobre la autenticidad de los compromisos de RSC', points: 2, orderIndex: 100, tags: ['RSC', 'sostenibilidad']
  },

  // --- C1: Transformación digital en las pymes ---
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'Los retos de la transformación digital en las pymes',
    passage: 'Mientras que las grandes empresas han adoptado generalmente la transformación digital con presupuestos dedicados y equipos especializados, las pequeñas y medianas empresas (pymes) se enfrentan a un conjunto distinto de desafíos. Un informe de la OCDE de 2024 reveló que solo el 35% de las pymes europeas había implementado herramientas digitales avanzadas como la computación en la nube, el análisis de datos o la automatización. Las principales barreras citadas fueron los recursos financieros limitados, la escasez de empleados con competencias digitales y la resistencia al cambio por parte del personal con larga antigüedad acostumbrado a los flujos de trabajo establecidos. Además, muchos propietarios de pymes expresaron incertidumbre sobre qué tecnologías ofrecerían un retorno tangible de la inversión. Los programas de digitalización respaldados por los gobiernos han tenido resultados mixtos; mientras que las subvenciones han ayudado a algunas empresas a adoptar nuevos sistemas, la falta de soporte técnico continuado hace que las nuevas herramientas a menudo se infrautilicen.',
    questionText: 'Según el informe de la OCDE, ¿qué porcentaje de pymes europeas había adoptado herramientas digitales avanzadas?',
    options: [
      { label: '25%', value: '25%' },
      { label: '35%', value: '35%' },
      { label: '50%', value: '50%' },
      { label: '65%', value: '65%' }
    ],
    correctAnswer: '35%', points: 2, orderIndex: 101, tags: ['transformación digital', 'pymes']
  },

  // --- C1: Retención del talento ---
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'READING', skill: 'READING',
    passageTitle: 'La retención del talento en mercados competitivos',
    passage: 'En una era caracterizada por la escasez de talento y la llamada "Gran Renuncia", las organizaciones se ven obligadas a replantear sus estrategias de retención del talento. Los enfoques tradicionales centrados en salarios competitivos y bonificaciones anuales resultan insuficientes, ya que los empleados — especialmente los millennials y la Generación Z — priorizan cada vez más el propósito, la autonomía y el desarrollo profesional sobre las recompensas puramente económicas. Las empresas líderes están invirtiendo en itinerarios de aprendizaje personalizados, programas de movilidad interna y criterios de promoción transparentes. El informe LinkedIn 2024 sobre Aprendizaje en el Trabajo reveló que los empleados que sienten que tienen oportunidades de aprender y crecer tienen 3,5 veces más probabilidades de quedarse con su empleador. Sin embargo, la retención no depende solo de los incentivos individuales; la cultura organizativa, el liderazgo inclusivo y la calidad de la relación entre manager y empleado siguen siendo los predictores más fuertes.',
    questionText: 'Según el informe de LinkedIn, ¿qué hace que los empleados tengan 3,5 veces más probabilidades de quedarse?',
    options: [
      { label: 'Salarios más altos que la competencia', value: 'Salarios más altos que la competencia' },
      { label: 'Oportunidades de aprender y crecer', value: 'Oportunidades de aprender y crecer' },
      { label: 'Menos horas de trabajo semanales', value: 'Menos horas de trabajo semanales' },
      { label: 'Bonificaciones anuales', value: 'Bonificaciones anuales' }
    ],
    correctAnswer: 'Oportunidades de aprender y crecer', points: 2, orderIndex: 102, tags: ['retención de talento', 'estrategia RRHH']
  },

  // --- C2: IA ética en las decisiones de RRHH ---
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Implementación ética de la IA en las decisiones de RRHH',
    passage: 'El despliegue de la inteligencia artificial en los recursos humanos — desde los algoritmos de cribado de currículos hasta los modelos predictivos de rotación — plantea profundas cuestiones éticas que las organizaciones apenas están empezando a abordar. Mientras que la IA promete reducir los sesgos inconscientes estandarizando los criterios de evaluación, la evidencia empírica cuenta una historia más matizada. La herramienta de contratación de Amazon, ya descontinuada, que penalizaba sistemáticamente los currículos que contenían la palabra "mujeres", demostró cómo los algoritmos entrenados con datos históricamente sesgados pueden perpetuar e incluso amplificar las desigualdades existentes. El Reglamento europeo de IA, adoptado en 2024, clasifica los sistemas de IA relacionados con el empleo como "de alto riesgo", sometiéndolos a estrictos requisitos de transparencia, supervisión humana y auditoría de sesgos. Sin embargo, el cumplimiento normativo por sí solo es insuficiente; las organizaciones deben cultivar lo que los académicos denominan "alfabetización algorítmica" — la capacidad de los profesionales de RRHH para evaluar críticamente los resultados de la IA en lugar de tratarlos como verdades objetivas.',
    questionText: 'Según el pasaje, ¿qué es insuficiente por sí solo al implementar IA en RRHH?',
    options: [
      { label: 'La formación técnica de los ingenieros', value: 'La formación técnica de los ingenieros' },
      { label: 'El cumplimiento normativo', value: 'El cumplimiento normativo' },
      { label: 'El aumento del volumen de datos de entrenamiento', value: 'El aumento del volumen de datos de entrenamiento' },
      { label: 'La eliminación de toda participación humana', value: 'La eliminación de toda participación humana' }
    ],
    correctAnswer: 'El cumplimiento normativo', points: 2, orderIndex: 103, tags: ['ética IA', 'tecnología RRHH']
  },

  // --- C2: Capitalismo de las partes interesadas vs primacía del accionista ---
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Capitalismo de las partes interesadas vs primacía del accionista',
    passage: 'El debate entre el capitalismo de las partes interesadas y la primacía del accionista representa una de las líneas de fractura ideológicas más trascendentales del pensamiento empresarial contemporáneo. La doctrina de Milton Friedman de 1970 — según la cual la única responsabilidad social de una empresa es aumentar sus beneficios — dominó el capitalismo angloamericano durante décadas. El modelo de las partes interesadas, defendido por figuras como Klaus Schwab del Foro Económico Mundial, sostiene que las empresas deben equilibrar los intereses de accionistas, empleados, clientes, comunidades y medio ambiente para asegurar la creación de valor a largo plazo. La declaración del Business Roundtable de 2019, firmada por 181 consejeros delegados de grandes empresas estadounidenses, adoptó formalmente un propósito orientado a las partes interesadas. Sin embargo, los críticos han calificado este giro como en gran medida performativo, señalando que las estructuras de remuneración de los directivos siguen estando predominantemente vinculadas a la cotización bursátil.',
    questionText: '¿Por qué los críticos califican el compromiso del Business Roundtable de 2019 como "performativo"?',
    options: [
      { label: 'Porque los consejeros delegados no firmaron la declaración voluntariamente', value: 'Porque los consejeros delegados no firmaron la declaración voluntariamente' },
      { label: 'Porque la remuneración de los directivos sigue vinculada a la cotización bursátil', value: 'Porque la remuneración de los directivos sigue vinculada a la cotización bursátil' },
      { label: 'Porque el capitalismo de las partes interesadas es ilegal en Estados Unidos', value: 'Porque el capitalismo de las partes interesadas es ilegal en Estados Unidos' },
      { label: 'Porque la declaración fue retirada al año siguiente', value: 'Porque la declaración fue retirada al año siguiente' }
    ],
    correctAnswer: 'Porque la remuneración de los directivos sigue vinculada a la cotización bursátil', points: 2, orderIndex: 104, tags: ['capitalismo partes interesadas', 'gobernanza corporativa']
  },

  // --- C2: Resiliencia organizativa pospandemia ---
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'Resiliencia organizativa en la era pospandémica',
    passage: 'La pandemia de COVID-19 sirvió como una prueba de esfuerzo sin precedentes para la resiliencia organizativa, exponiendo vulnerabilidades críticas en las cadenas de suministro, la gestión de personal y la planificación estratégica. Las organizaciones que habían invertido en redes de suministro diversificadas, infraestructura digital y marcos de liderazgo adaptativo superaron la crisis con mayor eficacia que las que dependían de modelos esbeltos, maximizados para la eficiencia con redundancia mínima. Sin embargo, el discurso pospandémico sobre la resiliencia corre el riesgo de confundir la verdadera capacidad adaptativa con la mera supervivencia a la crisis. La verdadera resiliencia organizativa, tal como la definen investigadores como Kathleen Sutcliffe y Karl Weick, abarca no solo la capacidad de absorber y recuperarse de las perturbaciones, sino también la capacidad de anticipar amenazas emergentes y transformarse en respuesta a condiciones fundamentalmente alteradas. Las empresas que simplemente restauraron sus operaciones prepandémicas sin reimaginar su modelo de negocio pueden encontrarse mal preparadas ante las incertidumbres acumuladas de la disrupción climática, la inestabilidad geopolítica y la transformación tecnológica.',
    questionText: 'Según el pasaje, ¿cuál es el riesgo del discurso pospandémico sobre la resiliencia?',
    options: [
      { label: 'Que las empresas inviertan demasiado en infraestructura digital', value: 'Que las empresas inviertan demasiado en infraestructura digital' },
      { label: 'Que se confunda la verdadera capacidad adaptativa con la mera supervivencia a la crisis', value: 'Que se confunda la verdadera capacidad adaptativa con la mera supervivencia a la crisis' },
      { label: 'Que los empleados se resistan a volver a la oficina', value: 'Que los empleados se resistan a volver a la oficina' },
      { label: 'Que las cadenas de suministro se diversifiquen demasiado', value: 'Que las cadenas de suministro se diversifiquen demasiado' }
    ],
    correctAnswer: 'Que se confunda la verdadera capacidad adaptativa con la mera supervivencia a la crisis', points: 2, orderIndex: 105, tags: ['resiliencia organizativa', 'estrategia']
  },

  // --- C2: ROI del desarrollo profesional ---
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'READING', skill: 'READING',
    passageTitle: 'La economía del ROI del desarrollo profesional',
    passage: 'Cuantificar el retorno de la inversión (ROI) de los programas de desarrollo profesional sigue siendo uno de los desafíos más persistentes en la gestión del capital humano. Los enfoques tradicionales, como el modelo de evaluación de cuatro niveles de Kirkpatrick, miden el impacto formativo a través de la satisfacción del participante, la adquisición de conocimientos, el cambio de comportamiento y los resultados empresariales — sin embargo, cada nivel sucesivo presenta dificultades de medición crecientes. El problema de atribución causal es especialmente agudo: aislar el impacto de un programa formativo de variables confusoras como las condiciones del mercado, la calidad de la dirección y la motivación individual requiere diseños experimentales rigurosos que la mayoría de las organizaciones carecen de recursos o voluntad para implementar. La ampliación del modelo de Kirkpatrick por Jack Phillips para incluir un quinto nivel — el ROI financiero — ha ganado tracción, pero los críticos argumentan que reducir resultados formativos complejos a cifras monetarias arriesga infravalorar beneficios intangibles como la mayor capacidad de innovación y el fortalecimiento de las redes profesionales.',
    questionText: '¿Qué es el "problema de atribución causal" descrito en el pasaje?',
    options: [
      { label: 'La dificultad de encontrar formadores cualificados', value: 'La dificultad de encontrar formadores cualificados' },
      { label: 'El desafío de aislar el impacto de un programa formativo de las variables confusoras', value: 'El desafío de aislar el impacto de un programa formativo de las variables confusoras' },
      { label: 'El problema de que los empleados no asistan a las formaciones', value: 'El problema de que los empleados no asistan a las formaciones' },
      { label: 'El alto coste de implementar el modelo de Kirkpatrick', value: 'El alto coste de implementar el modelo de Kirkpatrick' }
    ],
    correctAnswer: 'El desafío de aislar el impacto de un programa formativo de las variables confusoras', points: 2, orderIndex: 106, tags: ['desarrollo profesional', 'ROI', 'estrategia RRHH']
  },
]
