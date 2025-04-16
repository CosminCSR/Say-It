import React,{ useState, useEffect, useRef } from 'react'
import HomePage from './components/HomePage.jsx'
import Header from './components/Header.jsx'
import FileDisplay from './components/FileDisplay.jsx'
import Information from './components/Information.jsx'
import Transcribing from './components/Transcribing.jsx'
import { MessageTypes } from './utils/presets'


function App() {
  //states for file upload/recording
  const [file,setFile] = useState(null)
  const [audioStream,setAudioStream] = useState(null)
  const [output, setOutput] = useState(null) // transcription result
  //feedback for cases
  const [loading, setLoading] = useState(false) 
  const [finished, setFinished] = useState(false)
  const [downloading, setDownloading] = useState(false)
  
  const isAudioAvailable = file || audioStream

  //reset audio
  function handleAudioReset() {
    setFile(null)
    setAudioStream(null)
  }

  const worker = useRef(null)

  useEffect(() => {
    //set up web worker
    if (!worker.current) {
      worker.current = new Worker(new URL('./utils/whisper.worker.js', import.meta.url),{ type: "module" })
    }
    //listen message from worker
    const onMessageReceived = async (e) => {
      switch(e.data.type) {
        case "DOWNLOADING": 
          setDownloading(true)
          console.log("Downloading")
          break;
        case "LOADING": 
          setLoading(true)
          console.log("Loading")
          break;
         case "RESULT": 
          setOutput(e.data.results)
          console.log(e.data.results)
          break;
        case "INFERENCE_DONE": 
          setFinished(true)
          console.log("Inference Done")
          break;
      }
    }

    worker.current.addEventListener("message", onMessageReceived)
    return () => worker.current.removeEventListener("message", onMessageReceived)
  })

  //read and decode audio data from file/stream
  async function readAudioFrom(file) {
    const sampling_rate = 16000
    const audioCTX = new AudioContext({sampleRate: sampling_rate})
    const response = await file.arrayBuffer()
    const decoded = await audioCTX.decodeAudioData(response)
    const audio = decoded.getChannelData(0)
    return audio
  }

  //check for file/stream and sends to worker
  async function handleFormSubmission() {
    if (!file && !audioStream) {
      return
    }

    let audio = await readAudioFrom(file ? file: audioStream)
    const model_name = `openai/whisper-tiny.en`

    worker.current.postMessage({type: MessageTypes.INFERENCE_REQUEST, audio, model_name})
  }

  //rendering the site based on info that we get
  return (
    <>
    <div className = "flex flex-col mx-auto w-full">
      <section className = "min-h-screen flex flex-col">
        <Header />
        {output ? (<Information output = {output}/>) 
                : loading ? (<Transcribing />) 
                          : isAudioAvailable ? (<FileDisplay handleFormSubmission = {handleFormSubmission} handleAudioReset = {handleAudioReset} file = {file} audioStream = {setAudioStream} />) 
                                             : (<HomePage setFile = {setFile} setAudioStream = {setAudioStream}/>) }
      </section>
    <footer>
      <p className="text-xs fixed bottom-4 left-1/2 -translate-x-1/2 text-center text-slate-500">
        SayIt can make mistakes. Be careful to check your information.
      </p>
    </footer>
    </div>
    </>
  )
}

export default App
