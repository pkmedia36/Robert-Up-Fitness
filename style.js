

  /* ================= THEME TOGGLE ================= */
  const themeToggle = document.getElementById("themeToggle");
  if (themeToggle) {
    themeToggle.onclick = () => {
      document.body.classList.toggle("light-mode");
      localStorage.setItem(
        "theme",
        document.body.classList.contains("light-mode") ? "light" : "dark"
      );
    };

    if (localStorage.getItem("theme") === "light") {
      document.body.classList.add("light-mode");
    }
  }

  /* ================= GSAP SETUP ================= */
  gsap.registerPlugin(ScrollTrigger);

  /* HERO ANIMATION */
  gsap.from(".hero-content h1", { y: -50, opacity: 0, duration: 1 });
  gsap.from(".hero-content p", { y: 50, opacity: 0, duration: 1, delay: 0.3 });
  gsap.from(".hero-content .btn-primary", {
    scale: 0,
    opacity: 0,
    duration: 0.6,
    delay: 0.6,
    ease: "back.out(1.7)"
  });

  /* CARDS ON SCROLL */
  gsap.utils.toArray(".card, .program-card, .pricing-card").forEach(el => {
    gsap.from(el, {
      scrollTrigger: { trigger: el, start: "top 85%" },
      y: 40,
      opacity: 0,
      duration: 0.7
    });
  });

  /* ================= STATS COUNTER (SCROLL) ================= */
  document.querySelectorAll(".counter").forEach(counter => {
    const target = +counter.dataset.target;

    gsap.fromTo(counter,
      { innerText: 0 },
      {
        innerText: target,
        duration: 2,
        ease: "power3.out",
        snap: { innerText: 1 },
        scrollTrigger: {
          trigger: counter,
          start: "top 85%",
          once: true
        },
        onUpdate: () => {
          counter.innerText = Math.floor(counter.innerText);
        }
      }
    );
  });

  /* ================= BMI CALCULATOR ================= */
  const heightInput = document.getElementById("height");
  const weightInput = document.getElementById("weight");

  if (heightInput && weightInput) {
    heightInput.addEventListener("input", calculateBMI);
    weightInput.addEventListener("input", calculateBMI);
  }

  function calculateBMI() {
    const height = heightInput.value;
    const weight = weightInput.value;
    const result = document.getElementById("bmiResult");
    const status = document.getElementById("bmiStatus");
    const bar = document.getElementById("bmiBar");

    if (!height || !weight) {
      result.innerHTML = "Your BMI: 0";
      status.innerHTML = "";
      bar.style.width = "0%";
      return;
    }

    const bmi = weight / ((height / 100) ** 2);
    result.innerHTML = `Your BMI: ${bmi.toFixed(1)}`;

    if (bmi < 18.5) {
      status.innerHTML = "Underweight 🥗";
      bar.style.width = "25%";
    } else if (bmi < 25) {
      status.innerHTML = "Normal Weight ✅";
      bar.style.width = "50%";
    } else if (bmi < 30) {
      status.innerHTML = "Overweight ⚠️";
      bar.style.width = "75%";
    } else {
      status.innerHTML = "Obese ❗";
      bar.style.width = "100%";
    }
  }

  /* ================= AI CHAT POPUP ================= */
  const chatBox = document.querySelector(".ai-chat");
  if (chatBox) {
    setTimeout(() => {
      chatBox.style.opacity = "1";
      chatBox.style.transform = "translateY(0) scale(1)";
    }, 800);
  }

  /* ================= CTA POPUP ================= */
  const popup = document.getElementById("ctaPopup");
  const closePopup = document.getElementById("closePopup");

  if (popup) {
    setTimeout(() => popup.style.display = "flex", 5000);
  }

  if (closePopup) {
    closePopup.onclick = () => popup.style.display = "none";
  }

  /* ================= MOBILE NAV AUTO CLOSE ================= */
  const navbarCollapse = document.querySelector(".navbar-collapse");
  document.querySelectorAll(".navbar-collapse .nav-link, .navbar-collapse .btn")
    .forEach(link => {
      link.addEventListener("click", () => {
        if (window.innerWidth < 992 && navbarCollapse.classList.contains("show")) {
          new bootstrap.Collapse(navbarCollapse).hide();
        }
      });
    });


    /* ================= AI CHAT BOT ================= */

const aiInput = document.getElementById("aiInput");
const aiBody = document.getElementById("aiBody");

const aiReplies = [
  {
    keywords: ["hi", "hello", "hey"],
    reply: "Hey! 💪 Ready to crush your fitness goals?"
  },
  {
    keywords: ["workout", "training"],
    reply: "Consistency beats intensity 🔥 Train 4–5 times a week and rest well."
  },
  {
    keywords: ["diet", "food", "nutrition"],
    reply: "Eat clean: protein, veggies, water 💧 Junk food slows progress."
  },
  {
    keywords: ["lose fat", "fat loss", "weight"],
    reply: "Fat loss = calorie control + cardio + patience 🏃‍♂️"
  },
  {
    keywords: ["muscle", "build muscle"],
    reply: "Lift heavy, progressive overload, sleep well 💪"
  },
  {
    keywords: ["motivation", "tired", "lazy"],
    reply: "Discipline > motivation. Show up even on bad days 👊"
  },
  {
    keywords: ["bmi"],
    reply: "BMI is just a guide — body fat % matters more."
  }
];

