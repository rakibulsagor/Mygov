'use client'

import { useState, useRef, useEffect, useCallback } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
  BrainCircuit,
  Sparkles,
  Send,
  MessageSquare,
  PenTool,
  Languages,
  Search,
  FileText,
  Mic,
  Loader2,
  RotateCcw,
  type LucideIcon,
} from 'lucide-react'
import { Button } from '@/components/ui/button'

const aiTools = [
  {
    icon: MessageSquare,
    title: 'বাংলা চ্যাটবট',
    titleEn: 'Bengali Chatbot',
    desc: 'প্রশ্ন করুন, সাথে সাথে উত্তর পান',
    gradient: 'from-violet-500 to-purple-600',
  },
  {
    icon: PenTool,
    title: 'লেখালেখি',
    titleEn: 'AI Writer',
    desc: 'বাংলায় সহজে লেখা তৈরি করুন',
    gradient: 'from-blue-500 to-cyan-600',
  },
  {
    icon: Languages,
    title: 'অনুবাদ',
    titleEn: 'Translation',
    desc: 'বাংলা থেকে ইংরেজি ও বিপরীত',
    gradient: 'from-emerald-500 to-teal-600',
  },
  {
    icon: Search,
    title: 'স্মার্ট সার্চ',
    titleEn: 'Smart Search',
    desc: 'সরকারি তথ্য সহজে খুঁজুন',
    gradient: 'from-orange-500 to-red-600',
  },
  {
    icon: FileText,
    title: 'নথি সারাংশ',
    titleEn: 'Document Summary',
    desc: 'বড় নথির সংক্ষিপ্ত সারাংশ',
    gradient: 'from-pink-500 to-rose-600',
  },
  {
    icon: Mic,
    title: 'ভয়েস টুটেক্সট',
    titleEn: 'Voice to Text',
    desc: 'কথা বলে লেখা টাইপ করুন',
    gradient: 'from-amber-500 to-yellow-600',
  },
]

const sampleQueries = [
  'পাসপোর্ট রিনিউয়াল কিভাবে করব?',
  'আয়কর রিটার্ন দাখিলের নিয়ম কি?',
  'জমির খতিয়ান অনলাইনে দেখি কিভাবে?',
]

interface ChatMsg {
  role: 'user' | 'assistant'
  content: string
}

const WELCOME: ChatMsg = {
  role: 'assistant',
  content:
    'আসসালামু আলাইকুম! আমি বাংলা এআই সহকারী। সরকারি সেবা সম্পর্কে যেকোনো প্রশ্ন করুন।',
}

