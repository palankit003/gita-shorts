// YouTube Shorts & Instagram Reels Engine for Bhagavad Gita Chapter 12
// Vertical snap scrolling, auto-playback, synchronized recitation overlay, and interactive gestures

document.addEventListener("DOMContentLoaded", () => {
  const feed = document.getElementById("reels-feed");
  const desktopJumpPanel = document.getElementById("desktop-jump-panel");
  const btnPrevReel = document.getElementById("btn-prev-reel");
  const btnNextReel = document.getElementById("btn-next-reel");
  const toast = document.getElementById("toast-msg");
  const drawerBackdrop = document.getElementById("info-drawer-backdrop");
  const drawer = document.getElementById("info-drawer");
  const drawerTitle = document.getElementById("drawer-title");
  const drawerBody = document.getElementById("drawer-body");
  const btnDrawerClose = document.getElementById("btn-drawer-close");

  // State
  let activeReelNum = 1;
  let currentAudio = null;
  let animFrameId = null;
  let globalMuted = false;
  let loopCurrentReel = false;
  let globalTrackPreference = "sanskrit"; // 'sanskrit', 'recit', 'full'
  const likeCounts = {};
  const likedReels = new Set();

  initReelsApp();

  function initReelsApp() {
    renderReelSlides();
    renderDesktopJumpChips();
    setupIntersectionObserver();
    setupGlobalShortcuts();
    setupDrawer();
  }

  // 1. Render All 20 Shlokas as Vertical Shorts / Reels
  function renderReelSlides() {
    feed.innerHTML = "";
    GITA_DATA.forEach(shloka => {
      // Mock like counts (e.g. 12.4K + verse num)
      likeCounts[shloka.num] = (10.5 + shloka.num * 0.4).toFixed(1) + "K";

      const slide = document.createElement("section");
      slide.className = "reel-slide";
      slide.id = `reel-${shloka.num}`;
      slide.dataset.num = shloka.num;
      slide.dataset.activeTrack = globalTrackPreference;

      slide.innerHTML = `
        <!-- Ambient Aura Decor -->
        <div class="reel-background-decor">
          <div class="mandala-aura"></div>
        </div>

        <!-- Top Bar Overlay -->
        <div class="reel-top-bar">
          <div class="top-tabs">
            <span class="tab-item active">अध्याय १२ • भक्तियोगः</span>
          </div>
          <div class="top-actions">
            <button class="btn-icon-top btn-mute-toggle" title="Mute / Unmute">
              ${globalMuted ? '🔇' : '🔊'}
            </button>
          </div>
        </div>

        <!-- Center Shloka Display (Tap to Play/Pause, Double-Tap to Like) -->
        <div class="reel-center-content" id="center-tap-area-${shloka.num}">
          ${shloka.speaker ? `<div class="speaker-pill" id="speaker-${shloka.num}">${shloka.speaker}</div>` : ""}

          <div class="shloka-text-box">
            ${shloka.sanskrit.map((line, lIdx) => `
              <div class="sanskrit-line" id="line-${shloka.num}-${lIdx}" data-line-idx="${lIdx}">
                ${buildLineWordsHtml(line, lIdx)}
              </div>
            `).join("")}
          </div>

          <!-- Play/Pause Tap Ripple -->
          <div class="center-tap-indicator" id="tap-indicator-${shloka.num}">▶</div>
        </div>

        <!-- Right Side Floating Actions -->
        <div class="reel-sidebar">
          <!-- Like Button -->
          <button class="sidebar-btn btn-like" id="btn-like-${shloka.num}" title="Like Shloka">
            <div class="sidebar-icon-circle">❤️</div>
            <span class="sidebar-label" id="like-count-${shloka.num}">${likeCounts[shloka.num]}</span>
          </button>

          <!-- Audio Track Switcher (Spinning Vinyl) -->
          <button class="sidebar-btn btn-track-cycle" id="btn-track-${shloka.num}" title="Switch Audio Track (Chanting / Recitation / Full)">
            <div class="spinning-vinyl spinning" id="vinyl-${shloka.num}">🎵</div>
            <span class="sidebar-label" id="track-label-${shloka.num}">Chanting</span>
          </button>

          <!-- Loop Current Shloka Toggle -->
          <button class="sidebar-btn btn-loop-toggle ${loopCurrentReel ? 'active' : ''}" id="btn-loop-${shloka.num}" title="Loop vs Auto-Advance">
            <div class="sidebar-icon-circle">🔁</div>
            <span class="sidebar-label" id="loop-label-${shloka.num}">${loopCurrentReel ? 'Loop: ON' : 'Scroll: ON'}</span>
          </button>

          <!-- Meaning / Translation Drawer -->
          <button class="sidebar-btn btn-info-drawer" id="btn-info-${shloka.num}" title="View Shloka Meaning">
            <div class="sidebar-icon-circle">📖</div>
            <span class="sidebar-label">Meaning</span>
          </button>

          <!-- Share / Copy Button -->
          <button class="sidebar-btn btn-share" id="btn-share-${shloka.num}" title="Share / Copy Shloka">
            <div class="sidebar-icon-circle">🔗</div>
            <span class="sidebar-label">Share</span>
          </button>
        </div>

        <!-- Bottom Profile & Audio Metadata -->
        <div class="reel-bottom-bar">
          <div class="account-row">
            <div class="account-avatar">ॐ</div>
            <div class="account-info">
              <span class="account-name">@bhagavad_gita</span>
              <span class="shloka-badge">॥ श्लोक १२.${shloka.num} ॥ ${shloka.speaker ? '• ' + shloka.speaker : ''}</span>
            </div>
          </div>

          <!-- Audio Marquee -->
          <div class="music-ticker">
            <span>🎶</span>
            <div class="music-ticker-inner">
              Shrimad Bhagawad Geeta • Chapter 12: Bhakti Yoga • Shloka ${shloka.num} of 20 • Traditional Chanting &bull;
            </div>
          </div>
        </div>

        <!-- Bottom YouTube Shorts Scrubber -->
        <div class="reel-scrubber-track" id="scrubber-track-${shloka.num}">
          <div class="reel-scrubber-fill" id="scrubber-fill-${shloka.num}"></div>
        </div>

        <!-- Hidden Audio Element -->
        <audio id="audio-${shloka.num}" preload="auto" src="${shloka.audio.sanskrit}"></audio>
      `;

      feed.appendChild(slide);

      // Attach word click-to-seek handlers
      setupSlideInteractions(shloka, slide);
    });
  }

  function buildLineWordsHtml(lineText, lIdx) {
    let lineWeight = 0;
    const words = lineText.trim().split(/\s+/);
    return words.map((word, wIdx) => {
      const cleanWord = word.replace(/[।॥\d\s]/g, "");
      const weight = Math.max(cleanWord.length, 1);
      const start = lineWeight;
      lineWeight += weight;
      return `<span class="reel-word" data-line-idx="${lIdx}" data-word-idx="${wIdx}" data-start="${start}" data-weight="${weight}">${word}</span>`;
    }).join(" ");
  }

  // 2. Desktop Jump Panel
  function renderDesktopJumpChips() {
    desktopJumpPanel.innerHTML = "";
    GITA_DATA.forEach(shloka => {
      const chip = document.createElement("div");
      chip.className = `jump-chip ${shloka.num === 1 ? 'active' : ''}`;
      chip.id = `jump-chip-${shloka.num}`;
      chip.textContent = `श्लोक ${shloka.num}`;
      chip.addEventListener("click", () => {
        scrollToReel(shloka.num);
      });
      desktopJumpPanel.appendChild(chip);
    });
  }

  // 3. Slide Interactions (Tap to Play/Pause, Double-Tap Heart, Word Tap, Audio Scrubbing)
  function setupSlideInteractions(shloka, slide) {
    const audio = slide.querySelector("audio");
    const centerArea = slide.querySelector(".reel-center-content");
    const tapIndicator = slide.querySelector(".center-tap-indicator");
    const scrubTrack = slide.querySelector(".reel-scrubber-track");
    const scrubFill = slide.querySelector(".reel-scrubber-fill");
    const likeBtn = slide.querySelector(".btn-like");
    const likeCountSpan = slide.querySelector(`#like-count-${shloka.num}`);
    const trackBtn = slide.querySelector(".btn-track-cycle");
    const trackLabel = slide.querySelector(`#track-label-${shloka.num}`);
    const vinyl = slide.querySelector(`#vinyl-${shloka.num}`);
    const loopBtn = slide.querySelector(".btn-loop-toggle");
    const loopLabel = slide.querySelector(`#loop-label-${shloka.num}`);
    const infoBtn = slide.querySelector(".btn-info-drawer");
    const shareBtn = slide.querySelector(".btn-share");
    const muteBtn = slide.querySelector(".btn-mute-toggle");

    // Audio volume & mute
    audio.muted = globalMuted;

    // Word Click to Seek
    const words = slide.querySelectorAll(".reel-word");
    words.forEach(w => {
      w.addEventListener("click", (e) => {
        e.stopPropagation();
        const lIdx = parseInt(w.dataset.lineIdx, 10);
        const start = parseFloat(w.dataset.start);
        const lineBox = slide.querySelector(`#line-${shloka.num}-${lIdx}`);
        let lineTotal = 0;
        lineBox.querySelectorAll(".reel-word").forEach(rw => {
          lineTotal += parseFloat(rw.dataset.weight);
        });

        seekWord(shloka, audio, slide, lIdx, start, lineTotal);
      });
    });

    // Single Tap / Double Tap Gestures on Center Area
    let lastTapTime = 0;
    centerArea.addEventListener("click", (e) => {
      const now = Date.now();
      if (now - lastTapTime < 280) {
        // Double Tap -> Like Animation
        triggerDoubleTapHeart(centerArea, e.clientX, e.clientY);
        handleLike(shloka.num, likeBtn, likeCountSpan);
      } else {
        // Single Tap -> Play / Pause
        togglePlayReel(shloka.num);
      }
      lastTapTime = now;
    });

    // Like Button Click
    likeBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      handleLike(shloka.num, likeBtn, likeCountSpan);
    });

    // Track Switcher (Cycles: Sanskrit -> Recit -> Full)
    const trackCycle = ["sanskrit", "recit", "full"];
    trackBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      let curIdx = trackCycle.indexOf(slide.dataset.activeTrack || "sanskrit");
      let nextTrack = trackCycle[(curIdx + 1) % trackCycle.length];
      slide.dataset.activeTrack = nextTrack;
      globalTrackPreference = nextTrack;

      // Update label
      if (nextTrack === "sanskrit") trackLabel.textContent = "Chanting";
      else if (nextTrack === "recit") trackLabel.textContent = "Recitation";
      else trackLabel.textContent = "Full Audio";

      const wasPlaying = !audio.paused;
      audio.src = shloka.audio[nextTrack] || shloka.audio.sanskrit;
      audio.load();
      if (wasPlaying) {
        audio.play().catch(() => {});
      }
      showToast(`Audio: ${trackLabel.textContent}`);
    });

    // Loop Toggle
    loopBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      loopCurrentReel = !loopCurrentReel;
      document.querySelectorAll(".btn-loop-toggle").forEach(lb => {
        lb.classList.toggle("active", loopCurrentReel);
      });
      document.querySelectorAll("[id^='loop-label-']").forEach(lbl => {
        lbl.textContent = loopCurrentReel ? "Loop: ON" : "Scroll: ON";
      });
      showToast(loopCurrentReel ? "🔁 Loop Shloka: ON" : "⏩ Auto-Scroll: ON");
    });

    // Info / Meaning Drawer Click
    infoBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      openMeaningDrawer(shloka);
    });

    // Share / Copy Click
    shareBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      copyShlokaText(shloka);
    });

    // Mute Button Click
    muteBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      globalMuted = !globalMuted;
      document.querySelectorAll("audio").forEach(a => a.muted = globalMuted);
      document.querySelectorAll(".btn-mute-toggle").forEach(btn => {
        btn.textContent = globalMuted ? '🔇' : '🔊';
      });
      showToast(globalMuted ? "Audio Muted" : "Audio Unmuted");
    });

    // Scrubber Scrub / Tap
    function handleScrubber(e) {
      e.stopPropagation();
      const rect = scrubTrack.getBoundingClientRect();
      const clientX = e.touches ? e.touches[0].clientX : e.clientX;
      const pos = Math.max(0, Math.min(1, (clientX - rect.left) / rect.width));
      if (audio.duration) {
        audio.currentTime = pos * audio.duration;
        updateReelOverlay(shloka, slide, audio.currentTime);
      }
    }

    scrubTrack.addEventListener("click", handleScrubber);
    scrubTrack.addEventListener("touchmove", handleScrubber, { passive: true });

    // Audio Play / Pause State Events
    audio.addEventListener("play", () => {
      vinyl.classList.add("spinning");
      showTapIndicator(tapIndicator, "▶");
      startReelOverlayAnimation(shloka, slide, audio);
    });

    audio.addEventListener("pause", () => {
      vinyl.classList.remove("spinning");
      showTapIndicator(tapIndicator, "⏸");
      if (animFrameId) cancelAnimationFrame(animFrameId);
    });

    audio.addEventListener("ended", () => {
      vinyl.classList.remove("spinning");
      if (loopCurrentReel) {
        audio.currentTime = 0;
        audio.play().catch(() => {});
      } else {
        // Auto-scroll to next reel smoothly!
        if (shloka.num < 20) {
          scrollToReel(shloka.num + 1);
        }
      }
    });

    audio.addEventListener("timeupdate", () => {
      if (audio.duration) {
        const ratio = audio.currentTime / audio.duration;
        scrubFill.style.width = `${ratio * 100}%`;
      }
    });
  }

  // 4. Like Interaction
  function handleLike(num, btn, countSpan) {
    if (likedReels.has(num)) {
      likedReels.delete(num);
      btn.classList.remove("liked");
      showToast("Unliked");
    } else {
      likedReels.add(num);
      btn.classList.add("liked");
      showToast("Liked ❤️");
    }
  }

  function triggerDoubleTapHeart(container, clientX, clientY) {
    const heart = document.createElement("div");
    heart.className = "floating-heart";
    heart.textContent = "❤️";

    const rect = container.getBoundingClientRect();
    heart.style.left = `${clientX - rect.left - 30}px`;
    heart.style.top = `${clientY - rect.top - 40}px`;

    container.appendChild(heart);
    setTimeout(() => heart.remove(), 800);
  }

  function showTapIndicator(indicator, symbol) {
    indicator.textContent = symbol;
    indicator.classList.add("pop");
    setTimeout(() => indicator.classList.remove("pop"), 400);
  }

  // 5. High-Precision Recitation Overlay for Reel
  function startReelOverlayAnimation(shloka, slide, audio) {
    function step() {
      if (!audio || audio.paused || activeReelNum !== shloka.num) return;
      updateReelOverlay(shloka, slide, audio.currentTime);
      animFrameId = requestAnimationFrame(step);
    }
    animFrameId = requestAnimationFrame(step);
  }

  function updateReelOverlay(shloka, slide, currentTime) {
    const activeTrack = slide.dataset.activeTrack || "sanskrit";
    const timingMap = shloka.timing || {};
    const trackTiming = timingMap[activeTrack] || timingMap.sanskrit || {
      line1: [0.05, 8.0],
      line2: [8.5, 17.0]
    };

    const spkPill = slide.querySelector(".speaker-pill");
    if (trackTiming.speaker && spkPill) {
      if (currentTime >= trackTiming.speaker[0] && currentTime <= trackTiming.speaker[1]) {
        spkPill.classList.add("active");
      } else {
        spkPill.classList.remove("active");
      }
    }

    const line1Box = slide.querySelector(`#line-${shloka.num}-0`);
    const line2Box = slide.querySelector(`#line-${shloka.num}-1`);
    if (!line1Box || !line2Box) return;

    const [l1Start, l1End] = trackTiming.line1;
    const [l2Start, l2End] = trackTiming.line2;

    if (currentTime < l1Start) {
      clearWords(line1Box);
      clearWords(line2Box);
    } else if (currentTime >= l1Start && currentTime <= l1End) {
      const prog = (currentTime - l1Start) / (l1End - l1Start);
      highlightWords(line1Box, prog);
      clearWords(line2Box);
    } else if (currentTime > l1End && currentTime < l2Start) {
      markWordsRecited(line1Box);
      clearWords(line2Box);
    } else if (currentTime >= l2Start && currentTime <= l2End) {
      markWordsRecited(line1Box);
      const prog = (currentTime - l2Start) / (l2End - l2Start);
      highlightWords(line2Box, prog);
    } else if (currentTime > l2End) {
      markWordsRecited(line1Box);
      markWordsRecited(line2Box);
    }
  }

  function highlightWords(lineEl, prog) {
    let lineTotal = 0;
    const words = lineEl.querySelectorAll(".reel-word");
    words.forEach(w => lineTotal += parseFloat(w.dataset.weight));

    const curChars = Math.min(lineTotal, prog * lineTotal);
    let foundActive = false;

    words.forEach(w => {
      const start = parseFloat(w.dataset.start);
      const weight = parseFloat(w.dataset.weight);
      const end = start + weight;

      if (curChars >= start && curChars < end && !foundActive) {
        w.className = "reel-word current-reciting";
        foundActive = true;
      } else if (curChars >= end) {
        w.className = "reel-word recited";
      } else {
        w.className = "reel-word";
      }
    });

    if (prog >= 0.96) {
      words.forEach(w => w.className = "reel-word recited");
    }
  }

  function markWordsRecited(lineEl) {
    lineEl.querySelectorAll(".reel-word").forEach(w => w.className = "reel-word recited");
  }

  function clearWords(lineEl) {
    lineEl.querySelectorAll(".reel-word").forEach(w => w.className = "reel-word");
  }

  function seekWord(shloka, audio, slide, lIdx, wordStart, totalLineChars) {
    const activeTrack = slide.dataset.activeTrack || "sanskrit";
    const timingMap = shloka.timing || {};
    const trackTiming = timingMap[activeTrack] || timingMap.sanskrit;
    if (!trackTiming) return;

    const [lStart, lEnd] = lIdx === 0 ? trackTiming.line1 : trackTiming.line2;
    const ratio = Math.max(0, Math.min(1, wordStart / (totalLineChars || 1)));
    const target = lStart + ratio * (lEnd - lStart);

    audio.currentTime = target;
    updateReelOverlay(shloka, slide, target);
    if (audio.paused) {
      audio.play().catch(() => {});
    }
  }

  // 6. Intersection Observer for Vertical Feed Snap Scrolling
  function setupIntersectionObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const slide = entry.target;
        const num = parseInt(slide.dataset.num, 10);
        const audio = slide.querySelector("audio");

        if (entry.isIntersecting) {
          activeReelNum = num;

          // Pause previously playing audio
          if (currentAudio && currentAudio !== audio) {
            currentAudio.pause();
            currentAudio.currentTime = 0;
          }
          currentAudio = audio;

          // Update active chip in desktop panel
          document.querySelectorAll(".jump-chip").forEach(ch => ch.classList.remove("active"));
          document.getElementById(`jump-chip-${num}`)?.classList.add("active");

          // Play active short immediately!
          audio.currentTime = 0;
          audio.play().catch(() => {
            // Browsers may require first user interaction
          });
        } else {
          audio.pause();
          clearWords(slide.querySelector(`#line-${num}-0`));
          clearWords(slide.querySelector(`#line-${num}-1`));
        }
      });
    }, {
      root: feed,
      threshold: 0.65
    });

    document.querySelectorAll(".reel-slide").forEach(s => observer.observe(s));
  }

  function scrollToReel(num) {
    const target = document.getElementById(`reel-${num}`);
    if (target) {
      target.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }

  function togglePlayReel(num) {
    const slide = document.getElementById(`reel-${num}`);
    const audio = slide?.querySelector("audio");
    if (!audio) return;
    if (audio.paused) {
      audio.play().catch(() => {});
    } else {
      audio.pause();
    }
  }

  // 7. Info / Meaning Slide-Up Drawer
  function setupDrawer() {
    btnDrawerClose.addEventListener("click", closeMeaningDrawer);
    drawerBackdrop.addEventListener("click", closeMeaningDrawer);
  }

  function openMeaningDrawer(shloka) {
    drawerTitle.textContent = `श्लोक १२.${shloka.num} ${shloka.speaker ? '— ' + shloka.speaker : ''}`;
    drawerBody.innerHTML = `
      <div style="font-family: var(--font-sanskrit); font-size: 1.25rem; color: #ffffff; margin-bottom: 16px; line-height: 1.8;">
        ${shloka.sanskrit.join("<br>")}
      </div>
      <div style="font-size: 0.85rem; color: var(--main-color); margin-bottom: 6px; font-weight: 700;">🌸 अध्याय १२: भक्तियोगः</div>
      <p style="font-size: 0.95rem; color: rgba(255, 255, 255, 0.85); line-height: 1.6;">
        भगवान श्रीकृष्ण के अनन्य भक्ति रस और दिव्य उपदेश से परिपूर्ण द्वादश अध्याय का पवित्र श्लोक।
      </p>
    `;
    drawerBackdrop.classList.add("open");
    drawer.classList.add("open");
  }

  function closeMeaningDrawer() {
    drawerBackdrop.classList.remove("open");
    drawer.classList.remove("open");
  }

  // 8. Copy / Share Helper
  function copyShlokaText(shloka) {
    const text = `${shloka.speaker ? shloka.speaker + '\n' : ''}${shloka.sanskrit.join('\n')}\n\n— श्रीमद्भगवद्गीता १२.${shloka.num}`;
    navigator.clipboard.writeText(text).then(() => {
      showToast(`श्लोक १२.${shloka.num} copied!`);
    });
  }

  function showToast(msg) {
    toast.textContent = msg;
    toast.classList.add("show");
    setTimeout(() => toast.classList.remove("show"), 2200);
  }

  // 9. Global Shortcuts & Desktop Arrow Navigation
  function setupGlobalShortcuts() {
    btnPrevReel.addEventListener("click", () => {
      if (activeReelNum > 1) scrollToReel(activeReelNum - 1);
    });

    btnNextReel.addEventListener("click", () => {
      if (activeReelNum < 20) scrollToReel(activeReelNum + 1);
    });

    document.addEventListener("keydown", (e) => {
      if (e.code === "Space") {
        e.preventDefault();
        togglePlayReel(activeReelNum);
      } else if (e.key === "ArrowDown" || e.key === "j" || e.key === "J") {
        e.preventDefault();
        if (activeReelNum < 20) scrollToReel(activeReelNum + 1);
      } else if (e.key === "ArrowUp" || e.key === "k" || e.key === "K") {
        e.preventDefault();
        if (activeReelNum > 1) scrollToReel(activeReelNum - 1);
      } else if (e.key === "m" || e.key === "M") {
        globalMuted = !globalMuted;
        document.querySelectorAll("audio").forEach(a => a.muted = globalMuted);
        document.querySelectorAll(".btn-mute-toggle").forEach(btn => {
          btn.textContent = globalMuted ? '🔇' : '🔊';
        });
        showToast(globalMuted ? "Audio Muted" : "Audio Unmuted");
      }
    });
  }
});
