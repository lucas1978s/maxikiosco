window.onload = async function () {
  // Obtener el código de barras desde la URL
  const urlParams = new URLSearchParams(window.location.search);
  const codigo = urlParams.get("codigo");

  if (!codigo) {
    document.body.innerHTML = "<p>Código no proporcionado.</p>";
    return;
  }

  try {
    // Obtener el archivo XLSX desde Dropbox con descarga directa
    const response = await fetch("https://www.dropbox.com/scl/fi/xoln3oqxce8fmcwl5im1n/Articulo.xlsx?rlkey=w1a7d77xn0rkknbn0q5urt5jt&st=fnfucdop&dl=1");
    
    if (!response.ok) {
      throw new Error("Error al obtener el archivo.");
    }

    const data = await response.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Buscar el producto que coincide con el código de barras
    let found = false;
    for (let i = 1; i < rows.length; i++) {
      if (rows[i][1] == codigo) {
        const nombre = rows[i][2]; // Columna C
        const precio = rows[i][6]; // Columna G
        document.body.innerHTML = `<h1>${nombre}</h1><p>Precio: $${precio}</p>`;
        found = true;
        break;
      }
    }

    if (!found) {
      document.body.innerHTML = "<p>Producto no encontrado.</p>";
    }
  } catch (error) {
    // Manejo de errores en la carga del archivo o problemas de red
    document.body.innerHTML = `<p>Error: ${error.message}</p>`;
    console.error("Error:", error);
  }
};
