'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
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

export function BanglaAIToolsSection() {
  const [activeQuery, setActiveQuery] = useState<string | null>(null)

  return (
    <section id="ai-tools" className="py-16 md:py-20 relative overflow-hidden bg-gradient-to-br from-violet-50 via-background to-cyan-50 dark:from-violet-950/20 dark:via-background dark:to-cyan-950/20">
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
                  <div className={`inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gradient-to-br ${tool.gradient} mb-2 group-hover:scale-110 transition-transform`}>
                    <tool.icon className="h-4.5 w-4.5 text-white" />
                  </div>
                  <h3 className="font-bengali text-xs font-bold mb-0.5">{tool.title}</h3>
                  <p className="text-[10px] text-muted-foreground">{tool.titleEn}</p>
                </motion.button>
              ))}
            </div>
          </div>

          {/* Right: AI Chat demo */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="relative"
          >
            <div className="relative bg-card rounded-3xl border border-border shadow-2xl overflow-hidden">
              {/* Header */}
              <div className="flex items-center gap-3 p-4 border-b border-border bg-gradient-to-r from-violet-500 to-purple-600 text-white">
                <div className="w-10 h-10 rounded-xl bg-white/20 backdrop-blur flex items-center justify-center">
                  <BrainCircuit className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-bengali font-bold">বাংলা এআই সহকারী</h3>
                  <p className="text-xs opacity-80 flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-green-300 animate-pulse" />
                    অনলাইন — এখন প্রশ্ন করুন
                  </p>
                </div>
              </div>

              {/* Chat body */}
              <div className="p-4 space-y-3 min-h-[280px] bg-muted/20">
                {/* AI welcome message */}
                <div className="flex gap-2">
                  <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                    <Sparkles className="h-3.5 w-3.5 text-white" />
                  </div>
                  <div className="bg-card rounded-2xl rounded-tr-sm border border-border p-3 max-w-[80%]">
                    <p className="font-bengali text-sm">
                      আসসালামু আলাইকুম! আমি বাংলা এআই সহকারী। সরকারি সেবা সম্পর্কে
                      যেকোনো প্রশ্ন করুন।
                    </p>
                  </div>
                </div>

                {/* Sample query */}
                {activeQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex gap-2 justify-end"
                  >
                    <div className="bg-gradient-to-br from-violet-500 to-purple-600 text-white rounded-2xl rounded-tl-sm p-3 max-w-[80%]">
                      <p className="font-bengali text-sm">{activeQuery}</p>
                    </div>
                  </motion.div>
                )}

                {/* AI Response */}
                {activeQuery && (
                  <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3 }}
                    className="flex gap-2"
                  >
                    <div className="flex-shrink-0 w-7 h-7 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 flex items-center justify-center">
                      <Sparkles className="h-3.5 w-3.5 text-white" />
                    </div>
                    <div className="bg-card rounded-2xl rounded-tr-sm border border-border p-3 max-w-[80%]">
                      <p className="font-bengali text-sm leading-relaxed">
                        পাসপোর্ট রিনিউয়ালের জন্য আপনাকে <strong>www.epassport.gov.bd</strong>{' '}
                        ওয়েবসাইটে গিয়ে অনলাইনে আবেদন করতে হবে। প্রয়োজনীয় কাগজপত্র:
                        পুরাতন পাসপোর্ট, জাতীয় পরিচয়পত্র এবং ছবি।
                      </p>
                      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-border">
                        <Button size="sm" variant="outline" className="h-7 text-xs gap-1 font-bengali">
                          বিস্তারিত দেখুন
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </div>

              {/* Input bar */}
              <div className="p-3 border-t border-border bg-card">
                <div className="flex items-center gap-2">
                  <button className="w-9 h-9 rounded-lg bg-muted hover:bg-accent flex items-center justify-center transition-colors">
                    <Mic className="h-4 w-4 text-muted-foreground" />
                  </button>
                  <input
                    type="text"
                    placeholder="আপনার প্রশ্ন লিখুন..."
                    className="flex-1 h-9 px-3 rounded-lg bg-muted border-0 text-sm font-bengali focus:outline-none focus:ring-2 focus:ring-violet-500/30"
                  />
                  <button className="w-9 h-9 rounded-lg bg-gradient-to-br from-violet-500 to-purple-600 hover:opacity-90 flex items-center justify-center transition-opacity">
                    <Send className="h-4 w-4 text-white" />
                  </button>
                </div>
              </div>
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
                onClick={() => setActiveQuery(query)}
                className={`px-4 py-2 rounded-full text-sm font-bengali transition-all border ${
                  activeQuery === query
                    ? 'bg-violet-500 text-white border-violet-500 shadow-lg shadow-violet-500/25'
                    : 'bg-card text-foreground border-border hover:border-violet-400/40 hover:bg-accent'
                }`}
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
