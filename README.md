# SwiftCart - E-Commerce Website

একটি সম্পূর্ণ responsive e-commerce website যা Fake Store API ব্যবহার করে তৈরি করা হয়েছে।

## 🚀 Features

- ✅ Dynamic product loading from API
- ✅ Category-based filtering
- ✅ Product details modal
- ✅ Shopping cart functionality
- ✅ Local storage for cart persistence
- ✅ Add/Remove from cart
- ✅ Cart quantity management
- ✅ Total price calculation
- ✅ Loading spinner
- ✅ Active category state
- ✅ Top rated products section
- ✅ Responsive design
- ✅ Toast notifications

## 📁 Project Structure

```
SwiftCart/
│
├── index.html          # Main HTML file
├── style.css           # Custom CSS styles
├── script.js           # JavaScript functionality
└── README.md           # Project documentation
```

## 🛠️ Technologies Used

- **HTML5**
- **CSS3** (Tailwind CSS + DaisyUI)
- **JavaScript (Vanilla)**
- **Fake Store API**
- **Font Awesome Icons**
- **Local Storage API**

## 🎯 How to Run

1. Clone or download this repository
2. Open `index.html` in your web browser
3. No build process required - it's pure vanilla JavaScript!

## 📚 JavaScript Questions (বাংলায় উত্তর)

### ১) `null` এবং `undefined` এর মধ্যে পার্থক্য কী?

**`undefined`:**

- যখন কোনো variable declare করা হয় কিন্তু তাতে কোনো value assign করা হয় না, তখন সেটা automatically `undefined` হয়।
- এটি JavaScript এর একটি primitive data type।
- কোনো function থেকে কিছু return না করলে সেটাও `undefined` return করে।
- Object এর এমন property access করলে যা exist করে না, তাও `undefined` পাওয়া যায়।

```javascript
let x;
console.log(x); // undefined

function test() {
  // কিছু return করা হয়নি
}
console.log(test()); // undefined
```

**`null`:**

- `null` হলো একটি intentional absence of value - অর্থাৎ, আমরা намেরিতভাবে বলে দিচ্ছি যে এখানে কোনো value নেই।
- এটিও একটি primitive value।
- Developer নিজে থেকে কোনো variable এ `null` assign করেন যখন বোঝাতে চান যে এটা খালি আছে বা এখনো কোনো object reference নেই।

```javascript
let y = null;
console.log(y); // null
```

**মূল পার্থক্য:**

- `undefined` মানে হলো variable টা declare করা আছে কিন্তু value দেওয়া হয়নি।
- `null` মানে হলো আমরা намেरিত ভাবে একটা empty value set করেছি।
- `typeof undefined` = "undefined" কিন্তু `typeof null` = "object" (এটা JavaScript এর একটা bug যা এখনও আছে)

---

### ২) JavaScript এ `map()` function এর ব্যবহার কী? এটি `forEach()` থেকে কীভাবে আলাদা?

**`map()` function:**

- `map()` হলো একটি array method যা প্রতিটি element এর উপর একটা function run করে এবং একটা **নতুন array return** করে।
- Original array টা unchanged থাকে।
- যখন আমরা প্রতিটি element কে transform করে নতুন array বানাতে চাই তখন `map()` ব্যবহার করি।

```javascript
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((num) => num * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
console.log(numbers); // [1, 2, 3, 4, 5] (unchanged)
```

**`forEach()` function:**

- `forEach()` ও প্রতিটি element এর উপর একটা function run করে কিন্তু এটা কোনো নতুন array return করে না।
- এটা শুধু iteration এর জন্য ব্যবহার হয়, কোনো value return করে না (undefined return করে)।
- Side effects এর জন্য ব্যবহার হয় - যেমন console.log করা, DOM update করা ইত্যাদি।

```javascript
const numbers = [1, 2, 3, 4, 5];
numbers.forEach((num) => {
  console.log(num * 2); // শুধু print করবে
});
// forEach কোনো array return করে না
```

**মূল পার্থক্য:**

1. **Return value:** `map()` নতুন array return করে, `forEach()` undefined return করে
2. **Purpose:** `map()` data transform করার জন্য, `forEach()` শুধু iteration এর জন্য
3. **Chaining:** `map()` এর সাথে অন্য array methods chain করা যায়, `forEach()` এর সাথে না
4. **Performance:** Data transformation এর জন্য `map()` বেশি readable এবং functional programming style

```javascript
// ভালো উদাহরণ - map() ব্যবহার
const prices = [100, 200, 300];
const discountedPrices = prices.map((price) => price * 0.9);

// ভালো উদাহরণ - forEach() ব্যবহার
prices.forEach((price) => {
  console.log(`Price: $${price}`);
});
```

---

### ৩) `==` এবং `===` এর মধ্যে পার্থক্য কী?

