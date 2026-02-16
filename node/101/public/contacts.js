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
  } catch (error) {
    document.getElementById('error-box').innerText = error;
  }

  if (contactsFromApi.length > 0) {
    if (!contacts.length) {
      contactsTable.deleteRow(0);
    }
    contactsFromApi.forEach(contact => {
      const newContact = {
        first: contact.first,
        last: contact.last,
        email: contact.email,
        phone: contact.phone,
      };
      contacts.push(newContact);
      const row = contactsTable.insertRow();
      row.innerHTML = `<td>${newContact.first}</td>
                     <td>${newContact.last}</td>
                     <td>${newContact.email}</td>
                     <td>${newContact.phone}</td>`;
    });
  }


  addContactForm.addEventListener('submit', e => {
    e.preventDefault();

    if (!contacts.length) {
      contactsTable.deleteRow(0);
    }

    const newContact = {
      first: firstInput.value,
      last: lastInput.value,
      email: emailInput.value,
      phone: phoneInput.value,
    };

    contacts.push(newContact);

    /*const newRow = document.createElement('tr');
    const firstCell = document.createElement('td');
    firstCell.innerText = 'Donald';
    newRow.appendChild(firstCell);
    contactsTable.appendChild(newRow);*/

    const row = contactsTable.insertRow();
    /*const first = row.insertCell();
    first.innerText = 'Donald';
    const last = row.insertCell();
    last.innerText = 'Trump';*/

    row.innerHTML = `<td>${newContact.first}</td>
                     <td>${newContact.last}</td>
                     <td>${newContact.email}</td>
                     <td>${newContact.phone}</td>`;

    /*firstInput.value = '';
    lastInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';*/

    addContactForm.reset();
  });

}());
