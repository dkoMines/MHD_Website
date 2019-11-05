import { Component, OnInit } from '@angular/core';
// Use these imports to get :userID from url
import { ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';

import { UserDataService } from '../user-data.service';
import {User} from '../home/home.component';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.css']
})
export class EmployeesComponent implements OnInit {
  public pageContent = {
  	header: {
  		title: '',
  		strapline: 'Take a mental health day!'
  	}
  };

  constructor(private userDataService: UserDataService,
  	private route: ActivatedRoute
  	) { }

  // Gets API call based on the :userID in the URL
  ngOnInit(): void {
  	this.route.paramMap
  		.pipe(
  			switchMap((params: ParamMap) =>{
  				let id = params.get('userID');
  				return this.userDataService.getUserbyID(id);
  			})
  		)
  		.subscribe((thisUser : User ) => {
  			this.pageContent.header.title = "Hello "+ thisUser.firstName + " " + thisUser.lastName;
		});
  };

  public newMHDDate = {
  	newDate: new Date()
  };
  // Doesn't start true for some reason
  public formVisable: boolean = true;

}
