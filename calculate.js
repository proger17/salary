let pinnedRows = [];
        
function addRow() {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    
    newRow.innerHTML = `
        <td><input type="number" name="number_of_shifts[]" min="0" placeholder="0" required></td>
        <td><input type="number" name="issued_by_employees[]" min="0" placeholder="0" required></td>
        <td><input type="number" name="out_of_staff[]" min="0" step="0.01" placeholder="0.00" required></td>
        <td><input type="number" name="salary[]" placeholder="0" readonly></td>
        <td class="action-cell">
            <button type="button" class="action-btn pin-btn" onclick="togglePin(this)" title="Закрепить строку">
                <i class="fas fa-thumbtack"></i>
            </button>
            <button type="button" class="action-btn delete-btn" onclick="deleteRow(this)" title="Удалить строку">
                <i class="fas fa-times"></i>
            </button>
        </td>
    `;
    
    addCalculations(newRow);
    movePinnedRowsToTop();
}

function togglePin(btn) {
    const row = btn.closest('tr');
    const isPinned = row.classList.contains('pinned');
    
    if (isPinned) {
        // Открепляем строку
        row.classList.remove('pinned');
        btn.innerHTML = '<i class="fas fa-thumbtack"></i>';
        btn.title = "Закрепить строку";
        btn.className = "action-btn pin-btn";
        
        pinnedRows = pinnedRows.filter(r => r !== row);
    } else {
        row.classList.add('pinned');
        btn.innerHTML = '<i class="fas fa-unlock"></i>';
        btn.title = "Открепить строку";
        btn.className = "action-btn unpin-btn";
        
        pinnedRows.push(row);
    }
    
    movePinnedRowsToTop();
}

function movePinnedRowsToTop() {
    const tbody = document.querySelector('#dataTable tbody');
    const rows = Array.from(tbody.querySelectorAll('tr'));
    
    pinnedRows.forEach(pinnedRow => {
        if (rows.includes(pinnedRow)) {
            tbody.removeChild(pinnedRow);
            tbody.insertBefore(pinnedRow, tbody.firstChild);
        }
    });
}

function deleteRow(btn) {
    const row = btn.closest('tr');
    const isPinned = row.classList.contains('pinned');
    
    if (isPinned) {
        pinnedRows = pinnedRows.filter(r => r !== row);
    }
    
    row.classList.add('deleting');
    
    setTimeout(() => {
        row.remove();
        if (document.querySelectorAll('#dataTable tbody tr').length === 0) {
            addRow();
        }
    }, 300);
}


function addRow() {
    const table = document.getElementById('dataTable').getElementsByTagName('tbody')[0];
    const newRow = table.insertRow();
    
    newRow.innerHTML = `
        <td><input type="number" name="number_of_shifts[]" min="0" placeholder="0" required></td>
        <td><input type="number" name="issued_by_employees[]" min="0" placeholder="0" required></td>
        <td><input type="number" name="out_of_staff[]" min="0" step="0.01" placeholder="0.00" required></td>
        <td><input type="number" name="salary[]" placeholder="0" readonly></td>

        <td class="action-cell">
            <button type="button" class="action-btn pin-btn" onclick="togglePin(this)" title="Закрепить строку">
                <i class="fas fa-thumbtack"></i>
            </button>
            <button type="button" class="action-btn delete-btn" onclick="deleteRow(this)" title="Удалить строку">
                <i class="fas fa-times"></i>
            </button>
        </td>
    `;
    
    addCalculations(newRow);
    movePinnedRowsToTop();
}


function calculateRow(row) {
    const number_of_shifts = parseFloat(row.querySelector('input[name="number_of_shifts[]"]').value) || 0;
    const issued_by_employees = parseFloat(row.querySelector('input[name="issued_by_employees[]"]').value) || 0;
    const out_of_staff = parseFloat(row.querySelector('input[name="out_of_staff[]"]').value) || 0;

    const fixed_salary = number_of_shifts * 3000;
    const CR2 = (parseFloat(out_of_staff) / parseFloat(issued_by_employees)) * 100;

    var i1 = 0;
    var j1 = 0;

    var b11 = [
        0, 100, 150, 180
    ];

    var b12 = [
        [20, 140, 160, 180, 200],
        [25, 150, 170, 190, 210],
        [30, 160, 180, 200, 220],
        [35, 170, 190, 210, 230]
    ];
    
    switch (true) {
        case (issued_by_employees <= 99):
            i1 = 0
            break;
        case (100 <= issued_by_employees && issued_by_employees <= 149):
            i1 = 1;
            break;
        case (150 <= issued_by_employees && issued_by_employees <= 199):
            i1 = 2;
            break;
        case (issued_by_employees >= 200):
            i1 = 3;
            break;
    }

    switch (true) {
        case (CR2 < 50 || CR2 >= 85):
            j1 = -1;
            break;
        case (50 <= CR2 && CR2 < 55):
            j1 = 0;
            break;
        case (55 <= CR2 && CR2 < 60):
            j1 = 1;
            break;
        case (60 <= CR2 && CR2 < 65):
            j1 = 2;
            break;
        case (65 <= CR2 && CR2 < 70):
            j1 = 3;
            break;
        case (70 <= CR2):
            j1 = 4;
            break;
    }


    var i2 = 0;
    var j2 = 0;

    var b21 = [
        0, 30, 50
    ];

    var b22 = [
        [70, 220, 270, 320, 370],
        [80, 230, 280, 330, 380],
        [90, 240, 290, 340, 390]
    ];

    switch (true) {
        case (out_of_staff <= 69):
            i2 = 0;
            break;
        case (70 <= out_of_staff && out_of_staff <= 99):
            i2 = 1;
            break;
        case (out_of_staff >= 100):
            i2 = 2;
            break;
    }

    switch (true) {
        case (0 <= CR2 && CR2 < 50):
            j2 = -1;
            break;
        case (50 <= CR2 && CR2 < 55):
            j2 = 0;
            break;
        case (55 <= CR2 && CR2 < 60):
            j2 = 1;
            break;
        case (60 <= CR2 && CR2 < 65):
            j2 = 2;
            break;
        case (65 <= CR2 && CR2 < 70):
            j2 = 3;
            break;
        case (70 <= CR2):
            j2 = 4;
            break;
    }

    var bonus_1 = 0;
    var bonus_2 = 0;

    if (j1 == -1) {
        bonus_1 = b11[i1] * issued_by_employees;
    } else {
        bonus_1 = (b11[i1] + b12[i1][j1]) * issued_by_employees;
    }

    if (j2 == -1) {
        bonus_2 = b21[i2] * out_of_staff;
    } else {
        bonus_2 = b22[i2][j2] * out_of_staff;
    }

    const salary = fixed_salary + bonus_1 + bonus_2;

    console.log(bonus_1, bonus_2, CR2);

    row.querySelector('input[name="salary[]"]').value = salary;
}


function addCalculations(row) {
    const number_of_shifts = row.querySelector('input[name="number_of_shifts[]"]');
    const issued_by_employees = row.querySelector('input[name="issued_by_employees[]"]');
    const out_of_staff = row.querySelector('input[name="out_of_staff[]"]');
    
    number_of_shifts.addEventListener('input', () => calculateRow(row));
    issued_by_employees.addEventListener('input', () => calculateRow(row));
    out_of_staff.addEventListener('input', () => calculateRow(row));
}


document.addEventListener('DOMContentLoaded', function() {
    const firstRow = document.querySelector('#dataTable tbody tr');
    addCalculations(firstRow);
});
