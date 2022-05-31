// Progress bar
const progressBar = document.getElementById("progress-bar");
const progressNext = document.getElementById("progress-next");
const progressPrev = document.getElementById("progress-prev");
const steps = document.querySelectorAll(".step");
let div = document.querySelectorAll(".txt");

let active = 1;

progressNext.addEventListener("click", () => {
  active++;
  if (active > steps.length) {
    active = steps.length;
  }
  updateProgress();
});

progressPrev.addEventListener("click", () => {
  active--;
  if (active < 1) {
    active = 1;
  }
  updateProgress();
});

const updateProgress = () => {
  // toggle active class on list items
  steps.forEach((step, i) => {
    if (i < active) {
      step.classList.add("active");
      if (i > 0) {
        div[i - 1].classList.remove("active");
        div[i].classList.add("active");
      }
      else {
        div[i].classList.add("active");
      }
    }
    else {
      step.classList.remove("active");
      div[i].classList.remove("active");
    }
  });


  // set progress bar width  
  progressBar.style.width =
    ((active - 1) / (steps.length - 1)) * 100 + "%";
  // enable disable prev and next buttons
  if (active === 1) {
    progressPrev.disabled = true;
  } else if (active === steps.length) {
    progressNext.disabled = true;
  } else {
    progressPrev.disabled = false;
    progressNext.disabled = false;
  }
};


///////////////////////////////// Expense ////////////////////////////////////


//-------Monthly Income slider #1 and #2-------
const range = document.getElementById("range");
const otherRange = document.getElementById("otherRange");
const MI_sum = document.getElementById("MIresult");
var Ivalue = 0;
var Ovalue = 0;

range.addEventListener("input", (e) => {
  Ivalue = +e.target.value;
  const label = e.target.nextElementSibling;
  const range_width = getComputedStyle(e.target).getPropertyValue("width");
  const label_width = getComputedStyle(label).getPropertyValue("width");
  const num_width = +range_width.substring(0, range_width.length - 2);
  const num_label_width = +label_width.substring(0, label_width.length - 2);
  const max = +e.target.max;
  const min = +e.target.min;
  const left = Ivalue * (num_width / max) - num_label_width / 2 + scale(Ivalue, min, max, 10, -10);

  label.style.left = `${left}px`;

  label.innerHTML = '$' + Ivalue;

  MI_sum.innerHTML = '$' + (Ivalue + Ovalue);

  localStorage.getItem("income");
  var dataobjt = [];
  dataobjt.push(Ivalue + Ovalue);
  localStorage.setItem("income", JSON.stringify(dataobjt));


});

otherRange.addEventListener("input", (e) => {
  Ovalue = +e.target.value;
  const label = e.target.nextElementSibling;
  const otherRange_width = getComputedStyle(e.target).getPropertyValue("width");
  const label_width = getComputedStyle(label).getPropertyValue("width");
  const num_width = +otherRange_width.substring(0, otherRange_width.length - 2);
  const num_label_width = +label_width.substring(0, label_width.length - 2);
  const max = +e.target.max;
  const min = +e.target.min;
  const left = Ovalue * (num_width / max) - num_label_width / 2 + scale(Ovalue, min, max, 10, -10);

  label.style.left = `${left}px`;
  label.innerHTML = '$' + Ovalue;


  MI_sum.innerHTML = '$' + (Ivalue + Ovalue);

  localStorage.getItem("income");
  var dataobjt = [];
  dataobjt.push(Ivalue + Ovalue);
  localStorage.setItem("income", JSON.stringify(dataobjt));


});




//-------Housing Expense slider #3, #4, #5 and #6-------
const mortage = document.getElementById("mortage");
const rent = document.getElementById("rent");
const cable = document.getElementById("cable");
const gas = document.getElementById("gas");
const HE_sum = document.getElementById("rentsum");
var mvalue = 0;
var Rvalue = 0;
var Cvalue = 0;
var Gvalue = 0;

