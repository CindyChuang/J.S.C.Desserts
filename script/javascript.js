/*window.onbeforeunload = function(){
  localStorage.removeItem('total');
  return '';
};*/

class Food{
  constructor(name, number, price){
    this.name = name;
    this.number = number;
    this.price = price;
  }

  get Name(){
    return name;
  }

  get Number(){
    return number;
  }

  get Price(){
    return price;
  }

  get totalPrice(){
    return number * price;
  }

  set Name(name){
    this.name = name;
  }

  set Number(number){
    this.number = number;
  }

  get toString() {
    var s  = "";
    s += name + "," + number + "," + price;
  }
}

//var chocolate = new Food('Chocolate', 0);
//var whiteChocolate = new Food('White Chocolate', 0);
var totalAmount = Number(localStorage.getItem('total'));
var desserts = getDesserts();
var blueberryCake = desserts[0];
var cheeseCake = desserts[1];
var mangoCake = desserts[2];
var strawberryCake = desserts[3];
var tiramisu = desserts[4];
var chocolate = desserts[5];
var whiteChocolate = desserts[6];
var brownieCookie = desserts[7];
var darkChocolateCookie = desserts[8];
var milkChocolateCookie = desserts[9];
var peanutButterCookie = desserts[10];
var toffeeCrunchCookie = desserts[11];
var lemonIcecream = desserts[12];
var vanillaIcecream = desserts[13];
var chocolateAlmondIcecream = desserts[14];
var blackRaspberryIcecream = desserts[15];
var bobaMilkTeaIcecream = desserts[16];

function getDesserts(){
  var dString = localStorage.getItem('desserts');
  if(!dString){
    var blueberryCake = new Food('Blueberry Cake', 0, 330);
    var cheeseCake = new Food('Cheese Cake', 0, 320);
    var mangoCake = new Food('Mango Cake', 0, 350);
    var strawberryCake = new Food('Strawberry Cake',0,  350);
    var tiramisu = new Food('Tiramisu', 0, 300);
    var chocolate = new Food('Chocolate', 0, 85);
    var whiteChocolate = new Food('White Chocolate', 0, 75);
    var brownieCookie = new Food('Brownie Cookie', 0, 35);
    var darkChocolateCookie = new Food('Dark Chocolate Cookie', 0, 30);
    var milkChocolateCookie = new Food('Milk Chocolate Cookie', 0, 30);
    var peanutButterCookie = new Food('Peanut Butter Cookie', 0, 35);
    var toffeeCrunchCookie = new Food('Toffee Crunch Cookie', 0, 30);
    var lemonIcecream = new Food('Lemon Ice Cream', 0, 50);
    var vanillaIcecream = new Food('Vanilla Ice Cream', 0, 50);
    var chocolateAlmondIcecream = new Food('Chocolate Almond Ice Cream', 0, 60);
    var blackRaspberryIcecream = new Food('Black Raspberry Ice Cream', 0, 65);
    var bobaMilkTeaIcecream = new Food('Boba Milk Tea Ice Cream', 0, 60);
    var d = [blueberryCake, cheeseCake, mangoCake, strawberryCake, tiramisu, chocolate, whiteChocolate
    , brownieCookie, darkChocolateCookie, milkChocolateCookie, peanutButterCookie, toffeeCrunchCookie
    , lemonIcecream, vanillaIcecream, chocolateAlmondIcecream, blackRaspberryIcecream, bobaMilkTeaIcecream];
    localStorage.setItem('desserts', JSON.stringify(d));
    return d;
  }
  else{
    var d = JSON.parse(dString);
    return d;
  }
}

function Add(show, store, i){
  var textbox = parseInt(document.getElementsByClassName(show)[i].value, 10);
  textbox += 1;
  document.getElementsByClassName(show)[i].value = textbox;
}

