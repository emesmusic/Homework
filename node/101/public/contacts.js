(async function () {
  'use strict';

  const contactsTable = document.querySelector('#contactsTable tbody');
  const firstInput = document.querySelector('#first');
  const lastInput = document.querySelector('#last');
  const emailInput = document.querySelector('#email');
  const phoneInput = document.querySelector('#phone');
  const addContactForm = document.querySelector('#addContactForm');

  let contacts = [];
  let contactsFromApi;
  try {
    const response = await fetch('http://localhost:3000/api/contacts');
    if (!response.ok) {
      throw new Error(`${response.status} - ${response.statusText}`)
    }
    contactsFromApi = await response.json();
    contactsFromApi.forEach(contact => {
      addContact(contact);
    });
  } catch (error) {
    document.getElementById('error-box').innerText = error;
  }


  addContactForm.addEventListener('submit', e => {
    e.preventDefault();
    addContact();
  });

  function addContact(contact) {
    if (!contacts.length) {
      contactsTable.deleteRow(0);
    }

    let newContact;
    if (contact) {
      newContact = contact;
    }
    else {
      newContact = {
        first: firstInput.value,
        last: lastInput.value,
        email: emailInput.value,
        phone: phoneInput.value,
      };
      addContactForm.reset();
    }
    contacts.push(newContact);
    const row = contactsTable.insertRow();
    row.innerHTML = `<td>${newContact.first}</td>
                     <td>${newContact.last}</td>
                     <td>${newContact.email}</td>
                     <td>${newContact.phone}</td>`;
  }



}());