mortage.addEventListener("input", (e) => {
  mvalue = +e.target.value;
  const label = e.target.nextElementSibling;
  const mortage_width = getComputedStyle(e.target).getPropertyValue("width");
  const label_width = getComputedStyle(label).getPropertyValue("width");
  const num_width = +mortage_width.substring(0, mortage_width.length - 2);
  const num_label_width = +label_width.substring(0, label_width.length - 2);
  const max = +e.target.max;
  const min = +e.target.min;
  const left = mvalue * (num_width / max) - num_label_width / 2 + scale(mvalue, min, max, 10, -10);

  label.style.left = `${left}px`;

  label.innerHTML = '$' + mvalue;
  HE_sum.innerHTML = '$' + (mvalue + Rvalue + Cvalue + Gvalue);

  localStorage.getItem("housing");
  var houseobjt = [];
  houseobjt.push(mvalue + Rvalue + Cvalue + Gvalue);
  localStorage.setItem("housing", JSON.stringify(houseobjt));

});

rent.addEventListener("input", (e) => {
  Rvalue = +e.target.value;
  const label = e.target.nextElementSibling;
  const rent_width = getComputedStyle(e.target).getPropertyValue("width");
  const label_width = getComputedStyle(label).getPropertyValue("width");
  const num_width = +rent_width.substring(0, rent_width.length - 2);
  const num_label_width = +label_width.substring(0, label_width.length - 2);
  const max = +e.target.max;
  const min = +e.target.min;
  const left = Rvalue * (num_width / max) - num_label_width / 2 + scale(Rvalue, min, max, 10, -10);

  label.style.left = `${left}px`;

  label.innerHTML = '$' + Rvalue;
  HE_sum.innerHTML = '$' + (mvalue + Rvalue + Cvalue + Gvalue);

  localStorage.getItem("housing");
  var houseobjt = [];
  houseobjt.push(mvalue + Rvalue + Cvalue + Gvalue);
  localStorage.setItem("housing", JSON.stringify(houseobjt));
});

cable.addEventListener("input", (e) => {
  Cvalue = +e.target.value;
  const label = e.target.nextElementSibling;
  const cable_width = getComputedStyle(e.target).getPropertyValue("width");
  const label_width = getComputedStyle(label).getPropertyValue("width");
  const num_width = +cable_width.substring(0, cable_width.length - 2);
  const num_label_width = +label_width.substring(0, label_width.length - 2);
  const max = +e.target.max;
  const min = +e.target.min;
  const left = Cvalue * (num_width / max) - num_label_width / 2 + scale(Cvalue, min, max, 10, -10);

  label.style.left = `${left}px`;
  label.innerHTML = '$' + Cvalue;

  HE_sum.innerHTML = '$' + (mvalue + Rvalue + Cvalue + Gvalue);

  localStorage.getItem("housing");
  var houseobjt = [];
  houseobjt.push(mvalue + Rvalue + Cvalue + Gvalue);
  localStorage.setItem("housing", JSON.stringify(houseobjt));
});

gas.addEventListener("input", (e) => {
  Gvalue = +e.target.value;
  const label = e.target.nextElementSibling;
  const gas_width = getComputedStyle(e.target).getPropertyValue("width");
  const label_width = getComputedStyle(label).getPropertyValue("width");
  const num_width = +gas_width.substring(0, gas_width.length - 2);
  const num_label_width = +label_width.substring(0, label_width.length - 2);
  const max = +e.target.max;
  const min = +e.target.min;
  const left = Gvalue * (num_width / max) - num_label_width / 2 + scale(Gvalue, min, max, 10, -10);

  label.style.left = `${left}px`;
  label.innerHTML = '$' + Gvalue;

  HE_sum.innerHTML = '$' + (mvalue + Rvalue + Cvalue + Gvalue);

  localStorage.getItem("housing");
  var houseobjt = [];
  houseobjt.push(mvalue + Rvalue + Cvalue + Gvalue);
  localStorage.setItem("housing", JSON.stringify(houseobjt));
});



//-------Transportation Expense slider #7, #8, #9 and #10-------
const car = document.getElementById("car");
const insuranceRange = document.getElementById("insuranceRange");
const fuel = document.getElementById("fuel");
const repairs = document.getElementById("repairs");
const T_sum = document.getElementById("Tsum");
var carvalue = 0;
var insValue = 0;
var Fvalue = 0;
var repairValue = 0;

