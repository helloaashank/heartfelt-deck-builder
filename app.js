// Authentication credentials
const AUTH = {
    dob: "23/june/2010",
    authCode: "6049382175294853",
    twoFA: "326790"
};

// File type configurations
const FILE_TYPES = {
    doc: {
        extensions: ['doc', 'docx', 'odt', 'rtf'],
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <line x1="10" y1="9" x2="8" y2="9"/>
        </svg>`,
        class: 'doc',
        label: 'DOC'
    },
    xls: {
        extensions: ['xls', 'xlsx', 'csv', 'ods'],
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <rect x="8" y="12" width="8" height="6" rx="1"/>
            <line x1="12" y1="12" x2="12" y2="18"/>
            <line x1="8" y1="15" x2="16" y2="15"/>
        </svg>`,
        class: 'xls',
        label: 'XLS'
    },
    pdf: {
        extensions: ['pdf'],
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <path d="M9 15v-2h1.5a1.5 1.5 0 0 1 0 3H9z"/>
            <path d="M15 13v4"/>
            <path d="M13 15h2"/>
        </svg>`,
        class: 'pdf',
        label: 'PDF'
    },
    image: {
        extensions: ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg', 'bmp', 'ico'],
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/>
            <circle cx="8.5" cy="8.5" r="1.5"/>
            <polyline points="21 15 16 10 5 21"/>
        </svg>`,
        class: 'image',
        label: 'IMG'
    },
    code: {
        extensions: ['js', 'ts', 'jsx', 'tsx', 'html', 'css', 'scss', 'json', 'py', 'java', 'c', 'cpp', 'php', 'rb', 'go', 'rs'],
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <polyline points="16 18 22 12 16 6"/>
            <polyline points="8 6 2 12 8 18"/>
            <line x1="14" y1="4" x2="10" y2="20"/>
        </svg>`,
        class: 'code',
        label: 'CODE'
    },
    archive: {
        extensions: ['zip', 'rar', '7z', 'tar', 'gz', 'bz2'],
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M21 8v13H3V8"/>
            <path d="M1 3h22v5H1z"/>
            <path d="M10 12h4"/>
        </svg>`,
        class: 'archive',
        label: 'ZIP'
    },
    text: {
        extensions: ['txt', 'md', 'log'],
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
        </svg>`,
        class: 'text',
        label: 'TXT'
    },
    other: {
        extensions: [],
        icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
            <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z"/>
            <polyline points="13 2 13 9 20 9"/>
        </svg>`,
        class: 'other',
        label: 'FILE'
    }
};

const TEXT_TYPE = {
    icon: `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
        <path d="M12 20h9"/>
        <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"/>
    </svg>`,
    class: 'text',
    label: 'TEXT'
};

// Get file type info based on extension
function getFileType(filename) {
    const ext = filename.split('.').pop().toLowerCase();
    for (const [type, config] of Object.entries(FILE_TYPES)) {
        if (config.extensions.includes(ext)) {
            return config;
        }
    }
    return FILE_TYPES.other;
}

// Toast notification system
function showToast(message, type = 'error') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    toast.innerHTML = `
        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
            ${type === 'error' 
                ? '<circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/>'
                : type === 'success'
                ? '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>'
                : '<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>'
            }
        </svg>
        <span>${message}</span>
    `;
    document.body.appendChild(toast);

    requestAnimationFrame(() => toast.classList.add('visible'));
    setTimeout(() => {
        toast.classList.remove('visible');
        setTimeout(() => toast.remove(), 300);
    }, 3000);
}

// Authentication functions
function checkDOB() {
    const input = document.getElementById('dob').value.trim().toLowerCase();
    const errorEl = document.getElementById('error1');
    if (!input) {
        errorEl.textContent = 'Please enter your date of birth';
        showToast('Please enter your date of birth');
        shakeInput('dob');
        return;
    }
    if (input === AUTH.dob.toLowerCase()) {
        errorEl.textContent = '';
        showToast('Date of birth verified', 'success');
        showStep('step2');
        setTimeout(() => document.getElementById('authCode').focus(), 300);
    } else {
        errorEl.textContent = 'Incorrect date of birth';
        showToast('Incorrect date of birth');
        shakeInput('dob');
    }
}

