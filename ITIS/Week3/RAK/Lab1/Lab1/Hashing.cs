﻿using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Lab1
{
	public class Hashing
	{
		public static string HashSHA256(string plainText)
		{
			// Create a SHA256   
			using (SHA256Managed sha256Hash = new SHA256Managed())
			{
				// ComputeHash - returns byte array  
				byte[] bytes = sha256Hash.ComputeHash(Encoding.UTF8.GetBytes(plainText));

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
