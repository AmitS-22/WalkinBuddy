class HotelModel {
  final String id;
  final String name;
  final String location;
  final String price;
  final double rating;
  final String image;

  HotelModel({
    required this.id,
    required this.name,
    required this.location,
    required this.price,
    required this.rating,
    required this.image,
  });

  factory HotelModel.fromMap(
    Map<String, dynamic> map,
    String documentId,
  ) {
    return HotelModel(
      id: documentId,
      name: map['name'] ?? '',
      location: map['location'] ?? '',
      price: map['price'] ?? '',
      rating: (map['rating'] ?? 0).toDouble(),
      image: map['image'] ?? '',
    );
  }
}
