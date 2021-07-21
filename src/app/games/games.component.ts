import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-games',
  templateUrl: './games.component.html',
  styleUrls: ['./games.component.scss']
})
export class GamesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  GiveStar() {
    window.open('https://github.com/ng-es/Angular-Truffle-Dapp');
  }
}
