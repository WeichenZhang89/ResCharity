export const API_URL = 'https://cloud.resilientdb.com/graphql';


// Post transaction mutation with proper typing
// export const POST_TRANSACTION = (metadata, asset) => `
//   mutation {
//     postTransaction(data: {
//       operation: "CREATE",
//       amount: ${metadata?.amount || 1},
//       signerPublicKey: "${metadata?.signerPublicKey}",
//       signerPrivateKey: "${metadata?.signerPrivateKey}",
//       recipientPublicKey: "${metadata?.recipientPublicKey}",
//       asset: """{
//         "data": ${JSON.stringify(asset)}
//       }"""
//     }) {
//       id
//       timestamp
//       amount
//       status
//     }
//   }
// `;

// Fetch transactions with optional filtering
export const FETCH_TRANSACTION = (filters = {}) => `
  query { 
    getFilteredTransactions(filter: {
      ownerPublicKey: "${filters.signerPublicKey || ''}",
      recipientPublicKey: "${filters.recipientPublicKey || ''}"
    }) {
      id
      amount
      publicKey
    }
  }
`;
