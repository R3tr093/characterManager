import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  constructor(private http: HttpClient){

  }

  ngOnInit() {
    this.getPosts();
  }

  readonly ROOT_URL = 'https://character-database.becode.xyz/characters';

  posts: any;
  target : any;




  getPosts(){
    this.posts = this.http.get(this.ROOT_URL);
    const url = window.location.href;
    const words = url.split('/');
    this.target = words[4];
    
  }

}
