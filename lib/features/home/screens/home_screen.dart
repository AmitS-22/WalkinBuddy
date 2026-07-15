import 'package:flutter/material.dart';

import '../../sos/screens/sos_screen.dart';
import '../models/hotel_model.dart';
import '../services/hotel_service.dart';
import '../widgets/app_header.dart';
import '../widgets/banner_card.dart';
import '../widgets/hotel_card.dart';
import '../widgets/quick_action_card.dart';
import '../widgets/search_bar_widget.dart';
import '../widgets/section_title.dart';

class HomeScreen extends StatefulWidget {
  const HomeScreen({super.key});

  @override
  State<HomeScreen> createState() => _HomeScreenState();
}

class _HomeScreenState extends State<HomeScreen> {
  final HotelService hotelService = HotelService();

String searchText = "";


  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: const Color(0xFFF8FAFC),

      body: SafeArea(
        child: SingleChildScrollView(
          padding: const EdgeInsets.symmetric(
            horizontal: 20,
            vertical: 16,
          ),

          child: Column(
            crossAxisAlignment: CrossAxisAlignment.start,

            children: [

              /// Header
              const AppHeader(),

              const SizedBox(height: 24),

              /// Search
              SearchBarWidget(
  onChanged: (value) {
    setState(() {
      searchText = value.toLowerCase();
    });
  },
),

              const SizedBox(height: 24),

              /// Banner
              const BannerCard(),

              const SizedBox(height: 30),

              /// Quick Access
              const SectionTitle(
                title: "Quick Access",
              ),

              const SizedBox(height: 15),

              Row(
                mainAxisAlignment:
                    MainAxisAlignment.spaceBetween,

                children: [

                  QuickActionCard(
                    icon: Icons.map,
                    title: "Explore",
                    onTap: () {},
                  ),

                  QuickActionCard(
                    icon: Icons.room_service,
                    title: "Services",
                    onTap: () {},
                  ),

                  QuickActionCard(
  icon: Icons.sos,
  title: "SOS",
  onTap: () {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (_) => const SosScreen(),
      ),
    );
  },
),
                  QuickActionCard(
                    icon: Icons.location_on,
                    title: "Tracking",
                    onTap: () {},
                  ),
                ],
              ),

              const SizedBox(height: 35),

              SectionTitle(
                title: "Featured Hotels",
                onSeeAll: () {},
              ),

              const SizedBox(height: 15),

              StreamBuilder<List<HotelModel>>(
                stream: hotelService.getHotels(),

                builder: (context, snapshot) {

                  if (snapshot.connectionState ==
                      ConnectionState.waiting) {
                    return const Center(
                      child: Padding(
                        padding: EdgeInsets.all(40),
                        child:
                            CircularProgressIndicator(),
                      ),
                    );
                  }

                  if (snapshot.hasError) {
                    return const Center(
                      child: Padding(
                        padding: EdgeInsets.all(40),
                        child: Text(
                          "Something went wrong",
                        ),
                      ),
                    );
                  }

                  if (!snapshot.hasData ||
                      snapshot.data!.isEmpty) {
                    return const Center(
                      child: Padding(
                        padding: EdgeInsets.all(40),
                        child: Text(
                          "No Hotels Available",
                        ),
                      ),
                    );
                  }

                  final hotels = snapshot.data!;

                  

final filteredHotels = hotels.where((hotel) {
  return hotel.name
          .toLowerCase()
          .contains(searchText) ||
      hotel.location
          .toLowerCase()
          .contains(searchText);
}).toList();
if (filteredHotels.isEmpty) {
  return const Center(
    child: Padding(
      padding: EdgeInsets.all(40),
      child: Text(
        "No hotels found",
        style: TextStyle(
          fontSize: 18,
        ),
      ),
    ),
  );
}
                                    return ListView.builder(
                    shrinkWrap: true,
                    physics: const NeverScrollableScrollPhysics(),
                    itemCount: filteredHotels.length,
                    itemBuilder: (context, index) {
                      final HotelModel hotel = filteredHotels[index];

                      return HotelCard(
                        hotelName: hotel.name,
                        location: hotel.location,
                        price: hotel.price,
                        rating: hotel.rating,
                        image: hotel.image,
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
    );
  }
}