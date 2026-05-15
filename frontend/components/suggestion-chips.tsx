"use client"

import { TrendingUp, PiggyBank, CreditCard, Target, ArrowRight } from "lucide-react"

interface Suggestion {
  icon: React.ElementType
  title: string
  description: string
}

const suggestions: Suggestion[] = [
  {
    icon: TrendingUp,
    title: "Investment Analysis",
    description: "Review my portfolio performance",
  },
  {
    icon: PiggyBank,
    title: "Retirement Planning",
    description: "Help me plan for retirement",
  },
  {
    icon: CreditCard,
    title: "Debt Strategy",
    description: "Create a debt payoff plan",
  },
  {
    icon: Target,
    title: "Financial Goals",
    description: "Set and track my goals",
  },
]

interface SuggestionChipsProps {
  onSelectSuggestion: (suggestion: string) => void
}

export function SuggestionChips({ onSelectSuggestion }: SuggestionChipsProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 max-w-2xl mx-auto">
      {suggestions.map((suggestion) => {
        const Icon = suggestion.icon
        return (
          <button
            key={suggestion.title}
            onClick={() => onSelectSuggestion(suggestion.description)}
            className="group flex items-start gap-3 p-4 rounded-xl bg-card border border-border hover:border-primary/50 hover:bg-card/80 transition-all text-left"
          >
            <div className="p-2 rounded-lg bg-primary/10 text-primary group-hover:bg-primary/20 transition-colors">
              <Icon className="h-5 w-5" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-medium text-sm text-foreground group-hover:text-primary transition-colors">
                {suggestion.title}
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                {suggestion.description}
              </p>
            </div>
            <ArrowRight className="h-4 w-4 text-muted-foreground group-hover:text-primary group-hover:translate-x-0.5 transition-all mt-1" />
          </button>
        )
      })}
    </div>
  )
}
