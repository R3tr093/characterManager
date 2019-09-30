import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'


@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.css']
})
export class CharacterComponent implements OnInit {

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


