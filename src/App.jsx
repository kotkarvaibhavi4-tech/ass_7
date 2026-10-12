import { useState } from 'react'
import './App.css'

function App() {
  const [expenses, setExpenses] = useState([])
  const [title, setTitle] = useState('')
  const [amount, setAmount] = useState('')
  const [category, setCategory] = useState('Food')
  const [date, setDate] = useState('')

  // Add expense
  const addExpense = (e) => {
    e.preventDefault()

    const newExpense = {
      id: Date.now(),
      title: title,
      amount: Number(amount),
      category: category,
      date: date
    }

    setExpenses([...expenses, newExpense])

    setTitle('')
    setAmount('')
    setCategory('Food')
    setDate('')
  }

  // Delete expense
  const deleteExpense = (id) => {
    setExpenses(expenses.filter((expense) => expense.id !== id))
  }

  // Calculate total expense
  const totalExpense = expenses.reduce(
    (total, expense) => total + expense.amount,
    0
  )

  // Calculate category-wise expenses
  const categoryTotals = {}

  expenses.forEach((expense) => {
    if (categoryTotals[expense.category]) {
      categoryTotals[expense.category] += expense.amount
    } else {
      categoryTotals[expense.category] = expense.amount
    }
  })

  return (
    <div className="container">
      <h1>Personal Expense Tracker</h1>

      {/* Expense Form */}
      <form onSubmit={addExpense}>
        <input
          type="text"
          placeholder="Expense title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option>Food</option>
          <option>Travel</option>
          <option>Shopping</option>
          <option>Education</option>
          <option>Other</option>
        </select>

        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <button type="submit">Add Expense</button>
      </form>

      {/* Total Expense */}
      <h2>Total Expenses: ₹{totalExpense}</h2>

      {/* Expense Analysis */}
      <h2>Expense Analysis</h2>

      <div className="analysis">
        {Object.keys(categoryTotals).map((category) => (
          <div className="analysis-item" key={category}>
            <strong>{category}</strong>
            <span>₹{categoryTotals[category]}</span>
          </div>
        ))}
      </div>

      {/* Expense List */}
      <h2>Expense List</h2>

      <div>
        {expenses.map((expense) => (
          <div className="expense" key={expense.id}>
            <h3>{expense.title}</h3>

            <p>Amount: ₹{expense.amount}</p>

            <p>Category: {expense.category}</p>

            <p>Date: {expense.date}</p>

            <button onClick={() => deleteExpense(expense.id)}>
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App