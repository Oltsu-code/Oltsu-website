function toggleDropdown() {
    const dropdown = document.getElementById('dropdown-menu');
    if (dropdown.style.display === 'none' || dropdown.style.display.display == '') {
        dropdown.style.display = 'block';
    } else {
        dropdown.style.display = 'none';
    }
}

