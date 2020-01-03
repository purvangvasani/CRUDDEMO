import { Component, Input, SimpleChanges, SimpleChange, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-card',
    templateUrl: './card.component.html',
    styleUrls: ['./card.component.scss']
})

export class CardComponent {

    @Input() item: String = null;
    @Input() itemIndex: String = null;
    @Input() detailView: any = false;
    @Output() onRemove = new EventEmitter();
    @Output() onSelect = new EventEmitter();

    constructor() { }

    ngOnInit() {
    }

    ngOnChanges(changes: SimpleChanges) {
        const item: SimpleChange = changes.item;
        if (item && item.currentValue) {
            this.item = item.currentValue;
        }
        const itemIndex: SimpleChange = changes.itemIndex;
        if (itemIndex && itemIndex.currentValue) {
            this.itemIndex = itemIndex.currentValue;
        }
        const detailView: SimpleChange = changes.detailView;
        if (detailView && detailView.currentValue) {
            this.detailView = detailView.currentValue;
        } else {
            this.detailView = false;
        }
    }

    removeItem(data) {
        if (data || data === 0) { this.onRemove.emit(data); }
    }

    editItem(data) {
        if (data || data === 0) { this.onSelect.emit(data); }
    }

}
