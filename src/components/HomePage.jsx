import React, {useState, useEffect, useRef} from "react";

export default function HomePage(props) {
  const {setAudioStream, setFile} = props

  const [recordingStatus, setRecordingStatus] = useState("inactive")
  const [audioChunks, setAudioChunks] = useState([])
  const [duration, setDuration] = useState(0)

  const mediaRecorder = useRef(null)
  const mimeType = 'audio/webm'

  async function startRecording() {
    let tempStream

    console.log("Start Recording")

    try {
      const streamData = await navigator.mediaDevices.getUserMedia(
        {audio: true,
        video: false}
      )
      tempStream = streamData
    } catch (err) {
      console.log(err.message)
      return
    }
    setRecordingStatus('recording')

    const media = new MediaRecorder(tempStream, {type:mimeType})
    mediaRecorder.current = media
    mediaRecorder.current.start()

    let localAudioChunks = []
    mediaRecorder.current.ondataavailable = (event) => {
      if(typeof event.data === "undefined") {
        return
      }
      if(event.data.size === 0) {
        return
      }
      localAudioChunks.push(event.data)
    }
    setAudioChunks(localAudioChunks)
  }

  async function stopRecording() {
    setRecordingStatus('inactive')
    console.log("Stop Recording")

    mediaRecorder.current.stop()
    mediaRecorder.current.onstop = () => {
      const audioBlob = new Blob(audioChunks, {type: mimeType})
      setAudioStream(audioBlob)
      setAudioChunks([])
      setDuration(0)
    }
  }

  useEffect(() => {
    if(recordingStatus === "inactive") {
      return
    }
    const interval = setInterval(() => {
      setDuration(curr => curr + 1)
    }, 1000)

    return() => clearInterval(interval)
  }, [recordingStatus])

  return(
    <main className = "flex-1 p-4 flex flex-col gap-3 sm:gap-4 justify-center text-center pb-20">
      <h1 className="font-semibold text-5xl sm:text-6xl md:text-7xl">
        Say
        <span className="text-emerald-700 bold">It</span>
      </h1>
      <h3 className="font-medium">
        Record&nbsp;
        <span className="text-emerald-700">
          <i className="fa-solid fa-arrow-right"></i>
        </span>
        &nbsp;Transcribe&nbsp;
        <span className="text-emerald-700">
          <i className="fa-solid fa-arrow-right"></i>
        </span>
        &nbsp;Translate
      </h3>
      <button onClick={recordingStatus === 'recording' ? stopRecording : startRecording} className="flex specialButton px-4 py-2 rounded-xl items-center text-base justify-between gap-4 mx-auto w-72 max-w-full my-4 ">
        <p className="text-emerald-700">{recordingStatus === 'inactive'?'Record' :`Stop recording`}</p>
        <div className="flex items-center gap-2">
          {duration && (
            <p className="text-sm">
              {duration}s
            </p>
          )}
          <i className={`fa-solid fa-microphone duration-200 ${recordingStatus === "recording" ? "text-rose-300" : ""}`}></i>
        </div>
      </button>
      <p className="text-base">
        Or&nbsp;
        <label className="text-emerald-700 cursor-pointer hover:text-blue-600 duration-200" >
          Upload
          <input onChange = {(e) => {const tempFile = e.target.files[0]; setFile(tempFile)}} className="hidden" type="file" accept = ".mp3, .wav"/>
        </label>
        &nbsp;a .mp3 file
      </p>
      <p className="italic text-slate-500">Free now free forever</p>
    </main>
  )
} 