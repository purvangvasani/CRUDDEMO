import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable()
export class HttpService {

    constructor(private httpClient: HttpClient) { }

    public get = (url: string, successCallback, errorCallback): Observable<any[]> => {
        let observer = this.httpClient.get(url);
        return this.handleRespone(observer, successCallback, errorCallback);
    }

    public post = (url: string, data: any, successCallback, errorCallback): Observable<any[]> => {
        let httpOptions = {
            headers: new HttpHeaders({
                'Content-Type': 'application/json'
            })
        }
        let observer = this.httpClient.post(url, data, httpOptions);
        return this.handleRespone(observer, successCallback, errorCallback);
    }

    private handleRespone = <T>(observer, successCallback, errorCallback) => {
        return observer.subscribe(
            (result: Response) => {
                successCallback(result)
            },
            error => {
                errorCallback(error)
            })
    }
}