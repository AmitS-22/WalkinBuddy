import 'package:cloud_firestore/cloud_firestore.dart';
import 'package:flutter/material.dart';

import '../../home/services/favorite_service.dart';
import '../../hotel/screens/hotel_details_screen.dart';

class FavoritesScreen extends StatelessWidget {
  final FavoriteService favoriteService = FavoriteService();

  FavoritesScreen({super.key});

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text("My Favorites"),
        centerTitle: true,
      ),

      body: StreamBuilder<QuerySnapshot>(
        stream: favoriteService.getFavorites(),
        builder: (context, snapshot) {

          if (snapshot.connectionState ==
              ConnectionState.waiting) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }

          if (!snapshot.hasData ||
              snapshot.data!.docs.isEmpty) {
            return const Center(
              child: Text(
                "No Favorite Hotels",
                style: TextStyle(fontSize: 18),
              ),
            );
          }

          final hotels = snapshot.data!.docs;
                    return ListView.builder(
            padding: const EdgeInsets.all(16),
            itemCount: hotels.length,
            itemBuilder: (context, index) {

              final hotel = hotels[index];

              final data =
                  hotel.data() as Map<String, dynamic>;

              return Card(
                margin: const EdgeInsets.only(bottom: 16),
                elevation: 4,
                shape: RoundedRectangleBorder(
                  borderRadius:
                      BorderRadius.circular(16),
                ),

                child: ListTile(

                  leading: ClipRRect(
                    borderRadius:
                        BorderRadius.circular(12),
                    child: Image.network(
                      data["image"],
                      width: 70,
                      height: 70,
                      fit: BoxFit.cover,
                    ),
                  ),

                  title: Text(
                    data["hotelName"],
                    style: const TextStyle(
                      fontWeight: FontWeight.bold,
                    ),
                  ),

                  subtitle: Column(
                    crossAxisAlignment:
                        CrossAxisAlignment.start,
                    children: [

                      const SizedBox(height: 5),

                      Text(data["location"]),

                      const SizedBox(height: 5),

                      Text(
                        data["price"],
                        style: const TextStyle(
                          color: Colors.blue,
                          fontWeight: FontWeight.bold,
                        ),
                      ),

                      Row(
                        children: [

                          const Icon(
                            Icons.star,
                            color: Colors.orange,
                            size: 18,
                          ),

                          const SizedBox(width: 4),

                          Text(
                            data["rating"].toString(),
                          ),

                        ],
                      ),

                    ],
                  ),
                                    trailing: IconButton(
                    icon: const Icon(
                      Icons.favorite,
                      color: Colors.red,
                    ),
                    onPressed: () async {
                      await favoriteService.removeFavorite(
                        hotel.id,
                      );

                      if (!context.mounted) return;

                      ScaffoldMessenger.of(context)
                          .showSnackBar(
                        const SnackBar(
                          content: Text(
                            "Removed from Favorites",
                          ),
                        ),
                      );
                    },
                  ),

                  onTap: () {
                    Navigator.push(
                      context,
                      MaterialPageRoute(
                        builder: (_) => HotelDetailsScreen(
                          name: data["hotelName"],
                          image: data["image"],
                          location: data["location"],
                          price: data["price"],
                          rating: (data["rating"] as num)
                              .toDouble(),
                        ),
                      ),
                    );
                  },

                ),
              );
            },
          );
        },
      ),
    );
  }
}