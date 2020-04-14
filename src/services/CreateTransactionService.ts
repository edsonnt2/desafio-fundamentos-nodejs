import TransactionsRepository from '../repositories/TransactionsRepository';
import Transaction from '../models/Transaction';

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class CreateTransactionService {
  private transactionsRepository: TransactionsRepository;

  constructor(transactionsRepository: TransactionsRepository) {
    this.transactionsRepository = transactionsRepository;
  }

  public execute({ title, type, value }: TransactionDTO): Transaction {
    const balance = this.transactionsRepository.getBalance();

    if (type === 'outcome' && balance.outcome + value > balance.income)
      throw Error(
        `Valor insuficiente ! Tem apenas ${balance.total} em caixa para saque.`,
      );

    const transaction = this.transactionsRepository.create({
      title,
      type,
      value,
    });

    return transaction;
  }
}

export default CreateTransactionService;
