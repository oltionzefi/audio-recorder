import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { formatDate } from '@angular/common';

import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private readonly http: HttpClient) {}

  upload(blob: any): Observable<any> {
    return this.http.post(
      `${environment.apiUrl}/save/${formatDate(
        Date.now(),
        'yyyy-MM-dd-HH-mm-ss',
        'en'
      )}`,
      blob,
      {
        headers: {
          'X-API-KEY': environment.apiKey,
          'Content-Type': 'application/octet-stream',
        },
      }
    );
  }
}
