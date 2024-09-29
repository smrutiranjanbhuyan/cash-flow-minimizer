
# Cash Flow Minimizer

**Cash Flow Minimizer** is a powerful Node.js utility designed to simplify and optimize financial transactions between a group of people. It helps reduce the total number of payments required to settle debts, ensuring the most efficient cash flow by finding the minimal number of transactions.

## Table of Contents
1. [Features](#features)
2. [Installation](#installation)
3. [Usage](#usage)
    - [Basic Example](#basic-example)
    - [Detailed Example](#detailed-example)
4. [API Reference](#api-reference)
5. [Contributing](#contributing)
6. [License](#license)

## Features
- **Minimizes transactions**: Reduces the number of transactions to settle debts with minimal payments.
- **Customizable input**: Handles arbitrary numbers of lenders, borrowers, and transaction amounts.
- **Easy to integrate**: Simple and intuitive API, easy to integrate with any Node.js application.

## Installation

Install the package via npm:

```bash
npm install  debt-credit-balancer
```

## Usage

You can use the Cash Flow Minimizer by importing it into your Node.js project. The main function `minCashFlow` accepts an array of transactions and returns the minimal number of payments required.

### Basic Example

Here is a simple example to get you started:

```javascript
const CashFlowMinimizer = require('debt-credit-balancer');

const transactions = [
    ['A', 'B', 100],
    ['B', 'C', 200],
    ['C', 'A', 50],
    ['C', 'B', 150],
];

const result = CashFlowMinimizer.minCashFlow(transactions);
console.log(result);
```

### Output:
```
Person A pays Person B: 100
Person B pays Person C: 200
Person C pays Person A: 50
Person C pays Person B: 150
```

### Detailed Example

Let’s say you have a group of friends sharing expenses during a trip, and you want to settle debts with the fewest payments. Here’s how Cash Flow Minimizer can help:

```javascript
const transactions = [
    ['Alice', 'Bob', 300],
    ['Bob', 'Charlie', 200],
    ['Charlie', 'Alice', 100],
    ['Charlie', 'Bob', 150],
    ['Alice', 'Charlie', 250],
];

const result = CashFlowMinimizer.minCashFlow(transactions);
result.forEach(transaction => console.log(transaction));
```

### Output:
```
Charlie pays Alice: 150
Charlie pays Bob: 150
Bob pays Alice: 50
```

## API Reference

### `minCashFlow(transactions)`

This is the main method used to calculate the minimal transactions required to settle all debts.

#### Parameters:
- **transactions** (Array): A list of transactions where each entry is an array `[lender, borrower, amount]`.
  - **lender** (String): The person lending the money.
  - **borrower** (String): The person borrowing the money.
  - **amount** (Number): The amount of money involved in the transaction.

#### Returns:
- **Array**: A list of strings representing the minimal set of transactions required to settle all debts.

### Example:

```javascript
const transactions = [
    ['Tom', 'Jerry', 500],
    ['Jerry', 'Spike', 300],
    ['Spike', 'Tom', 200],
];

const result = CashFlowMinimizer.minCashFlow(transactions);
result.forEach(transaction => console.log(transaction));
```

#### Output:
```
Jerry pays Spike: 300
Spike pays Tom: 200
Jerry pays Tom: 300
```

### Why This Works

The algorithm calculates the net balance for each person based on the provided transactions. It separates creditors and debtors, then matches them optimally to minimize the number of transactions required.

## Contributing

Contributions are welcome! If you find bugs, have feature requests, or want to contribute improvements, please open an issue or a pull request on [GitHub](https://github.com/smrutiranjanbhuyan/cash-flow-minimizer/issues).

## License

This project is licensed under the **ISC License**. See the [LICENSE](LICENSE) file for details.
