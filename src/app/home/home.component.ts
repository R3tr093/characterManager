import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {




  constructor(private http: HttpClient){

  }

  ngOnInit() {
    this.getPosts();
    
  }

  readonly ROOT_URL = 'https://character-database.becode.xyz/characters';

  posts: any;

  getPosts(){
    this.posts = this.http.get(this.ROOT_URL);
  }

  remove(id:string){
    
    let response = prompt("Do you want to delete this character ? Y/N ")

    if(response === "Y")
    {
      this.posts = this.http.delete(this.ROOT_URL + "/" + id);
      window.location.replace("https://charactermanager.netlify.com/");
    
    }

    else
    {
      alert('Aborted')
    }

    
  }



  
  
}

