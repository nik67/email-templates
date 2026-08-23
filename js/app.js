/**
 * HTML Email Showcase Portfolio - Application Logic
 * Interactive Gallery, Filters, Mobile Responsiveness & Zoom Lightbox
 */

// Email Projects Master Data
const EMAIL_PROJECTS = [
  {
    id: 'xeljanzxr',
    title: 'Xeljanz XR Extended Release Email',
    shortTitleMobile: 'Xeljanz XR Email',
    category: 'pharma',
    categoryName: 'Medical & Pharma',
    desktopImg: './preview/dekstop_%20xeljanzxr.png',
    mobileImg: './images/screenshots/mobile_%20xeljanzxr.png',
    htmlPath: './templates/xeljanzxr.html',
    description: 'Extended release pharmaceutical campaign email built with responsive table layouts and cross-client Outlook support.',
    tags: ['Pharmaceutical', 'Clinical Guide', 'Outlook Tested']
  },
  {
    id: 'artritis',
    title: 'Artritis Healthcare & Patient Awareness',
    shortTitleMobile: 'Artritis Awareness',
    category: 'pharma',
    categoryName: 'Medical & Pharma',
    desktopImg: './preview/dekstop_artritis.png',
    mobileImg: './images/screenshots/mobile_artritis.png',
    htmlPath: './templates/artritis.html',
    description: 'Patient guidance newsletter template featuring healthcare advice, visual callouts, and responsive multi-column layouts.',
    tags: ['Healthcare', 'Patient Care', 'Responsive']
  },
  {
    id: 'bibliotecas',
    title: 'Bibliotecas Virtuales Digital Portal',
    shortTitleMobile: 'Bibliotecas Portal',
    category: 'education',
    categoryName: 'Resources & Education',
    desktopImg: './preview/dekstop_bibliotecas.png',
    mobileImg: './images/screenshots/mobile_bibliotecas.png',
    htmlPath: './templates/bibliotecas.html',
    description: 'Medical digital library update featuring online resource links, interactive buttons, and media highlights.',
    tags: ['Education', 'Digital Portal', 'Resources']
  },
  {
    id: 'depo_provera',
    title: 'Depo-Provera Clinical Information',
    shortTitleMobile: 'Depo-Provera Guide',
    category: 'pharma',
    categoryName: 'Medical & Pharma',
    desktopImg: './preview/desktop_depo%20provera.png',
    mobileImg: './images/screenshots/mobile_depo%20provera.png',
    htmlPath: './templates/depo_provera.html',
    description: 'Clinical prescription reference email template optimized for desktop healthcare professionals and mobile devices.',
    tags: ['Clinical Prescribing', 'Pharma', 'Clean Layout']
  },
  {
    id: 'elicuis',
    title: 'Eliquis Patient Healthcare Digest',
    shortTitleMobile: 'Eliquis Digest',
    category: 'pharma',
    categoryName: 'Medical & Pharma',
    desktopImg: './preview/dekstop_elicuis.png',
    mobileImg: './images/screenshots/mobile_elicuis.png',
    htmlPath: './templates/elicuis.html',
    description: 'Cardiology medical newsletter with clean typography, clear visual hierarchy, and high contrast CTA buttons.',
    tags: ['Cardiology', 'Pharma Brief', 'Mobile First']
  },
  {
    id: 'halcion',
    title: 'Halcion Prescribing Guidelines',
    shortTitleMobile: 'Halcion Email',
    category: 'pharma',
    categoryName: 'Medical & Pharma',
    desktopImg: './preview/desktop_halcion.png',
    mobileImg: './images/screenshots/mobile_halcion.png',
    htmlPath: './templates/halcion.html',
    description: 'Targeted medical information template featuring prescription safety guidelines and dosage tables.',
    tags: ['Dosage Reference', 'Medical Safety', 'Tables']
  },
  {
    id: 'paquete',
    title: 'Paquete Educativo Promotional Campaign',
    shortTitleMobile: 'Paquete Campaign',
    category: 'promotional',
    categoryName: 'Promotional & Marketing',
    desktopImg: './preview/desktop_paquete.png',
    mobileImg: './images/screenshots/mobile_paquete.png.png',
    htmlPath: './templates/paquete.html',
    description: 'High-conversion educational package campaign HTML template designed with vibrant hero sections.',
    tags: ['Promotional', 'Call to Action', 'Campaign']
  },
  {
    id: 'preventive',
    title: 'Preventive Health Bulletin',
    shortTitleMobile: 'Preventive Health',
    category: 'wellness',
    categoryName: 'Wellness & Prevention',
    desktopImg: './preview/dekstop_preventive.png',
    mobileImg: './images/screenshots/mobile_preventive.png',
    htmlPath: './templates/preventive.html',
    description: 'Wellness and preventive care bulletin featuring health tips, icon cards, and responsive fluid grid.',
    tags: ['Wellness', 'Prevention', 'Fluid Grid']
  },
  {
    id: 'videos_congres',
    title: 'Congress Videos & Event Highlights',
    shortTitleMobile: 'Congress Highlights',
    category: 'events',
    categoryName: 'Events & Webinars',
    desktopImg: './preview/desktop_videos_congres.png',
    mobileImg: './images/screenshots/mobile_videos_congres.png',
    htmlPath: './templates/videos_congres.html',
    description: 'Medical conference recap template featuring video thumbnails, speaker agendas, and session links.',
    tags: ['Conference', 'Video Highlights', 'Event Invite']
  },
  {
    id: 'xeljanz',
    title: 'Xeljanz Clinical Summary',
    shortTitleMobile: 'Xeljanz Summary',
    category: 'pharma',
    categoryName: 'Medical & Pharma',
    desktopImg: './preview/dekstop_xeljanz.png',
    mobileImg: './images/screenshots/mobile_xeljanz.png',
    htmlPath: './templates/xeljanz.html',
    description: 'Clinical trial outcome digest showcasing data tables, prescribing resources, and medical disclaimers.',
    tags: ['Clinical Summary', 'Data Table', 'Pharma']
  }
];

