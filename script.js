
fetch('data.json')
.then(res => res.json())
.then(data => {
    const tbody = document.querySelector("tbody");
    const input = document.getElementById("search");

    const render = (f = "") => {
        tbody.innerHTML = "";
        data.filter(d =>
            d.nombre.toLowerCase().includes(f.toLowerCase()) ||
            d.entidad.toLowerCase().includes(f.toLowerCase())
        ).forEach(d => {
            tbody.innerHTML += `<tr>
                <td>${d.nombre}</td>
                <td>${d.entidad}</td>
                <td>${d.proposito}</td>
                <td>${d.tipo}</td>
                <td>${d.riesgo}</td>
            </tr>`;
        });
    };

    render();
    input.addEventListener("input", () => render(input.value));

    const sectores = {}, tipos = {};
    data.forEach(d => {
        sectores[d.sector] = (sectores[d.sector] || 0) + 1;
        tipos[d.datos] = (tipos[d.datos] || 0) + 1;
    });

    new Chart(document.getElementById("sectorChart"), {
        type: 'bar',
        data: {
            labels: Object.keys(sectores),
            datasets: [{
                label: 'Por sector',
                data: Object.values(sectores),
                backgroundColor: '#007896'
            }]
        }
    });

    new Chart(document.getElementById("tipoDatoChart"), {
        type: 'pie',
        data: {
            labels: Object.keys(tipos),
            datasets: [{
                label: 'Tipo de datos',
                data: Object.values(tipos),
                backgroundColor: ['#004b64','#007896','#00acc1']
            }]
        }
    });
});
