import axios from "axios";
import { API_URL, FETCH_TRANSACTION } from "./endpoints";

const client = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendRequest = async (query) => {
  try {
    const response = await client.post('', {
      query: query,
      variables: {}
    });
    
    console.log('Full API Response:', response);
    
    if (response.data.errors) {
      console.error('GraphQL Errors:', response.data.errors);
      throw new Error(response.data.errors[0].message);
    }
    
    return response.data.data;
  } catch (error) {
    console.error('Full error details:', {
      message: error.message,
      response: error.response?.data,
      status: error.response?.status
    });
    throw error;
  }
};

export const fetchTransactions = async () => {
  try {
    const query = `
      query GetFilteredTransactions {
        getFilteredTransactions(filter: {
          ownerPublicKey: "",
          recipientPublicKey: "CAvCqZP5xqk7E9baKSvAoFZazYYjNbgrgtnDicVMb25i"
        }) {
          id
          amount
          publicKey
        }
      }
    `;
    
    const data = await sendRequest(query);
    console.log('Transactions data:', data);
    return data?.getFilteredTransactions || [];
  } catch (error) {
    console.error('Error fetching transactions:', error);
    throw error;
  }
};

export const formatTransaction = (transaction) => ({
  id: transaction.id,
  amount: parseFloat(transaction.amount || '0'),
  publicKey: transaction.publicKey || 'Unknown'
});