// Application State
let currentState = {
  activeCategory: 'all',
  searchQuery: '',
  viewMode: 'grid', // 'grid' | 'list'
  theme: localStorage.getItem('email_portfolio_theme') || 'dark',
  cardDeviceViews: {}, // id -> 'desktop' | 'mobile'
  lightbox: {
    active: false,
    projectIndex: 0,
    viewMode: 'desktop', // 'desktop' | 'mobile' | 'iframe'
    zoomScale: 1,
    panX: 0,
    panY: 0,
    isDragging: false,
    startX: 0,
    startY: 0
  }
};

// DOM Elements
let galleryContainer;
let searchInput;
let lightboxEl;

// Initialize Application
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  initElements();
  initEvents();
  renderGallery();
});

// Theme Initialization & Switcher
function initTheme() {
  document.documentElement.setAttribute('data-bs-theme', currentState.theme);
  updateThemeIcon();
}

function toggleTheme() {
  currentState.theme = currentState.theme === 'dark' ? 'light' : 'dark';
  document.documentElement.setAttribute('data-bs-theme', currentState.theme);
  localStorage.setItem('email_portfolio_theme', currentState.theme);
  updateThemeIcon();
}

function updateThemeIcon() {
  const icon = document.getElementById('theme-icon');
  if (icon) {
    icon.className = currentState.theme === 'dark' ? 'fas fa-sun' : 'fas fa-moon';
  }
}

// DOM References
function initElements() {
  galleryContainer = document.getElementById('gallery-container');
  searchInput = document.getElementById('search-input');
  lightboxEl = document.getElementById('lightbox-modal');
}

// Event Listeners Initialization
function initEvents() {
  // Theme Toggle Button
  const themeBtn = document.getElementById('btn-toggle-theme');
  if (themeBtn) {
    themeBtn.addEventListener('click', toggleTheme);
  }

  // Category Tab Filters
  const filterTabs = document.querySelectorAll('.nav-filter');
  filterTabs.forEach(tab => {
    tab.addEventListener('click', (e) => {
      e.preventDefault();
      filterTabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');
      currentState.activeCategory = tab.getAttribute('data-category');
      renderGallery();
    });
  });

  // Search Bar Filter
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      currentState.searchQuery = e.target.value.toLowerCase().trim();
      renderGallery();
    });
  }

  // View Mode Switcher (Grid / List)
  const gridBtn = document.getElementById('btn-view-grid');
  const listBtn = document.getElementById('btn-view-list');
  if (gridBtn && listBtn) {
    gridBtn.addEventListener('click', () => {
      currentState.viewMode = 'grid';
      gridBtn.classList.add('active');
      listBtn.classList.remove('active');
      galleryContainer.classList.remove('list-view');
    });

    listBtn.addEventListener('click', () => {
      currentState.viewMode = 'list';
      listBtn.classList.add('active');
      gridBtn.classList.remove('active');
      galleryContainer.classList.add('list-view');
    });
  }

  // Lightbox Events & Controls
  initLightboxEvents();
}

