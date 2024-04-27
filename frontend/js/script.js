function toggleDropdown() {
    const dropdown = document.getElementById('dropdown-menu');
    if (!dropdown) {
        console.error('Element with id "dropdown-menu" not found');
        return;
    }

    dropdown.style.display = dropdown.style.display === 'none' || dropdown.style.display === '' ? 'block' : 'none';
}
