async function createProduct() {
    const name = document.getElementById("name").value;
    const manufacturer = document.getElementById("manufacturer").value;
    const amount = document.getElementById("amount").value;
    const quantity = document.getElementById("quantity").value;
     const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
     const tx = await contract.methods.createProduct(name, manufacturer, amount, quantity).send({ from: accounts[0] });
    console.log(tx);
  }




   async function addHistory() {
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });

    const now = new Date();
    const formattedDateTime = now.toLocaleString('en-GB' , {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    }); // format date and time as DD/MM/YYYY, HH:MM:SS
 
 
    const productId = document.getElementById("productId").value;
    const history = document.getElementById("history").value;

    const tx = await contract.methods.addHistory(productId, "The History was added on "+formattedDateTime+" "+"and "+history).send({ from: accounts[0] });
    console.log(tx);
  }
 
 
 
 
 
 
 
 
 
 
  async function getAllProducts() {
    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
        });
        contract.setProvider(ethereum)
 
 
        const result = await contract.methods.getAllProducts().call({ from: accounts[0]});
   console.log(result);
 
 
   let html = "<table> <thead> <tr> <th>ID</th> <th>Name</th> <th>Manufacturer</th> <th>Amount</th> <th>Quantity</th> </tr> </thead> <tbody>";
 
 
   for (let i = 0; i < result[0].length; i++) {
    html += "<tr><td>" + result[0][i] + "</td><td>" + result[1][i] + "</td><td>" + result[2][i] + "</td><td>" + result[3][i] + "</td><td>" + result[4][i] + "</td></tr>";
}

 
 
   html += "</tbody></table>";
   console.log(html)
 
 
   document.getElementById("productTable").innerHTML = html;
 }
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 async function getProductCount() {
    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
    contract.setProvider(ethereum)
 
 
    const count = await contract.methods.productCount().call({ from: accounts[0] });
    console.log(count);
    // display the count on the webpage
    document.getElementById("productCount").innerHTML = `Product Count: ${count}`;
 }
 
 
 
 
 
 
 
 
 
 
 
 
 async function getProduct() {
    const productId = document.getElementById("product-id2").value;
    const accounts = await ethereum.request({
        method: "eth_requestAccounts",
    });
    contract.methods.getProduct(productId).call({ from: accounts[0] }).then(async result => {
        console.log(result);
        const productInfoDiv = document.getElementById("product-info");
        if (result[2].length === 0) {
            productInfoDiv.innerHTML = `Product Name: ${result[0]}<br>Manufacturer: ${result[1]}<br>History: No history found.`;
        } else {
            productInfoDiv.innerHTML = `Product Name: ${result[0]}<br>Manufacturer: ${result[1]}<br>History: ${result.history.join(", ")}`;
        }
    });
 }
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 
 function displayProductHistory(product_id) {
   
    let product = getProduct(product_id);
    if (product) {
      let history = product.history;
      if (history) {
        console.log(`Transaction history for product ${product.id}:`);
        history.forEach(transaction => {
          console.log(`Transaction ID: ${transaction.transaction_id}, Date: ${transaction.date}, Quantity: ${transaction.quantity}, Price: ${transaction.price}`);
        });
      } else {
        console.log(`No transaction history found for product ${product.id}.`);
      }
    } else {
      console.log(`Product ${product_id} not found.`);
    }
  }
 
 
 
 
 
 




  async function createbills() {
    const doc = new jsPDF();
    const productId = document.getElementById("product-id1").value;
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    var rows = [];
    const result = await contract.methods.getProduct(productId).call({ from: accounts[0] });
    const totalAmount = result[2];
    const quantity = result[3];
    const unitPrice = totalAmount / quantity;
    var amount = result[2].toString();
    rows.push([result[0], quantity, unitPrice]);
     doc.text("Bill Details", 10, 10);
    doc.text("Manufacturer Name: " + result[1], 10, 20);
    doc.autoTable({
      startY: 30,
      head: [["Product Name", "Quantity", "Unit Price"]],
      body: rows,
      theme: "grid",
    });
    doc.text(
      "Total Amount: " + totalAmount,
      10,
      doc.autoTable.previous.finalY + 10
    );
    doc.save("bill.pdf");
  }
 
 
 
 
 
 
 
 
 
 
 
 
 
 const web3 = new Web3(window.ethereum);
 const abi = [
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "manufacturer",
                "type": "string"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "name": "NewProduct",
        "type": "event"
    },
    {
        "anonymous": false,
        "inputs": [
            {
                "indexed": false,
                "internalType": "uint256",
                "name": "id",
                "type": "uint256"
            },
            {
                "indexed": false,
                "internalType": "string",
                "name": "history",
                "type": "string"
            }
        ],
        "name": "ProductHistory",
        "type": "event"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            },
            {
                "internalType": "string",
                "name": "_history",
                "type": "string"
            }
        ],
        "name": "addHistory",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "string",
                "name": "_name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "_manufacturer",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "_amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "_quantity",
                "type": "uint256"
            }
        ],
        "name": "createProduct",
        "outputs": [],
        "stateMutability": "nonpayable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "getAllProducts",
        "outputs": [
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            },
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            },
            {
                "internalType": "string[]",
                "name": "",
                "type": "string[]"
            },
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            },
            {
                "internalType": "uint256[]",
                "name": "",
                "type": "uint256[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getHistory",
        "outputs": [
            {
                "internalType": "string[]",
                "name": "history",
                "type": "string[]"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "_id",
                "type": "uint256"
            }
        ],
        "name": "getProduct",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "manufacturer",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
            },
            {
                "internalType": "string[]",
                "name": "history",
                "type": "string[]"
            },
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "productCount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "products",
        "outputs": [
            {
                "internalType": "string",
                "name": "name",
                "type": "string"
            },
            {
                "internalType": "string",
                "name": "manufacturer",
                "type": "string"
            },
            {
                "internalType": "uint256",
                "name": "amount",
                "type": "uint256"
            },
            {
                "internalType": "uint256",
                "name": "quantity",
                "type": "uint256"
            },
            {
                "internalType": "address",
                "name": "sender",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    }
 ]
 const contract = new web3.eth.Contract(
    abi,
    "0x0E49A85E0e545811E80f6B1C9212906C2876CFC2"
 );
 
