import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';
import AllTransactionService from '../services/AllTransactionService';

const transactionRouter = Router();

const transactionsRepository = new TransactionsRepository();
const createTransactionService = new CreateTransactionService(
  transactionsRepository,
);
const allTransactionService = new AllTransactionService(transactionsRepository);

transactionRouter.get('/', (request, response) => {
  try {
    const transactions = allTransactionService.execute();
    return response.json(transactions);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  const { title, value, type } = request.body;
  try {
    const transaction = createTransactionService.execute({
      title,
      type,
      value,
    });
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
