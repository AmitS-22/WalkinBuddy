import 'package:firebase_auth/firebase_auth.dart';
import 'package:flutter/material.dart';
class EditProfileScreen extends StatefulWidget {
  const EditProfileScreen({super.key});

  @override
  State<EditProfileScreen> createState() =>
      _EditProfileScreenState();
}

class _EditProfileScreenState
    extends State<EditProfileScreen> {

  final FirebaseAuth auth = FirebaseAuth.instance;

  late TextEditingController nameController;
  late TextEditingController emailController;

  bool loading = false;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
  title: const Text("Edit Profile"),
  centerTitle: true,
      ),

      body: Padding(
        padding: const EdgeInsets.all(20),

        child: Column(
          children: [

            const SizedBox(height: 20),

            const CircleAvatar(
              radius: 50,
              child: Icon(
                Icons.person,
                size: 55,
              ),
            ),

            const SizedBox(height: 30),
            TextField(
  controller: nameController,
  decoration: const InputDecoration(
    labelText: "Full Name",
    prefixIcon: Icon(Icons.person),
    border: OutlineInputBorder(),
  ),
),

const SizedBox(height: 20),

TextField(
  controller: emailController,
  readOnly: true,
  decoration: const InputDecoration(
    labelText: "Email",
    prefixIcon: Icon(Icons.email),
    border: OutlineInputBorder(),
  ),
),

const SizedBox(height: 35),

SizedBox(
  width: double.infinity,
  height: 55,
  child: ElevatedButton(
    onPressed: loading
        ? null
        : () async {
            if (nameController.text.trim().isEmpty) {
              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text("Name cannot be empty"),
                ),
              );
              return;
            }

            setState(() {
              loading = true;
            });

            try {
              await auth.currentUser?.updateDisplayName(
                nameController.text.trim(),
              );

              await auth.currentUser?.reload();

              if (!mounted) return;

              ScaffoldMessenger.of(context).showSnackBar(
                const SnackBar(
                  content: Text(
                    "Profile Updated Successfully",
                  ),
                ),
              );

              Navigator.pop(context);
            } catch (e) {
              ScaffoldMessenger.of(context).showSnackBar(
                SnackBar(
                  content: Text(e.toString()),
                ),
              );
            }

            if (mounted) {
              setState(() {
                loading = false;
              });
            }
          },
    child: loading
        ? const CircularProgressIndicator(
            color: Colors.white,
          )
        : const Text(
            "Save Changes",
            style: TextStyle(fontSize: 18),
          ),
  ),
),
          ],
        ),
      ),
    );
  }

  @override
  void dispose() {
    nameController.dispose();
    emailController.dispose();
    super.dispose();
  }

  @override
  void initState() {
    super.initState();

    final user = auth.currentUser;

    nameController = TextEditingController(
      text: user?.displayName ?? "",
    );

    emailController = TextEditingController(
      text: user?.email ?? "",
    );
  }
}