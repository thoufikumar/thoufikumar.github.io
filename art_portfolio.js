document.addEventListener('DOMContentLoaded', () => {
    const toastContainer = document.getElementById('toastContainer');

    function showToast(message) {
        const toast = document.createElement('div');
        toast.className = 'toast';
        toast.textContent = message;
        toastContainer.appendChild(toast);

        // Trigger reflow to enable animation
        toast.offsetHeight;

        // Show toast
        toast.classList.add('show');

        // Remove after 3 seconds
        setTimeout(() => {
            toast.classList.add('fade-out');
            setTimeout(() => {
                toast.remove();
            }, 500); // Match CSS transition
        }, 3000);
    }

    // Show welcome message
    showToast("Welcome to Thoufik's Art Gallery");

    console.log('Art Portfolio Gallery loaded in minimalist mode.');
});
