import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JSON to CSV';
  json = '';
  csv = '';

  constructor(private http: HttpClient) { }

  convert() {
    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try{
      JSON.parse(this.json);
    }catch(e){
      console.log("not json");
      return ;
    }
    this.http.post('/api/jsontocsv/', this.json, config).subscribe(res => {
      this.csv = res["data"];
    }, err => {
    });
  }
}
