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
    const formData = new FormData();
    formData.append('file', blob);

    return this.http.post(
      `${environment.apiUrl}/save/${formatDate(
        Date.now(),
        'yyyy-MM-dd-HH-mm-ss',
        'en'
      )}`,
      formData,
      {
        headers: {
          'X-API-KEY': environment.apiKey,
          'Content-Type': 'multipart/form-data, audio/wav',
        },
      }
    );
  }
}
