import { MultiSkillQuestionData } from '../types'

// Spanish Listening Questions — ~72 total (42 original + 30 new)
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
    ttsScript: 'El informe está encima de la mesa.',
    ttsLanguageCode: 'es-ES',
    questionText: 'Escribe exactamente lo que oyes.',
    correctAnswer: 'El informe está encima de la mesa.', points: 1, orderIndex: 7, tags: ['dictado'], timeSuggested: 30
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
  },

  // ============================================================
  // NEW QUESTIONS — 30 additional (orderIndex 43–72)
  // 70% MULTIPLE_CHOICE (LISTENING) + 30% DICTATION
  // ============================================================

  // ── A1 — 5 questions (43–47) ────────────────────────────────
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Buenos días. Quiero una habitación para dos personas, por favor. Para tres noches. ¿Cuánto cuesta?',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuántas noches quiere quedarse?',
    options: [{ label: '1', value: '1' }, { label: '2', value: '2' }, { label: '3', value: '3' }, { label: '4', value: '4' }],
    correctAnswer: '3', points: 1, orderIndex: 43, tags: ['hotel', 'números'], timeSuggested: 30
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Me llamo Ana. Soy profesora. Trabajo en una escuela. Tengo treinta y dos años. Vivo en Sevilla.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuál es la profesión de Ana?',
    options: [{ label: 'Médica', value: 'médica' }, { label: 'Profesora', value: 'profesora' }, { label: 'Abogada', value: 'abogada' }, { label: 'Enfermera', value: 'enfermera' }],
    correctAnswer: 'profesora', points: 1, orderIndex: 44, tags: ['presentación', 'profesiones'], timeSuggested: 30
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'En mi habitación hay una cama, un armario y una mesa. También hay una ventana grande. Me gusta mucho.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Qué hay en la habitación además de la cama y el armario?',
    options: [{ label: 'Una silla', value: 'una silla' }, { label: 'Una mesa', value: 'una mesa' }, { label: 'Un sofá', value: 'un sofá' }, { label: 'Una estantería', value: 'una estantería' }],
    correctAnswer: 'una mesa', points: 1, orderIndex: 45, tags: ['casa', 'objetos'], timeSuggested: 30
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Hoy es martes y hace sol.',
    ttsLanguageCode: 'es-ES',
    questionText: 'Escribe exactamente lo que oyes.',
    correctAnswer: 'Hoy es martes y hace sol.', points: 1, orderIndex: 46, tags: ['dictado', 'días', 'tiempo'], timeSuggested: 30
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Mi madre cocina muy bien. Su plato favorito es la paella. Los domingos cocinamos juntos.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuándo cocinan juntos?',
    options: [{ label: 'Los lunes', value: 'los lunes' }, { label: 'Los sábados', value: 'los sábados' }, { label: 'Los domingos', value: 'los domingos' }, { label: 'Todos los días', value: 'todos los días' }],
    correctAnswer: 'los domingos', points: 1, orderIndex: 47, tags: ['familia', 'comida'], timeSuggested: 30
  },

  // ── A2 — 5 questions (48–52) ────────────────────────────────
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'El fin de semana pasado fui de excursión a la montaña con mis amigos. Salimos temprano por la mañana y caminamos durante cuatro horas. El paisaje era precioso. Comimos un bocadillo junto a un río.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuántas horas caminaron?',
    options: [{ label: '2 horas', value: '2' }, { label: '3 horas', value: '3' }, { label: '4 horas', value: '4' }, { label: '5 horas', value: '5' }],
    correctAnswer: '4', points: 1, orderIndex: 48, tags: ['ocio', 'naturaleza'], timeSuggested: 40
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Quisiera comprar un billete de ida y vuelta a Granada, por favor. El tren sale a las diez y cuarenta y cinco. ¿Prefiere ventanilla o pasillo? Ventanilla, por favor.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Qué tipo de asiento prefiere?',
    options: [{ label: 'Pasillo', value: 'pasillo' }, { label: 'Ventanilla', value: 'ventanilla' }, { label: 'Primera clase', value: 'primera clase' }, { label: 'No importa', value: 'no importa' }],
    correctAnswer: 'ventanilla', points: 1, orderIndex: 49, tags: ['transporte', 'tren'], timeSuggested: 40
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Tengo un perro que se llama Toby. Es grande y marrón. Le gusta correr en el parque y jugar con la pelota. Siempre paseo con él por las tardes.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuándo pasea con su perro?',
    options: [{ label: 'Por las mañanas', value: 'por las mañanas' }, { label: 'Por las tardes', value: 'por las tardes' }, { label: 'Por las noches', value: 'por las noches' }, { label: 'Al mediodía', value: 'al mediodía' }],
    correctAnswer: 'por las tardes', points: 1, orderIndex: 50, tags: ['mascotas', 'rutina'], timeSuggested: 40
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Mi hermano estudia medicina en la universidad de Barcelona.',
    ttsLanguageCode: 'es-ES',
    questionText: 'Escribe exactamente lo que oyes.',
    correctAnswer: 'Mi hermano estudia medicina en la universidad de Barcelona.', points: 1, orderIndex: 51, tags: ['dictado', 'familia', 'estudios'], timeSuggested: 40
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'El doctor dice que debo descansar más y beber mucha agua. También me ha recetado unas pastillas que tengo que tomar dos veces al día durante una semana.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuántas veces al día tiene que tomar las pastillas?',
    options: [{ label: 'Una vez', value: '1' }, { label: 'Dos veces', value: '2' }, { label: 'Tres veces', value: '3' }, { label: 'Cuatro veces', value: '4' }],
    correctAnswer: '2', points: 1, orderIndex: 52, tags: ['salud', 'médico'], timeSuggested: 40
  },

  // ── B1 — 5 questions (53–57) ────────────────────────────────
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'El ayuntamiento ha decidido prohibir los coches en el centro histórico los fines de semana. La medida busca reducir la contaminación y fomentar el uso de la bicicleta y el transporte público. Los comerciantes del centro han mostrado su desacuerdo, ya que temen perder clientes.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Por qué están en desacuerdo los comerciantes?',
    options: [
      { label: 'Porque no les gustan las bicicletas', value: 'no les gustan las bicicletas' },
      { label: 'Porque temen perder clientes', value: 'porque temen perder clientes' },
      { label: 'Porque prefieren más coches', value: 'prefieren más coches' },
      { label: 'Porque no hay transporte público', value: 'no hay transporte público' }
    ],
    correctAnswer: 'porque temen perder clientes', points: 1, orderIndex: 53, tags: ['ciudad', 'medioambiente'], timeSuggested: 45
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'En la entrevista de trabajo me preguntaron sobre mi experiencia anterior, mis puntos fuertes y mis expectativas salariales. Creo que me fue bien, pero no estoy seguro. Me dijeron que me llamarían en dos semanas para comunicarme la decisión.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuándo le comunicarán la decisión?',
    options: [
      { label: 'En una semana', value: 'en una semana' },
      { label: 'En dos semanas', value: 'en dos semanas' },
      { label: 'Al día siguiente', value: 'al día siguiente' },
      { label: 'En un mes', value: 'en un mes' }
    ],
    correctAnswer: 'en dos semanas', points: 1, orderIndex: 54, tags: ['trabajo', 'entrevista'], timeSuggested: 45
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'La exposición de Frida Kahlo estará abierta en el Museo Reina Sofía desde el quince de marzo hasta el treinta de junio. Las entradas cuestan doce euros y se pueden comprar en línea. Los menores de dieciocho años entran gratis.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Quiénes entran gratis a la exposición?',
    options: [
      { label: 'Los estudiantes universitarios', value: 'universitarios' },
      { label: 'Los menores de dieciocho años', value: 'los menores de dieciocho años' },
      { label: 'Los jubilados', value: 'jubilados' },
      { label: 'Nadie', value: 'nadie' }
    ],
    correctAnswer: 'los menores de dieciocho años', points: 1, orderIndex: 55, tags: ['cultura', 'museo'], timeSuggested: 45
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Los expertos recomiendan desconectar del trabajo al menos una hora antes de acostarse para dormir mejor.',
    ttsLanguageCode: 'es-ES',
    questionText: 'Escribe exactamente lo que oyes.',
    correctAnswer: 'Los expertos recomiendan desconectar del trabajo al menos una hora antes de acostarse para dormir mejor.', points: 1, orderIndex: 56, tags: ['dictado', 'salud'], timeSuggested: 60
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'He cambiado de opinión sobre el teletrabajo. Al principio pensaba que era más cómodo, pero ahora echo de menos la oficina. Me siento más motivado cuando trabajo con mis compañeros y separar el espacio de trabajo del hogar me ayuda a concentrarme.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Por qué prefiere ahora la oficina?',
    options: [
      { label: 'Porque gana más dinero', value: 'gana más dinero' },
      { label: 'Porque se siente más motivado con sus compañeros', value: 'porque se siente más motivado con sus compañeros' },
      { label: 'Porque su jefe se lo exige', value: 'se lo exige el jefe' },
      { label: 'Porque no tiene internet en casa', value: 'no tiene internet' }
    ],
    correctAnswer: 'porque se siente más motivado con sus compañeros', points: 1, orderIndex: 57, tags: ['trabajo', 'opinión'], timeSuggested: 45
  },

  // ── B2 — 5 questions (58–62) ────────────────────────────────
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'La inteligencia artificial generativa plantea dilemas éticos complejos en el ámbito educativo. Por un lado, herramientas como los chatbots pueden personalizar el aprendizaje y ofrecer retroalimentación inmediata. Por otro, existe el riesgo de que los estudiantes deleguen el pensamiento crítico en la máquina, lo que podría mermar su capacidad analítica a largo plazo.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuál es el riesgo que se menciona sobre la IA en la educación?',
    options: [
      { label: 'Que los profesores pierdan su empleo', value: 'profesores sin empleo' },
      { label: 'Que los estudiantes deleguen el pensamiento crítico en la máquina', value: 'que los estudiantes deleguen el pensamiento crítico en la máquina' },
      { label: 'Que la tecnología sea demasiado cara', value: 'demasiado cara' },
      { label: 'Que los exámenes desaparezcan', value: 'exámenes desaparezcan' }
    ],
    correctAnswer: 'que los estudiantes deleguen el pensamiento crítico en la máquina', points: 2, orderIndex: 58, tags: ['educación', 'tecnología'], timeSuggested: 60
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'El fenómeno de la "gran renuncia" que se observó en Estados Unidos tras la pandemia ha empezado a manifestarse también en Europa. Muchos profesionales, especialmente en el sector tecnológico y sanitario, están reconsiderando sus prioridades laborales, valorando más el equilibrio entre la vida personal y profesional que el salario. Las empresas se ven obligadas a ofrecer mayor flexibilidad y mejores condiciones para retener el talento.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Qué valoran más los profesionales según el texto?',
    options: [
      { label: 'Un salario más alto', value: 'salario más alto' },
      { label: 'El equilibrio entre la vida personal y profesional', value: 'el equilibrio entre la vida personal y profesional' },
      { label: 'Más vacaciones', value: 'más vacaciones' },
      { label: 'Trabajar menos horas', value: 'menos horas' }
    ],
    correctAnswer: 'el equilibrio entre la vida personal y profesional', points: 2, orderIndex: 59, tags: ['trabajo', 'tendencias'], timeSuggested: 60
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'La reforma educativa propuesta incluye la reducción del número de alumnos por aula a un máximo de veinte, la incorporación de la educación emocional como asignatura obligatoria y la evaluación continua en sustitución de los exámenes finales. Los sindicatos de profesores la apoyan, aunque exigen una mayor inversión en recursos humanos.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuántos alumnos habrá como máximo por aula según la reforma?',
    options: [{ label: '15', value: '15' }, { label: '20', value: '20' }, { label: '25', value: '25' }, { label: '30', value: '30' }],
    correctAnswer: '20', points: 2, orderIndex: 60, tags: ['educación', 'política'], timeSuggested: 60
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'Los avances en biotecnología han abierto un debate sobre los límites éticos de la manipulación genética en seres humanos.',
    ttsLanguageCode: 'es-ES',
    questionText: 'Escribe exactamente lo que oyes.',
    correctAnswer: 'Los avances en biotecnología han abierto un debate sobre los límites éticos de la manipulación genética en seres humanos.', points: 2, orderIndex: 61, tags: ['dictado', 'ciencia'], timeSuggested: 90
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'La brecha digital de género sigue siendo un problema significativo. A pesar de los avances, las mujeres representan solo el veintiséis por ciento de los profesionales del sector tecnológico en Europa. Las causas son múltiples: estereotipos de género desde la infancia, falta de referentes femeninos y ambientes laborales que no favorecen la conciliación.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Qué porcentaje de profesionales tecnológicos en Europa son mujeres?',
    options: [{ label: '16%', value: '16' }, { label: '26%', value: '26' }, { label: '36%', value: '36' }, { label: '46%', value: '46' }],
    correctAnswer: '26', points: 2, orderIndex: 62, tags: ['igualdad', 'tecnología'], timeSuggested: 60
  },

  // ── C1 — 5 questions (63–67) ────────────────────────────────
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'La noción de justicia restaurativa supone un cambio de paradigma respecto al sistema penal retributivo tradicional. Mientras que el modelo retributivo se centra en castigar al infractor, la justicia restaurativa prioriza la reparación del daño causado a la víctima y la comunidad. Los programas de mediación entre víctima y agresor han demostrado tasas de reincidencia significativamente menores, aunque los críticos cuestionan su aplicabilidad en casos de delitos graves.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿En qué se diferencia la justicia restaurativa de la retributiva?',
    options: [
      { label: 'La restaurativa impone castigos más severos', value: 'castigos más severos' },
      { label: 'La restaurativa prioriza la reparación del daño sobre el castigo', value: 'la restaurativa prioriza la reparación del daño sobre el castigo' },
      { label: 'Son esencialmente iguales', value: 'son iguales' },
      { label: 'La restaurativa solo se aplica a menores', value: 'solo menores' }
    ],
    correctAnswer: 'la restaurativa prioriza la reparación del daño sobre el castigo', points: 2, orderIndex: 63, tags: ['derecho', 'sociología'], timeSuggested: 75
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'El concepto de "capital social", desarrollado por Pierre Bourdieu, se refiere al conjunto de recursos reales o potenciales vinculados a la posesión de una red duradera de relaciones. A diferencia del capital económico, el capital social no puede transferirse directamente, sino que se acumula mediante la inversión continuada en relaciones sociales. Investigaciones recientes han demostrado que el capital social es un predictor más fiable del bienestar subjetivo que los ingresos económicos.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Qué predice mejor el bienestar subjetivo según las investigaciones?',
    options: [
      { label: 'El capital económico', value: 'capital económico' },
      { label: 'El capital social', value: 'el capital social' },
      { label: 'El nivel educativo', value: 'nivel educativo' },
      { label: 'La salud física', value: 'salud física' }
    ],
    correctAnswer: 'el capital social', points: 2, orderIndex: 64, tags: ['sociología', 'bienestar'], timeSuggested: 75
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'La arquitectura bioclimática integra el diseño constructivo con las condiciones climáticas del entorno para optimizar el confort térmico sin recurrir excesivamente a sistemas de climatización artificial. Estrategias como la orientación solar adecuada, la ventilación cruzada natural y el uso de materiales con alta inercia térmica permiten reducir el consumo energético hasta en un sesenta por ciento respecto a los edificios convencionales.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuánto puede reducirse el consumo energético con la arquitectura bioclimática?',
    options: [{ label: '30%', value: '30' }, { label: '40%', value: '40' }, { label: '50%', value: '50' }, { label: '60%', value: '60' }],
    correctAnswer: '60', points: 2, orderIndex: 65, tags: ['arquitectura', 'medioambiente'], timeSuggested: 75
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'La interrelación entre factores genéticos y ambientales en el desarrollo cognitivo sigue siendo objeto de un intenso debate en la comunidad científica.',
    ttsLanguageCode: 'es-ES',
    questionText: 'Escribe exactamente lo que oyes.',
    correctAnswer: 'La interrelación entre factores genéticos y ambientales en el desarrollo cognitivo sigue siendo objeto de un intenso debate en la comunidad científica.', points: 2, orderIndex: 66, tags: ['dictado', 'ciencia'], timeSuggested: 90
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'El principio de precaución establece que, ante la incertidumbre científica sobre los posibles efectos nocivos de una actividad o producto, las autoridades deben adoptar medidas preventivas sin esperar a que el daño se materialice. Este principio, consagrado en el derecho ambiental europeo, ha sido invocado en debates sobre organismos modificados genéticamente, pesticidas y campos electromagnéticos.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿En qué ámbito del derecho europeo está consagrado el principio de precaución?',
    options: [
      { label: 'Derecho penal', value: 'derecho penal' },
      { label: 'Derecho ambiental', value: 'derecho ambiental' },
      { label: 'Derecho mercantil', value: 'derecho mercantil' },
      { label: 'Derecho laboral', value: 'derecho laboral' }
    ],
    correctAnswer: 'derecho ambiental', points: 2, orderIndex: 67, tags: ['derecho', 'medioambiente'], timeSuggested: 75
  },

  // ── C2 — 5 questions (68–72) ────────────────────────────────
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'La hermenéutica gadameriana sostiene que la comprensión de un texto no es un acto de reproducción del sentido original del autor, sino un acontecimiento productivo en el que el horizonte del intérprete se fusiona con el del texto. Esta "fusión de horizontes" implica que toda interpretación está históricamente condicionada y que la pretensión de una lectura objetiva y definitiva es, en última instancia, ilusoria.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Qué es la "fusión de horizontes" según Gadamer?',
    options: [
      { label: 'La reproducción exacta del sentido original del autor', value: 'reproducción exacta' },
      { label: 'La unión del horizonte del intérprete con el del texto', value: 'la unión del horizonte del intérprete con el del texto' },
      { label: 'Un método de traducción literal', value: 'traducción literal' },
      { label: 'La eliminación de la subjetividad del lector', value: 'eliminación de subjetividad' }
    ],
    correctAnswer: 'la unión del horizonte del intérprete con el del texto', points: 2, orderIndex: 68, tags: ['filosofía', 'hermenéutica'], timeSuggested: 90
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'La teoría de la performatividad de Judith Butler cuestiona la noción de que el género es una expresión de una identidad preexistente. Según Butler, el género no es algo que se es, sino algo que se hace: se constituye mediante la repetición estilizada de actos corporales, gestos y enunciados performativos. Esta concepción desestabiliza la distinción convencional entre sexo biológico y género social, sugiriendo que ambas categorías son construcciones discursivas.',
    ttsLanguageCode: 'es-ES',
    questionText: 'Según Butler, ¿cómo se constituye el género?',
    options: [
      { label: 'Es determinado biológicamente al nacer', value: 'determinado biológicamente' },
      { label: 'Mediante la repetición estilizada de actos performativos', value: 'mediante la repetición estilizada de actos performativos' },
      { label: 'Por elección consciente en la adolescencia', value: 'elección consciente' },
      { label: 'A través de la educación formal', value: 'educación formal' }
    ],
    correctAnswer: 'mediante la repetición estilizada de actos performativos', points: 2, orderIndex: 69, tags: ['filosofía', 'género'], timeSuggested: 90
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'El fenómeno de la aporofobia — el rechazo, la aversión o el desprecio hacia las personas pobres — fue acuñado como término por la filósofa Adela Cortina. A diferencia de la xenofobia, que se dirige contra los extranjeros, la aporofobia discrimina específicamente a quienes carecen de recursos económicos, independientemente de su origen. Cortina argumenta que esta forma de discriminación es la más extendida y la menos reconocida socialmente.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿En qué se diferencia la aporofobia de la xenofobia?',
    options: [
      { label: 'La aporofobia rechaza a los extranjeros', value: 'rechaza extranjeros' },
      { label: 'La aporofobia discrimina por pobreza, no por origen', value: 'la aporofobia discrimina por pobreza, no por origen' },
      { label: 'Son sinónimos', value: 'son sinónimos' },
      { label: 'La aporofobia es menos grave', value: 'menos grave' }
    ],
    correctAnswer: 'la aporofobia discrimina por pobreza, no por origen', points: 2, orderIndex: 70, tags: ['filosofía', 'sociedad'], timeSuggested: 90
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'La interseccionalidad constituye un marco analítico indispensable para comprender cómo las distintas formas de opresión se entrelazan y refuerzan mutuamente.',
    ttsLanguageCode: 'es-ES',
    questionText: 'Escribe exactamente lo que oyes.',
    correctAnswer: 'La interseccionalidad constituye un marco analítico indispensable para comprender cómo las distintas formas de opresión se entrelazan y refuerzan mutuamente.', points: 2, orderIndex: 71, tags: ['dictado', 'sociología'], timeSuggested: 120
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'La paradoja de la tolerancia, formulada por Karl Popper, plantea que una sociedad ilimitadamente tolerante terminará siendo destruida por los intolerantes. Popper concluye que, paradójicamente, para preservar la tolerancia es necesario reservarse el derecho de no tolerar la intolerancia. Este argumento se invoca frecuentemente en los debates contemporáneos sobre los límites de la libertad de expresión y la regulación del discurso de odio.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuál es la conclusión de Popper sobre la tolerancia?',
    options: [
      { label: 'Toda expresión debe ser permitida sin excepción', value: 'todo permitido' },
      { label: 'Para preservar la tolerancia hay que no tolerar la intolerancia', value: 'para preservar la tolerancia hay que no tolerar la intolerancia' },
      { label: 'La tolerancia es siempre negativa', value: 'siempre negativa' },
      { label: 'Solo el Estado puede ser tolerante', value: 'solo el Estado' }
    ],
    correctAnswer: 'para preservar la tolerancia hay que no tolerar la intolerancia', points: 2, orderIndex: 72, tags: ['filosofía', 'política'], timeSuggested: 90
  },

  // ============================================================
  // VARIED SPOKEN CONTEXTS — 12 questions (orderIndex 73-84)
  // ============================================================

  // A1 — Varied Spoken Contexts
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Buzón de voz] Escuchas un mensaje de voz de un compañero. ¿A qué hora es la reunión?',
    ttsScript: 'Hola, soy María del departamento de marketing. Te llamo para confirmar nuestra reunión de mañana a las diez y media. Por favor trae el informe. ¡Hasta mañana!',
    ttsLanguageCode: 'es-ES',
    options: [{ label: '10:00', value: '10:00' }, { label: '10:30', value: '10:30' }, { label: '11:00', value: '11:00' }, { label: '11:30', value: '11:30' }],
    correctAnswer: '10:30', points: 1, orderIndex: 73, tags: ['buzón de voz', 'trabajo', 'register-varied'], timeSuggested: 30
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Anuncio de aeropuerto] Escuchas un anuncio en el aeropuerto. ¿A qué puerta deben ir los pasajeros?',
    ttsScript: 'Atención, pasajeros del vuelo Iberia doscientos quince con destino a Lisboa. Su vuelo está embarcando ahora por la puerta once. Por favor diríjanse inmediatamente a la puerta once.',
    ttsLanguageCode: 'es-ES',
    options: [{ label: 'Puerta 5', value: 'Puerta 5' }, { label: 'Puerta 11', value: 'Puerta 11' }, { label: 'Puerta 15', value: 'Puerta 15' }, { label: 'Puerta 2', value: 'Puerta 2' }],
    correctAnswer: 'Puerta 11', points: 1, orderIndex: 74, tags: ['aeropuerto', 'anuncio', 'register-varied'], timeSuggested: 30
  },

  // A2 — Varied Spoken Contexts
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Reserva telefónica] Escuchas a alguien reservando en un restaurante. ¿Para qué día?',
    ttsScript: 'Buenas noches, quisiera reservar una mesa para el sábado por la noche, por favor. Seríamos cinco personas, sobre las nueve. ¿Tienen algo disponible en la terraza?',
    ttsLanguageCode: 'es-ES',
    options: [{ label: 'Viernes', value: 'Viernes' }, { label: 'Sábado', value: 'Sábado' }, { label: 'Domingo', value: 'Domingo' }, { label: 'Lunes', value: 'Lunes' }],
    correctAnswer: 'Sábado', points: 1, orderIndex: 75, tags: ['restaurante', 'reserva', 'register-varied'], timeSuggested: 40
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Mensaje para un cliente] Escuchas un mensaje dejado a un cliente. ¿Qué quiere aplazar?',
    ttsScript: 'Buenos días, soy el señor García de la empresa Torres y asociados. Le llamo por nuestra cita del miércoles. Lamentablemente, necesito aplazar la entrega. ¿Podríamos pasarla al viernes por la tarde? Por favor, devuélvame la llamada lo antes posible.',
    ttsLanguageCode: 'es-ES',
    options: [{ label: 'Una reunión', value: 'Una reunión' }, { label: 'Una entrega', value: 'Una entrega' }, { label: 'Un pago', value: 'Un pago' }, { label: 'Una presentación', value: 'Una presentación' }],
    correctAnswer: 'Una entrega', points: 1, orderIndex: 76, tags: ['cliente', 'mensaje', 'register-varied'], timeSuggested: 40
  },

  // B1 — Varied Spoken Contexts
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Anuncio de radio] Escuchas un anuncio en la radio. ¿Qué se promociona?',
    ttsScript: '¿Cansado de luchar con la gramática inglesa? ¿Quieres hablar con confianza en las reuniones? Únete a LinguaPro, la escuela de idiomas online en la que confían más de cincuenta mil profesionales en todo el mundo. ¡Inscríbete esta semana y obtén el primer mes gratis! Visita linguapro punto es.',
    ttsLanguageCode: 'es-ES',
    options: [{ label: 'Un servicio de traducción', value: 'Un servicio de traducción' }, { label: 'Una escuela de idiomas online', value: 'Una escuela de idiomas online' }, { label: 'Un libro de gramática', value: 'Un libro de gramática' }, { label: 'Una conferencia de negocios', value: 'Una conferencia de negocios' }],
    correctAnswer: 'Una escuela de idiomas online', points: 1, orderIndex: 77, tags: ['radio', 'anuncio', 'register-varied'], timeSuggested: 45
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Reunión de oficina] Escuchas un extracto de una reunión de equipo. ¿Cuál es la preocupación principal?',
    ttsScript: 'Bien, antes de terminar, quiero hablar del calendario del proyecto Fernández. Actualmente llevamos dos semanas de retraso, y el cliente espera la primera entrega para el quince de marzo. Necesitamos reasignar recursos. ¿Alguna sugerencia?',
    ttsLanguageCode: 'es-ES',
    options: [{ label: 'El presupuesto se ha superado', value: 'El presupuesto se ha superado' }, { label: 'El proyecto va con retraso', value: 'El proyecto va con retraso' }, { label: 'Un empleado ha dimitido', value: 'Un empleado ha dimitido' }, { label: 'El cliente está insatisfecho', value: 'El cliente está insatisfecho' }],
    correctAnswer: 'El proyecto va con retraso', points: 1, orderIndex: 78, tags: ['reunión', 'oficina', 'register-varied'], timeSuggested: 45
  },

  // B2 — Varied Spoken Contexts
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Podcast] Escuchas un podcast sobre cambio de carrera. ¿Cuál es el mayor obstáculo según el hablante?',
    ttsScript: 'Cuando acompaño a personas en su transición profesional, lo que más les frena no es la falta de habilidades o cualificaciones. Es el miedo. El miedo a lo desconocido, el miedo a la inestabilidad financiera y, sinceramente, el miedo a lo que pensarán los demás. Una vez que superas eso, todo lo demás encaja.',
    ttsLanguageCode: 'es-ES',
    options: [{ label: 'Falta de habilidades', value: 'Falta de habilidades' }, { label: 'Problemas financieros', value: 'Problemas financieros' }, { label: 'El miedo', value: 'El miedo' }, { label: 'Discriminación por edad', value: 'Discriminación por edad' }],
    correctAnswer: 'El miedo', points: 2, orderIndex: 79, tags: ['podcast', 'carrera', 'register-varied'], timeSuggested: 60
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Noticiario] Escuchas un informe económico. ¿Qué ha decidido el banco central?',
    ttsScript: 'En un movimiento ampliamente esperado, el Banco Central Europeo ha anunciado un recorte de los tipos de interés de un cuarto de punto, situando el tipo de referencia en el tres coma cinco por ciento. Los analistas consideran que esto refleja una preocupación creciente por el débil crecimiento en la zona euro, especialmente en el sector manufacturero.',
    ttsLanguageCode: 'es-ES',
    options: [{ label: 'Subir los tipos', value: 'Subir los tipos' }, { label: 'Bajar los tipos', value: 'Bajar los tipos' }, { label: 'Congelar los tipos', value: 'Congelar los tipos' }, { label: 'Eliminar los tipos', value: 'Eliminar los tipos' }],
    correctAnswer: 'Bajar los tipos', points: 2, orderIndex: 80, tags: ['noticiario', 'economía', 'register-varied'], timeSuggested: 60
  },

  // C1 — Varied Spoken Contexts
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Charla TED] Escuchas un extracto sobre innovación. Según el orador, ¿cuál es el verdadero motor de la innovación?',
    ttsScript: 'Tendemos a romantizar al genio solitario en su garaje, pero los datos cuentan una historia muy diferente. La innovación es fundamentalmente un fenómeno social. Prospera en la intersección de perspectivas diversas, donde las ideas chocan y se recombinan. El verdadero motor no es la genialidad individual, sino la densidad y calidad de las conexiones humanas dentro de un ecosistema.',
    ttsLanguageCode: 'es-ES',
    options: [{ label: 'La genialidad individual', value: 'La genialidad individual' }, { label: 'La financiación pública', value: 'La financiación pública' }, { label: 'Las conexiones humanas en el ecosistema', value: 'Las conexiones humanas en el ecosistema' }, { label: 'La competencia entre empresas', value: 'La competencia entre empresas' }],
    correctAnswer: 'Las conexiones humanas en el ecosistema', points: 2, orderIndex: 81, tags: ['charla TED', 'innovación', 'register-varied'], timeSuggested: 75
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Clase universitaria] Escuchas un fragmento de una clase. ¿Qué concepto explica el profesor?',
    ttsScript: 'Lo que observamos en la literatura es un desplazamiento del modelo tradicional de causalidad lineal hacia lo que los investigadores llaman ahora causalidad circular. Dicho de otro modo, el efecto retroalimenta la causa, creando un bucle que se autorrefuerza. Esto es particularmente evidente en los sistemas climáticos, donde el calentamiento de los océanos libera más dióxido de carbono, lo que a su vez acelera el calentamiento.',
    ttsLanguageCode: 'es-ES',
    options: [{ label: 'Causalidad lineal', value: 'Causalidad lineal' }, { label: 'Causalidad circular', value: 'Causalidad circular' }, { label: 'Variación aleatoria', value: 'Variación aleatoria' }, { label: 'Equilibrio estático', value: 'Equilibrio estático' }],
    correctAnswer: 'Causalidad circular', points: 2, orderIndex: 82, tags: ['clase', 'académico', 'register-varied'], timeSuggested: 75
  },

  // C2 — Varied Spoken Contexts
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Debate filosófico] Escuchas un extracto de un debate. ¿Qué posición defiende el orador?',
    ttsScript: 'Sostengo que el realismo moral no es meramente sostenible, sino necesario. Si concedemos que las verdades éticas son puramente construidas, entonces no tenemos fundamento alguno para condenar las atrocidades. El acto mismo de la indignación moral presupone la existencia de estándares objetivos con los que se pueden medir las acciones, independientemente del consenso cultural.',
    ttsLanguageCode: 'es-ES',
    options: [{ label: 'Relativismo moral', value: 'Relativismo moral' }, { label: 'Realismo moral', value: 'Realismo moral' }, { label: 'Nihilismo', value: 'Nihilismo' }, { label: 'Utilitarismo', value: 'Utilitarismo' }],
    correctAnswer: 'Realismo moral', points: 2, orderIndex: 83, tags: ['debate', 'filosofía', 'register-varied'], timeSuggested: 90
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    questionText: '[Comentario satírico] Escuchas un comentario satírico. ¿Qué se critica realmente?',
    ttsScript: 'Y en las noticias de hoy, una multinacional ha prometido generosamente alcanzar la neutralidad de carbono para el año dos mil setenta y cinco, justo a tiempo para la muerte térmica del universo. El director general tranquilizó a los accionistas asegurando que, si bien los beneficios a corto plazo siguen siendo la prioridad absoluta, la empresa está profundamente comprometida con la sostenibilidad, siempre que no cueste nada.',
    ttsLanguageCode: 'es-ES',
    options: [{ label: 'Las regulaciones ambientales', value: 'Las regulaciones ambientales' }, { label: 'El greenwashing corporativo', value: 'El greenwashing corporativo' }, { label: 'La inacción del gobierno', value: 'La inacción del gobierno' }, { label: 'El comportamiento del consumidor', value: 'El comportamiento del consumidor' }],
    correctAnswer: 'El greenwashing corporativo', points: 2, orderIndex: 84, tags: ['sátira', 'comentario', 'register-varied'], timeSuggested: 90
  },
]
