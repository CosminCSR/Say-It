import React from "react";

export default function Transcription(props) {
  const {textElement} = props

  //the result of the transcription
  return(
    <div>
      {textElement}
    </div>
  )
}