import { TestBed, inject } from '@angular/core/testing';

import { TextToSpeechService } from './text-speech.service';

describe('TextSpeechService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [TextToSpeechService]
    });
  });

  it('should be created', inject([TextToSpeechService], (service: TextToSpeechService) => {
    expect(service).toBeTruthy();
  }));
});