// Render Gallery Cards
function renderGallery() {
  if (!galleryContainer) return;

  const filteredProjects = EMAIL_PROJECTS.filter(project => {
    const matchesCategory = currentState.activeCategory === 'all' || project.category === currentState.activeCategory;
    const matchesSearch = currentState.searchQuery === '' || 
      project.title.toLowerCase().includes(currentState.searchQuery) ||
      project.description.toLowerCase().includes(currentState.searchQuery) ||
      project.tags.some(tag => tag.toLowerCase().includes(currentState.searchQuery));
    return matchesCategory && matchesSearch;
  });

  if (filteredProjects.length === 0) {
    galleryContainer.innerHTML = `
      <div class="col-12 no-results">
        <i class="fas fa-search"></i>
        <h4>No Email Templates Found</h4>
        <p>Try refining your search query or switching category filter tabs.</p>
      </div>
    `;
    return;
  }

  galleryContainer.innerHTML = filteredProjects.map((project, index) => {
    const globalIndex = EMAIL_PROJECTS.findIndex(p => p.id === project.id);
    const deviceState = currentState.cardDeviceViews[project.id] || 'desktop';
    const activeImageSrc = deviceState === 'desktop' ? project.desktopImg : project.mobileImg;

    return `
      <div class="project-card-col">
        <div class="project-card" data-id="${project.id}">
          <div class="card-image-wrapper" onclick="openLightbox(${globalIndex})">
            <img src="${activeImageSrc}" alt="${project.title}" class="card-img-preview" id="img-card-${project.id}" onerror="handleImgError(this, '${activeImageSrc}')">
            
            <!-- Device View Toggle Switch on Card -->
            <div class="card-device-toggle" onclick="event.stopPropagation()">
              <button class="device-btn ${deviceState === 'desktop' ? 'active' : ''}" 
                      onclick="toggleCardDevice('${project.id}', 'desktop')" title="Desktop Screenshot View">
                <i class="fas fa-desktop"></i>
              </button>
              <button class="device-btn ${deviceState === 'mobile' ? 'active' : ''}" 
                      onclick="toggleCardDevice('${project.id}', 'mobile')" title="Mobile Screenshot View">
                <i class="fas fa-mobile-alt"></i>
              </button>
            </div>

            <!-- Hover Action Overlay -->
            <div class="card-hover-overlay">
              <button class="btn-card-action" onclick="event.stopPropagation(); openLightbox(${globalIndex}, 'desktop')">
                <i class="fas fa-search-plus"></i> Zoom Preview
              </button>
              <button class="btn-card-action" onclick="event.stopPropagation(); openLightbox(${globalIndex}, 'iframe')">
                <i class="fas fa-code"></i> Live HTML
              </button>
            </div>
          </div>

          <div class="card-body">
            <div>
              <div class="card-category-badge">${project.categoryName}</div>
              
              <!-- Title with Mobile Adaptation -->
              <h3 class="card-title-text" onclick="openLightbox(${globalIndex})">
                <span class="d-none d-sm-inline">${project.title}</span>
                <span class="d-inline d-sm-none">${project.shortTitleMobile}</span>
              </h3>
              
              <p class="card-description">${project.description}</p>
            </div>

            <div>
              <div class="card-tags">
                ${project.tags.map(tag => `<span class="card-tag-pill">#${tag}</span>`).join('')}
              </div>

              <div class="card-footer-controls">
                <button class="btn-card-footer" onclick="openLightbox(${globalIndex}, 'desktop')">
                  <i class="fas fa-expand"></i> Inspect Preview
                </button>
                <a href="${project.htmlPath}" target="_blank" class="btn-card-footer" title="Open raw HTML template in new tab">
                  <i class="fas fa-external-link-alt"></i> Open Template
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }).join('');
}

// Toggle Device Image on Card
function toggleCardDevice(projectId, device) {
  currentState.cardDeviceViews[projectId] = device;
  const project = EMAIL_PROJECTS.find(p => p.id === projectId);
  if (!project) return;

  const imgEl = document.getElementById(`img-card-${projectId}`);
  if (imgEl) {
    imgEl.src = device === 'desktop' ? project.desktopImg : project.mobileImg;
  }

  // Update button active state
  const cardEl = document.querySelector(`.project-card[data-id="${projectId}"]`);
  if (cardEl) {
    const btns = cardEl.querySelectorAll('.device-btn');
    btns.forEach(btn => {
      btn.classList.remove('active');
      if (btn.getAttribute('onclick').includes(device)) {
        btn.classList.add('active');
      }
    });
  }
}

