import { Component, OnInit } from '@angular/core';
import { UserDataService } from '../user-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(private userDataService : UserDataService) { }
  // Can save variables here
  name = 'MHD Tab';
  // use class declaration to store information
  mhdFuture: mentalHealthDayUnused = {
  	_id: 'xxx',
  	dateAwarded: '7-19-2019',
  	managerID: 'xxx',
  	employeeID: 'xxx',
  	testingArray: ['mental','health','day','off']
  };

  public users : User[];

  private getAllUsers(): void {
  	this.userDataService
  		.getUsers()
  			.then(foundUsers=> this.users = foundUsers);
  }

  ngOnInit() {
  	this.getAllUsers();
  }

}
// Create a class
export class mentalHealthDayUnused {
	_id: string;
	dateAwarded: string;
	managerID: string;
	employeeID: string;
	testingArray: string[]; // Also allows for arrays
}

export class User {
	_id: string;
	firstName: string;
	lastName: string;
	manager: boolean;
}