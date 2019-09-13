using System;
using System.Security.Cryptography;

namespace Lab1
{
	class Program
	{
		static void Main(string[] args)
		{
			string original = "Here is some data to encrypt!";

			// Create a new instance of the AesManaged
			// class.  This generates a new key and initialization 
			// vector (IV).
			using (AesManaged myAes = new AesManaged())
			{
				// Encrypt the string to an array of bytes.
				byte[] encrypted = Encryption.EncryptAes(original, myAes.Key, myAes.IV);

				// Decrypt the bytes to a string.
				string roundtrip = Encryption.DecryptAes(encrypted, myAes.Key, myAes.IV);

				//Display the original data and the decrypted data.
				Console.WriteLine("Original:   {0}", original);
				Console.WriteLine("Round Trip: {0}", roundtrip);
			}

			string originalData = "Here is some data to Hash!";
			Console.WriteLine("Original:   {0}", originalData);
			string hashedData = Hashing.HashSHA256(originalData);
			Console.WriteLine("Hash: {0}", hashedData);

			using (RSACryptoServiceProvider RSA = new RSACryptoServiceProvider())
			{
				byte[] encryptedData = Encryption.EncryptRSA(original, RSA.ExportParameters(false), false);

				// Decrypt the bytes to a string.
				string roundtrip = Encryption.DecryptRSA(encryptedData, RSA.ExportParameters(true), false);

				//Display the original data and the decrypted data.
				Console.WriteLine("Original:   {0}", original);
				Console.WriteLine("Round Trip: {0}", roundtrip);
			}



			Console.ReadLine();
		}
	}
}
