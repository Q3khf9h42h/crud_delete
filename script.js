// Load appointments from local storage
var appointments = JSON.parse(localStorage.getItem('appointments')) || [];

// Function to save appointments to local storage
function saveAppointments() {
    const data= axios.get("https://crudcrud.com/api/dcddf69ffaca44f78941aed68e4c589a/appointmentData")
    .then((response)=>{
        console.log(response)
        addAppointment(response.data[i])
    })
    .catch((error) =>{
        console.log(error)
    })
    console.log(data)
    localStorage.setItem('appointments', JSON.stringify(appointments));
}

// Function to add an appointment
function addAppointment() {
    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var phoneInput = document.getElementById('phone');

    var name = nameInput.value;
    var email = emailInput.value;
    var phone = phoneInput.value;

    var appointment = {
        name: name,
        email: email,
        phone: phone
    };
    

    appointments.push(appointment);

    nameInput.value = '';
    emailInput.value = '';
    phoneInput.value = '';

    saveAppointments();
    updateAppointmentList();
}

// Function to delete an appointment
function deleteAppointment(index) {
    const data= axios.delete("https://crudcrud.com/api/dcddf69ffaca44f78941aed68e4c589a/appointmentData")
    .then((response)=>{
        console.log(response)
        addAppointment(response.data[i])
    })
    .catch((error) =>{
        console.log(error)
    })
    console.log(data)
    
    appointments.splice(index, 1);
    saveAppointments();
    updateAppointmentList();
}

// Function to edit an appointment
function editAppointment(index) {
    var appointment = appointments[index];

    var nameInput = document.getElementById('name');
    var emailInput = document.getElementById('email');
    var phoneInput = document.getElementById('phone');

    nameInput.value = appointment.name;
    emailInput.value = appointment.email;
    phoneInput.value = appointment.phone;

    document.getElementById('addBtn').style.display = 'none';
    var updateBtn = document.getElementById('updateBtn');
    updateBtn.style.display = 'inline-block';
    updateBtn.onclick = function() {
        appointment.name = nameInput.value;
        appointment.email = emailInput.value;
        appointment.phone = phoneInput.value;
        updateBtn.style.display = 'none';
        document.getElementById('addBtn').style.display = 'inline-block';
        saveAppointments();
        updateAppointmentList();
        nameInput.value = '';
        emailInput.value = '';
        phoneInput.value = '';
    };
}

// Function to update the appointment list
function updateAppointmentList() {
    var appointmentsList = document.getElementById('appointments');
    appointmentsList.innerHTML = '';

    for (var i = 0; i < appointments.length; i++) {
        var appointment = appointments[i];

        var listItem = document.createElement('li');
        listItem.innerHTML = appointment.name + ' - ' + appointment.email + ' - ' + appointment.phone;

        var actionButtons = document.createElement('div');
        actionButtons.classList.add('action-buttons');

        var deleteButton = document.createElement('button');
        deleteButton.innerHTML = 'Delete';
        deleteButton.onclick = (function(index) {
            return function() {
                deleteAppointment(index);
            };
        })(i);

        var editButton = document.createElement('button');
        editButton.innerHTML = 'Edit';
        editButton.onclick = (function(index) {
            return function() {
                editAppointment(index);
            };
        })(i);

        actionButtons.appendChild(editButton);
        actionButtons.appendChild(deleteButton);
        listItem.appendChild(actionButtons);

        appointmentsList.appendChild(listItem);
    }
}

// Load appointments on page load
updateAppointmentList();
