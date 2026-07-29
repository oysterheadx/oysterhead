(function () {
  const galleryEl = document.getElementById("gallery");
  const lightboxEl = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxMeta = document.getElementById("lightbox-meta");
  const lightboxHome = document.getElementById("lightbox-home");
  const lightboxNext = document.getElementById("lightbox-next");
  const lightboxBackdrop = lightboxEl.querySelector(".lightbox-backdrop");
  const lightboxFrame = lightboxEl.querySelector(".lightbox-frame");

  function renderGallery() {
    const frag = document.createDocumentFragment();
    WORKS.forEach((work, index) => {
      const card = document.createElement("button");
      card.type = "button";
      card.className = "artwork";
      card.setAttribute("aria-label", "Otwórz pracę: " + work.title);

      const frame = document.createElement("span");
      frame.className = "artwork-frame";
      const img = document.createElement("img");
      img.src = work.image;
      img.alt = work.title;
      img.loading = "lazy";
      frame.appendChild(img);

      const caption = document.createElement("span");
      caption.className = "artwork-caption";
      caption.textContent = work.title;

      card.appendChild(frame);
      card.appendChild(caption);
      card.addEventListener("click", () => openLightbox(index));

      frag.appendChild(card);
    });
    galleryEl.appendChild(frag);
  }

  function openLightbox(index) {
    const work = WORKS[index];
    if (!work) return;
    lightboxEl.dataset.index = String(index);
    lightboxImage.src = work.image;
    lightboxImage.alt = work.title;
    lightboxTitle.textContent = work.title;
    lightboxMeta.textContent = work.technique + " · " + work.format + " · " + work.year;
    lightboxEl.hidden = false;
    document.body.style.overflow = "hidden";
    history.pushState({ work: work.slug }, "", "#" + work.slug);
  }

  function closeLightbox(toHash) {
    lightboxEl.hidden = true;
    document.body.style.overflow = "";
    if (toHash !== false) {
      history.pushState({}, "", location.pathname);
    }
  }

  function showNext() {
    const current = Number(lightboxEl.dataset.index || 0);
    const nextIndex = (current + 1) % WORKS.length;
    openLightboxReplace(nextIndex);
  }

  function openLightboxReplace(index) {
    const work = WORKS[index];
    if (!work) return;
    lightboxEl.dataset.index = String(index);
    lightboxImage.src = work.image;
    lightboxImage.alt = work.title;
    lightboxTitle.textContent = work.title;
    lightboxMeta.textContent = work.technique + " · " + work.format + " · " + work.year;
    history.replaceState({ work: work.slug }, "", "#" + work.slug);
  }

  function openFromHash() {
    const slug = location.hash.replace("#", "");
    if (!slug) {
      closeLightbox(false);
      return;
    }
    const index = WORKS.findIndex((w) => w.slug === slug);
    if (index === -1) {
      closeLightbox(false);
      return;
    }
    lightboxEl.dataset.index = String(index);
    const work = WORKS[index];
    lightboxImage.src = work.image;
    lightboxImage.alt = work.title;
    lightboxTitle.textContent = work.title;
    lightboxMeta.textContent = work.technique + " · " + work.format + " · " + work.year;
    lightboxEl.hidden = false;
    document.body.style.overflow = "hidden";
  }

  lightboxHome.addEventListener("click", (e) => {
    e.preventDefault();
    closeLightbox();
  });

  lightboxNext.addEventListener("click", showNext);

  lightboxBackdrop.addEventListener("click", () => {
    closeLightbox();
  });

  lightboxEl.addEventListener("click", (e) => {
    if (e.target === lightboxEl) {
      closeLightbox();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (lightboxEl.hidden) return;
    if (e.key === "Escape") closeLightbox();
    if (e.key === "ArrowRight") showNext();
  });

  window.addEventListener("popstate", openFromHash);

  renderGallery();
  openFromHash();
})();
