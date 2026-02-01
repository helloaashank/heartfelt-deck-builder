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

// Authentication functions
function checkDOB() {
    const input = document.getElementById('dob').value.toLowerCase();
    if (input === AUTH.dob.toLowerCase()) {
        showStep('step2');
    } else {
        document.getElementById('error1').textContent = 'Incorrect date of birth';
        shakeInput('dob');
    }
}

function checkAuthCode() {
    const input = document.getElementById('authCode').value;
    if (input === AUTH.authCode) {
        showStep('step3');
    } else {
        document.getElementById('error2').textContent = 'Incorrect authorization code';
        shakeInput('authCode');
    }
}

function check2FA() {
    const input = document.getElementById('twoFA').value;
    if (input === AUTH.twoFA) {
        showStep('mainApp');
        initializeApp();
    } else {
        document.getElementById('error3').textContent = 'Incorrect 2FA code';
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

// Main app functionality
let storage = JSON.parse(localStorage.getItem('immutableStorage') || '[]');
let currentFilter = 'all';

function initializeApp() {
    const fileInput = document.getElementById('fileInput');
    const dropZone = document.getElementById('dropZone');
    
    fileInput.addEventListener('change', handleFiles);
    
    // Drag and drop
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
    
    // Enter key for text
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
    }
}

function addItem(item) {
    storage.push(item);
    localStorage.setItem('immutableStorage', JSON.stringify(storage));
    renderStorage();
    updateStats();
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
    
    container.innerHTML = filteredItems.map((item, index) => {
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
