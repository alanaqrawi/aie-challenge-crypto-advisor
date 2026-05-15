"use client"

import { Plus, MessageSquare, TrendingUp, PiggyBank, Wallet, CreditCard, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface Conversation {
  id: string
  title: string
  preview: string
  timestamp: string
  icon: React.ElementType
}

const conversations: Conversation[] = [
  {
    id: "1",
    title: "Investment Strategy",
    preview: "Let's review your portfolio allocation...",
    timestamp: "2 hours ago",
    icon: TrendingUp,
  },
  {
    id: "2",
    title: "Retirement Planning",
    preview: "Based on your goals, I recommend...",
    timestamp: "Yesterday",
    icon: PiggyBank,
  },
  {
    id: "3",
    title: "Budget Review",
    preview: "Your spending analysis shows...",
    timestamp: "2 days ago",
    icon: Wallet,
  },
  {
    id: "4",
    title: "Debt Management",
    preview: "Here's a strategy to pay off your...",
    timestamp: "1 week ago",
    icon: CreditCard,
  },
]

interface ChatSidebarProps {
  isOpen: boolean
  onClose: () => void
  activeConversation: string | null
  onSelectConversation: (id: string | null) => void
}

export function ChatSidebar({ 
  isOpen, 
  onClose, 
  activeConversation, 
  onSelectConversation 
}: ChatSidebarProps) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40 lg:hidden"
          onClick={onClose}
        />
      )}
      
      <aside
        className={cn(
          "fixed lg:static inset-y-0 left-0 z-50 w-72 bg-sidebar border-r border-sidebar-border transform transition-transform duration-300 ease-in-out lg:transform-none flex flex-col",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="flex items-center justify-between p-4 border-b border-sidebar-border">
          <div className="flex items-center gap-2">
            <svg viewBox="0 0 24 24" fill="none" className="w-8 h-8">
              <path
                d="M8 12L16 12M12 8L16 12L12 16"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-primary"
              />
            </svg>
            <span className="font-bold text-lg text-sidebar-foreground">Advisor</span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden text-sidebar-foreground hover:bg-sidebar-accent"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="p-3">
          <Button 
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground gap-2"
            onClick={() => onSelectConversation(null)}
          >
            <Plus className="h-4 w-4" />
            New Conversation
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-2 py-2">
          <div className="space-y-1">
            <p className="px-3 py-2 text-xs font-medium text-muted-foreground uppercase tracking-wider">
              Recent Conversations
            </p>
            {conversations.map((conversation) => {
              const Icon = conversation.icon
              return (
                <button
                  key={conversation.id}
                  onClick={() => onSelectConversation(conversation.id)}
                  className={cn(
                    "w-full text-left px-3 py-3 rounded-lg transition-colors group",
                    activeConversation === conversation.id
                      ? "bg-sidebar-accent text-sidebar-accent-foreground"
                      : "hover:bg-sidebar-accent/50 text-sidebar-foreground"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "p-2 rounded-lg",
                      activeConversation === conversation.id
                        ? "bg-primary/20"
                        : "bg-secondary"
                    )}>
                      <Icon className={cn(
                        "h-4 w-4",
                        activeConversation === conversation.id
                          ? "text-primary"
                          : "text-muted-foreground"
                      )} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="font-medium text-sm truncate">
                        {conversation.title}
                      </p>
                      <p className="text-xs text-muted-foreground truncate mt-0.5">
                        {conversation.preview}
                      </p>
                      <p className="text-xs text-muted-foreground/60 mt-1">
                        {conversation.timestamp}
                      </p>
                    </div>
                  </div>
                </button>
              )
            })}
          </div>
        </div>

        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center">
              <span className="text-sm font-medium text-primary">JD</span>
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-sidebar-foreground truncate">John Doe</p>
              <p className="text-xs text-muted-foreground truncate">Premium Plan</p>
            </div>
          </div>
        </div>
      </aside>
    </>
  )
}