/* ==========================================================================
   LIGHTBOX MODAL & INTERACTIVE ZOOM ENGINE
   ========================================================================== */

function openLightbox(projectIndex, initialMode = 'desktop') {
  currentState.lightbox.active = true;
  currentState.lightbox.projectIndex = projectIndex;
  currentState.lightbox.viewMode = initialMode;
  currentState.lightbox.zoomScale = 1;
  currentState.lightbox.panX = 0;
  currentState.lightbox.panY = 0;

  if (lightboxEl) {
    lightboxEl.classList.add('active');
    document.body.style.overflow = 'hidden';
    updateLightboxContent();
  }
}

function closeLightbox() {
  currentState.lightbox.active = false;
  if (lightboxEl) {
    lightboxEl.classList.remove('active');
    document.body.style.overflow = '';
  }
}

function updateLightboxContent() {
  const project = EMAIL_PROJECTS[currentState.lightbox.projectIndex];
  if (!project) return;

  // Title
  const titleEl = document.getElementById('lightbox-project-title');
  if (titleEl) {
    titleEl.innerHTML = `
      <span class="d-none d-md-inline">${project.title}</span>
      <span class="d-inline d-md-none">${project.shortTitleMobile}</span>
      <span class="badge bg-primary ms-2 fs-6" style="font-size:0.75rem !important;">${project.categoryName}</span>
    `;
  }

  // Update Lightbox Mode Selector Buttons
  const modeBtns = document.querySelectorAll('.lightbox-mode-btn');
  modeBtns.forEach(btn => {
    btn.classList.remove('active');
    if (btn.getAttribute('data-mode') === currentState.lightbox.viewMode) {
      btn.classList.add('active');
    }
  });

  const viewport = document.getElementById('lightbox-viewport');
  if (!viewport) return;

  if (currentState.lightbox.viewMode === 'iframe') {
    // Show Live HTML Email inside interactive device frame
    viewport.innerHTML = `
      <div class="iframe-container">
        <div class="device-frame-wrapper desktop" id="device-wrapper">
          <iframe src="${project.htmlPath}" class="email-iframe" title="${project.title}"></iframe>
        </div>
      </div>
    `;
    hideZoomControls(true);
  } else {
    // Show Screenshot Image with Zoom Capabilities
    const imgSrc = currentState.lightbox.viewMode === 'mobile' ? project.mobileImg : project.desktopImg;
    viewport.innerHTML = `
      <div class="zoom-container" id="zoom-container">
        <img src="${imgSrc}" alt="${project.title}" class="zoom-image" id="zoom-image" onerror="handleImgError(this, '${imgSrc}')">
      </div>
    `;
    hideZoomControls(false);
    resetZoomTransform();
  }
}

// Fallback image loader from GitHub Raw repository if local relative path fails
function handleImgError(imgEl, originalSrc) {
  if (!imgEl.dataset.triedFallback && originalSrc && originalSrc.startsWith('./')) {
    imgEl.dataset.triedFallback = 'true';
    const cleanPath = originalSrc.replace('./', '');
    imgEl.src = `https://raw.githubusercontent.com/nik67/email-templates/main/${cleanPath}`;
  }
}

function hideZoomControls(hide) {
  const zoomGroup = document.getElementById('lightbox-zoom-group');
  const indicator = document.getElementById('zoom-indicator');
  if (zoomGroup) zoomGroup.style.display = hide ? 'none' : 'flex';
  if (indicator) indicator.style.display = hide ? 'none' : 'block';
}

function switchLightboxMode(mode) {
  currentState.lightbox.viewMode = mode;
  currentState.lightbox.zoomScale = 1;
  currentState.lightbox.panX = 0;
  currentState.lightbox.panY = 0;
  updateLightboxContent();
}

function navigateLightbox(direction) {
  const total = EMAIL_PROJECTS.length;
  if (direction === 'next') {
    currentState.lightbox.projectIndex = (currentState.lightbox.projectIndex + 1) % total;
  } else {
    currentState.lightbox.projectIndex = (currentState.lightbox.projectIndex - 1 + total) % total;
  }
  currentState.lightbox.zoomScale = 1;
  currentState.lightbox.panX = 0;
  currentState.lightbox.panY = 0;
  updateLightboxContent();
}

// Zoom Controls
function zoomIn() {
  setZoom(currentState.lightbox.zoomScale + 0.3);
}

