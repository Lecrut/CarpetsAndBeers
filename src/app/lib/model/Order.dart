class Order {
  String id;
  String userId;
  String orderDate;
  double price;

  Order({required this.id, required this.userId, required this.orderDate, required this.price});

  factory Order.fromJson(Map<String, dynamic> json) {
    return Order(
      id: json['id'],
      userId: json['userId'],
      price: json['totalPrice'],
      orderDate: json['orderDate'],
    );
  }

  Map<String, dynamic> toJson() => {
    'id': id,
    'userId': userId,
    'orderDate': orderDate,
    'price': price,
  };
}