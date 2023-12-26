import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kindergarden } from './interfaces/Kindergarden';
import { StoreService } from './store.service';
import { Child} from './interfaces/Child';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  constructor(private http: HttpClient, private storeService: StoreService) { }

  private serverUrl:string = "http://localhost:5000";

  public getKindergardens() {
    this.http.get<Kindergarden[]>(`${this.serverUrl}/kindergardens`).subscribe(data => {
      this.storeService.kindergardens = data;
    });
  }

  public getAllChildren(filter:string) {
    return this.http.get(`${this.serverUrl}/childs?_expand=kindergarden${filter}`);
  }

  public getCustomChildren(pageIndex:number, pageSize:number, param:string){
    return this.http.get(`${this.serverUrl}/childs?_expand=kindergarden&_page=${pageIndex}&_limit=${pageSize}${param}`);   
  }

  public async addChildData(child: Child) {
    let date = new Date();
    child.enrolmentDate = date.toISOString();
    
    this.http.post(`${this.serverUrl}/childs`, child).subscribe(_ => {
      console.log('Child added');
    })
  }

  public deleteChildren(childId : string) {
    this.http.delete(`${this.serverUrl}/childs/` + childId).subscribe(_ => {
      location.reload()
    })
  }
  }
