import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'characterManager';

  readonly ROOT_URL = 'https://jsonplaceholder.typicode.com/users';

  posts: any;


  constructor(private http: HttpClient){

  }

  getPosts(){
    this.posts = this.http.get(this.ROOT_URL);
  }
}
