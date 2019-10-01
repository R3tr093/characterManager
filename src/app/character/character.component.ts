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


  remove(id:string){

    this.posts = this.http.delete(this.ROOT_URL + "/" + id).subscribe(
      (val) => {
        window.location.replace("/");
      },
      response => {
          console.log("POST call in error", response);
      },
      () => {
          console.log("The POST observable is now completed.");
      });
  }




  getPosts(){
    this.posts = this.http.get(this.ROOT_URL);
    const url = window.location.href;
    const words = url.split('/');
    this.target = words[4];
    
  }

  displayModal(){

    let modalElt = document.getElementById('modal');
    modalElt.style.display = "block";


  }

  hideModal(){
    let modalElt = document.getElementById('modal');
    modalElt.style.display = "none";
  }

}


