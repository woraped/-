const form = document.getElementById("compound-form");
const totalAmountEl = document.getElementById("total-amount");
const interestEarnedEl = document.getElementById("interest-earned");
const perPersonEl = document.getElementById("per-person");
const explanationEl = document.getElementById("explanation");

const formatTHB = (value) =>
  new Intl.NumberFormat("th-TH", {
    style: "currency",
    currency: "THB",
    maximumFractionDigits: 2,
  }).format(value);

const calculateCompound = ({ principal, annualRatePercent, years, compoundsPerYear }) => {
  const rateDecimal = annualRatePercent / 100;
  const total = principal * (1 + rateDecimal / compoundsPerYear) ** (compoundsPerYear * years);
  const interest = total - principal;
  const perPerson = total;

  return { total, interest, perPerson };
};

const renderResult = (result, input) => {
  totalAmountEl.textContent = formatTHB(result.total);
  interestEarnedEl.textContent = formatTHB(result.interest);
  perPersonEl.textContent = formatTHB(result.perPerson);

  explanationEl.textContent = `จากเงินต้น ${formatTHB(input.principal)} ที่ดอกเบี้ย ${input.annualRatePercent.toFixed(
    2,
  )}% ต่อปี ระยะเวลา ${input.years} ปี (ทบต้น ${input.compoundsPerYear} ครั้ง/ปี) จะได้ยอดรวม ${formatTHB(
    result.total,
  )} และเมื่อหาร 4 คน จะได้คนละประมาณ ${formatTHB(result.perPerson)}`;
};

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const principal = Number(document.getElementById("principal").value);
  const annualRatePercent = Number(document.getElementById("annual-rate").value);
  const years = Number(document.getElementById("years").value);
  const compoundsPerYear = Number(document.getElementById("compound-frequency").value);

  if (
    [principal, annualRatePercent, years, compoundsPerYear].some(
      (value) => Number.isNaN(value) || value < 0,
    ) ||
    compoundsPerYear === 0
  ) {
    explanationEl.textContent = "กรุณากรอกตัวเลขให้ถูกต้องและเป็นค่าที่ไม่ติดลบ";
    return;
  }

  const result = calculateCompound({ principal, annualRatePercent, years, compoundsPerYear });
  renderResult(result, { principal, annualRatePercent, years, compoundsPerYear });
});

form.requestSubmit();
