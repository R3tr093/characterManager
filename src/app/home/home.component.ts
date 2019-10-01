import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  posts: any;
  target: any;



  constructor(private http: HttpClient){

  }

  ngOnInit() {
    this.getPosts();
   
    
  }

  readonly ROOT_URL = 'https://character-database.becode.xyz/characters';



  getPosts(){
    this.posts = this.http.get(this.ROOT_URL);
  }

  remove(){

      this.posts = this.http.delete(this.ROOT_URL + "/" + String(this.target)).subscribe(
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

  displayModal(id:string){

    let modalElt = document.getElementById('modal');
    let target = id;
    this.target = target;
    modalElt.style.display = "block";


  }

  hideModal(){
    let modalElt = document.getElementById('modal');
    modalElt.style.display = "none";
  }

  


  
  
}

