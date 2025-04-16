window.onload = async function () {
  const urlParams = new URLSearchParams(window.location.search);
  const codigo = urlParams.get("codigo");

  if (!codigo) {
    document.body.innerHTML = "<p>Código no proporcionado.</p>";
    return;
  }

  try {
    const response = await fetch("https://www.dropbox.com/scl/fi/xoln3oqxce8fmcwl5im1n/Articulo.xlsx?rlkey=w1a7d77xn0rkknbn0q5urt5jt&st=fnfucdop&dl=1");
    if (!response.ok) {
      throw new Error('No se pudo cargar el archivo de Excel');
    }

    const data = await response.arrayBuffer();
    const workbook = XLSX.read(data, { type: "array" });
    const sheet = workbook.Sheets[workbook.SheetNames[0]];
    const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    // Depuración: Imprimir las filas para asegurarnos de que se están leyendo correctamente
    console.log(rows);

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
    console.error('Error al cargar o procesar el archivo Excel:', error);
    document.body.innerHTML = "<p>❌ Error al cargar los datos</p>";
  }
};
