import { Component, OnInit, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatSelectChange } from '@angular/material/select';


@Component({
  selector: 'app-data',
  templateUrl: './data.component.html',
  styleUrls: ['./data.component.scss']
})
export class DataComponent implements OnInit {

  constructor(public storeService: StoreService, private backendService: BackendService) {}
  public currentPage: number = 1;
  public page: number = 0;
  private searchParam:string = "";

  //Empty Mock Data
  public mockArray: any[] = [
    { name: '', kindergarden: '', address: '', age: '', birthDate: '', enrolmentDate: ''},
    { name: '', kindergarden: '', address: '', age: '', birthDate: '', enrolmentDate: ''},
    { name: '', kindergarden: '', address: '', age: '', birthDate: '', enrolmentDate: ''},
    { name: '', kindergarden: '', address: '', age: '', birthDate: '', enrolmentDate: ''},
    { name: '', kindergarden: '', address: '', age: '', birthDate: '', enrolmentDate: ''}
  ];

  //Table
  @ViewChild('childTable', {static: true}) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public children : MatTableDataSource<any> = new MatTableDataSource(this.mockArray);
  public displayedColumns: string[] = ['name', 'kindergarden', 'address', 'age', 'birthDate', 'enrolmentDate', 'deleteChild'];
  public pageSize = 5;
  public length = 0;
  private startPage = 1;

  public showSpinner = true;

  public sortAscIcon = "arrow_downward";
  public sortDecIcon = "arrow_upward";
  private initSortIcon = "swap_vert";

  public iconSortNameAsc : boolean = true;
  public iconSortKindergardenAsc : boolean = true;
  public iconSortEnrolmentAsc : boolean = true;

  ngOnInit() {
    this.getChildrenLength("");
    this.loadInitialData(this.startPage);
  }

  startSpinner(){
    this.children = new MatTableDataSource(this.mockArray);
    this.showSpinner = true;
  }

  getChildrenLength(filter:string){
    this.backendService.getAllChildren(filter).subscribe((res:any) => {
      this.length = res.length;
    }, (error) => {
      this.errorHandler(error);
    })
  }

  loadInitialData(pageIndex:number){
    this.loadCustomData(pageIndex, "");
  }

  loadCustomData(pageIndex:number, sortParam:string){
    this.backendService.getCustomChildren(pageIndex, this.pageSize, sortParam).subscribe((res:any)=>{
      this.children = new MatTableDataSource(res);
      this.showSpinner = false;
    }, (error) => {
      this.errorHandler(error);
    })
  }

  pageNavigate(page:PageEvent){
    this.startSpinner();
    this.loadCustomData(page.pageIndex + this.startPage, this.searchParam);
    
  }

  errorHandler(error:any){
    console.log('Error while fetching data: ' + error);
    this.showSpinner = false;
  }

  getAge(birthDate: string) {
    var today = new Date();
    var birthDateTimestamp = new Date(birthDate);
    var age = today.getFullYear() - birthDateTimestamp.getFullYear();
    var m = today.getMonth() - birthDateTimestamp.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birthDateTimestamp.getDate())) {
        age--;
    }
    if (isNaN(age)){
      return "";  
    }
    return age;
  }

  deleteChild(childId: string){
    this.backendService.deleteChildren(childId);
  }

  filterKindergarden(event:MatSelectChange) {
    this.startSpinner();
    this.resetSortIcons();
    if(event.value=="non" || event.value==null){
      this.searchParam="";
      this.loadInitialData(this.startPage);
    }else{
      let filter:string = `&kindergardenId=${event.value}`;
      this.searchParam = filter;
      this.loadCustomData(this.startPage,filter);
      this.getChildrenLength(filter);
    }
  }

  sort(sortAttribute:string){
    this.startSpinner();
    let sortOrder = "asc";
    if(this.changeIcon(sortAttribute)){
      sortOrder = "desc";
    }
    let sortParam = `&_sort=${sortAttribute}&_order=${sortOrder}`;
    this.searchParam += sortParam;
    this.loadCustomData(this.startPage,sortParam);
  }

  changeIcon(sortAttribute:string):boolean{
    switch (sortAttribute) {
      case "name":
        this.iconSortNameAsc = !this.iconSortNameAsc;
        return this.iconSortNameAsc;

      case "kindergarden.name":
        this.iconSortKindergardenAsc = !this.iconSortKindergardenAsc;
        return this.iconSortKindergardenAsc;
    
      case "enrolmentDate":
        this.iconSortEnrolmentAsc = !this.iconSortEnrolmentAsc;
        return this.iconSortEnrolmentAsc;

      default:
        return false;
    }
  }

  resetSortIcons(){
    this.iconSortNameAsc = true;
    this.iconSortKindergardenAsc = true;
    this.iconSortEnrolmentAsc = true;
  }

}


