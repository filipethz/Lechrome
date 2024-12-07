async function fetchPurchases() {
    try {
        const response = await fetch('https://lecback-production.up.railway.app/purchases'); // URL do backend
        if (!response.ok) {
            throw new Error('Erro ao carregar as compras');
        }
        const purchases = await response.json();
        console.log('Compras carregadas:', purchases); // Log detalhado
        displayPurchases(purchases);
    } catch (error) {
        alert(error.message);
        console.error('Erro ao carregar as compras:', error); // Log detalhado
    }
}



function displayPurchases(purchases) {
    const purchasesList = document.getElementById('purchasesList');
    purchasesList.innerHTML = '';

    purchases.forEach((purchase) => {
        const purchaseDiv = document.createElement('div');
        purchaseDiv.classList.add('purchase');

        // Formatar a data para exibição (caso seja necessário)
        const formattedDate = new Date(purchase.data).toLocaleDateString('pt-BR'); 

        purchaseDiv.innerHTML = `
            <p><strong>Data:</strong> ${formattedDate}</p>
            <p><strong>Cliente:</strong> ${purchase.cliente}</p>
            <p><strong>Dados:</strong> ${purchase.dados}</p>
            <p><strong>Produto:</strong> ${purchase.nome_produto}</p>
            <p><strong>Valor:</strong> ${purchase.valor}</p>
            <p><strong>Método de Pagamento:</strong> ${purchase.pagamento}</p>
            <p><strong>Observação:</strong> ${purchase.obs}</p>
            <hr>
        `;

        purchasesList.appendChild(purchaseDiv);
    });
}

function editPurchase(id) {
    // Mostrar o formulário de edição
    document.getElementById('editFormContainer').style.display = 'block';

    // Preencher o formulário com os dados da compra (obter os dados do backend)
    fetch(`http://localhost:8080/purchase/${id}`)
        .then(response => response.json())
        .then(purchase => {
            document.getElementById('editData').value = purchase.data;
            document.getElementById('editCliente').value = purchase.cliente;
            document.getElementById('editDados').value = purchase.dados;
            document.getElementById('editNomeProduto').value = purchase.nome_produto;
            document.getElementById('editValor').value = purchase.valor;
            document.getElementById('editPagamento').value = purchase.pagamento;
            document.getElementById('editObs').value = purchase.obs;

            // Adicionar evento de envio para salvar a edição
            document.getElementById('editForm').onsubmit = async function (event) {
                event.preventDefault();

                const updatedPurchase = {
                    data: document.getElementById('editData').value,
                    cliente: document.getElementById('editCliente').value,
                    dados: document.getElementById('editDados').value,
                    nome_produto: document.getElementById('editNomeProduto').value,
                    valor: document.getElementById('editValor').value,
                    pagamento: document.getElementById('editPagamento').value,
                    obs: document.getElementById('editObs').value,
                };

                const response = await fetch(`https://lecback-production.up.railway.app/purchase/${id}`, { // URL do backend
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(updatedPurchase)
                });

                if (response.ok) {
                    alert('Compra atualizada com sucesso!');
                    fetchPurchases();
                    document.getElementById('editFormContainer').style.display = 'none'; // Ocultar formulário
                } else {
                    alert('Erro ao atualizar compra.');
                }
            };

            // Cancelar a edição
            document.getElementById('cancelEditBtn').onclick = function () {
                document.getElementById('editFormContainer').style.display = 'none'; // Ocultar formulário
            };
        });
}

async function deletePurchase(id) {
    const response = await fetch(`https://lecback-production.up.railway.app/purchase/${id}`, { // URL do backend
        method: 'DELETE'
    });

    if (response.ok) {
        alert('Compra removida com sucesso!');
        fetchPurchases();
    } else {
        alert('Erro ao remover compra.');
    }
}

fetchPurchases();
