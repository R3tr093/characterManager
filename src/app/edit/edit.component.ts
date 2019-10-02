import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http';


@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {

  imgData: string;
  nameData : string;
  shortDescData: string;
  descData: string;
  exportData: any;
  posts: any;
  target : any;


  constructor(private http: HttpClient){

  }

  ngOnInit() {
    this.getPosts();

    console.log("https://character-database.becode.xyz/characters/" + this.target)

    function handleFileSelect(evt) {
      var files = evt.target.files; // FileList object
  
      // Loop through the FileList and render image files as thumbnails.
      for (var i = 0, f; f = files[i]; i++) {
  
        // Only process image files.
        if (!f.type.match('image.*')) {
          continue;
        }
  
        var reader = new FileReader();
  
        // Closure to capture the file information.
        reader.onload = (function(theFile) {
          return function(e) {
            // Render thumbnail.
            var span = document.createElement('span');
            span.innerHTML = ['<img id="thumb" style="height: 100px; width: 100px;" src="', e.target.result,
                              '" title="', escape(theFile.name), '"/>'].join('');
            document.getElementById('list').insertBefore(span, null);
            this.imgData = document.getElementById('thumb').getAttribute('src');
            
           

          };
        })(f);
  
        // Read in the image file as a data URL.
        reader.readAsDataURL(f);
    
        
      }
    }
    
    document.getElementById('files').addEventListener('change', handleFileSelect, false);

  }

  readonly ROOT_URL = 'https://character-database.becode.xyz/characters';

  getPosts(){
    this.posts = this.http.get(this.ROOT_URL);
    const url = window.location.href;
    const words = url.split('/');
    this.target = words[4];
    
  }

  editData(){

    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type':  'application/json; charset=UTF-8',
      })
    };


    this.nameData = (document.getElementById("name") as HTMLInputElement).value;
    this.shortDescData = (document.getElementById("shortDesc") as HTMLInputElement).value;
    this.descData = (document.getElementById("description") as HTMLTextAreaElement).value;
    this.imgData = ((document.getElementById("thumb")as HTMLImageElement).getAttribute('src'));

    const words = this.imgData.split(',');
    this.imgData = words[1];

    this.exportData = JSON.stringify({name:this.nameData, shortDescription: this.shortDescData, description:this.descData, image: this.imgData});

    console.log(this.exportData)

    this.http.put(`https://character-database.becode.xyz/characters/${this.target}`,{
      "name": this.nameData,
      "description": this.descData,
      "shortDescription": this.shortDescData,
      "image": this.imgData,
    },httpOptions)
    .subscribe(
        (val) => {
            console.log("PUT call successful value returned in body", val);
        },
        response => {
            console.log("PUT call in error", response);
        },
        () => {
            console.log("The PUT observable is now completed.");
        });
  }

}
