import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { User } from './home/home.component';

@Injectable({
  providedIn: 'root'
})
export class UserDataService {

  constructor(private http: HttpClient) {}
  private apiBaseUrl = 'http://localhost:3000/api/';

  public getUsers(): Promise<User[]> {
  	// Put URL helping stuff in here (Like if we need the employeeID)
  	const url: string = `${this.apiBaseUrl}`;
  	return this.http
  		.get(url)
  		.toPromise()
  		.then(response => response as User[])
  		.catch(this.handleError);
  }
  private handleError (error: any): Promise<any> {
  	console.error('Something has gone wrong', error);
  	return Promise.reject(error.message || error );
  }
  public getUserbyID(userID: string ): Promise<User> {
    const url: string = `${this.apiBaseUrl}/employees/${userID}`;
    return this.http
      .get(url)
      .toPromise()
      .then(response => response as User)
      .catch(this.handleError);
  }

}

