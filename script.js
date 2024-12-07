// URL do backend (assumindo que o backend esteja rodando em localhost na porta 8080)
const apiUrl = 'https://lecback-production.up.railway.app';

// Função para enviar uma nova compra
document.getElementById('purchaseForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Pegando os dados do formulário
    const purchaseData = {
        data: document.getElementById('data').value.split("T")[0],  // Pegando apenas a data (sem a hora)
        cliente: document.getElementById('cliente').value,
        dados: document.getElementById('dados').value,
        nome_produto: document.getElementById('nome_produto').value,
        valor: document.getElementById('valor').value,
        pagamento: document.getElementById('pagamento').value,
        obs: document.getElementById('obs').value,
    };

    try {
        // Enviar dados para o backend
        const response = await fetch(`${apiUrl}/purchase`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(purchaseData),
        });

        if (response.ok) {
            alert('Compra cadastrada com sucesso!');
            window.location.href = 'list.html'; // Redireciona para a página de exibição de compras
        } else {
            alert('Erro ao cadastrar a compra.');
        }
    } catch (error) {
        console.error('Erro ao enviar dados para o backend', error);
        alert('Erro de comunicação com o servidor.');
    }
});
