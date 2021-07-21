import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import * as TruffleContract from 'truffle-contract';

import Web3Modal from "web3modal";
import WalletConnectProvider from "@walletconnect/web3-provider";
import Tx from "ethereumjs-tx"

const { priv } = require('../../../../secrets.json');

declare let require: any;
const Web3 = require('web3');
const tokenAbi = require('../../../../build/contracts/Payment.json');
declare let window: any;
const Tx = require('ethereumjs-tx');

declare const Buffer
const privBuffer = Buffer.from(priv, 'hex')
console.log('Buffer: ', privBuffer)

if (window.ethereum) {
  handleEthereum();
} else {
  window.addEventListener('ethereum#initialized', handleEthereum, {
    once: true,
  });

  // If the event is not dispatched by the end of the timeout,
  // the user probably doesn't have MetaMask installed.
  setTimeout(handleEthereum, 3000); // 3 seconds
}

function handleEthereum() {
  const { ethereum } = window;
  if (ethereum && ethereum.isMetaMask) {
    console.log('Ethereum successfully detected!');
    // Access the decentralized web!
  } else {
    console.log('Please install MetaMask!');
  }
}



@Injectable({
  providedIn: 'root'
  
})

export class ContractService {
  private readonly web3Provider: null;
  public accountsObservable = new Subject<string[]>();
  public compatible: boolean;
  
  web3js;
  web3Modal;
  provider;
  accounts;
  balance;
  
  
  

  constructor(private snackbar: MatSnackBar) {
    
    const providerOptions = {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          infuraId: "fbfa1c6cf206438ead1b60c402336c8d" // required
          
        }
        
      }
    };

    

    this.web3Modal = new Web3Modal({
      network: "mainnet", // optional
      cacheProvider: true, // optional
      providerOptions, // required
      theme: {
        background: "rgb(39, 49, 56)",
        main: "rgb(199, 199, 199)",
        secondary: "rgb(136, 136, 136)",
        border: "rgba(195, 195, 195, 0.14)",
        hover: "rgb(16, 26, 32)"
      }
    });
  }



  async connectAccount() {
    this.provider = await this.web3Modal.connect(); // set provider
    this.web3js = new Web3(this.provider); // create web3 instance
    this.accounts = await this.web3js.eth.getAccounts();
    return this.accounts;
  }

  async accountInfo(accounts){
    this.balance = await this.web3js.eth.getBalance(accounts[0]);
    return this.balance;
  }


  getAccountInfo(

  ) {
    
    return new Promise((resolve, reject) => {
      window.web3.eth.getCoinbase(function(err, account) {
 
        if(err === null) {
          Web3.eth.getBalance(account, function(err, balance) {
            if(err === null) {
              return resolve({fromAccount: account, balance:Web3.fromWei(balance, "ether")});
            } else {
              return reject("error!");
            }
          });
        }
      });
    });
  }

  transferEther(
    originAccount,
    destinyAccount,
    amount,
    _remarks,
  ) {
    const that = this;

    return new Promise((resolve, reject) => {
      let paymentContract = TruffleContract(tokenAbi);
      paymentContract.setProvider(new Web3.providers.HttpProvider('https://goerli.infura.io/v3/fbfa1c6cf206438ead1b60c402336c8d')),
 
      paymentContract.deployed().then((instance) => {
        return instance.nuevaTransaccion(
          destinyAccount,
          {
            from: originAccount,
            value: Web3.utils.toWei(amount, 'ether')
          });
      }).then((status) => {
        if (status) {
          return resolve({ status: true });
        }

                  // Sign the transaction
    const tx = new Tx(status);
    tx.sign(privBuffer);

    const serializedTx = tx.serialize();
    const raw = '0x' + serializedTx.toString('hex');

    // Broadcast the transaction
    const nuevaTransaccion = window.web3.eth.sendSignedTransaction(raw, (err, tx) => {
        console.log(tx)
        console.log('tx :', tx)
        console.log('serializedTx :', serializedTx)
        console.log('raw :', raw)
    });

      }).catch((error) => {
        console.log(error);

        return reject('Error transferring Ether');
      });

    });
  }

  failure(message: string) {
    const snackbarRef = this.snackbar.open(message);
    snackbarRef.dismiss()
  }

  succes() {
    const snackbarRef = this.snackbar.open('Transaction complete successfully');
    snackbarRef.dismiss()
  }

  
}

