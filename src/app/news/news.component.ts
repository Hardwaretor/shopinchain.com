import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styleUrls: ['./news.component.scss']
})
export class NewsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  GiveStar() {
    window.open('https://github.com/ng-es/Angular-Truffle-Dapp');
  }
}
