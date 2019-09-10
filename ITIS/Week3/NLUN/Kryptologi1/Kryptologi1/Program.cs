using System;
using System.Security.Cryptography;
using System.Text;

namespace Kryptologi1
{
    class Program
    {
        static void Main(string[] args)
        {
            // Test AesManaged
            Console.WriteLine("First testing to AesManaged keys\n");

            #region AesManaged        
            string original = "Here is some data to encrypt!";

            // Create a new instance of the AesManaged
            // class.  This generates a new key and initialization 
            // vector (IV).
            using (AesManaged myAes = new AesManaged())
            {
                // Encrypt the string to an array of bytes.
                byte[] encrypted = AesManagedClass.EncryptStringToBytes_Aes(original, myAes.Key, myAes.IV);

                // Decrypt the bytes to a string.
                string roundtrip = AesManagedClass.DecryptStringFromBytes_Aes(encrypted, myAes.Key, myAes.IV);

                //Display the original data and the decrypted data.
                Console.WriteLine("Original:   {0}", original);
                Console.WriteLine("Round Trip: {0}\n\n", roundtrip);
            }
            #endregion

            // Test Sha256
            #region Sha256
            Console.WriteLine("Secondly testing SHA256\n");
            Console.WriteLine("Raw string: {0}", original);
            Console.WriteLine("Hashed data: {0}\n\n", SHA256Class.ComputeSha256Hash(original));
            #endregion

            // Test RSACryptoServiceProvider
            Console.WriteLine("Lastly testing RSACryptoServiceProvider\n");
            try
            {
                UnicodeEncoding byteConverter = new UnicodeEncoding();

                byte[] dataToEncrypt = byteConverter.GetBytes(original);
                byte[] encryptedData;
                byte[] decryptedData;

                using (RSACryptoServiceProvider RSA = new RSACryptoServiceProvider())
                {
                    encryptedData = RSACryptoServiceProviderClass.RSAEncrypt(dataToEncrypt, RSA.ExportParameters(false), false);
                    decryptedData = RSACryptoServiceProviderClass.RSADecrypt(encryptedData, RSA.ExportParameters(true), false);

                    Console.WriteLine("Original data: {0}", original);
                    Console.WriteLine("Encrypted data: {0}", byteConverter.GetString(encryptedData));
                    Console.WriteLine("Decrypted data: {0}", byteConverter.GetString(decryptedData));
                }
            }
            catch
            {
                Console.WriteLine("Encryption failed");
            }

            Console.ReadLine();
        }
    }
}
