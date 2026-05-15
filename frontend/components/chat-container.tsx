"use client"

import { useState, useRef, useEffect } from "react"
import { ChatHeader } from "./chat-header"
import { ChatSidebar } from "./chat-sidebar"
import { ChatMessage } from "./chat-message"
import { ChatInput } from "./chat-input"
import { WelcomeScreen } from "./welcome-screen"
import { postChat } from "@/lib/api"

interface Message {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: string
  isError?: boolean
}

export function ChatContainer() {
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [activeConversation, setActiveConversation] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages, isTyping])

  const handleSendMessage = async (content: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content,
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    }

    setMessages((prev) => [...prev, userMessage])
    setIsTyping(true)

    try {
      const { reply } = await postChat(content)
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: reply,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
      }
      setMessages((prev) => [...prev, assistantMessage])
    } catch (e) {
      const detail = e instanceof Error ? e.message : "Something went wrong"
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: `Could not reach the advisor service.\n\n${detail}\n\nCheck that the FastAPI server is running and that NEXT_PUBLIC_API_URL points to it (default: http://127.0.0.1:8000).`,
        timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        isError: true,
      }
      setMessages((prev) => [...prev, assistantMessage])
    } finally {
      setIsTyping(false)
    }
  }

  const handleSelectConversation = (id: string | null) => {
    setActiveConversation(id)
    if (id === null) {
      setMessages([])
    }
    setSidebarOpen(false)
  }

  const hasMessages = messages.length > 0

  return (
    <div className="flex h-screen bg-background">
      <ChatSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeConversation={activeConversation}
        onSelectConversation={handleSelectConversation}
      />

      <div className="flex-1 flex flex-col min-w-0">
        <ChatHeader onToggleSidebar={() => setSidebarOpen(true)} />

        <main className="flex-1 overflow-y-auto custom-scrollbar">
          {!hasMessages ? (
            <WelcomeScreen onSelectSuggestion={handleSendMessage} />
          ) : (
            <div className="max-w-4xl mx-auto px-4 py-6">
              {messages.map((message) => (
                <ChatMessage
                  key={message.id}
                  role={message.role}
                  content={message.content}
                  timestamp={message.timestamp}
                  isError={message.isError}
                />
              ))}
              {isTyping && (
                <ChatMessage role="assistant" content="" isTyping />
              )}
              <div ref={messagesEndRef} />
            </div>
          )}
        </main>

        <ChatInput onSendMessage={handleSendMessage} disabled={isTyping} />
      </div>
    </div>
  )
}
