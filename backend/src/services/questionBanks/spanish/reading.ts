import { MultiSkillQuestionData } from '../types'

// Spanish Reading Questions — 7 per CEFR level (42 total)
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
  }
]
