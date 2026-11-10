const menuToggle = document.getElementById('menuToggle');
const mainNav = document.getElementById('mainNav');
menuToggle.addEventListener('click', () => {
  const isOpen = mainNav.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(isOpen));
});
mainNav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
  mainNav.classList.remove('open');
  menuToggle.setAttribute('aria-expanded', 'false');
}));

const jobCards = [...document.querySelectorAll('.job-card')];
const filters = [...document.querySelectorAll('.filter')];
const searchInput = document.getElementById('jobSearch');
const jobCount = document.getElementById('jobCount');
const emptyState = document.getElementById('emptyState');
let activeCategory = 'All';

function filterJobs() {
  const term = searchInput.value.trim().toLowerCase();
  let visible = 0;
  jobCards.forEach(card => {
    const categoryMatch = activeCategory === 'All' || card.dataset.category === activeCategory;
    const searchMatch = !term || (card.dataset.search + ' ' + card.textContent).toLowerCase().includes(term);
    const show = categoryMatch && searchMatch;
    card.hidden = !show;
    if (show) visible++;
  });
  jobCount.textContent = `${visible} ${visible === 1 ? 'opportunity' : 'opportunities'}`;
  emptyState.hidden = visible !== 0;
}
filters.forEach(button => button.addEventListener('click', () => {
  filters.forEach(item => item.classList.remove('active'));
  button.classList.add('active');
  activeCategory = button.dataset.filter;
  filterJobs();
}));
document.getElementById('searchForm').addEventListener('submit', event => {
  event.preventDefault();
  activeCategory = 'All';
  filters.forEach(item => item.classList.toggle('active', item.dataset.filter === 'All'));
  filterJobs();
  document.getElementById('jobs').scrollIntoView({behavior:'smooth'});
});
document.querySelectorAll('[data-search]').forEach(link => link.addEventListener('click', () => {
  searchInput.value = link.dataset.search;
  activeCategory = 'All';
  filters.forEach(item => item.classList.toggle('active', item.dataset.filter === 'All'));
  filterJobs();
}));
document.querySelectorAll('.category-card').forEach(button => button.addEventListener('click', () => {
  activeCategory = button.dataset.category;
  filters.forEach(item => item.classList.toggle('active', item.dataset.filter === activeCategory));
  searchInput.value = '';
  filterJobs();
  document.getElementById('jobs').scrollIntoView({behavior:'smooth'});
}));
document.querySelectorAll('.apply-link').forEach(link => link.addEventListener('click', () => {
  document.getElementById('position').value = link.dataset.position;
}));

document.getElementById('applicationForm').addEventListener('submit', event => {
  event.preventDefault();
  const form = event.currentTarget;
  const name = document.getElementById('fullName').value.trim();
  const position = document.getElementById('position').value;
  document.getElementById('formMessage').textContent =
    `Thank you, ${name}! Your demo application for ${position} has been completed.`;
  form.reset();
});