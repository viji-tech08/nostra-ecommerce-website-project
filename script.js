// Nostra student ecommerce project — original vanilla JavaScript.
const products = [
  { id: 1, name: "Everyday Linen Shirt", category: "tops", price: 1299, tag: "NEW", arrival: true, wanted: false, image: "https://images.unsplash.com/photo-1596755094514-f87e34085b2c?auto=format&fit=crop&w=700&q=80" },
  { id: 2, name: "Relaxed Cotton Tee", category: "tops", price: 699, tag: "BESTSELLER", arrival: false, wanted: true, image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&w=700&q=80" },
  { id: 3, name: "Classic Straight Jeans", category: "bottoms", price: 1599, tag: "NEW", arrival: true, wanted: true, image: "https://images.unsplash.com/photo-1542272604-787c3835535d?auto=format&fit=crop&w=700&q=80" },
  { id: 4, name: "Soft Layer Jacket", category: "outerwear", price: 2299, tag: "LIMITED", arrival: true, wanted: false, image: "https://images.unsplash.com/photo-1548126032-079a0fb0099d?auto=format&fit=crop&w=700&q=80" },
  { id: 5, name: "Daily Canvas Tote", category: "accessories", price: 499, tag: "POPULAR", arrival: false, wanted: true, image: "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?auto=format&fit=crop&w=700&q=80" },
  { id: 6, name: "Minimal Knit Top", category: "tops", price: 999, tag: "NEW", arrival: true, wanted: false, image: "https://images.unsplash.com/photo-1576566588028-4147f3842f27?auto=format&fit=crop&w=700&q=80" },
  { id: 7, name: "Weekend Trousers", category: "bottoms", price: 1399, tag: "BESTSELLER", arrival: false, wanted: true, image: "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?auto=format&fit=crop&w=700&q=80" },
  { id: 8, name: "Everyday Crossbody", category: "accessories", price: 1199, tag: "NEW", arrival: true, wanted: true, image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?auto=format&fit=crop&w=700&q=80" },
  { id: 9, name: "Oversized Shirt", category: "tops", price: 1099, tag: "POPULAR", arrival: false, wanted: true, image: "https://images.unsplash.com/photo-1598033129183-c4f50c736f10?auto=format&fit=crop&w=700&q=80" },
  { id: 10, name: "Lightweight Overshirt", category: "outerwear", price: 1899, tag: "NEW", arrival: true, wanted: false, image: "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?auto=format&fit=crop&w=700&q=80" },
  { id: 11, name: "Everyday Denim", category: "bottoms", price: 1499, tag: "BESTSELLER", arrival: false, wanted: true, image: "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?auto=format&fit=crop&w=700&q=80" },
  { id: 12, name: "Weekend Shoulder Bag", category: "accessories", price: 899, tag: "NEW", arrival: true, wanted: false, image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?auto=format&fit=crop&w=700&q=80" }
];

const money = amount => "₹" + amount.toLocaleString("en-IN");

function productCard(product) {
  return `
    <article class="product-card">
      <div class="product-image-wrap">
        <img class="product-image" src="${product.image}" alt="${product.name}" loading="lazy">
        <span class="product-tag">${product.tag}</span>
      </div>
      <div class="product-info">
        <div><p class="product-name">${product.name}</p><p class="product-category">${product.category}</p></div>
        <span class="product-price">${money(product.price)}</span>
      </div>
    </article>`;
}

function renderProducts(containerId, list) {
  const container = document.getElementById(containerId);
  if (!container) return;
  container.innerHTML = list.map(productCard).join("");
}

function getSortedProducts(list) {
  const sortSelect = document.getElementById("sort-products");
  const sortValue = sortSelect ? sortSelect.value : "featured";
  const sorted = [...list];
  if (sortValue === "low") sorted.sort((a, b) => a.price - b.price);
  if (sortValue === "high") sorted.sort((a, b) => b.price - a.price);
  return sorted;
}

function renderListing() {
  const collectionContainer = document.getElementById("collection-products");
  const arrivalsContainer = document.getElementById("new-arrivals-products");
  const wantedContainer = document.getElementById("most-wanted-products");

  if (collectionContainer) {
    const searchText = (document.getElementById("product-search")?.value || "").trim().toLowerCase();
    const category = document.getElementById("category-filter")?.value || "all";
    const filtered = products.filter(product => {
      const matchesSearch = product.name.toLowerCase().includes(searchText) || product.category.includes(searchText);
      const matchesCategory = category === "all" || product.category === category;
      return matchesSearch && matchesCategory;
    });
    const sorted = getSortedProducts(filtered);
    collectionContainer.innerHTML = sorted.map(productCard).join("");
    document.getElementById("result-count").textContent = sorted.length;
    document.getElementById("empty-state").hidden = sorted.length !== 0;
  }

  if (arrivalsContainer) {
    const list = getSortedProducts(products.filter(product => product.arrival));
    arrivalsContainer.innerHTML = list.map(productCard).join("");
    document.getElementById("result-count").textContent = list.length;
  }

  if (wantedContainer) {
    const list = getSortedProducts(products.filter(product => product.wanted));
    wantedContainer.innerHTML = list.map(productCard).join("");
    document.getElementById("result-count").textContent = list.length;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".current-year").forEach(element => {
    element.textContent = new Date().getFullYear();
  });

  renderProducts("home-new-products", products.filter(product => product.arrival).slice(0, 4));
  renderProducts("home-wanted-products", products.filter(product => product.wanted).slice(0, 4));
  renderListing();

  const menuButton = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".nav-links");
  if (menuButton && nav) {
    menuButton.addEventListener("click", () => {
      const isOpen = nav.classList.toggle("open");
      menuButton.setAttribute("aria-expanded", String(isOpen));
      menuButton.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });
  }

  ["product-search", "category-filter", "sort-products"].forEach(id => {
    const control = document.getElementById(id);
    if (control) control.addEventListener("input", renderListing);
    if (control && control.tagName === "SELECT") control.addEventListener("change", renderListing);
  });

  const newsletterForm = document.getElementById("newsletter-form");
  if (newsletterForm) {
    newsletterForm.addEventListener("submit", event => {
      event.preventDefault();
      document.getElementById("newsletter-message").textContent = "Thanks! This demo subscription was checked locally only.";
      newsletterForm.reset();
    });
  }

  const contactForm = document.getElementById("contact-form");
  if (contactForm) {
    contactForm.addEventListener("submit", event => {
      event.preventDefault();
      const name = document.getElementById("contact-name");
      const email = document.getElementById("contact-email");
      const message = document.getElementById("contact-message");
      const nameError = document.getElementById("name-error");
      const emailError = document.getElementById("email-error");
      const messageError = document.getElementById("message-error");
      nameError.textContent = "";
      emailError.textContent = "";
      messageError.textContent = "";
      let valid = true;

      if (name.value.trim().length < 2) {
        nameError.textContent = "Please enter at least 2 characters.";
        valid = false;
      }
      if (!email.validity.valid || !email.value.trim()) {
        emailError.textContent = "Please enter a valid email address.";
        valid = false;
      }
      if (message.value.trim().length < 10) {
        messageError.textContent = "Message must be at least 10 characters.";
        valid = false;
      }

      const feedback = document.getElementById("contact-feedback");
      if (valid) {
        feedback.textContent = "Thank you! Your form passed validation. No message was sent to a server.";
        contactForm.reset();
      } else {
        feedback.textContent = "Please correct the highlighted fields.";
      }
    });
  }
});
