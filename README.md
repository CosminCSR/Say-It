# SayIt

SayIt is a browser-based app built with React and Tailwind CSS that lets users record audio, transcribe speech to text, and translate content—all locally in the browser.

## Features

- Record voice directly in the browser
- Upload .mp3 or .wav files
- Transcribe speech to text
- Translate transcriptions into multiple languages
- No data is stored or sent to a server

## Tech Stack

- React
- Tailwind CSS
- @xenova/transformers for in-browser machine learning
- Web Workers for local processing

## How it Works

SayIt runs entirely in the browser. Audio is processed and translated using machine learning models loaded via Web Workers. This approach keeps your data local and reduces server-side dependencies.
