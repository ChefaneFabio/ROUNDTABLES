import { prisma } from '../config/database'

interface Message {
  role: 'user' | 'assistant' | 'system'
  content: string
  timestamp: Date
}

interface ChatContext {
  language: string
  cefrLevel: string
  topic?: string
  studentName: string
}

// System prompts for different CEFR levels
const LEVEL_PROMPTS: Record<string, string> = {
  A1: `You are a friendly language tutor helping a beginner (A1 level) student practice conversation.
- Use very simple vocabulary and short sentences
- Speak slowly and clearly
- Use present tense mostly
- Ask simple yes/no questions or questions with one-word answers
- Be patient and encouraging
- If the student makes errors, gently correct them by repeating the correct form`,

  A2: `You are a friendly language tutor helping an elementary (A2 level) student practice conversation.
- Use common vocabulary and simple sentence structures
- Use present and past tense
- Ask questions that require short answers
- Introduce common expressions and phrases
- Correct errors kindly by modeling the correct usage`,

  B1: `You are a friendly language tutor helping an intermediate (B1 level) student practice conversation.
- Use varied vocabulary and more complex sentences
- Use all tenses as appropriate
- Encourage longer responses
- Introduce idioms and colloquial expressions
- Discuss everyday topics, opinions, and experiences
- Provide subtle corrections and explain why something is incorrect`,

  B2: `You are a friendly language tutor helping an upper-intermediate (B2 level) student practice conversation.
- Use sophisticated vocabulary and complex sentence structures
- Discuss abstract topics and current events
- Challenge the student with nuanced questions
- Introduce formal and informal registers
- Point out subtle grammatical errors and style improvements`,

  C1: `You are a friendly language tutor helping an advanced (C1 level) student practice conversation.
- Use natural, native-like language
- Discuss complex topics requiring analysis and argumentation
- Introduce specialized vocabulary
- Focus on style, nuance, and precision
- Only correct errors that would be noticeable to native speakers`,

  C2: `You are a friendly language tutor helping a proficiency (C2 level) student practice conversation.
- Engage in sophisticated discourse on any topic
- Use idiomatic expressions, humor, and cultural references
- Discuss literature, philosophy, and current affairs
- Focus on stylistic refinement and rhetorical techniques
- Treat the student as a near-native speaker`
}

const TOPIC_PROMPTS: Record<string, string> = {
  'daily-life': 'Focus the conversation on daily routines, hobbies, family, and everyday activities.',
  'travel': 'Focus the conversation on travel experiences, planning trips, and exploring cultures.',
  'business': 'Focus the conversation on professional situations, meetings, and workplace scenarios.',
  'culture': 'Focus the conversation on cultural topics, traditions, and social customs.',
  'news': 'Focus the conversation on current events and news topics.',
  'free': 'Let the conversation flow naturally based on the student\'s interests.'
}

export class AiChatService {
  // Create a new chat session
  async createSession(studentId: string, language: string, topic?: string) {
    const student = await prisma.student.findUnique({
      where: { id: studentId },
      include: { user: { select: { name: true } } }
    })

    if (!student) {
      throw new Error('Student not found')
    }

    // Create initial system message based on level and topic
    const systemPrompt = this.buildSystemPrompt({
      language,
      cefrLevel: student.languageLevel,
      topic,
      studentName: student.user.name
    })

    const initialMessages: Message[] = [
      {
        role: 'system',
        content: systemPrompt,
        timestamp: new Date()
      },
      {
        role: 'assistant',
        content: this.getGreeting(student.languageLevel, student.user.name, language),
        timestamp: new Date()
      }
    ]

    const session = await prisma.chatSession.create({
      data: {
        studentId,
        language,
        topic,
        cefrLevel: student.languageLevel,
        messages: initialMessages as unknown as any,
        isActive: true
      }
    })

    return {
      session,
      greeting: initialMessages[1].content
    }
  }

  // Build system prompt based on context
  private buildSystemPrompt(context: ChatContext): string {
    const levelPrompt = LEVEL_PROMPTS[context.cefrLevel] || LEVEL_PROMPTS['B1']
    const topicPrompt = context.topic ? (TOPIC_PROMPTS[context.topic] || '') : ''

    return `${levelPrompt}

The student's name is ${context.studentName}.
The conversation should be in ${context.language}.
${topicPrompt}

Remember:
- Stay in character as a helpful language tutor
- Keep the conversation engaging and educational
- Adapt to the student's level and interests
- Provide natural corrections without being discouraging`
  }

  // Get initial greeting based on level
  private getGreeting(level: string, name: string, language: string): string {
    const greetings: Record<string, Record<string, string>> = {
      English: {
        A1: `Hello ${name}! 👋 I'm happy to help you practice English. How are you today?`,
        A2: `Hi ${name}! Great to see you! I'm here to help you practice English. What would you like to talk about?`,
        B1: `Hello ${name}! Welcome to our conversation practice. I'm looking forward to chatting with you. Is there anything specific you'd like to discuss today?`,
        B2: `Hi ${name}! I'm delighted to have this conversation with you. Feel free to bring up any topic that interests you, or we can explore something together.`,
        C1: `Hello ${name}! It's wonderful to connect with you for some conversation practice. What's on your mind today? I'm here to discuss whatever you'd like.`,
        C2: `Greetings ${name}! I'm at your disposal for an engaging conversation. What intellectual territory shall we explore today?`
      }
    }

    return greetings[language]?.[level] || greetings['English'][level] || `Hello ${name}! Let's practice ${language} together.`
  }

