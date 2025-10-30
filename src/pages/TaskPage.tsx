import { useTimer } from "../hooks/index"
import { useNavigate } from "react-router-dom"
import '../design/app/TaskOverride.css'

const TaskPage = () => {
  const { seconds, isRunning, start, stop, reset } = useTimer()
  const navigate = useNavigate()  

  const formatTime = (sec: number) => {
    const h = Math.floor(sec / 3600)
    const m = Math.floor((sec % 3600) / 60)
    const s = sec % 60
    return `${h.toString().padStart(2, "0")}:${m
      .toString()
      .padStart(2, "0")}:${s.toString().padStart(2, "0")}`
  }

  return (
    <div>
      <h1>⏱ タイマー</h1>
      <h2>{formatTime(seconds)}</h2>

      <div>
        {!isRunning ? (
          <button onClick={start}>▶ Start</button>
        ) : (
          <button onClick={stop}>⏸ Stop</button>
        )}
        <button onClick={reset} >
          🔄 Reset
        </button>
        <button onClick={() => navigate('/dash')}>ダッシュボードページ</button>
      
      </div>


    </div>
  )
}

export default TaskPage
