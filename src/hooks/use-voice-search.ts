'use client'

import { useState, useEffect, useCallback, useRef } from 'react'

interface SpeechRecognitionEvent extends Event {
  results: {
    length: number
    [index: number]: {
      0: { transcript: string }
      isFinal: boolean
    }
  }
  resultIndex: number
}

interface SpeechRecognitionType extends EventTarget {
  lang: string
  continuous: boolean
  interimResults: boolean
  maxAlternatives: number
  start: () => void
  stop: () => void
  abort: () => void
  onresult: ((event: SpeechRecognitionEvent) => void) | null
  onerror: ((event: Event) => void) | null
  onend: (() => void) | null
  onstart: (() => void) | null
}

declare global {
  interface Window {
    SpeechRecognition?: new () => SpeechRecognitionType
    webkitSpeechRecognition?: new () => SpeechRecognitionType
  }
}

interface UseVoiceSearchOptions {
  lang?: string
  onResult?: (transcript: string) => void
}

export function useVoiceSearch({ lang = 'bn-BD', onResult }: UseVoiceSearchOptions = {}) {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  // isSupported starts false (SSR-safe). It's updated synchronously inside startListening.
  const [isSupported, setIsSupported] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const recognitionRef = useRef<SpeechRecognitionType | null>(null)
  const onResultRef = useRef(onResult)
  useEffect(() => {
    onResultRef.current = onResult
  }, [onResult])

  const startListening = useCallback(() => {
    if (typeof window === 'undefined') return
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) {
      setError('আপনার ব্রাউজারে ভয়েস সার্চ সমর্থিত নয়')
      setIsSupported(false)
      return
    }
    setIsSupported(true)

    try {
      const recognition = new SR()
      recognition.lang = lang
      recognition.continuous = false
      recognition.interimResults = true
      recognition.maxAlternatives = 1

      recognition.onstart = () => {
        setIsListening(true)
        setError(null)
        setTranscript('')
      }

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = ''
        let interimTranscript = ''
        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i]
          if (result.isFinal) {
            finalTranscript += result[0].transcript
          } else {
            interimTranscript += result[0].transcript
          }
        }
        const current = finalTranscript || interimTranscript
        setTranscript(current)
        if (finalTranscript && onResultRef.current) {
          onResultRef.current(finalTranscript.trim())
        }
      }

      recognition.onerror = (event: Event) => {
        const err = event as unknown as { error?: string }
        if (err.error === 'not-allowed') {
          setError('মাইক্রোফোন অ্যাক্সেস অনুমোদিত নয়')
        } else if (err.error === 'no-speech') {
          setError('কোন কথা শোনা যায়নি')
        } else {
          setError('ভয়েস সার্চে সমস্যা হয়েছে')
        }
        setIsListening(false)
      }

      recognition.onend = () => {
        setIsListening(false)
      }

      recognitionRef.current = recognition
      recognition.start()
    } catch {
      setError('ভয়েস সার্চ শুরু করা যায়নি')
      setIsListening(false)
    }
  }, [lang])

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop()
    setIsListening(false)
  }, [])

  const reset = useCallback(() => {
    setTranscript('')
    setError(null)
  }, [])

  return {
    isListening,
    transcript,
    isSupported,
    error,
    startListening,
    stopListening,
    reset,
  }
}