**`==` (Loose Equality / Abstract Equality):**

- এটা value শুধুমাত্র value compare করে, data type compare করে না।
- Comparison করার আগে type coercion করে - অর্থাৎ, দুইটা different type কে same type এ convert করে তারপর compare করে।

```javascript
console.log(5 == "5"); // true (string "5" কে number এ convert করে)
console.log(0 == false); // true (false কে 0 এ convert করে)
console.log(null == undefined); // true
console.log("" == 0); // true (empty string কে 0 এ convert করে)
```

**`===` (Strict Equality):**

- এটা value এবং data type দুইটাই compare করে।
- কোনো type coercion করে না।
- সবসময় বেশি predictable এবং recommended।

```javascript
console.log(5 === "5"); // false (একটা number, একটা string)
console.log(0 === false); // false (একটা number, একটা boolean)
console.log(null === undefined); // false (different types)
console.log("" === 0); // false
console.log(5 === 5); // true (same value এবং same type)
```

**মূল পার্থক্য:**

1. `==` type coercion করে, `===` করে না
2. `===` বেশি strict এবং predictable
3. Best practice হলো সবসময় `===` ব্যবহার করা (যদি না আপনি намेरিত type coercion চান)
4. `==` এর কারণে unexpected bugs হতে পারে

**কখন কোনটা ব্যবহার করবেন:**

- **সবসময় `===` ব্যবহার করুন** - এটা safer এবং clear
- শুধুমাত্র বিশেষ ক্ষেত্রে `==` ব্যবহার করুন যখন আপনি намеरিত ভাবে type coercion চাচ্ছেন

```javascript
// ভালো practice
if (userAge === 18) {
  console.log("Exactly 18");
}

// এড়িয়ে চলুন
if (userAge == "18") {
  // এটা true হবে কিন্তু confusing
}
```

---

### ৪) API data fetch করার সময় `async`/`await` এর significance কী?

**`async`/`await` কী:**

- `async`/`await` হলো JavaScript এ asynchronous code লেখার একটা modern এবং clean way।
- এটা Promise এর উপর based কিন্তু code কে অনেক বেশি readable এবং synchronous এর মতো দেখায়।
- `async` keyword একটা function কে asynchronous বানায় এবং সেটা সবসময় একটা Promise return করে।
- `await` keyword শুধুমাত্র `async` function এর ভিতরে ব্যবহার করা যায় এবং এটা Promise resolve হওয়া পর্যন্ত wait করে।

**API fetch এ ব্যবহার:**

```javascript
// পুরাতন পদ্ধতি - Promise chains
function fetchProducts() {
  fetch("https://fakestoreapi.com/products")
    .then((response) => response.json())
    .then((data) => {
      console.log(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

// আধুনিক পদ্ধতি - async/await
async function fetchProducts() {
  try {
    const response = await fetch("https://fakestoreapi.com/products");
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
}
```

**Significance / গুরুত্ব:**

1. **Readability (পড়তে সহজ):**
   - Code sequential এবং synchronous এর মতো দেখায়
   - Callback hell বা Promise chaining এর complexity কমে
   - নতুন developers দের জন্য বুঝতে সহজ

2. **Error Handling (Error সামলানো সহজ):**
   - Traditional try-catch block ব্যবহার করা যায়
   - Promise এর `.catch()` এর চেয়ে বেশি intuitive

   ```javascript
   async function loadData() {
     try {
       const response = await fetch(url);
       const data = await response.json();
       return data;
     } catch (error) {
       console.error("Data load failed:", error);
       return null;
     }
   }
   ```

3. **Multiple API Calls সহজে handle করা:**

   ```javascript
   async function loadMultipleData() {
     try {
       // Sequential calls
       const user = await fetch("/api/user").then((r) => r.json());
       const posts = await fetch(`/api/posts/${user.id}`).then((r) => r.json());

       // Parallel calls
       const [products, categories] = await Promise.all([
         fetch("/api/products").then((r) => r.json()),
         fetch("/api/categories").then((r) => r.json()),
       ]);

       return { user, posts, products, categories };
     } catch (error) {
       console.error(error);
     }
   }
   ```

4. **Debugging সহজ:**
   - Call stack trace clear থাকে
   - Breakpoints set করা সহজ
   - Step-by-step debugging করা যায়

5. **Code Organization:**
   - Function আরও organized এবং maintainable হয়
   - Logic flow বুঝতে সহজ

**Real-world Example (আমাদের project থেকে):**

```javascript
async function loadAllProducts() {
  try {
    showLoadingSpinner("products-container");
    const response = await fetch(`${API_BASE_URL}/products`);

    if (!response.ok) {
      throw new Error("Failed to fetch products");
    }

    allProducts = await response.json();
    displayProducts(allProducts);
  } catch (error) {
    console.error("Error loading products:", error);
    showToast("Failed to load products", "error");
  }
}
```

