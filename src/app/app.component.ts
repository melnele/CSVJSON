import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { send } from 'q';
import { convertInjectableProviderToFactory } from '@angular/core/src/di/injectable';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'JSON to CSV';
  json = '';
  csv = '';
  static jsonfile = '';

  constructor(public http: HttpClient) { }

  static getfiletext(str) {
    this.jsonfile = str;
  }
  convert2() {
    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      JSON.parse(AppComponent.jsonfile);
    } catch (e) {
      console.log("not json");
      return;
    }
    this.json = AppComponent.jsonfile;
    this.http.post('/api/jsontocsv/', AppComponent.jsonfile, config).subscribe(res => {
      this.csv = res["data"];
    }, err => {
    });
  }
  convert() {
    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      JSON.parse(this.json);
    } catch (e) {
      console.log("not json");
      return;
    }
    this.http.post('/api/jsontocsv/', this.json, config).subscribe(res => {
      this.csv = res["data"];
    }, err => {
    });
  }

  fileChange(event) {
    let file: File = event.target.files[0];
    var reader = new FileReader();
    reader.readAsText(file);

    reader.onloadend = function (e) {
      AppComponent.getfiletext(reader.result);
    }
  }
}