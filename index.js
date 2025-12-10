
// Registration part

let registered_user = null;
let current_user = null;
let selected_doctor = null;

const doctors = [
    {
        id:1,
        name: "Dr. Ayesha Rahman",
        speciality: "Cardiologist",
        time: "10:00 Am - 12:00 Am"
    },
    {
        id:2,
        name: "Dr. Abidur Rahim",
        speciality: "Neurologist",
        time: "12:00 Pm - 2:00 Pm"
    },
    {
        id:3,
        name: "Dr. Maruf Hasan",
        speciality: "Pediatrician",
        time: "2:00 PM - 4:00 Pm"
    },
    {
        id:4,
        name: "Dr. Momin Chowdhury",
        speciality: "Cardiologist",
        time: "5:00 Pm - 7:00 Pm"
    },
    {
        id:5,
        name: "Dr. Jamilur Reza",
        speciality: "Cardiologist",
        time: "8:00 Pm - 11:00 Pm"
    }

]

function handle_register(event){

    event.preventDefault();

    const name = document.getElementById("reg_name").value;
    const email = document.getElementById("reg_email").value;
    const password = document.getElementById("reg_pass").value;

    if(!name || !email || !password){
        alert("Please fill all the informations. ");
        return;
    }

    registered_user = {
        name: name,
        email: email,
        password: password
    };

    alert("Registration Successful!");
    document.getElementById("registration_form").reset();
}

document.getElementById("registration_form").addEventListener("submit",handle_register);


// Login part

function handle_login(event){
    event.preventDefault();

    current_user = registered_user;

    const email = document.getElementById("log_email").value;
    const password = document.getElementById("log_pass").value;
    const error = document.getElementById("log_error");

    if(!registered_user){
        error.textContent = "No user registered yet";
        return;
    }

    if(email === registered_user.email && password === registered_user.password){
        error.textContent = "";
        alert("Login Successful!");
        document.getElementById("login_form").reset();
        show_app_section();
        loadDoctors();
    }else{
        error.textContent = "Invalid Email or Password";
    }
}

document.getElementById("login_form").addEventListener("submit",handle_login);



// Application part





function show_app_section(){

    document.getElementById("auth_section").classList.add("hidden");
    document.getElementById("app_section").classList.remove("hidden");
    document.getElementById("user_name").textContent = current_user.name;
    document.getElementById("booking_message").textContent = "";
}

function show_auth_section(){
    document.getElementById("auth_section").classList.remove("hidden");
    document.getElementById("reg_section").classList.add("hidden");
    document.getElementById("log_error").textContent = "";
}


// Show Doctor list

function loadDoctors(){
    const listDiv = document.getElementById("doctor_list");
    listDiv.innerHTML = "";

    for(let i =0;i<doctors.length;i++){
        const doc = doctors[i];

        const card = document.createElement("div");
        card.className = "doctor_card";

        const info = document.createElement("p");
        info.innerHTML = "<strong>" + doc.name + "</strong><br>" + doc.speciality + "<br>" + "Time : "+doc.time;

        const btn = document.createElement("button");
        btn.textContent = "Select Doctor";
        btn.onclick = function(){
            select_doctor(doc);
        };

        card.appendChild(info);
        card.appendChild(btn);
        listDiv.appendChild(card);
    }
}

function select_doctor(doc){

    selected_doctor = doc;
    const area = document.getElementById("appointment_area");
    document.getElementById("booking_message").textContent = "";

    area.innerHTML = `
        <p>You selected : <strong>${doc.name}</strong> (${doc.speciality})</p>
        <p>Availbale time : ${doc.time} </p>
        <label>Select date </label>
        <input type ="date" id="booking_date">
        <br>
        <button id="book_button">Book Appointment</button>
    `;

    const book_btn = document.getElementById("book_button");
    book_btn.onclick = book_appointment;

}

function book_appointment(){
    const date_input = document.getElementById("booking_date");
    const date_value = date_input.value;
    //const messageEl = document.getElementById("booking_message");


   let messageEl = document.getElementById("booking_message");

    
    if(!messageEl){
        messageEl = document.createElement("p");
        messageEl.id = "booking_message";
        messageEl.className = "message";
        document.getElementById("appointment_area").appendChild(messageEl);
    }

    if(!selected_doctor){
        messageEl.textContent = "Please select a doctor first";
        return;
    }

    if(!date_value){
        messageEl.textContent = "Please choose a date";
        return;
    }


    messageEl.textContent = "Appointment booked with "+selected_doctor.name + " on "+date_value;
}