**সতর্কতা:**

- `await` শুধু `async` function এর ভিতরে কাজ করে
- Top-level await শুধু module এ support করে (modern browsers এ)
- `await` ব্যবহার করলে সেই line এ execution pause হয়ে যায়, তাই parallel operations এর জন্য `Promise.all()` ব্যবহার করুন

---

### ৫) JavaScript এ Scope এর concept ব্যাখ্যা করুন (Global, Function, Block)

**Scope কী:**
Scope হলো JavaScript এ variables এর accessibility বা visibility নির্ধারণ করে। অর্থাৎ, কোন variable কোথা থেকে access করা যাবে তা scope define করে।

---

**১) Global Scope:**

- যে variables function বা block এর বাইরে declare করা হয়, সেগুলো global scope এ থাকে।
- এই variables পুরো program এর যেকোনো জায়গা থেকে access করা যায়।
- Browser এ global scope হলো `window` object।

```javascript
// Global scope
const siteName = "SwiftCart";
let totalUsers = 1000;

function showInfo() {
  console.log(siteName); // Access করা যাবে
  console.log(totalUsers); // Access করা যাবে
}

if (true) {
  console.log(siteName); // এখানেও access করা যাবে
}

console.log(siteName); // Global scope এ access করা যাবে
```

**সমস্যা:**

- অনেক বেশি global variables code কে messy করে
- Name conflicts হতে পারে
- Security এবং maintainability issues

---

**২) Function Scope:**

- `var` দিয়ে declare করা variables function scope এ থাকে।
- Function এর ভিতরে declare করা variables শুধুমাত্র সেই function এর ভিতরেই access করা যায়।
- Function এর বাইর থেকে access করা যায় না।

```javascript
function calculateTotal() {
  var price = 100; // Function scope
  let quantity = 5; // Function scope
  const tax = 0.1; // Function scope

  var total = price * quantity * (1 + tax);
  console.log(total); // কাজ করবে
}

calculateTotal();
console.log(price); // Error: price is not defined
console.log(total); // Error: total is not defined
```

**`var` এর বিশেষত্ব:**

```javascript
function testVar() {
  if (true) {
    var x = 10; // Function scoped, block scoped না
  }
  console.log(x); // 10 - কাজ করবে কারণ var function scoped
}

testVar();
```

---

**৩) Block Scope:**

- `let` এবং `const` দিয়ে declare করা variables block scope এ থাকে।
- Block মানে হলো curly braces `{}` এর ভিতরের অংশ - যেমন if, for, while ইত্যাদি।
- Block এর বাইরে থেকে এই variables access করা যায় না।

```javascript
// Block scope example
if (true) {
  let blockVar = "I'm in block";
  const blockConst = 100;
  var functionVar = "I'm in function";

  console.log(blockVar); // কাজ করবে
  console.log(blockConst); // কাজ করবে
}

console.log(functionVar); // কাজ করবে (var function scoped)
console.log(blockVar); // Error: blockVar is not defined
console.log(blockConst); // Error: blockConst is not defined
```

**For loop এ block scope:**

```javascript
// let ব্যবহার (block scoped)
for (let i = 0; i < 3; i++) {
  console.log(i); // 0, 1, 2
}
console.log(i); // Error: i is not defined

// var ব্যবহার (function scoped)
for (var j = 0; j < 3; j++) {
  console.log(j); // 0, 1, 2
}
console.log(j); // 3 - কাজ করবে!
```

---

**Scope Chain:**
JavaScript nested scopes তে variable খোঁজে outer scope এ যায় যদি current scope এ না পায়।

```javascript
const global = "Global";

function outer() {
  const outerVar = "Outer";

  function inner() {
    const innerVar = "Inner";

    console.log(innerVar); // নিজের scope এ পাবে
    console.log(outerVar); // Parent scope এ পাবে
    console.log(global); // Global scope এ পাবে
  }

  inner();
  console.log(innerVar); // Error: innerVar is not defined
}

outer();
```

---

**Practical Example (আমাদের project থেকে):**

```javascript
// Global scope
let cart = []; // পুরো app থেকে access করা যাবে
const API_BASE_URL = "https://..."; // পুরো app থেকে access করা যাবে

function addToCart(productId) {
  // Function scope
  const product = allProducts.find((p) => p.id === productId);

  if (product) {
    // Block scope
    let existingItem = cart.find((item) => item.id === productId);

    if (existingItem) {
      // এই block এর ভিতরেই access করা যাবে
      let newQuantity = existingItem.quantity + 1;
      existingItem.quantity = newQuantity;
    }
  }

  // product variable এখানে access করা যাবে (function scope)
  // newQuantity এখানে access করা যাবে না (block scope)
}
```

---
