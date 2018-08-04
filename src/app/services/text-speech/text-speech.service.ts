import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  private message;
  private readonly voices: any;

  constructor() {
    this.voices = window.speechSynthesis.getVoices();
  }

  newVoiceMessage(text: string, lang?: string, volume?: number, pitch?: number) {
    // sets message argument
    this.message = new SpeechSynthesisUtterance(text);

    // sets options (optional arguments)
    this.message.voice = this.voices[3];
    this.message.lang = lang || 'de-GER';
    this.message.volume = volume || 1;
    this.message.pitch = pitch || 0;


    // Speaks text
    speechSynthesis.speak(this.message);
  }

}
