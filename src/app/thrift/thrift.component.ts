import { Component, OnInit } from '@angular/core';
import { first } from 'rxjs/operators';
import { AccountService } from '../services/account.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-thrift',
  templateUrl: './thrift.component.html',
  styleUrls: ['./thrift.component.scss'],
  animations: [
    trigger('bodyExpansion', [
      state('collapsed, void', style({ height: '0px', visibility: 'hidden' })),
      state('expanded', style({ height: '*', visibility: 'visible' })),
      transition('expanded <=> collapsed, void => collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ])
  ]
})

export class ThriftComponent implements OnInit {

  products = null;

  title = 'shopinchain.com';

  state = 'collapsed';

  constructor(private accountService: AccountService) { }

  ngOnInit(): void {

    this.accountService.getAllproducts()
    .pipe(first())
    .subscribe(products => this.products = products);

  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.products.filter = filterValue.trim().toLowerCase();
  }

  toggle(): void {
    this.state = this.state === 'collapsed' ? 'expanded' : 'collapsed';
  }

}
