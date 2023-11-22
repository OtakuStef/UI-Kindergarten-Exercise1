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

  public getKindergardens() {
    this.http.get<Kindergarden[]>('http://localhost:5000/kindergardens').subscribe(data => {
      this.storeService.kindergardens = data;
    });
  }

  public getAllChildren() {
    return this.http.get(`http://localhost:5000/childs?_expand=kindergarden`);
  }

  public getChildrenByPageIndexPageSize(pageIndex:number, pageSize:number) {
    return this.http.get(`http://localhost:5000/childs?_expand=kindergarden&_page=${pageIndex}&_limit=${pageSize}`);
  }

  public async addChildData(child: Child) {
    this.http.post('http://localhost:5000/childs', child).subscribe(_ => {
      console.log('Child added');
    })
  }

  public deleteChildren(childId : string) {
    this.http.delete('http://localhost:5000/childs/' + childId).subscribe(_ => {
      location.reload()
    })
  }
  }
