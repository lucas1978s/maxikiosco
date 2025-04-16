window.onload = async function () {
    const urlParams = new URLSearchParams(window.location.search);
    const codigo = urlParams.get("codigo");
    if (!codigo) {
        document.body.innerHTML = "<p>Código no proporcionado.</p>";
        return;
    }
    try {
        console.log("Cargando archivo de Excel...");
        const response = await fetch("https://www.dropbox.com/scl/fi/xoln3oqxce8fmcwl5im1n/Articulo.xlsx?rlkey=w1a7d77xn0rkknbn0q5urt5jt&st=fnfucdop&dl=1");
        
        if (!response.ok) {
            throw new Error("No se pudo cargar el archivo Excel. Código de estado: " + response.status);
        }

        const data = await response.arrayBuffer();
        console.log("Archivo cargado correctamente.");

        const workbook = XLSX.read(data, { type: "array" });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const rows = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        let found = false;
        for (let i = 1; i < rows.length; i++) {
            if (rows[i][1] == codigo) { // Si el código de barras coincide
                const nombre = rows[i][2];
                const precio = rows[i][6];
                document.body.innerHTML = `<h1>${nombre}</h1><p>Precio: $${precio}</p>`;
                found = true;
                break;
            }
        }

        if (!found) {
            document.body.innerHTML = "<p>Producto no encontrado.</p>";
        }

    } catch (error) {
        console.error("Error al cargar los datos:", error);
        document.body.innerHTML = "<p>❌ Error al cargar los datos.</p>";
    }
};
