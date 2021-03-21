import { AfterViewInit, Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TranslateService } from '@ngx-translate/core';
import { MatStepper } from '@angular/material/stepper';
import { marker as _ } from '@biesbjerg/ngx-translate-extract-marker';

import { RecordService } from './record.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements AfterViewInit, OnDestroy {
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

  @ViewChild('stepper') private stepper: MatStepper;

  @ViewChild('secondStepper') private secondStepper: MatStepper;

  listOfSentences: string[] = [
    _('Record.Provide.Audio.Sentence1'),
    _('Record.Provide.Audio.Sentence2'),
    _('Record.Provide.Audio.Sentence3'),
    _('Record.Provide.Audio.Sentence4'),
    _('Record.Provide.Audio.Sentence5'),
    _('Record.Provide.Audio.Sentence6'),
    _('Record.Provide.Audio.Sentence7'),
    _('Record.Provide.Audio.Sentence8'),
    _('Record.Provide.Audio.Sentence9'),
    _('Record.Provide.Audio.Sentence10'),
  ];

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly translate: TranslateService,
    private readonly record: RecordService
  ) {
    this.translate.setDefaultLang('sq');
    this.translate.use('sq');

    const identifier = localStorage.getItem('identifier');
    if (identifier) {
      this.firstFormGroup.get('firstCtrl')?.patchValue(identifier);
    }

    this.editable = !this.editable;

    this.translate.get(this.listOfSentences).subscribe((values) => {
      this.listOfSentences = Object.keys(values).map((key) => values[key]);
    });
  }

  ngAfterViewInit(): void {
    const identifier = localStorage.getItem('identifier');
    if (identifier) {
      this.stepper.next();
    }
  }

  initiateRecording(): void {
    this.record.toggleRecord();
  }

  nextStep(): void {
    this.editable = !this.editable;
    localStorage.setItem(
      'identifier',
      this.firstFormGroup.get('firstCtrl')?.value
    );
  }

  ngOnDestroy() {
    localStorage.clear();
  }

  goBack() {
    this.secondStepper.previous();
    this.record.blobUrl = null;
  }

  goForward() {
    this.secondStepper.next();
    this.record.blobUrl = null;
  }

  closeRecord() {
    this.stepper.reset();
    this.secondStepper.reset();
    this.record.blobUrl = null;
    localStorage.clear();
  }
}
