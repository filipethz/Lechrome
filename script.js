// URL do backend (assumindo que o backend esteja rodando em localhost na porta 8080)
const apiUrl = 'http://localhost:8080';

// Função para enviar uma nova compra
document.getElementById('purchaseForm')?.addEventListener('submit', async (event) => {
    event.preventDefault();

    const purchaseData = {
        data: document.getElementById('data').value,
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

// Função para carregar as compras
async function loadPurchases() {
    try {
        const response = await fetch(`${apiUrl}/purchases`);
        const purchases = await response.json();
        
        const purchasesList = document.getElementById('purchasesList');
        purchasesList.innerHTML = ''; // Limpa a lista antes de renderizar novamente

        if (purchases.length === 0) {
            purchasesList.innerHTML = '<p>Nenhuma compra registrada ainda.</p>';
        }

        purchases.forEach((purchase) => {
            const purchaseElement = document.createElement('div');
            purchaseElement.classList.add('purchase-item');
            purchaseElement.innerHTML = `
                <p><strong>Cliente:</strong> ${purchase.cliente}</p>
                <p><strong>Dados:</strong> ${purchase.dados}</p>
                <p><strong>Produto:</strong> ${purchase.nome_produto}</p>
                <p><strong>Valor:</strong> ${purchase.valor}</p>
                <p><strong>Pagamento:</strong> ${purchase.pagamento}</p>
                <p><strong>Observação:</strong> ${purchase.obs}</p>
                <p><strong>Data:</strong> ${new Date(purchase.data).toLocaleDateString()}</p>
            `;
            purchasesList.appendChild(purchaseElement);
        });
    } catch (error) {
        console.error('Erro ao carregar compras', error);
    }
}

// Carregar as compras ao carregar a página de exibição (list.html)
if (document.getElementById('purchasesList')) {
    loadPurchases();
}
