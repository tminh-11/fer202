import React, { useContext, useState, useMemo } from "react";
import { Container, Card, Table, Button, Form } from "react-bootstrap";
import { AuthContext } from "../contexts/AuthContext";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ExpenseForm from "../components/ExpenseForm";

export default function HomePage() {
  const { state, deleteExpense } = useContext(AuthContext);
  const [filterCategory, setFilterCategory] = useState("");
  const [editingExpense, setEditingExpense] = useState(null);

  const filteredExpenses = useMemo(() => {
    return state.expenses.filter((e) =>
      filterCategory ? e.category.toLowerCase().includes(filterCategory.toLowerCase()) : true
    );
  }, [state.expenses, filterCategory]);

  const total = filteredExpenses.reduce((sum, e) => sum + e.amount, 0);

  const formatDate = (dateStr) => {
    const [year, month, day] = dateStr.split("-");
    return `${day}-${month}-${year}`;
  };

  return (
    <>
      <Header />
      <Container className="my-4">
        <Card className="mb-3 text-center">
          <Card.Body>
            <Card.Title>Total Expenses</Card.Title>
            <h3>{total.toLocaleString("vi-VN")} VND</h3>
          </Card.Body>
        </Card>

        <Card className="mb-3">
          <Card.Body>
            <Form.Control
              placeholder="Filter by Category (e.g., Food)"
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
            />
          </Card.Body>
        </Card>

        <ExpenseForm editExpense={editingExpense} onSave={() => setEditingExpense(null)} />

        <Card>
          <Card.Body>
            <Card.Title>Expense List</Card.Title>
            <Table striped bordered hover responsive>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Date</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredExpenses.map((e) => (
                  <tr key={e.id}>
                    <td>{e.name}</td>
                    <td>{e.amount.toLocaleString("vi-VN")} VND</td>
                    <td>{e.category}</td>
                    <td>{formatDate(e.date)}</td>
                    <td>
                      <Button size="sm" variant="warning" onClick={() => setEditingExpense(e)}>
                        Edit
                      </Button>{" "}
                      <Button size="sm" variant="danger" onClick={() => deleteExpense(e.id)}>
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Container>
      <Footer />
    </>
  );
}