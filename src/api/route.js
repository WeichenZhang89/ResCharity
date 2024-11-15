import { MongoClient } from 'mongodb';

const targetPublicKey = "CAvCqZP5xqk7E9baKSvAoFZazYYjNbgrgtnDicVMb25i";

export async function GET() {
  const client = new MongoClient(process.env.MONGODB_URI || 'mongodb://localhost:27017');

  try {
    await client.connect();
    const db = client.db('myDatabase');
    const collection = db.collection('myCollection');

    // Get the latest block and inspect its transactions
    const latestBlock = await collection.findOne({}, { sort: { _id: -1 } });
    console.log('Latest block:', {
      id: latestBlock.id,
      transactionCount: latestBlock.transactions.length,
      firstTransaction: latestBlock.transactions[0]
    });

    const pipeline = [
      { $unwind: "$transactions" },
      { 
        $match: { 
          "$or": [
            //{ "transactions.value.inputs.owners_before": { $in: [targetPublicKey] } },
            { "transactions.value.outputs": { 
              $elemMatch: { 
                "public_keys.0": targetPublicKey 
              }
            }}
          ]
        }
      },
      { $sort: { "transactions.value.asset.data.timestamp": -1 } },
      { $project: { transaction: "$transactions", _id: 0 } }
    ];

    const transactions = await collection.aggregate(pipeline).toArray();
    console.log('Number of transactions found:', transactions.length);
    if (transactions.length > 0) {
      console.log('First transaction match:', JSON.stringify(transactions[0], null, 2));
    }

    return new Response(JSON.stringify(transactions), {
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Detailed error:', error);
    return new Response(JSON.stringify({ error: 'Failed to fetch transactions' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  } finally {
    await client.close();
  }
}