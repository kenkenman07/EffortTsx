import { useState, useEffect, useRef } from "react"

const useTimer = () => {
  const [seconds, setSeconds] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const intervalRef = useRef<number | null>(null)

  const start = () => {
    if (isRunning) return
    setIsRunning(true)
    intervalRef.current = window.setInterval(() => {
      setSeconds((prev) => prev + 1)
    }, 1000)
  }

  const stop = () => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
      intervalRef.current = null
    }
    setIsRunning(false)
  }

  const reset = () => {
    stop()
    setSeconds(0)
  }

  // ページ離脱時にタイマーを停止（リセット扱い）
  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [])

  return { seconds, isRunning, start, stop, reset }
}

export default useTimer