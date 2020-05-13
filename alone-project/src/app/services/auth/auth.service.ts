import { Injectable, EventEmitter } from '@angular/core';
import { User } from 'src/app/interfaces/user';
import { Router } from '@angular/router';
import { DataService } from '../data/data.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  public connectedUser: User;
  public onUserConnected: EventEmitter<User> = new EventEmitter();

  constructor(
    public router: Router,
    private data: DataService,
  ) {
    console.log(this.data.users);
  }

  /**
  * Authentifie un utilisateur par son pseudo et son mot de passe
  *
  * @param {string} username
  * @param {string} password
  * @returns {boolean}
  * @memberof AuthService
  */
  public auth(username: string, password: string): boolean {
    const user = this.data.users.filter((u) => u.username === username && u.password === password);
    if (user.length > 0) {
      this.connectedUser = user[0];
      this.onUserConnected.emit(this.connectedUser);
      return true;
    } else {
      return false;
    }
  }

  /**
  * Déconnecte l'utilisateur
  *
  * @returns {boolean}
  * @memberof AuthService
  */
  public logout(): boolean {
    this.connectedUser = null;
    this.onUserConnected.emit(this.connectedUser);
    if (this.connectedUser == null) {
      return true;
    } else {
      return false;
    }
  }

}
