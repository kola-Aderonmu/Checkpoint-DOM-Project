const cartContainer = document.getElementById("cart-container");
const cartTotal = document.getElementById("cart--total");
const checkOutBtn = document.getElementById("checkout--btn");
const bodyContent = document.getElementById("bodyContent");
const cointainerForCheckout = document.getElementById(
  "container--for--checkout"
);

const footContent = document.getElementById("footer");

let cartItems = [
  {
    productID: "1",
    productImage:
      "https://th.bing.com/th/id/R.f2b427cf75f2223d0c9ddef702a84526?rik=wkSRRfBdYJ8sIQ&pid=ImgRaw&r=0",
    productName: "Military Boot",
    productPrice: 9000,
    productQuantity: 1,
    like: false,
  },
  {
    productID: "2",
    productImage:
      "https://th.bing.com/th/id/R.29f75c7402335527f1bd818d9128b82c?rik=vTnUw1qWRxz35w&riu=http%3a%2f%2fimage.sportsmansguide.com%2fadimgs%2fl%2f6%2f637641_ts.jpg&ehk=rCaEUo47TC0nd%2bW4QJhvq3rFH7fekHNTaMsrMp8kVWQ%3d&risl=&pid=ImgRaw&r=0",
    productName: "Mess kit",
    productPrice: 2000,
    productQuantity: 1,
    like: false,
  },
  {
    productID: "3",
    productImage:
      "https://th.bing.com/th/id/R.717688ab9acd8b756ada1788bb9103d2?rik=hKXVTKSWuPdAzQ&pid=ImgRaw&r=0",
    productName: "Military survival Kit",
    productPrice: 18000,
    productQuantity: 1,
    like: false,
  },
  {
    productID: "4",
    productImage:
      "https://th.bing.com/th/id/R.74edd65ac1c9c10083cefe53a0700514?rik=66M4TzvSl%2frQzw&pid=ImgRaw&r=0",
    productName: "Tactical Mich Helmet",
    productPrice: 6000,
    productQuantity: 1,
    like: false,
  },
  {
    productID: "5",
    productImage:
      "https://ng.jumia.is/unsafe/fit-in/500x500/filters:fill(white)/product/03/6002241/1.jpg?2102",
    productName: "Tactical Resistance Glove",
    productPrice: 1000,
    productQuantity: 1,
    like: false,
  },
];
let totalCostsOfItemsInCart;

// a function to display our cart items
function displayCartItems() {
  // step one: map over the products params

  let currencyDisplay = Intl.NumberFormat("en-us"); // Changing  your figures to human readbale language

  bodyContent.innerHTML = `<div class="body--content container">
    <h2>User Checkout</h2>
    <i class="fa-solid fa-cart-plus my-cart"></i>
    </div>
    `;

  cartContainer.innerHTML = cartItems
    .map(
      (item) =>
        `<div class="single--product">
        <div>
            <img
            src= ${item.productImage}
            alt="Gloves"
            class="product--image"
            />
        </div>
        

        <div class="product--information">
          <h3 class="product--title">${item.productName}</h3>
          <p class="product--amount">&#8358; ${currencyDisplay.format(
            item.productPrice
          )}</p>

          <!-- Incremental and Decremental Button (Product Quantity) -->

          <div class="price--btn"><button onclick=decreaseQuantity('${
            item.productID
          }') class="ctl--btn">-</button><span> ${
          item.productQuantity
        } </span><button onclick=increaseQuantity('${
          item.productID
        }') class="ctl--btn">+</button></div>
        <!------------------------------------------------------------>
        
        <button onclick=removeItemFromCart('${
          item.productID
        }') class="remove--item"><i class="fa-solid fa-trash"></i> Remove</button>

        <button onclick=updateProductLikeness('${
          item.productID
        }') class="like--btn">

        ${
          item.like === true
            ? `<i class="fa-solid fa-heart fa-bounce" style="color: #af1212;"></i>`
            : `<i class="fa-regular fa-heart" style="color: #c12525;"></i>`
        }
        
      
        
        </button>
           

        </div>
      </div>`
    )
    .join("");
}
console.log(cartItems);
displayCartItems();

//A function to increment the quantity of a particular item
function increaseQuantity(id) {
  cartItems.forEach((item) => {
    if (item.productID === id) {
      item.productQuantity += 1;
    }
  });
  displayCartItems();
  calculateCartTotal();
}

// A function to decrement the quantity of a particular item
function decreaseQuantity(id) {
  cartItems.forEach((item) => {
    if (item.productQuantity === 1) {
      return;
    }
    if (item.productID === id) {
      item.productQuantity -= 1;
    }
  });
  displayCartItems();
  calculateCartTotal();
}
// aA function to remove items from the cart
function removeItemFromCart(id) {
  cartItems = cartItems.filter((item) => item.productID !== id);
  displayCartItems();
  calculateCartTotal();
  return cartItems;
}

function calculateCartTotal() {
  totalCostsOfItemsInCart = cartItems.reduce((total, value) => {
    return total + value.productQuantity * value.productPrice;
  }, 0);
  console.log(totalCostsOfItemsInCart);
  cartTotal.textContent =
    "₦" + Intl.NumberFormat("en-us").format(totalCostsOfItemsInCart);
}

calculateCartTotal();
console.log(cartItems);

// A function to check if the customer likes the item

function updateProductLikeness(id) {
  cartItems.forEach((item) => {
    if (item.productID === id && item.like === false) {
      item.like = true;
    } else if (item.productID === id && item.like === true) {
      item.like = false;
    }
  });
  displayCartItems();
}

// cointainerForCheckout.innerHTML = `<div class="second--container">

// </div>`;

checkOutBtn.addEventListener("click", proceedToCheck);

function proceedToCheck(params) {
  return displayCartItems();
}

footContent.innerHTML = `<div class="footer--content"><p>&copy;reserved copy 2023</p>&copy; aderonmu<p></p></div>`;
