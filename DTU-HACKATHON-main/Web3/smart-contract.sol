pragma solidity ^0.8.0;


contract ProductTraceability {
   struct Product {
       string name;
       string manufacturer;
       uint256 amount;
       uint256 quantity;
       string [] history;
       address sender;
   }
  
   mapping (uint256 => Product) public products;
   uint256 public productCount;
  
   event NewProduct(uint256 id, string name, string manufacturer, uint256 amount, uint256 quantity, address sender);
   event ProductHistory(uint256 id, string history);
  
   function createProduct(string memory _name, string memory _manufacturer, uint256 _amount, uint256 _quantity) public {
       productCount++;
       products[productCount] = Product(_name, _manufacturer, _amount, _quantity, new string[](0), msg.sender);
       emit NewProduct(productCount, _name, _manufacturer, _amount, _quantity, msg.sender);
   }
  
   function addHistory(uint256 _id, string memory _history) public {
       require(_id > 0 && _id <= productCount, "Invalid product ID");
       Product storage product = products[_id];
       product.history.push(_history);
       emit ProductHistory(_id, _history);
   }
  
   function getProduct(uint256 _id) public view returns (string memory name, string memory manufacturer, uint256 amount, uint256 quantity, string[] memory history, address sender) {
       require(_id > 0 && _id <= productCount, "Invalid product ID");
       Product storage product = products[_id];
       return (product.name, product.manufacturer, product.amount, product.quantity, product.history, product.sender);
   }
  
   function getAllProducts() public view returns (uint256[] memory, string[] memory, string[] memory, uint256[] memory, uint256[] memory) {
       uint256[] memory productIds = new uint256[](productCount);
       string[] memory names = new string[](productCount);
       string[] memory manufacturers = new string[](productCount);
       uint256[] memory amounts = new uint256[](productCount);
       uint256[] memory quantities = new uint256[](productCount);
       for (uint256 i = 1; i <= productCount; i++) {
           Product storage product = products[i];
           productIds[i-1] = i;
           names[i-1] = product.name;
           manufacturers[i-1] = product.manufacturer;
           amounts[i-1] = product.amount;
           quantities[i-1] = product.quantity;
       }


       return (productIds, names, manufacturers, amounts, quantities);
   }


   function getHistory(uint256 _id) public view returns (string[] memory history) {
       require(_id > 0 && _id <= productCount, "Invalid product ID");
       Product storage product = products[_id];
       return  product.history;
   }
}
