class App {
  constructor() {
    this.currentScreen = 'screen-login';
    this.init();
  }

  init() {
    // Setup tab clicks in Goat List
    const tabs = document.querySelectorAll('.tab');
    tabs.forEach(tab => {
      tab.addEventListener('click', (e) => {
        tabs.forEach(t => t.classList.remove('active'));
        e.target.classList.add('active');
      });
    });
  }

  navigateTo(screenId) {
    if (this.currentScreen === screenId) return;

    const currentEl = document.getElementById(this.currentScreen);
    const nextEl = document.getElementById(screenId);

    if (!nextEl) return;

    // Remove active class from current, add exit
    currentEl.classList.remove('active');
    currentEl.classList.add('exit');

    // Add active to next
    nextEl.classList.remove('exit');
    // small timeout to allow display block to compute before transform
    setTimeout(() => {
      nextEl.classList.add('active');
    }, 10);

    // cleanup old screen
    setTimeout(() => {
      currentEl.classList.remove('exit');
    }, 300);

    this.currentScreen = screenId;
  }

  // ==========================================
  // VACCINATION TAB SWITCHING
  // ==========================================
  switchVaccTab(btn, tabName) {
    // Switch active tab button
    const allTabs = btn.parentElement.querySelectorAll('.vacc-tab');
    allTabs.forEach(t => t.classList.remove('active'));
    btn.classList.add('active');

    // Switch tab content
    const allContent = document.querySelectorAll('.vacc-tab-content');
    allContent.forEach(c => c.classList.remove('active'));

    const target = document.getElementById('vacc-tab-' + tabName);
    if (target) {
      target.classList.add('active');
    }
  }

  // ==========================================
  // VACCINE TYPE CHIP SELECTION
  // ==========================================
  selectVaccineChip(chip) {
    const allChips = document.querySelectorAll('.vaccine-chip');
    allChips.forEach(c => c.classList.remove('active'));
    chip.classList.add('active');
  }

  // ==========================================
  // VACCINE PHOTO CAPTURE/UPLOAD
  // ==========================================
  handleVaccPhoto(event) {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const preview = document.getElementById('vacc-photo-preview');
      const placeholder = document.getElementById('vacc-photo-placeholder');

      preview.src = e.target.result;
      preview.style.display = 'block';
      placeholder.style.display = 'none';
    };
    reader.readAsDataURL(file);
  }

  // ==========================================
  // SAVE VACCINATION RECORD
  // ==========================================
  saveVaccination() {
    const btn = document.getElementById('btn-save-vaccination');
    
    // Disable button and show saving state
    btn.disabled = true;
    btn.innerHTML = '<i class="ph ph-spinner" style="animation: spin 1s linear infinite;"></i> Saving...';

    // Simulate saving
    setTimeout(() => {
      btn.innerHTML = '<i class="ph ph-check-circle"></i> Saved!';
      btn.style.background = '#28a745';

      // Show toast
      this.showToast('Vaccination record saved successfully!');

      // Navigate back to vaccination list after a brief delay
      setTimeout(() => {
        // Reset button state for next use
        btn.disabled = false;
        btn.innerHTML = '<i class="ph ph-floppy-disk"></i> Save Record';
        btn.style.background = '';

        // Reset photo preview
        const preview = document.getElementById('vacc-photo-preview');
        const placeholder = document.getElementById('vacc-photo-placeholder');
        if (preview) {
          preview.style.display = 'none';
          preview.src = '';
        }
        if (placeholder) {
          placeholder.style.display = 'flex';
        }

        this.navigateTo('screen-vaccination');
      }, 1200);
    }, 800);
  }

  // ==========================================
  // TOAST NOTIFICATION
  // ==========================================
  showToast(message) {
    // Remove existing toasts
    const existing = document.querySelectorAll('.toast-notification');
    existing.forEach(t => t.remove());

    const toast = document.createElement('div');
    toast.className = 'toast-notification';
    toast.innerHTML = `<i class="ph-fill ph-check-circle"></i> ${message}`;
    document.body.appendChild(toast);

    // Auto-remove after 2.5s
    setTimeout(() => {
      toast.classList.add('out');
      setTimeout(() => toast.remove(), 300);
    }, 2500);
  }
}

// Spinner animation (injected as a style to avoid needing extra CSS)
const spinStyle = document.createElement('style');
spinStyle.textContent = `@keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }`;
document.head.appendChild(spinStyle);

// Initialize app globally
const app = new App();
