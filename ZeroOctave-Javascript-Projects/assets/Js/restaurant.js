var images = new Array(
    'https://images.squarespace-cdn.com/content/v1/5755bccb8259b515333df0e1/1466120130465-9BNATBEVMW9VCWH2KMA2/Stocksy_comp_461841-color.jpg',
    'https://images.squarespace-cdn.com/content/v1/5755bccb8259b515333df0e1/1475088749256-645IUUCVAMPQYIQSAPVK/Stocksy_comp_865498.jpg',
    'https://images.squarespace-cdn.com/content/v1/5755bccb8259b515333df0e1/1475344319269-I7F3K5K5OY1KWTZG7KYA/65_AP_Gougeres_v2-127.jpg',
    'https://images.squarespace-cdn.com/content/v1/5755bccb8259b515333df0e1/1466111941034-GIIKB6HB6ADZB2O0D7HW/Stocksy_comp_461838.jpg',
  );
  var slider = setInterval(function() {
    document.getElementsByTagName('body')[0].setAttribute('style', 'background-image:linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)),url("'+images[0]+'")');
    document.getElementsByTagName('h1')
    images.splice(images.length, 0, images[0]);
    images.splice(0, 1);
  }, 3000);