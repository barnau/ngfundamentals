import { Injectable } from "@angular/core";
import { IUser } from "./user.model";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { tap, catchError } from "rxjs/operators";
import { of } from "rxjs/observable/of";

@Injectable()
export class AuthService {
  
  
    currentUser: IUser
    options: any = {'headers': new HttpHeaders({'Content-Type': 'application/json'})}

    constructor(private http: HttpClient) {

    }

    checkAuthenticationStatus(): any {
        this.http.get('/api/currentIdentity')
            .pipe(tap(data => {
                if(data instanceof Object)
                    this.currentUser = <IUser>data
            }))
            .subscribe()
    }

    login(userName: string, password: string) {
        let loginInfo = { username: userName, password: password}

        return this.http.post('/api/login', loginInfo, this.options)
            .pipe(tap(data => {
                this.currentUser = <IUser>data['user']
            }))
            .pipe(catchError(err => { return of(false)}))
        
    }

    isAuthenticated() {
        return !! this.currentUser
    }

    updateCurrentUser(firstName: string, lastName: string): any {
        this.currentUser.firstName = firstName
        this.currentUser.lastName = lastName

        
        return this.http.put(`api/users/${this.currentUser.id}`, this.currentUser, this.options)
      }

      logout() {
          this.currentUser = undefined;
          return this.http.post('/api/logout',{}, this.options)
      }
}