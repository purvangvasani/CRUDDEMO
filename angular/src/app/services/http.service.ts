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
        let observer;
        if (data.reqType && data.reqType === 'file') {
            const formData: FormData = new FormData();
            if(data.file && data.file.name){
                formData.append('file', data.file, data.file.name);
            }
            delete data.file;
            if (Object.keys(data) && Object.keys(data).length) {
                Object.keys(data).forEach((key) => {
                    if (data[key]) {
                        formData.append(key, data[key]);
                    }
                });
            }
            // const overrides = data;
            // const blobOverrides = new Blob([JSON.stringify(overrides)], {
            //     type: 'application/json',
            // });
            // formData.append('overrides', blobOverrides);
            observer = this.httpClient.post(url, formData);
        } else {
            let httpOptions = {
                headers: new HttpHeaders({
                    'Content-Type': 'application/json'
                })
            }
            observer = this.httpClient.post(url, data, httpOptions);
        }
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