car.addEventListener("input", (e) => {
  carvalue = +e.target.value;
  const label = e.target.nextElementSibling;
  const car_width = getComputedStyle(e.target).getPropertyValue("width");
  const label_width = getComputedStyle(label).getPropertyValue("width");
  const num_width = +car_width.substring(0, car_width.length - 2);
  const num_label_width = +label_width.substring(0, label_width.length - 2);
  const max = +e.target.max;
  const min = +e.target.min;
  const left = carvalue * (num_width / max) - num_label_width / 2 + scale(carvalue, min, max, 10, -10);

  label.style.left = `${left}px`;

  label.innerHTML = '$' + carvalue;
  T_sum.innerHTML = '$' + (carvalue + insValue + Fvalue + repairValue);


  localStorage.getItem("transp");
  var transpobjt = [];
  transpobjt.push(carvalue + insValue + Fvalue + repairValue);
  localStorage.setItem("transp", JSON.stringify(transpobjt));
});

insuranceRange.addEventListener("input", (e) => {
  insValue = +e.target.value;
  const label = e.target.nextElementSibling;
  const insurance_width = getComputedStyle(e.target).getPropertyValue("width");
  const label_width = getComputedStyle(label).getPropertyValue("width");
  const num_width = +insurance_width.substring(0, insurance_width.length - 2);
  const num_label_width = +label_width.substring(0, label_width.length - 2);
  const max = +e.target.max;
  const min = +e.target.min;
  const left = insValue * (num_width / max) - num_label_width / 2 + scale(insValue, min, max, 10, -10);

  label.style.left = `${left}px`;

  label.innerHTML = '$' + insValue;
  T_sum.innerHTML = '$' + (carvalue + insValue + Fvalue + repairValue);

  localStorage.getItem("transp");
  var transpobjt = [];
  transpobjt.push(carvalue + insValue + Fvalue + repairValue);
  localStorage.setItem("transp", JSON.stringify(transpobjt));
});

fuel.addEventListener("input", (e) => {
  Fvalue = +e.target.value;
  const label = e.target.nextElementSibling;
  const fuel_width = getComputedStyle(e.target).getPropertyValue("width");
  const label_width = getComputedStyle(label).getPropertyValue("width");
  const num_width = +fuel_width.substring(0, fuel_width.length - 2);
  const num_label_width = +label_width.substring(0, label_width.length - 2);
  const max = +e.target.max;
  const min = +e.target.min;
  const left = Fvalue * (num_width / max) - num_label_width / 2 + scale(Fvalue, min, max, 10, -10);

  label.style.left = `${left}px`;

  label.innerHTML = '$' + Fvalue;
  T_sum.innerHTML = '$' + (carvalue + insValue + Fvalue + repairValue);

  localStorage.getItem("transp");
  var transpobjt = [];
  transpobjt.push(carvalue + insValue + Fvalue + repairValue);
  localStorage.setItem("transp", JSON.stringify(transpobjt));
});

repairs.addEventListener("input", (e) => {
  repairValue = +e.target.value;
  const label = e.target.nextElementSibling;
  const repairs_width = getComputedStyle(e.target).getPropertyValue("width");
  const label_width = getComputedStyle(label).getPropertyValue("width");
  const num_width = +repairs_width.substring(0, repairs_width.length - 2);
  const num_label_width = +label_width.substring(0, label_width.length - 2);
  const max = +e.target.max;
  const min = +e.target.min;
  const left = repairValue * (num_width / max) - num_label_width / 2 + scale(repairValue, min, max, 10, -10);

  label.style.left = `${left}px`;

  label.innerHTML = '$' + repairValue;
  T_sum.innerHTML = '$' + (carvalue + insValue + Fvalue + repairValue);

  localStorage.getItem("transp");
  var transpobjt = [];
  transpobjt.push(carvalue + insValue + Fvalue + repairValue);
  localStorage.setItem("transp", JSON.stringify(transpobjt));
});



//-------Educatonal Expense slider #11, #12, #13 and #14-------
const supplies = document.getElementById("supplies");
const loans = document.getElementById("loans");
const college = document.getElementById("college");
const tution = document.getElementById("tution");
const E_sum = document.getElementById("Esum");
var suppliesValue = 0;
var Lvalue = 0;
var colgvalue = 0;
var tutionValue = 0;