export function BanglaAIToolsSection() {
  const [messages, setMessages] = useState<ChatMsg[]>([WELCOME])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  // Auto-scroll to bottom on new message
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: 'smooth',
      })
    }
  }, [messages, loading])

  const sendMessage = useCallback(async (text: string) => {
    const trimmed = text.trim()
    if (!trimmed || loading) return

    const userMsg: ChatMsg = { role: 'user', content: trimmed }
    const newMessages = [...messages, userMsg]
    setMessages(newMessages)
    setInput('')
    setLoading(true)

    try {
      const history = newMessages
        .filter((m, i) => i > 0) // skip welcome
        .slice(-6)
        .map((m) => ({ role: m.role, content: m.content }))

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: trimmed, history }),
      })
      const data = await res.json()
      const reply: string = data.reply || 'দুঃখিত, উত্তর পাওয়া যায়নি। আবার চেষ্টা করুন।'
      setMessages((prev) => [...prev, { role: 'assistant', content: reply }])
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content:
            'দুঃখিত, সংযোগে সমস্যা হয়েছে। কিছুক্ষণ পর আবার চেষ্টা করুন অথবা ৩৩৩ নম্বরে কল করুন।',
        },
      ])
    } finally {
      setLoading(false)
    }
  }, [messages, loading])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    sendMessage(input)
  }

  const resetChat = () => {
    setMessages([WELCOME])
    setInput('')
  }

  return (
    <section
      id="ai-tools"
      className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-violet-50 via-background to-cyan-50 dark:from-violet-950/20 dark:via-background dark:to-cyan-950/20"
    >
      {/* Animated background orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <motion.div
          animate={{ x: [0, 100, 0], y: [0, -50, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
          className="absolute top-20 left-10 w-72 h-72 bg-violet-400/10 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ x: [0, -80, 0], y: [0, 60, 0] }}
          transition={{ duration: 25, repeat: Infinity, ease: 'linear' }}
          className="absolute bottom-20 right-10 w-80 h-80 bg-cyan-400/10 rounded-full blur-3xl"
        />
      </div>

      <div className="container relative mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          {/* Left: Content + AI tools grid */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-violet-500/10 text-violet-600 dark:text-violet-400 text-sm font-medium font-bengali mb-4">
                <Sparkles className="h-3.5 w-3.5" />
                নতুন: বাংলা এআই টুলস
              </span>
              <h2 className="font-bengali text-3xl md:text-4xl font-bold mb-3 leading-tight">
                কৃত্রিম বুদ্ধিমত্তায় <br />
                <span className="gradient-text">সরকারি সেবা আরও সহজ</span>
              </h2>
              <p className="font-bengali text-muted-foreground mb-6 max-w-lg">
                বাংলা ভাষায় এআই চালিত সেবা — প্রশ্ন করুন, লেখা তৈরি করুন, অনুবাদ করুন
                এবং সহজেই সরকারি তথ্য খুঁজে নিন।
              </p>
            </motion.div>

            {/* AI tools grid */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {aiTools.map((tool, i) => (
                <motion.button
                  key={tool.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  className="group relative bg-card rounded-xl border border-border p-3 text-right hover:shadow-lg hover:border-violet-400/40 transition-all hover:-translate-y-0.5"
                >
                  <div
                    className={`inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br ${tool.gradient} mb-2 group-hover:scale-110 transition-transform`}
                  >
                    <tool.icon className="h-4 w-4 text-white" />
                  </div>
                  <h3 className="font-bengali text-xs font-bold mb-0.5">{tool.title}</h3>
                  <p className="text-[10px] text-muted-foreground">{tool.titleEn}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right: AI Chat */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-card rounded-3xl border border-border shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center justify-between gap-3 p-4 border-b border-border bg-gradient-to-r from-violet-500 to-purple-600 text-white">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                    <BrainCircuit className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-bengali font-bold">বাংলা এআই সহকারী</h3>
                    <p className="text-xs opacity-90 flex items-center gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                      অনলাইন — এখন প্রশ্ন করুন
                    </p>
                  </div>
                </div>
                <button
                  onClick={resetChat}
                  className="w-8 h-8 rounded-lg bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors"
                  aria-label="নতুন চ্যাট"
                  title="নতুন চ্যাট শুরু করুন"
                >
                  <RotateCcw className="h-4 w-4" />
                </button>
              </div>

              {/* Chat body - scrollable */}
              <div
                ref={scrollRef}
                className="p-4 space-y-3 h-[320px] overflow-y-auto bg-muted/20"
              >
                <AnimatePresence initial={false}>
                  {messages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`flex gap-2 ${msg.role === 'user' ? 'justify-end' : ''}`}
                    >
                      {msg.role === 'assistant' && (
                        <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center self-end">
                          <Sparkles className="h-3.5 w-3.5 text-white" />
                        </div>
                      )}
                      <div
                        className={`rounded-2xl p-3 max-w-[80%] ${
                          msg.role === 'user'
                            ? 'bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-tl-sm'
                            : 'bg-card border border-border rounded-tr-sm'
                        }`}
                      >
                        <p className="font-bengali text-sm leading-relaxed whitespace-pre-wrap">
                          {msg.content}
                        </p>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Loading indicator */}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2"
                  >
                    <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                      <Sparkles className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div className="bg-card border border-border rounded-2xl rounded-tr-sm p-3 flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin text-violet-500" />
                      <span className="font-bengali text-sm text-muted-foreground">
                        ভাবছি...
                      </span>
                      <span className="flex gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:-0.3s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce [animation-delay:-0.15s]" />
                        <span className="w-1.5 h-1.5 rounded-full bg-violet-400 animate-bounce" />
                      </span>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input bar */}
              <form onSubmit={handleSubmit} className="p-3 border-t border-border bg-card">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="w-9 h-9 rounded-lg bg-muted hover:bg-accent flex items-center justify-center transition-colors flex-shrink-0"
                    aria-label="ভয়েস ইনপুট"
                  >
                    <Mic className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="আপনার প্রশ্ন লিখুন..."
                    disabled={loading}
                    className="flex-1 h-9 px-3 rounded-lg bg-muted border-0 text-sm font-bengali focus:outline-none focus:ring-2 focus:ring-violet-500/30 disabled:opacity-50 text-foreground placeholder:text-muted-foreground"
                  />
                  <button
                    type="submit"
                    disabled={loading || !input.trim()}
                    className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center transition-opacity flex-shrink-0"
                    aria-label="পাঠান"
                  >
                    {loading ? (
                      <Loader2 className="h-4 w-4 text-white animate-spin" />
                    ) : (
                      <Send className="h-4 w-4 text-white" />
                    )}
                  </button>
                </div>
              </form>
            </div>

            {/* Floating badge */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute -top-4 -right-4 bg-card border border-border rounded-xl shadow-lg p-3 hidden sm:block"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-amber-400 to-orange-500 flex items-center justify-center">
                  <Sparkles className="h-4 w-4 text-white" />
                </div>
                <div>
                  <div className="text-xs font-bold font-bengali">১০ লক্ষ+</div>
                  <div className="text-[10px] text-muted-foreground font-bengali">ব্যবহারকারী</div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Sample queries */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-10 text-center"
        >
          <p className="font-bengali text-sm text-muted-foreground mb-3">জনপ্রিয় প্রশ্নসমূহ:</p>
          <div className="flex flex-wrap items-center justify-center gap-2">
            {sampleQueries.map((query) => (
              <button
                key={query}
                onClick={() => sendMessage(query)}
                disabled={loading}
                className="px-4 py-2 rounded-full text-sm font-bengali transition-all border bg-card text-foreground border-border hover:border-violet-400/40 hover:bg-accent disabled:opacity-50"
              >
                {query}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
