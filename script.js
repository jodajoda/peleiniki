window.onscroll = function() {scrollFunction()};

function scrollFunction() {
  if (document.body.scrollTop > 50 || document.documentElement.scrollTop > 50) {
    document.querySelector("header").classList.add("shrink");
  } else {
    document.querySelector("header").classList.remove("shrink");
  }
}

document.querySelector('.hamburger-menu').addEventListener('click', () => {
    document.querySelector('.nav-links').classList.toggle('active');
    document.querySelector('.hamburger-menu').classList.toggle('active');
});