supplies.addEventListener("input", (e) => {
  suppliesValue = +e.target.value;
  const label = e.target.nextElementSibling;
  const supplies_width = getComputedStyle(e.target).getPropertyValue("width");
  const label_width = getComputedStyle(label).getPropertyValue("width");
  const num_width = +supplies_width.substring(0, supplies_width.length - 2);
  const num_label_width = +label_width.substring(0, label_width.length - 2);
  const max = +e.target.max;
  const min = +e.target.min;
  const left = suppliesValue * (num_width / max) - num_label_width / 2 + scale(suppliesValue, min, max, 10, -10);

  label.style.left = `${left}px`;

  label.innerHTML = '$' + suppliesValue;
  E_sum.innerHTML = '$' + (suppliesValue + Lvalue + colgvalue + tutionValue);

  localStorage.getItem("edu");
  var eduobjt = [];
  eduobjt.push(suppliesValue + Lvalue + colgvalue + tutionValue);
  localStorage.setItem("edu", JSON.stringify(eduobjt));
});

loans.addEventListener("input", (e) => {
  Lvalue = +e.target.value;
  const label = e.target.nextElementSibling;
  const loans_width = getComputedStyle(e.target).getPropertyValue("width");
  const label_width = getComputedStyle(label).getPropertyValue("width");
  const num_width = +loans_width.substring(0, loans_width.length - 2);
  const num_label_width = +label_width.substring(0, label_width.length - 2);
  const max = +e.target.max;
  const min = +e.target.min;
  const left = Lvalue * (num_width / max) - num_label_width / 2 + scale(Lvalue, min, max, 10, -10);

  label.style.left = `${left}px`;

  label.innerHTML = '$' + Lvalue;
  E_sum.innerHTML = '$' + (suppliesValue + Lvalue + colgvalue + tutionValue);

  localStorage.getItem("edu");
  var eduobjt = [];
  eduobjt.push(suppliesValue + Lvalue + colgvalue + tutionValue);
  localStorage.setItem("edu", JSON.stringify(eduobjt));
});

college.addEventListener("input", (e) => {
  colgvalue = +e.target.value;
  const label = e.target.nextElementSibling;
  const colg_width = getComputedStyle(e.target).getPropertyValue("width");
  const label_width = getComputedStyle(label).getPropertyValue("width");
  const num_width = +colg_width.substring(0, colg_width.length - 2);
  const num_label_width = +label_width.substring(0, label_width.length - 2);
  const max = +e.target.max;
  const min = +e.target.min;
  const left = colgvalue * (num_width / max) - num_label_width / 2 + scale(colgvalue, min, max, 10, -10);

  label.style.left = `${left}px`;

  label.innerHTML = '$' + colgvalue;
  E_sum.innerHTML = '$' + (suppliesValue + Lvalue + colgvalue + tutionValue);

  localStorage.getItem("edu");
  var eduobjt = [];
  eduobjt.push(suppliesValue + Lvalue + colgvalue + tutionValue);
  localStorage.setItem("edu", JSON.stringify(eduobjt));
});

tution.addEventListener("input", (e) => {
  tutionValue = +e.target.value;
  const label = e.target.nextElementSibling;
  const tu_width = getComputedStyle(e.target).getPropertyValue("width");
  const label_width = getComputedStyle(label).getPropertyValue("width");
  const num_width = +tu_width.substring(0, tu_width.length - 2);
  const num_label_width = +label_width.substring(0, label_width.length - 2);
  const max = +e.target.max;
  const min = +e.target.min;
  const left = tutionValue * (num_width / max) - num_label_width / 2 + scale(tutionValue, min, max, 10, -10);

  label.style.left = `${left}px`;

  label.innerHTML = '$' + tutionValue;
  E_sum.innerHTML = '$' + (suppliesValue + Lvalue + colgvalue + tutionValue);

  localStorage.getItem("edu");
  var eduobjt = [];
  eduobjt.push(suppliesValue + Lvalue + colgvalue + tutionValue);
  localStorage.setItem("edu", JSON.stringify(eduobjt));
});



//-------Personal Expense slider #15, #16, #17, #18, #19 and #20-------
const gro = document.getElementById("gro");
const clo = document.getElementById("clo");
const ent = document.getElementById("ent");
const med = document.getElementById("med");
const snack = document.getElementById("snack");
const oExp = document.getElementById("oExp");
const P_sum = document.getElementById("Psum");
var groValue = 0;
var cloValue = 0;
var entValue = 0;
var medValue = 0;
var snackValue = 0;
var expValue = 0;

