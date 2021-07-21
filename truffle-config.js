const { projectId, mnemonic,priv } = require('./secrets.json');
const HDWalletProvider = require('@truffle/hdwallet-provider');


module.exports = {
  
  compilers: {
    solc: {
      version: "0.7.0",    //<==========CHANGED THAT from "0.5.1"
      docker: false,        
      settings: {         
       optimizer: {
         enabled: false,
         runs: 200
       },
       evmVersion: "byzantium"
      }
    }
  },

  networks: {
    development: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 8545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    // Useful for deploying to a public network.
    // NB: It's important to wrap the provider as a function.
    Pyrmont: {
      provider: () => new HDWalletProvider(priv, `https://1pfdOuSorZyANa2XhDFavYNySyp:3d180030ece474204baa7580b4b042ff@eth2-beacon-pyrmont.infura.io`),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },

    Gorly: {
      provider: () => new HDWalletProvider(priv, `https://goerli.infura.io/v3/fbfa1c6cf206438ead1b60c402336c8d`),
      network_id: 5,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },

    Ropsten: {
      provider: () => new HDWalletProvider(priv, `https://ropsten.infura.io/v3/fbfa1c6cf206438ead1b60c402336c8d`),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
    
   },
 };