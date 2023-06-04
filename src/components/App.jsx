import React from "react";
import { nanoid } from 'nanoid'
import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import Filter from "./Filter/Filter";
import css from "./App.module.css";

class App extends React.Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  }
  
  handleSubmit = ({ name, number }) => {
    const { contacts } = this.state;
    if (contacts.some(contact => contact.name.toLowerCase() === name.toLowerCase()))
    {
      alert(`${name} is already in contacts.`);
      return;
    }
    this.setState({ contacts: [...contacts, { id: nanoid(), name: name, number: number }] });
  }

  handleFilter = evt => {
    this.setState({ filter: evt.target.value });
  }

  filterContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(({ name }) => name.toLowerCase().includes(filter.toLowerCase()))
  }

  handleDelete = id => {
    const { contacts } = this.state;
    this.setState({ contacts: contacts.filter(contact => contact.id !== id) });
  }

  render() {  
    return (
      <div>
        <h1 className={css.title}>Phonebook</h1>
        <ContactForm onAddContact={this.handleSubmit}/>
        <h2 className={css.title}>Contacts</h2>
        <Filter
          filter={this.state.filter}
          onFilter={this.handleFilter}
        />
        {this.state.contacts.length > 0
          ? (
            <ContactList
                contacts={this.filterContacts()} onDelete={this.handleDelete}/>
          )
          : (<p className={css.title}>There are no contacts.</p>)    
        }
      </div>
    );
  };
}  

export default App;