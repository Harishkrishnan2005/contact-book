import React, { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm';
import ContactList from './components/ContactList';
import Pagination from './components/Pagination';
import api from './services/api';

function App() {
  const [contacts, setContacts] = useState([]);
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [total, setTotal] = useState(0);

  const fetchContacts = async (p = page) => {
    try {
      const res = await api.getContacts(p, limit);
      setContacts(res.contacts);
      setTotal(res.total);
      setPage(res.page);
    } catch (err) {
      console.error(err);
      alert('Failed to fetch contacts');
    }
  };

  useEffect(() => {
    fetchContacts(1);
  }, []);

  const handleAdd = async (contact) => {
    try {
      await api.createContact(contact);
      fetchContacts(1);
    } catch (err) {
      console.error(err);
      alert('Failed to add contact');
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this contact?')) return;
    try {
      await api.deleteContact(id);
      const newPage = contacts.length === 1 && page > 1 ? page - 1 : page;
      fetchContacts(newPage);
    } catch (err) {
      console.error(err);
      alert('Failed to delete contact');
    }
  };

  return (
    <div className="container">
      <h1>Contact Book</h1>
      <ContactForm onAdd={handleAdd} />
      <ContactList contacts={contacts} onDelete={handleDelete} />
      <Pagination
        page={page}
        limit={limit}
        total={total}
        onPageChange={(p) => fetchContacts(p)}
      />
    </div>
  );
}

export default App;