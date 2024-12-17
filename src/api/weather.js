export async function get(signal) {
  const res = await fetch("src/api/data-set.json", { signal });
  return res.json();
}
