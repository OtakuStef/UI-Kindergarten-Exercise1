import { Component, OnInit, ViewChild } from '@angular/core';
import { BackendService } from 'src/app/shared/backend.service';
import { StoreService } from 'src/app/shared/store.service';
import {MatTableDataSource, MatTable} from '@angular/material/table';
import { MatPaginator, PageEvent } from '@angular/material/paginator';


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
  @ViewChild('childTable', {static: true}) table!: MatTable<any>;
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  public children : MatTableDataSource<any> = new MatTableDataSource();
  public displayedColumns: string[] = ['name', 'kindergarden', 'address', 'age', 'birthDate', 'deleteChild'];
  public pageSize = 5;
  public length = 0;
  private startPage = 1;


  ngOnInit() {
    this.getChildrenLength();
    this.loadInitialData(this.startPage);
  }

  getChildrenLength(){
    this.backendService.getAllChildren().subscribe((res:any) => {
      console.log('Children Count: ' + res.length);
      this.length = res.length;
    }, (error) => {
      this.errorHandler(error);
    })
  }

  loadInitialData(pageIndex:number){
    this.backendService.getChildrenByPageIndexPageSize(pageIndex, this.pageSize).subscribe((res:any)=>{
      this.children = new MatTableDataSource(res);
    }, (error) => {
      this.errorHandler(error);
    })
  }

  pageNavigate(page:PageEvent){
    this.loadInitialData(page.pageIndex + this.startPage);
  }

  errorHandler(error:any){
    console.log('Error while fetching data: ' + error);
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
    this.backendService.deleteChildren(childId);
  }

}


