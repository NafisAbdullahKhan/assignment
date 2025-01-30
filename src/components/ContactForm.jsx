import React, { useState, useEffect } from 'react';
import config from '../config.json';

const ContactForm = ({ setContacts, contacts }) => {
    const [form, setForm] = useState({ name: '', email: '', contact: '' });
    const [errors, setErrors] = useState({});
    const [currentContact, setCurrentContact] = useState(null);

    useEffect(() => {
        if (currentContact) {
            setForm(currentContact);
        } else {
            setForm({ name: '', email: '', contact: '' });
        }
    }, [currentContact]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    const validateForm = () => {
        const newErrors = {};
        if (!form.name.trim()) newErrors.name = 'Name is required';
        if (!form.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(form.email)) {
            newErrors.email = 'Email format is invalid';
        }
        if (!form.contact.trim()) {
            newErrors.contact = 'Contact is required';
        } else if (!/^\d{10}$/.test(form.contact)) {
            newErrors.contact = 'Contact number should be 10 digits';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleAddUpdate = () => {
        if (validateForm()) {
            const method = currentContact ? 'PUT' : 'POST';
            const endpoint = currentContact ? `${config.baseURL}/update/${currentContact.id}` : `${config.baseURL}/add`;

            fetch(endpoint, {
                method,
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(form),
            })
                .then(response => response.json())
                .then((data) => {
                    if (currentContact) {
                        setContacts(contacts.map(contact => (contact.id === data.id ? data : contact)));
                    } else {
                        setContacts([...contacts, data]);
                    }
                    setForm({ name: '', email: '', contact: '' });
                    setCurrentContact(null);
                })
                .catch(error => console.error('Error:', error));
        }
    };

    return (
        <div className="contact-form">
            <div className="form-group">
                <label>
                    Name
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                    />
                </label>
                {errors.name && <p className="error">{errors.name}</p>}
            </div>
            <div className="form-group">
                <label>
                    Email
                    <input
                        type="text"
                        name="email"
                        value={form.email}
                        onChange={handleInputChange}
                    />
                </label>
                {errors.email && <p className="error">{errors.email}</p>}
            </div>
            <div className="form-group">
                <label>
                    Contact
                    <input
                        type="text"
                        name="contact"
                        value={form.contact}
                        onChange={handleInputChange}
                    />
                </label>
                {errors.contact && <p className="error">{errors.contact}</p>}
            </div>
            <button className="btn-add-update" onClick={handleAddUpdate}>
                {currentContact ? 'Update' : 'Add'}
            </button>
        </div>
    );
};

export default ContactForm;