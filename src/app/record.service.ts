import { Injectable } from '@angular/core';
import * as RecordRTC from 'recordrtc';
import { DomSanitizer } from '@angular/platform-browser';

@Injectable({
  providedIn: 'root',
})
export class RecordService {
  blobUrl: any;

  interval: any;

  recordingTimer: string | null;

  recordWebRTC: any;

  mediaRecordStream: any;

  options: any = {
    type: 'audio',
    mimeType: 'audio/wav',
  };

  constructor(private sanitizer: DomSanitizer) {}

  toggleRecord() {
    if (this.recordingTimer) {
      this.stopRTC();
    } else {
      navigator.mediaDevices
        .getUserMedia({ audio: true })
        .then((stream) => {
          this.startRTC(stream);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  }

  startRTC(stream: any) {
    this.recordWebRTC = new RecordRTC.StereoAudioRecorder(stream, this.options);
    this.mediaRecordStream = stream;
    this.blobUrl = null;
    this.recordWebRTC.record();
    this.startCountdown();
  }

  stopRTC() {
    this.recordWebRTC.stop((blob: any) => {
      //NOTE: upload on server
      this.blobUrl = this.sanitizer.bypassSecurityTrustUrl(
        URL.createObjectURL(blob)
      );
      this.startCountdown(true);
    });
  }

  startCountdown(clearTime = false) {
    if (clearTime) {
      this.clearStream(this.mediaRecordStream);
      this.recordWebRTC = null;
      this.recordingTimer = null;
      this.mediaRecordStream = null;
      clearInterval(this.interval);
      return;
    } else {
      this.recordingTimer = `00:00`;
      clearInterval(this.interval);
    }

    this.interval = setInterval(() => {
      let timer: any = this.recordingTimer;
      timer = timer.split(':');
      let minutes = +timer[0];
      let seconds = +timer[1];

      if (minutes == 10) {
        this.recordWebRTC.stopRecording();
        clearInterval(this.interval);
        return;
      }
      ++seconds;
      if (seconds >= 59) {
        ++minutes;
        seconds = 0;
      }

      if (seconds < 10) {
        this.recordingTimer = `0${minutes}:0${seconds}`;
      } else {
        this.recordingTimer = `0${minutes}:${seconds}`;
      }
    }, 1000);
  }

  clearStream(stream: any) {
    try {
      stream.getAudioTracks().forEach((track: any) => track.stop());
      stream.getVideoTracks().forEach((track: any) => track.stop());
    } catch (error) {
      //stream error
    }
  }
}
