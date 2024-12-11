class Item {
  final String id;
  final String name;
  final String description;
  final double price;
  final String imageUrl;
  final String category;

  Item(
      {required this.category,
      required this.id,
      required this.name,
      required this.description,
      required this.price,
      required this.imageUrl});

  factory Item.fromJson(Map<String, dynamic> json) {
    return Item(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      price: json['price'],
      imageUrl: json['imgUrl'],
      category: '',
    );
  }

  factory Item.fromJsonShared(Map<String, dynamic> json) {
    return Item(
      id: json['id'],
      name: json['name'],
      description: json['description'],
      price: json['price'],
      imageUrl: json['imageUrl'],
      category: '',
    );
  }

  Map<String, dynamic> toJson() {
    return {
      'id': id,
      'name': name,
      'description': description,
      'price': price,
      'imageUrl': imageUrl,
    };
  }
}
