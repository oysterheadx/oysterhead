(function () {

  const galleryEl = document.getElementById("gallery");
  const lightboxEl = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxTitle = document.getElementById("lightbox-title");
  const lightboxMeta = document.getElementById("lightbox-meta");
  const lightboxHome = document.getElementById("lightbox-home");
  const lightboxNext = document.getElementById("lightbox-next");
  const lightboxBackdrop = lightboxEl.querySelector(".lightbox-backdrop");

  function metaText(work) {
    if (work.technique && work.format)
      return work.technique + " · " + work.format;

    return work.technique || work.format || "";
  }

  function loadImage(file) {

    lightboxImage.style.visibility = "hidden";

    lightboxImage.onload = function () {
      lightboxImage.style.visibility = "visible";
    };

    lightboxImage.src = "images/full/" + file;
  }

  function renderGallery() {

    const frag = document.createDocumentFragment();

    WORKS.forEach((work, index) => {

      const card = document.createElement("button");
      card.type = "button";
      card.className = "artwork";

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

  function openLightbox(index) {

    const work = WORKS[index];
    if (!work) return;

    lightboxEl.dataset.index = index;

    loadImage(work.file);

    lightboxImage.alt = work.title;
    lightboxTitle.textContent = work.title;
    lightboxMeta.textContent = metaText(work);

    lightboxEl.hidden = false;
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {

    lightboxEl.hidden = true;
    document.body.style.overflow = "";

  }

  function showNext() {

    const current = Number(lightboxEl.dataset.index || 0);
    const next = (current + 1) % WORKS.length;

    const work = WORKS[next];

    lightboxEl.dataset.index = next;

    loadImage(work.file);

    lightboxImage.alt = work.title;
    lightboxTitle.textContent = work.title;
    lightboxMeta.textContent = metaText(work);
  }

  lightboxHome.addEventListener("click", function (e) {

    e.preventDefault();
    closeLightbox();

  });

  lightboxNext.addEventListener("click", showNext);

  lightboxBackdrop.addEventListener("click", closeLightbox);

  document.addEventListener("keydown", function (e) {

    if (lightboxEl.hidden) return;

    if (e.key === "Escape")
      closeLightbox();

    if (e.key === "ArrowRight")
      showNext();

  });

  renderGallery();

})();