gro.addEventListener("input", (e) => {
  groValue = +e.target.value;
  const label = e.target.nextElementSibling;
  const gro_width = getComputedStyle(e.target).getPropertyValue("width");
  const label_width = getComputedStyle(label).getPropertyValue("width");
  const num_width = +gro_width.substring(0, gro_width.length - 2);
  const num_label_width = +label_width.substring(0, label_width.length - 2);
  const max = +e.target.max;
  const min = +e.target.min;
  const left = groValue * (num_width / max) - num_label_width / 2 + scale(groValue, min, max, 10, -10);

  label.style.left = `${left}px`;

  label.innerHTML = '$' + groValue;
  P_sum.innerHTML = '$' + (groValue + cloValue + entValue + medValue + snackValue + expValue);

  localStorage.getItem("pers");
  var persobjt = [];
  persobjt.push(groValue + cloValue + entValue + medValue + snackValue + expValue);
  localStorage.setItem("pers", JSON.stringify(persobjt));
});

clo.addEventListener("input", (e) => {
  cloValue = +e.target.value;
  const label = e.target.nextElementSibling;
  const clo_width = getComputedStyle(e.target).getPropertyValue("width");
  const label_width = getComputedStyle(label).getPropertyValue("width");
  const num_width = +clo_width.substring(0, clo_width.length - 2);
  const num_label_width = +label_width.substring(0, label_width.length - 2);
  const max = +e.target.max;
  const min = +e.target.min;
  const left = cloValue * (num_width / max) - num_label_width / 2 + scale(cloValue, min, max, 10, -10);

  label.style.left = `${left}px`;

  label.innerHTML = '$' + cloValue;
  P_sum.innerHTML = '$' + (groValue + cloValue + entValue + medValue + snackValue + expValue);

  localStorage.getItem("pers");
  var persobjt = [];
  persobjt.push(groValue + cloValue + entValue + medValue + snackValue + expValue);
  localStorage.setItem("pers", JSON.stringify(persobjt));
});

ent.addEventListener("input", (e) => {
  entValue = +e.target.value;
  const label = e.target.nextElementSibling;
  const ent_width = getComputedStyle(e.target).getPropertyValue("width");
  const label_width = getComputedStyle(label).getPropertyValue("width");
  const num_width = +ent_width.substring(0, ent_width.length - 2);
  const num_label_width = +label_width.substring(0, label_width.length - 2);
  const max = +e.target.max;
  const min = +e.target.min;
  const left = entValue * (num_width / max) - num_label_width / 2 + scale(entValue, min, max, 10, -10);

  label.style.left = `${left}px`;

  label.innerHTML = '$' + entValue;
  P_sum.innerHTML = '$' + (groValue + cloValue + entValue + medValue + snackValue + expValue);

  localStorage.getItem("pers");
  var persobjt = [];
  persobjt.push(groValue + cloValue + entValue + medValue + snackValue + expValue);
  localStorage.setItem("pers", JSON.stringify(persobjt));
});

med.addEventListener("input", (e) => {
  medValue = +e.target.value;
  const label = e.target.nextElementSibling;
  const med_width = getComputedStyle(e.target).getPropertyValue("width");
  const label_width = getComputedStyle(label).getPropertyValue("width");
  const num_width = +med_width.substring(0, med_width.length - 2);
  const num_label_width = +label_width.substring(0, label_width.length - 2);
  const max = +e.target.max;
  const min = +e.target.min;
  const left = medValue * (num_width / max) - num_label_width / 2 + scale(medValue, min, max, 10, -10);

  label.style.left = `${left}px`;

  label.innerHTML = '$' + medValue;
  P_sum.innerHTML = '$' + (groValue + cloValue + entValue + medValue + snackValue + expValue);

  localStorage.getItem("pers");
  var persobjt = [];
  persobjt.push(groValue + cloValue + entValue + medValue + snackValue + expValue);
  localStorage.setItem("pers", JSON.stringify(persobjt));
});

