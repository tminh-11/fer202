import React, { useState, useContext } from "react";
import { Form, Button, Card } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";

export default function ExpenseForm({ editExpense, onSave }) {
  const { state, addExpense, updateExpense } = useContext(AuthContext);
  const [name, setName] = useState(editExpense?.name || "");
  const [amount, setAmount] = useState(editExpense?.amount || "");
  const [category, setCategory] = useState(editExpense?.category || "");
  const [date, setDate] = useState(editExpense?.date || "");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!name || !category || !amount || amount <= 0) {
      alert("Vui lòng điền đầy đủ và hợp lệ");
      return;
    }
    const expense = {
      name,
      amount: Number(amount),
      category,
      date,
      userId: state.user.id,
      id: editExpense?.id,
    };
    if (editExpense) {
      await updateExpense(expense);
    } else {
      await addExpense(expense);
    }
    onSave();
  };

  return (
    <Card className="mb-3">
      <Card.Body>
        <Card.Title>{editExpense ? "Edit" : "Add"} Expense</Card.Title>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-2">
            <Form.Control placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control type="number" placeholder="Amount" value={amount} onChange={(e) => setAmount(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} />
          </Form.Group>
          <Form.Group className="mb-2">
            <Form.Control type="date" value={date} onChange={(e) => setDate(e.target.value)} />
          </Form.Group>
          <Button variant="success" type="submit">
            {editExpense ? "Update" : "Add"}
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}