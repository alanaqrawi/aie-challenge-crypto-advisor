"use client"

import { cn } from "@/lib/utils"
import { Copy, ThumbsUp, ThumbsDown, RotateCcw } from "lucide-react"
import { Button } from "@/components/ui/button"

interface ChatMessageProps {
  role: "user" | "assistant"
  content: string
  timestamp?: string
  isTyping?: boolean
  isError?: boolean
}

export function ChatMessage({ role, content, timestamp, isTyping, isError }: ChatMessageProps) {
  const isAssistant = role === "assistant"

  return (
    <div
      className={cn(
        "flex gap-4 py-4",
        isAssistant ? "justify-start" : "justify-end"
      )}
    >
      {isAssistant && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
          <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4">
            <path
              d="M8 12L16 12M12 8L16 12L12 16"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-primary"
            />
          </svg>
        </div>
      )}
      
      <div
        className={cn(
          "max-w-[80%] md:max-w-[70%]",
          isAssistant ? "order-2" : "order-1"
        )}
      >
        <div
          className={cn(
            "rounded-2xl px-4 py-3",
            isAssistant
              ? cn(
                  "rounded-tl-sm",
                  isError
                    ? "border border-destructive/40 bg-destructive/5 text-destructive"
                    : "bg-card text-card-foreground"
                )
              : "bg-primary text-primary-foreground rounded-tr-sm"
          )}
        >
          {isTyping ? (
            <div className="flex items-center gap-1.5 py-1">
              <span className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:-0.3s]" />
              <span className="w-2 h-2 rounded-full bg-current animate-bounce [animation-delay:-0.15s]" />
              <span className="w-2 h-2 rounded-full bg-current animate-bounce" />
            </div>
          ) : (
            <div className="text-sm leading-relaxed whitespace-pre-wrap">
              {content}
            </div>
          )}
        </div>
        
        {!isTyping && (
          <div className={cn(
            "flex items-center gap-2 mt-2",
            isAssistant ? "justify-start" : "justify-end"
          )}>
            {timestamp && (
              <span className="text-xs text-muted-foreground">{timestamp}</span>
            )}
            {isAssistant && (
              <div className="flex items-center gap-1">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-foreground"
                >
                  <Copy className="h-3 w-3" />
                  <span className="sr-only">Copy message</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-foreground"
                >
                  <ThumbsUp className="h-3 w-3" />
                  <span className="sr-only">Like response</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-foreground"
                >
                  <ThumbsDown className="h-3 w-3" />
                  <span className="sr-only">Dislike response</span>
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-muted-foreground hover:text-foreground"
                >
                  <RotateCcw className="h-3 w-3" />
                  <span className="sr-only">Regenerate response</span>
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      {!isAssistant && (
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center order-3">
          <span className="text-xs font-medium text-primary-foreground">JD</span>
        </div>
      )}
    </div>
  )
}
