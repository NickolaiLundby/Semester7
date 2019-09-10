using System;
using System.Collections.Generic;
using System.Text;
using System.Security.Cryptography;

namespace Kryptologi1
{
    public class SHA256Class
    {
        public static string ComputeSha256Hash(string rawString)
        {
            using (SHA256 sha256Hash = SHA256.Create())
            {
                byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(rawString));

                // Convert byte array to a string
                StringBuilder builder = new StringBuilder();
                for (int i = 0; i < bytes.Length; i++)
                {
                    builder.Append(bytes[i].ToString("x2"));
                }
                return builder.ToString();
            }
        }
    }
}
