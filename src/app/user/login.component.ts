import { Component } from "@angular/core";
import { AuthService } from "./auth.service";
import { Router } from "@angular/router";

@Component({
    templateUrl: './login.component.html',
    styles: [`
    em { float:right; color: #E05c65; padding-left:10px; }
    `],
})
export class LoginComponent {
    public userName: string
    public password: string
    public mouseOverLogin: boolean
    public loginInvalid: boolean = false

    constructor(private authService: AuthService, private router: Router) {

    }

    login(value) {
        console.log(value);
        this.authService.login(value.userName, value.password)
            .subscribe( resp => {
                debugger;
                if(!resp) {
                    this.loginInvalid = true;
                } else {
                    this.router.navigate(['events'])
                }
            })
    }

    cancel() {
        this.router.navigate(['events'])
    }
}