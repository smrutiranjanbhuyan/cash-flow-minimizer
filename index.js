class MaxHeap {
    constructor() {
        this.heap = [];
    }

    insert(element) {
        this.heap.push(element);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].balance <= this.heap[parentIndex].balance) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    extractMax() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const max = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return max;
    }

    bubbleDown() {
        let index = 0;
        const length = this.heap.length;
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let largestIndex = index;

            if (leftChildIndex < length && this.heap[leftChildIndex].balance > this.heap[largestIndex].balance) {
                largestIndex = leftChildIndex;
            }
            if (rightChildIndex < length && this.heap[rightChildIndex].balance > this.heap[largestIndex].balance) {
                largestIndex = rightChildIndex;
            }
            if (largestIndex === index) break;

            [this.heap[index], this.heap[largestIndex]] = [this.heap[largestIndex], this.heap[index]];
            index = largestIndex;
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

class MinHeap {
    constructor() {
        this.heap = [];
    }

    insert(element) {
        this.heap.push(element);
        this.bubbleUp();
    }

    bubbleUp() {
        let index = this.heap.length - 1;
        while (index > 0) {
            const parentIndex = Math.floor((index - 1) / 2);
            if (this.heap[index].balance >= this.heap[parentIndex].balance) break;
            [this.heap[index], this.heap[parentIndex]] = [this.heap[parentIndex], this.heap[index]];
            index = parentIndex;
        }
    }

    extractMin() {
        if (this.heap.length === 0) return null;
        if (this.heap.length === 1) return this.heap.pop();

        const min = this.heap[0];
        this.heap[0] = this.heap.pop();
        this.bubbleDown();
        return min;
    }

    bubbleDown() {
        let index = 0;
        const length = this.heap.length;
        while (true) {
            const leftChildIndex = 2 * index + 1;
            const rightChildIndex = 2 * index + 2;
            let smallestIndex = index;

            if (leftChildIndex < length && this.heap[leftChildIndex].balance < this.heap[smallestIndex].balance) {
                smallestIndex = leftChildIndex;
            }
            if (rightChildIndex < length && this.heap[rightChildIndex].balance < this.heap[smallestIndex].balance) {
                smallestIndex = rightChildIndex;
            }
            if (smallestIndex === index) break;

            [this.heap[index], this.heap[smallestIndex]] = [this.heap[smallestIndex], this.heap[index]];
            index = smallestIndex;
        }
    }

    isEmpty() {
        return this.heap.length === 0;
    }
}

class CashFlowMinimizer {
    static minCashFlow(transactions) {
        const netBalance = new Map();

        // Step 1: Calculate net balance for each person
        transactions.forEach(([lender, borrower, amount]) => {
            netBalance.set(lender, (netBalance.get(lender) || 0) + amount);
            netBalance.set(borrower, (netBalance.get(borrower) || 0) - amount);
        });

        // Step 2: Separate creditors and debtors into heaps
        const creditorsHeap = new MaxHeap();
        const debtorsHeap = new MinHeap();

        netBalance.forEach((balance, person) => {
            if (balance > 0) {
                creditorsHeap.insert({ name: person, balance });
            } else if (balance < 0) {
                debtorsHeap.insert({ name: person, balance });
            }
        });

        const finalTransactions = [];
        let totalSettled = 0;

        // Step 3: Minimize transactions
        while (!creditorsHeap.isEmpty() && !debtorsHeap.isEmpty()) {
            const creditor = creditorsHeap.extractMax();
            const debtor = debtorsHeap.extractMin();

            const settleAmount = Math.min(creditor.balance, -debtor.balance);
            totalSettled += settleAmount;

            // Record the transaction
            finalTransactions.push({ from: debtor.name, to: creditor.name, amount: settleAmount });

            // Update balances
            creditor.balance -= settleAmount;
            debtor.balance += settleAmount;

            // If creditor still has balance, reinsert into heap
            if (creditor.balance > 0) {
                creditorsHeap.insert(creditor);
            }

            // If debtor still owes money, reinsert into heap
            if (debtor.balance < 0) {
                debtorsHeap.insert(debtor);
            }
        }

        return {
            totalSettled,
            transactions: finalTransactions,
        };
    }
}

module.exports = CashFlowMinimizer;
