import 'package:flutter/material.dart';

import '../../booking/services/booking_service.dart';
import '../../gallery/screens/gallery_screen.dart';
import '../../home/services/favorite_service.dart';
import '../../payment/screens/payment_screen.dart';
import '../../review/models/review_model.dart';
import '../../review/screens/add_review_screen.dart';
import '../../review/services/review_service.dart';
import '../../review/widgets/review_card.dart';
import '../../sos/screens/sos_screen.dart';



class HotelDetailsScreen extends StatefulWidget {
  final String name;
  final String image;
  final String location;
  final String price;
  final double rating;
  

  const HotelDetailsScreen({
    super.key,
    required this.name,
    required this.image,
    required this.location,
    required this.price,
    required this.rating,
  });
  

  @override
  State<HotelDetailsScreen> createState() =>
      _HotelDetailsScreenState();
      
}

class _HotelDetailsScreenState
    extends State<HotelDetailsScreen> {
  final BookingService bookingService =
      BookingService();

  final FavoriteService favoriteService =
      FavoriteService();

final ReviewService reviewService = ReviewService();

  bool isFavorite = false;

  DateTime? checkInDate;
  DateTime? checkOutDate;

  int guests = 2;

  String roomType = "Deluxe Room";

  final List<String> roomTypes = [
    "Deluxe Room",
    "Premium Room",
    "Executive Suite",
    "Presidential Suite",
  ];

  @override
  Widget build(BuildContext context) {
    final galleryImages = [
  widget.image,
  widget.image,
  widget.image,
  widget.image,
  widget.image,
];
    return Scaffold(
      body: CustomScrollView(
        slivers: [
          SliverAppBar(
            expandedHeight: 300,
            pinned: true,

            actions: [
              IconButton(
                icon: Icon(
                  isFavorite
                      ? Icons.favorite
                      : Icons.favorite_border,
                  color: Colors.red,
                ),
                onPressed: () async {
                  if (isFavorite) {
                    await favoriteService.removeFavorite(
                      widget.name,
                    );

                    if (!mounted) return;

                    setState(() {
                      isFavorite = false;
                    });

                    ScaffoldMessenger.of(context)
                        .showSnackBar(
                      const SnackBar(
                        content: Text(
                          "Removed from Favorites 💔",
                        ),
                      ),
                    );
                  } else {
                    await favoriteService.addFavorite(
                      hotelId: widget.name,
                      hotelName: widget.name,
                      image: widget.image,
                      location: widget.location,
                      price: widget.price,
                      rating: widget.rating,
                    );

                    if (!mounted) return;

                    setState(() {
                      isFavorite = true;
                    });

                    ScaffoldMessenger.of(context)
                        .showSnackBar(
                      const SnackBar(
                        content: Text(
                          "Added to Favorites ❤️",
                        ),
                      ),
                    );
                  }
                },
              ),

              IconButton(
                icon: const Icon(Icons.sos),
                onPressed: () {
                  Navigator.push(
                    context,
                    MaterialPageRoute(
                      builder: (_) =>
                          const SosScreen(),
                    ),
                  );
                },
              ),
            ],

            flexibleSpace: FlexibleSpaceBar(
              background: Hero(
                tag: widget.name,
                child: Image.network(
                  widget.image,
                  fit: BoxFit.cover,
                ),
              ),
            ),
          ),
                    SliverToBoxAdapter(
            child: Padding(
              padding: const EdgeInsets.all(20),
              child: Column(
                crossAxisAlignment:
                    CrossAxisAlignment.start,
                children: [
                  Text(
                    widget.name,
                    style: const TextStyle(
                      fontSize: 28,
                      fontWeight: FontWeight.bold,
                    ),
                  ),

                  const SizedBox(height: 10),

                  Row(
                    children: [
                      const Icon(
                        Icons.location_on,
                        color: Colors.red,
                      ),

                      const SizedBox(width: 5),

                      Expanded(
                        child: Text(widget.location),
                      ),

                      const Icon(
                        Icons.star,
                        color: Colors.orange,
                      ),

                      const SizedBox(width: 5),

                      Text(widget.rating.toString()),
                    ],
                  ),

                  const SizedBox(height: 25),

                  const Text(
                    "About Hotel",
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                    ),
                  ),

                  const SizedBox(height: 10),

                  const Text(
                    "Enjoy premium hospitality with luxury rooms, swimming pool, restaurant, spa, gym and breathtaking mountain views.",
                    style: TextStyle(
                      fontSize: 16,
                      height: 1.7,
                    ),
                  ),

                  const SizedBox(height: 30),

                  const Text(
                    "Amenities",
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                    ),
                  ),

                  const SizedBox(height: 15),

                  Wrap(
                    spacing: 10,
                    runSpacing: 10,
                    children: const [
                      Chip(
                        avatar: Icon(Icons.wifi),
                        label: Text("Free WiFi"),
                      ),
                      Chip(
                        avatar: Icon(Icons.pool),
                        label: Text("Swimming Pool"),
                      ),
                      Chip(
                        avatar: Icon(Icons.restaurant),
                        label: Text("Restaurant"),
                      ),
                      Chip(
                        avatar: Icon(Icons.spa),
                        label: Text("Spa"),
                      ),
                      Chip(
                        avatar: Icon(Icons.local_parking),
                        label: Text("Parking"),
                      ),
                      Chip(
                        avatar: Icon(Icons.fitness_center),
                        label: Text("Gym"),
                      ),
                    ],
                  ),

                  const SizedBox(height: 30),

                  const Text(
                    "Booking Details",
                    style: TextStyle(
                      fontSize: 22,
                      fontWeight: FontWeight.bold,
                    ),
                  ),

                  const SizedBox(height: 20),

                  ListTile(
                    leading: const Icon(Icons.calendar_month),
                    title: const Text("Check-In"),
                    subtitle: Text(
                      checkInDate == null
                          ? "Select Check-In Date"
                          : "${checkInDate!.day}/${checkInDate!.month}/${checkInDate!.year}",
                    ),
                    trailing: const Icon(Icons.arrow_forward_ios),
                    onTap: selectCheckIn,
                  ),

                  const Divider(),

                  ListTile(
                    leading: const Icon(Icons.calendar_today),
                    title: const Text("Check-Out"),
                    subtitle: Text(
                      checkOutDate == null
                          ? "Select Check-Out Date"
                          : "${checkOutDate!.day}/${checkOutDate!.month}/${checkOutDate!.year}",
                    ),
                    trailing: const Icon(Icons.arrow_forward_ios),
                    onTap: selectCheckOut,
                  ),

                  const SizedBox(height: 25),
                                    const Text(
                    "Guests",
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),

                  Row(
                    children: [
                      IconButton(
                        onPressed: () {
                          if (guests > 1) {
                            setState(() {
                              guests--;
                            });
                          }
                        },
                        icon: const Icon(Icons.remove_circle),
                      ),

                      Text(
                        "$guests Guests",
                        style: const TextStyle(
                          fontSize: 18,
                          fontWeight: FontWeight.w600,
                        ),
                      ),

                      IconButton(
                        onPressed: () {
                          setState(() {
                            guests++;
                          });
                        },
                        icon: const Icon(Icons.add_circle),
                      ),
                    ],
                  ),

                  const SizedBox(height: 25),

                  const Text(
                    "Room Type",
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.bold,
                    ),
                  ),

                  const SizedBox(height: 10),

                  DropdownButtonFormField<String>(
                    initialValue: roomType,
                    decoration: const InputDecoration(
                      border: OutlineInputBorder(),
                    ),
                    items: roomTypes.map((room) {
                      return DropdownMenuItem(
                        value: room,
                        child: Text(room),
                      );
                    }).toList(),
                    onChanged: (value) {
                      if (value != null) {
                        setState(() {
                          roomType = value;
                        });
                      }
                    },
                  ),

                  const SizedBox(height: 35),

                  const Text(
                    "Starting From",
                    style: TextStyle(
                      color: Colors.grey,
                    ),
                  ),

                  const SizedBox(height: 5),

                  Text(
                    widget.price,
                    style: const TextStyle(
                      fontSize: 30,
                      fontWeight: FontWeight.bold,
                      color: Colors.blue,
                    ),
                  ),

                  const SizedBox(height: 20),

                  SizedBox(
                    width: double.infinity,
                    child: ElevatedButton.icon(
                      icon: const Icon(Icons.payment),
                      label: const Text("Proceed to Payment"),
                      style: ElevatedButton.styleFrom(
                        padding: const EdgeInsets.symmetric(
                          vertical: 16,
                        ),
                      ),
                      onPressed: () {
                        if (checkInDate == null ||
                            checkOutDate == null) {
                          ScaffoldMessenger.of(context).showSnackBar(
                            const SnackBar(
                              content: Text(
                                "Please select Check-In & Check-Out dates",
                              ),
                            ),
                          );
                          return;
                        }

                        Navigator.push(
                          context,
                          MaterialPageRoute(
                            builder: (_) => PaymentScreen(
                            hotelName: widget.name,
                            location: widget.location,
                            roomType: roomType,
                            amount: widget.price,
                            guests: guests,
                            checkIn: checkInDate!,
                            checkOut: checkOutDate!,
)
                          ),
                        );
                      },
                    ),
                  ),

                  const SizedBox(height: 30),

const Text(
  "Gallery",
  style: TextStyle(
    fontSize: 22,
    fontWeight: FontWeight.bold,
  ),
),

const SizedBox(height: 15),

SizedBox(
  height: 100,
  child: ListView.builder(
    scrollDirection: Axis.horizontal,
    itemCount: galleryImages.length,
    itemBuilder: (context, index) {
      return GestureDetector(
        onTap: () {
          Navigator.push(
            context,
            MaterialPageRoute(
              builder: (_) => GalleryScreen(
                images: galleryImages,
              ),
            ),
          );
        },
        child: Container(
          width: 120,
          margin: const EdgeInsets.only(right: 10),
          decoration: BoxDecoration(
            borderRadius: BorderRadius.circular(12),
            image: DecorationImage(
              image: NetworkImage(
                galleryImages[index],
              ),
              fit: BoxFit.cover,
            ),
          ),
        ),
      );
    },
  ),
),

const SizedBox(height: 30),

const Text(
  "Reviews",
  style: TextStyle(
    fontSize: 22,
    fontWeight: FontWeight.bold,
  ),
),

const SizedBox(height: 15),

Align(
  alignment: Alignment.centerRight,
  child: ElevatedButton.icon(
    icon: const Icon(Icons.rate_review),
    label: const Text("Write Review"),
    onPressed: () {
      Navigator.push(
        context,
        MaterialPageRoute(
          builder: (_) => AddReviewScreen(
            hotelId: widget.name,
          ),
        ),
      );
    },
  ),
),

const SizedBox(height: 20),

StreamBuilder<List<ReviewModel>>(
  stream: reviewService.getReviews(widget.name),
  builder: (context, snapshot) {
    if (snapshot.connectionState ==
        ConnectionState.waiting) {
      return const Center(
        child: CircularProgressIndicator(),
      );
    }

    if (snapshot.hasError) {
      return const Text(
        "Failed to load reviews",
      );
    }

    if (!snapshot.hasData ||
        snapshot.data!.isEmpty) {
      return const Padding(
        padding: EdgeInsets.symmetric(
          vertical: 20,
        ),
        child: Text(
          "No Reviews Yet",
          style: TextStyle(
            fontSize: 16,
          ),
        ),
      );
    }

    final reviews = snapshot.data!;

    return ListView.builder(
      shrinkWrap: true,
      physics:
          const NeverScrollableScrollPhysics(),
      itemCount: reviews.length,
      itemBuilder: (context, index) {
        return ReviewCard(
          review: reviews[index],
        );
      },
    );
  },
),

const SizedBox(height: 30),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  @override
  void initState() {
    super.initState();
    loadFavorite();
  }

  Future<void> loadFavorite() async {
    final favorite =
        await favoriteService.isFavorite(
      widget.name,
    );

    if (!mounted) return;

    setState(() {
      isFavorite = favorite;
    });
  }

  Future<void> selectCheckIn() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: DateTime.now(),
      firstDate: DateTime.now(),
      lastDate: DateTime(2035),
    );

    if (picked != null) {
      setState(() {
        checkInDate = picked;
      });
    }
  }

  Future<void> selectCheckOut() async {
    final picked = await showDatePicker(
      context: context,
      initialDate: checkInDate ?? DateTime.now(),
      firstDate: checkInDate ?? DateTime.now(),
      lastDate: DateTime(2035),
    );

    if (picked != null) {
      setState(() {
        checkOutDate = picked;
      });
    }
  }
}