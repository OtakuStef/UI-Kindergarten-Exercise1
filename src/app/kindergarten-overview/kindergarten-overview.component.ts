import { Component } from '@angular/core';
import { StoreService } from '../shared/store.service';

@Component({
  selector: 'app-kindergarten-overview',
  templateUrl: './kindergarten-overview.component.html',
  styleUrls: ['./kindergarten-overview.component.scss']
})
export class KindergartenOverviewComponent {

  constructor(public storeService:StoreService){}

  ngOnInit() {

  }



}