function zoomOut() {
  setZoom(currentState.lightbox.zoomScale - 0.3);
}

function resetZoom() {
  currentState.lightbox.zoomScale = 1;
  currentState.lightbox.panX = 0;
  currentState.lightbox.panY = 0;
  applyZoomTransform();
}

function fitZoom() {
  currentState.lightbox.zoomScale = 0.85;
  currentState.lightbox.panX = 0;
  currentState.lightbox.panY = 0;
  applyZoomTransform();
}

function setZoom(newScale) {
  currentState.lightbox.zoomScale = Math.min(Math.max(0.5, newScale), 4.0);
  applyZoomTransform();
}

function applyZoomTransform() {
  const container = document.getElementById('zoom-container');
  const indicator = document.getElementById('zoom-indicator');
  
  if (container) {
    container.style.transform = `translate(${currentState.lightbox.panX}px, ${currentState.lightbox.panY}px) scale(${currentState.lightbox.zoomScale})`;
  }
  if (indicator) {
    indicator.textContent = `${Math.round(currentState.lightbox.zoomScale * 100)}%`;
  }
}

function resetZoomTransform() {
  applyZoomTransform();
}

// Drag & Pan + Wheel Zoom Events Initialization
function initLightboxEvents() {
  // Keyboard Shortcuts
  document.addEventListener('keydown', (e) => {
    if (!currentState.lightbox.active) return;
    if (e.key === 'Escape') closeLightbox();
    if (e.key === 'ArrowRight') navigateLightbox('next');
    if (e.key === 'ArrowLeft') navigateLightbox('prev');
    if (e.key === '+' || e.key === '=') zoomIn();
    if (e.key === '-') zoomOut();
    if (e.key === '0') resetZoom();
  });

  const viewport = document.getElementById('lightbox-viewport');
  if (!viewport) return;

  // Mouse Wheel Zoom
  viewport.addEventListener('wheel', (e) => {
    if (!currentState.lightbox.active || currentState.lightbox.viewMode === 'iframe') return;
    e.preventDefault();
    const delta = e.deltaY < 0 ? 0.2 : -0.2;
    setZoom(currentState.lightbox.zoomScale + delta);
  }, { passive: false });

  // Mouse Drag / Pan
  viewport.addEventListener('mousedown', (e) => {
    if (!currentState.lightbox.active || currentState.lightbox.viewMode === 'iframe') return;
    currentState.lightbox.isDragging = true;
    currentState.lightbox.startX = e.clientX - currentState.lightbox.panX;
    currentState.lightbox.startY = e.clientY - currentState.lightbox.panY;
  });

  window.addEventListener('mousemove', (e) => {
    if (!currentState.lightbox.active || !currentState.lightbox.isDragging) return;
    currentState.lightbox.panX = e.clientX - currentState.lightbox.startX;
    currentState.lightbox.panY = e.clientY - currentState.lightbox.startY;
    applyZoomTransform();
  });

  window.addEventListener('mouseup', () => {
    currentState.lightbox.isDragging = false;
  });

  // Touch Drag & Pinch Support
  let touchStartDist = 0;
  viewport.addEventListener('touchstart', (e) => {
    if (!currentState.lightbox.active || currentState.lightbox.viewMode === 'iframe') return;
    if (e.touches.length === 1) {
      currentState.lightbox.isDragging = true;
      currentState.lightbox.startX = e.touches[0].clientX - currentState.lightbox.panX;
      currentState.lightbox.startY = e.touches[0].clientY - currentState.lightbox.panY;
    } else if (e.touches.length === 2) {
      touchStartDist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
    }
  }, { passive: true });

  viewport.addEventListener('touchmove', (e) => {
    if (!currentState.lightbox.active || currentState.lightbox.viewMode === 'iframe') return;
    if (e.touches.length === 1 && currentState.lightbox.isDragging) {
      currentState.lightbox.panX = e.touches[0].clientX - currentState.lightbox.startX;
      currentState.lightbox.panY = e.touches[0].clientY - currentState.lightbox.startY;
      applyZoomTransform();
    } else if (e.touches.length === 2) {
      const dist = Math.hypot(
        e.touches[0].clientX - e.touches[1].clientX,
        e.touches[0].clientY - e.touches[1].clientY
      );
      const scaleDelta = (dist - touchStartDist) * 0.005;
      setZoom(currentState.lightbox.zoomScale + scaleDelta);
      touchStartDist = dist;
    }
  }, { passive: true });

  viewport.addEventListener('touchend', () => {
    currentState.lightbox.isDragging = false;
  });
}
