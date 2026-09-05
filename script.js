// DOM Elements References Mapping
const modal = document.getElementById('userModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelModalBtn = document.getElementById('cancelModalBtn');
const userForm = document.getElementById('userForm');
const userTableBody = document.getElementById('userTableBody');

// Logic To Open Modal UI Window Component
openModalBtn.addEventListener('click', () => {
    modal.classList.add('active');
});

// Logic To Close and Reset Input Elements Inside Modal Window Component
const closeModalWindow = () => {
    modal.classList.remove('active');
    userForm.reset(); 
};

closeModalBtn.addEventListener('click', closeModalWindow);
cancelModalBtn.addEventListener('click', closeModalWindow);

// Logic to Append New User Row Segment Into Data Table Structure View
userForm.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevents standard page postback reloads

    // Extract values directly from client inputs
    const inputName = document.getElementById('userName').value;
    const inputEmail = document.getElementById('userEmail').value;
    const inputRole = document.getElementById('userRole').value;

    // Compute appropriate badge color layout styles conditionally based on roles
    let dynamicBadgeClass = 'bg-secondary';
    if (inputRole === 'Admin') {
        dynamicBadgeClass = 'bg-success';
    } else if (inputRole === 'Developer') {
        dynamicBadgeClass = 'bg-primary';
    }

    // Create container element representation for rows
    const createdTableRowRow = document.createElement('tr');
    createdTableRowRow.innerHTML = `
        <td style="font-weight: 600;">${inputName}</td>
        <td>${inputEmail}</td>
        <td><span class="badge ${dynamicBadgeClass}">${inputRole}</span></td>
        <td><button class="btn-action" onclick="deleteRow(this)">🗑️ Delete</button></td>
    `;

    // Append row to active live grid dashboard array viewport
    userTableBody.appendChild(createdTableRowRow);

    // Hide active dialog wrapper workflow automatically
    closeModalWindow();
});

// Custom Trigger Handler Function Execution To Remove Individual Rows
function deleteRow(actionButtonTarget) {
    if (confirm("Are you sure you want to remove this user from the prototype list?")) {
        actionButtonTarget.closest('tr').remove();
    }
}
