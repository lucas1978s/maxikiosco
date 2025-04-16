window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const codigo = urlParams.get("codigo");

  if (!codigo) {
    document.body.innerHTML = "<p>Código no proporcionado.</p>";
    return;
  }

  try {
    const response = await fetch(https://raw.githubusercontent.com/lucas1978s/maxikiosco/main/Articulo.xlsx");
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
  } catch (error) {
    console.error("Error al leer el archivo XLSX:", error);
    document.body.innerHTML = "<p>Error al cargar los datos.</p>";
  }
};

