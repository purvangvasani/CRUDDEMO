import { Component } from '@angular/core';
import { AppEvent } from '../models/event.model';
import { Router } from '@angular/router';
import { EventService } from './services/event.service';

@Component({
    selector: 'app-events',
    templateUrl: './events.component.html',
    styleUrls: ['./events.component.scss']
})

export class EventsComponent {

    public events: Array<AppEvent> = [];
    public loading: any = false;

    constructor(
        private eventService: EventService,
        private router: Router
    ) { }

    ngOnInit() {
        this.getEvents();
    }

    addEvent = () => {
        this.router.navigate(['/events/add']);
    }

    removeEvent = (index) => {
        let success = (data) => {
            if (data && data.success) {
                this.getEvents();
            }
            this.loading = false;
        }

        let failure = (error) => {
            this.loading = false;
        }
        if (this.events && this.events[index] && this.events[index]._id) {
            this.loading = true;
    
            let criterion = { _id: this.events[index]._id }
            this.eventService.remove(criterion, success, failure);
        }
    }

    editEvent = (index) => {
        if (this.events && this.events[index] && this.events[index]._id) {
            this.router.navigate(['/events/add', { index: this.events[index]._id }]);
        }
    }

    getEvents = () => {
        let success = (data) => {
            if (data && data.data) {
                this.events = data.data;
            }
            this.loading = false;
        }

        let failure = (error) => {
            this.loading = false;
        }
        this.loading = true;

        let criterion = {};
        this.eventService.getBy(criterion, success, failure);
    }

}
