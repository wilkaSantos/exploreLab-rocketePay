import "./css/index.css"
import IMask from "imask";

const firstCardColor = document.querySelector('.firstCardColor');
const secondCardColor = document.querySelector('.secondCardColor');
const cardLogo = document.querySelector('#cardLogo');


function setCardType(type){
  const colors = {
    visa: ["#436D99", "#2D57F2"],
    mastercard: ["#DF6F29", "#C69347"],
    cielo: ["#353535", "#01AEF0"],
    default: ["#000000", "#8d99ae"],
  }

  firstCardColor.setAttribute("fill", colors[type][0]);
  secondCardColor.setAttribute("fill", colors[type][1]);
  cardLogo.setAttribute("src", `cc-${type}.svg`);
}
//setCardType("cielo");

//cvc
const securityCode = document.querySelector("#security-code");
const securityCodePattern = { mask: "0000" };
const securityCodeMasked = IMask(securityCode, securityCodePattern);

//data validade
const expirationDate = document.querySelector("#expiration-date");
const expirationDatePattern = {
  mask: "MM{/}YY",
  blocks: {
    MM: {
      mask: IMask.MaskedRange,
      from: 1,
      to: 12
    },
    YY: {
      mask: IMask.MaskedRange,
      from: String(new Date().getFullYear()).slice(2),
      to: String(new Date().getFullYear() + 10).slice(2)
    }
  }
}

  const expirationDatePatternMasKed = IMask(
    expirationDate,
    expirationDatePattern
  )

  // numero cartao
  const cardNumber = document.querySelector("#card-number");
  const cardNumberPattern = {
    mask: [
      {
        mask: "0000 0000 0000 0000",
        regex: /^4\d{0,15}/,
        cardType: "visa"
      },
      {
        mask: "0000 0000 0000 0000",
        regex: /(^5[1-5]\d{0,2}|^22[2-9]\d|^2[3-7]\d{0,2})\d{0,12}/,
        cardType: "mastercard"
      },
      {
        mask: "0000 0000 0000 0000",
        cardType: "default"
      }
    ],
    dispatch: function(appended, dynamicMasked){
      let number = (dynamicMasked.value + appended).replace(/\D/g, "");
      const foundMask = dynamicMasked.compiledMasks.find(function(item){
        return number.match(item.regex);
      });
      return foundMask;
    }
  }

  const cardNumberPatternMasKed = IMask(cardNumber, cardNumberPattern);

document.querySelector("form").addEventListener('submit', (event)=>{
  event.preventDefault();
});

  // butao
  const addCardButton = document.querySelector(".addCard");
  addCardButton.addEventListener('click', ()=>{

  });

//CAMPO NOME NO CARTÃO
  const cardHolder = document.querySelector("#card-holder");
  cardHolder.addEventListener('input', () => {
    const ccHolder = document.querySelector(".cc-holder .value");
    ccHolder.innerText = cardHolder.value.length === 0 ? "SEU NOME COMPLETO" : cardHolder.value;
  });

//CAMPO CVC CARTÃO
securityCodeMasked.on("accept", () => {
  updateSecurityCode(securityCodeMasked.value);
});

function updateSecurityCode(code){
  const ccSecurity = document.querySelector(".cc-security .value");
  ccSecurity.innerText = code.length === 0 ? "123" : code;
}

//CAMPO NÚMERO CARTÃO 
cardNumberPatternMasKed.on("accept", () => {
  const cardType = cardNumberPatternMasKed.masked.currentMask.cardType;
  setCardType(cardType);
  updateCardNumber(cardNumberPatternMasKed.value);
});

function updateCardNumber(number){
  const ccNumber = document.querySelector(".cc-number");
  ccNumber.innerText = number.length === 0 ? "1234 5678 9012 3456" : number;
}

// CAMPO DATA NO CARTÃO
expirationDatePatternMasKed.on("accept", ()=>{
  updateExpirationDate(expirationDatePatternMasKed.value);
});

function updateExpirationDate(date){
  const ccExpiration = document.querySelector(".cc-expiration .value");
  ccExpiration.innerText = date.length === 0 ? "02/32" : date;
}