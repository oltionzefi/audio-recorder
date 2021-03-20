import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { RecordService } from './record.service';

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

  get audioUrl(): any {
    return this.record.blobUrl;
  }

  get recordingTimer(): string | null {
    return this.record.recordingTimer;
  }

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly translate: TranslateService,
    private readonly record: RecordService
  ) {
    this.translate.setDefaultLang('sq');
    this.translate.use('sq');
  }

  initiateRecording(): void {
    this.record.toggleRecord();
  }
}
