let paper = document.getElementById('paper');
let hash = "1eaef7acf32d12cb55ffe1acb47e469228330138";

let snowflake = new Snowflake(paper);
snowflake.setHexString(hash);
snowflake.generate();

let urlHash = window.location.hash;
if (/^#[0-9a-f]+$/.test(urlHash)) {
  snowflake.setHexString(urlHash.slice(1));
  snowflake.generate()
}
