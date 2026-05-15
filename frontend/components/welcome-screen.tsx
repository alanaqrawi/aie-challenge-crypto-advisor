"use client"

import { SuggestionChips } from "./suggestion-chips"

interface WelcomeScreenProps {
  onSelectSuggestion: (suggestion: string) => void
}

export function WelcomeScreen({ onSelectSuggestion }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-full px-4 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/10 mb-6 glow-purple">
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
        </div>
        
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
          Your Personal{" "}
          <span className="gradient-text">Financial Advisor</span>
        </h1>
        
        <p className="text-muted-foreground text-lg max-w-lg mx-auto leading-relaxed">
          Get personalized financial guidance, investment insights, and strategic planning tailored to your goals.
        </p>
      </div>

      <div className="w-full max-w-2xl">
        <p className="text-sm font-medium text-muted-foreground text-center mb-4">
          Start with a suggestion or ask anything
        </p>
        <SuggestionChips onSelectSuggestion={onSelectSuggestion} />
      </div>

      <div className="mt-12 flex flex-wrap justify-center gap-6 text-xs text-muted-foreground">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span>Secure & Private</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-primary" />
          <span>AI-Powered Insights</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-500" />
          <span>Real-time Analysis</span>
        </div>
      </div>
    </div>
  )
}