snack.addEventListener("input", (e) => {
  snackValue = +e.target.value;
  const label = e.target.nextElementSibling;
  const sn_width = getComputedStyle(e.target).getPropertyValue("width");
  const label_width = getComputedStyle(label).getPropertyValue("width");
  const num_width = +sn_width.substring(0, sn_width.length - 2);
  const num_label_width = +label_width.substring(0, label_width.length - 2);
  const max = +e.target.max;
  const min = +e.target.min;
  const left = snackValue * (num_width / max) - num_label_width / 2 + scale(snackValue, min, max, 10, -10);

  label.style.left = `${left}px`;

  label.innerHTML = '$' + snackValue;
  P_sum.innerHTML = '$' + (groValue + cloValue + entValue + medValue + snackValue + expValue);

  localStorage.getItem("pers");
  var persobjt = [];
  persobjt.push(groValue + cloValue + entValue + medValue + snackValue + expValue );
  localStorage.setItem("pers", JSON.stringify(persobjt));
});

oExp.addEventListener("input", (e) => {
  expValue = +e.target.value;
  const label = e.target.nextElementSibling;
  const exp_width = getComputedStyle(e.target).getPropertyValue("width");
  const label_width = getComputedStyle(label).getPropertyValue("width");
  const num_width = +exp_width.substring(0, exp_width.length - 2);
  const num_label_width = +label_width.substring(0, label_width.length - 2);
  const max = +e.target.max;
  const min = +e.target.min;
  const left = expValue * (num_width / max) - num_label_width / 2 + scale(expValue, min, max, 10, -10);

  label.style.left = `${left}px`;

  label.innerHTML = '$' + expValue;
  P_sum.innerHTML = '$' + (groValue + cloValue + entValue + medValue + snackValue + expValue);

  localStorage.getItem("pers");
  var persobjt = [];
  persobjt.push(groValue + cloValue + entValue + medValue + snackValue + expValue);
  localStorage.setItem("pers", JSON.stringify(persobjt));
});


//-------Monthly Saving  slider #21, and #22-------
const fund = document.getElementById("fund");
const saveFund = document.getElementById("saveFund");
const S_sum = document.getElementById("Ssum");
var fundValue = 0;
var saveValue = 0;


fund.addEventListener("input", (e) => {
  fundValue = +e.target.value;
  const label = e.target.nextElementSibling;
  const fund_width = getComputedStyle(e.target).getPropertyValue("width");
  const label_width = getComputedStyle(label).getPropertyValue("width");
  const num_width = +fund_width.substring(0, fund_width.length - 2);
  const num_label_width = +label_width.substring(0, label_width.length - 2);
  const max = +e.target.max;
  const min = +e.target.min;
  const left = fundValue * (num_width / max) - num_label_width / 2 + scale(fundValue, min, max, 10, -10);

  label.style.left = `${left}px`;

  label.innerHTML = '$' + fundValue;
  S_sum.innerHTML = '$' + (fundValue + saveValue);

  localStorage.getItem("sav");
  var savobjt = [];
  savobjt.push(fundValue + saveValue);
  localStorage.setItem("sav", JSON.stringify(savobjt));
});

saveFund.addEventListener("input", (e) => {
  saveValue = +e.target.value;
  const label = e.target.nextElementSibling;
  const save_width = getComputedStyle(e.target).getPropertyValue("width");
  const label_width = getComputedStyle(label).getPropertyValue("width");
  const num_width = +save_width.substring(0, save_width.length - 2);
  const num_label_width = +label_width.substring(0, label_width.length - 2);
  const max = +e.target.max;
  const min = +e.target.min;
  const left = saveValue * (num_width / max) - num_label_width / 2 + scale(saveValue, min, max, 10, -10);

  label.style.left = `${left}px`;

  label.innerHTML = '$' + saveValue;
  S_sum.innerHTML = '$' + (fundValue + saveValue);

  localStorage.getItem("sav");
  var savobjt = [];
  savobjt.push(fundValue + saveValue);
  localStorage.setItem("sav", JSON.stringify(savobjt));
});

// https://stackoverflow.com/questions/10756313/javascript-jquery-map-a-range-of-numbers-to-another-range-of-numbers
const scale = (num, in_min, in_max, out_min, out_max) => {
  return ((num - in_min) * (out_max - out_min)) / (in_max - in_min) + out_min;
};


//------------------------------------------------------------------------------------

