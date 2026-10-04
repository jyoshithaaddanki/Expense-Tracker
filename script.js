let transactions = JSON.parse(localStorage.getItem("transactions")) || [];

function addTransaction() {
    const description = document.getElementById("description").value.trim();
    const amount = Number(document.getElementById("amount").value);
    const type = document.getElementById("type").value;
    const category = document.getElementById("category").value;

    if (description === "" || amount <= 0) {
        alert("Please enter a valid description and amount.");
        return;
    }

    const transaction = {
        id: Date.now(),
        description: description,
        amount: amount,
        type: type,
        category: category
    };

    transactions.push(transaction);

    saveTransactions();
    displayTransactions();

    document.getElementById("description").value = "";
    document.getElementById("amount").value = "";
}

function displayTransactions() {
    const list = document.getElementById("transactionList");

    list.innerHTML = "";

    let income = 0;
    let expense = 0;

    transactions.forEach(transaction => {

        if (transaction.type === "income") {
            income += transaction.amount;
        } else {
            expense += transaction.amount;
        }

        const li = document.createElement("li");

        li.className = `transaction ${transaction.type}`;

        const sign = transaction.type === "income" ? "+" : "-";

        li.innerHTML = `
            <div class="transaction-info">
                <strong>${transaction.description}</strong>
                <small>${transaction.category}</small>
            </div>

            <div>
                <span class="amount">
                    ${sign}₹${transaction.amount.toFixed(2)}
                </span>

                <button class="delete-btn"
                        onclick="deleteTransaction(${transaction.id})">
                    Delete
                </button>
            </div>
        `;

        list.appendChild(li);
    });

    const balance = income - expense;

    document.getElementById("income").textContent =
        `₹${income.toFixed(2)}`;

    document.getElementById("expense").textContent =
        `₹${expense.toFixed(2)}`;

    document.getElementById("balance").textContent =
        `₹${balance.toFixed(2)}`;
}

function deleteTransaction(id) {
    transactions = transactions.filter(
        transaction => transaction.id !== id
    );

    saveTransactions();
    displayTransactions();
}

function saveTransactions() {
    localStorage.setItem(
        "transactions",
        JSON.stringify(transactions)
    );
}

displayTransactions();