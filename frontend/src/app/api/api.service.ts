import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpRequest, HttpEvent } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
import { AuthService } from '@auth0/auth0-angular';

const API_HOST = environment.apiHost;

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  httpOptions = {
    headers: new HttpHeaders({'Content-Type': 'application/json'})
  };

  token: string;

  constructor(private http: HttpClient, private auth: AuthService) {
    auth.idTokenClaims$.subscribe(token =>{
      if(token){
        console.log("token " + token?.__raw);
        setAuthToken(token?.__raw);
      }
    });
  }

  static handleError(error: Error) {
    alert(error.message);
  }

  static extractData(res: HttpEvent<any>) {
    const body = res;
    return body || { };
  }

  setAuthToken(token) {
    this.httpOptions = {
      headers: new HttpHeaders({'Content-Type': 'application/json', 'Authorization': `jwt ${token}`})
    };
    this.token = token;
  }

  get(endpoint): Promise<any> {
    const url = `${API_HOST}${endpoint}`;
    const req = this.http.get(url, this.httpOptions).pipe(map(ApiService.extractData));

    return req
            .toPromise()
            .catch((e) => {
              ApiService.handleError(e);
              throw e;
            });
  }

  post(endpoint, data): Promise<any> {
    const url = `${API_HOST}${endpoint}`;
    return this.http.post<HttpEvent<any>>(url, data, this.httpOptions)
            .toPromise()
            .catch((e) => {
              ApiService.handleError(e);
              throw e;
            });
  }

  async upload(endpoint: string, file: File, payload: any): Promise<any> {
    const signed_url = (await this.get(`${endpoint}/signed-url/${file.name}`)).url;

    const headers = new HttpHeaders({'Content-Type': file.type});
    const req = new HttpRequest( 'PUT', signed_url, file,
                                  {
                                    headers: headers,
                                    reportProgress: true, // track progress
                                  });

    return new Promise ( resolve => {
        this.http.request(req).subscribe((resp) => {
        if (resp && (<any> resp).status && (<any> resp).status === 200) {
          resolve(this.post(endpoint, payload));
        }
      });
    });
  }
}
