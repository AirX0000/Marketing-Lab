import { initialData } from './data.js';

// Application State
const STATE_KEY = 'marketing_lab_v2_data';
const BOOKMARKS_KEY = 'marketing_lab_v2_bookmarks';
const AUTH_KEY = 'marketing_lab_v2_auth';
const THEME_KEY = 'marketing_lab_v2_theme';

class App {
  constructor() {
    this.data = this.loadData();
    this.bookmarks = this.loadBookmarks();
    this.isAdmin = sessionStorage.getItem(AUTH_KEY) === '1';
    this.currentCategory = 'All';
    this.searchQuery = '';
    this.currentTeamDept = 'All';

    this.initTheme();
    this.initEventListeners();
    this.initRouter();
  }

  loadData() {
    try {
      const saved = localStorage.getItem(STATE_KEY);
      if (saved) {
        return JSON.parse(saved);
      }
    } catch (e) {
      console.warn('Failed to parse local data, fallback to defaults');
    }
    return JSON.parse(JSON.stringify(initialData));
  }

  saveData() {
    try {
      localStorage.setItem(STATE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.error('Storage error', e);
    }
  }

  loadBookmarks() {
    try {
      const b = localStorage.getItem(BOOKMARKS_KEY);
      return b ? JSON.parse(b) : [];
    } catch (e) {
      return [];
    }
  }

  saveBookmarks() {
    try {
      localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(this.bookmarks));
      this.updateBookmarkBadge();
    } catch (e) {}
  }

  initTheme() {
    const savedTheme = localStorage.getItem(THEME_KEY);
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = savedTheme || (prefersDark ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme);
    this.updateThemeButton();
  }

  toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const next = current === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', next);
    localStorage.setItem(THEME_KEY, next);
    this.updateThemeButton();
    this.showToast(`Switched to ${next} mode`);
  }

  updateThemeButton() {
    const btn = document.getElementById('theme-toggle-btn');
    if (btn) {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      btn.innerHTML = isDark ? '☀️' : '🌙';
      btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    }
  }

  initRouter() {
    window.addEventListener('hashchange', () => this.handleRoute());
    window.addEventListener('scroll', () => this.handleScroll(), { passive: true });
    this.handleRoute();
  }

  handleScroll() {
    const progressBar = document.getElementById('reading-progress');
    if (!progressBar) return;
    const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
    if (totalHeight <= 0) {
      progressBar.style.width = '0%';
      return;
    }
    const percent = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
    progressBar.style.width = `${percent}%`;
  }

  handleRoute() {
    const hash = location.hash.replace(/^#\/?/, '') || 'home';
    const parts = hash.split('/');
    const route = parts[0] || 'home';
    const param = parts[1];

    this.updateNavLinks(route);
    window.scrollTo({ top: 0, behavior: 'instant' });

    const appEl = document.getElementById('app');
    if (!appEl) return;

    switch (route) {
      case 'home':
        this.renderHome(appEl);
        break;
      case 'articles':
        this.renderArticles(appEl);
        break;
      case 'article':
        this.renderArticleDetail(appEl, param);
        break;
      case 'team':
        this.renderTeam(appEl, param);
        break;
      case 'events':
        this.renderEvents(appEl);
        break;
      case 'resources':
        this.renderResources(appEl);
        break;
      case 'about':
        this.renderAbout(appEl);
        break;
      case 'join':
        this.renderJoin(appEl);
        break;
      case 'bookmarks':
        this.renderBookmarks(appEl);
        break;
      case 'admin':
        this.renderAdmin(appEl);
        break;
      default:
        this.renderHome(appEl);
    }
  }

  updateNavLinks(currentRoute) {
    document.querySelectorAll('.nav-link').forEach(link => {
      const href = link.getAttribute('href') || '';
      const target = href.replace(/^#\/?/, '');
      if (target === currentRoute || (currentRoute === 'home' && target === '')) {
        link.classList.add('active');
      } else {
        link.classList.remove('active');
      }
    });

    const adminLink = document.getElementById('admin-nav-item');
    if (adminLink) {
      adminLink.style.display = this.isAdmin ? 'inline-flex' : 'none';
    }

    this.updateBookmarkBadge();
  }

  updateBookmarkBadge() {
    const badge = document.getElementById('bookmark-count-badge');
    if (badge) {
      badge.textContent = this.bookmarks.length;
      badge.style.display = this.bookmarks.length > 0 ? 'inline-block' : 'none';
    }
  }

  showToast(message, type = 'info') {
    const container = document.getElementById('toast-container');
    if (!container) return;
    const toast = document.createElement('div');
    toast.className = 'toast';
    const icon = type === 'success' ? '✓' : type === 'error' ? '✕' : 'ℹ';
    toast.innerHTML = `<span>${icon}</span> <span>${this.escape(message)}</span>`;
    container.appendChild(toast);
    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transform = 'translateY(12px)';
      toast.style.transition = 'all 0.3s ease';
      setTimeout(() => toast.remove(), 300);
    }, 3200);
  }

  toggleBookmark(postId) {
    const id = Number(postId);
    const index = this.bookmarks.indexOf(id);
    if (index > -1) {
      this.bookmarks.splice(index, 1);
      this.showToast('Article removed from reading list');
    } else {
      this.bookmarks.push(id);
      this.showToast('Article saved to reading list!', 'success');
    }
    this.saveBookmarks();
    this.handleRoute();
  }

  escape(str) {
    return String(str == null ? '' : str).replace(/[&<>"']/g, c => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      '"': '&quot;',
      "'": '&#39;'
    }[c]));
  }

  calcReadTime(text) {
    const words = (text || '').trim().split(/\s+/).length;
    return Math.max(1, Math.round(words / 190));
  }

  formatDate(dateStr) {
    try {
      const d = new Date(dateStr);
      return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' });
    } catch (e) {
      return dateStr;
    }
  }

  // --- RENDERING VIEWS ---

  renderHome(container) {
    const featured = this.data.posts.find(p => p.featured) || this.data.posts[0];
    const latestPosts = this.data.posts.filter(p => p.id !== (featured ? featured.id : 0)).slice(0, 3);
    const upcomingEvents = this.data.events.filter(e => e.status === 'Upcoming').slice(0, 2);

    container.innerHTML = `
      <!-- Hero -->
      <section class="hero">
        <div class="container hero-grid">
          <div>
            <div class="hero-tag">
              <span>★</span> ${this.escape(this.data.cfg.institution)}
            </div>
            <h1 class="hero-title">
              Think like marketers.<br>
              <em>Act like analysts.</em><br>
              Create like professionals.
            </h1>
            <p class="hero-lead">
              ${this.escape(this.data.cfg.description)}
            </p>
            <div class="hero-actions">
              <a href="#/articles" class="btn btn-gold">Explore Latest Research →</a>
              <a href="#/join" class="btn btn-outline-white">Join the Community</a>
            </div>
          </div>
          <div>
            <div class="hero-widget">
              <div class="widget-header">
                <div>
                  <h4>Marketing Pulse 2026</h4>
                  <small style="opacity:0.8">Real-time Student Insights</small>
                </div>
                <span class="live-pill"><i class="live-dot"></i> Active</span>
              </div>
              <svg class="widget-chart" viewBox="0 0 380 180" fill="none">
                <defs>
                  <linearGradient id="chartGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stop-color="#dfb75c" stop-opacity="0.35"/>
                    <stop offset="100%" stop-color="#dfb75c" stop-opacity="0"/>
                  </linearGradient>
                </defs>
                <path d="M10 140 C 70 130, 110 80, 170 95 C 230 110, 280 40, 370 20 L 370 170 L 10 170 Z" fill="url(#chartGrad)"/>
                <path d="M10 140 C 70 130, 110 80, 170 95 C 230 110, 280 40, 370 20" stroke="#dfb75c" stroke-width="3" stroke-linecap="round"/>
                <circle cx="170" cy="95" r="5" fill="#ffffff" stroke="#dfb75c" stroke-width="2"/>
                <circle cx="370" cy="20" r="6" fill="#22c55e" stroke="#ffffff" stroke-width="2"/>
                <text x="180" y="90" fill="#ffffff" font-size="11" font-family="monospace">+38% Engagement</text>
                <text x="270" y="30" fill="#dfb75c" font-size="12" font-weight="bold">Insight Published ✓</text>
              </svg>
              <div class="hero-stats-row">
                <div class="hero-stat-box">
                  <strong>${this.data.posts.length}</strong>
                  <span>Case Studies & Surveys</span>
                </div>
                <div class="hero-stat-box">
                  <strong>${this.data.team.filter(m => !m.hidden).length}</strong>
                  <span>Active Student Fellows</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <!-- Metric Stats Bar -->
      <section class="stats-bar">
        <div class="container stats-grid">
          ${this.data.cfg.stats.map(s => `
            <div class="stat-item">
              <strong>${this.escape(s.value)}</strong>
              <span>${this.escape(s.label)}</span>
            </div>
          `).join('')}
        </div>
      </section>

      <!-- Trending Ticker -->
      <div class="ticker-wrap">
        <div class="ticker-label">Trending Now</div>
        <div class="ticker-content">
          ${this.data.posts.map(p => `
            <a href="#/article/${p.id}" class="ticker-item">
              <strong>${this.escape(p.c)}:</strong> ${this.escape(p.t)}
            </a>
          `).join('')}
        </div>
      </div>

      <!-- Featured Piece & Latest -->
      <section class="section">
        <div class="container">
          <div class="section-head">
            <span class="section-eyebrow">Curated Research</span>
            <h2 class="section-title">Editor's Choice of the Month</h2>
          </div>

          ${featured ? `
            <div class="featured-card">
              <div class="featured-media">
                <img src="${this.escape(featured.cv)}" alt="${this.escape(featured.t)}">
                <span class="card-badge">${this.escape(featured.c)}</span>
              </div>
              <div class="featured-body">
                <span class="section-eyebrow">Featured Analysis</span>
                <h3 class="featured-title">
                  <a href="#/article/${featured.id}">${this.escape(featured.t)}</a>
                </h3>
                <p class="featured-desc">${this.escape(featured.x)}</p>
                <div style="display:flex;align-items:center;justify-content:space-between;gap:12px;flex-wrap:wrap">
                  <small style="color:var(--text-muted);font-weight:600">
                    ${this.formatDate(featured.d)} · ${this.calcReadTime(featured.b)} min read · By ${this.getAuthorName(featured.a)}
                  </small>
                  <a href="#/article/${featured.id}" class="btn btn-primary btn-sm">Read Investigation →</a>
                </div>
              </div>
            </div>
          ` : ''}

          <div style="display:flex;justify-content:space-between;align-items:flex-end;margin:40px 0 24px">
            <div>
              <span class="section-eyebrow">Fresh Insights</span>
              <h3 style="font-family:var(--font-serif);font-size:28px">Latest from the Lab</h3>
            </div>
            <a href="#/articles" class="btn btn-secondary btn-sm">View All ${this.data.posts.length} Articles →</a>
          </div>

          <div class="articles-grid">
            ${latestPosts.map(p => this.renderArticleCard(p)).join('')}
          </div>
        </div>
      </section>

      <!-- Content Categories -->
      <section class="section section-alt">
        <div class="container">
          <div class="section-head" style="text-align:center">
            <span class="section-eyebrow">Seven Knowledge Tracks</span>
            <h2 class="section-title">What We Produce & Research</h2>
            <p class="section-lead" style="margin:0 auto">Every format is designed to be read, cited, and added to a student's professional portfolio.</p>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px">
            ${this.data.categories.map(cat => `
              <div class="card" style="padding:28px;cursor:pointer" onclick="location.hash='#/articles?cat=${encodeURIComponent(cat.id)}'">
                <div style="font-size:32px;margin-bottom:14px">${cat.icon}</div>
                <h3 style="font-family:var(--font-serif);font-size:20px;margin-bottom:8px">${this.escape(cat.name)}</h3>
                <p style="font-size:14px;color:var(--text-secondary);line-height:1.5">${this.escape(cat.desc)}</p>
                <div style="margin-top:16px;color:var(--accent-primary);font-weight:700;font-size:13px">Explore Track →</div>
              </div>
            `).join('')}
          </div>
        </div>
      </section>

      <!-- Upcoming Events Teaser -->
      ${upcomingEvents.length ? `
        <section class="section">
          <div class="container">
            <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:34px;flex-wrap:wrap;gap:16px">
              <div>
                <span class="section-eyebrow">Community & Meetups</span>
                <h2 class="section-title">Upcoming Masterclasses & Workshops</h2>
              </div>
              <a href="#/events" class="btn btn-secondary btn-sm">View Event Calendar →</a>
            </div>
            <div class="events-grid">
              ${upcomingEvents.map(e => this.renderEventCard(e)).join('')}
            </div>
          </div>
        </section>
      ` : ''}

      <!-- CTA Band -->
      <section class="section" style="padding-top:0">
        <div class="container">
          <div class="cta-band">
            <h2>Ready to Publish Real Market Work?</h2>
            <p>Join a community of students who investigate real brands, build analytical portfolios, and connect directly with industry CMOs.</p>
            <div style="display:flex;gap:14px;justify-content:center;flex-wrap:wrap">
              <a href="#/join" class="btn btn-gold">Submit Lab Application</a>
              <a href="#/about" class="btn btn-outline-white">How Editorial Works</a>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  renderArticles(container) {
    const urlParams = new URLSearchParams(location.hash.split('?')[1] || '');
    if (urlParams.has('cat')) {
      this.currentCategory = urlParams.get('cat');
    }

    const filtered = this.data.posts.filter(p => {
      const matchCat = this.currentCategory === 'All' || p.c === this.currentCategory;
      const q = this.searchQuery.toLowerCase();
      const matchSearch = !q || p.t.toLowerCase().includes(q) || p.x.toLowerCase().includes(q) || p.c.toLowerCase().includes(q);
      return matchCat && matchSearch;
    });

    container.innerHTML = `
      <section class="section">
        <div class="container">
          <div class="section-head">
            <span class="section-eyebrow">Knowledge Repository</span>
            <h1 class="section-title">Publications & Research</h1>
            <p class="section-lead">Investigative case studies, data models, and strategic breakdowns authored by BMU students.</p>
          </div>

          <div class="filter-bar">
            <div class="filter-chips">
              <button class="chip ${this.currentCategory === 'All' ? 'active' : ''}" onclick="window.app.setCategory('All')">All (${this.data.posts.length})</button>
              ${this.data.categories.map(c => `
                <button class="chip ${this.currentCategory === c.id ? 'active' : ''}" onclick="window.app.setCategory('${c.id}')">
                  ${c.icon} ${this.escape(c.name)}
                </button>
              `).join('')}
            </div>

            <div class="search-wrapper">
              <span class="search-icon">🔍</span>
              <input type="search" class="search-input" placeholder="Search insights, brands, authors..." 
                value="${this.escape(this.searchQuery)}" oninput="window.app.setSearch(this.value)">
            </div>
          </div>

          ${filtered.length ? `
            <div class="articles-grid">
              ${filtered.map(p => this.renderArticleCard(p)).join('')}
            </div>
          ` : `
            <div style="text-align:center;padding:80px 20px;background:var(--bg-surface);border-radius:var(--radius-lg);border:1px dashed var(--border-light)">
              <div style="font-size:44px;margin-bottom:12px">🔎</div>
              <h3 style="font-family:var(--font-serif);font-size:22px;margin-bottom:8px">No publications found</h3>
              <p style="color:var(--text-muted);margin-bottom:20px">Try adjusting your search terms or clearing category filters.</p>
              <button class="btn btn-secondary btn-sm" onclick="window.app.resetFilters()">Reset All Filters</button>
            </div>
          `}
        </div>
      </section>
    `;
  }

  renderArticleCard(p) {
    const isBookmarked = this.bookmarks.includes(p.id);
    return `
      <article class="card">
        <div class="card-media">
          <img src="${this.escape(p.cv || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80')}" alt="${this.escape(p.t)}" loading="lazy">
          <span class="card-badge">${this.escape(p.c)}</span>
          <button class="card-bookmark-btn ${isBookmarked ? 'active' : ''}" 
            title="${isBookmarked ? 'Remove bookmark' : 'Save bookmark'}" 
            onclick="window.app.toggleBookmark(${p.id})">
            ${isBookmarked ? '★' : '☆'}
          </button>
        </div>
        <div class="card-body">
          <h3 class="card-title">
            <a href="#/article/${p.id}">${this.escape(p.t)}</a>
          </h3>
          <p class="card-desc">${this.escape(p.x)}</p>
          <div class="card-footer">
            <span>By ${this.getAuthorName(p.a)}</span>
            <span>${this.calcReadTime(p.b)} min read</span>
          </div>
        </div>
      </article>
    `;
  }

  renderArticleDetail(container, id) {
    const post = this.data.posts.find(p => p.id === Number(id));
    if (!post) {
      location.hash = '#/articles';
      return;
    }

    const author = this.data.team.find(m => m.id === post.a) || { n: 'Marketing Lab Fellow', r: 'Student Researcher' };
    const related = this.data.posts.filter(p => p.c === post.c && p.id !== post.id).slice(0, 2);
    const isBookmarked = this.bookmarks.includes(post.id);

    // Format Markdown-like text into HTML
    const formattedContent = post.b.split(/\n\s*\n/).map(block => {
      const trimmed = block.trim();
      if (trimmed.startsWith('### ')) {
        return `<h3>${this.escape(trimmed.slice(4))}</h3>`;
      }
      if (trimmed.startsWith('> ')) {
        return `<blockquote>${this.escape(trimmed.slice(2))}</blockquote>`;
      }
      if (trimmed.startsWith('- ')) {
        const items = trimmed.split('\n').map(li => `<li>${this.escape(li.replace(/^-\s*/, ''))}</li>`).join('');
        return `<ul>${items}</ul>`;
      }
      return `<p>${this.escape(trimmed)}</p>`;
    }).join('');

    container.innerHTML = `
      <article class="reader-container">
        <a href="#/articles" class="reader-back">← Back to all publications</a>
        <div class="reader-header">
          <span class="section-eyebrow">${this.escape(post.c)}</span>
          <h1 class="reader-title">${this.escape(post.t)}</h1>
          <p class="reader-lead">${this.escape(post.x)}</p>
          <div class="reader-meta-bar">
            <div class="reader-author">
              <div style="width:40px;height:40px;border-radius:50%;overflow:hidden;border:2px solid var(--accent-primary)">
                <img src="${this.escape(author.ph || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80')}" alt="${this.escape(author.n)}" style="width:100%;height:100%;object-fit:cover">
              </div>
              <div>
                <strong style="color:var(--text-main);display:block">${this.escape(author.n)}</strong>
                <small>${this.escape(author.r)}</small>
              </div>
            </div>
            <div style="display:flex;align-items:center;gap:14px">
              <span>📅 ${this.formatDate(post.d)}</span>
              <span>⏱ ${this.calcReadTime(post.b)} min read</span>
              <button class="chip ${isBookmarked ? 'active' : ''}" onclick="window.app.toggleBookmark(${post.id})">
                ${isBookmarked ? '★ Saved' : '☆ Save for later'}
              </button>
            </div>
          </div>
        </div>

        ${post.cv ? `<img src="${this.escape(post.cv)}" alt="${this.escape(post.t)}" class="reader-cover">` : ''}

        <div class="reader-content">
          ${formattedContent}
        </div>

        <div class="reader-share">
          <strong style="font-size:14px;margin-right:8px">Share this piece:</strong>
          <button class="chip" onclick="window.app.shareArticle('tg', '${encodeURIComponent(post.t)}')">Telegram</button>
          <button class="chip" onclick="window.app.shareArticle('li', '${encodeURIComponent(post.t)}')">LinkedIn</button>
          <button class="chip" onclick="window.app.copyArticleLink()">Copy Link</button>
        </div>

        <!-- Author Bio Card -->
        <div class="card" style="margin-top:50px;padding:30px;display:flex;flex-direction:row;gap:24px;align-items:center;flex-wrap:wrap">
          <div style="width:80px;height:80px;border-radius:50%;overflow:hidden;flex-shrink:0;border:3px solid var(--border-light)">
            <img src="${this.escape(author.ph || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80')}" alt="${this.escape(author.n)}" style="width:100%;height:100%;object-fit:cover">
          </div>
          <div style="flex-grow:1">
            <span class="section-eyebrow" style="margin-bottom:2px">Author Profile</span>
            <h3 style="font-family:var(--font-serif);font-size:20px;margin-bottom:4px">${this.escape(author.n)}</h3>
            <p style="font-size:14px;color:var(--text-secondary);line-height:1.5;margin-bottom:10px">${this.escape(author.bio || author.r)}</p>
            ${author.ln ? `<a href="${this.escape(author.ln)}" target="_blank" rel="noopener" class="btn btn-secondary btn-sm" style="display:inline-flex">View on LinkedIn ↗</a>` : ''}
          </div>
        </div>

        ${related.length ? `
          <div style="margin-top:60px">
            <h3 style="font-family:var(--font-serif);font-size:24px;margin-bottom:24px">Related Research in ${this.escape(post.c)}</h3>
            <div class="articles-grid">
              ${related.map(p => this.renderArticleCard(p)).join('')}
            </div>
          </div>
        ` : ''}
      </article>
    `;
  }

  renderTeam(container) {
    const departments = ['All', 'Leadership', 'Research & Strategy', 'Editorial', 'Creative & Design', 'Advisory'];
    const visibleMembers = this.data.team.filter(m => this.isAdmin || (!m.hidden && !/admin/i.test(m.r)));
    const filtered = visibleMembers.filter(m => this.currentTeamDept === 'All' || m.g === this.currentTeamDept);

    container.innerHTML = `
      <section class="section">
        <div class="container">
          <div class="section-head">
            <span class="section-eyebrow">The Collective</span>
            <h1 class="section-title">The Students & Advisors Behind the Lab</h1>
            <p class="section-lead">A collaborative team of researchers, editors, creatives, and mentors driving rigorous marketing education at BMU.</p>
          </div>

          <div class="team-tabs">
            ${departments.map(d => `
              <button class="team-tab-btn ${this.currentTeamDept === d ? 'active' : ''}" 
                onclick="window.app.setTeamDept('${d}')">${d}</button>
            `).join('')}
          </div>

          <div class="team-grid">
            ${filtered.map(m => `
              <div class="team-card">
                <div class="team-avatar">
                  <img src="${this.escape(m.ph || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80')}" alt="${this.escape(m.n)}">
                </div>
                <h3 class="team-name">${this.escape(m.n)}</h3>
                <div class="team-role">${this.escape(m.r)}</div>
                <p class="team-bio">${this.escape(m.bio)}</p>
                <div class="team-skills">
                  ${(m.sk || []).map(s => `<span class="skill-tag">${this.escape(s)}</span>`).join('')}
                </div>
                ${m.ln ? `<div style="margin-top:16px"><a href="${this.escape(m.ln)}" target="_blank" rel="noopener" style="font-size:12px;color:var(--accent-primary);font-weight:700">Connect on LinkedIn ↗</a></div>` : ''}
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  renderEvents(container) {
    container.innerHTML = `
      <section class="section">
        <div class="container">
          <div class="section-head">
            <span class="section-eyebrow">Masterclasses & Symposia</span>
            <h1 class="section-title">Interactive Events Calendar</h1>
            <p class="section-lead">Join our on-campus and virtual workshops with guest brand directors, strategists, and analytics leads.</p>
          </div>

          <div class="events-grid">
            ${this.data.events.map(e => this.renderEventCard(e)).join('')}
          </div>
        </div>
      </section>
    `;
  }

  renderEventCard(e) {
    const d = new Date(e.d);
    const day = isNaN(d) ? '15' : d.getDate();
    const month = isNaN(d) ? 'NOV' : d.toLocaleString('en', { month: 'short' }).toUpperCase();
    const isPast = e.status === 'Past';

    return `
      <div class="event-card">
        <div class="event-date-badge">
          <div class="event-day">${day}</div>
          <div class="event-month">${month}</div>
        </div>
        <div class="event-details" style="flex-grow:1">
          <h3>${this.escape(e.t)}</h3>
          <div class="event-meta">
            <span>⏰ ${this.escape(e.time || '15:00')}</span>
            <span>📍 ${this.escape(e.p)}</span>
          </div>
          <p class="event-desc">${this.escape(e.x)}</p>
          <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
            ${!isPast ? `
              <button class="btn btn-primary btn-sm" onclick="window.app.openRsvpModal(${e.id})">RSVP Spot</button>
              <button class="btn btn-secondary btn-sm" onclick="window.app.downloadCalendarFile(${e.id})">📅 Add to Calendar</button>
            ` : `
              <span class="chip" style="cursor:default">Event Concluded</span>
            `}
          </div>
        </div>
      </div>
    `;
  }

  renderResources(container) {
    container.innerHTML = `
      <section class="section">
        <div class="container">
          <div class="section-head">
            <span class="section-eyebrow">Toolkits & Frameworks</span>
            <h1 class="section-title">Resources for Student Marketers</h1>
            <p class="section-lead">Download proven frameworks, stylebooks, and analytical spreadsheet models used by our lab team.</p>
          </div>

          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(280px,1fr));gap:24px">
            ${this.data.resources.map(r => `
              <div class="card" style="padding:28px">
                <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:14px">
                  <span class="skill-tag" style="background:var(--crimson-100);color:var(--crimson-700)">${this.escape(r.tag)}</span>
                  <small style="color:var(--text-muted);font-weight:700">${this.escape(r.format)}</small>
                </div>
                <h3 style="font-family:var(--font-serif);font-size:19px;margin-bottom:8px">${this.escape(r.t)}</h3>
                <p style="font-size:14px;color:var(--text-secondary);line-height:1.5;margin-bottom:24px">${this.escape(r.x)}</p>
                <button class="btn btn-secondary btn-sm" style="width:100%" onclick="window.app.showToast('Resource downloaded successfully!', 'success')">
                  Download Asset ⬇
                </button>
              </div>
            `).join('')}
          </div>
        </div>
      </section>
    `;
  }

  renderAbout(container) {
    container.innerHTML = `
      <section class="section">
        <div class="container" style="max-width:860px">
          <div class="section-head">
            <span class="section-eyebrow">Origin & Mission</span>
            <h1 class="section-title">Bridging Classroom Theory with Real Market Practice</h1>
            <p class="section-lead">Founded in 2026, Marketing Insights Lab is a student-led publication and research collective connected to British Management University.</p>
          </div>

          <div class="reader-content">
            <p>Traditional marketing education moves at the speed of textbooks; digital commerce moves at the speed of weekly algorithm updates. The Marketing Insights Lab exists to solve this asymmetry.</p>

            <blockquote>
              "Our mission is to empower student analysts to dissect real market campaigns, conduct original consumer research, and publish work that commands respect in boardrooms."
            </blockquote>

            <h3>The Four Pillars of the Lab</h3>
            <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:20px;margin:28px 0">
              <div class="card" style="padding:24px">
                <strong style="color:var(--accent-primary);font-size:20px;display:block;margin-bottom:6px">01. Research</strong>
                <p style="font-size:14px;color:var(--text-secondary)">Identify under-explored market shifts and gather verified empirical evidence.</p>
              </div>
              <div class="card" style="padding:24px">
                <strong style="color:var(--accent-primary);font-size:20px;display:block;margin-bottom:6px">02. Deconstruct</strong>
                <p style="font-size:14px;color:var(--text-secondary)">Turn complex data into structured, visually engaging analytical articles.</p>
              </div>
              <div class="card" style="padding:24px">
                <strong style="color:var(--accent-primary);font-size:20px;display:block;margin-bottom:6px">03. Peer Review</strong>
                <p style="font-size:14px;color:var(--text-secondary)">Refine arguments with editorial feedback from peers and senior faculty advisors.</p>
              </div>
              <div class="card" style="padding:24px">
                <strong style="color:var(--accent-primary);font-size:20px;display:block;margin-bottom:6px">04. Build Portfolio</strong>
                <p style="font-size:14px;color:var(--text-secondary)">Graduate with verified, publicly cited publications under your own name.</p>
              </div>
            </div>

            <h3>Letter from the Editorial Board</h3>
            <p>When we launched this initiative, our ambition was simple: make marketing education practical, collaborative, and globally relevant. Since then, our student authors have broken down campaigns that caught the attention of regional marketing directors, hosted international guest speakers, and built a culture of genuine curiosity.</p>
            <p>We are grateful for the ongoing guidance of British Management University and thrilled for what lies ahead.</p>
          </div>
        </div>
      </section>
    `;
  }

  renderJoin(container) {
    container.innerHTML = `
      <section class="section">
        <div class="container" style="max-width:760px">
          <div class="section-head" style="text-align:center">
            <span class="section-eyebrow">Apply for Membership</span>
            <h1 class="section-title">Join the Marketing Insights Lab</h1>
            <p class="section-lead" style="margin:0 auto">We recruit curious, driven students across all years and programmes who are eager to research, write, and publish real industry work.</p>
          </div>

          <div class="card" style="padding:40px">
            <form onsubmit="window.app.handleJoinSubmit(event)">
              <div class="form-group">
                <label class="form-label">Full Name *</label>
                <input type="text" name="name" class="form-control" placeholder="e.g. Malika Karimova" required>
              </div>

              <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
                <div class="form-group">
                  <label class="form-label">University Email *</label>
                  <input type="email" name="email" class="form-control" placeholder="name@bmu-edu.uz" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Programme & Year *</label>
                  <input type="text" name="programme" class="form-control" placeholder="e.g. BSc Marketing, Year 2" required>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Primary Track of Interest *</label>
                <select name="track" class="form-control" required>
                  ${this.data.categories.map(c => `<option value="${c.id}">${c.name}</option>`).join('')}
                </select>
              </div>

              <div class="form-group">
                <label class="form-label">Why do you want to join the Lab? *</label>
                <textarea name="motivation" class="form-control" rows="4" placeholder="Tell us about a marketing topic or brand you would love to investigate..." required></textarea>
              </div>

              <div class="form-group">
                <label class="form-label">Link to LinkedIn / Portfolio (optional)</label>
                <input type="url" name="portfolio" class="form-control" placeholder="https://linkedin.com/in/username">
              </div>

              <div style="margin-top:28px">
                <button type="submit" class="btn btn-primary" style="width:100%;padding:14px">Submit Membership Application 🚀</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    `;
  }

  renderBookmarks(container) {
    const bookmarkedPosts = this.data.posts.filter(p => this.bookmarks.includes(p.id));

    container.innerHTML = `
      <section class="section">
        <div class="container">
          <div class="section-head">
            <span class="section-eyebrow">Personal Reading List</span>
            <h1 class="section-title">Saved Articles (${bookmarkedPosts.length})</h1>
            <p class="section-lead">Articles you've bookmarked for offline study and reference.</p>
          </div>

          ${bookmarkedPosts.length ? `
            <div class="articles-grid">
              ${bookmarkedPosts.map(p => this.renderArticleCard(p)).join('')}
            </div>
          ` : `
            <div style="text-align:center;padding:80px 20px;background:var(--bg-surface);border-radius:var(--radius-lg);border:1px dashed var(--border-light)">
              <div style="font-size:44px;margin-bottom:12px">📚</div>
              <h3 style="font-family:var(--font-serif);font-size:22px;margin-bottom:8px">Your reading list is empty</h3>
              <p style="color:var(--text-muted);margin-bottom:20px">Click the star icon (☆) on any article card to save it here for later.</p>
              <a href="#/articles" class="btn btn-primary btn-sm">Browse Publications</a>
            </div>
          `}
        </div>
      </section>
    `;
  }

  renderAdmin(container) {
    if (!this.isAdmin) {
      container.innerHTML = `
        <section class="section">
          <div class="container" style="max-width:440px">
            <div class="card" style="padding:36px">
              <span class="section-eyebrow" style="color:var(--accent-primary)">Administrator Portal</span>
              <h2 style="font-family:var(--font-serif);font-size:24px;margin:8px 0 16px">Security Authentication</h2>
              <p style="font-size:14px;color:var(--text-secondary);margin-bottom:24px">Enter your administrator password to edit publications, team roster, and site settings.</p>
              
              <form onsubmit="window.app.handleAdminLogin(event)">
                <div class="form-group">
                  <label class="form-label">Admin Password</label>
                  <input type="password" id="admin-pass-input" class="form-control" placeholder="••••••••" required autofocus>
                </div>
                <div id="admin-login-error" style="color:var(--crimson-700);font-size:13px;font-weight:600;display:none;margin-bottom:16px">
                  Incorrect password. Please try again.
                </div>
                <div style="display:flex;gap:12px;align-items:center">
                  <button type="submit" class="btn btn-primary" style="flex-grow:1">Authenticate</button>
                  <a href="#/home" class="btn btn-secondary btn-sm">Cancel</a>
                </div>
              </form>
            </div>
          </div>
        </section>
      `;
      return;
    }

    container.innerHTML = `
      <section class="section">
        <div class="container">
          <div style="display:flex;justify-content:space-between;align-items:flex-end;margin-bottom:34px;flex-wrap:wrap;gap:16px">
            <div>
              <span class="section-eyebrow">Dashboard Controls</span>
              <h1 class="section-title">Administrator Management Panel</h1>
            </div>
            <div style="display:flex;gap:10px;align-items:center;flex-wrap:wrap">
              <button class="btn btn-gold btn-sm" onclick="window.app.downloadDataBackup()">Backup JSON ⬇</button>
              <button class="btn btn-secondary btn-sm" onclick="window.app.handleAdminLogout()">Log Out</button>
            </div>
          </div>

          <!-- Summary Stats -->
          <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(200px,1fr));gap:20px;margin-bottom:40px">
            <div class="card" style="padding:20px">
              <span style="font-size:12px;color:var(--text-muted);text-transform:uppercase;font-weight:700">Total Publications</span>
              <strong style="font-family:var(--font-serif);font-size:32px;color:var(--accent-primary);display:block">${this.data.posts.length}</strong>
            </div>
            <div class="card" style="padding:20px">
              <span style="font-size:12px;color:var(--text-muted);text-transform:uppercase;font-weight:700">Team Fellows</span>
              <strong style="font-family:var(--font-serif);font-size:32px;color:var(--accent-primary);display:block">${this.data.team.length}</strong>
            </div>
            <div class="card" style="padding:20px">
              <span style="font-size:12px;color:var(--text-muted);text-transform:uppercase;font-weight:700">Events Scheduled</span>
              <strong style="font-family:var(--font-serif);font-size:32px;color:var(--accent-primary);display:block">${this.data.events.length}</strong>
            </div>
          </div>

          <!-- Manage Articles -->
          <div class="card" style="padding:32px;margin-bottom:40px">
            <div style="display:flex;justify-content:space-between;align-items:center;margin-bottom:20px">
              <h3 style="font-family:var(--font-serif);font-size:22px">Publications & Analyses</h3>
              <button class="btn btn-primary btn-sm" onclick="window.app.openArticleModal()">+ Create New Article</button>
            </div>
            <div style="display:flex;flex-direction:column;gap:12px">
              ${this.data.posts.map(p => `
                <div style="display:flex;justify-content:space-between;align-items:center;padding:12px 16px;background:var(--bg-surface-elevated);border-radius:var(--radius-sm);gap:12px">
                  <div style="overflow:hidden;text-overflow:ellipsis;white-space:nowrap">
                    <strong>${this.escape(p.t)}</strong>
                    <small style="display:block;color:var(--text-muted)">${this.escape(p.c)} · ${p.d} · By ${this.getAuthorName(p.a)}</small>
                  </div>
                  <div style="display:flex;gap:8px;flex-shrink:0">
                    <button class="btn btn-secondary btn-sm" onclick="window.app.openArticleModal(${p.id})">Edit</button>
                    <button class="btn btn-secondary btn-sm" style="color:var(--crimson-700)" onclick="window.app.deletePost(${p.id})">Delete</button>
                  </div>
                </div>
              `).join('')}
            </div>
          </div>

          <!-- Site Configuration & Password -->
          <div class="card" style="padding:32px">
            <h3 style="font-family:var(--font-serif);font-size:22px;margin-bottom:20px">Site & Security Settings</h3>
            <form onsubmit="window.app.handleSaveSettings(event)">
              <div style="display:grid;grid-template-columns:1fr 1fr;gap:20px">
                <div class="form-group">
                  <label class="form-label">Admin Password</label>
                  <input type="text" name="adminPass" class="form-control" value="${this.escape(this.data.cfg.adminPass || 'admin123')}" required>
                </div>
                <div class="form-group">
                  <label class="form-label">Contact Email</label>
                  <input type="email" name="email" class="form-control" value="${this.escape(this.data.cfg.email || '')}" required>
                </div>
              </div>

              <div class="form-group">
                <label class="form-label">Telegram Channel URL</label>
                <input type="url" name="telegram" class="form-control" value="${this.escape(this.data.cfg.socials.telegram || '')}">
              </div>

              <div class="form-group">
                <label class="form-label">LinkedIn Page URL</label>
                <input type="url" name="linkedin" class="form-control" value="${this.escape(this.data.cfg.socials.linkedin || '')}">
              </div>

              <div style="margin-top:20px">
                <button type="submit" class="btn btn-primary">Save Settings</button>
              </div>
            </form>
          </div>
        </div>
      </section>
    `;
  }

  // --- ACTIONS & MODALS ---

  setCategory(catId) {
    this.currentCategory = catId;
    this.handleRoute();
  }

  setSearch(q) {
    this.searchQuery = q;
    this.handleRoute();
  }

  resetFilters() {
    this.currentCategory = 'All';
    this.searchQuery = '';
    this.handleRoute();
  }

  setTeamDept(dept) {
    this.currentTeamDept = dept;
    this.handleRoute();
  }

  getAuthorName(authorId) {
    const author = this.data.team.find(m => m.id === Number(authorId));
    return author ? author.n : 'Lab Fellow';
  }

  handleAdminLogin(e) {
    e.preventDefault();
    const input = document.getElementById('admin-pass-input').value.trim();
    const expected = this.data.cfg.adminPass || 'admin123';
    if (input === expected) {
      this.isAdmin = true;
      sessionStorage.setItem(AUTH_KEY, '1');
      this.showToast('Authentication successful!', 'success');
      this.handleRoute();
    } else {
      const err = document.getElementById('admin-login-error');
      if (err) err.style.display = 'block';
    }
  }

  handleAdminLogout() {
    this.isAdmin = false;
    sessionStorage.removeItem(AUTH_KEY);
    this.showToast('Logged out of admin mode');
    location.hash = '#/home';
  }

  handleSaveSettings(e) {
    e.preventDefault();
    const form = e.target;
    this.data.cfg.adminPass = form.adminPass.value.trim();
    this.data.cfg.email = form.email.value.trim();
    this.data.cfg.socials.telegram = form.telegram.value.trim();
    this.data.cfg.socials.linkedin = form.linkedin.value.trim();
    this.saveData();
    this.showToast('Settings updated successfully!', 'success');
  }

  deletePost(id) {
    if (confirm('Are you sure you want to delete this publication?')) {
      this.data.posts = this.data.posts.filter(p => p.id !== id);
      this.saveData();
      this.showToast('Publication deleted');
      this.handleRoute();
    }
  }

  openArticleModal(postId = null) {
    const post = postId ? this.data.posts.find(p => p.id === postId) : null;
    const dialog = document.getElementById('article-modal');
    if (!dialog) return;

    dialog.innerHTML = `
      <div class="dialog-box">
        <button class="dialog-close" onclick="document.getElementById('article-modal').close()">✕</button>
        <h3 style="font-family:var(--font-serif);font-size:22px;margin-bottom:20px">
          ${post ? 'Edit Article' : 'New Publication'}
        </h3>
        <form onsubmit="window.app.saveArticleForm(event, ${postId || 'null'})">
          <div class="form-group">
            <label class="form-label">Article Title *</label>
            <input type="text" name="title" class="form-control" value="${this.escape(post ? post.t : '')}" required>
          </div>
          <div style="display:grid;grid-template-columns:1fr 1fr;gap:16px">
            <div class="form-group">
              <label class="form-label">Track Category *</label>
              <select name="category" class="form-control" required>
                ${this.data.categories.map(c => `
                  <option value="${c.id}" ${post && post.c === c.id ? 'selected' : ''}>${c.name}</option>
                `).join('')}
              </select>
            </div>
            <div class="form-group">
              <label class="form-label">Lead Author *</label>
              <select name="author" class="form-control" required>
                ${this.data.team.map(m => `
                  <option value="${m.id}" ${post && post.a === m.id ? 'selected' : ''}>${m.n}</option>
                `).join('')}
              </select>
            </div>
          </div>
          <div class="form-group">
            <label class="form-label">Executive Summary (Subtitle) *</label>
            <textarea name="summary" class="form-control" rows="2" required>${this.escape(post ? post.x : '')}</textarea>
          </div>
          <div class="form-group">
            <label class="form-label">Cover Image URL</label>
            <input type="url" name="cover" class="form-control" value="${this.escape(post ? post.cv : '')}" placeholder="https://images.unsplash.com/...">
          </div>
          <div class="form-group">
            <label class="form-label">Article Body (supports ### Headings and > Quotes) *</label>
            <textarea name="body" class="form-control" rows="8" required>${this.escape(post ? post.b : '')}</textarea>
          </div>
          <div class="form-group" style="display:flex;align-items:center;gap:10px">
            <input type="checkbox" name="featured" id="chk-feat" ${post && post.featured ? 'checked' : ''}>
            <label for="chk-feat" style="font-size:14px;cursor:pointer">Feature as Article of the Month</label>
          </div>
          <div style="display:flex;gap:12px;margin-top:24px">
            <button type="submit" class="btn btn-primary">Save & Publish</button>
            <button type="button" class="btn btn-secondary btn-sm" onclick="document.getElementById('article-modal').close()">Cancel</button>
          </div>
        </form>
      </div>
    `;
    dialog.showModal();
  }

  saveArticleForm(e, postId) {
    e.preventDefault();
    const f = e.target;
    const isNew = !postId;
    const newId = isNew ? Math.max(...this.data.posts.map(p => p.id), 0) + 1 : postId;

    const postObj = {
      id: newId,
      t: f.title.value.trim(),
      c: f.category.value,
      a: Number(f.author.value),
      x: f.summary.value.trim(),
      cv: f.cover.value.trim() || 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80',
      b: f.body.value.trim(),
      featured: f.featured.checked,
      d: isNew ? new Date().toISOString().slice(0, 10) : (this.data.posts.find(p => p.id === postId)?.d || new Date().toISOString().slice(0, 10))
    };

    if (postObj.featured) {
      this.data.posts.forEach(p => p.featured = false);
    }

    if (isNew) {
      this.data.posts.unshift(postObj);
    } else {
      const idx = this.data.posts.findIndex(p => p.id === postId);
      if (idx > -1) this.data.posts[idx] = postObj;
    }

    this.saveData();
    document.getElementById('article-modal').close();
    this.showToast('Article published successfully!', 'success');
    this.handleRoute();
  }

  openRsvpModal(eventId) {
    const ev = this.data.events.find(e => e.id === eventId);
    if (!ev) return;
    const dialog = document.getElementById('rsvp-modal');
    if (!dialog) return;

    dialog.innerHTML = `
      <div class="dialog-box">
        <button class="dialog-close" onclick="document.getElementById('rsvp-modal').close()">✕</button>
        <span class="section-eyebrow">Spot Reservation</span>
        <h3 style="font-family:var(--font-serif);font-size:22px;margin:6px 0 16px">${this.escape(ev.t)}</h3>
        <p style="font-size:14px;color:var(--text-secondary);margin-bottom:20px">📅 ${ev.d} · ⏰ ${ev.time || '15:00'} · 📍 ${this.escape(ev.p)}</p>
        
        <form onsubmit="window.app.handleRsvpSubmit(event, ${ev.id})">
          <div class="form-group">
            <label class="form-label">Full Name *</label>
            <input type="text" name="name" class="form-control" required placeholder="Your name">
          </div>
          <div class="form-group">
            <label class="form-label">Email Address *</label>
            <input type="email" name="email" class="form-control" required placeholder="student@bmu-edu.uz">
          </div>
          <div style="display:flex;gap:12px;margin-top:24px">
            <button type="submit" class="btn btn-primary" style="flex-grow:1">Confirm Free RSVP</button>
          </div>
        </form>
      </div>
    `;
    dialog.showModal();
  }

  handleRsvpSubmit(e, eventId) {
    e.preventDefault();
    document.getElementById('rsvp-modal').close();
    this.showToast('Spot confirmed! We have emailed you the entry ticket.', 'success');
  }

  downloadCalendarFile(eventId) {
    const ev = this.data.events.find(e => e.id === eventId);
    if (!ev) return;
    const icsContent = `BEGIN:VCALENDAR
VERSION:2.0
PRODID:-//BMU Marketing Insights Lab//EN
BEGIN:VEVENT
SUMMARY:${ev.t}
DESCRIPTION:${ev.x}
LOCATION:${ev.p}
DTSTART:${ev.d.replace(/-/g, '')}T100000Z
DTEND:${ev.d.replace(/-/g, '')}T120000Z
STATUS:CONFIRMED
END:VEVENT
END:VCALENDAR`;

    const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `event-${ev.id}.ics`;
    link.click();
    this.showToast('Calendar invite (.ics) generated!');
  }

  handleJoinSubmit(e) {
    e.preventDefault();
    e.target.reset();
    this.showToast('Thank you! Your application has been received.', 'success');
    setTimeout(() => {
      location.hash = '#/home';
    }, 1200);
  }

  shareArticle(platform, titleEncoded) {
    const url = encodeURIComponent(location.href);
    if (platform === 'tg') {
      window.open(`https://t.me/share/url?url=${url}&text=${titleEncoded}`, '_blank');
    } else if (platform === 'li') {
      window.open(`https://www.linkedin.com/sharing/share-offsite/?url=${url}`, '_blank');
    }
  }

  copyArticleLink() {
    navigator.clipboard.writeText(location.href).then(() => {
      this.showToast('Link copied to clipboard!');
    }).catch(() => {
      this.showToast('Could not copy link');
    });
  }

  downloadDataBackup() {
    const jsonStr = JSON.stringify(this.data, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const a = document.createElement('a');
    a.href = URL.createObjectURL(blob);
    a.download = `marketing-lab-backup-${new Date().toISOString().slice(0, 10)}.json`;
    a.click();
    this.showToast('Backup JSON downloaded!');
  }

  initEventListeners() {
    const themeBtn = document.getElementById('theme-toggle-btn');
    if (themeBtn) {
      themeBtn.addEventListener('click', () => this.toggleTheme());
    }

    const mobileBtn = document.getElementById('mobile-nav-toggle');
    const mobileMenu = document.getElementById('mobile-drawer');
    if (mobileBtn && mobileMenu) {
      mobileBtn.addEventListener('click', () => {
        mobileMenu.classList.toggle('open');
      });
    }
  }
}

// Initialize on DOM load
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
