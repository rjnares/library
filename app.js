// app.js

// Wait until DOM is fully loaded
document.addEventListener('DOMContentLoaded', () => {
  console.log('🚀 App initialized');
  
  // Example: add a click listener to a button
  const btn = document.createElement('button');
  btn.textContent = 'Click me';
  document.body.appendChild(btn);

  btn.addEventListener('click', () => {
    alert('Button clicked!');
  });
});
