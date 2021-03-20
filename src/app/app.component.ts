import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DomSanitizer } from '@angular/platform-browser';
import { TranslateService } from '@ngx-translate/core';
import * as RecordRTC from 'recordrtc';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLinear = true;

  editable = true;

  firstFormGroup: FormGroup = this.formBuilder.group({
    firstCtrl: ['', Validators.required],
  });

  //Lets declare Record OBJ
  record: any;

  //Will use this flag for toggeling recording
  recording = false;

  //URL of Blob
  url: any;

  error: any;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly domSanitizer: DomSanitizer,
    private readonly translate: TranslateService
  ) {
    this.translate.setDefaultLang('sq');
    this.translate.use('sq');
  }

  sanitize(url: string) {
    return this.domSanitizer.bypassSecurityTrustUrl(url);
  }

  initiateRecording() {
    this.recording = true;
    let mediaConstraints = {
      video: false,
      audio: true,
    };
    navigator.mediaDevices
      .getUserMedia(mediaConstraints)
      .then(this.successCallback.bind(this), this.errorCallback.bind(this));
  }

  successCallback(stream: any) {
    var options = {
      mimeType: 'audio/wav',
      numberOfAudioChannels: 1,
      sampleRate: 160000,
    };
    //Start Actuall Recording
    var StereoAudioRecorder = RecordRTC.StereoAudioRecorder;
    this.record = new StereoAudioRecorder(stream, options);
    this.record.record();
  }

  stopRecording() {
    this.recording = false;
    this.record.stop(this.processRecording.bind(this));
  }

  processRecording(blob: any) {
    this.url = URL.createObjectURL(blob);
    console.log('blob', blob);
    console.log('url', this.url);
  }

  errorCallback(error: any) {
    this.error = 'Can not play audio in your browser';
  }
}
