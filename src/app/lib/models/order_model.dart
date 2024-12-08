class Order {
  final Address address;
  final int userID;
  final List<OrderItem> items;
  final double totalPrice;

  Order({
    required this.address,
    required this.userID,
    required this.items,
    required this.totalPrice,
  });

  Map<String, dynamic> toJson() {
    return {
      'address': address.toJson(),
      'userID': userID,
      'items': items.map((item) => item.toJson()).toList(),
      'totalPrice': totalPrice,
    };
  }
}

class Address {
  final String number;
  final String building;
  final String street;
  final String city;
  final String zip;

  Address({
    required this.number,
    required this.building,
    required this.street,
    required this.city,
    required this.zip,
  });

  Map<String, dynamic> toJson() {
    return {
      'number': number,
      'building': building,
      'street': street,
      'city': city,
      'zip': zip,
    };
  }
}

class OrderItem {
  final String item;
  final int quantity;

  OrderItem({
    required this.item,
    required this.quantity,
  });

  Map<String, dynamic> toJson() {
    return {
      'item': item,
      'quantity': quantity,
    };
  }
}
