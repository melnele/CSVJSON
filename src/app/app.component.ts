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
  static jsonfile = '';

  constructor(public http: HttpClient) { }

  static getfiletext(str) {
    this.jsonfile = str;
  }
  convert2() {
    this.json = AppComponent.jsonfile;
    this.change(AppComponent.jsonfile);
  }
  convert() {
    this.change(this.json);
  }
  change(text) {
    var config = {
      headers: {
        'Content-Type': 'application/json'
      }
    };
    try {
      JSON.parse(text);
    } catch (e) {
      window.confirm('Not a valid JSON');
      return;
    }
    this.http.post('/api/jsontocsv/', text, config).subscribe(res => {
      this.csv = res["data"];
    }, err => {
    });
  }

  downloadFile() {
    let blob = new Blob([this.csv], { type: 'text/csv;charset=utf-8;' });
    let dwldLink = document.createElement("a");
    let url = URL.createObjectURL(blob);
    dwldLink.setAttribute("href", url);
    dwldLink.setAttribute("download", "Convertedfile.csv");
    dwldLink.style.visibility = "hidden";
    document.body.appendChild(dwldLink);
    dwldLink.click();
    document.body.removeChild(dwldLink);
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