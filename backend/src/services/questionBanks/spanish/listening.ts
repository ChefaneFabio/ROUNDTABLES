import { MultiSkillQuestionData } from '../types'

// Spanish Listening Questions — 7 per CEFR level (42 total)
// Types: LISTENING (multiple choice after audio), DICTATION
// Each question includes ttsScript for TTS generation

export const spanishListeningQuestions: MultiSkillQuestionData[] = [
  // ============================================================
  // A1 — Beginner (7 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Hola. Me llamo Juan. Soy de España. Tengo veinticinco años. Me gusta el fútbol.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿De dónde es Juan?',
    options: [{ label: 'Francia', value: 'Francia' }, { label: 'España', value: 'España' }, { label: 'México', value: 'México' }, { label: 'Italia', value: 'Italia' }],
    correctAnswer: 'España', points: 1, orderIndex: 1, tags: ['presentación'], timeSuggested: 30
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Hola. Me llamo Juan. Soy de España. Tengo veinticinco años. Me gusta el fútbol.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuántos años tiene Juan?',
    options: [{ label: '20', value: '20' }, { label: '25', value: '25' }, { label: '30', value: '30' }, { label: '35', value: '35' }],
    correctAnswer: '25', points: 1, orderIndex: 2, tags: ['presentación', 'números'], timeSuggested: 30
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Perdone, ¿dónde está el banco? Siga recto y luego gire a la izquierda. El banco está al lado del supermercado.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Dónde está el banco?',
    options: [{ label: 'Al lado de la escuela', value: 'al lado de la escuela' }, { label: 'Al lado del supermercado', value: 'al lado del supermercado' }, { label: 'Al lado del parque', value: 'al lado del parque' }, { label: 'Al lado del hospital', value: 'al lado del hospital' }],
    correctAnswer: 'al lado del supermercado', points: 1, orderIndex: 3, tags: ['direcciones'], timeSuggested: 30
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Me gusta comer pizza.',
    ttsLanguageCode: 'es-ES',
    questionText: 'Escribe exactamente lo que oyes.',
    correctAnswer: 'Me gusta comer pizza.', points: 1, orderIndex: 4, tags: ['dictado'], timeSuggested: 30
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Hoy es lunes. Mañana es martes. Tengo clase de español el miércoles.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuándo es la clase de español?',
    options: [{ label: 'Lunes', value: 'Lunes' }, { label: 'Martes', value: 'Martes' }, { label: 'Miércoles', value: 'Miércoles' }, { label: 'Jueves', value: 'Jueves' }],
    correctAnswer: 'Miércoles', points: 1, orderIndex: 5, tags: ['días'], timeSuggested: 30
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: '¿Me pone un café, por favor? Por supuesto. Son dos euros con cincuenta.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuánto cuesta el café?',
    options: [{ label: '1,50 euros', value: '1.50' }, { label: '2,00 euros', value: '2.00' }, { label: '2,50 euros', value: '2.50' }, { label: '3,00 euros', value: '3.00' }],
    correctAnswer: '2.50', points: 1, orderIndex: 6, tags: ['compras', 'números'], timeSuggested: 30
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'El gato está encima de la mesa.',
    ttsLanguageCode: 'es-ES',
    questionText: 'Escribe exactamente lo que oyes.',
    correctAnswer: 'El gato está encima de la mesa.', points: 1, orderIndex: 7, tags: ['dictado'], timeSuggested: 30
  },

  // ============================================================
  // A2 — Elementary (7 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Anoche fui al cine con mi hermana. Vimos una comedia. Fue muy divertida. Después de la película, cenamos en un restaurante italiano.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Qué tipo de película vieron?',
    options: [{ label: 'Acción', value: 'acción' }, { label: 'Comedia', value: 'comedia' }, { label: 'Terror', value: 'terror' }, { label: 'Drama', value: 'drama' }],
    correctAnswer: 'comedia', points: 1, orderIndex: 8, tags: ['entretenimiento'], timeSuggested: 40
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Anoche fui al cine con mi hermana. Vimos una comedia. Fue muy divertida. Después de la película, cenamos en un restaurante italiano.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Con quién fue al cine?',
    options: [{ label: 'Con un amigo', value: 'con un amigo' }, { label: 'Con su hermana', value: 'con su hermana' }, { label: 'Con su madre', value: 'con su madre' }, { label: 'Solo', value: 'solo' }],
    correctAnswer: 'con su hermana', points: 1, orderIndex: 9, tags: ['entretenimiento'], timeSuggested: 40
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'El tren a Valencia sale del andén tres a las nueve y cuarto. Por favor, tengan sus billetes preparados.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿De qué andén sale el tren?',
    options: [{ label: 'Andén 1', value: '1' }, { label: 'Andén 2', value: '2' }, { label: 'Andén 3', value: '3' }, { label: 'Andén 4', value: '4' }],
    correctAnswer: '3', points: 1, orderIndex: 10, tags: ['transporte'], timeSuggested: 40
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Ella va al trabajo en autobús todas las mañanas.',
    ttsLanguageCode: 'es-ES',
    questionText: 'Escribe exactamente lo que oyes.',
    correctAnswer: 'Ella va al trabajo en autobús todas las mañanas.', points: 1, orderIndex: 11, tags: ['dictado'], timeSuggested: 40
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Bienvenidos al museo. Está abierto de nueve de la mañana a cinco de la tarde. Las entradas cuestan ocho euros para adultos y cuatro euros para niños. Hay una cafetería en la segunda planta.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuánto cuesta una entrada para adultos?',
    options: [{ label: '4 euros', value: '4' }, { label: '6 euros', value: '6' }, { label: '8 euros', value: '8' }, { label: '10 euros', value: '10' }],
    correctAnswer: '8', points: 1, orderIndex: 12, tags: ['turismo'], timeSuggested: 40
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Normalmente me despierto a las siete. Primero me ducho y me visto. Luego desayuno — normalmente tostadas y café. Salgo de casa a las ocho y media.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Qué desayuna normalmente?',
    options: [{ label: 'Cereales y leche', value: 'cereales' }, { label: 'Tostadas y café', value: 'tostadas y café' }, { label: 'Huevos y zumo', value: 'huevos' }, { label: 'Nada', value: 'nada' }],
    correctAnswer: 'tostadas y café', points: 1, orderIndex: 13, tags: ['rutina diaria'], timeSuggested: 40
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'El año pasado pasamos unas vacaciones maravillosas en Italia.',
    ttsLanguageCode: 'es-ES',
    questionText: 'Escribe exactamente lo que oyes.',
    correctAnswer: 'El año pasado pasamos unas vacaciones maravillosas en Italia.', points: 1, orderIndex: 14, tags: ['dictado'], timeSuggested: 40
  },

  // ============================================================
  // B1 — Intermediate (7 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Buenos días. Quisiera pedir cita con el doctor García, por favor. Llevo una semana con dolores de cabeza. La primera cita disponible es el jueves que viene a las dos y media. ¿Le viene bien?',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Por qué llama esta persona?',
    options: [
      { label: 'Para cancelar una cita', value: 'cancelar' },
      { label: 'Para pedir cita con el médico', value: 'pedir cita' },
      { label: 'Para preguntar sobre la medicación', value: 'medicación' },
      { label: 'Para quejarse del servicio', value: 'quejarse' }
    ],
    correctAnswer: 'pedir cita', points: 2, orderIndex: 15, tags: ['salud', 'citas'], timeSuggested: 45
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Buenos días. Quisiera pedir cita con el doctor García, por favor. Llevo una semana con dolores de cabeza. La primera cita disponible es el jueves que viene a las dos y media.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuándo es la primera cita disponible?',
    options: [
      { label: 'Lunes a las 2:00', value: 'lunes 2:00' },
      { label: 'Miércoles a las 3:00', value: 'miércoles 3:00' },
      { label: 'Jueves a las 2:30', value: 'jueves 2:30' },
      { label: 'Viernes a las 10:00', value: 'viernes 10:00' }
    ],
    correctAnswer: 'jueves 2:30', points: 2, orderIndex: 16, tags: ['citas'], timeSuggested: 45
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Según una encuesta reciente, el setenta por ciento de los jóvenes de dieciocho a veinticinco años miran el móvil en los primeros diez minutos después de despertarse. Los expertos advierten de que este hábito puede aumentar los niveles de estrés y reducir la productividad durante todo el día.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Qué porcentaje de jóvenes mira el móvil poco después de despertarse?',
    options: [{ label: '50%', value: '50' }, { label: '60%', value: '60' }, { label: '70%', value: '70' }, { label: '80%', value: '80' }],
    correctAnswer: '70', points: 2, orderIndex: 17, tags: ['tecnología', 'salud'], timeSuggested: 45
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'La empresa ha decidido introducir horarios flexibles para todos los empleados a partir del próximo mes.',
    ttsLanguageCode: 'es-ES',
    questionText: 'Escribe exactamente lo que oyes.',
    correctAnswer: 'La empresa ha decidido introducir horarios flexibles para todos los empleados a partir del próximo mes.', points: 2, orderIndex: 18, tags: ['dictado', 'trabajo'], timeSuggested: 60
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Atención, pasajeros. El vuelo de las doce y cuarto a Barcelona se ha retrasado aproximadamente cuarenta y cinco minutos debido al mal tiempo. Disculpen las molestias. Por favor, consulten la pantalla de salidas para obtener información actualizada.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Por qué se ha retrasado el vuelo?',
    options: [
      { label: 'Problemas técnicos', value: 'técnicos' },
      { label: 'Mal tiempo', value: 'mal tiempo' },
      { label: 'Falta de personal', value: 'personal' },
      { label: 'Control de seguridad', value: 'seguridad' }
    ],
    correctAnswer: 'mal tiempo', points: 2, orderIndex: 19, tags: ['viajes'], timeSuggested: 45
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'El nuevo centro comunitario abrirá en marzo. Tendrá una piscina, un gimnasio y varias salas de reuniones. La cuota de socio cuesta treinta euros al mes para adultos. Hay descuentos para estudiantes y jubilados.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Quiénes pueden obtener descuentos?',
    options: [
      { label: 'Niños y profesores', value: 'niños y profesores' },
      { label: 'Estudiantes y jubilados', value: 'estudiantes y jubilados' },
      { label: 'Familias y parejas', value: 'familias' },
      { label: 'Todos', value: 'todos' }
    ],
    correctAnswer: 'estudiantes y jubilados', points: 2, orderIndex: 20, tags: ['comunidad'], timeSuggested: 45
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Aunque el tiempo fue horrible, aún así conseguimos disfrutar de nuestro día en la playa.',
    ttsLanguageCode: 'es-ES',
    questionText: 'Escribe exactamente lo que oyes.',
    correctAnswer: 'Aunque el tiempo fue horrible, aún así conseguimos disfrutar de nuestro día en la playa.', points: 2, orderIndex: 21, tags: ['dictado'], timeSuggested: 60
  },

  // ============================================================
  // B2 — Upper Intermediate (7 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'El equipo de investigación de la Universidad de Salamanca ha publicado hallazgos que sugieren que la meditación regular puede alterar físicamente la estructura del cerebro. Los participantes que meditaron treinta minutos al día durante ocho semanas mostraron un aumento de la densidad de materia gris en áreas asociadas con la memoria y la regulación emocional, mientras que las áreas vinculadas al estrés mostraron una disminución de la densidad.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Qué ocurrió en las áreas del cerebro relacionadas con el estrés?',
    options: [
      { label: 'Aumentaron de tamaño', value: 'aumentaron' },
      { label: 'Mostraron una disminución de la densidad', value: 'disminución de la densidad' },
      { label: 'No se vieron afectadas', value: 'no afectadas' },
      { label: 'Mejoraron en función', value: 'mejoraron' }
    ],
    correctAnswer: 'disminución de la densidad', points: 2, orderIndex: 22, tags: ['ciencia', 'salud'], timeSuggested: 60
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'El equipo de investigación de la Universidad de Salamanca ha publicado hallazgos que sugieren que la meditación regular puede alterar físicamente la estructura del cerebro. Los participantes que meditaron treinta minutos al día durante ocho semanas mostraron un aumento de la densidad de materia gris en áreas asociadas con la memoria y la regulación emocional.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuánto tiempo meditaron los participantes cada día?',
    options: [{ label: '10 minutos', value: '10' }, { label: '20 minutos', value: '20' }, { label: '30 minutos', value: '30' }, { label: '60 minutos', value: '60' }],
    correctAnswer: '30', points: 2, orderIndex: 23, tags: ['ciencia'], timeSuggested: 60
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Mucha gente asume que la multitarea los hace más productivos, pero la investigación en neurociencia cuenta una historia diferente. Cuando cambiamos de una tarea a otra, nuestro cerebro necesita tiempo para reorientarse, lo que en realidad reduce la eficiencia. Los estudios sugieren que lo que llamamos multitarea es en realidad un cambio rápido de tareas, y puede reducir la productividad hasta en un cuarenta por ciento.',
    ttsLanguageCode: 'es-ES',
    questionText: 'Según el texto, la multitarea puede reducir la productividad hasta en:',
    options: [{ label: '10%', value: '10' }, { label: '20%', value: '20' }, { label: '30%', value: '30' }, { label: '40%', value: '40' }],
    correctAnswer: '40', points: 2, orderIndex: 24, tags: ['productividad'], timeSuggested: 60
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'A pesar de la crisis económica, la empresa consiguió aumentar sus beneficios diversificando su gama de productos y expandiéndose a nuevos mercados.',
    ttsLanguageCode: 'es-ES',
    questionText: 'Escribe exactamente lo que oyes.',
    correctAnswer: 'A pesar de la crisis económica, la empresa consiguió aumentar sus beneficios diversificando su gama de productos y expandiéndose a nuevos mercados.', points: 2, orderIndex: 25, tags: ['dictado', 'negocios'], timeSuggested: 90
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'El ayuntamiento ha anunciado planes para convertir la fábrica abandonada de la avenida del Río en un desarrollo de uso mixto. El proyecto incluirá viviendas asequibles, locales comerciales y un parque público. Se espera que la construcción comience en primavera y se complete en dos años. Los vecinos han expresado sentimientos encontrados — algunos dan la bienvenida al proyecto, mientras que otros están preocupados por el aumento del tráfico y el ruido.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Qué preocupa a algunos vecinos?',
    options: [
      { label: 'Impuestos más altos', value: 'impuestos' },
      { label: 'Aumento del tráfico y el ruido', value: 'tráfico y ruido' },
      { label: 'Pérdida de zonas verdes', value: 'zonas verdes' },
      { label: 'Tasas de criminalidad', value: 'criminalidad' }
    ],
    correctAnswer: 'tráfico y ruido', points: 2, orderIndex: 26, tags: ['comunidad', 'urbano'], timeSuggested: 60
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'El concepto de renta básica universal ha ganado impulso en los últimos años, especialmente tras la disrupción económica causada por la automatización. Los defensores argumentan que proporcionar a cada ciudadano un ingreso mínimo garantizado reduciría la pobreza y daría a las personas la libertad de dedicarse a la educación o al emprendimiento. Los escépticos se preocupan por el coste y los posibles efectos sobre los incentivos para trabajar.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Qué preocupa a los escépticos sobre la renta básica universal?',
    options: [
      { label: 'Sería demasiado complicada de administrar', value: 'complicada' },
      { label: 'El coste y los posibles efectos sobre los incentivos para trabajar', value: 'coste e incentivos laborales' },
      { label: 'Aumentaría la desigualdad', value: 'desigualdad' },
      { label: 'Reduciría los niveles educativos', value: 'educación' }
    ],
    correctAnswer: 'coste e incentivos laborales', points: 2, orderIndex: 27, tags: ['economía', 'política'], timeSuggested: 60
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'El gobierno se ha comprometido a invertir fuertemente en infraestructura de energía renovable durante la próxima década.',
    ttsLanguageCode: 'es-ES',
    questionText: 'Escribe exactamente lo que oyes.',
    correctAnswer: 'El gobierno se ha comprometido a invertir fuertemente en infraestructura de energía renovable durante la próxima década.', points: 2, orderIndex: 28, tags: ['dictado', 'política'], timeSuggested: 90
  },

  // ============================================================
  // C1 — Advanced (7 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'El fenómeno de la disonancia cognitiva, descrito por primera vez por Leon Festinger en mil novecientos cincuenta y siete, ocurre cuando los individuos mantienen simultáneamente dos creencias contradictorias. En lugar de tolerar la incomodidad, las personas tienden a modificar una de las creencias o a racionalizar la inconsistencia. Esto tiene implicaciones significativas para comprender la polarización política, ya que los individuos pueden rechazar pruebas creíbles que contradigan su visión del mundo existente.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cómo suelen responder las personas a la disonancia cognitiva?',
    options: [
      { label: 'Aceptan ambas creencias contradictorias', value: 'aceptan ambas' },
      { label: 'Modifican una creencia o racionalizan la inconsistencia', value: 'modifican o racionalizan' },
      { label: 'Buscan ayuda profesional', value: 'buscan ayuda' },
      { label: 'Ignoran ambas creencias', value: 'ignoran ambas' }
    ],
    correctAnswer: 'modifican o racionalizan', points: 3, orderIndex: 29, tags: ['psicología'], timeSuggested: 75
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Los estudios longitudinales que siguen a niños desde la primera infancia hasta la edad adulta han demostrado sistemáticamente que el nivel socioeconómico al nacer es uno de los predictores más fuertes del logro educativo y los ingresos a lo largo de la vida. Sin embargo, intervenciones como la educación infantil de alta calidad y los programas de mentoría han demostrado ser prometedoras para mitigar estas disparidades, especialmente cuando se implementan antes de los cinco años.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿A qué edad son más eficaces las intervenciones según la investigación?',
    options: [
      { label: 'Antes de los 5 años', value: 'antes de los 5' },
      { label: 'Entre los 5 y los 10', value: '5 a 10' },
      { label: 'Durante la adolescencia', value: 'adolescencia' },
      { label: 'En la edad adulta temprana', value: 'edad adulta temprana' }
    ],
    correctAnswer: 'antes de los 5', points: 3, orderIndex: 30, tags: ['educación', 'sociología'], timeSuggested: 75
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'La crisis de replicación en psicología se refiere al descubrimiento de que muchos hallazgos publicados en este campo no pueden ser replicados por investigadores independientes. Un estudio emblemático de dos mil quince intentó reproducir cien experimentos de psicología y descubrió que solo el treinta y nueve por ciento obtuvo los mismos resultados. Esto ha generado demandas de mayor rigor metodológico, prerregistro de estudios y datos abiertos.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Qué porcentaje de experimentos de psicología se replicó con éxito?',
    options: [{ label: '25%', value: '25' }, { label: '39%', value: '39' }, { label: '50%', value: '50' }, { label: '65%', value: '65' }],
    correctAnswer: '39', points: 3, orderIndex: 31, tags: ['ciencia', 'investigación'], timeSuggested: 75
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'El ritmo sin precedentes del cambio tecnológico ha alterado fundamentalmente la naturaleza del trabajo, exigiendo una adaptación continua y un aprendizaje permanente.',
    ttsLanguageCode: 'es-ES',
    questionText: 'Escribe exactamente lo que oyes.',
    correctAnswer: 'El ritmo sin precedentes del cambio tecnológico ha alterado fundamentalmente la naturaleza del trabajo, exigiendo una adaptación continua y un aprendizaje permanente.', points: 3, orderIndex: 32, tags: ['dictado'], timeSuggested: 90
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'El concepto de neuroplasticidad — la capacidad del cerebro para reorganizarse formando nuevas conexiones neuronales — ha revolucionado nuestra comprensión de la rehabilitación cognitiva. Los pacientes que han sufrido accidentes cerebrovasculares, por ejemplo, pueden a veces recuperar funciones perdidas porque las partes sanas del cerebro compensan las áreas dañadas. Este proceso, sin embargo, requiere una intervención terapéutica intensiva y sostenida.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Qué es la neuroplasticidad?',
    options: [
      { label: 'La capacidad de aprender varios idiomas', value: 'idiomas' },
      { label: 'La capacidad del cerebro para formar nuevas conexiones neuronales', value: 'nuevas conexiones neuronales' },
      { label: 'Un tipo de cirugía cerebral', value: 'cirugía' },
      { label: 'La mejora de la memoria mediante medicación', value: 'medicación' }
    ],
    correctAnswer: 'nuevas conexiones neuronales', points: 3, orderIndex: 33, tags: ['ciencia'], timeSuggested: 75
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'El concepto de economía circular representa un cambio de paradigma respecto al modelo lineal tradicional de producción y consumo. En lugar de seguir un patrón de extraer-fabricar-desechar, la economía circular pretende mantener los recursos en uso el mayor tiempo posible, extraer su máximo valor y luego recuperar y regenerar los productos y materiales al final de su vida útil.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cómo se describe el modelo económico tradicional?',
    options: [
      { label: 'Circular', value: 'circular' },
      { label: 'Extraer-fabricar-desechar', value: 'extraer-fabricar-desechar' },
      { label: 'Sostenible', value: 'sostenible' },
      { label: 'Regenerativo', value: 'regenerativo' }
    ],
    correctAnswer: 'extraer-fabricar-desechar', points: 3, orderIndex: 34, tags: ['economía', 'medioambiente'], timeSuggested: 75
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'No obstante los considerables avances en energía renovable, la transición desde los combustibles fósiles sigue plagada de desafíos económicos y políticos.',
    ttsLanguageCode: 'es-ES',
    questionText: 'Escribe exactamente lo que oyes.',
    correctAnswer: 'No obstante los considerables avances en energía renovable, la transición desde los combustibles fósiles sigue plagada de desafíos económicos y políticos.', points: 3, orderIndex: 35, tags: ['dictado'], timeSuggested: 90
  },

  // ============================================================
  // C2 — Proficiency (7 questions)
  // ============================================================
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Las implicaciones filosóficas del entrelazamiento cuántico son quizás más profundas que sus propiedades físicas. Cuando dos partículas se entrelazan, medir el estado de una determina instantáneamente el estado de la otra, independientemente de la distancia que las separe. Einstein ridiculizó este fenómeno llamándolo "acción fantasmagórica a distancia", pero experimentos posteriores han confirmado definitivamente su existencia, desafiando nuestras suposiciones más fundamentales sobre la localidad y la causalidad.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cómo llamó Einstein al entrelazamiento cuántico?',
    options: [
      { label: 'Una teoría hermosa', value: 'teoría hermosa' },
      { label: 'Acción fantasmagórica a distancia', value: 'acción fantasmagórica a distancia' },
      { label: 'El principio de incertidumbre', value: 'principio de incertidumbre' },
      { label: 'Una curiosidad matemática', value: 'curiosidad matemática' }
    ],
    correctAnswer: 'acción fantasmagórica a distancia', points: 3, orderIndex: 36, tags: ['física'], timeSuggested: 90
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Las implicaciones filosóficas del entrelazamiento cuántico son quizás más profundas que sus propiedades físicas. Cuando dos partículas se entrelazan, medir el estado de una determina instantáneamente el estado de la otra. Experimentos posteriores han confirmado definitivamente su existencia, desafiando nuestras suposiciones más fundamentales sobre la localidad y la causalidad.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Qué suposiciones fundamentales desafía el entrelazamiento cuántico?',
    options: [
      { label: 'Gravedad y magnetismo', value: 'gravedad y magnetismo' },
      { label: 'Localidad y causalidad', value: 'localidad y causalidad' },
      { label: 'Tiempo y espacio', value: 'tiempo y espacio' },
      { label: 'Energía y materia', value: 'energía y materia' }
    ],
    correctAnswer: 'localidad y causalidad', points: 3, orderIndex: 37, tags: ['física'], timeSuggested: 90
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'La mercantilización de los datos personales ha engendrado una nueva forma de capitalismo de vigilancia, en la que la extracción y monetización de datos conductuales constituye el modelo de ingresos principal de muchas empresas tecnológicas. Shoshana Zuboff sostiene que esto representa una asimetría sin precedentes de conocimiento y poder, fundamentalmente incompatible con las normas democráticas.',
    ttsLanguageCode: 'es-ES',
    questionText: 'Según Zuboff, ¿qué crea el capitalismo de vigilancia?',
    options: [
      { label: 'Igualdad de acceso a la información', value: 'igualdad de acceso' },
      { label: 'Una asimetría sin precedentes de conocimiento y poder', value: 'asimetría de conocimiento y poder' },
      { label: 'Mejores productos de consumo', value: 'mejores productos' },
      { label: 'Mercados más eficientes', value: 'mercados eficientes' }
    ],
    correctAnswer: 'asimetría de conocimiento y poder', points: 3, orderIndex: 38, tags: ['tecnología', 'filosofía'], timeSuggested: 90
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Las ramificaciones epistemológicas de la inteligencia artificial se extienden mucho más allá de sus aplicaciones prácticas inmediatas, planteando cuestiones fundamentales sobre la naturaleza del conocimiento en sí.',
    ttsLanguageCode: 'es-ES',
    questionText: 'Escribe exactamente lo que oyes.',
    correctAnswer: 'Las ramificaciones epistemológicas de la inteligencia artificial se extienden mucho más allá de sus aplicaciones prácticas inmediatas, planteando cuestiones fundamentales sobre la naturaleza del conocimiento en sí.', points: 3, orderIndex: 39, tags: ['dictado'], timeSuggested: 120
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'La llamada "crisis de replicación" no se ha limitado a la psicología. La medicina, la economía e incluso algunas áreas de la física han sido objeto de escrutinio similar. Las causas subyacentes son multifacéticas: el sesgo de publicación que favorece resultados novedosos y estadísticamente significativos, tamaños de muestra insuficientes, grados de libertad del investigador en el análisis de datos y estructuras de incentivos perversas dentro de la academia que priorizan la cantidad de publicaciones sobre la calidad.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Qué favorece el "sesgo de publicación" según el texto?',
    options: [
      { label: 'Resultados replicados', value: 'replicados' },
      { label: 'Resultados novedosos y estadísticamente significativos', value: 'novedosos y significativos' },
      { label: 'Estudios a gran escala', value: 'gran escala' },
      { label: 'Hallazgos negativos', value: 'negativos' }
    ],
    correctAnswer: 'novedosos y significativos', points: 3, orderIndex: 40, tags: ['ciencia', 'metodología'], timeSuggested: 90
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'El concepto de humildad epistémica, enraizado en la filosofía socrática, sugiere que reconocer los límites del propio conocimiento es paradójicamente un requisito previo para la comprensión genuina. En una era de sobrecarga informativa y afirmaciones contundentes en las redes sociales, cultivar dicha humildad puede ser más importante que nunca tanto para la cognición individual como para la deliberación colectiva.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿En qué se fundamenta la humildad epistémica?',
    options: [
      { label: 'La psicología moderna', value: 'psicología moderna' },
      { label: 'La filosofía socrática', value: 'la filosofía socrática' },
      { label: 'La meditación oriental', value: 'meditación oriental' },
      { label: 'El método científico', value: 'método científico' }
    ],
    correctAnswer: 'la filosofía socrática', points: 3, orderIndex: 41, tags: ['filosofía'], timeSuggested: 90
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Pese a la ostensible democratización de la información a través de las tecnologías digitales, el acceso al conocimiento fiable y de alta calidad sigue profundamente estratificado en función de las líneas socioeconómicas.',
    ttsLanguageCode: 'es-ES',
    questionText: 'Escribe exactamente lo que oyes.',
    correctAnswer: 'Pese a la ostensible democratización de la información a través de las tecnologías digitales, el acceso al conocimiento fiable y de alta calidad sigue profundamente estratificado en función de las líneas socioeconómicas.', points: 3, orderIndex: 42, tags: ['dictado'], timeSuggested: 120
  }
]
