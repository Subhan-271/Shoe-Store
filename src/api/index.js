const BASE = "http://localhost:5000/api";

async function get(path) {
  const res = await fetch(`${BASE}${path}`);
  if (!res.ok) throw new Error(`API error: ${res.status}`);
  return res.json();
}

async function post(path, body) {
  const res = await fetch(`${BASE}${path}`, {
    method:  "POST",
    headers: { "Content-Type": "application/json" },
    body:    JSON.stringify(body),
  });
  const data = await res.json();
  if (!res.ok) throw new Error(data.error || "Request failed");
  return data;
}

/* ── Products ── */
export function fetchProducts(filters = {}) {
  const params = new URLSearchParams();
  if (filters.category) params.set("category", filters.category);
  if (filters.search)   params.set("search",   filters.search);
  if (filters.maxPrice) params.set("maxPrice",  filters.maxPrice);
  if (filters.onlySale) params.set("onlySale",  "true");
  if (filters.sort)     params.set("sort",      filters.sort);
  const qs = params.toString();
  return get(`/products${qs ? "?" + qs : ""}`);
}

export function fetchProduct(id) {
  return get(`/products/${id}`);
}

/* ── Categories ── */
export function fetchCategories() {
  return get("/categories");
}

/* ── Contact ── */
export function submitContact(form) {
  return post("/contact", form);
}

export function subscribeNewsletter(email) {
  return post("/contact/newsletter", { email });
}
