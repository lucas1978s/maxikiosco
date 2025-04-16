// Este script se encargará de leer el archivo xlsx y mostrar los datos según el código de barras de la URL
window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const codigo = urlParams.get("codigo");

  if (!codigo) {
    document.body.innerHTML = "<p>Código no proporcionado.</p>";
    return;
  }

  const response = await fetch("https://www.dropbox.com/scl/fi/xoln3oqxce8fmcwl5im1n/Articulo.xlsx?rlkey=w1a7d77xn0rkknbn0q5urt5jt&st=fnfucdop&dl=1.xlsx");
  const data = await response.arrayBuffer();
  const workbook = XLSX.read(data, { type: "array" });
  const sheet = workbook.Sheets[workbook.SheetNames[0]];
  const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

  for (let i = 1; i < rows.length; i++) {
    if (rows[i][1] == codigo) {
      const nombre = rows[i][2];
      const precio = rows[i][6];
      document.body.innerHTML = `<h1>${nombre}</h1><p>Precio: $${precio}</p>`;
      return;
    }
  }

  document.body.innerHTML = "<p>Producto no encontrado.</p>";
};
