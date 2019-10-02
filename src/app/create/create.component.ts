import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { HttpHeaders } from '@angular/common/http';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  imgData: string;
  nameData : string;
  shortDescData: string;
  descData: string;
  exportData: any;
  posts: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {

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



  postData() {


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

    this.http.post("https://character-database.becode.xyz/characters",this.exportData,httpOptions)
        .subscribe(
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
}