function checkAuthCode() {
    const input = document.getElementById('authCode').value.trim();
    const errorEl = document.getElementById('error2');
    if (!input) {
        errorEl.textContent = 'Please enter the authorization code';
        showToast('Please enter the authorization code');
        shakeInput('authCode');
        return;
    }
    if (input === AUTH.authCode) {
        errorEl.textContent = '';
        showToast('Authorization code accepted', 'success');
        showStep('step3');
        setTimeout(() => document.getElementById('twoFA').focus(), 300);
    } else {
        errorEl.textContent = 'Incorrect authorization code';
        showToast('Incorrect authorization code');
        shakeInput('authCode');
    }
}

function check2FA() {
    const input = document.getElementById('twoFA').value.trim();
    const errorEl = document.getElementById('error3');
    if (!input) {
        errorEl.textContent = 'Please enter the 2FA code';
        showToast('Please enter the 2FA code');
        shakeInput('twoFA');
        return;
    }
    if (input === AUTH.twoFA) {
        errorEl.textContent = '';
        showToast('Authentication successful!', 'success');
        showStep('mainApp');
        initializeApp();
    } else {
        errorEl.textContent = 'Incorrect 2FA code';
        showToast('Incorrect 2FA code');
        shakeInput('twoFA');
    }
}

function shakeInput(inputId) {
    const input = document.getElementById(inputId);
    input.style.animation = 'shake 0.5s ease';
    setTimeout(() => input.style.animation = '', 500);
}

function showStep(stepId) {
    document.querySelectorAll('.auth-screen, .main-app').forEach(el => {
        el.classList.remove('active');
    });
    document.getElementById(stepId).classList.add('active');
}

// Enter key support for auth inputs
document.addEventListener('DOMContentLoaded', () => {
    document.getElementById('dob').addEventListener('keydown', e => {
        if (e.key === 'Enter') checkDOB();
    });
    document.getElementById('authCode').addEventListener('keydown', e => {
        if (e.key === 'Enter') checkAuthCode();
    });
    document.getElementById('twoFA').addEventListener('keydown', e => {
        if (e.key === 'Enter') check2FA();
    });
});

// Main app functionality
let storage = JSON.parse(localStorage.getItem('immutableStorage') || '[]');
let currentFilter = 'all';
let pendingDeleteIndex = null;

function initializeApp() {
    const fileInput = document.getElementById('fileInput');
    const dropZone = document.getElementById('dropZone');
    
    fileInput.addEventListener('change', handleFiles);
    
    dropZone.addEventListener('dragover', (e) => {
        e.preventDefault();
        dropZone.classList.add('dragover');
    });
    
    dropZone.addEventListener('dragleave', () => {
        dropZone.classList.remove('dragover');
    });
    
    dropZone.addEventListener('drop', (e) => {
        e.preventDefault();
        dropZone.classList.remove('dragover');
        const files = e.dataTransfer.files;
        handleFilesList(files);
    });
    
    document.getElementById('textInput').addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && e.ctrlKey) {
            addText();
        }
    });
    
    renderStorage();
    updateStats();
}

function handleFiles(e) {
    handleFilesList(e.target.files);
    e.target.value = '';
}

function handleFilesList(files) {
    Array.from(files).forEach(file => {
        const reader = new FileReader();
        reader.onload = () => {
            addItem({
                type: 'file',
                name: file.name,
                size: file.size,
                content: reader.result,
                timestamp: new Date().toISOString()
            });
        };
        reader.readAsDataURL(file);
    });
}

function addText() {
    const textarea = document.getElementById('textInput');
    const text = textarea.value.trim();
    if (text) {
        addItem({
            type: 'text',
            content: text,
            timestamp: new Date().toISOString()
        });
        textarea.value = '';
        showToast('Text entry added', 'success');
    }
}

function addItem(item) {
    storage.push(item);
    localStorage.setItem('immutableStorage', JSON.stringify(storage));
    renderStorage();
    updateStats();
}

// Delete functionality
function requestDelete(storageIndex) {
    pendingDeleteIndex = storageIndex;
    const item = storage[storageIndex];
    const name = item.type === 'text' ? 'this text entry' : `"${item.name}"`;
    
    document.getElementById('deleteItemName').textContent = name;
    document.getElementById('deleteModal').classList.add('visible');
}

