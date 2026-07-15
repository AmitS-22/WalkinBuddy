import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';

import '../../auth/screens/login_screen.dart';
import '../../favorites/screens/favorites_screen.dart';
import 'edit_profile_screen.dart';

class ProfileScreen extends StatelessWidget {
  final FirebaseAuth auth = FirebaseAuth.instance;

  ProfileScreen({super.key});

  @override
  Widget build(BuildContext context) {
    final user = auth.currentUser;

    return Scaffold(
      appBar: AppBar(
        title: const Text("Profile"),
        centerTitle: true,
      ),

      body: ListView(
        padding: const EdgeInsets.all(20),

        children: [

          const SizedBox(height: 20),

          const CircleAvatar(
            radius: 50,
            child: Icon(
              Icons.person,
              size: 55,
            ),
          ),

          const SizedBox(height: 20),

          Text(
            user?.displayName ?? "Guest User",
            textAlign: TextAlign.center,
            style: const TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.bold,
            ),
          ),

          const SizedBox(height: 8),

          Text(
            user?.email ?? "",
            textAlign: TextAlign.center,
            style: const TextStyle(
              color: Colors.grey,
            ),
          ),

          const SizedBox(height: 35),
                    _profileTile(
            context,
            icon: Icons.edit,
            title: "Edit Profile",
            subtitle: "Update your profile",
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) =>
                      const EditProfileScreen(),
                ),
              );
            },
          ),

          const SizedBox(height: 15),

          _profileTile(
            context,
            icon: Icons.favorite,
            title: "My Favorites",
            subtitle: "Saved hotels",
            onTap: () {
              Navigator.push(
                context,
                MaterialPageRoute(
                  builder: (_) =>
                      FavoritesScreen(),
                ),
              );
            },
          ),

          const SizedBox(height: 15),
                    _profileTile(
            context,
            icon: Icons.book_online,
            title: "My Bookings",
            subtitle: "View your hotel bookings",
            onTap: () {
              // Booking Screen next banayenge
            },
          ),

          const SizedBox(height: 15),

          _profileTile(
            context,
            icon: Icons.logout,
            title: "Logout",
            subtitle: "Sign out from account",
            onTap: () async {
              await auth.signOut();

              if (!context.mounted) return;

              Navigator.pushAndRemoveUntil(
                context,
                MaterialPageRoute(
                  builder: (_) => LoginScreen(),
                ),
                (route) => false,
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _profileTile(
    BuildContext context, {
    required IconData icon,
    required String title,
    required String subtitle,
    required VoidCallback onTap,
  }) {
    return Card(
      elevation: 3,
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15),
      ),
      child: ListTile(
        leading: CircleAvatar(
          child: Icon(icon),
        ),
        title: Text(title),
        subtitle: Text(subtitle),
        trailing: const Icon(Icons.arrow_forward_ios),
        onTap: onTap,
      ),
    );
  }
}