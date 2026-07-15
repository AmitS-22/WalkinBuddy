class FavoriteModel {
  final String id;
  final String hotelName;
  final String image;
  final String location;
  final String price;
  final double rating;

  FavoriteModel({
    required this.id,
    required this.hotelName,
    required this.image,
    required this.location,
    required this.price,
    required this.rating,
  });

  factory FavoriteModel.fromMap(
    Map<String, dynamic> map,
    String documentId,
  ) {
    return FavoriteModel(
      id: documentId,
      hotelName: map["hotelName"] ?? "",
      image: map["image"] ?? "",
      location: map["location"] ?? "",
      price: map["price"] ?? "",
      rating: (map["rating"] ?? 0).toDouble(),
    );
  }
}