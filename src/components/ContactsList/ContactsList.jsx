import { useEffect } from 'react'
import { Button, Item, List } from './ContactsList.styled'
import { useSelector, useDispatch } from 'react-redux'
import { fetchContacts } from "redux/operations";
import { getError, getFilteredContacts, getIsLoading } from 'redux/contacts/contacts-selectors';
import { deleteContact } from 'redux/operations';

export default function ContactsList() {
    const contacts = useSelector(getFilteredContacts)
    const loading = useSelector(getIsLoading)
    const error = useSelector(getError)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchContacts())
    }, [dispatch])

    const removeContact = (id) => {
        const action = deleteContact(id);
        dispatch(action);
    }

    return (
        <List>
            {loading && <li>loading...</li>}
            {!error && contacts?.map(({ name, phone, id }) => {
                return (
                    <Item key={id}>{name}: {phone} <Button onClick={() => removeContact(id)}>delete</Button></Item>
                )
            })}
            {!loading && error && <li>Error</li>}
        </List>
    )
}
