// Copy promo code
function copyCode() {
    console.log('copyCode function called');
    const code = 'd4r311';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(code).then(() => {
            console.log('Clipboard API success');
            showToast('Kode berhasil dicopy!');
        }).catch(err => {
            console.error('Clipboard API failed:', err);
            fallbackCopy(code, 'Kode berhasil dicopy!');
        });
    } else {
        console.log('Clipboard API not available, using fallback');
        fallbackCopy(code, 'Kode berhasil dicopy!');
    }
}

// Copy crosshair code
function copyCrosshairCode(event) {
    console.log('copyCrosshairCode function called');
    const btn = event && event.currentTarget;
    const codeEl = btn && btn.closest('.crosshair-code') && btn.closest('.crosshair-code').querySelector('.code');
    const crosshairCode = codeEl ? codeEl.textContent.trim() : '0;P;c;5;h;0;d;1;z;3;0t;4;0l;3;0v;3;0o;0;0a;1;0f;0;1b;0';
    
    if (navigator.clipboard) {
        navigator.clipboard.writeText(crosshairCode).then(() => {
            console.log('Crosshair clipboard API success');
            showToast('Crosshair code berhasil dicopy!');
        }).catch(err => {
            console.error('Crosshair clipboard API failed:', err);
            fallbackCopy(crosshairCode, 'Crosshair code berhasil dicopy!');
        });
    } else {
        console.log('Clipboard API not available for crosshair, using fallback');
        fallbackCopy(crosshairCode, 'Crosshair code berhasil dicopy!');
    }
}

// Fallback copy function
function fallbackCopy(text, message) {
    const textArea = document.createElement('textarea');
    textArea.value = text;
    textArea.style.position = 'fixed';
    textArea.style.left = '-999999px';
    textArea.style.top = '-999999px';
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    try {
        const successful = document.execCommand('copy');
        if (successful) {
            console.log('Fallback copy successful');
            showToast(message);
        } else {
            console.log('Fallback copy failed');
            showToast('Copy gagal, coba lagi');
        }
    } catch (err) {
        console.error('Fallback copy error:', err);
        showToast('Copy gagal, coba lagi');
    }
    
    document.body.removeChild(textArea);
}

// Show toast notification
function showToast(message) {
    // Notifikasi dihapus: perangkat sudah menampilkan notifikasi copy sendiri
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM loaded, script initialized');
    
    // Add event listeners for copy buttons
    const promoCopyBtn = document.getElementById('promo-copy-btn');
    const crosshairCopyBtn = document.getElementById('crosshair-copy-btn');
    
    if (promoCopyBtn) {
        promoCopyBtn.addEventListener('click', copyCode);
        console.log('Promo copy button event listener added');
    } else {
        console.error('Promo copy button not found');
    }
    
    if (crosshairCopyBtn) {
        crosshairCopyBtn.addEventListener('click', copyCrosshairCode);
        console.log('Crosshair copy button event listener added');
    } else {
        console.error('Crosshair copy button not found');
    }

    const crosshairCopyBtn2 = document.getElementById('crosshair-copy-btn-2');
    if (crosshairCopyBtn2) {
        crosshairCopyBtn2.addEventListener('click', copyCrosshairCode);
    }
    
    // Test if functions are available
    console.log('copyCode function available:', typeof copyCode === 'function');
    console.log('copyCrosshairCode function available:', typeof copyCrosshairCode === 'function');
    
    // Smooth scroll for mobile
    if ('scrollBehavior' in document.documentElement.style) {
        document.documentElement.style.scrollBehavior = 'smooth';
    }
    
    // Lazy load images
    if ('loading' in HTMLImageElement.prototype) {
        const images = document.querySelectorAll('img');
        images.forEach(img => {
            img.loading = 'lazy';
        });
    }
});