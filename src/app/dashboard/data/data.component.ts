import { Component, OnInit } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { CHILDREN_PER_PAGE } from 'src/app/shared/constants';
import { ChildResponse } from 'src/app/shared/interfaces/Child';
import { StoreService } from 'src/app/shared/store.service';
import {MatTableDataSource} from '@angular/material/table';

@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  constructor(public storeService: StoreService, private backendService: BackendService) {}
  public currentPage: number = 1;
  public page: number = 0;

  //Table
  public children : MatTableDataSource<ChildResponse> = new MatTableDataSource();
  displayedColumns: string[] = ['name', 'kindergarden', 'address', 'age', 'birthDate', 'deleteChild'];

  ngOnInit() {
    this.backendService.getChildren(this.currentPage);
    this.changeDataSource();
  }

  getAge(birthDate: string) {
    var today = new Date();
    var birthDateTimestamp = new Date(birthDate);
    var age = today.getFullYear() - birthDateTimestamp.getFullYear();
    var m = today.getMonth() - birthDateTimestamp.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateTimestamp.getDate())) {
        age--;
    }
    return age;
  }

  deleteChild(childId: string){
    console.log("Loeschen");
    this.backendService.deleteChildren(childId);
    this.changeDataSource();
  }

  filterChildren(){
    
  }

  async selectPage(i: any) {
    this.currentPage = i;
    await this.backendService.getChildren(this.currentPage);
    this.changeDataSource();
  }

  public returnAllPages() {
    return Math.ceil(this.storeService.childrenTotalCount / CHILDREN_PER_PAGE)
  }

  private changeDataSource(){
    const children : ChildResponse[] = this.storeService.children;
    console.log(children);
    this.children = new MatTableDataSource(children);
  }


}


