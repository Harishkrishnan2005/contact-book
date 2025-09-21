import React, { useState } from 'react';

export default function ContactForm({ onAdd }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');

  const validate = () => {
    if (!name.trim()) return 'Name is required';
    if (email && !/^\S+@\S+\.\S+$/.test(email)) return 'Invalid email';
    if (phone && !/^\+?[0-9 \-]{6,20}$/.test(phone)) return 'Invalid phone';
    return null;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const err = validate();
    if (err) return alert(err);
    onAdd({ name: name.trim(), email: email.trim() || null, phone: phone.trim() || null });
    setName(''); setEmail(''); setPhone('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <input value={name} placeholder="Name" onChange={(e) => setName(e.target.value)} />
      <input value={email} placeholder="Email (optional)" onChange={(e) => setEmail(e.target.value)} />
      <input value={phone} placeholder="Phone (optional)" onChange={(e) => setPhone(e.target.value)} />
      <button type="submit">Add</button>
    </form>
  );
}