function addMessage(sender, text) {
  const msg = document.createElement("div");
  msg.classList.add("ai-msg");
  msg.innerHTML = `<b>${sender}:</b> ${text}`;
  aiBody.appendChild(msg);
  aiBody.scrollTop = aiBody.scrollHeight;
}

function getAIReply(userText) {
  userText = userText.toLowerCase();

  for (let item of aiReplies) {
    for (let key of item.keywords) {
      if (userText.includes(key)) {
        return item.reply;
      }
    }
  }

  return "Good question 👀 Stay consistent, eat right, and trust the process 💯";
}

if (aiInput) {
  aiInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter" && aiInput.value.trim() !== "") {
      const userText = aiInput.value;

      addMessage("You", userText);
      aiInput.value = "";

      setTimeout(() => {
        const reply = getAIReply(userText);
        addMessage("Coach", reply);
      }, 700);
    }
  });
}



/* ================= SMART WORKOUT PLAN GENERATOR ================= */

function generatePlan() {
  const goal = document.getElementById("goal").value;
  const height = document.getElementById("height").value;
  const weight = document.getElementById("weight").value;
  const result = document.getElementById("planResult");

  if (!goal) {
    result.innerHTML = "<p style='color:red;'>❌ Please select a goal.</p>";
    return;
  }

  if (!height || !weight) {
    result.innerHTML =
      "<p style='color:red;'>❌ Enter height & weight to personalize your plan.</p>";
    return;
  }

  const bmi = weight / ((height / 100) ** 2);
  let bodyType = "";

  if (bmi < 18.5) bodyType = "underweight";
  else if (bmi < 25) bodyType = "normal";
  else if (bmi < 30) bodyType = "overweight";
  else bodyType = "obese";

  let plan = `<h4>📊 Your BMI: ${bmi.toFixed(1)} (${bodyType})</h4>`;

  if (goal === "muscle") {
    plan += `
      <h4>💪 Muscle Building Plan</h4>
      <ul>
        <li>🏋️ Train 4–5 days per week</li>
        <li>✔ Compound lifts (Bench, Squat, Deadlift)</li>
        <li>✔ 8–12 reps with progressive overload</li>
        <li>🍗 High protein (2g/kg bodyweight)</li>
        <li>😴 Sleep 7–8 hours</li>
      </ul>
    `;

    if (bodyType !== "underweight") {
      plan += `<p>⚠️ Focus on clean bulking, avoid excess fat gain.</p>`;
    }
  }

  if (goal === "fat") {
    plan += `
      <h4>🔥 Fat Loss Plan</h4>
      <ul>
        <li>🏃‍♂️ Cardio 4–6 days per week</li>
        <li>✔ Full-body workouts</li>
        <li>✔ Calorie deficit (–300 to –500)</li>
        <li>🥗 Protein + veggies, low sugar</li>
        <li>💧 Drink 2–3L water daily</li>
      </ul>
    `;

    if (bodyType === "normal") {
      plan += `<p>✅ You’re close — consistency will get you lean.</p>`;
    }
  }

  if (goal === "strength") {
    plan += `
      <h4>🏋️ Strength Training Plan</h4>
      <ul>
        <li>✔ Train 3–4 days per week</li>
        <li>✔ Heavy lifts (3–6 reps)</li>
        <li>✔ Long rest (2–3 mins)</li>
        <li>🍽 Eat at maintenance calories</li>
        <li>📈 Track strength weekly</li>
      </ul>
    `;
  }

  result.innerHTML = plan;
}



    /* ================= SIGNUP FORM EMAIL ================= */

const signupForm = document.getElementById("signupForm");
const signupStatus = document.getElementById("signupStatus");

if (signupForm) {
  signupForm.addEventListener("submit", function (e) {
    e.preventDefault();

    signupStatus.textContent = "Creating account...";
    signupStatus.style.color = "orange";

    emailjs
      .sendForm(
        "service_xdgur9g",   // ✅ your service ID
        "template_ht441fl",       // ✅ signup template ID
        this
      )
      .then(() => {
        signupStatus.textContent =
          "🎉 Signup successful! We’ll contact you soon.";
        signupStatus.style.color = "lime";
        signupForm.reset();
      })
      .catch((error) => {
        console.error("Signup Error:", error);
        signupStatus.textContent =
          "❌ Signup failed. Please try again.";
        signupStatus.style.color = "red";
      });
  });
}


  /* ================= EMAILJS INIT ================= */

  (function () {
  emailjs.init("6tHyzlw_a4XiEpRsy"); // 🔴 replace with your EmailJS public key
})();



  /* CONTACT FORM */
  const contactForm = document.getElementById("contactForm");
const formStatus = document.getElementById("formStatus");

if (contactForm) {
  contactForm.addEventListener("submit", function (e) {
    e.preventDefault();

    formStatus.innerHTML = "Sending...";
    formStatus.style.color = "orange";

    emailjs
      .sendForm(
        "service_xdgur9g",   // 🔴 replace
        "template_ht441fl",      // 🔴 template ID
        this
      )
      .then(
        function () {
          formStatus.innerHTML = "✅ Message sent successfully!";
          formStatus.style.color = "lime";
          contactForm.reset();
        },
        function (error) {
          formStatus.innerHTML = "❌ Failed to send message. Try again.";
          formStatus.style.color = "red";
          console.error("EmailJS Error:", error);
        }
      );
  });
};

