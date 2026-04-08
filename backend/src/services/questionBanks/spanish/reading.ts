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
]
