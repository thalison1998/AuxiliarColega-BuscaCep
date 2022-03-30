const inputCep = document.querySelector("input");
const result = document.querySelector("ul");
const formSubmit = document.querySelector("form");

const url = "https://viacep.com.br/ws/";

const createElement = (props) => {
  const createTemplate = `
    <li>bairro: ${props.bairro} </li>
    <li>cep: ${props.cep} </li>
    <li>ddd: ${props.ddd}  </li>
    <li>localidade: ${props.localidade}  </li>
    <li>logradouro: ${props.logradouro}  </li>
   `;
  result.innerHTML = createTemplate;
};

const fetchCep = async (value) => {
  try {
    const response = await fetch(`${url}${value}/json/`);
    const json = await response.json();

    if (json.erro != true) {
      createElement(json);
    } else {
      throw new Error("CEP não encontrado");
    }
  } catch (err) {
    alert(err.message);
  }
};

const clear = () => (inputCep.value = "");

const checkInputCorrect = (inputValue) => {
  const validacep = /^[0-9]{8}$/;
  validacep.test(inputValue) === true
    ? fetchCep(inputValue)
    : alert("dados incorretos"),
    clear();
};

const handleSubmit = (e) => {
  e.preventDefault();
  const inputValue = inputCep.value;
  checkInputCorrect(inputValue);
};

formSubmit.addEventListener("submit", handleSubmit);
