import React, { useState } from "react";
import Papa from "papaparse";
import { users, databases } from "../../lib/appwrite.config";

interface User {
  name: string;
  email: string;
  phone: string;
  password: string;
  address: string;
  city: string;
  state: string;
  zipcode: string;
}

interface BulkUserImportProps {
  userType: "Consumer" | "Provider"; // User type
  collectionId: string; // Collection ID for Appwrite
  defaultProfilePictureUrl: string; // URL to the default profile picture
}

const BulkUserImport: React.FC<BulkUserImportProps> = ({
  userType,
  collectionId,
  defaultProfilePictureUrl,
}) => {
  const [file, setFile] = useState<File | null>(null);
  const [message, setMessage] = useState<string>("");
  const [importing, setImporting] = useState<boolean>(false);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const created = useState(new Date().toISOString());

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      setFile(event.target.files[0]);
    }
  };

  // Function to format phone numbers
  const formatPhoneNumber = (phone: string): string => {
    // Remove non-numeric characters except for leading +
    const cleaned = phone.replace(/[^0-9+]/g, "");

    // Ensure phone number starts with +1
    if (!cleaned.startsWith("+1")) {
      return `+1${cleaned}`;
    }

    return cleaned;
  };

  const handleUpload = async () => {
    if (!file) {
      alert("Please select a CSV file to upload.");
      return;
    }

    const createdDateAttribute = userType === "Consumer" ? "createon" : "createdAt";

    setImporting(true);
    setMessage("");

    // Parse the CSV file
    Papa.parse<User>(file, {
      header: true,
      skipEmptyLines: true,
      complete: async (results) => {
        // Check for errors in parsing
        if (results.errors.length > 0) {
          console.error("Parsing errors:", results.errors);
          setMessage("Error parsing CSV file. Please check the format.");
          setImporting(false);
          return;
        }

        const importUsers = results.data.map((user) => ({
          ...user,
          phone: formatPhoneNumber(user.phone), // Format phone numbers
        }));

        setTotalCount(importUsers.length);

        let successCount = 0;
        let failureCount = 0;

        console.log("Parsed Users:", importUsers); // Log parsed data

        // Process the parsed data and create users
        for (let index = 0; index < importUsers.length; index++) {
          const user = importUsers[index];
          setCurrentIndex(index + 1);

          // Check for missing required fields
          if (
            !user.email ||
            !user.phone ||
            !user.password ||
            !user.name ||
            !user.zipcode
          ) {
            console.error(
              `Missing required user data at index ${index}:`,
              user
            );
            setMessage(`Error: Missing data for user at index ${index + 1}`);
            failureCount++;
            continue; // Skip this iteration
          }

          // Check phone number length
          if (user.phone.length > 15) {
            console.error(
              `Phone number exceeds maximum length at index ${index}:`,
              user.phone
            );
            setMessage(
              `Error: Phone number exceeds maximum length at index ${
                index + 1
              }`
            );
            failureCount++;
            continue; // Skip this iteration
          }

          try {
            // Create the user in Appwrite
            const newUser = await users.create(
              "unique()",
              user.email,
              user.phone,
              user.password,
              user.name
            );

            // Update user labels
            await users.updateLabels(newUser.$id, [userType]);

            // Create user profile in database with default profile picture
            await databases.createDocument(
              process.env.DATABASE_ID!,
              collectionId,
              "unique()",
              {
                userId: newUser.$id,
                email: user.email,
                phone: user.phone,
                name: user.name,
                address: user.address,
                city: user.city,
                state: user.state,
                zipcode: user.zipcode,
                userType,
                profileImg: defaultProfilePictureUrl, // Associate default profile picture URL
                [createdDateAttribute]: new Date().toISOString(), // Use dynamic attribute name for created date
              }
            );

            successCount++;
          } catch (error) {
            console.error("Failed to create user:", error);
            setMessage(`Error creating user at index ${index + 1}`);
            failureCount++;
          }
        }

        setImporting(false);
        setMessage(
          `Import completed. Success: ${successCount}, Failed: ${failureCount}`
        );
      },
      error: (error) => {
        console.error("Error parsing CSV:", error);
        setMessage("Failed to import users.");
        setImporting(false);
      },
    });
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-semibold mb-4 text-center">
        Bulk Import {userType === "Consumer" ? "Consumer Users" : "Service Providers"}
      </h2>
      <input
        type="file"
        accept=".csv"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 mb-4"
      />
      <button
        onClick={handleUpload}
        className="w-full bg-blue-600 text-white font-bold py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        disabled={importing} // Disable the button while importing
      >
        {importing ? "Importing..." : "Upload and Import"}
      </button>
      {importing && (
        <p className="mt-4 text-center">
          Importing {currentIndex} of {totalCount}...
        </p>
      )}
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default BulkUserImport;
