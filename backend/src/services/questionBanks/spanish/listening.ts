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
    ttsScript: 'En los últimos años muchas empresas han abandonado la evaluación anual en favor del feedback continuo: conversaciones breves cada dos semanas entre el responsable y el colaborador. La idea no es hablar más, sino hablar antes. Un pequeño ajuste en marzo evita que un problema se vuelva irreparable en diciembre. El cambio, sin embargo, exige más esfuerzo a los mánagers, que deben desarrollar capacidades de escucha activa que muchas veces nunca han ejercitado.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuál es el objetivo principal del feedback continuo?',
    options: [
      { label: 'Corregir pequeños problemas antes de que se vuelvan graves', value: 'corregir antes de que se vuelvan graves' },
      { label: 'Dar elogios más frecuentes a los empleados', value: 'elogios frecuentes' },
      { label: 'Sustituir el papel de Recursos Humanos', value: 'sustituir RRHH' },
      { label: 'Monitorizar la productividad en tiempo real', value: 'monitorizar productividad' }
    ],
    correctAnswer: 'corregir antes de que se vuelvan graves', points: 3, orderIndex: 31, tags: ['trabajo', 'management'], timeSuggested: 75
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
    ttsScript: 'Las investigaciones sobre la retención del talento muestran que los primeros noventa días de un empleado en la empresa son decisivos. En ese periodo se forman convicciones que influirán en el compromiso durante años: si quedarse o no, cómo comportarse con los compañeros, cuánto invertir emocionalmente en los proyectos. Sin embargo, muchas organizaciones limitan el onboarding a la primera semana — entrega del ordenador, manual, reunión con RRHH — y luego dejan a la nueva persona a su suerte.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Por qué son tan importantes los primeros noventa días?',
    options: [
      { label: 'Se forman convicciones que inciden en el compromiso a largo plazo', value: 'convicciones que inciden en el compromiso' },
      { label: 'Porque la mayoría de las dimisiones se producen en la primera semana', value: 'dimisiones primera semana' },
      { label: 'Porque las evaluaciones de desempeño empiezan a los 90 días', value: 'evaluaciones a 90 días' },
      { label: 'Porque los permisos de trabajo caducan en ese periodo', value: 'permisos caducan' }
    ],
    correctAnswer: 'convicciones que inciden en el compromiso', points: 3, orderIndex: 33, tags: ['trabajo', 'RRHH'], timeSuggested: 75
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
    ttsScript: 'La paradoja de la colaboración moderna es que cuanto más colaboramos, menos trabajamos de verdad. Las investigaciones sobre el uso del tiempo muestran que quien trabaja con el conocimiento pasa de media veintitrés horas a la semana en reuniones: una cifra que se ha duplicado en los últimos quince años. Las reuniones se han convertido en la forma de demostrar implicación, repartir responsabilidades y evitar decidir en solitario. Pero cada hora de reunión es una hora restada al trabajo concentrado, y el coste del cambio de contexto tras cada encuentro está ya bien documentado.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Por qué se han multiplicado tanto las reuniones?',
    options: [
      { label: 'Sirven para compartir responsabilidades y mostrar implicación', value: 'compartir responsabilidades e implicación' },
      { label: 'Porque sustituyen por completo al correo electrónico', value: 'sustituyen email' },
      { label: 'Porque las empresas miden el trabajo en horas de reunión', value: 'miden por horas' },
      { label: 'Porque los empleados prefieren trabajar en grupo', value: 'preferencia grupo' }
    ],
    correctAnswer: 'compartir responsabilidades e implicación', points: 3, orderIndex: 36, tags: ['trabajo', 'management'], timeSuggested: 90
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Cuando un empleado clave dimite, la reacción instintiva es la contraoferta. Los datos muestran, sin embargo, que esta estrategia funciona a corto plazo — la mayoría acepta — pero dos tercios acaban marchándose igualmente en el plazo de un año. El motivo es estructural: la decisión de irse rara vez tiene que ver con el dinero. Tiene que ver con la falta de perspectivas de crecimiento, el conflicto con un responsable, la sensación de no ser valorado. La contraoferta cura el síntoma, no la causa. Las empresas que retienen el talento invierten en conversaciones mucho antes de que llegue una carta de dimisión.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Por qué la contraoferta suele fracasar?',
    options: [
      { label: 'Resuelve el síntoma pero no la causa estructural de la insatisfacción', value: 'resuelve síntoma no causa' },
      { label: 'Los salarios propuestos son insuficientes', value: 'salarios bajos' },
      { label: 'El empleado pide más a los pocos meses', value: 'pide más' },
      { label: 'La ley no permite ofertas retroactivas', value: 'ley no permite' }
    ],
    correctAnswer: 'resuelve síntoma no causa', points: 3, orderIndex: 37, tags: ['trabajo', 'retención'], timeSuggested: 90
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'En una gran investigación interna sobre qué hace eficaces a los equipos, Google identificó un factor dominante: la seguridad psicológica. Es decir, la sensación de poder expresar opiniones, admitir errores o plantear preguntas sin temer consecuencias profesionales. Los equipos con alta seguridad psicológica producen más innovación, aprenden más rápido de sus fallos y retienen mejor a las personas. Pero no se construye con políticas corporativas: se construye con lo que el responsable dice cuando alguien admite un error, y con lo que no dice cuando hay un momento de silencio.',
    ttsLanguageCode: 'es-ES',
    questionText: 'Según el texto, ¿cómo se construye la seguridad psicológica?',
    options: [
      { label: 'Con el comportamiento cotidiano del responsable, no con políticas', value: 'comportamiento del responsable' },
      { label: 'Con reglamentos corporativos sobre ética', value: 'reglamentos éticos' },
      { label: 'Formando a los nuevos mánagers en técnicas de comunicación', value: 'formando nuevos mánagers' },
      { label: 'Valorando los errores con severidad para evitar su repetición', value: 'valorar errores con severidad' }
    ],
    correctAnswer: 'comportamiento del responsable', points: 3, orderIndex: 38, tags: ['trabajo', 'equipo'], timeSuggested: 90
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'El verdadero indicador del éxito de un manager no es el número de decisiones que toma cada día, sino la calidad de las decisiones que sus colaboradores son capaces de tomar de forma autónoma.',
    ttsLanguageCode: 'es-ES',
    questionText: 'Escribe exactamente lo que oyes.',
    correctAnswer: 'El verdadero indicador del éxito de un manager no es el número de decisiones que toma cada día, sino la calidad de las decisiones que sus colaboradores son capaces de tomar de forma autónoma.', points: 3, orderIndex: 39, tags: ['dictado', 'trabajo'], timeSuggested: 120
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Las investigaciones sobre el trabajo cognitivo convergen en una verdad contraintuitiva: no es la duración de la jornada lo que limita la productividad, sino su fragmentación. Cada vez que pasamos de una tarea a otra — una notificación, un mensaje en el chat, una reunión imprevista — el cerebro tarda entre quince y veinticinco minutos en recuperar plenamente el nivel de concentración anterior. En un día típico con treinta interrupciones, esto significa literalmente que gran parte del tiempo trabajado no genera valor. Algunas empresas han empezado a introducir bloques protegidos de dos o tres horas sin reuniones.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Por qué son importantes los bloques de tiempo protegido?',
    options: [
      { label: 'El cerebro tarda muchos minutos en recuperar la concentración tras cada interrupción', value: 'recuperación de concentración lenta' },
      { label: 'Porque los empleados piden más pausas', value: 'más pausas' },
      { label: 'Porque las reuniones largas son agotadoras', value: 'reuniones agotadoras' },
      { label: 'Porque las notificaciones están prohibidas por ley', value: 'notificaciones prohibidas' }
    ],
    correctAnswer: 'recuperación de concentración lenta', points: 3, orderIndex: 40, tags: ['trabajo', 'productividad'], timeSuggested: 90
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'Dar feedback en un equipo internacional es una de las tareas más infravaloradas del management moderno. Lo que en algunas culturas se considera directo y útil — señalar un error durante una reunión, por ejemplo — en otras culturas se interpreta como un ataque público. También ocurre lo contrario: un feedback que para una cultura es claro, para otra resulta tan suave que ni siquiera se percibe como crítica. Los responsables más eficaces no adoptan un único estilo: adaptan la forma de transmitir el mensaje a cada destinatario y comprueban que ha llegado tal como pretendían.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Qué hace un mánager eficaz en un equipo internacional?',
    options: [
      { label: 'Adapta el estilo del feedback y verifica que se haya comprendido', value: 'adapta estilo y verifica' },
      { label: 'Usa siempre el estilo más directo posible', value: 'estilo directo' },
      { label: 'Delega el feedback en los RRHH locales', value: 'delega RRHH' },
      { label: 'Evita las conversaciones difíciles', value: 'evita conversaciones' }
    ],
    correctAnswer: 'adapta estilo y verifica', points: 3, orderIndex: 41, tags: ['trabajo', 'comunicación intercultural'], timeSuggested: 90
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
    ttsScript: 'El trabajo asíncrono — comunicarse por escrito, sin esperar una respuesta inmediata — se ha convertido en la norma en muchos equipos distribuidos. Las ventajas son evidentes: personas en husos horarios distintos colaboran sin perder horas de sueño, y escribir obliga a un pensamiento más claro que las reuniones improvisadas. Hay, sin embargo, un coste: un mensaje escrito con prisas puede perder el tono y generar tensiones indeseadas. Los equipos que funcionan bien invierten tiempo en reglas de comunicación explícitas: cuándo usar el chat, cuándo el correo, cuándo el vídeo.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuál es una desventaja del trabajo asíncrono?',
    options: [
      { label: 'El tono puede malinterpretarse y generar tensiones', value: 'tono malinterpretado' },
      { label: 'Todos deben estar conectados a la vez', value: 'todos conectados' },
      { label: 'Los documentos no pueden compartirse', value: 'documentos no compartidos' },
      { label: 'Las personas trabajan menos horas', value: 'menos horas' }
    ],
    correctAnswer: 'tono malinterpretado', points: 2, orderIndex: 63, tags: ['trabajo', 'comunicación'], timeSuggested: 75
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'El derecho a la desconexión, ya ley en algunos países europeos, establece que un empleado no está obligado a leer ni responder mensajes fuera del horario laboral. El principio parece sencillo, pero su aplicación es compleja: en los equipos internacionales, la tarde de unos es la mañana de otros, y muchos responsables no son conscientes de que están fijando una expectativa implícita cuando escriben a las once de la noche. Algunas empresas han introducido retrasos automáticos: los mensajes enviados por la noche se entregan a la mañana siguiente.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Por qué es difícil aplicar el derecho a la desconexión en equipos internacionales?',
    options: [
      { label: 'La tarde de unos es la mañana de otros', value: 'tarde de unos mañana de otros' },
      { label: 'La ley cambia de un país a otro', value: 'ley distinta' },
      { label: 'Los responsables se niegan a respetarla', value: 'responsables se niegan' },
      { label: 'La tecnología no lo permite', value: 'tecnología no permite' }
    ],
    correctAnswer: 'tarde de unos mañana de otros', points: 2, orderIndex: 64, tags: ['trabajo', 'work-life balance'], timeSuggested: 75
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'El papel del mánager moderno ha cambiado profundamente. La época del jefe que daba órdenes y verificaba la ejecución se ha acabado. Hoy los mánagers más eficaces actúan como entrenadores: hacen más preguntas de las que dan respuestas, ayudan al colaborador a encontrar la solución por sí mismo y hacen crecer el talento más mediante la delegación que mediante el control. Es un cambio contraintuitivo para quienes se han formado en culturas jerárquicas, y muchos mánagers se sienten al principio menos productivos — hasta que ven crecer a su equipo.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Qué caracteriza al mánager moderno como entrenador?',
    options: [
      { label: 'Hace más preguntas de las que da respuestas', value: 'más preguntas que respuestas' },
      { label: 'Controla cada paso del trabajo', value: 'controla cada paso' },
      { label: 'Trabaja siempre codo con codo con el equipo', value: 'codo con codo' },
      { label: 'Decide sin consultar a nadie', value: 'decide sin consultar' }
    ],
    correctAnswer: 'más preguntas que respuestas', points: 2, orderIndex: 65, tags: ['trabajo', 'management'], timeSuggested: 75
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
    ttsScript: 'La expresión "quiet quitting", que se hizo viral en dos mil veintidós, no describe dimisiones reales sino un comportamiento concreto: hacer exactamente lo que pone en el contrato, ni más ni menos. Rechazar leer correos fuera de horario, no presentarse voluntario, no invertir emocionalmente en proyectos extra. El fenómeno se interpreta de dos maneras opuestas: como reacción sana al burnout generalizado, o como síntoma de una crisis más profunda del compromiso. Los datos son incómodos: en muchas empresas la proporción de empleados que se declara desenganchada supera el sesenta por ciento.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cómo se interpreta el fenómeno del quiet quitting?',
    options: [
      { label: 'O como reacción sana a los límites, o como señal de desenganche extendido', value: 'sana o desenganche' },
      { label: 'Como verdaderas dimisiones masivas', value: 'dimisiones masivas' },
      { label: 'Como un fenómeno típicamente generacional', value: 'fenómeno generacional' },
      { label: 'Como una estrategia para conseguir un aumento', value: 'estrategia aumento' }
    ],
    correctAnswer: 'sana o desenganche', points: 2, orderIndex: 68, tags: ['trabajo', 'engagement'], timeSuggested: 90
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'El trabajo híbrido se ha convertido en el tema más divisivo en las empresas desde dos mil veinte. Los datos sobre productividad son contradictorios: algunos estudios detectan un aumento, otros una disminución, según el tipo de actividad y de cómo se gestione la transición. Pero la pregunta verdaderamente interesante no es dónde trabajan las personas, sino cómo se las lidera. La modalidad híbrida deja al descubierto debilidades que la oficina presencial ocultaba: responsables que controlaban por presencia, procesos que dependían de conversaciones casuales en el pasillo, decisiones que excluían a quien no estaba en la sala.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Por qué la modalidad híbrida es una prueba para el liderazgo?',
    options: [
      { label: 'Deja al descubierto prácticas que solo funcionaban gracias a la presencia física', value: 'expone prácticas ligadas a la presencia' },
      { label: 'Obliga a los responsables a aprender nuevas tecnologías', value: 'aprender tecnologías' },
      { label: 'Duplica las horas reales de trabajo', value: 'duplica horas' },
      { label: 'Exige más reuniones que el trabajo presencial', value: 'más reuniones' }
    ],
    correctAnswer: 'expone prácticas ligadas a la presencia', points: 2, orderIndex: 69, tags: ['trabajo', 'liderazgo'], timeSuggested: 90
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'En las organizaciones de cierto tamaño, el problema más infravalorado no es la falta de talento ni de estrategia: es el alineamiento entre las funciones. Las ventas prometen prestaciones que el equipo de producto no ha previsto, producto construye cosas que marketing no sabe cómo posicionar, finanzas aprueba presupuestos que operaciones no consigue ejecutar. Cada función opera de forma racional tomada por separado, pero la suma de racionalidades individuales produce una organización irracional. La solución no son más reuniones ni más informes: son conversaciones breves y frecuentes entre responsables de función, con la libertad de cuestionar los compromisos sin perder la cara.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuál es la causa estructural del desalineamiento entre funciones?',
    options: [
      { label: 'Cada función es racional por separado, pero la suma genera incoherencia', value: 'racionalidad individual incoherencia global' },
      { label: 'Las personas no leen los informes internos', value: 'no leen informes' },
      { label: 'La empresa no tiene suficientes mánagers', value: 'faltan mánagers' },
      { label: 'La tecnología no comparte los datos', value: 'tecnología no comparte' }
    ],
    correctAnswer: 'racionalidad individual incoherencia global', points: 2, orderIndex: 70, tags: ['trabajo', 'organización'], timeSuggested: 90
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'DICTATION', skill: 'LISTENING',
    ttsScript: 'La sostenibilidad a largo plazo de una organización depende de su capacidad de equilibrar la presión por los resultados a corto plazo con inversiones que solo producirán valor en el futuro.',
    ttsLanguageCode: 'es-ES',
    questionText: 'Escribe exactamente lo que oyes.',
    correctAnswer: 'La sostenibilidad a largo plazo de una organización depende de su capacidad de equilibrar la presión por los resultados a corto plazo con inversiones que solo producirán valor en el futuro.', points: 2, orderIndex: 71, tags: ['dictado', 'trabajo'], timeSuggested: 120
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: 'El modelo de la evaluación anual — esa escala del uno al cinco con la que los responsables clasificaban a los colaboradores — entró en crisis hace una década, y muchas empresas la han abandonado. Las razones están documentadas: las calificaciones producen desmotivación en quien recibe notas bajas, están influidas por sesgos recientes (los mánagers recuerdan los últimos tres meses, no el año entero) y generan competencia poco sana entre compañeros. Lo que las sustituye es más exigente: conversaciones de desarrollo frecuentes, separadas de las decisiones sobre retribución, donde el objetivo es el crecimiento, no la clasificación. Para el responsable es más laborioso, pero produce resultados más duraderos.',
    ttsLanguageCode: 'es-ES',
    questionText: '¿Por qué se han abandonado las evaluaciones anuales?',
    options: [
      { label: 'Distorsionan los comportamientos y reflejan más los sesgos recientes que el año entero', value: 'distorsionan y reflejan sesgos recientes' },
      { label: 'Son demasiado costosas de implementar', value: 'costosas' },
      { label: 'El sindicato ya no las permite', value: 'sindicato no permite' },
      { label: 'Son ilegales en la mayoría de los países', value: 'ilegales' }
    ],
    correctAnswer: 'distorsionan y reflejan sesgos recientes', points: 2, orderIndex: 72, tags: ['trabajo', 'desempeño'], timeSuggested: 90
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

  // ============================================================
  // DIÁLOGOS COTIDIANOS — añadidos por feedback de Maka (voz robótica,
  // sin diálogos). Dos interlocutores con marcas SPEAKER_A/B activan el
  // parser de TtsService y alternan voces masculinas/femeninas.
  // ============================================================

  // ---- A1 ----
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Hola, quisiera un café, por favor.
SPEAKER_B: Claro. ¿Pequeño o grande?
SPEAKER_A: Pequeño, gracias. ¿Cuánto cuesta?
SPEAKER_B: Un euro veinte.`,
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuánto cuesta el café?',
    options: [{ label: '1,00 €', value: '1,00' }, { label: '1,20 €', value: '1,20' }, { label: '1,50 €', value: '1,50' }, { label: '2,00 €', value: '2,00' }],
    correctAnswer: '1,20', points: 1, orderIndex: 85, tags: ['diálogo', 'cafetería', 'everyday'], timeSuggested: 40
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Buenos días. ¿A qué hora abren mañana?
SPEAKER_B: Abrimos a las nueve de la mañana.
SPEAKER_A: ¿Y a qué hora cierran?
SPEAKER_B: A las siete de la tarde.`,
    ttsLanguageCode: 'es-ES',
    questionText: '¿A qué hora abre la tienda?',
    options: [{ label: 'A las 7', value: '7' }, { label: 'A las 8', value: '8' }, { label: 'A las 9', value: '9' }, { label: 'A las 10', value: '10' }],
    correctAnswer: '9', points: 1, orderIndex: 86, tags: ['diálogo', 'tienda', 'everyday'], timeSuggested: 40
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: ¿Dónde podemos vernos el sábado?
SPEAKER_B: Vamos a la cafetería cerca del parque.
SPEAKER_A: ¿A qué hora?
SPEAKER_B: A las tres de la tarde.`,
    ttsLanguageCode: 'es-ES',
    questionText: '¿Dónde quieren encontrarse?',
    options: [{ label: 'En el parque', value: 'parque' }, { label: 'En la cafetería', value: 'cafetería' }, { label: 'En el cine', value: 'cine' }, { label: 'En la oficina', value: 'oficina' }],
    correctAnswer: 'cafetería', points: 1, orderIndex: 87, tags: ['diálogo', 'planes', 'everyday'], timeSuggested: 40
  },
  {
    language: 'Spanish', cefrLevel: 'A1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Un billete al centro, por favor.
SPEAKER_B: ¿Sólo ida o ida y vuelta?
SPEAKER_A: Sólo ida.
SPEAKER_B: Son dos euros.`,
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuánto cuesta el billete?',
    options: [{ label: '1 €', value: '1' }, { label: '2 €', value: '2' }, { label: '3 €', value: '3' }, { label: '4 €', value: '4' }],
    correctAnswer: '2', points: 1, orderIndex: 88, tags: ['diálogo', 'transporte', 'everyday'], timeSuggested: 40
  },

  // ---- A2 ----
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: ¿Estás libre este fin de semana? Hay una película nueva en el cine.
SPEAKER_B: El sábado estoy ocupada, pero el domingo bien.
SPEAKER_A: Perfecto. ¿Vamos el domingo por la tarde?
SPEAKER_B: De acuerdo, nos vemos entonces.`,
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuándo irán al cine?',
    options: [{ label: 'Sábado mañana', value: 'sab-mat' }, { label: 'Sábado noche', value: 'sab-noche' }, { label: 'Domingo tarde', value: 'dom-pm' }, { label: 'Domingo noche', value: 'dom-noche' }],
    correctAnswer: 'dom-pm', points: 1, orderIndex: 89, tags: ['diálogo', 'planes', 'everyday'], timeSuggested: 45
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Buenas tardes, quisiera reservar una mesa para dos personas.
SPEAKER_B: ¿Para cuándo, señor?
SPEAKER_A: Viernes por la noche a las ocho, si es posible.
SPEAKER_B: De acuerdo. ¿A nombre de quién?`,
    ttsLanguageCode: 'es-ES',
    questionText: '¿Para cuántas personas es la reserva?',
    options: [{ label: 'Una', value: '1' }, { label: 'Dos', value: '2' }, { label: 'Tres', value: '3' }, { label: 'Cuatro', value: '4' }],
    correctAnswer: '2', points: 1, orderIndex: 90, tags: ['diálogo', 'restaurante', 'everyday'], timeSuggested: 45
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Hola, soy nueva en la empresa. Trabajo en marketing.
SPEAKER_B: ¡Bienvenida! Yo estoy en comercial. Ven, te presento al equipo.
SPEAKER_A: Gracias. ¿Llevas mucho tiempo aquí?
SPEAKER_B: Llevo unos tres años.`,
    ttsLanguageCode: 'es-ES',
    questionText: '¿En qué departamento trabaja la nueva compañera?',
    options: [{ label: 'Comercial', value: 'comercial' }, { label: 'Marketing', value: 'marketing' }, { label: 'Recursos Humanos', value: 'rrhh' }, { label: 'Informática', value: 'it' }],
    correctAnswer: 'marketing', points: 1, orderIndex: 91, tags: ['diálogo', 'oficina', 'work-life'], timeSuggested: 45
  },
  {
    language: 'Spanish', cefrLevel: 'A2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Disculpe, ¿cómo llego a la estación?
SPEAKER_B: Siga recto dos manzanas, luego gire a la izquierda.
SPEAKER_A: A la izquierda después de dos manzanas. ¿Cuánto se tarda a pie?
SPEAKER_B: Unos diez minutos.`,
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuánto tiempo a pie?',
    options: [{ label: '5 minutos', value: '5' }, { label: '10 minutos', value: '10' }, { label: '15 minutos', value: '15' }, { label: '20 minutos', value: '20' }],
    correctAnswer: '10', points: 1, orderIndex: 92, tags: ['diálogo', 'direcciones', 'everyday'], timeSuggested: 45
  },

  // ---- B1 ----
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Bueno, veo que tiene experiencia en atención al cliente. ¿Qué le atrae de este puesto?
SPEAKER_B: Me gustaría pasar a un rol más estratégico. Aquí podría usar mis habilidades analíticas además de la comunicación.
SPEAKER_A: Entiendo. ¿Cómo gestionaría a un cliente muy insatisfecho?
SPEAKER_B: Lo escucharía con atención, reconocería el problema y buscaría una solución concreta antes del final del día.`,
    ttsLanguageCode: 'es-ES',
    questionText: '¿Por qué quiere el candidato este puesto?',
    options: [{ label: 'Por mejor salario', value: 'salario' }, { label: 'Por un rol más estratégico', value: 'estratégico' }, { label: 'Para teletrabajar', value: 'teletrabajo' }, { label: 'Para cambiar de ciudad', value: 'ciudad' }],
    correctAnswer: 'estratégico', points: 1, orderIndex: 93, tags: ['diálogo', 'entrevista', 'work-life'], timeSuggested: 60
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Quisiera reservar una habitación para tres noches, del quince al dieciocho de marzo.
SPEAKER_B: ¿Para cuántas personas?
SPEAKER_A: Dos adultos. ¿Tienen habitaciones con vista al mar?
SPEAKER_B: Sí, tenemos una doble con vista a ciento sesenta euros la noche, desayuno incluido.`,
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuánto cuesta la habitación por noche?',
    options: [{ label: '140 €', value: '140' }, { label: '150 €', value: '150' }, { label: '160 €', value: '160' }, { label: '180 €', value: '180' }],
    correctAnswer: '160', points: 1, orderIndex: 94, tags: ['diálogo', 'hotel', 'everyday'], timeSuggested: 60
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Buenos días doctora. Tengo dolor de garganta desde hace tres días.
SPEAKER_B: ¿Ha tenido fiebre?
SPEAKER_A: Sí, ayer tenía treinta y ocho y medio. Hoy ya bajó.
SPEAKER_B: Le receto un antibiótico para siete días. Dos comprimidos al día después de las comidas.`,
    ttsLanguageCode: 'es-ES',
    questionText: '¿Por cuántos días debe tomar el antibiótico?',
    options: [{ label: '3 días', value: '3' }, { label: '5 días', value: '5' }, { label: '7 días', value: '7' }, { label: '10 días', value: '10' }],
    correctAnswer: '7', points: 1, orderIndex: 95, tags: ['diálogo', 'médico', 'everyday'], timeSuggested: 60
  },
  {
    language: 'Spanish', cefrLevel: 'B1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: La reunión de mañana se ha adelantado a las diez. ¿Puedes venir?
SPEAKER_B: A las diez tengo una llamada con el cliente de Barcelona. ¿Puedo unirme después?
SPEAKER_A: Sí, empieza tarde, no hay problema. Te mandamos los puntos clave por Slack.
SPEAKER_B: Perfecto, gracias. Intentaré llegar a las diez y media.`,
    ttsLanguageCode: 'es-ES',
    questionText: '¿Por qué llegará tarde el compañero?',
    options: [{ label: 'Tiene otra cita', value: 'cita' }, { label: 'El tren está atrasado', value: 'tren' }, { label: 'Está enfermo', value: 'enfermo' }, { label: 'Se olvidó', value: 'olvido' }],
    correctAnswer: 'cita', points: 1, orderIndex: 96, tags: ['diálogo', 'reunión', 'work-life'], timeSuggested: 60
  },

  // ---- B2 ----
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: El cliente ha adelantado la entrega al viernes. ¿Podemos cumplir?
SPEAKER_B: Va a estar muy ajustado. Desarrollo termina el miércoles, QA necesita al menos dos días completos.
SPEAKER_A: ¿Podemos reducir el alcance? La parte de reporting puede esperar.
SPEAKER_B: Sí, si dejamos el reporting para la próxima entrega, llegamos. Aviso al jefe de proyecto.`,
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cómo cumplirán con la nueva entrega?',
    options: [{ label: 'Trabajando de noche', value: 'noche' }, { label: 'Posponiendo una funcionalidad', value: 'posponiendo' }, { label: 'Añadiendo gente al equipo', value: 'gente' }, { label: 'Pidiendo una prórroga', value: 'prórroga' }],
    correctAnswer: 'posponiendo', points: 1, orderIndex: 97, tags: ['diálogo', 'proyecto', 'work-life'], timeSuggested: 75
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Buenos días, quisiera un reembolso. El producto que recibí está defectuoso.
SPEAKER_B: Lo siento. ¿Tiene el recibo y una foto del defecto?
SPEAKER_A: Sí, los envié por email hace tres días, pero nadie me ha respondido.
SPEAKER_B: Lo verifico ahora mismo. Puedo autorizar el reembolso completo hoy.`,
    ttsLanguageCode: 'es-ES',
    questionText: '¿Qué hace el operador al final?',
    options: [{ label: 'Rechaza el reembolso', value: 'rechaza' }, { label: 'Pide más documentos', value: 'documentos' }, { label: 'Autoriza el reembolso completo', value: 'autoriza' }, { label: 'Transfiere la llamada', value: 'transfiere' }],
    correctAnswer: 'autoriza', points: 1, orderIndex: 98, tags: ['diálogo', 'reclamación', 'work-life'], timeSuggested: 75
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Quisiera hablar de mi paquete retributivo para el próximo año.
SPEAKER_B: Claro. Sepa que el presupuesto es limitado, pero le escucho.
SPEAKER_A: He asumido dos nuevos proyectos y gestionado el equipo durante la ausencia del responsable. Busco un reconocimiento.
SPEAKER_B: Tiene razón. Puedo ofrecer un aumento del seis por ciento más un bono variable según resultados.`,
    ttsLanguageCode: 'es-ES',
    questionText: '¿Qué ofrece el gerente?',
    options: [{ label: 'Sólo un bono puntual', value: 'bono' }, { label: 'Sólo un aumento', value: 'aumento' }, { label: 'Aumento más bono variable', value: 'ambos' }, { label: 'Un ascenso', value: 'ascenso' }],
    correctAnswer: 'ambos', points: 1, orderIndex: 99, tags: ['diálogo', 'negociación', 'work-life'], timeSuggested: 75
  },
  {
    language: 'Spanish', cefrLevel: 'B2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: ¿Cómo fue el curso de formación la semana pasada?
SPEAKER_B: El contenido era útil, pero el ritmo era muy rápido para los que parten desde cero.
SPEAKER_A: ¿Tienes alguna sugerencia concreta?
SPEAKER_B: Añadiría una sesión introductoria opcional antes del módulo avanzado.`,
    ttsLanguageCode: 'es-ES',
    questionText: '¿Qué sugiere el empleado?',
    options: [{ label: 'Cambiar el formador', value: 'formador' }, { label: 'Una sesión introductoria opcional', value: 'intro' }, { label: 'Alargar la duración total', value: 'alargar' }, { label: 'Eliminar el módulo avanzado', value: 'eliminar' }],
    correctAnswer: 'intro', points: 1, orderIndex: 100, tags: ['diálogo', 'formación', 'work-life'], timeSuggested: 75
  },

  // ---- C1 ----
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Estamos perdiendo cuota de mercado en el segmento joven. Dos opciones: una campaña social agresiva o revisar el producto.
SPEAKER_B: La campaña daría visibilidad inmediata, pero si el producto no responde, quemamos el presupuesto sin más.
SPEAKER_A: ¿Entonces propones empezar por revisar el producto?
SPEAKER_B: Exacto. Tres meses de tests en un panel reducido, y luego marketing llega con un mensaje creíble.`,
    ttsLanguageCode: 'es-ES',
    questionText: '¿Con qué está de acuerdo SPEAKER_B?',
    options: [{ label: 'Lanzar la campaña ya', value: 'campaña' }, { label: 'Aumentar el presupuesto de marketing', value: 'presupuesto' }, { label: 'Revisar primero el producto', value: 'producto' }, { label: 'Abandonar el segmento joven', value: 'abandonar' }],
    correctAnswer: 'producto', points: 2, orderIndex: 101, tags: ['diálogo', 'estrategia', 'work-life'], timeSuggested: 90
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Este año has cumplido tres objetivos de cuatro. Excelente trabajo en el proyecto Alfa.
SPEAKER_B: Gracias. El único que no he cumplido es la reducción de tiempos de respuesta del equipo.
SPEAKER_A: Sí, y quiero ser honesto: ese resultado dependía también de recursos que no te dimos. No lo cuento en tu contra.
SPEAKER_B: Lo aprecio. El año que viene quiero encargarme yo de la planificación de recursos.`,
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuál es la postura del gerente sobre el objetivo no cumplido?',
    options: [{ label: 'Lo cuenta como un fracaso total', value: 'fracaso' }, { label: 'Lo atribuye a falta de recursos', value: 'recursos' }, { label: 'Quiere sustituir al empleado', value: 'sustituir' }, { label: 'Baja el salario', value: 'salario' }],
    correctAnswer: 'recursos', points: 2, orderIndex: 102, tags: ['diálogo', 'evaluación', 'work-life'], timeSuggested: 90
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: La propuesta de contrato nos preocupa por la cláusula de exclusividad, es muy amplia.
SPEAKER_B: Entiendo. Es una cláusula estándar en nuestros acuerdos enterprise, pero podemos restringirla a su sector.
SPEAKER_A: Restringirla geográficamente a Europa podría funcionar.
SPEAKER_B: Combinemos las dos: exclusividad limitada a su sector principal y al mercado europeo, durante el primer año.`,
    ttsLanguageCode: 'es-ES',
    questionText: '¿En qué se ponen de acuerdo al final?',
    options: [{ label: 'Eliminar la exclusividad', value: 'elimina' }, { label: 'Exclusividad mundial para todos los sectores', value: 'mundial' }, { label: 'Exclusividad limitada a sector + Europa por un año', value: 'limitada' }, { label: 'Posponer la decisión', value: 'pospone' }],
    correctAnswer: 'limitada', points: 2, orderIndex: 103, tags: ['diálogo', 'contrato', 'work-life'], timeSuggested: 90
  },
  {
    language: 'Spanish', cefrLevel: 'C1', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: Los datos del primer trimestre muestran un crecimiento del doce por ciento, pero el margen ha bajado.
SPEAKER_B: Sí, porque hemos invertido mucho en adquisición de clientes. Es una decisión consciente.
SPEAKER_A: ¿Cuándo esperamos que el margen vuelva al nivel del año pasado?
SPEAKER_B: Para el cuarto trimestre, cuando la base de clientes recurrentes cubra los costes fijos.`,
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuándo debería normalizarse el margen?',
    options: [{ label: 'En el T2', value: 'q2' }, { label: 'En el T3', value: 'q3' }, { label: 'En el T4', value: 'q4' }, { label: 'El año que viene', value: 'año' }],
    correctAnswer: 'q4', points: 2, orderIndex: 104, tags: ['diálogo', 'finanzas', 'work-life'], timeSuggested: 90
  },

  // ---- C2 ----
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: La due diligence ha revelado dos puntos delicados: una contingencia fiscal abierta y una dependencia tecnológica concentrada.
SPEAKER_B: La contingencia fiscal podemos abordarla con un escrow dedicado. La parte tecnológica me preocupa más: dependemos de un único proveedor sin plan de salida.
SPEAKER_A: Podríamos condicionar el precio a la renegociación del contrato en seis meses tras el cierre.
SPEAKER_B: Funciona, pero añadiría una cláusula de earn-out: si no se renegocia, una parte del precio queda retenida.`,
    ttsLanguageCode: 'es-ES',
    questionText: '¿Qué propone SPEAKER_B para el riesgo tecnológico?',
    options: [{ label: 'Cancelar la operación', value: 'cancela' }, { label: 'Sólo un escrow', value: 'escrow' }, { label: 'Una cláusula de earn-out condicionada', value: 'earn-out' }, { label: 'Subir el precio', value: 'precio' }],
    correctAnswer: 'earn-out', points: 2, orderIndex: 105, tags: ['diálogo', 'M&A', 'work-life'], timeSuggested: 100
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: El mercado premia cada vez más a las empresas capaces de escalar sin diluir su cultura. ¿Cómo lo consiguen?
SPEAKER_B: Sinceramente, no del todo. Crecemos un treinta por ciento al año, y cada ola de contrataciones cambia el tejido interno.
SPEAKER_A: ¿Qué medidas han adoptado?
SPEAKER_B: Una estructura de mentoría en cascada y un tope mensual de contrataciones — preferimos perder candidatos antes que diluir los valores.`,
    ttsLanguageCode: 'es-ES',
    questionText: '¿Qué admite SPEAKER_B?',
    options: [{ label: 'Que su cultura es perfecta', value: 'perfecta' }, { label: 'Que su solución tiene límites', value: 'límites' }, { label: 'Que no le interesa la cultura', value: 'no-cult' }, { label: 'Que contratarán menos el año próximo', value: 'menos' }],
    correctAnswer: 'límites', points: 2, orderIndex: 106, tags: ['diálogo', 'liderazgo', 'work-life'], timeSuggested: 100
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: He leído tu informe y algo no me cuadra. Los datos de retención de clientes parecen seleccionados.
SPEAKER_B: Tienes razón, excluí la cohorte de enero porque tenía una promoción atípica.
SPEAKER_A: Entiendo la lógica, pero excluirla sin señalarlo en el informe pone en duda todo el análisis.
SPEAKER_B: Tienes razón. Lo reescribo incluyendo ambas visualizaciones y una nota metodológica clara.`,
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuál es el problema señalado?',
    options: [{ label: 'Los datos son falsos', value: 'falsos' }, { label: 'La exclusión de datos no está declarada', value: 'exclusión' }, { label: 'El informe es muy largo', value: 'largo' }, { label: 'Los números son muy bajos', value: 'bajos' }],
    correctAnswer: 'exclusión', points: 2, orderIndex: 107, tags: ['diálogo', 'feedback', 'work-life'], timeSuggested: 100
  },
  {
    language: 'Spanish', cefrLevel: 'C2', questionType: 'LISTENING', skill: 'LISTENING',
    ttsScript: `SPEAKER_A: La nueva normativa europea sobre protección de datos exige auditorías trimestrales para proveedores críticos.
SPEAKER_B: Significa que tenemos que revisar todos los contratos vigentes. ¿Cuánto tiempo tenemos?
SPEAKER_A: El cumplimiento es obligatorio desde el primero de enero, así que seis meses.
SPEAKER_B: De acuerdo, propondré un grupo de trabajo conjunto con legal y vendor management.`,
    ttsLanguageCode: 'es-ES',
    questionText: '¿Cuánto tiempo tienen para cumplir?',
    options: [{ label: 'Tres meses', value: '3' }, { label: 'Seis meses', value: '6' }, { label: 'Un año', value: '12' }, { label: 'Dos años', value: '24' }],
    correctAnswer: '6', points: 2, orderIndex: 108, tags: ['diálogo', 'compliance', 'work-life'], timeSuggested: 100
  },
]
