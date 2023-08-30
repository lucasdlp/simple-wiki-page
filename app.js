const form = document.querySelector("form");
const results = document.querySelector(".results");
const loader = document.querySelector(".loader");

let infos = [];
const input = document.querySelector("input[type='search']");
let query;

input.addEventListener("input", (e) => {
  query = e.target.value;
});

const fetchInfos = async () => {
  await fetch(
    `https://fr.wikipedia.org/w/api.php?action=query&list=search&format=json&origin=*&srlimit=20&srsearch=${query}`
  )
    .then((res) => res.json())
    .then((res) => (infos = res.query.search));
  console.log(infos);
};

const displayInfos = () => {
  infos.map((info) => {
    console.log(info);
    return (results.innerHTML += `
    <div class="result-item">
      <h3>
        <a href='https://en.wikipedia.org/wiki?curid=${info.pageid}' 
        target='_blank'>${info.title}
        </a>
      </h3>
      <a class="link" href='https://en.wikipedia.org/wiki?curid=${info.pageid}' 
      target='_blank'>https://en.wikipedia.org/wiki?curid=${info.pageid}</a>
      <br />
      ${info.snippet}
    </div>
    `);
  });
};

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  loader.style.display = "block";
  await fetchInfos();
  loader.style.display = "none";
  results.innerHTML = "";
  displayInfos();
});
