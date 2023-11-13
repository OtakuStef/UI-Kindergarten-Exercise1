import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Kindergarden } from './interfaces/Kindergarden';
import { StoreService } from './store.service';
import { Child, ChildResponse } from './interfaces/Child';
import { CHILDREN_PER_PAGE } from './constants';

@Injectable({
  providedIn: 'root'
})
export class BackendService {

  private filterQueryParam : string = "";

  constructor(private http: HttpClient, private storeService: StoreService) { }

  public getKindergardens() {
    this.http.get<Kindergarden[]>('http://localhost:5000/kindergardens').subscribe(data => {
      this.storeService.kindergardens = data;
    });
  }

  public getChildren(page: number) {
    this.http.get<ChildResponse[]>(`http://localhost:5000/childs?_expand=kindergarden&_page=${page}&_limit=${CHILDREN_PER_PAGE}&${this.filterQueryParam}`, { observe: 'response' }).subscribe(data => {
      console.log(data.headers.get('X-Total-Count'));
      this.storeService.children = data.body!;
      this.storeService.childrenTotalCount = Number(data.headers.get('X-Total-Count'));

    });
    }

    public async addChildData(child: Child, page:  number) {
      this.http.post('http://localhost:5000/childs', child).subscribe(_ => {
        this.getChildren(page);
      })
    }

    public deleteChildren(childId : string) {
      this.http.delete('http://localhost:5000/childs/' + childId).subscribe(_ => {
        location.reload()
      })
    }

    public filterChildren(filterKey : string, filterValue : string){
      this.filterQueryParam = filterKey + "=" + filterValue

    }
  }
