import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface RequestDTO {
  transactions: Transaction[];
  balance: Balance;
}

class AllTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute(): RequestDTO {
    const transaction = this.transactionsRepository.all();
    const balance = this.transactionsRepository.getBalance();
    const transactions = {
      transactions: transaction,
      balance,
    };
    return transactions;
  }
}

export default AllTransactionService;
