import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-managers',
  templateUrl: './managers.component.html',
  styleUrls: ['./managers.component.css']
})
export class ManagersComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }
    public pageContent = {
  	header: {
  		title: 'Hello Manager',
  		strapline: 'Give a mental health day!'
  	}
  };

}
