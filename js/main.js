(function () {
  const galleryEl = document.getElementById("gallery");
  const lightboxEl = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxMeta = document.getElementById("lightbox-meta");
  const lightboxHome = document.getElementById("lightbox-home");
  const lightboxNext = document.getElementById("lightbox-next");
  const lightboxBackdrop = lightboxEl.querySelector(".lightbox-backdrop");

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
      img.src = "images/thumbs/" + work.file;
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

  function metaText(work) {
    if (work.technique && work.format)
      return work.technique + " · " + work.format;

    return work.technique || work.format || "";
  }

  function openLightbox(index) {
    const work = WORKS[index];
    if (!work) return;

    lightboxEl.dataset.index = index;

    lightboxImage.src = "images/full/" + work.file;
    lightboxImage.alt = work.title;
    lightboxTitle.textContent = work.title;
    lightboxMeta.textContent = metaText(work);

    lightboxEl.hidden = false;
    document.body.style.overflow = "hidden";

    history.pushState({ work: work.slug }, "", "#" + work.slug);
  }

  function closeLightbox() {
    lightboxEl.hidden = true;
    document.body.style.overflow = "";
    history.pushState({}, "", location.pathname);
  }

  function showNext() {
    const current = Number(lightboxEl.dataset.index || 0);
    const next = (current + 1) % WORKS.length;
    openLightboxReplace(next);
  }

  function openLightboxReplace(index) {
    const work = WORKS[index];

    lightboxEl.dataset.index = index;

    lightboxImage.src = "images/full/" + work.file;
    lightboxImage.alt = work.title;
    lightboxTitle.textContent = work.title;
    lightboxMeta.textContent = metaText(work);

    history.replaceState({ work: work.slug }, "", "#" + work.slug);
  }

  function openFromHash() {
    const slug = location.hash.replace("#", "");

    if (!slug) {
      lightboxEl.hidden = true;
      document.body.style.overflow = "";
      return;
    }

    const index = WORKS.findIndex(w => w.slug === slug);

    if (index === -1) return;

    const work = WORKS[index];

    lightboxEl.dataset.index = index;
    lightboxImage.src = "images/full/" + work.file;
    lightboxImage.alt = work.title;
    lightboxTitle.textContent = work.title;
    lightboxMeta.textContent = metaText(work);

    lightboxEl.hidden = false;
    document.body.style.overflow = "hidden";
  }

  lightboxHome.addEventListener("click", e => {
    e.preventDefault();
    closeLightbox();
  });

  lightboxNext.addEventListener("click", showNext);

  lightboxEl.addEventListener("click", (e) => {
  if (e.target === lightboxEl || e.target === lightboxBackdrop) {
    closeLightbox();
  }
});

  document.addEventListener("keydown", e => {
    if (lightboxEl.hidden) return;

    if (e.key === "Escape")
      closeLightbox();

    if (e.key === "ArrowRight")
      showNext();
  });

  window.addEventListener("popstate", openFromHash);

  renderGallery();
  openFromHash();
})();