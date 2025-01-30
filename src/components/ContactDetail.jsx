import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setContact } from '../actions';
import NotFound from './NotFound';
import config from '../config.json';
import '../css/ContactDetail.css';

const ContactDetail = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const contacts = useSelector(state => state.contacts);
    const [contact, setContactState] = useState(null);

    useEffect(() => {
        const fetchContact = async () => {
            if (!contacts.length) {
                try {
                    const response = await fetch(`${config.baseURL}/users/${id}`);
                    const data = await response.json();
                    dispatch(setContact(data));
                    setContactState(data);
                } catch (error) {
                    console.error('Error fetching contact:', error);
                    setContactState(null);
                }
            } else {
                const existingContact = contacts.find(contact => contact.id === parseInt(id));
                if (existingContact) {
                    setContactState(existingContact);
                } else {
                    setContactState(null);
                }
            }
        };

        fetchContact();
    }, [dispatch, contacts, id]);

    if (!contact) {
        return <NotFound />;
    }

    return (
        <div className="contact-detail">
            <h2>Contact Details</h2>
            <p><strong>ID:</strong> {contact.id}</p>
            <p><strong>Name:</strong> {contact.name}</p>
            <p><strong>Email:</strong> {contact.email}</p>
            <p><strong>Contact:</strong> {contact.contact}</p>
            <button onClick={() => window.history.back()}>&lt; Back</button>
        </div>
    );
};

export default ContactDetail;