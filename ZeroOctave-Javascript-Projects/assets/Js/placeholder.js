const btn = document.querySelector('button');
const tooltip = document.querySelector('#tooltip');
btn.addEventListener('mouseover', function() {
  tooltip.style.display = 'block';
});
btn.addEventListener('mouseout', function() {
  tooltip.style.display = 'none';
});
