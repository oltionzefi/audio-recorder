import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from './../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class UploadService {
  constructor(private readonly http: HttpClient) {}

  upload(blob: Blob): Observable<any> {
    const formData = new FormData();
    const identifier = localStorage.getItem('identifier');
    formData.append('file', blob);

    return this.http.post(
      `${environment.apiUrl}/upload/${identifier}`,
      formData,
      {
        headers: {
          'X-API-KEY': environment.apiKey,
        },
      }
    );
  }
}
