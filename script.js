// DOM Elements References Mapping
const modal = document.getElementById('userModal');
const openModalBtn = document.getElementById('openModalBtn');
const closeModalBtn = document.getElementById('closeModalBtn');
const cancelModalBtn = document.getElementById('cancelModalBtn');
const userForm = document.getElementById('userForm');
const userTableBody = document.getElementById('userTableBody');

// Logic To Open Modal UI Window Component
if (openModalBtn) {
    openModalBtn.addEventListener('click', () => {
        modal.classList.add('active');
    });
}

// Logic To Close and Reset Input Elements Inside Modal Window Component
const closeModalWindow = () => {
    if (modal) modal.classList.remove('active');
    if (userForm) userForm.reset(); 
};

if (closeModalBtn) closeModalBtn.addEventListener('click', closeModalWindow);
if (cancelModalBtn) cancelModalBtn.addEventListener('click', closeModalWindow);

// Logic to Append New User Row Segment Into Data Table Structure View
if (userForm) {
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
        if (userTableBody) {
            userTableBody.appendChild(createdTableRowRow);
        }

        // Hide active dialog wrapper workflow automatically
        closeModalWindow();
    });
}

// Custom Trigger Handler Function Execution To Remove Individual Rows
function deleteRow(actionButtonTarget) {
    if (confirm("Are you sure you want to remove this user from the prototype list?")) {
        actionButtonTarget.closest('tr').remove();
    }
}

// FIX: Safe search wrapper logic initialization
document.addEventListener('DOMContentLoaded', () => {
    const searchBox = document.getElementById('search-users');
    
    if (searchBox) {
        searchBox.addEventListener('keyup', function() {
            let filter = this.value.toLowerCase();
            
            // Grabs rows specifically inside your designated body element
            if (userTableBody) {
                let rows = userTableBody.querySelectorAll('tr');
                
                rows.forEach(row => {
                    // Safe verification checks before accessing text arrays
                    let nameCell = row.cells[0];
                    let emailCell = row.cells[1];
                    
                    let name = nameCell ? nameCell.textContent.toLowerCase() : '';
                    let email = emailCell ? emailCell.textContent.toLowerCase() : '';
                    
                    // If either matches the typed sequence, show the element
                    if (name.includes(filter) || email.includes(filter)) {
                        row.style.display = '';
                    } else {
                        row.style.display = 'none';
                    }
                });
            }
        });
    }
});