function confirmDelete() {
    if (pendingDeleteIndex !== null) {
        const item = storage[pendingDeleteIndex];
        const label = item.type === 'text' ? 'Text entry' : item.name;
        storage.splice(pendingDeleteIndex, 1);
        localStorage.setItem('immutableStorage', JSON.stringify(storage));
        renderStorage();
        updateStats();
        showToast(`${label} deleted`, 'success');
        pendingDeleteIndex = null;
    }
    closeDeleteModal();
}

function closeDeleteModal() {
    document.getElementById('deleteModal').classList.remove('visible');
    pendingDeleteIndex = null;
}

function filterItems(filter) {
    currentFilter = filter;
    document.querySelectorAll('.filter-tab').forEach(tab => {
        tab.classList.toggle('active', tab.textContent.toLowerCase() === filter);
    });
    renderStorage();
}

function formatFileSize(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

function formatDate(isoString) {
    const date = new Date(isoString);
    const now = new Date();
    const diff = now - date;
    
    if (diff < 60000) return 'Just now';
    if (diff < 3600000) return Math.floor(diff / 60000) + 'm ago';
    if (diff < 86400000) return Math.floor(diff / 3600000) + 'h ago';
    if (diff < 604800000) return Math.floor(diff / 86400000) + 'd ago';
    
    return date.toLocaleDateString('en-US', { 
        month: 'short', 
        day: 'numeric',
        year: date.getFullYear() !== now.getFullYear() ? 'numeric' : undefined
    });
}

function updateStats() {
    const fileCount = storage.filter(item => item.type === 'file').length;
    const textCount = storage.filter(item => item.type === 'text').length;
    document.getElementById('fileCount').textContent = 
        `${fileCount} file${fileCount !== 1 ? 's' : ''} · ${textCount} text${textCount !== 1 ? 's' : ''}`;
}

function renderStorage() {
    const container = document.getElementById('storage');
    const emptyState = document.getElementById('emptyState');
    
    const filteredItems = storage.filter(item => {
        if (currentFilter === 'all') return true;
        return item.type === currentFilter;
    });
    
    if (filteredItems.length === 0) {
        container.innerHTML = '';
        emptyState.classList.add('visible');
        return;
    }
    
    emptyState.classList.remove('visible');
    
    container.innerHTML = filteredItems.map((item) => {
        const realIndex = storage.indexOf(item);
        if (item.type === 'text') {
            return `
                <div class="item" data-type="text">
                    <div class="item-header">
                        <div class="item-icon ${TEXT_TYPE.class}">
                            ${TEXT_TYPE.icon}
                        </div>
                        <div class="item-info">
                            <div class="item-name">Text Entry</div>
                            <div class="item-meta">
                                <span class="item-type-badge">${TEXT_TYPE.label}</span>
                                <span>${formatDate(item.timestamp)}</span>
                            </div>
                        </div>
                        <button class="btn-delete" onclick="requestDelete(${realIndex})" title="Delete">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                        </button>
                    </div>
                    <div class="item-content">${escapeHtml(item.content)}</div>
                </div>
            `;
        } else {
            const fileType = getFileType(item.name);
            return `
                <div class="item" data-type="file">
                    <div class="item-header">
                        <div class="item-icon ${fileType.class}">
                            ${fileType.icon}
                        </div>
                        <div class="item-info">
                            <div class="item-name" title="${escapeHtml(item.name)}">${escapeHtml(item.name)}</div>
                            <div class="item-meta">
                                <span class="item-type-badge">${fileType.label}</span>
                                <span>${item.size ? formatFileSize(item.size) : ''}</span>
                                <span>${formatDate(item.timestamp)}</span>
                            </div>
                        </div>
                        <button class="btn-delete" onclick="requestDelete(${realIndex})" title="Delete">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <polyline points="3 6 5 6 21 6"/>
                                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                            </svg>
                        </button>
                    </div>
                    <div class="item-actions">
                        <a href="${item.content}" download="${escapeHtml(item.name)}" class="btn-download">
                            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="7 10 12 15 17 10"/>
                                <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                            Download
                        </a>
                    </div>
                </div>
            `;
        }
    }).join('');
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// Add shake animation
const style = document.createElement('style');
style.textContent = `
    @keyframes shake {
        0%, 100% { transform: translateX(0); }
        25% { transform: translateX(-10px); }
        75% { transform: translateX(10px); }
    }
`;
document.head.appendChild(style);
