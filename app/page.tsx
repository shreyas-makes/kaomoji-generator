'use client'

import { useState, useCallback, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import useInfiniteScroll from 'react-infinite-scroll-hook'
import confetti from 'canvas-confetti'
import { motion, AnimatePresence } from 'framer-motion'

const allKaomojis = [
  '(´･ω･`)', '(◕‿◕)', '(｡♥‿♥｡)', 'ʕ•ᴥ•ʔ', '(づ￣ ³￣)づ', '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧', 
  '(╯°□°）╯︵ ┻━┻', '¯\\_(ツ)_/¯', '(⌐■_■)', 'ಠ_ಠ', '(╬ Ò﹏Ó)', '(っ˘ڡ˘ς)', 
  '( ͡° ͜ʖ ͡°)', '(ᵔᴥᵔ)', '(✿◠‿◠)', '(>‿◠)✌', '(⊙﹏⊙)', '(; ･`д･´)', '(︶︹︺)',
  '(╥﹏╥)', '(≧◡≦)', '(◕‿◕✿)', '(⌒‿⌒)', '(~˘▾˘)~', '(｡◕‿◕｡)', '(•ө•)♡',
  '(⁄ ⁄>⁄ ▽ ⁄<⁄ ⁄)', '(╬ Ò﹏Ó)', '(≧◡≦)', '(´･ω･`)', '(´｡• ω •｡`)', '(▰˘◡˘▰)',
  '(◕‿◕✿)', '(ᵔᴥᵔ)', '(｡♥‿♥｡)', '(◠‿◠)', '(ﾉ◕ヮ◕)ﾉ*:･ﾟ✧', '(⌒ω⌒)', '(´∀`)'
]

export default function Component() {
  const [kaomojis, setKaomojis] = useState(allKaomojis.slice(0, 20))
  const [hasNextPage, setHasNextPage] = useState(true)
  const [copiedKaomoji, setCopiedKaomoji] = useState<string | null>(null)

  const loadMore = useCallback(() => {
    const nextKaomojis = allKaomojis.slice(kaomojis.length, kaomojis.length + 20)
    setKaomojis(prevKaomojis => [...prevKaomojis, ...nextKaomojis])
    setHasNextPage(kaomojis.length + nextKaomojis.length < allKaomojis.length)
  }, [kaomojis])

  const [sentryRef] = useInfiniteScroll({
    loading: false,
    hasNextPage,
    onLoadMore: loadMore,
    disabled: false,
    rootMargin: '0px 0px 400px 0px',
  })

  const copyToClipboard = useCallback((kaomoji: string) => {
    navigator.clipboard.writeText(kaomoji).then(() => {
      setCopiedKaomoji(kaomoji)
      setTimeout(() => setCopiedKaomoji(null), 2000)
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      })
    }).catch(err => {
      console.error('Failed to copy: ', err)
    })
  }, [])

  useEffect(() => {
    loadMore()
  }, [])

  return (
    <div className="min-h-screen bg-white p-4 sm:p-6 md:p-8">
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {kaomojis.map((kaomoji, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.05 }}
          >
            <Button
              onClick={() => copyToClipboard(kaomoji)}
              variant="outline"
              className="w-full h-24 text-2xl transition-all duration-200 ease-in-out hover:bg-gray-100 focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 hover:scale-105"
            >
              {kaomoji}
            </Button>
          </motion.div>
        ))}
      </div>
      {hasNextPage && (
        <div ref={sentryRef} className="flex justify-center p-4">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
        </div>
      )}
      <AnimatePresence>
        {copiedKaomoji && (
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 50 }}
            className="fixed bottom-4 right-4"
          >
            <Card className="bg-black text-white p-4">
              Copied {copiedKaomoji}
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}