let key = "pk.eyJ1IjoiaGFyaXM2NjQiLCJhIjoiY2thNXdscHE0MDFoMjJzbWpxeGFoaGJ3eiJ9.eTB8EAoQFT1gFoJzyKtMrg";
const firstInputEle = document.querySelector('.origin-container');

firstInputEle.onsubmit = event => {
  const input = event.target.querySelector('input');
  console.log(input.value);
  event.preventDefault();
}