function Minus(show, store, i){
  var textbox = parseInt(document.getElementsByClassName(show)[i].value, 10);
  if(textbox > 0){
    textbox -= 1;
    document.getElementsByClassName(show)[i].value = textbox;
  }
}

function addToBasket(show, i, j){
  if(totalAmount == null){
    localStorage.setItem('total', 0);
  }
  totalAmount = Number(totalAmount) + parseInt(document.getElementsByClassName('showNumber')[i].value, 10);
  localStorage.setItem('total',totalAmount);
  var storeNumber = parseInt(document.getElementsByClassName(show)[i].value, 10);
  document.getElementsByClassName('showNumber')[i].value = 0;

  var dessertsDataString = localStorage.getItem('desserts');
	var foodData = JSON.parse(dessertsDataString);
  var amount = foodData[j].number;
  amount = amount + storeNumber;
  foodData[j].number = amount;
  desserts = foodData;
	localStorage.setItem('desserts', JSON.stringify(foodData));
  document.getElementById('totalNumber').innerHTML = "Cart" + totalAmount;
  totalNumber.style.color = "#FF8000";
  //var test = localStorage.getItem('desserts');
}

function closeModal() {
			var modal = document.getElementById('myModal');
			modal.style.display = "none";
}

function openModal() {
		    var myVar = setTimeout(function() {
				var modal = document.getElementById('myModal');
				modal.style.display = "block";
				clearTimeout(myVar);
      }, 3000);
}

function final(){
      var dessertsDataString = localStorage.getItem('desserts');
      var foodData = JSON.parse(dessertsDataString);
      var total = 0;
      for (var j = 0; j < foodData.length; j++) {
        total = total + foodData[j].number;
      }
      if (total != 0) {
        var finalPrice = 0;
        for(var i = 0; i < foodData.length; i++){
          if(foodData[i].number != 0){
            var x = document.createElement("p");
            x.setAttribute("class", "invoice");
            var something =  "<Strong>" + foodData[i].name + "</Strong>" + "(" + foodData[i].price + "NT per item) x "
            + foodData[i].number + "  ---------------------------------- Price: " + foodData[i].price*foodData[i].number + "NT";
            finalPrice = finalPrice + foodData[i].price*foodData[i].number;
            x.innerHTML = something;
            var test = document.getElementById("main");
            test.appendChild(x);
          }
        }
        var y = document.createElement("p");
        var x = document.createElement("button");
        x.setAttribute("id", "reset");
        x.setAttribute("onclick", "reset()");
        y.setAttribute("class", "invoice2");
        y.innerHTML = "TOTAL(With Discount): " + parseInt(finalPrice * 0.7, 10) + "NT";
        x.innerHTML = "CLEAR BASKET";
        var t = document.getElementById("main");
        t.appendChild(y);
        t.appendChild(x);
      }
      else {
          var x = document.createElement("p");
          x.setAttribute("class", "invoice");
          var something = "<Strong>" + "NO ITEMS" + "</Strong>";
          x.innerHTML = something;
          var test = document.getElementById("main");
          test.appendChild(x);
      }
}

function reset() {
  localStorage.clear();
  location.reload();
  window.location.href = "index.html";
}

function send() {
  var x = document.getElementById("userInfo").value;
  var y = document.getElementById("userInfo1").value;
  var z = document.getElementById("userInfo2").value;
  var s = document.getElementById("userInfo3").value;
  var t = document.getElementById("userInfo4").value;
  if (x == '' || y == '' || z == '' || s == '' || t == '') {
    window.alert("Please fill out each information box");
  }
  else {
    document.getElementById("userInfo").value = "";
    document.getElementById("userInfo1").value = "";
    document.getElementById("userInfo2").value = "";
    document.getElementById("userInfo3").value = "";
    document.getElementById("userInfo4").value = "";
    window.alert("Your purchase is confirmed!");
    localStorage.clear();
    location.reload();
    window.location.href = "index.html";
  }
}
