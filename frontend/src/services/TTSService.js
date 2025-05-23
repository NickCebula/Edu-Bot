// frontend/src/services/TTSService.js

export default class TTSService {
  constructor({ voice }) {
    this.voice = voice
  }

  async speak(text) {
    // call your Django TTS endpoint
    const res = await fetch("/api/tts/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ text, voice: this.voice }),
    })
    const { audio_url } = await res.json()
    // play the returned audio URL
    const audio = new Audio(audio_url)
    audio.play()
  }
}
