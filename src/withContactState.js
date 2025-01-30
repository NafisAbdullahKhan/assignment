import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { addContact, updateContact, deleteContact, setContacts } from './actions';

const withContactState = (WrappedComponent) => {
    return (props) => {
        const contacts = useSelector((state) => state.contacts);
        const dispatch = useDispatch();

        useEffect(() => {
            if (contacts.length === 0) {
                // Fetch data from a JSON file
                const fetchData = async () => {
                    try {
                        const response = await fetch('/path/to/your/contacts.json');
                        const data = await response.json();
                        dispatch(setContacts(data));
                    } catch (error) {
                        console.error('Error fetching contacts:', error);
                        const data = [
                            {
                                "id": 1,
                                "name": "Maria Anders",
                                "email": "maria@test.com",
                                "contact": "030-0074321"
                            },
                            {
                                "id": 2,
                                "name": "Antonio Moreno",
                                "email": "Antonio@gmail.com",
                                "contact": "(5) 555-3932"
                            },
                            {
                                "id": 3,
                                "name": "Thomas Hardy",
                                "email": "thomas@yahoo.com",
                                "contact": "(171) 555-7788"
                            },
                            {
                                "id": 4,
                                "name": "Christina Berglund",
                                "email": "christina@email.com",
                                "contact": "0921-12 34 65"
                            }
                        ]
                        dispatch(setContacts(data));
                    }
                };

                fetchData();
            }
        }, [contacts.length, dispatch]);

        const handleAddContact = (contact) => {
            dispatch(addContact(contact));
        };

        const handleUpdateContact = (contact) => {
            dispatch(updateContact(contact));
        };

        const handleDeleteContact = (id) => {
            dispatch(deleteContact(id));
        };

        return (
            <WrappedComponent
                contacts={contacts}
                addContact={handleAddContact}
                updateContact={handleUpdateContact}
                deleteContact={handleDeleteContact}
                {...props}
            />
        );
    };
};

export default withContactState;