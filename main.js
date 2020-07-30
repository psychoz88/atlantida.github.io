//--------------SEND FORMS fetch() ---------
//---------------------------------
const btn = document.querySelector(".sub-button");
const div = document.querySelector(".sendformdiv");

const form = function formSending() {
  const requestURL = "https://jsonplaceholder.typicode.com/users";
  function sendRequest(method, url, obj) {
    return fetch(url, {
      method: method,
      body: JSON.stringify(obj),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((response) => {
      if (response.ok) {
        div.style.opacity = "0";
        const pic = document.querySelector(".main-footer");
        const img = document.createElement("img");
        img.src = "pictures/succes1.png";
        img.classList.add("img-succes");
        pic.appendChild(img);
        return response.json();
      }

      return response.json().then((error) => {
        div.style.opacity = "0";
        const pic2 = document.querySelector(".main-footer");
        const img2 = document.createElement("img");
        img2.src = "pictures/unsucces.png";
        img2.classList.add("img-succes");
        pic2.appendChild(img2);
        const e = new Error("Что-то пошло не так");
        e.data = error;
        throw e;
      });
    });
  }
  const name = document.querySelector("#nameform").value;
  const email = document.querySelector("#emailform").value;
  const telephone = document.querySelector("#telephoneform").value;
  const web = document.querySelector("#webform").value;
  const msg = document.querySelector("#msgform").value;
  const obj = { name, email, telephone, web, msg };
  //sendRequest("GET", requestURL)
  //  .then((data) => console.log(data))
  //  .catch((err) => console.log(err));

  sendRequest("POST", requestURL, obj)
    .then((data) => console.log(data))
    .catch((err) => console.log(err));
};

// чтобы несколько раз нельзя было нажать
function throttle(f, t) {
  return function (args) {
    let previousCall = this.lastCall;
    this.lastCall = Date.now();
    if (
      previousCall === undefined || // first time
      this.lastCall - previousCall > t
    ) {
      // throttle time has elapsed
      f(args);
    }
  };
}

let oneClick = throttle(form, 5000);

btn.addEventListener("click", oneClick);
//----------------------------------

//-------------SEARCH QUARY---------
//----------------------------------
async function sendFetchSearch(word) {
  const url = "https://api.datamuse.com/words?rel_syn=" + word;
  let response = await fetch(url);
  let results = await response.json();
  console.log(results);
}

function throttle(q, w) {
  return function (args) {
    let previousCall = this.lastCall;
    this.lastCall = Date.now();
    if (
      previousCall === undefined || // first time
      this.lastCall - previousCall > w
    ) {
      // throttle time has elapsed
      q(args);
    }
  };
}
const input = document.querySelector(".searchquary");

let inputChange = throttle(function () {
  sendFetchSearch(input.value);
}, 800);
input.addEventListener("input", inputChange);

//---------------------------------

//--------------SLIDER-------------
//---------------------------------
var slideIndex = 1;
showSlides(slideIndex);

function plusSlides(n) {
  showSlides((slideIndex += n));
}

function currentSlide(n) {
  showSlides((slideIndex = n));
}

function showSlides(n) {
  var i;
  var slides = document.getElementsByClassName("slider");
  var dots = document.getElementsByClassName("dot");
  if (n > slides.length) {
    slideIndex = 1;
  }
  if (n < 1) {
    slideIndex = slides.length;
  }
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex - 1].style.display = "flex";
  dots[slideIndex - 1].className += " active";
}

//---------------------------------