  // Send a message and get AI response
  async sendMessage(sessionId: string, userMessage: string) {
    const session = await prisma.chatSession.findUnique({
      where: { id: sessionId },
      include: { student: { include: { user: { select: { name: true } } } } }
    })

    if (!session) {
      throw new Error('Chat session not found')
    }

    if (!session.isActive) {
      throw new Error('Chat session is no longer active')
    }

    const messages = session.messages as unknown as Message[]

    // Add user message
    messages.push({
      role: 'user',
      content: userMessage,
      timestamp: new Date()
    })

    // Generate AI response
    // In production, this would call OpenAI or another AI service
    const aiResponse = await this.generateResponse(messages, {
      language: session.language,
      cefrLevel: session.cefrLevel || session.student.languageLevel,
      topic: session.topic || undefined,
      studentName: session.student.user.name
    })

    // Add AI response
    messages.push({
      role: 'assistant',
      content: aiResponse,
      timestamp: new Date()
    })

    // Update session
    await prisma.chatSession.update({
      where: { id: sessionId },
      data: {
        messages: messages as unknown as any,
        updatedAt: new Date()
      }
    })

    return {
      userMessage,
      aiResponse,
      messageCount: messages.filter(m => m.role !== 'system').length
    }
  }

  // Generate AI response (placeholder - would use OpenAI in production)
  private async generateResponse(messages: Message[], context: ChatContext): Promise<string> {
    // In production, this would call:
    // const response = await openai.chat.completions.create({
    //   model: 'gpt-4',
    //   messages: messages.map(m => ({ role: m.role, content: m.content })),
    //   max_tokens: 300,
    //   temperature: 0.7
    // })
    // return response.choices[0].message.content

    // For now, return appropriate placeholder responses based on level
    const lastUserMessage = messages.filter(m => m.role === 'user').pop()?.content.toLowerCase() || ''

    const responses: Record<string, string[]> = {
      A1: [
        "That's good! Can you tell me more?",
        "Very nice! What do you like to do?",
        "Okay! Do you have any questions?",
        "I understand. Please continue!"
      ],
      A2: [
        "That's interesting! Could you explain a bit more?",
        "Great answer! What else would you like to share?",
        "I see! Have you done this before?",
        "Nice! What do you think about it?"
      ],
      B1: [
        "That's a thoughtful point. Could you elaborate on that?",
        "Interesting perspective! What made you think of that?",
        "I appreciate your response. How does that make you feel?",
        "Great observation! Have you had similar experiences?"
      ],
      B2: [
        "You've raised an excellent point. What factors do you think contribute to that?",
        "That's quite insightful. How would you compare this to other situations?",
        "Fascinating perspective. Could you explore the implications of that idea?",
        "I'm impressed by your analysis. What counterarguments might someone raise?"
      ],
      C1: [
        "Your analysis is quite sophisticated. What nuances would you add to that assessment?",
        "That's a compelling argument. How might this perspective evolve over time?",
        "You've touched on some subtle distinctions there. Could you unpack those further?",
        "An astute observation. What are the broader implications you see?"
      ],
      C2: [
        "Your discourse demonstrates remarkable acuity. Shall we delve deeper into the philosophical underpinnings?",
        "A masterful synthesis of ideas. How might we reconcile this with alternative theoretical frameworks?",
        "Your rhetorical precision is admirable. What epistemological challenges do you perceive in this domain?",
        "An eloquently articulated position. How does this intersect with contemporary critical discourse?"
      ]
    }

    const levelResponses = responses[context.cefrLevel] || responses['B1']
    return levelResponses[Math.floor(Math.random() * levelResponses.length)]
  }

  // Get chat session
  async getSession(sessionId: string) {
    const session = await prisma.chatSession.findUnique({
      where: { id: sessionId },
      include: {
        student: { include: { user: { select: { name: true } } } }
      }
    })

    if (!session) {
      throw new Error('Chat session not found')
    }

    // Filter out system messages for display
    const displayMessages = (session.messages as unknown as Message[]).filter(m => m.role !== 'system')

    return {
      ...session,
      messages: displayMessages
    }
  }

  // Get student's chat sessions
  async getStudentSessions(studentId: string, limit: number = 10) {
    return prisma.chatSession.findMany({
      where: { studentId },
      select: {
        id: true,
        language: true,
        topic: true,
        cefrLevel: true,
        isActive: true,
        createdAt: true,
        updatedAt: true
      },
      orderBy: { updatedAt: 'desc' },
      take: limit
    })
  }

  // End chat session
  async endSession(sessionId: string) {
    const session = await prisma.chatSession.update({
      where: { id: sessionId },
      data: { isActive: false }
    })

    // Calculate session stats
    const messages = session.messages as unknown as Message[]
    const userMessages = messages.filter(m => m.role === 'user')
    const aiMessages = messages.filter(m => m.role === 'assistant')

    return {
      session,
      stats: {
        totalMessages: userMessages.length + aiMessages.length,
        userMessages: userMessages.length,
        aiMessages: aiMessages.length,
        duration: session.updatedAt.getTime() - session.createdAt.getTime()
      }
    }
  }
}

export const aiChatService = new AiChatService()
