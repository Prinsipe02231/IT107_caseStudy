// Select elements
const homeui = document.getElementById("homeui");
const cxui = document.getElementById("cxui");
const tyscreen = document.getElementById("tyscreen");
const loginScreen = document.getElementById("loginScreen");
const ownerui = document.getElementById("ownerui");

// Buttons
const customerBtn = document.getElementById("customerBtn");
const ownerBtn = document.getElementById("ownerBtn");
const submitBtn = document.getElementById("submitBtn");
const resetBtn = document.getElementById("resetBtn");
const backToHomeBtn = document.getElementById("backToHomeBtn");
const ReturnBtn = document.getElementById("ReturnBtn");
const loginBtn = document.getElementById("loginBtn");
const logoutBtn = document.getElementById("logoutBtn");
const backBtn = document.getElementById("backBtn");
const deleteAllBtn = document.getElementById("deleteAllBtn");

// Multiple owner accounts
const OWNER_ACCOUNTS = [
  { username: "cortezkurtjoshua@gmail.com", password: "kjcc0608" },
  { username: "jkcc69", password: "123456789" },
  { username: "", password: "" }
];

// Load saved feedback data
let feedbackList = JSON.parse(localStorage.getItem("feedbackList")) || [];

// Customer button click
customerBtn.addEventListener("click", () => {
  homeui.classList.add("hidden");
  cxui.classList.remove("hidden");
});

// Owner button click
ownerBtn.addEventListener("click", () => {
  homeui.classList.add("hidden");
  loginScreen.classList.remove("hidden");
});

// Back button
backBtn.addEventListener("click", () => {
  loginScreen.classList.add("hidden");
  homeui.classList.remove("hidden");
});

// Submit feedback
submitBtn.addEventListener("click", () => {
  const feedback = {
    name: document.getElementById("name").value || "Anonymous",
    taste: document.getElementById("taste").value,
    appearance: document.getElementById("appearance").value,
    drinks: document.getElementById("drinks").value,
    staff: document.getElementById("staff").value,
    efficiency: document.getElementById("efficiency").value,
    greeting: document.getElementById("greeting").value,
    return: document.getElementById("return").value,
    comments: document.getElementById("comments").value
  };

  if (
    !feedback.taste ||
    !feedback.appearance ||
    !feedback.drinks ||
    !feedback.staff ||
    !feedback.efficiency ||
    !feedback.greeting ||
    !feedback.return
  ) {
    alert("Please fill in all required fields.");
    return;
  }

  feedbackList.push(feedback);
  localStorage.setItem("feedbackList", JSON.stringify(feedbackList));

  cxui.classList.add("hidden");
  tyscreen.classList.remove("hidden");
});

// Reset form
resetBtn.addEventListener("click", () => {
  document.getElementById("name").value = "";
  document.querySelectorAll("select").forEach(select => (select.value = ""));
  document.getElementById("comments").value = "";
});

//Return to home(misclicked)
backToHomeBtn.addEventListener("click", () => {
  cxui.classList.add("hidden");
  homeui.classList.remove("hidden");
});

// Return to home
ReturnBtn.addEventListener("click", () => {
  tyscreen.classList.add("hidden");
  homeui.classList.remove("hidden");
});

// Owner login
loginBtn.addEventListener("click", () => {
  const username = document.getElementById("ownerUser").value;
  const password = document.getElementById("ownerPass").value;

  const validAccount = OWNER_ACCOUNTS.find(
    acc => acc.username === username && acc.password === password
  );

  if (validAccount) {
    loginScreen.classList.add("hidden");
    ownerui.classList.remove("hidden");
    loadFeedback();
  } else {
    alert("Invalid credentials. Please try again.");
  }
});

// Logout button
logoutBtn.addEventListener("click", () => {
  ownerui.classList.add("hidden");
  homeui.classList.remove("hidden");
});

// Load feedback into table
function loadFeedback() {
  const table = document.getElementById("feedbackTable");
  table.innerHTML = "";

  feedbackList.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${item.name}</td>
      <td>${item.taste}</td>
      <td>${item.appearance}</td>
      <td>${item.drinks}</td>
      <td>${item.staff}</td>
      <td>${item.efficiency}</td>
      <td>${item.greeting}</td>
      <td>${item.return}</td>
      <td>${item.comments}</td>
      <td><button class="deleteBtn" data-index="${index}">Delete</button></td>
    `;
    table.appendChild(row);
  });

  document.querySelectorAll(".deleteBtn").forEach(btn => {
    btn.addEventListener("click", event => {
      const index = event.target.getAttribute("data-index");
      if (confirm("Are you sure you want to delete this feedback?")) {
        deleteFeedback(index);
      }
    });
  });
}

// Delete single feedback
function deleteFeedback(index) {
  feedbackList.splice(index, 1);
  localStorage.setItem("feedbackList", JSON.stringify(feedbackList));
  loadFeedback();
}

// Delete all feedback
if (deleteAllBtn) {
  deleteAllBtn.addEventListener("click", () => {
    if (confirm("This will permanently delete all feedback. Continue?")) {
      localStorage.removeItem("feedbackList");
      feedbackList = [];
      const feedbackTable = document.getElementById("feedbackTable");
      if (feedbackTable) feedbackTable.innerHTML = "";
      alert("All feedback has been deleted.");
    }
  });
}
