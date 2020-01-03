import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { PokemonService } from './services/pokemon.service';

@Component({
    selector: 'app-pokemons',
    templateUrl: './pokemon.component.html',
    styleUrls: ['./pokemon.component.scss']
})

export class PokemonComponent {

    public items:any = [];
    public pokemons:any = [];
    public loading: any = false;
    public selectedItemIndex: any;
    public searchKey: any = '';
    public detailView: any = false;
    public apiErrorMessage: any;

    constructor(
        private PokemonService: PokemonService,
        private router: Router
    ) { }

    ngOnInit() {
        this.getItems();
    }

    manageItem = () => {
        this.router.navigate(['/pokemons/manage']);
    }

    removeItem = (index) => {
        let success = (data) => {
            if (data && data.success) {
                this.getItems();
            } else {
                this.apiErrorMessage = data && data.message ? data.message : 'Unexpected Error!';
                let that = this;
                setTimeout(() => {
                  that.apiErrorMessage = null;
                }, 5000);
            }
            this.loading = false;
        }

        let failure = (error) => {
            this.loading = false;
            this.items[this.selectedItemIndex]['status'] = 'deleting';
            this.apiErrorMessage = error && error.message ? error.message : 'Unexpected Error!';
            let that = this;
            setTimeout(() => {
              that.apiErrorMessage = null;
            }, 5000);
        }
        this.selectedItemIndex = index;
        if (this.items && this.items[index] && this.items[index]._id) {
            this.loading = true;
            this.items[index]['status'] = 'retrieved';

            let criterion = { _id: this.items[index]._id }
            this.PokemonService.remove(criterion, success, failure);
        }
    }

    editItem = (index) => {
        this.selectedItemIndex = index;
        if (this.items && this.items[index] && this.items[index]._id) {
            this.router.navigate(['/pokemons/manage', { index: this.items[index]._id }]);
        }
    }

    getItems = () => {
        let success = (data) => {
            if (data && data.data && data.data.length) {
                this.items = data.data;
                let i = 0;
                this.items.forEach((obj) => {
                    i = i + 1;
                    obj['status'] = 'retrieved';
                    obj['position'] = i;
                });
                this.pokemons = this.items;
            } else {
                this.apiErrorMessage = data && data.message ? data.message : 'Unexpected Error!';
                let that = this;
                setTimeout(() => {
                  that.apiErrorMessage = null;
                }, 5000);
            }
            this.loading = false;
        }

        let failure = (error) => {
            this.loading = false;
            this.apiErrorMessage = error && error.message ? error.message : 'Unexpected Error!';
            let that = this;
            setTimeout(() => {
              that.apiErrorMessage = null;
            }, 5000);
        }
        this.loading = true;

        let criterion = {};
        this.PokemonService.getBy(criterion, success, failure);
    }

    filter = (event) => {
        if (this.searchKey && this.searchKey !== '') {
            this.items = this.pokemons.filter((obj) => {
                return obj.name.startsWith(this.searchKey);
            });
        } else {
            this.items = this.pokemons;
        }
        console.log(this.items);
    }

    viewChanged = () => {
    }

}
