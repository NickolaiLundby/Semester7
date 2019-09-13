using System;
using System.Collections.Generic;
using System.Text;
using System.Security.Cryptography;

namespace Kryptologi1
{
    public class RSACryptoServiceProviderClass
    {
        /// <summary>
        /// To encrypt data, we should pass the DataToEncrypt, the RSAKeyInfo (which would likely be public) and padding.
        /// </summary>
        /// <param name="DataToEncrypt"></param>
        /// <param name="RSAKeyInfo"></param>
        /// <param name="DoOAEPPadding"></param>
        /// <returns></returns>
        public static byte[] RSAEncrypt(byte[] DataToEncrypt, RSAParameters RSAKeyInfo, bool DoOAEPPadding)
        {
            try
            {
                byte[] encryptedData;
                //Create a new instance of RSACryptoServiceProvider.
                using (RSACryptoServiceProvider RSA = new RSACryptoServiceProvider())
                {

                    //Import the RSA Key information.
                    RSA.ImportParameters(RSAKeyInfo);

                    //Encrypt the passed byte array and specify if padding required.
                    encryptedData = RSA.Encrypt(DataToEncrypt, DoOAEPPadding);
                }
                return encryptedData;
            }
            catch (CryptographicException e)
            {
                Console.WriteLine(e.Message);
                return null;
            }

        }

        /// <summary>
        /// To decrypt data, we need the DataToDecrypt, the key for decryption (private key) and information about padding.
        /// </summary>
        /// <param name="DataToDecrypt"></param>
        /// <param name="RSAKeyInfo"></param>
        /// <param name="DoOAEPPadding"></param>
        /// <returns></returns>
        public static byte[] RSADecrypt(byte[] DataToDecrypt, RSAParameters RSAKeyInfo, bool DoOAEPPadding)
        {
            try
            {
                byte[] decryptedData;
                using (RSACryptoServiceProvider RSA = new RSACryptoServiceProvider())
                {
                    //Import the RSA Key information. This needs to include the private key information.
                    RSA.ImportParameters(RSAKeyInfo);

                    //Decrypt the passed byte array and specify if padding was used.
                    decryptedData = RSA.Decrypt(DataToDecrypt, DoOAEPPadding);
                }
                return decryptedData;
            }
            catch (CryptographicException e)
            {
                Console.WriteLine(e.ToString());
                return null;
            }

        }
    }
}
