import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ContactForm from './ContactForm';
import config from '../config.json';
import '../css/ContactManager.css';

const ContactManager = () => {
    const [contacts, setContacts] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetch(`${config.baseURL}/users`)
            .then(response => response.json())
            .then(data => setContacts(data))
            .catch(error => console.error('Error fetching contacts:', error));
    }, []);

    const handleDelete = (id) => {
        fetch(`${config.baseURL}/delete/${id}`, {
            method: 'DELETE',
        })
            .then(response => response.json())
            .then(() => setContacts(contacts.filter(contact => contact.id !== id)))
            .catch(error => console.error('Error deleting contact:', error));
    };

    return (
        <div className="contact-manager">
            <ContactForm setContacts={setContacts} contacts={contacts} />
            <table className="contact-table">
                <thead>
                    <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Contact</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {contacts.map(contact => (
                        <tr key={contact.id}>
                            <td>{contact.id}</td>
                            <td>{contact.name}</td>
                            <td><a href={`mailto:${contact.email}`}>{contact.email}</a></td>
                            <td>{contact.contact}</td>
                            <td>
                                <button onClick={() => navigate(`/contact-detail/${contact.id}`)}>View</button>
                                <button onClick={() => navigate(`/contact-detail/${contact.id}`)}>Update</button>
                                <button onClick={() => handleDelete(contact.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ContactManager;