//Enable Get Your Results button
var calcAgain = document.getElementById("calc_again");
var active2 = document.querySelector(".showResult");
var Digit = document.querySelector(".finalDigit");
var minusSaving = document.querySelector(".minusSaving");
var attention = document.querySelector(".modal-body");
var ME_sum = 0;
let currentsum = 0;
active2.addEventListener("click", () => {
  if (active == 4) {
    active2.style.display = "none";
    Digit.style.display = "block";
    calcAgain.style.display = "block";

    calcAgain.addEventListener('click', ()=> {
      location.reload(true);
    })

    $('#myModal').modal('hide');


    currentsum = [(Ivalue + Ovalue) - (mvalue + Rvalue + Cvalue + Gvalue + carvalue + insValue + Fvalue + repairValue + suppliesValue + Lvalue + colgvalue + tutionValue + groValue + cloValue + entValue + medValue + snackValue + expValue + fundValue + saveValue
      )];
     
    if (currentsum != 0) {
      if(currentsum < 0){
        Digit.innerHTML = 'Total Expense: ' + '$' + currentsum;
        minusSaving.style.display = "block";
        minusSaving.style.color = "#410202";
        minusSaving.innerHTML = 'Your expenses are over-budget!' 
      }
      if(currentsum > 0){
        Digit.innerHTML = 'Total Expense: ' + '$' + currentsum;
        minusSaving.style.display = "block";
        minusSaving.style.color = "#002e24";
        minusSaving.innerHTML = 'Congratulations! Your expenses lies under the budget!' ;
      }
      // Digit.innerHTML = 'Total Expense: ' + '$' + currentsum;

      var sumobjt = [];
      sumobjt.push([(Ivalue + Ovalue) - (mvalue + Rvalue + Cvalue + Gvalue + carvalue + insValue + Fvalue + repairValue + suppliesValue + Lvalue + colgvalue + tutionValue + groValue + cloValue + entValue + medValue + snackValue + expValue + fundValue + saveValue
      )]);
      localStorage.setItem("sum", JSON.stringify(sumobjt));

    }
    else {
      Digit.innerHTML = '$0';
    }

  }
  else {
    $('#myModal').modal('show');
    attention.innerHTML = 'Complete the tracker please.';

  }
});


//saving the result
var beforeSave = document.getElementById("beforesave");
var afterSave = document.getElementById("aftersave");
var calcAgain = document.getElementById("calc_again");
var SN = document.getElementById("noteSection");
var Nbackground = document.getElementById("notesBackground");
var attention = document.querySelector(".modal-body");

