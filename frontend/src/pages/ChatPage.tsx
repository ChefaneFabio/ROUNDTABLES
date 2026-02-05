import { useState, useRef, useEffect } from 'react'
import { useQuery, useMutation, useQueryClient } from 'react-query'
import { MessageCircle, Send, Plus, X } from 'lucide-react'
import { chatApi, ChatSession, ChatMessage } from '../services/chatApi'
import { LoadingPage } from '../components/common/LoadingSpinner'
import { Card } from '../components/common/Card'
import { Button } from '../components/common/Button'

export function ChatPage() {
  const queryClient = useQueryClient()
  const [activeSession, setActiveSession] = useState<ChatSession | null>(null)
  const [showNewChat, setShowNewChat] = useState(false)
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const [selectedTopic, setSelectedTopic] = useState('')
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Fetch sessions
  const { data: sessions, isLoading: sessionsLoading } = useQuery(
    'chatSessions',
    () => chatApi.getMySessions(20)
  )

  // Fetch topics and languages
  const { data: topics } = useQuery('chatTopics', chatApi.getTopics)
  const { data: languages } = useQuery('chatLanguages', chatApi.getLanguages)

  // Create session
  const createSession = useMutation(
    () => chatApi.createSession(selectedLanguage, selectedTopic || undefined),
    {
      onSuccess: (data) => {
        setActiveSession(data.session)
        setMessages([{ role: 'assistant', content: data.greeting, timestamp: new Date().toISOString() }])
        setShowNewChat(false)
        queryClient.invalidateQueries('chatSessions')
      }
    }
  )

  // Send message
  const sendMessage = useMutation(
    (text: string) => chatApi.sendMessage(activeSession!.id, text),
    {
      onMutate: (text) => {
        setMessages(prev => [...prev, { role: 'user', content: text, timestamp: new Date().toISOString() }])
        setMessage('')
      },
      onSuccess: (data) => {
        setMessages(prev => [...prev, { role: 'assistant', content: data.aiResponse, timestamp: new Date().toISOString() }])
      }
    }
  )

  // Load session messages
  const loadSession = async (session: ChatSession) => {
    const fullSession = await chatApi.getSession(session.id)
    setActiveSession(fullSession)
    setMessages(fullSession.messages || [])
  }

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSend = () => {
    if (message.trim() && activeSession) {
      sendMessage.mutate(message.trim())
    }
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  if (sessionsLoading) return <LoadingPage />

  return (
    <div className="h-[calc(100vh-8rem)] flex">
      {/* Sidebar - Sessions */}
      <div className="w-64 bg-white border-r border-gray-200 flex flex-col">
        <div className="p-4 border-b border-gray-200">
          <button
            onClick={() => setShowNewChat(true)}
            className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
          >
            <Plus className="w-4 h-4" />
            New Chat
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {sessions?.map((session) => (
            <button
              key={session.id}
              onClick={() => loadSession(session)}
              className={`w-full text-left p-3 rounded-lg transition-colors ${
                activeSession?.id === session.id
                  ? 'bg-primary-50 border border-primary-200'
                  : 'hover:bg-gray-50'
              }`}
            >
              <div className="flex items-center gap-2 mb-1">
                <MessageCircle className="w-4 h-4 text-gray-400" />
                <span className="font-medium text-gray-900 text-sm">{session.language}</span>
                {session.isActive && (
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                )}
              </div>
              <p className="text-xs text-gray-500 truncate">
                {session.topic || 'Free conversation'}
              </p>
              <p className="text-xs text-gray-400 mt-1">
                {new Date(session.updatedAt).toLocaleDateString()}
              </p>
            </button>
          ))}

          {sessions?.length === 0 && (
            <p className="text-center text-gray-500 text-sm py-8">
              No conversations yet
            </p>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col bg-gray-50">
        {/* New Chat Modal */}
        {showNewChat && (
          <div className="absolute inset-0 bg-black/50 flex items-center justify-center z-50">
            <Card className="w-full max-w-md mx-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold text-gray-900">Start New Conversation</h2>
                <button
                  onClick={() => setShowNewChat(false)}
                  className="p-1 hover:bg-gray-100 rounded"
                >
                  <X className="w-5 h-5 text-gray-400" />
                </button>
              </div>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Language
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {languages?.map((lang) => (
                      <button
                        key={lang.code}
                        onClick={() => setSelectedLanguage(lang.code)}
                        className={`p-3 rounded-lg border-2 text-sm ${
                          selectedLanguage === lang.code
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        {lang.name}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Topic (Optional)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {topics?.map((topic) => (
                      <button
                        key={topic.id}
                        onClick={() => setSelectedTopic(topic.id === selectedTopic ? '' : topic.id)}
                        className={`p-3 rounded-lg border-2 text-left ${
                          selectedTopic === topic.id
                            ? 'border-primary-500 bg-primary-50'
                            : 'border-gray-200 hover:border-gray-300'
                        }`}
                      >
                        <p className="font-medium text-sm">{topic.name}</p>
                        <p className="text-xs text-gray-500 truncate">{topic.description}</p>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={() => createSession.mutate()}
                  disabled={!selectedLanguage || createSession.isLoading}
                  className="w-full"
                >
                  {createSession.isLoading ? 'Starting...' : 'Start Conversation'}
                </Button>
              </div>
            </Card>
          </div>
        )}

        {/* Chat Header */}
        {activeSession && (
          <div className="bg-white border-b border-gray-200 px-4 py-3">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="font-semibold text-gray-900">{activeSession.language} Practice</h2>
                <p className="text-sm text-gray-500">
                  {activeSession.topic || 'Free conversation'} • Level: {activeSession.cefrLevel || 'Auto'}
                </p>
              </div>
              {activeSession.isActive && (
                <span className="flex items-center gap-1 text-sm text-green-600">
                  <span className="w-2 h-2 bg-green-500 rounded-full" />
                  Active
                </span>
              )}
            </div>
          </div>
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {!activeSession ? (
            <div className="h-full flex items-center justify-center">
              <div className="text-center">
                <MessageCircle className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-gray-900 mb-2">AI Chat Coach</h3>
                <p className="text-gray-500 mb-4">
                  Practice your language skills with our AI tutor
                </p>
                <Button onClick={() => setShowNewChat(true)}>
                  <Plus className="w-4 h-4 mr-2" />
                  Start New Chat
                </Button>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, index) => (
                <ChatBubble key={index} message={msg} />
              ))}
              {sendMessage.isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white rounded-2xl rounded-bl-none px-4 py-3 shadow-sm">
                    <div className="flex gap-1">
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                      <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Input */}
        {activeSession && activeSession.isActive && (
          <div className="bg-white border-t border-gray-200 p-4">
            <div className="flex items-end gap-2">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1 resize-none border border-gray-200 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                rows={1}
              />
              <button
                onClick={handleSend}
                disabled={!message.trim() || sendMessage.isLoading}
                className="p-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Send className="w-5 h-5" />
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}

function ChatBubble({ message }: { message: ChatMessage }) {
  const isUser = message.role === 'user'

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-2xl px-4 py-3 ${
          isUser
            ? 'bg-primary-600 text-white rounded-br-none'
            : 'bg-white shadow-sm rounded-bl-none'
        }`}
      >
        <p className={`whitespace-pre-wrap ${isUser ? 'text-white' : 'text-gray-800'}`}>
          {message.content}
        </p>
      </div>
    </div>
  )
}
