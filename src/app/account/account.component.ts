import { ContractService } from '../services/contract/contract.service';
import { Component } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Identicon } from '../services/identicon';
import { Md5 } from 'ts-md5/dist/md5';


@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent {
  
  direction: string;
  message;
  title = 'ShopInChain.com';
  accounts:any;
  originAccount = '0xf9cd7fc544036ebd4ec5dc622280f6e545b8d894';
  balance ='0 ';
  balance2 ='0 ';
  destinyAccount='';
  amount=0;
  remarks='';
 
  

  constructor(private contract: ContractService, private sanitizer: DomSanitizer) {
    this.initAndDisplayAccount()
  }
  

  getImage() {
    this.message = this.sanitizer.bypassSecurityTrustResourceUrl((
      'data:image/svg+xml; utf8,'
      + encodeURI(new Identicon(Md5.hashStr(this.direction), {size: 32, format: 'svg'}).toString(true))
    ));
  }

  navigateTo() {
    window.open('https://metamask.io/');
  }

  connectAccount() {
    console.warn('dio');
    this.contract.connectAccount().then((value: any) => {
      console.log(value);
      this.direction = value;
      this.getDetails(this.direction);
      this.getImage();
    }).catch((error: any) => {

    });
  }


  getDetails(account){
    this.contract.accountInfo(account).then((value:any) => {
      this.balance = value;
      this.balance2 = value;
      console.log(value);
    }).catch((error: any) => {
 
    });
  }
  

  initAndDisplayAccount = () => {
    let that = this;
    this.contract.getAccountInfo().then(function(acctInfo){
      this.originAccount,
      this.balance
      this.balance2
    }).catch(function(error){
      console.log(error);
    });
 
  };
 

}

