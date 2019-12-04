import { Injectable } from '@angular/core';
import { HttpService } from 'src/app/services/http.service';

@Injectable()
export class EventService {

    constructor(private httpService: HttpService) { }

    public getBy(criterion, successCallback, errorCallback) {
        let url = `http://localhost:3000/posts/getBy/${JSON.stringify(criterion)}`
        this.httpService.get(url, successCallback, errorCallback);
    }

    public add(criterion, successCallback, errorCallback) {
        let url = `http://localhost:3000/posts/add`
        this.httpService.post(url, criterion, successCallback, errorCallback);
    }

    public update(criterion, successCallback, errorCallback) {
        let url = `http://localhost:3000/posts/edit`
        this.httpService.post(url, criterion, successCallback, errorCallback);
    }

    public remove(criterion, successCallback, errorCallback) {
        let url = `http://localhost:3000/posts/remove`
        this.httpService.post(url, criterion, successCallback, errorCallback);
    }
}