beforeSave.addEventListener('click', (e) => {
  e.preventDefault();
  if (active == 4 && Digit.style.display == "block") {
    beforeSave.style.display = "none";
    afterSave.style.display = "block";
    calcAgain.style.display = "block";

    calcAgain.addEventListener('click', ()=> {
      location.reload(true);
    })

    let Allrecord = localStorage.getItem('records');
    let objOfRecord; //object which stores all records



    var dateShow = new Date();
//storing all records 
    if (Allrecord == null) {
      objOfRecord = [];
  }
  else {                                //We might have multiple records 
      objOfRecord = JSON.parse(Allrecord);   //By using JSON we convert it into Object
      
  }
  if(currentsum != 0){
    let obj;

    if(currentsum < 0){
        //current object
      obj = {  
        income: (Ivalue + Ovalue),
        housing: (mvalue + Rvalue + Cvalue + Gvalue),
        transport: (carvalue + insValue + Fvalue + repairValue),
        education: (suppliesValue + Lvalue + colgvalue + tutionValue),
        personal: (groValue + cloValue + entValue + medValue + snackValue + expValue),
        saving: (fundValue + saveValue),
        sum: (Ivalue + Ovalue) - (mvalue + Rvalue + Cvalue + Gvalue + carvalue + insValue + Fvalue + repairValue + suppliesValue + Lvalue + colgvalue + tutionValue + groValue + cloValue + entValue + medValue + snackValue + expValue + fundValue + saveValue),
        budgetMsg: "Your expenses of the month were over-budget!",
        currentdate:  dateShow.getFullYear()+'-'+(dateShow.getMonth()+1)+'-'+dateShow.getDate()
      }
      
    }

    if(currentsum > 0){
      //current object
      obj = {  
        income: (Ivalue + Ovalue),
        housing: (mvalue + Rvalue + Cvalue + Gvalue),
        transport: (carvalue + insValue + Fvalue + repairValue),
        education: (suppliesValue + Lvalue + colgvalue + tutionValue),
        personal: (groValue + cloValue + entValue + medValue + snackValue + expValue),
        saving: (fundValue + saveValue),
        sum: (Ivalue + Ovalue) - (mvalue + Rvalue + Cvalue + Gvalue + carvalue + insValue + Fvalue + repairValue + suppliesValue + Lvalue + colgvalue + tutionValue + groValue + cloValue + entValue + medValue + snackValue + expValue + fundValue + saveValue),
        budgetMsg: "Your expenses of the month were under the budget!",
        currentdate:  dateShow.getFullYear()+'-'+(dateShow.getMonth()+1)+'-'+dateShow.getDate()
      }
    }
      


   objOfRecord.push(obj);
   localStorage.setItem('records', JSON.stringify(objOfRecord));
   display();
    }
    else{
      $('#myModal').modal('show');
      attention.innerHTML = 'Enter the values please.';
      beforeSave.style.display = "block";
      afterSave.style.display = "none";
    }
  }
  else{
    $('#myModal').modal('show');
    attention.innerHTML = 'Click "Get Your Results" button.';
  }

  
  });

  
  function display()
  {
    //notes background
    Nbackground.style.display = "block";

    let record = localStorage.getItem('records');
    let objOfRecord;

    if (record == null) {
      objOfRecord = [];
      $('#myModal').modal('show');
      attention.innerHTML = 'Enter the values please.';
  }
  else {                               
      objOfRecord = JSON.parse(record);   
  }

  // save records
  var note = '';

   objOfRecord.forEach((call)=> {
    note += `
    <div class="col-md-4 noteCenter">
     <div id="savednotes" class="notebox bounce-3 center">
    <div class="card" style="width: 18rem;">
    <p class="MEresult" style="color: black;">${call.currentdate}</p>
    <h1 class="result_heading" style="color: black;">Your Results:</h1>
                      
    <div class="resultIncome"> 
        <p><b>Monthly income: </b></p>
        <b><p id="MIresult">${call.income}</p></b>
    </div>

    
    <div class="bars ">
        <p class="subheading ">Housing</p>
        <p class="subanswer" id="rentsum">${call.housing}</p>                        
    </div>

    
    <div class="bars">
        <p class="subheading">Transportation</p>
        <p class="subanswer" id="Tsum">${call.transport}</p>                        
    </div>

    
    <div class="bars">
        <p class="subheading">Educational</p>
        <p class="subanswer" id="Esum">${call.education}</p>                        
    </div>

    
    <div class="bars">
        <p class="subheading">Personal</p>
        <p class="subanswer" id="Psum">${call.personal}</p>                        
    </div>

    
    <div class="bars">
        <p class="subheading">Savings</p>
        <p class="subanswer" id="Ssum">${call.saving}</p>                        
    </div>

    <div class="resultExpenses RE" style="display: block;"> 
        <p><b>Monthly Expenses: </b></p>
        <b><p id="MEresult">${call.sum}</p></b>
    </div>

    <div class="resultExpenses" style="display: block;"> 
        <p id="MEresult">${call.budgetMsg}</p>
    </div>

   </div>
  </div>
  
</div>`

   })

   SN.innerHTML = note;
   
  }

  // display()
  let showRecord = document.getElementById("oldrecord");

  showRecord.addEventListener('click', ()=> {
    //notes background
    Nbackground.style.display = "block";
    display();
  })

  let clearRecord = document.getElementById("clearrecord");

  clearRecord.addEventListener('click', ()=> {
    localStorage.clear();
    Nbackground.style.display = "none";
    
  })



  // -------------------------------------------------------------------------------------
  //user name in the navbar
  var NavUserName = document.querySelector(".username");

  let yourName = localStorage.getItem("User Name");
  if(yourName == null){
    NavUserName.innerHTML = "";
  }
  else{
    NavUserName.innerHTML = '<i class="fa fa-user" aria-hidden="true"></i>' + "  " + yourName;
    NavUserName.style.color = "white";
  }