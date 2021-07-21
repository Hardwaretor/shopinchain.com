import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-nft',
  templateUrl: './nft.component.html',
  styleUrls: ['./nft.component.scss']
})
export class NftComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  GiveStar() {
    window.open('https://github.com/ng-es/Angular-Truffle-Dapp');
  }
}
