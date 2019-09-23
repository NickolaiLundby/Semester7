using System;
using System.Collections.Generic;
using System.Text;
using System.Security.Cryptography;
using System.IO;

namespace Lab1
{
	public class Encryption
	{

		public static byte[] EncryptAes(string plainText, byte[] Key, byte[] IV)
		{
			// Check arguments.
			if (plainText == null || plainText.Length <= 0)
				throw new ArgumentNullException("plainText");
			if (Key == null || Key.Length <= 0)
				throw new ArgumentNullException("Key");
			if (IV == null || IV.Length <= 0)
				throw new ArgumentNullException("IV");
			byte[] encrypted;

			// Create an AesManaged object
			// with the specified key and IV.
			using (AesManaged aesAlg = new AesManaged())
			{
				aesAlg.Key = Key;
				aesAlg.IV = IV;
				// Create an encryptor to perform the stream transform.
				ICryptoTransform encrypter = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);
				// Create the streams used for encryption.
				using (MemoryStream msEncrypt = new MemoryStream())
				{
					using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encrypter, CryptoStreamMode.Write))
					{
						using (StreamWriter swEncrypt = new StreamWriter(csEncrypt))
						{
							//Write all data to the stream.
							swEncrypt.Write(plainText);
						}
						encrypted = msEncrypt.ToArray();
					}
				}
			}
			// Return the encrypted bytes from the memory stream.
			return encrypted;
		}

		public static string DecryptAes(byte[] cipherText, byte[] Key, byte[] IV)
		{
			// Check arguments.
			if (cipherText == null || cipherText.Length <= 0)
				throw new ArgumentNullException("cipherText");
			if (Key == null || Key.Length <= 0)
				throw new ArgumentNullException("Key");
			if (IV == null || IV.Length <= 0)
				throw new ArgumentNullException("IV");

			// Declare the string used to hold
			// the decrypted text.
			string plaintext = null;

			// Create an AesManaged object
			// with the specified key and IV.
			using (AesManaged aesAlg = new AesManaged())
			{
				aesAlg.Key = Key;
				aesAlg.IV = IV;

				// Create a decryptor to perform the stream transform.
				ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);

				// Create the streams used for decryption.
				using (MemoryStream msDecrypt = new MemoryStream(cipherText))
				{
					using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
					{
						using (StreamReader srDecrypt = new StreamReader(csDecrypt))
						{

							// Read the decrypted bytes from the decrypting stream
							// and place them in a string.
							plaintext = srDecrypt.ReadToEnd();
						}
					}
				}

			}

			return plaintext;

		}

		public static byte[] EncryptRSA(string plainText, RSAParameters RSAKeyInfo, bool DoOAEPPadding)
		{
			UnicodeEncoding ByteConverter = new UnicodeEncoding();
			byte[] DataToEncrypt = ByteConverter.GetBytes(plainText);
			byte[] encryptedData;

			//Create a new instance of RSACryptoServiceProvider.
			using (RSACryptoServiceProvider RSA = new RSACryptoServiceProvider())
			{

				//Import the RSA Key information. This only needs
				//toinclude the public key information.
				RSA.ImportParameters(RSAKeyInfo);

				//Encrypt the passed byte array and specify OAEP padding.  
				//OAEP padding is only available on Microsoft Windows XP or
				//later.  
				encryptedData = RSA.Encrypt(DataToEncrypt, DoOAEPPadding);
			}
			return encryptedData;
		}

		public static string DecryptRSA(byte[] DataToDecrypt, RSAParameters RSAKeyInfo, bool DoOAEPPadding)
		{
			UnicodeEncoding ByteConverter = new UnicodeEncoding();

			byte[] decryptedData;
			//Create a new instance of RSACryptoServiceProvider.
			using (RSACryptoServiceProvider RSA = new RSACryptoServiceProvider())
			{
				//Import the RSA Key information. This needs
				//to include the private key information.
				RSA.ImportParameters(RSAKeyInfo);

				//Decrypt the passed byte array and specify OAEP padding.  
				//OAEP padding is only available on Microsoft Windows XP or
				//later.  
				decryptedData = RSA.Decrypt(DataToDecrypt, DoOAEPPadding);
			}

			return ByteConverter.GetString(decryptedData);
		}

	}
}
