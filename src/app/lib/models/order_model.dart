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
}

class OrderItem {
  final String item;
  final int quantity;

  OrderItem({
    required this.item,
    required this.quantity,
  });
}
