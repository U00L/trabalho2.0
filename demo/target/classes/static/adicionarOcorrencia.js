let ocorrencias = [];

function adicionarOcorrencia() {
    const descricao = document.getElementById('descricao').value;
    const tipoOcorrencia = document.getElementById('tipoOcorrencia').value;
    const endereco = document.getElementById('localizacao').value;

    // Faz a chamada para geocodificar o endereço usando Geocode.xyz
    geocodeEndereco(endereco)
        .then(data => {
            // Verifica se a geocodificação foi bem-sucedida
            if (data && data.longt && data.latt) {
                const latitude = data.latt;
                const longitude = data.longt;

                const ocorrencia = {
                    descricao: descricao,
                    tipoOcorrencia: tipoOcorrencia,
                    localizacao: endereco,
                    latitude: latitude,
                    longitude: longitude,
                    status: 'Aberta'
                };

                ocorrencias.push(ocorrencia);
                listarOcorrencias();
                limparFormulario();
            } else {
                alert('Não foi possível geocodificar o endereço. Verifique os dados informados.');
            }
        })
        .catch(error => {
            console.error('Erro ao geocodificar o endereço:', error);
            alert('Ocorreu um erro ao tentar geocodificar o endereço.');
        });
}

// Função para fazer a requisição de geocodificação para Geocode.xyz
async function geocodeEndereco(endereco) {
    const endpoint = `https://geocode.xyz/${encodeURIComponent(endereco)}?json=1`;
    try {
        const response = await fetch(endpoint);
        if (!response.ok) {
            throw new Error('Erro ao fazer a requisição de geocodificação.');
        }
        const data = await response.json();
        return {
            longt: data.longt,
            latt: data.latt
        };
    } catch (error) {
        console.error('Erro ao geocodificar o endereço:', error);
        return null;
    }
}

function listarOcorrencias() {
    const tabela = document.getElementById('tabelaOcorrencias').getElementsByTagName('tbody')[0];
    tabela.innerHTML = '';

    ocorrencias.forEach((ocorrencia, index) => {
        const row = tabela.insertRow();
        row.insertCell(0).innerText = ocorrencia.descricao;
        row.insertCell(1).innerText = ocorrencia.tipoOcorrencia;
        row.insertCell(2).innerText = ocorrencia.localizacao;
        row.insertCell(3).innerText = ocorrencia.status;
        const acoesCell = row.insertCell(4);
        acoesCell.innerHTML = `<button onclick="editarOcorrencia(${index})">Editar</button> 
                                    <button onclick="fecharOcorrencia(${index})">Fechar</button>`;
    });

    // Mostra a tela de listagem após listar as ocorrências
    mostrarListagem();
}

function editarOcorrencia(index) {
    const descricao = prompt("Atualize a descrição:", ocorrencias[index].descricao);
    const tipoOcorrencia = prompt("Atualize o tipo de ocorrência:", ocorrencias[index].tipoOcorrencia);
    const localizacao = prompt("Atualize a localização:", ocorrencias[index].localizacao);

    if (descricao !== null) ocorrencias[index].descricao = descricao;
    if (tipoOcorrencia !== null) ocorrencias[index].tipoOcorrencia = tipoOcorrencia;
    if (localizacao !== null) ocorrencias[index].localizacao = localizacao;

    listarOcorrencias();
}

function fecharOcorrencia(index) {
    ocorrencias[index].status = 'Fechada';
    listarOcorrencias();
}

function filtrarOcorrencias() {
    const tipo = document.getElementById('filtroTipo').value;
    const localizacao = document.getElementById('filtroLocalizacao').value.toLowerCase();

    const tabela = document.getElementById('tabelaOcorrencias').getElementsByTagName('tbody')[0];
    tabela.innerHTML = '';

    ocorrencias.forEach((ocorrencia, index) => {
        if ((tipo === '' || ocorrencia.tipoOcorrencia === tipo) &&
            (localizacao === '' || ocorrencia.localizacao.toLowerCase().includes(localizacao))) {
            const row = tabela.insertRow();
            row.insertCell(0).innerText = ocorrencia.descricao;
            row.insertCell(1).innerText = ocorrencia.tipoOcorrencia;
            row.insertCell(2).innerText = ocorrencia.localizacao;
            row.insertCell(3).innerText = ocorrencia.status;
            const acoesCell = row.insertCell(4);
            acoesCell.innerHTML = `<button onclick="editarOcorrencia(${index})">Editar</button> 
                                    <button onclick="fecharOcorrencia(${index})">Fechar</button>`;
        }
    });
}

function limparFormulario() {
    document.getElementById('descricao').value = '';
    document.getElementById('tipoOcorrencia').value = 'Incidente';
    document.getElementById('localizacao').value = '';
}

function mostrarListagem() {
    document.querySelector('.form-container').classList.remove('active');
    document.querySelector('.list-container').classList.add('active');
}

function mostrarRegistro() {
    document.querySelector('.list-container').classList.remove('active');
    document.querySelector('.form-container').classList.add('active');
}
