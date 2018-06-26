import { Injectable } from "@angular/core";
import { IUser } from "./user.model";

@Injectable()
export class AuthService {
  
    currentUser: IUser

    login(username: string, password: string) {
        this.currentUser = {
            id: 1,
            firstName: 'John',
            lastName: 'Papa',
            userName: 'jpop'
        }
    }

    isAuthenticated() {
        return !! this.currentUser
    }

    updateCurrentUser(firstName: string, lastName: string): any {
        this.currentUser.firstName = firstName
        this.currentUser.lastName = lastName
      }
}