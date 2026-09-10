// Initialize cart from localStorage or start empty
let cart = JSON.parse(localStorage.getItem('sweetFactoryCart')) || [];

// Update the navbar badge count on page load
document.addEventListener('DOMContentLoaded', () => {
  updateCartBadge();
  attachAddToCartListeners();
});

// Attach click listeners to all "Add to Cart" buttons
function attachAddToCartListeners() {
  const buttons = document.querySelectorAll('.add-to-cart-btn');
  
  buttons.forEach(button => {
    button.addEventListener('click', (e) => {
      const name = e.target.getAttribute('data-name');
      const price = parseFloat(e.target.getAttribute('data-price'));

      addToCart(name, price);
      
      // Visual feedback on button click
      const originalText = e.target.innerText;
      e.target.innerText = 'Added! 🍬';
      e.target.style.backgroundColor = 'var(--candy-mint)';
      
      setTimeout(() => {
        e.target.innerText = originalText;
        e.target.style.backgroundColor = '';
      }, 1200);
    });
  });
}

// Add or update item quantity in cart array
function addToCart(name, price) {
  const existingItem = cart.find(item => item.name === name);

  if (existingItem) {
    existingItem.quantity += 1;
  } else {
    cart.push({ name: name, price: price, quantity: 1 });
  }

  // Save to browser storage
  localStorage.setItem('sweetFactoryCart', JSON.stringify(cart));
  
  // Update badge count
  updateCartBadge();
}

// Recalculate total quantity for badge
function updateCartBadge() {
  const badge = document.getElementById('cart-count');
  if (badge) {
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    badge.innerText = totalItems;
  }
}
